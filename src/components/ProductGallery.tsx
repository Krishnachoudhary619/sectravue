"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative min-h-[240px] w-full cursor-zoom-in overflow-hidden rounded-xl bg-white ring-1 ring-black/8 shadow-[0_14px_32px_rgba(0,0,0,.08)] md:min-h-[380px] md:rounded-2xl"
        aria-label={`View ${alt} full size`}
      >
        <Image src={images[active]} alt={alt} fill className="object-contain p-4 md:p-8" sizes="(min-width: 768px) 50vw, 100vw" />
      </button>
      {images.length > 1 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white ring-1 md:h-[72px] md:w-[72px] md:rounded-xl ${
                i === active ? "ring-ink" : "ring-black/10"
              }`}
            >
              <Image src={src} alt={`${alt} — view ${i + 1}`} fill className="object-contain p-1.5" sizes="72px" />
            </button>
          ))}
        </div>
      )}

      {open && (
        <Lightbox
          images={images}
          alt={alt}
          index={active}
          onIndex={setActive}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

function Lightbox({
  images,
  alt,
  index,
  onIndex,
  onClose,
}: {
  images: string[];
  alt: string;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const ignoreScroll = useRef(false);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const zoomed = scale > 1.02;

  function resetZoom() {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    ignoreScroll.current = true;
    el.scrollLeft = index * el.clientWidth;
    requestAnimationFrame(() => {
      ignoreScroll.current = false;
    });
  }, []);

  function go(next: number) {
    const i = (next + images.length) % images.length;
    resetZoom();
    onIndex(i);
    const el = scroller.current;
    if (!el) return;
    ignoreScroll.current = true;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    window.setTimeout(() => {
      ignoreScroll.current = false;
    }, 320);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "+" || e.key === "=") setScale((s) => Math.min(4, s + 0.4));
      if (e.key === "-" || e.key === "_") {
        setScale((s) => {
          const next = Math.max(1, s - 0.4);
          if (next === 1) setPan({ x: 0, y: 0 });
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function onScroll() {
    const el = scroller.current;
    if (!el || ignoreScroll.current || zoomed) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    if (next !== index && next >= 0 && next < images.length) {
      resetZoom();
      onIndex(next);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex h-[100dvh] w-full flex-col bg-black"
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} full size`}
    >
      <header className="relative z-20 flex shrink-0 items-center justify-between gap-3 bg-black px-3 py-2 pt-[max(0.5rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-bold text-ink"
        >
          <span className="text-lg leading-none">×</span>
          Close
        </button>
        <p className="text-sm font-semibold text-white">
          {index + 1} / {images.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setScale((s) => {
                const next = Math.max(1, +(s - 0.5).toFixed(2));
                if (next === 1) setPan({ x: 0, y: 0 });
                return next;
              });
            }}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-xl font-bold text-white"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(4, +(s + 0.5).toFixed(2)))}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-xl font-bold text-white"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </header>

      <div
        ref={scroller}
        onScroll={onScroll}
        className={`min-h-0 flex-1 ${
          zoomed ? "overflow-hidden" : "no-scrollbar snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain"
        }`}
        style={{ WebkitOverflowScrolling: zoomed ? "auto" : "touch" }}
      >
        <div className="flex h-full">
          {images.map((src, i) => (
            <ZoomSlide
              key={`${src}-${i}`}
              src={src}
              alt={`${alt} — view ${i + 1}`}
              active={i === index}
              scale={i === index ? scale : 1}
              pan={i === index ? pan : { x: 0, y: 0 }}
              onScale={setScale}
              onPan={setPan}
              onResetZoom={resetZoom}
            />
          ))}
        </div>
      </div>

      <footer className="relative z-20 shrink-0 bg-black px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        {images.length > 1 && (
          <div className="mb-3 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-white" : "w-1.5 bg-white/40"}`}
              />
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-full bg-white py-3 text-sm font-bold text-ink"
        >
          Close
        </button>
      </footer>
    </div>,
    document.body,
  );
}

function ZoomSlide({
  src,
  alt,
  active,
  scale,
  pan,
  onScale,
  onPan,
  onResetZoom,
}: {
  src: string;
  alt: string;
  active: boolean;
  scale: number;
  pan: { x: number; y: number };
  onScale: (value: number | ((s: number) => number)) => void;
  onPan: (value: { x: number; y: number }) => void;
  onResetZoom: () => void;
}) {
  const [interacting, setInteracting] = useState(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  const drag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const lastTap = useRef(0);

  function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function onPointerDown(e: React.PointerEvent) {
    if (!active) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setInteracting(true);

    if (pointers.current.size === 1) {
      drag.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
      const now = Date.now();
      if (now - lastTap.current < 280) {
        e.preventDefault();
        if (scale > 1) onResetZoom();
        else onScale(2.4);
        lastTap.current = 0;
      } else {
        lastTap.current = now;
      }
    }

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: dist(a, b), scale };
      drag.current = null;
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!active || !pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const next = Math.min(4, Math.max(1, pinch.current.scale * (dist(a, b) / pinch.current.dist)));
      onScale(next);
      if (next === 1) onPan({ x: 0, y: 0 });
      return;
    }

    if (scale > 1.02 && drag.current && pointers.current.size === 1) {
      onPan({
        x: drag.current.panX + e.clientX - drag.current.x,
        y: drag.current.panY + e.clientY - drag.current.y,
      });
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) {
      drag.current = null;
      setInteracting(false);
    }
    if (scale < 1.05) onResetZoom();
  }

  function onWheel(e: React.WheelEvent) {
    if (!active) return;
    e.preventDefault();
    const next = Math.min(4, Math.max(1, scale + (e.deltaY < 0 ? 0.2 : -0.2)));
    onScale(next);
    if (next === 1) onPan({ x: 0, y: 0 });
  }

  return (
    <div className="flex h-full w-screen shrink-0 snap-center snap-always items-center justify-center px-3">
      <div
        className="flex h-full w-full items-center justify-center overflow-hidden"
        style={{ touchAction: scale > 1 ? "none" : "pan-x" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        {/* Native img so photos stay at intrinsic size and only scale down to fit. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="max-h-full max-w-full select-none object-contain"
          style={{
            width: "auto",
            height: "auto",
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: interacting ? "none" : "transform 160ms ease-out",
          }}
        />
      </div>
    </div>
  );
}
