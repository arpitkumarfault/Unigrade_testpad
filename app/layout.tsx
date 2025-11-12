import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";

function NoFlashScript() {
  const code = `
    try {
      var t = localStorage.getItem('theme')|| 'system';
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      var effective = t === 'system' ? (prefersDark ? 'dark' : 'light') : t;
      var root = document.documentElement;
      if (effective === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');
    } catch (_) {}
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <NoFlashScript />
      </head>
      <body>
        <ThemeProvider>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
