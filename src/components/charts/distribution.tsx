"use client";

import { EChart } from "@/components/charts/echart";

export function DistributionChart({
  title,
  values,
  avg,
  peak,
}: {
  title: string;
  values: number[];
  avg: number;
  peak: number;
}) {
  const bins = makeBins(values, 12);
  const option = {
    backgroundColor: "transparent",
    grid: { left: 22, right: 14, top: 18, bottom: 24 },
    xAxis: {
      type: "value",
      axisLabel: { color: "#B5B5B5" },
      splitLine: { show: false },
      axisLine: { lineStyle: { color: "rgba(255,255,255,0.10)" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#B5B5B5" },
      splitLine: { show: false },
      axisLine: { lineStyle: { color: "rgba(255,255,255,0.10)" } },
    },
    series: [
      {
        type: "bar",
        data: bins,
        itemStyle: { color: "rgba(181,181,181,0.70)" },
        barWidth: "85%",
      },
      {
        type: "line",
        data: markerLine(avg),
        lineStyle: { color: "#FFFFFF", width: 2 },
        symbol: "none",
      },
      {
        type: "line",
        data: markerLine(peak),
        lineStyle: { color: "#B11226", width: 3 },
        symbol: "none",
      },
    ],
    tooltip: { trigger: "axis" },
  };

  return <EChart option={option} height={260} />;
}

function makeBins(values: number[], binCount: number) {
  if (!values.length) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const step = (max - min) / binCount || 1;
  const counts = new Array(binCount).fill(0);
  for (const v of values) {
    const idx = Math.min(binCount - 1, Math.floor((v - min) / step));
    counts[idx] += 1;
  }
  const points: [number, number][] = [];
  for (let i = 0; i < binCount; i++) {
    const x = min + i * step + step / 2;
    points.push([Number(x.toFixed(2)), counts[i]]);
  }
  return points;
}

function markerLine(x: number) {
  return [
    [x, 0],
    [x, 999],
  ];
}
