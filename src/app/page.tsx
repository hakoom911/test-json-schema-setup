import JsonSchemaEditor from "@/components/json-schema-editor";
import TOCWrapper from "@/components/json-editor-tree-partials/toc"
import Link from "next/link";
export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <JsonSchemaEditor />
      <div className="justify-center flex w-full bg-gray-800 text-white h-[25%]">
       <TOCWrapper/>
      </div>
      <Link href={'/json-schema-editor'}>
      Json Schema Editor 
      </Link>
    </main>
  );
}
