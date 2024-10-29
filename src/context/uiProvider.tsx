import React, {
  FC,
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  useEffect,
} from "react";

import { ThemeManager, Theme } from "../utils/storage";

type UIProviderProps = {
  theme: Theme;
  toggleTheme: () => void;
};

export const UIContext = createContext<UIProviderProps | undefined>(undefined);

export const useUIProvider = () => {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error("useUIProvider must be used within a UIProvider");
  }

  return context;
};

export const UIProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentTheme = ThemeManager.get();

      if (!currentTheme) {
        ThemeManager.set("light");
      } else {
        setTheme(currentTheme);
      }
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      ThemeManager.set(newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark'); // Toggles the dark class
      return newTheme;
    });
  };

  return (
    <UIContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
