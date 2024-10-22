"use client";
import { supabase } from "@/configuration/supbaseConfig";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "@tanstack/react-query";
import TodoCard from "../UI/TodoCard";
import { useState, useEffect, useRef } from "react";
import queryClient from "@/configuration/queryClient";
import "react-toastify/dist/ReactToastify.css";
const AllTodos = () => {
  const user = useUser();
  const [openTodoId, setOpenTodoId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState("");
  const todoCardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const fetchTodos = async () => {
    const { data: todos, error } = await supabase
      .from("todos")
      .select("id, description, created_at")
      .eq("user_id", user.user?.id)
      .not("important", "is", true)
      .not("complate", "is", true);

    if (error) {
      throw new Error(error.message);
    }
    return todos;
  };

  const deleteTodo = useMutation({
    mutationFn: async (todoId: string) => {
      const { error } = await supabase.from("todos").delete().eq("id", todoId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("todo deleted");
    },
    onError: (error) => {
      console.error("Unable to Delete Todo:", error);
    },
  });

  const importantTodoHandler = useMutation({
    mutationFn: async (todoId: string) => {
      const { error } = await supabase
        .from("todos")
        .update({ important: true })
        .eq("id", todoId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });

      console.log("todo marked as important");
    },
    onError: (error) => {
      console.error("Unable to mark Todo as Important", error);
    },
  });

  const completeTodo = useMutation({
    mutationFn: async (todoId: string) => {
      const { error } = await supabase
        .from("todos")
        .update({ complate: true })
        .eq("id", todoId);
      if (error) throw new Error(error.message);
      console.log(`todo complete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("cant complete todo", error);
    },
  });

  const editTodo = useMutation({
    mutationFn: async (todo: {
      id: string;
      newData: { description?: string; completed?: boolean };
    }) => {
      const { error } = await supabase
        .from("todos")
        .update(todo.newData)
        .eq("id", todo.id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      setIsEditing(false);
      setNewText("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error updating todo:", error);
    },
  });

  const {
    data: allTodos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    enabled: user.isLoaded && !!user.user,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openTodoId !== null &&
        todoCardRefs.current[openTodoId] &&
        !todoCardRefs.current[openTodoId]?.contains(event.target as Node)
      ) {
        setOpenTodoId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openTodoId]);

  if (isLoading) {
    return <div>Loading Todos...</div>;
  }

  if (isError) {
    return <div>lorem 35</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    } as const;
    return date.toLocaleDateString(undefined, options);
  };

  const toggleTodoMenu = (id: number) => {
    setOpenTodoId(openTodoId === id ? null : id);
  };

  return (
    <section className="flex flex-wrap items-start  p-7 gap-5 md:gap-2 lg:gap-2">
      {allTodos && allTodos.length > 0 ? (
        allTodos.map((todo) => (
          <div
            ref={(el) => {
              todoCardRefs.current[todo.id] = el;
            }}
            key={todo.id}
          >
            <TodoCard
              created_at={formatDate(todo.created_at)}
              description={todo.description}
              isOpen={openTodoId === todo.id}
              onToggleMenu={() => toggleTodoMenu(todo.id)}
              importantTodoHandler={importantTodoHandler}
              id={todo.id}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              isEditing={isEditing}
              newText={newText}
              setNewText={setNewText}
              setIsEditing={setIsEditing}
              completeTodo={completeTodo}
            />
          </div>
        ))
      ) : (
        <div className="font-bold font-inter text-center text-xl mt-10">
          <h1>No Todos</h1>
        </div>
      )}
    </section>
  );
};

export default AllTodos;
