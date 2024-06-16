// import React from 'react'
// import { SchemaNode } from '../trees/input-nodes-tree'

// type Props = {
//   nodes:SchemaNode[]
// }

// const InputTreeItem = (props: Props) => {
//   return (
//     <ul className="w-full space-y-1">
//       {nodes.map((node) => (
//         <li key={node.id} className="w-full space-y-2">
//           {node.children && node.children?.length > 0 ? (
//             <Node
//               element={<InputsRow />}
//               value={element.id}
//               isSelectable={element.isSelectable}
//               className="px-px pr-1"
//             >
//               <InputTreeItem
//                 key={element.id}
//                 aria-label={`Node ${element.name}`}
//                 nodes={element.children}
//               />
//             </Node>
//           ) : (
//             <Leaf
//               key={element.id}
//               value={element.id}
//               isSelectable={element.isSelectable}
//             >
//               <InputsRow />
//             </Leaf>
//           )}
//         </li>
//       ))}
//     </ul>
//   )
// }

// export default InputTreeItem