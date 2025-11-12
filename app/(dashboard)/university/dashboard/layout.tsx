// app/dashboard/layout.tsx

import "@/components/Theme/styles/theme.css";
import Sidebar from "../dashboard/_components/Sidebar";
import Header from "../dashboard/_components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-bg min-h-screen flex">
      <aside
        className="hidden md:block border-r"
        style={{ width: 280 }}
      >
        <Sidebar />
      </aside>
      <section className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </section>
    </div>
  );
}
