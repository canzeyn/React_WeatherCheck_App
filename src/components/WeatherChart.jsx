import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const WeatherChart = () => {
  const data = [
    { time: "08:00", derece: 30 },
    { time: "12:00", derece: 34 },
    { time: "14:00", derece: 34 },
    { time: "16:00", derece: 30 },
    { time: "18:00", derece: 28 },
    { time: "20:00", derece: 25 },
    { time: "24:00", derece: 23 },
    { time: "02:00", derece: 18 },
    { time: "04:00", derece: 16 },
  ];

  return (
   
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="derece" stroke="#FFF7D4" fill="#FFF7D4" name="Derece (°C)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    
  );
};

export default WeatherChart;

