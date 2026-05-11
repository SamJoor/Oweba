"use client";

import { useCallback, useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

const SESSION_KEY = "oweba-blueprint-intro-seen";

type IntroPhase = "checking" | "playing" | "fading" | "hidden";

type IntroConfig = {
  bg: string;
  ink: string;
  accent: string;
  royal: string;
  timeScale: number;
  duration: number;
  fade: number;
  angle: number;
  density: number;
  weight: number;
  navCount: number;
  cardCount: number;
  plate: boolean;
  compass: boolean;
  title: boolean;
  dims: boolean;
  underlines: boolean;
  grid: boolean;
  sheet: string;
  proj: string;
};

const DESKTOP_CONFIG: IntroConfig = {
  bg: "#163A70",
  ink: "#F8F4EC",
  accent: "#F8C24A",
  royal: "#2F6BFF",
  timeScale: 0.75,
  duration: 4667,
  fade: 700,
  angle: 2,
  density: 24,
  weight: 1,
  navCount: 5,
  cardCount: 3,
  plate: true,
  compass: true,
  title: true,
  dims: true,
  underlines: true,
  grid: true,
  sheet: "Sheet H-01 - Homepage - 1:1",
  proj: "OWEBA.COM"
};

const MOBILE_CONFIG: IntroConfig = {
  ...DESKTOP_CONFIG,
  timeScale: 0.58,
  duration: 4200,
  fade: 620,
  angle: 0.5,
  density: 20,
  navCount: 3,
  cardCount: 0,
  compass: false,
  title: false,
  dims: false,
  sheet: "Sheet H-01",
  proj: "OWEBA"
};

const monoFont = 'var(--font-mono, "JetBrains Mono"), ui-monospace, SFMono-Regular, monospace';

const scaleMs = (cfg: IntroConfig, value: number) => Math.max(1, Math.round(value * cfg.timeScale));
const resolveFadeMs = (cfg: IntroConfig) => Math.min(scaleMs(cfg, cfg.duration) - 40, Math.max(380, scaleMs(cfg, cfg.fade)));

export function BlueprintIntro() {
  const [phase, setPhase] = useState<IntroPhase>("playing");
  const [runKey, setRunKey] = useState(1);
  const [showReplay, setShowReplay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeConfig = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;
  const totalDuration = scaleMs(activeConfig, activeConfig.duration);
  const fadeDuration = resolveFadeMs(activeConfig);

  const startIntro = useCallback((markSeen: boolean) => {
    if (typeof window !== "undefined" && markSeen) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    }

    setRunKey((current) => current + 1);
    setShowReplay(false);
    setPhase("playing");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => setIsMobile(media.matches);
    updateMobile();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", updateMobile);
      return () => media.removeEventListener("change", updateMobile);
    }

    media.addListener(updateMobile);
    return () => media.removeListener(updateMobile);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initTimer = window.setTimeout(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const hasSeenIntro = window.sessionStorage.getItem(SESSION_KEY) === "1";

      if (reducedMotion) {
        setPhase("hidden");
        return;
      }

      if (hasSeenIntro) {
        setPhase("hidden");
        setShowReplay(true);
        return;
      }

      window.sessionStorage.setItem(SESSION_KEY, "1");
    }, 0);

    return () => window.clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;

    const fadeTimer = window.setTimeout(() => {
      setPhase("fading");
    }, totalDuration - fadeDuration);

    const hideTimer = window.setTimeout(() => {
      setPhase("hidden");
      setShowReplay(true);
    }, totalDuration);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [fadeDuration, phase, runKey, totalDuration]);

  const replay = useCallback(() => {
    startIntro(false);
  }, [startIntro]);

  const shouldRenderOverlay = phase === "playing" || phase === "fading";

  return (
    <>
      {shouldRenderOverlay ? (
        <BlueprintIntroOverlay key={`${runKey}-${isMobile ? "mobile" : "desktop"}`} cfg={activeConfig} />
      ) : null}

      {showReplay ? (
        <button type="button" onClick={replay} style={replayButtonStyle}>
          Replay intro
        </button>
      ) : null}
    </>
  );
}

