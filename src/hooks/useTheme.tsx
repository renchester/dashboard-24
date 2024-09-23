import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === null || context === undefined) {
    throw new Error('useTheme must be used within the ThemeProvider');
  }

  return context;
};
