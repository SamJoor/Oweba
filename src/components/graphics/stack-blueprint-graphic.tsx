export function StackBlueprintGraphic() {
  return (
    <div className="relative h-[220px] overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(248,244,236,0.1),rgba(248,244,236,0.03))]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(248,244,236,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(248,244,236,0.08)_1px,transparent_1px)] bg-[size:26px_26px] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(248,244,236,0.18),transparent_26%),radial-gradient(circle_at_72%_66%,rgba(47,107,255,0.22),transparent_28%)]" />

      <div className="absolute left-[8%] top-[12%] h-[62%] w-[78%] rotate-[-8deg] rounded-[24px] border border-[#E7E1D6]/30" />
      <div className="absolute left-[12%] top-[15%] h-[62%] w-[78%] rotate-[-2deg] rounded-[24px] border border-[#E7E1D6]/35 bg-[rgba(248,244,236,0.06)] shadow-[0_20px_50px_rgba(0,0,0,0.16)] backdrop-blur-sm" />

      <div className="absolute left-[18%] top-[18%] w-[48%] rounded-[20px] border border-[#F8F4EC]/28 bg-[rgba(248,244,236,0.12)] p-3 shadow-[0_18px_36px_rgba(10,14,26,0.24)] backdrop-blur-md">
        <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-[#F8F4EC]/68">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#F8F4EC]/75" />
            <span className="h-2 w-2 rounded-full bg-[#2F6BFF]" />
          </div>
          <span>Studio board</span>
        </div>

        <div className="mt-3 rounded-[16px] border border-[#F8F4EC]/16 bg-[rgba(22,58,112,0.88)] p-3">
          <div className="grid grid-cols-[1.25fr_0.75fr] gap-2">
            <div className="space-y-2">
              <div className="h-16 rounded-[14px] border border-[#F8F4EC]/12 bg-[linear-gradient(180deg,rgba(47,107,255,0.42),rgba(47,107,255,0.14))]" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-7 rounded-[10px] border border-[#F8F4EC]/12 bg-[#F8F4EC]/6" />
                <div className="h-7 rounded-[10px] border border-[#F8F4EC]/12 bg-[#F8F4EC]/6" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-11 rounded-[12px] border border-[#F8F4EC]/12 bg-[#F8F4EC]/6" />
              <div className="h-11 rounded-[12px] border border-[#F8F4EC]/12 bg-[#F8F4EC]/6" />
              <div className="ml-auto h-6 w-12 rounded-[8px] bg-[#2F6BFF]" />
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-[1.2fr_0.8fr] gap-3 text-[8px] uppercase tracking-[0.18em] text-[#F8F4EC]/52">
          <div className="space-y-1.5">
            <span className="block">Frontend system</span>
            <div className="h-px w-full bg-[#F8F4EC]/14" />
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="h-5 rounded-[6px] border border-[#F8F4EC]/10 bg-[#F8F4EC]/6" />
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <span className="block">Data + flow</span>
            <div className="h-px w-full bg-[#F8F4EC]/14" />
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-5 rounded-[6px] border border-[#F8F4EC]/10 bg-[#F8F4EC]/6" />
              <div className="h-5 rounded-[6px] border border-[#F8F4EC]/10 bg-[#F8F4EC]/6" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-[10%] top-[17%] flex flex-col gap-2">
        {[
          { label: "Next.js", top: "0%" },
          { label: "TypeScript", top: "18%" },
          { label: "Supabase", top: "36%" },
          { label: "Resend", top: "54%" }
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-full border border-[#E7E1D6]/28 bg-[rgba(248,244,236,0.14)] px-3 py-1.5 text-[10px] font-medium text-[#F8F4EC] shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-sm"
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className="absolute left-[64%] top-[26%] h-px w-[12%] bg-[#E7E1D6]/36" />
      <div className="absolute left-[64%] top-[44%] h-px w-[12%] bg-[#E7E1D6]/36" />
      <div className="absolute left-[64%] top-[62%] h-px w-[12%] bg-[#E7E1D6]/36" />
      <div className="absolute bottom-[18%] left-[7%] right-[8%] flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-[#F8F4EC]/48">
        <span>Blueprinted stack</span>
        <span>Built to scale</span>
      </div>
    </div>
  );
}
