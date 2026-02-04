"use client";

import { EChart } from "@/components/charts/echart";

export function VariabilitySpark({
  values,
  targetLow,
  targetHigh,
  label = "Consistency",
}: {
  values: number[];
  targetLow: number;
  targetHigh: number;
  label?: string;
}) {
  const option = {
    backgroundColor: "transparent",
    grid: { left: 10, right: 10, top: 28, bottom: 18 },
    xAxis: { type: "category", show: false, data: values.map((_, i) => i + 1) },
    yAxis: {
      type: "value",
      show: false,
      min: Math.min(targetLow, ...values) - 1,
      max: Math.max(targetHigh, ...values) + 1,
    },
    series: [
      // target band
      {
        type: "line",
        data: values.map(() => targetLow),
        lineStyle: { opacity: 0 },
        areaStyle: { color: "rgba(177,18,38,0.14)" },
        stack: "band",
        symbol: "none",
      },
      {
        type: "line",
        data: values.map(() => targetHigh - targetLow),
        lineStyle: { opacity: 0 },
        areaStyle: { color: "rgba(177,18,38,0.14)" },
        stack: "band",
        symbol: "none",
      },
      // series
      {
        type: "line",
        data: values,
        smooth: true,
        symbol: "none",
        lineStyle: { width: 3, color: "rgba(255,255,255,0.9)" },
      },
      {
        type: "scatter",
        data: values.map((v, i) => [i, v]),
        symbolSize: 6,
        itemStyle: { color: "rgba(181,181,181,0.9)" },
      },
    ],
    graphic: [
      { type: "text", left: 0, top: 0, style: { text: label, fill: "#B5B5B5", fontSize: 12 } },
      { type: "text", right: 0, top: 0, style: { text: "Lower variability = better", fill: "#B5B5B5", fontSize: 12 } },
    ],
  };

  return <EChart option={option} height={170} />;
}
