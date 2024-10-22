import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/configuration/supbaseConfig";
import { useUser } from "@clerk/clerk-react";

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {
  const user = useUser();

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.user?.id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    enabled: !!user,
  });

  const importentNum = todos?.filter((todo) => todo.important).length;
  const completeTodos = todos?.filter((todo) => todo.complate).length;
  const totalNum = todos?.length;

  const chartData = {
    labels: ["Important", "Complete", "Total"],
    datasets: [
      {
        label: "Todos",
        data: [importentNum, completeTodos, totalNum],
        backgroundColor: ["#8b0d28", "#107a2a", "#2971a1"],
        hoverOffset: 2,
      },
    ],
  };

  return (
    <section className="flex justify-center font-inter py-5">
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 gap-5 items-center mx-auto">
          <div className=" bg-white rounded-lg border border-gray-200 font-inter w-[164px] h-[144px] shadow-custom-shadow px-2 py-2">
            <div className="text-main-blue text-base font-medium">
              <h2 className="border-b">All Tasks</h2>
            </div>
            <div className="pt-6">
              <h3 className="text-main-blue font-medium text-[27px] text-center">
                {totalNum}
              </h3>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 font-inter w-[164px] h-[144px]  px-2 py-2">
            <div className="text-main-blue text-base font-medium">
              <h2 className="border-b">Important</h2>
            </div>
            <div className="pt-6">
              <h2 className="text-main-blue  font-medium text-[27px] text-center">
                {importentNum}
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 font-inter w-[164px] h-[144px]  px-2 py-2">
            <div className="text-base font-medium">
              <h2 className="border-b">Stuck</h2>
            </div>
            <div className="pt-6">
              <h3 className=" font-medium text-[27px] text-center">0</h3>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200  font-inter w-[164px] h-[144px] shadow-custom-shadow px-2 py-2">
            <div className=" text-base font-medium">
              <h2 className="border-b">Complete</h2>
            </div>
            <div className="pt-6">
              <h3 className=" font-medium text-[27px] text-center">
                {completeTodos}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white w-[80vw] border p-3 border-gray-200 lg:max-w-[700px] flex flex-col items-center rounded-lg mt-5">
          <h1 className="text-left mr-auto p-5 font-normal text-lg  border-b-gray-200">
            Task by Status
          </h1>
          <div>
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Charts;
