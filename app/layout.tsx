import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bloom Branding",
  description: "Creative branding studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white antialiased">
        <header className="border-b border-neutral-800">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Bloom Branding
            </Link>

            <nav>
              <ul className="flex gap-6 items-center">
                <li>
                  <Link href="/" className="text-neutral-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-neutral-300 hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="text-neutral-400 hover:text-white text-sm px-3 py-1 rounded-md border border-neutral-800 hover:border-neutral-700">
                    Admin
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>

        <footer className="border-t border-neutral-800 mt-12">
          <div className="max-w-5xl mx-auto px-6 py-6 text-sm text-neutral-400">© {new Date().getFullYear()} Bloom Branding</div>
        </footer>
      </body>
    </html>
  );
}