function BlueprintIntroOverlay({ cfg }: { cfg: IntroConfig }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        pointerEvents: "none",
        background: cfg.bg,
        color: cfg.ink,
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        overflow: "hidden",
        animation: `bpi-overlay-out ${scaleMs(cfg, cfg.duration)}ms ease-out forwards`
      }}
    >
      <StyleBlock cfg={cfg} />
      {cfg.grid ? <Paper cfg={cfg} /> : null}
      {cfg.plate ? <Plate cfg={cfg} /> : null}
      <Sequence cfg={cfg} />
      {cfg.title ? <TitleBlock cfg={cfg} /> : null}
    </div>
  );
}

function StyleBlock({ cfg }: { cfg: IntroConfig }) {
  const totalMs = scaleMs(cfg, cfg.duration);
  const fadeMs = resolveFadeMs(cfg);
  const overlayHoldPercent = Math.max(0, Math.min(100, ((totalMs - fadeMs) / totalMs) * 100));

  return (
    <style>{`
      @keyframes bpi-fade { from { opacity: 0 } to { opacity: 1 } }
      @keyframes bpi-draw-x { from { transform: scaleX(0) } to { transform: scaleX(1) } }
      @keyframes bpi-title-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
      @keyframes bpi-compass-spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      @keyframes bpi-overlay-out {
        0%, ${overlayHoldPercent}% { opacity: 1; visibility: visible; }
        100% { opacity: 0; visibility: hidden; }
      }
      .bpi-rect { position: absolute; border: ${cfg.weight}px solid ${cfg.ink}; }
      .bpi-fade-in { opacity: 0; animation: bpi-fade ${scaleMs(cfg, 300)}ms ease-out forwards; }
      .bpi-dashed { border-style: dashed !important; border-color: ${cfg.ink}73 !important; }
      .bpi-accent-bg { background: ${cfg.accent} !important; }
      .bpi-mono { font-family: ${monoFont}; letter-spacing: 0.14em; text-transform: uppercase; }
    `}</style>
  );
}

