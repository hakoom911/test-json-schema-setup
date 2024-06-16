import {
  Tree,
  TreeViewElement,
  File,
  Folder,
  Node,
  CollapseButton,
  Leaf,
} from "@/components/extention/tree-view-api";
import InputsRow from "./inputs-row";

type TOCProps = {
  toc: TreeViewElement[];
};

const TOC = ({ toc }: TOCProps) => {
  return (
    <Tree className="w-full h-60 bg-gray-900 p-2 rounded-md" indicator={true}>
      {toc.map((element, _) => (
        <TreeItem key={element.id} elements={[element]} />
      ))}
      <CollapseButton elements={toc} expandAll={true} />
    </Tree>
  );
};

type TreeItemProps = {
  elements: TreeViewElement[];
};

export const TreeItem = ({ elements }: TreeItemProps) => {
  return (
    <ul className="w-full space-y-1">
      {elements.map((element) => (
        <li key={element.id} className="w-full space-y-2">
          {element.children && element.children?.length > 0 ? (
            <Node
              element={<InputsRow />}
              value={element.id}
              isSelectable={element.isSelectable}
              className="px-px pr-1"
            >
              <TreeItem
                key={element.id}
                aria-label={`Node ${element.name}`}
                elements={element.children}
              />
            </Node>
          ) : (
            <Leaf
              key={element.id}
              value={element.id}
              isSelectable={element.isSelectable}
            >
              <InputsRow />
            </Leaf>
          )}
        </li>
      ))}
    </ul>
  );
};

const TOCWrapper = () => {
  const toc = [
    {
      id: "1",
      name: "components",
      children: [
        {
          id: "2",
          name: "extension",
          children: [
            {
              id: "3",
              name: "tree-view.tsx",
              children: [
                {
                  id: "5",
                  name: "tree-view.tsx",
                },
            ]
            },
            {
              id: "4",
              name: "tree-view-api.tsx",
            },
          ],
        },
      ],
    },
  ];
  return <TOC toc={toc} />;
};

export default TOCWrapper;
