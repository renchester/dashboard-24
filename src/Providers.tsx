import { ThemeProvider } from './providers/ThemeProvider';

function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default Providers;
