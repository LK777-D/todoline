import Image from "next/image";
import star from "@/assets/vectorr.svg";
import circle from "@/assets/circle.svg";
import iconDel from "@/assets/delete.svg";
import edit from "@/assets/edit.svg";
import { UseMutationResult } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
type TodoMenu = {
  importantTodoHandler: UseMutationResult<void, Error, string, unknown>;
  id: string;
  deleteTodo: UseMutationResult<void, Error, string, unknown>;
  editTodo: UseMutationResult<
    void,
    Error,
    { id: string; newData: { description?: string; complete?: boolean } },
    unknown
  >;
  isEditing: boolean;
  newText: string;
  setNewText: Dispatch<SetStateAction<string>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  description: string;
  completeTodo: UseMutationResult<void, Error, string, unknown>;
};

const TodoMenu = ({
  importantTodoHandler,
  id,
  deleteTodo,
  completeTodo,

  setIsEditing,
}: TodoMenu) => {
  return (
    <div className="bg-[#F6F6F7] font-inter  absolute top-6 right-0 rounded-lg w-[155px]">
      <ul className=" text-sm flex flex-col gap-2 px-4 py-2">
        <li className="hover:text-gray-500 transition duration-300 ease-linear flex items-center gap-2 cursor-pointer">
          <button
            className="flex items-center gap-1"
            onClick={() => importantTodoHandler.mutate(id)}
          >
            <Image src={star} alt={"icons"} /> Importance
          </button>
        </li>
        <li className="hover:text-gray-500 transition duration-300 ease-linear border-b pb-[2px] border-b-gray-200 flex items-center gap-2 cursor-pointer">
          <button
            className="flex items-center gap-1"
            onClick={() => completeTodo.mutate(id)}
          >
            <Image src={circle} alt={"icons"} /> Complete
          </button>
        </li>
        <li className="hover:text-gray-500 transition duration-300 ease-linear border-b pb-[2px] border-b-gray-200  flex items-center gap-2 cursor-pointer">
          <button
            className="flex items-center gap-1"
            onClick={() => setIsEditing(true)}
          >
            <Image src={edit} alt={"icons"} /> Edit
          </button>
        </li>
        <li className="hover:text-gray-500 transition duration-300 ease-linear flex items-center gap-2 cursor-pointer">
          <button
            className="flex items-center gap-1"
            onClick={() => deleteTodo.mutate(id)}
          >
            <Image src={iconDel} alt={"icons"} /> Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TodoMenu;
