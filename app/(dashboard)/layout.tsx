import "@/components/Theme/styles/theme.css";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
