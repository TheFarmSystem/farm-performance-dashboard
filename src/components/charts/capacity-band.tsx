"use client";

import { EChart } from "@/components/charts/echart";

export function CapacityBand({
  min,
  max,
  avg,
  peak,
  label,
}: {
  min: number;
  max: number;
  avg: number;
  peak: number;
  label: string;
}) {
  const option = {
    backgroundColor: "transparent",
    grid: { left: 18, right: 18, top: 28, bottom: 18 },
    xAxis: {
      type: "value",
      min,
      max,
      axisLabel: { color: "#B5B5B5" },
      splitLine: { show: false },
      axisLine: { lineStyle: { color: "rgba(255,255,255,0.10)" } },
    },
    yAxis: { type: "value", show: false, min: 0, max: 1 },
    series: [
      {
        type: "line",
        data: [
          [min, 0.5],
          [max, 0.5],
        ],
        lineStyle: { width: 12, color: "rgba(181,181,181,0.55)", cap: "round" },
        symbol: "none",
      },
      {
        type: "scatter",
        data: [[avg, 0.5]],
        symbolSize: 12,
        itemStyle: { color: "#FFFFFF" },
      },
      {
        type: "scatter",
        data: [[peak, 0.5]],
        symbolSize: 14,
        itemStyle: { color: "#B11226" },
      },
    ],
    graphic: [
      { type: "text", left: 0, top: 0, style: { text: label, fill: "#B5B5B5", fontSize: 12 } },
    ],
  };

  return <EChart option={option} height={140} />;
}
