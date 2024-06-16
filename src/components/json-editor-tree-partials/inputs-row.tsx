
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"

type Props = {};

export default function InputsRow({}: Props) {
  return (
    <div className="flex items-center justify-center space-x-2 p-2">

      <div className="relative">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="object">Object</SelectItem>
              <SelectItem value="array">Array</SelectItem>
              <SelectItem value="string">String</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.5 7.5l4.5 4.5 4.5-4.5z" />
          </svg>
        </div>
      </div>

      <Input
        className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Title"
      />

      <Input
        className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Description"
      />

      <div className="flex space-x-2">
        <Button className="text-green-600 hover:text-green-800" asChild>
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H5a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <Button className="text-red-600 hover:text-red-800" asChild >
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 00-1 1v3H6a1 1 0 000 2h3v3a1 1 0 002 0v-3h3a1 1 0 000-2h-3V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
