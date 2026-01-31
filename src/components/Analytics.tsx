import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { Transaction } from "../types/transaction";


interface AnalyticsProps {
  transactions: Transaction[];
}

export default function Analytics({ transactions }: AnalyticsProps) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const data = [
    { name: "Income", value: income },
    { name: "Expenses", value: expense },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  if (transactions.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        Add transactions to see analytics
      </p>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md mt-8 ">
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>

      <div className="w-full h-64 min-w-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
