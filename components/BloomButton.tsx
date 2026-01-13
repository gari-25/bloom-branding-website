export default function BloomButton({ label }: { label: string }) {
  return (
    <button className="px-8 py-4 rounded-full bg-[var(--blue)] text-white hover:scale-105 transition-transform">
      {label}
    </button>
  );
}
