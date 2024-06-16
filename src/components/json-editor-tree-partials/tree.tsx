import {
  Tree,
  TreeViewElement,
  CollapseButton,
} from "@/components/extention/tree-view-api.jsx";
import { TreeItem } from "./tree-item.tsx";

type TOCProps = {
  toc: TreeViewElement[];
};

export const TOC = ({ toc }: TOCProps) => {
  return (
    <Tree className="w-full h-60 bg-background p-2 rounded-md" indicator={true}>
      {toc.map((element, _) => (
        <TreeItem key={element.id} elements={[element]} />
      ))}
      <CollapseButton elements={toc} expandAll={true} />
    </Tree>
  );
};
