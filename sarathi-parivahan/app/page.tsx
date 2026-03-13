import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f2b630] text-[#111] font-sans">
      <Header />

      <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-3xl flex-col items-center justify-center px-6 py-10 sm:px-8">
        <section className="mb-10 rounded-xl bg-[#a47f30] px-7 py-6 shadow-xl shadow-black/20">
          <div className="flex gap-4">
            <span className="h-14 w-14 rounded-full bg-red-500 shadow-lg shadow-black/30" />
            <span className="h-14 w-14 rounded-full bg-yellow-400 shadow-lg shadow-black/30" />
            <span className="h-14 w-14 rounded-full bg-green-500 shadow-lg shadow-black/30" />
          </div>
        </section>

        <section className="mb-8 rounded-xl bg-[#f7c64f] px-7 py-6 text-center shadow-lg shadow-black/20">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#172a0f] sm:text-4xl">
            सड़क परिवहन और राज्यमार्ग मंत्रालय
          </h1>
          <p className="mt-2 text-lg font-semibold text-[#101b10]">Ministry of Road Transport Highways</p>
          <p className="mt-2 text-sm text-[#0f1b0f]">Safer roads. Better futures.</p>
        </section>

        <div className="mb-8 text-center">
          <p className="mb-6 text-lg font-semibold">What would you like to do today?</p>
          <a href="/services" className="inline-block rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#111] shadow-sm transition hover:opacity-90">
            Go to Services
          </a>
        </div>
      </main>
    </div>
  );
}
