import { useState, useEffect } from "react";
import { SCREEN_L, SCREEN_M, SCREEN_S } from "../utils/constants";

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
      }, 500);
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
