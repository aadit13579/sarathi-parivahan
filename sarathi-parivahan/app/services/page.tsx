import Header from "../components/Header";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#f2b630] text-[#111] font-sans">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        <section className="mb-6 rounded-xl bg-white/90 p-6 shadow-lg shadow-black/15 backdrop-blur">
          <h2 className="mb-6 text-2xl font-bold text-[#111]">Our Services</h2>

          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-[#333]">Informational Services</h3>
            <div className="grid gap-3 sm:grid-cols-4">
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#fafafa] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">📍 Change of Address</a>
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#fafafa] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">🪪 Duplicate DL</a>
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#fafafa] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">🔁 Transfer of Ownership</a>
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#fafafa] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">📝 Duplicate RC</a>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-[#333]">Online Services</h3>
            <div className="grid gap-3 sm:grid-cols-4">
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#f2f2f2] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">🔍 LLR Search</a>
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#f2f2f2] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">🏷️ RTO Number Search</a>
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#f2f2f2] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">⚠️ e-Challan</a>
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#f2f2f2] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">📱 mParivahan</a>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-[#333]">Vehicle Services</h3>
            <div className="grid gap-3 sm:grid-cols-4">
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#f7f7f7] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">🛠️ Smartcard Fitness</a>
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#f7f7f7] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">🧾 e-Cord</a>
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#f7f7f7] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">🚚 VLP Master</a>
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#f7f7f7] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">🧾 e-Owner</a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-[#333]">Other Services</h3>
            <div className="grid gap-3 sm:grid-cols-4">
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#fafafa] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">🆕 Permit Renewal</a>
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#fafafa] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">🕵️ Violation Lookup</a>
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#fafafa] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">💰 Tax Info</a>
              <a href="#" className="rounded-lg border border-[#ccc] bg-[#fafafa] p-3 text-center text-sm font-medium transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:border-[#aaa]">💬 Feedback</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}