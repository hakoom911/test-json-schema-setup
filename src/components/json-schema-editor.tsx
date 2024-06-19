"use client";
import { useState, useCallback } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  MenuItem,
  Select,
  Grid,
  Menu,
  MenuItem as MenuOption,
} from "@mui/material";
import { Add, Delete, MoreVert } from "@mui/icons-material";
import { JSONTree } from "react-json-tree";

interface SchemaNode {
  sourceValue?: string;
  title?: string;
  type: string;
  properties?: { [key: string]: SchemaNode };
  items?: SchemaNode;
}

const JsonSchemaEditor: React.FC = () => {
  const [schema, setSchema] = useState<SchemaNode>({
    type: "object",
    properties: {},
  });
  const [lastId, setLastId] = useState<number>(0);
  const [json, setJson] = useState<string>("{}");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  const updateJson = (newSchema: SchemaNode) => {
    setJson(JSON.stringify(newSchema, null, 2));
  };

  const findNode = (node: SchemaNode, path: string[]): SchemaNode => {
    if (path.length === 0) return node;
    const [current, ...rest] = path;
    if (node.properties && node.properties[current]) {
      return findNode(node.properties[current], rest);
    }
    if (current === "items" && node.items) {
      return findNode(node.items, rest);
    }
    throw new Error("Path not found");
  };

  const handleAddNode = (path: string[], type: "child" | "sibling") => {
    const newSchema = { ...schema };
    const node = findNode(
      newSchema,
      type === "sibling" ? path.slice(0, -1) : path
    );

    if (!node.properties) node.properties = {};
    const newKey = `new_field_${lastId + 1}`;
    node.properties[newKey] = { type: "string" };
    setLastId((prev) => prev + 1);
    setSchema(newSchema);
    updateJson(newSchema);
    handleCloseMenu();
  };

  const handleDeleteNode = (nodePath: string[]) => {
    const updatedSchema = { ...schema };
    const { properties } = findNode(updatedSchema, nodePath.slice(0, -1));
    const deletedKey = nodePath[nodePath.length - 1];
    delete properties![deletedKey];
    setSchema(updatedSchema);
    updateJson(updatedSchema);
  };


  const handleKeyChange = useCallback(
    (path: string[], oldKey: string, newKey: string): void => {
      setSchema((prevSchema) => {
        const newSchema = { ...prevSchema };
        const node = findNode(newSchema, path.slice(0, -1));
        if (node.properties && node.properties[oldKey]) {
          const field = node.properties[oldKey];
          delete node.properties[oldKey];
          node.properties[newKey] = field;
        }
        return newSchema;
      });
      updateJson(schema);
    },
    // (path: string[], oldKey: string, newKey: string) => {
    //   const newSchema = { ...schema };
    //   const node = findNode(newSchema, path.slice(0, -1));
    //   if (node.properties && node.properties[oldKey]) {
    //     const field = node.properties[oldKey];
    //     delete node.properties[oldKey];
    //     node.properties[newKey] = field;
    //     setSchema(newSchema);
    //     updateJson(newSchema);
    //   }
    // },
    []
  );

  const handleFieldChange = (
    path: string[],
    value: string,
    field: keyof SchemaNode
  ) => {
    const newSchema = { ...schema };
    const node = findNode(newSchema, path);
    node[field] = value as any;
    if (field === "type" && value === "array" && !node.items) {
      node.items = { type: "string" };
    }
    setSchema(newSchema);
    updateJson(newSchema);
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    path: string[]
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentPath(path);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentPath([]);
  };

  const renderTree = (node: SchemaNode, path: string[] = []) => {
    const currentKey = path[path.length - 1] || "root";
    console.log(`current path :${currentPath}`)
    console.log(`current key :${currentKey}`)
    const isRoot = path.length === 0;
    const isObject = node.type === "object";
    const isArray = node.type === "array";

    return (
      <Box key={path.join(".")} sx={{ ml: 4, mt: 2 }} className="w-full">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <TextField
              defaultValue={currentKey}
              onBlur={(e) =>
                !isRoot && handleKeyChange(path, currentKey, e.target.value)
              }
              label="Key"
              variant="outlined"
              size="small"
              fullWidth
              disabled={currentKey === "items" || isRoot}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={node.sourceValue || ""}
              onChange={(e) =>
                handleFieldChange(path, e.target.value, "sourceValue")
              }
              label="Source Value"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Select
              value={node.type}
              onChange={(e) => handleFieldChange(path, e.target.value, "type")}
              variant="outlined"
              size="small"
              fullWidth
              disabled={isRoot}
            >
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="object">Object</MenuItem>
              <MenuItem value="array">Array</MenuItem>
              <MenuItem value="boolean">Boolean</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={3}>
            {isObject && currentKey !== "items" ? (
              <IconButton onClick={(e) => handleMenuClick(e, path)}>
                <MoreVert />
              </IconButton>
            ) : isObject && currentKey == "items" ? (
              <IconButton onClick={() => handleAddNode(path, "child")}>
                <Add />
              </IconButton>
            ) : (
              <IconButton onClick={() => handleAddNode(path, "sibling")}>
                <Add />
              </IconButton>
            )}
            {!isRoot && (
              <IconButton onClick={() => handleDeleteNode(path)}>
                <Delete />
              </IconButton>
            )}
          </Grid>
        </Grid>
        {isObject &&
          node.properties &&
          Object.keys(node.properties).map((key) =>
            renderTree(node.properties![key], [...path, key])
          )}
        {isArray && node.items && renderTree(node.items, [...path, "items"])}
      </Box>
    );
  };

  return (
    <div className="flex w-full">
      <div className="w-full p-4 bg-slate-800 text-white">
        <JSONTree data={schema} />
        {json}
      </div>
    
      <div className="w-full p-4">
        <Typography variant="h4">JSON Schema Editor</Typography>
        {renderTree(schema)}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuOption onClick={() => handleAddNode(currentPath, "child")}>
            Add Child
          </MenuOption>
          {currentPath.length > 0 && (
            <MenuOption onClick={() => handleAddNode(currentPath, "sibling")}>
              Add Sibling
            </MenuOption>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default JsonSchemaEditor;
