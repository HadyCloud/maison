"use client";

import {
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type View = { s: number; x: number; y: number };

const MIN = 1;
const MAX = 4;
const START = 1.35;

/**
 * A pannable, zoomable window onto the static street plan: drag (mouse or finger), pinch, double-click, trackpad pinch (Ctrl + wheel) or double-click. The plan is a vector SVG, so it stays sharp when zoomed. The window never leaves the plan.
 */
export function MapViewport({ children, label }: { children: ReactNode; label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ s: 1, x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const last = useRef<{ dist: number; mx: number; my: number } | null>(null);

  const clamp = useCallback((v: View): View => {
    const el = box.current;
    if (!el) return v;
    const s = Math.min(MAX, Math.max(MIN, v.s));
    const w = el.clientWidth;
    const h = el.clientHeight;
    return { s, x: Math.min(0, Math.max(w - w * s, v.x)), y: Math.min(0, Math.max(h - h * s, v.y)) };
  }, []);

  const centred = useCallback(
    (s: number): View => {
      const el = box.current;
      if (!el) return { s, x: 0, y: 0 };
      return clamp({ s, x: -(el.clientWidth * (s - 1)) / 2, y: -(el.clientHeight * (s - 1)) / 2 });
    },
    [clamp],
  );

  useLayoutEffect(() => setView(centred(START)), [centred]);

  const zoomAt = useCallback(
    (factor: number, cx: number, cy: number) =>
      setView((v) => {
        const s = Math.min(MAX, Math.max(MIN, v.s * factor));
        const k = s / v.s;
        return clamp({ s, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k });
      }),
    [clamp],
  );

  const local = useCallback((e: { clientX: number; clientY: number }) => {
    const r = box.current?.getBoundingClientRect();
    return { x: e.clientX - (r?.left ?? 0), y: e.clientY - (r?.top ?? 0) };
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return; // plain scrolling keeps scrolling the page
      e.preventDefault();
      const p = local(e);
      zoomAt(e.deltaY < 0 ? 1.2 : 1 / 1.2, p.x, p.y);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt, local]);

  const onDown = (e: PointerEvent) => {
    box.current?.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, local(e));
    last.current = null;
  };
  const onMove = (e: PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const p = local(e);
    pointers.current.set(e.pointerId, p);
    const pts = [...pointers.current.values()];
    if (pts.length === 1) {
      setView((v) => clamp({ ...v, x: v.x + p.x - prev.x, y: v.y + p.y - prev.y }));
    } else if (pts.length === 2) {
      const [a, b] = pts as [{ x: number; y: number }, { x: number; y: number }];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      if (last.current && last.current.dist > 0) {
        const { dist: d0, mx: mx0, my: my0 } = last.current;
        setView((v) => {
          const s = Math.min(MAX, Math.max(MIN, (v.s * dist) / d0));
          const k = s / v.s;
          return clamp({ s, x: mx - (mx0 - v.x) * k, y: my - (my0 - v.y) * k });
        });
      }
      last.current = { dist, mx, my };
    }
  };
  const onUp = (e: PointerEvent) => {
    pointers.current.delete(e.pointerId);
    last.current = null;
  };

  return (
    <div
      ref={box}
      role="application"
      aria-label={label}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onDoubleClick={(e) => {
        const p = local(e);
        if (view.s >= MAX - 0.05) setView(centred(START));
        else zoomAt(1.6, p.x, p.y);
      }}
      className="relative size-full cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing"
    >
      <div
        className="size-full origin-top-left will-change-transform"
        style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})` }}
      >
        {children}
      </div>
    </div>
  );
}
