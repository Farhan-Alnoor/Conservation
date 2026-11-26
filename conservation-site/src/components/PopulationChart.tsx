"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DataPoint = {
  year: number;
  estimate: number;
};

export default function PopulationChart({ data }: { data: DataPoint[] }) {
  return (
    <div className="h-64 w-full max-w-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 8, right: 16, bottom: 8, left: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            domain={[0, "auto"]}
            tickFormatter={(value: number) => value.toLocaleString()}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="estimate"
            stroke="#15803d"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}