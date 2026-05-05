import Image from "next/image";

const concepts = [
  {
    name: "Signal Mark",
    file: "/brand/oweba-signal-mark.svg",
    note: "The final symbol. Crisp at small sizes, distinct in silhouette, and ready for favicon or profile use.",
    surface: "paper"
  },
  {
    name: "Signal Wordmark",
    file: "/brand/oweba-signal-wordmark.svg",
    note: "The final wordmark system. A stronger custom WEBA build paired with the signal symbol as the leading O.",
    surface: "paper"
  },
  {
    name: "Signal Lockup",
    file: "/brand/oweba-signal-lockup.svg",
    note: "The polished final lockup for brand boards, proposals, and production use across the site.",
    surface: "paper"
  }
] as const;

export default function LogoConceptsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-16 md:px-10">
      <div className="max-w-3xl space-y-4 text-white">
        <p className="eyebrow-label text-[#F8F4EC]/72">Brand Study</p>
        <h1 className="text-[#F8F4EC]">Oweba Signal Final System</h1>
        <p className="text-lg leading-8 text-[#F8F4EC]/78">
          The chosen Signal direction refined into a final brand system: standalone mark, production-ready wordmark, and polished lockup for site and favicon use.
        </p>
      </div>

      <div className="grid gap-6">
        {concepts.map((concept) => (
          <section
            key={concept.name}
            className={`overflow-hidden rounded-[28px] border shadow-[0_24px_70px_rgba(7,20,43,0.16)] ${
              concept.surface === "paper"
                ? "border-[#D7D0C3] bg-[#F7F3EA]"
                : "border-white/10 bg-[rgba(248,244,236,0.92)]"
            }`}
          >
            <div className="flex flex-col gap-6 p-6 md:p-8">
              <div className="space-y-2">
                <p className="eyebrow-label text-[#163A70]/62">Concept</p>
                <h2>{concept.name}</h2>
                <p className="max-w-3xl text-base leading-7 text-[#1F2937]/72">{concept.note}</p>
              </div>
              <div
                className={`rounded-[22px] border p-6 md:p-10 ${
                  concept.surface === "paper"
                    ? "border-[#D7D0C3] bg-[#F7F3EA]"
                    : "border-[#163A70]/10 bg-white"
                }`}
              >
                <Image
                  src={concept.file}
                  alt={concept.name}
                  width={760}
                  height={240}
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="h-auto w-full"
                />
              </div>
              <p className="text-sm text-[#163A70]/68">
                Import asset from <code>{concept.file}</code>
              </p>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
