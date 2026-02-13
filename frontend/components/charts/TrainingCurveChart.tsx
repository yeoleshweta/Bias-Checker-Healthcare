"use client";
import React, { useEffect, useRef, useState } from "react";

const evalData = [
  { epoch: 1, loss: 1.3795, accuracy: 25.0, f1: 10.0 },
  { epoch: 2, loss: 1.0221, accuracy: 75.33, f1: 72.56 },
  { epoch: 3, loss: 0.4858, accuracy: 95.67, f1: 95.62 },
  { epoch: 4, loss: 0.4059, accuracy: 97.33, f1: 97.32 },
  { epoch: 5, loss: 0.3876, accuracy: 98.67, f1: 98.67 },
  { epoch: 6, loss: 0.3869, accuracy: 98.33, f1: 98.33 },
];

export default function TrainingCurveChart() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const W = 640,
    H = 320;
  const PAD = { top: 35, right: 60, bottom: 45, left: 50 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;

  const x = (epoch: number) => PAD.left + ((epoch - 1) / 5) * cW;
  const yLoss = (v: number) => PAD.top + cH - (v / 1.5) * cH;
  const yAcc = (v: number) => PAD.top + cH - (v / 100) * cH;

  const makePath = (pts: { x: number; y: number }[]) =>
    pts
      .map(
        (p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`,
      )
      .join(" ");

  const lossPoints = evalData.map((d) => ({ x: x(d.epoch), y: yLoss(d.loss) }));
  const accPoints = evalData.map((d) => ({
    x: x(d.epoch),
    y: yAcc(d.accuracy),
  }));
  const f1Points = evalData.map((d) => ({ x: x(d.epoch), y: yAcc(d.f1) }));

  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ maxHeight: 380 }}
      >
        <defs>
          <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0, 25, 50, 75, 100].map((v) => (
          <line
            key={v}
            x1={PAD.left}
            x2={W - PAD.right}
            y1={yAcc(v)}
            y2={yAcc(v)}
            stroke="currentColor"
            strokeOpacity={0.06}
            strokeDasharray="4,4"
          />
        ))}

        {/* Area fills */}
        <path
          d={`${makePath(lossPoints)} L${lossPoints[5].x},${PAD.top + cH} L${lossPoints[0].x},${PAD.top + cH} Z`}
          fill="url(#lossGrad)"
          style={{
            opacity: visible ? 0.12 : 0,
            transition: "opacity 1.5s ease",
          }}
        />
        <path
          d={`${makePath(accPoints)} L${accPoints[5].x},${PAD.top + cH} L${accPoints[0].x},${PAD.top + cH} Z`}
          fill="url(#accGrad)"
          style={{
            opacity: visible ? 0.08 : 0,
            transition: "opacity 1.5s ease",
          }}
        />

        {/* Lines */}
        <path
          d={makePath(lossPoints)}
          fill="none"
          stroke="#ef4444"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1200,
            strokeDashoffset: visible ? 0 : 1200,
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
        <path
          d={makePath(accPoints)}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1200,
            strokeDashoffset: visible ? 0 : 1200,
            transition: "stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
        <path
          d={makePath(f1Points)}
          fill="none"
          stroke="#10b981"
          strokeWidth={2}
          strokeDasharray="6,3"
          strokeLinecap="round"
          style={{ opacity: visible ? 0.8 : 0, transition: "opacity 2s ease" }}
        />

        {/* Data points */}
        {evalData.map((d, i) => (
          <React.Fragment key={i}>
            <circle
              cx={x(d.epoch)}
              cy={yLoss(d.loss)}
              r={4}
              fill="#ef4444"
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.3s ease ${0.3 + i * 0.15}s`,
              }}
            />
            <circle
              cx={x(d.epoch)}
              cy={yAcc(d.accuracy)}
              r={4}
              fill="#3b82f6"
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.3s ease ${0.3 + i * 0.15}s`,
              }}
            />
          </React.Fragment>
        ))}

        {/* Best result annotation */}
        <g
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 1.8s",
          }}
        >
          <rect
            x={x(5) - 35}
            y={yAcc(98.67) - 22}
            width={70}
            height={18}
            rx={4}
            fill="#3b82f6"
            fillOpacity={0.15}
          />
          <text
            x={x(5)}
            y={yAcc(98.67) - 10}
            textAnchor="middle"
            fontSize={9}
            fill="#3b82f6"
            fontWeight="bold"
            fontFamily="var(--font-sans)"
          >
            98.67%
          </text>
        </g>

        {/* Axes */}
        <line
          x1={PAD.left}
          x2={W - PAD.right}
          y1={PAD.top + cH}
          y2={PAD.top + cH}
          stroke="currentColor"
          strokeOpacity={0.15}
        />
        {evalData.map((d) => (
          <text
            key={d.epoch}
            x={x(d.epoch)}
            y={PAD.top + cH + 18}
            textAnchor="middle"
            fontSize={11}
            fill="currentColor"
            fillOpacity={0.5}
            fontFamily="var(--font-sans)"
          >
            {d.epoch}
          </text>
        ))}
        <text
          x={W / 2}
          y={H - 5}
          textAnchor="middle"
          fontSize={11}
          fill="currentColor"
          fillOpacity={0.4}
          fontFamily="var(--font-sans)"
        >
          Epoch
        </text>

        {/* Y labels */}
        {[0, 0.5, 1.0, 1.5].map((v) => (
          <text
            key={v}
            x={PAD.left - 8}
            y={yLoss(v) + 4}
            textAnchor="end"
            fontSize={9}
            fill="#ef4444"
            fillOpacity={0.6}
            fontFamily="var(--font-sans)"
          >
            {v.toFixed(1)}
          </text>
        ))}
        {[0, 25, 50, 75, 100].map((v) => (
          <text
            key={v}
            x={W - PAD.right + 8}
            y={yAcc(v) + 4}
            textAnchor="start"
            fontSize={9}
            fill="#3b82f6"
            fillOpacity={0.6}
            fontFamily="var(--font-sans)"
          >
            {v}%
          </text>
        ))}

        {/* Legend */}
        <g transform={`translate(${PAD.left + 5}, ${PAD.top - 18})`}>
          <line
            x1={0}
            y1={0}
            x2={14}
            y2={0}
            stroke="#ef4444"
            strokeWidth={2.5}
          />
          <text
            x={18}
            y={4}
            fontSize={10}
            fill="currentColor"
            fillOpacity={0.6}
            fontFamily="var(--font-sans)"
          >
            Eval Loss
          </text>
          <line
            x1={85}
            y1={0}
            x2={99}
            y2={0}
            stroke="#3b82f6"
            strokeWidth={2.5}
          />
          <text
            x={103}
            y={4}
            fontSize={10}
            fill="currentColor"
            fillOpacity={0.6}
            fontFamily="var(--font-sans)"
          >
            Accuracy
          </text>
          <line
            x1={170}
            y1={0}
            x2={184}
            y2={0}
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="4,2"
          />
          <text
            x={188}
            y={4}
            fontSize={10}
            fill="currentColor"
            fillOpacity={0.6}
            fontFamily="var(--font-sans)"
          >
            Macro F1
          </text>
        </g>
      </svg>
    </div>
  );
}
