// import { forwardRef } from "react";

// import { cn } from "@/lib/utils";

// import * as AccordionPrimitive from "@radix-ui/react-accordion";
// import { FileIcon, ArrowRightIcon, ArrowDown } from "lucide-react";
// import { TreeIndicator, useTree } from "../extention/tree-view-api";

// interface NodeComponentProps
//   extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

// type NodeProps = {
//   expendedItems?: string[];
//   element: any;
//   isSelectable?: boolean;
//   isSelect?: boolean;
// } & NodeComponentProps;

// const Node = forwardRef<
//   HTMLDivElement,
//   NodeProps & React.HTMLAttributes<HTMLDivElement>
// >(
//   (
//     {
//       className,
//       element,
//       value,
//       isSelectable = true,
//       isSelect,
//       children,
//       ...props
//     },
//     ref
//   ) => {
//     const {
//       direction,
//       handleExpand,
//       expendedItems,
//       indicator,
//       setExpendedItems,
//       openIcon,
//       closeIcon,
//     } = useTree();

//     return (
//       <AccordionPrimitive.Item
//         {...props}
//         value={value}
//         className="relative overflow-hidden h-full "
//       >
//         <AccordionPrimitive.Trigger
//           className={cn(
//             `flex items-center gap-1 text-sm rounded-md`,
//             className,
//             {
//               "bg-gray-700 rounded-md": isSelect && isSelectable,
//               "cursor-pointer": isSelectable,
//               "cursor-not-allowed opacity-50": !isSelectable,
//             }
//           )}
//           disabled={!isSelectable}
//           onClick={() => handleExpand(value)}
//         >
//           {expendedItems?.includes(value)
//             ? openIcon ?? <ArrowDown className="h-4 w-4" />
//             : closeIcon ?? <ArrowRightIcon className="h-4 w-4" />}
//           <span>{element}</span>
//         </AccordionPrimitive.Trigger>
//         <AccordionPrimitive.Content className="text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down relative overflow-hidden h-full">
//           {element && indicator && <TreeIndicator aria-hidden="true" />}
//           <AccordionPrimitive.Root
//             dir={direction}
//             type="multiple"
//             className="flex flex-col gap-1 py-1 ml-5 rtl:mr-5 "
//             defaultValue={expendedItems}
//             value={expendedItems}
//             onValueChange={(value) => {
//               setExpendedItems?.((prev) => [...(prev ?? []), value[0]]);
//             }}
//           >
//             {children}
//           </AccordionPrimitive.Root>
//         </AccordionPrimitive.Content>
//       </AccordionPrimitive.Item>
//     );
//   }
// );

// Node.displayName = "Node";

// const Leaf = forwardRef<
//   HTMLButtonElement,
//   {
//     value: string;
//     handleSelect?: (id: string) => void;
//     isSelectable?: boolean;
//     isSelect?: boolean;
//     LeafIcon?: React.ReactNode;
//   } & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
// >(
//   (
//     {
//       value,
//       className,
//       handleSelect,
//       isSelectable = true,
//       isSelect,
//       LeafIcon,
//       children,
//       ...props
//     },
//     ref
//   ) => {
//     const { direction, selectedId, selectItem } = useTree();
//     const isSelected = isSelect ?? selectedId === value;
//     return (
//       <AccordionPrimitive.Item value={value} className="relative">
//         <AccordionPrimitive.Trigger
//           ref={ref}
//           {...props}
//           dir={direction}
//           disabled={!isSelectable}
//           aria-label="Leaf"
//           className={cn(
//             "flex items-center gap-1 cursor-pointer text-sm pr-1 rtl:pl-1 rtl:pr-0 rounded-md  duration-200 ease-in-out",
//             {
//               "bg-gray-700": isSelected && isSelectable,
//             },
//             isSelectable ? "cursor-pointer" : "opacity-50 cursor-not-allowed",
//             className
//           )}
//           onClick={() => selectItem(value)}
//         >
//           {children}
//         </AccordionPrimitive.Trigger>
//       </AccordionPrimitive.Item>
//     );
//   }
// );

// Leaf.displayName = "Leaf";
// export { Node, Leaf };

