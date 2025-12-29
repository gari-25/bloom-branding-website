import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Bloom Branding</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b">
        <Link
          href="/"
          className="px-4 py-2 border-b-2 border-black font-semibold"
        >
          Home
        </Link>

        <Link
          href="/services"
          className="px-4 py-2 text-gray-500 hover:text-black"
        >
          Services
        </Link>

        <Link
          href="/contact"
          className="px-4 py-2 text-gray-500 hover:text-black"
        >
          Contact
        </Link>
      </div>
    </main>
  );
}
