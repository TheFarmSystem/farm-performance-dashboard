"use client";

import { EChart } from "@/components/charts/echart";

export function OnPlaneWindow({
  windowStart,
  windowEnd,
  contactPoint,
  label = "On‑Plane Window",
}: {
  windowStart: number; // 0..1
  windowEnd: number;   // 0..1
  contactPoint: number; // 0..1
  label?: string;
}) {
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  const ws = clamp(windowStart);
  const we = clamp(windowEnd);
  const cp = clamp(contactPoint);

  const option = {
    backgroundColor: "transparent",
    grid: { left: 18, right: 18, top: 34, bottom: 26 },
    xAxis: {
      type: "value",
      min: 0,
      max: 1,
      axisLabel: {
        color: "#B5B5B5",
        formatter: (v: number) => {
          if (v === 0) return "Start";
          if (v === 1) return "Finish";
          return "";
        },
      },
      axisLine: { lineStyle: { color: "rgba(255,255,255,0.10)" } },
      splitLine: { show: false },
      tick: { show: false },
    },
    yAxis: { show: false, min: 0, max: 1 },
    series: [
      // baseline track
      {
        type: "line",
        data: [
          [0, 0.5],
          [1, 0.5],
        ],
        symbol: "none",
        lineStyle: { width: 10, color: "rgba(181,181,181,0.35)", cap: "round" },
      },
      // window segment (red glow)
      {
        type: "line",
        data: [
          [ws, 0.5],
          [we, 0.5],
        ],
        symbol: "none",
        lineStyle: { width: 10, color: "rgba(177,18,38,0.85)", cap: "round" },
      },
      // contact marker
      {
        type: "scatter",
        data: [[cp, 0.5]],
        symbolSize: 18,
        itemStyle: {
          color: "#FFFFFF",
          borderColor: "#B11226",
          borderWidth: 3,
        },
      },
    ],
    graphic: [
      { type: "text", left: 0, top: 0, style: { text: label, fill: "#B5B5B5", fontSize: 12 } },
      { type: "text", right: 0, top: 0, style: { text: "Contact", fill: "#FFFFFF", fontSize: 12 } },
    ],
  };

  return <EChart option={option} height={150} />;
}
