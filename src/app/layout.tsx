import type { Metadata } from "next";
import "../styles/globals.css";
import { Header } from "../components";

export const metadata: Metadata = {
  title: "LaunchpadX",
  description: "test app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className={"app"}>{children}</div>
      </body>
    </html>
  );
}
