import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ContextType = {
  toggleTheme: () => void;
  setToDarkMode?: () => void;
  setToLightMode?: () => void;
  isDark: boolean | null;
};

const defaultContext: ContextType = {
  toggleTheme: () => {
    console.warn('Theme should have been overriden');
  },
  isDark: false,
};

export const ThemeContext = createContext(defaultContext);

const getThemeFromStorage = () => {
  const storedTheme = window.localStorage.getItem('RedditThemeContext');

  if (storedTheme !== undefined && storedTheme !== null) {
    return JSON.parse(storedTheme) as boolean;
  }

  return null;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  const setToDarkMode = useCallback(() => setIsDark(true), []);
  const setToLightMode = useCallback(() => setIsDark(false), []);
  const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);

  useEffect(() => {
    const storedTheme = getThemeFromStorage();

    if (storedTheme !== null) {
      setIsDark(storedTheme);
      return;
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light').matches
    ) {
      setToLightMode();
      return;
    } else {
      setToDarkMode();
      return;
    }
  }, [setToDarkMode, setToLightMode]);

  useEffect(() => {
    if (isDark !== null) {
      window.localStorage.setItem('theme', isDark.toString());
    }

    if (isDark) {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    }
  }, [isDark]);

  const value = useMemo(
    () => ({ isDark, setToDarkMode, setToLightMode, toggleTheme }),
    [isDark, setToDarkMode, setToLightMode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
