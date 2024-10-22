"use client";
import TodoMenu from "./TodoMenu";
import { UseMutationResult } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
type todoPropsType = {
  id: string;
  created_at: string;
  description: string;
  isOpen: boolean;
  onToggleMenu: () => void;
  importantTodoHandler: UseMutationResult<void, Error, string, unknown>;
  deleteTodo: UseMutationResult<void, Error, string, unknown>; // Add this line
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
  completeTodo: UseMutationResult<void, Error, string, unknown>;
};

const TodoCard = ({
  onToggleMenu,
  isOpen,
  created_at,
  description,
  importantTodoHandler,
  id,
  deleteTodo,
  editTodo,
  completeTodo,
}: todoPropsType) => {
  const bgColors = ["#FBF0E4", "#E3EBFC", "#E4F6FC", "#FCE4E4"];
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(description);
  const [bgColor, setBgColor] = useState<string>(""); // State for the background color

  useEffect(() => {
    // Generate a random color on mount
    const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    setBgColor(randomColor);
  }, []);
  const editHandler = (todoId: string, description: string) => {
    if (
      newText.trim().toLocaleLowerCase() ===
      description.trim().toLocaleLowerCase()
    ) {
      alert("No changes detected");
      return;
    }

    if (newText.trim() === "") {
      alert("Title cannot be empty");
      return;
    }

    editTodo.mutate({
      id: todoId,
      newData: { description: newText },
    });
  };

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="mx-auto transition duration-300 hover:shadow-lg hover:scale-[101%] text-sm bg-[#E3EBFC] w-[343px] lg:w-[252px] p-3 pr-4 rounded-lg leading-[20px] font-inter"
    >
      <div>
        <span className="mb-4 gap-2 flex text-[14px] rounded-xl text-[#252931] p-1  w-[123px] items-center justify-center bg-[#F1F5FE]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            className="cursor-pointer"
          >
            <path
              d="M5 11.885C4.79333 11.885 4.61333 11.8083 4.46 11.655C4.30667 11.5017 4.23 11.3217 4.23 11.115C4.23 10.9083 4.30667 10.7287 4.46 10.576C4.61333 10.4233 4.79333 10.3467 5 10.346C5.20667 10.3453 5.38667 10.422 5.54 10.576C5.69333 10.73 5.77 10.91 5.77 11.116C5.77 11.322 5.69333 11.5017 5.54 11.655C5.38667 11.8083 5.20667 11.885 5 11.885ZM9 11.885C8.79333 11.885 8.61333 11.8083 8.46 11.655C8.30667 11.5017 8.23 11.3217 8.23 11.115C8.23 10.9083 8.30667 10.7287 8.46 10.576C8.61333 10.4233 8.79333 10.3467 9 10.346C9.20667 10.3453 9.38667 10.422 9.54 10.576C9.69333 10.73 9.77 10.91 9.77 11.116C9.77 11.322 9.69333 11.5017 9.54 11.655C9.38667 11.8083 9.20667 11.885 9 11.885ZM13 11.885C12.7933 11.885 12.6133 11.8083 12.46 11.655C12.3067 11.5017 12.23 11.3217 12.23 11.115C12.23 10.9083 12.3067 10.7287 12.46 10.576C12.6133 10.4233 12.7933 10.3467 13 10.346C13.2067 10.3453 13.3867 10.422 13.54 10.576C13.6933 10.73 13.77 10.91 13.77 11.116C13.77 11.322 13.6933 11.5017 13.54 11.655C13.3867 11.8083 13.2067 11.885 13 11.885ZM2.616 19C2.15533 19 1.771 18.846 1.463 18.538C1.155 18.23 1.00067 17.8457 1 17.385V4.61499C1 4.15499 1.15433 3.77099 1.463 3.46299C1.77167 3.15499 2.156 3.00066 2.616 2.99999H4.385V0.769989H5.462V2.99999H12.616V0.769989H13.616V2.99999H15.385C15.845 2.99999 16.2293 3.15432 16.538 3.46299C16.8467 3.77166 17.0007 4.15599 17 4.61599V17.385C17 17.845 16.846 18.2293 16.538 18.538C16.23 18.8467 15.8453 19.0007 15.384 19H2.616ZM2.616 18H15.385C15.5383 18 15.6793 17.936 15.808 17.808C15.9367 17.68 16.0007 17.5387 16 17.384V8.61599H2V17.385C2 17.5383 2.064 17.6793 2.192 17.808C2.32 17.9367 2.461 18.0007 2.615 18M2 7.61499H16V4.61499C16 4.46166 15.936 4.32066 15.808 4.19199C15.68 4.06332 15.5387 3.99932 15.384 3.99999H2.616C2.462 3.99999 2.32067 4.06399 2.192 4.19199C2.06333 4.31999 1.99933 4.46132 2 4.61599V7.61499Z"
              fill="#252931"
            />
            <path
              d="M2.616 18H15.385C15.5383 18 15.6793 17.936 15.808 17.808C15.9367 17.68 16.0007 17.5387 16 17.384V8.61599H2V17.385C2 17.5383 2.064 17.6793 2.192 17.808C2.32 17.9367 2.461 18.0007 2.615 18M2 7.61499H16V4.61499C16 4.46166 15.936 4.32066 15.808 4.19199C15.68 4.06332 15.5387 3.99932 15.384 3.99999H2.616C2.462 3.99999 2.32067 4.06399 2.192 4.19199C2.06333 4.31999 1.99933 4.46132 2 4.61599V7.61499ZM2 7.61499V3.99999M5 11.885C4.79333 11.885 4.61333 11.8083 4.46 11.655C4.30667 11.5017 4.23 11.3217 4.23 11.115C4.23 10.9083 4.30667 10.7287 4.46 10.576C4.61333 10.4233 4.79333 10.3467 5 10.346C5.20667 10.3453 5.38667 10.422 5.54 10.576C5.69333 10.73 5.77 10.91 5.77 11.116C5.77 11.322 5.69333 11.5017 5.54 11.655C5.38667 11.8083 5.20667 11.885 5 11.885ZM9 11.885C8.79333 11.885 8.61333 11.8083 8.46 11.655C8.30667 11.5017 8.23 11.3217 8.23 11.115C8.23 10.9083 8.30667 10.7287 8.46 10.576C8.61333 10.4233 8.79333 10.3467 9 10.346C9.20667 10.3453 9.38667 10.422 9.54 10.576C9.69333 10.73 9.77 10.91 9.77 11.116C9.77 11.322 9.69333 11.5017 9.54 11.655C9.38667 11.8083 9.20667 11.885 9 11.885ZM13 11.885C12.7933 11.885 12.6133 11.8083 12.46 11.655C12.3067 11.5017 12.23 11.3217 12.23 11.115C12.23 10.9083 12.3067 10.7287 12.46 10.576C12.6133 10.4233 12.7933 10.3467 13 10.346C13.2067 10.3453 13.3867 10.422 13.54 10.576C13.6933 10.73 13.77 10.91 13.77 11.116C13.77 11.322 13.6933 11.5017 13.54 11.655C13.3867 11.8083 13.2067 11.885 13 11.885ZM2.616 19C2.15533 19 1.771 18.846 1.463 18.538C1.155 18.23 1.00067 17.8457 1 17.385V4.61499C1 4.15499 1.15433 3.77099 1.463 3.46299C1.77167 3.15499 2.156 3.00066 2.616 2.99999H4.385V0.769989H5.462V2.99999H12.616V0.769989H13.616V2.99999H15.385C15.845 2.99999 16.2293 3.15432 16.538 3.46299C16.8467 3.77166 17.0007 4.15599 17 4.61599V17.385C17 17.845 16.846 18.2293 16.538 18.538C16.23 18.8467 15.8453 19.0007 15.384 19H2.616Z"
              stroke="#252931"
              strokeWidth="0.4"
            />
          </svg>
          {created_at}
        </span>
        <span>{description}</span>
      </div>
      <button onClick={onToggleMenu} className="ml-[98%] relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4"
          height="16"
          viewBox="0 0 4 16"
          fill="none"
          className="mt-1 cursor-pointer"
        >
          <path
            d="M3.20208 12.7979C2.88327 12.4791 2.45087 12.3 2 12.3C1.54913 12.3 1.11673 12.4791 0.797918 12.7979C0.479106 13.1167 0.3 13.5491 0.3 14C0.3 14.4509 0.479106 14.8833 0.797918 15.2021C1.11673 15.5209 1.54913 15.7 2 15.7C2.45087 15.7 2.88327 15.5209 3.20208 15.2021C3.52089 14.8833 3.7 14.4509 3.7 14C3.7 13.5491 3.52089 13.1167 3.20208 12.7979ZM3.20208 6.79792C2.88327 6.47911 2.45087 6.3 2 6.3C1.54913 6.3 1.11673 6.47911 0.797918 6.79792C0.479106 7.11673 0.3 7.54913 0.3 8C0.3 8.45087 0.479106 8.88327 0.797918 9.20208C1.11673 9.52089 1.54913 9.7 2 9.7C2.45087 9.7 2.88327 9.52089 3.20208 9.20208C3.52089 8.88327 3.7 8.45087 3.7 8C3.7 7.54913 3.52089 7.11673 3.20208 6.79792ZM3.20208 0.797918C2.88327 0.479106 2.45087 0.3 2 0.3C1.54913 0.3 1.11673 0.479106 0.797918 0.797918C0.479106 1.11673 0.3 1.54913 0.3 2C0.3 2.45087 0.479106 2.88327 0.797918 3.20208C1.11673 3.52089 1.54913 3.7 2 3.7C2.45087 3.7 2.88327 3.52089 3.20208 3.20208C3.52089 2.88327 3.7 2.45087 3.7 2C3.7 1.54913 3.52089 1.11673 3.20208 0.797918Z"
            fill="black"
            stroke="black"
            strokeWidth="0.4"
          />
        </svg>
        {isOpen && (
          <TodoMenu
            deleteTodo={deleteTodo}
            importantTodoHandler={importantTodoHandler}
            id={id}
            editTodo={editTodo}
            isEditing={isEditing}
            newText={newText}
            description={description}
            setNewText={setNewText}
            setIsEditing={setIsEditing}
            completeTodo={completeTodo}
          />
        )}
      </button>
      {isEditing && (
        <div className="flex font-inter items-center gap-2 outline-none  flex-wrap rounded-lg ">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Edit Your Todo ..."
            className="font-inter text-sm text-main-blue px-2 rounded-lg p-[3px] bg-gray-100 "
          />
          <button
            className="p-[3px] bg-gray-100 transition duration-150 hover:bg-gray-300 text-sm hover:text-white   rounded-lg px-2 font-inter"
            onClick={() => editHandler(id, description)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
