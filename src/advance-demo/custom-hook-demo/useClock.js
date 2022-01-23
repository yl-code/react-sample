import { useEffect, useState } from "react";

export const useClock = () => {
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return clock;
};
