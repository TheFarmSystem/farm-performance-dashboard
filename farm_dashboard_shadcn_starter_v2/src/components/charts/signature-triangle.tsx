"use client";

import { EChart } from "@/components/charts/echart";

export function SignatureTriangle({
  creation = 0.7,
  efficiency = 0.6,
  outcome = 0.65,
}: {
  creation?: number;
  efficiency?: number;
  outcome?: number;
}) {
  const option = {
    backgroundColor: "transparent",
    xAxis: { show: false, min: 0, max: 1 },
    yAxis: { show: false, min: 0, max: 1 },
    series: [
      {
        type: "line",
        data: [
          [0.5, 0.92],
          [0.08, 0.12],
          [0.92, 0.12],
          [0.5, 0.92],
        ],
        lineStyle: { color: "#FFFFFF", width: 1 },
        symbol: "none",
      },
      {
        type: "polygon",
        data: [
          {
            coords: [
              [0.5, 0.12 + 0.8 * creation],
              [0.08 + 0.4 * efficiency, 0.12 + 0.4 * (1 - efficiency)],
              [0.92 - 0.4 * outcome, 0.12 + 0.4 * (1 - outcome)],
            ],
          },
        ],
        itemStyle: { color: "#B11226", opacity: 0.28 },
        lineStyle: { color: "#B11226", opacity: 0.7, width: 2 },
      },
    ],
    graphic: [
      { type: "text", left: "center", top: 6, style: { text: "Creation", fill: "#FFFFFF", fontSize: 12 } },
      { type: "text", left: 8, bottom: 10, style: { text: "Efficiency", fill: "#FFFFFF", fontSize: 12 } },
      { type: "text", right: 8, bottom: 10, style: { text: "Outcome", fill: "#FFFFFF", fontSize: 12 } },
    ],
  };

  return <EChart option={option} height={260} />;
}
