import TOCWrapper from "@/components/json-editor-tree-partials/toc"

type Props = {}

function JsonEditorPage({}: Props) {
  return (
    <main className="flex min-h-screen  items-center justify-between p-24 w-full h-screen space-x-4">
    <div className="justify-center flex  bg-gray-800 text-white h-[50%] w-[30%]">
     <TOCWrapper/>
    </div>
    <div className="justify-center flex w-[70%] bg-gray-800 text-white h-[50%]">
     <TOCWrapper/>
    </div>
  </main>
  )
}

export default JsonEditorPage