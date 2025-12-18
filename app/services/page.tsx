import Link from "next/link";

export default function ServicesPage() {
  return (
    <section>
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Services</h1>
        <p className="mt-2 text-neutral-400 max-w-xl">We help brands grow with clear strategy, beautiful design, and performant websites.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
          <h3 className="text-xl font-semibold">Brand Strategy</h3>
          <p className="mt-2 text-neutral-400">Research, positioning, and messaging to help your brand stand out.</p>
        </article>

        <article className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
          <h3 className="text-xl font-semibold">Visual Identity</h3>
          <p className="mt-2 text-neutral-400">Logos, color systems, and guidelines that scale across mediums.</p>
        </article>

        <article className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
          <h3 className="text-xl font-semibold">Website Design & Development</h3>
          <p className="mt-2 text-neutral-400">Thoughtful UX and modern front-end development for high-converting sites.</p>
        </article>
      </div>

      <div className="mt-10">
        <p className="text-neutral-400">Interested in working together?</p>
        <div className="mt-4">
          <Link href="#" className="inline-block bg-white text-black px-4 py-2 rounded-md hover:bg-neutral-200">Get in touch</Link>
        </div>
      </div>

      <p className="mt-8 text-sm text-neutral-500"><Link href="/">← Back to home</Link></p>
    </section>
  );
}