function Paper({ cfg }: { cfg: IntroConfig }) {
  const density = cfg.density;

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${cfg.ink}0d 1px, transparent 1px),
            linear-gradient(90deg, ${cfg.ink}0d 1px, transparent 1px),
            linear-gradient(${cfg.ink}1f 1px, transparent 1px),
            linear-gradient(90deg, ${cfg.ink}1f 1px, transparent 1px)
          `,
          backgroundSize: `${density}px ${density}px, ${density}px ${density}px, ${density * 5}px ${density * 5}px, ${density * 5}px ${density * 5}px`
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)"
        }}
      />
    </>
  );
}

function Plate({ cfg }: { cfg: IntroConfig }) {
  return (
    <>
      <div
        className="bpi-fade-in"
        style={{
          position: "absolute",
          inset: "clamp(20px, 3vw, 40px)",
          border: `1px solid ${cfg.ink}47`,
          animationDelay: `${scaleMs(cfg, 150)}ms`
        }}
      />
      <div
        className="bpi-fade-in"
        style={{
          position: "absolute",
          inset: "calc(clamp(20px, 3vw, 40px) + 6px)",
          border: `1px solid ${cfg.ink}1f`,
          animationDelay: `${scaleMs(cfg, 200)}ms`
        }}
      />
      <div
        className="bpi-mono bpi-fade-in"
        style={{
          position: "absolute",
          top: "clamp(28px, 4vw, 52px)",
          right: "clamp(40px, 6vw, 72px)",
          fontSize: 10,
          color: `${cfg.ink}8c`,
          animationDelay: `${scaleMs(cfg, 400)}ms`
        }}
      >
        {cfg.sheet}
      </div>
      {cfg.compass ? (
        <div
          className="bpi-fade-in"
          style={{
            position: "absolute",
            right: "clamp(50px, 5vw, 72px)",
            bottom: "clamp(50px, 5vw, 72px)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: `1px solid ${cfg.ink}47`,
            animationDelay: `${scaleMs(cfg, 500)}ms`
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 4,
              borderRadius: "50%",
              border: `1px solid ${cfg.ink}1f`
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 4,
              left: "50%",
              width: 1,
              height: "46%",
              background: cfg.accent,
              transformOrigin: "bottom center",
              animation: `bpi-compass-spin ${scaleMs(cfg, cfg.duration)}ms linear infinite`
            }}
          />
        </div>
      ) : null}
    </>
  );
}

function Animated({
  cfg,
  delay,
  duration,
  style,
  children
}: {
  cfg: IntroConfig;
  delay: number;
  duration: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        ...style,
        opacity: 0,
        animation: `bpi-fade ${scaleMs(cfg, duration)}ms ease-out ${scaleMs(cfg, delay)}ms forwards`
      }}
    >
      {children}
    </div>
  );
}

function DimensionH({
  cfg,
  delay,
  top,
  left,
  width,
  value
}: {
  cfg: IntroConfig;
  delay: number;
  top: string;
  left: string;
  width: string;
  value: string;
}) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top,
          left,
          width,
          height: 1,
          background: cfg.accent,
          opacity: 0.8,
          transform: "scaleX(0)",
          transformOrigin: "left",
          animation: `bpi-draw-x ${scaleMs(cfg, 600)}ms ease-out ${scaleMs(cfg, delay)}ms forwards`
        }}
      />
      <div
        style={{
          position: "absolute",
          top: `calc(${top} - 4px)`,
          left,
          width: 1,
          height: 8,
          background: cfg.accent,
          opacity: 0,
          animation: `bpi-fade ${scaleMs(cfg, 200)}ms ease-out ${scaleMs(cfg, delay + 100)}ms forwards`
        }}
      />
      <div
        style={{
          position: "absolute",
          top: `calc(${top} - 4px)`,
          left: `calc(${left} + ${width} - 1px)`,
          width: 1,
          height: 8,
          background: cfg.accent,
          opacity: 0,
          animation: `bpi-fade ${scaleMs(cfg, 200)}ms ease-out ${scaleMs(cfg, delay + 500)}ms forwards`
        }}
      />
      <div
        className="bpi-mono"
        style={{
          position: "absolute",
          top: `calc(${top} - 10px)`,
          left: `calc(${left} + (${width}) / 2)`,
          transform: "translate(-50%, -50%)",
          padding: "0 6px",
          fontSize: 9,
          color: cfg.accent,
          background: cfg.bg,
          opacity: 0,
          whiteSpace: "nowrap",
          animation: `bpi-fade ${scaleMs(cfg, 300)}ms ease-out ${scaleMs(cfg, delay + 400)}ms forwards`
        }}
      >
        {value}
      </div>
    </>
  );
}

function Sequence({ cfg }: { cfg: IntroConfig }) {
  const compact = cfg.cardCount === 0;
  const stageInset = compact ? "clamp(44px, 8vw, 76px) clamp(22px, 5vw, 40px)" : "clamp(60px, 7vw, 100px) clamp(40px, 6vw, 90px)";
  const boardTop = compact ? "18%" : "14%";
  const boardWidth = compact ? "48%" : "42%";
  const boardHeight = compact ? "34%" : "40%";

  return (
    <div style={{ position: "absolute", inset: stageInset }}>
      <Animated cfg={cfg} delay={300} duration={500} style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <div className="bpi-rect" style={{ position: "relative", width: "100%", height: 52, borderRadius: 14 }} />
      </Animated>

      <Animated cfg={cfg} delay={500} duration={350} style={{ position: "absolute", top: 14, left: 18 }}>
        <div className="bpi-rect" style={{ position: "relative", width: 86, height: 24, borderRadius: 3 }} />
      </Animated>

      {Array.from({ length: cfg.navCount }).map((_, index) => (
        <Animated
          cfg={cfg}
          key={`nav-${index}`}
          delay={650 + index * 70}
          duration={240}
          style={{ position: "absolute", top: 24, left: `calc(${22 + (cfg.navCount > 4 ? 0 : 6)}% + ${index * 68}px)` }}
        >
          <div style={{ width: 48, height: 3, background: `${cfg.ink}e6` }} />
        </Animated>
      ))}

      <Animated cfg={cfg} delay={900} duration={360} style={{ position: "absolute", top: 13, right: 18 }}>
        <div
          className="bpi-rect bpi-accent-bg"
          style={{
            position: "relative",
            width: 100,
            height: 26,
            borderRadius: 13,
            borderColor: cfg.accent
          }}
        />
      </Animated>

      <Animated
        cfg={cfg}
        delay={1000}
        duration={600}
        style={{ position: "absolute", top: 90, right: 0, bottom: compact ? "32%" : "50%", left: 0 }}
      >
        <div className="bpi-rect bpi-dashed" style={{ position: "relative", width: "100%", height: "100%", borderRadius: 10 }} />
      </Animated>

      <Animated cfg={cfg} delay={1100} duration={520} style={{ position: "absolute", top: "25%", left: "4%", width: compact ? "56%" : "48%" }}>
        <div style={{ width: "95%", height: 18, background: `${cfg.ink}f2` }} />
      </Animated>

      <Animated cfg={cfg} delay={1350} duration={520} style={{ position: "absolute", top: "calc(25% + 28px)", left: "4%", width: compact ? "52%" : "44%" }}>
        <div style={{ width: "85%", height: 18, background: `${cfg.ink}f2` }} />
      </Animated>

      {cfg.underlines ? (
        <>
          <Animated cfg={cfg} delay={1500} duration={300} style={{ position: "absolute", top: "calc(25% + 22px)", left: "2%", width: compact ? "58%" : "50%" }}>
            <div style={{ height: 1, background: cfg.royal, opacity: 0.7 }} />
          </Animated>
          <Animated cfg={cfg} delay={1600} duration={300} style={{ position: "absolute", top: "calc(25% + 56px)", left: "2%", width: compact ? "54%" : "46%" }}>
            <div style={{ height: 1, background: cfg.royal, opacity: 0.7 }} />
          </Animated>
        </>
      ) : null}

      <Animated cfg={cfg} delay={1650} duration={380} style={{ position: "absolute", top: "calc(25% + 80px)", left: "4%", width: compact ? "44%" : "34%" }}>
        <div style={{ height: 4, marginBottom: 6, background: `${cfg.ink}8c` }} />
      </Animated>

      <Animated cfg={cfg} delay={1800} duration={380} style={{ position: "absolute", top: "calc(25% + 92px)", left: "4%", width: compact ? "38%" : "30%" }}>
        <div style={{ height: 4, background: `${cfg.ink}8c` }} />
      </Animated>

      <Animated cfg={cfg} delay={2000} duration={340} style={{ position: "absolute", top: "calc(25% + 120px)", left: "4%" }}>
        <div
          className="bpi-rect bpi-accent-bg"
          style={{
            position: "relative",
            width: 140,
            height: 36,
            borderRadius: 18,
            borderColor: cfg.accent
          }}
        />
      </Animated>

      {!compact ? (
        <Animated cfg={cfg} delay={2150} duration={340} style={{ position: "absolute", top: "calc(25% + 120px)", left: "calc(4% + 156px)" }}>
          <div className="bpi-rect" style={{ position: "relative", width: 120, height: 36, borderRadius: 18 }} />
        </Animated>
      ) : null}

      <Animated
        cfg={cfg}
        delay={1800}
        duration={800}
        style={{
          position: "absolute",
          top: boardTop,
          right: compact ? "0%" : "2%",
          width: boardWidth,
          height: boardHeight,
          transform: `rotate(${cfg.angle}deg)`,
          transformOrigin: "center"
        }}
      >
        <div className="bpi-rect" style={{ position: "relative", width: "100%", height: "100%", borderRadius: 14 }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, opacity: 0.28 }}
          >
            <line x1="0" y1="0" x2="100" y2="100" stroke={cfg.ink} strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
            <line x1="100" y1="0" x2="0" y2="100" stroke={cfg.ink} strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </Animated>

      {cfg.dims ? <DimensionH cfg={cfg} delay={2300} top="61%" left="0%" width="50%" value="1440" /> : null}

      {Array.from({ length: cfg.cardCount }).map((_, index) => (
        <Animated
          cfg={cfg}
          key={`card-${index}`}
          delay={2700 + index * 150}
          duration={480}
          style={{
            position: "absolute",
            top: "72%",
            left: `calc(${index * (100 / cfg.cardCount)}% + 4px)`,
            width: `calc(${100 / cfg.cardCount}% - 8px)`,
            height: "22%"
          }}
        >
          <div className="bpi-rect" style={{ position: "relative", width: "100%", height: "100%", borderRadius: 10 }}>
            <div
              className="bpi-mono"
              style={{
                position: "absolute",
                top: 10,
                left: 12,
                fontSize: 10,
                color: cfg.accent,
                opacity: 0,
                animation: `bpi-fade ${scaleMs(cfg, 300)}ms ease-out ${scaleMs(cfg, 3100 + index * 150)}ms forwards`
              }}
            >
              0{index + 1}
            </div>
            <div
              style={{
                position: "absolute",
                top: 40,
                left: 12,
                right: 12,
                height: 8,
                background: `${cfg.ink}e6`,
                transform: "scaleX(0)",
                transformOrigin: "left",
                animation: `bpi-draw-x ${scaleMs(cfg, 280)}ms ease-out ${scaleMs(cfg, 3200 + index * 150)}ms forwards`
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 54,
                left: 12,
                width: "60%",
                height: 8,
                background: `${cfg.ink}e6`,
                transform: "scaleX(0)",
                transformOrigin: "left",
                animation: `bpi-draw-x ${scaleMs(cfg, 280)}ms ease-out ${scaleMs(cfg, 3280 + index * 150)}ms forwards`
              }}
            />
            {[0, 1, 2].map((lineIndex) => (
              <div
                key={`line-${lineIndex}`}
                style={{
                  position: "absolute",
                  top: 80 + lineIndex * 10,
                  left: 12,
                  width: `${70 - lineIndex * 8}%`,
                  height: 3,
                  background: `${cfg.ink}80`,
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  animation: `bpi-draw-x ${scaleMs(cfg, 260)}ms ease-out ${scaleMs(cfg, 3350 + index * 150 + lineIndex * 60)}ms forwards`
                }}
              />
            ))}
          </div>
        </Animated>
      ))}

      {cfg.dims ? <DimensionH cfg={cfg} delay={3400} top="96%" left="0%" width="100%" value={`${cfg.cardCount} × 1fr`} /> : null}
    </div>
  );
}

function TitleBlock({ cfg }: { cfg: IntroConfig }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "clamp(40px, 6vw, 72px)",
        bottom: "clamp(40px, 6vw, 72px)",
        width: "min(340px, 70vw)",
        border: `1px solid ${cfg.ink}59`,
        background: `${cfg.bg}cc`,
        color: cfg.ink,
        backdropFilter: "blur(6px)",
        fontFamily: monoFont,
        opacity: 0,
        animation: `bpi-title-in ${scaleMs(cfg, 500)}ms ease-out ${scaleMs(cfg, 450)}ms forwards`
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <TitleCell cfg={cfg} label="Proj" value={cfg.proj} />
        <TitleCell cfg={cfg} label="Sheet" value="H-01 / 04" borderRight={false} />
        <TitleCell cfg={cfg} label="Scale" value="1:1" borderBottom={false} />
        <TitleCell cfg={cfg} label="Date" value="04.21.26" borderRight={false} borderBottom={false} />
      </div>
    </div>
  );
}

function TitleCell({
  cfg,
  label,
  value,
  borderRight = true,
  borderBottom = true
}: {
  cfg: IntroConfig;
  label: string;
  value: string;
  borderRight?: boolean;
  borderBottom?: boolean;
}) {
  return (
    <div
      style={{
        padding: "8px 12px",
        borderRight: borderRight ? `1px solid ${cfg.ink}2e` : "none",
        borderBottom: borderBottom ? `1px solid ${cfg.ink}2e` : "none"
      }}
    >
      <div style={{ fontSize: 7, letterSpacing: "0.22em", textTransform: "uppercase", color: `${cfg.ink}8c` }}>{label}</div>
      <div style={{ marginTop: 3, fontSize: 11, letterSpacing: "0.08em" }}>{value}</div>
    </div>
  );
}

const replayButtonStyle: CSSProperties = {
  position: "fixed",
  right: 20,
  bottom: 20,
  zIndex: 90,
  padding: "10px 18px",
  borderRadius: 999,
  border: "1px solid rgba(22,58,112,0.18)",
  background: "rgba(248,244,236,0.92)",
  color: "#163A70",
  fontFamily: monoFont,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  cursor: "pointer",
  boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
};
