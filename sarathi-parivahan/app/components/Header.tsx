export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
      <div className="text-xl font-bold tracking-wide">PARIVAHAN SEWA</div>
      <nav className="flex items-center gap-4 text-sm font-medium">
        <a className="hover:underline" href="/">Home</a>
        <a className="hover:underline" href="/services">Services</a>
        <a className="hover:underline" href="#">External Links</a>
        <button className="rounded border border-white/40 bg-white/80 px-4 py-1 text-xs font-semibold text-[#111] transition hover:opacity-90">
          Login
        </button>
      </nav>
    </header>
  );
}