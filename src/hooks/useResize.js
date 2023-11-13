import { useState, useEffect } from "react";
import { SCREEN_L, SCREEN_M, SCREEN_S, WINDOW_RESIZE_TIME_OUT } from "../utils/constants";

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };

    // window.addEventListener("resize", handleResize);
    window.addEventListener("resize", (event) => {
      setTimeout(() => {
        handleResize(event);
      }, WINDOW_RESIZE_TIME_OUT);
    });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    isScreenLarge: width >= SCREEN_L,
    isScreenMedium: width >= SCREEN_M,
    isScreenSmall: width <= SCREEN_S,
  };
};
