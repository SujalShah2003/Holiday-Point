import React, { useEffect, useState } from "react";
import { Title } from "@mantine/core";

const Counter = ({ end = 1000, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const incrementTime = Math.floor(duration / end);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <Title tt="uppercase">
      {count.toLocaleString()}+
    </Title>
  );
};

export default Counter;