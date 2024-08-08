"use client";
import React, { useState } from "react";
import TimingOption from "./TimingOption";

const timings = [
  {
    name: "Morning",
    time: "8am-12pm",
  },
  {
    name: "Afternoon",
    time: "12pm-4pm",
  },
  {
    name: "Evening",
    time: "4pm-8pm",
  },
];
const TimingList = ({ handleChange }) => {
  const [selected, setSelected] = useState();
  return (
    <div className="w-full flex justify-between">
      {timings.map((timing) => (
        <TimingOption
          selected={selected == timing.name}
          setSelected={setSelected}
          handleChange={handleChange}
          timing={timing}
          key={timing}
        />
      ))}
    </div>
  );
};

export default TimingList;
