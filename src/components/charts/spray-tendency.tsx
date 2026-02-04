"use client";

import { EChart } from "@/components/charts/echart";

export function SprayTendency({
  points,
  label = "Direction Tendency",
}: {
  points: { x: number; y: number; hot?: boolean }[]; // x:-1..1 (pull->oppo), y:0..1 (ground->air)
  label?: string;
}) {
  const option = {
    backgroundColor: "transparent",
    grid: { left: 18, right: 18, top: 34, bottom: 24 },
    xAxis: {
      type: "value",
      min: -1,
      max: 1,
      axisLabel: {
        color: "#B5B5B5",
        formatter: (v: number) => (v === -1 ? "Pull" : v === 1 ? "Oppo" : ""),
      },
      splitLine: { show: false },
      axisLine: { lineStyle: { color: "rgba(255,255,255,0.10)" } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 1,
      axisLabel: {
        color: "#B5B5B5",
        formatter: (v: number) => (v === 0 ? "GB" : v === 1 ? "FB" : ""),
      },
      splitLine: { show: false },
      axisLine: { lineStyle: { color: "rgba(255,255,255,0.10)" } },
    },
    series: [
      {
        type: "scatter",
        data: points.map((p) => [p.x, p.y, p.hot ? 1 : 0]),
        symbolSize: (val: any) => (val[2] ? 14 : 10),
        itemStyle: {
          color: (params: any) => (params.value[2] ? "rgba(177,18,38,0.95)" : "rgba(181,181,181,0.75)"),
          borderColor: "rgba(255,255,255,0.25)",
          borderWidth: 1,
        },
      },
    ],
    graphic: [
      { type: "text", left: 0, top: 0, style: { text: label, fill: "#B5B5B5", fontSize: 12 } },
      { type: "text", right: 0, top: 0, style: { text: "Hot balls = red", fill: "#B5B5B5", fontSize: 12 } },
    ],
  };

  return <EChart option={option} height={260} />;
}
