import React from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-12">
          <header className="mb-10 flex flex-col items-center gap-4">
            {/* Only show the logo image */}
            <img
              src="/Logo.png"
              alt="Todo App Logo"
              className="h-10 w-auto"
              style={{ objectFit: "contain" }}
            />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
