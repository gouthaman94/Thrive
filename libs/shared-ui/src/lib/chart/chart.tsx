import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

/* eslint-disable-next-line */
export interface ChartProps {}

const colors = ["#f0e40e", "#5ff00e", "#0ddef4", "#f70c4f"];

export const Charts = (props) => {
  const { columns, data } = props;
  const [xAxis, ...yAxis] = [...columns];
  return (
    <BarChart
      width={400}
      height={200}
      data={data}
      margin={{
        top: 5,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey={xAxis} />
      <YAxis />
      <Tooltip />
      <Legend />
      {yAxis?.map((x) => {
        return (
          <Bar
            dataKey={x}
            fill={colors[Math.floor(Math.random() * colors.length)]}
          />
        );
      })}
    </BarChart>
  );
};
