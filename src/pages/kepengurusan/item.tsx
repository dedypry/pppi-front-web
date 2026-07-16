import { TreeNode } from "react-organizational-chart";

import KepengurusanCard from "./card";

import { IKepengurusanNode } from "@/interface/IKepengurusan";

interface Props {
  node: IKepengurusanNode;
}

export default function KepengurusanItem({ node }: Props) {
  return (
    <TreeNode label={<KepengurusanCard node={node} />}>
      {node.children?.map((child) => (
        <KepengurusanItem key={child.id} node={child} />
      ))}
    </TreeNode>
  );
}
