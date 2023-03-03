import { useCallback, useEffect, useState } from "react";
import { DARK_THEME, LIGHT_THEME } from "../constant";

export default function useTheme() {
  const [theme, setTheme] = useState(false);
  const [styleTheme, setStyleTheme] = useState({});

  const handleSwitchTheme = useCallback(() => {
    setTheme((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (theme) {
      setStyleTheme(DARK_THEME);
    } else {
      setStyleTheme(LIGHT_THEME);
    }
  }, [theme]);

  return {
    theme,
    handleSwitchTheme,
    styleTheme
  }
}