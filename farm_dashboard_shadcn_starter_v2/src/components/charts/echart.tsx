"use client";

import ReactECharts from "echarts-for-react";

export function EChart({
  option,
  height = 220,
}: {
  option: any;
  height?: number;
}) {
  return (
    <div style={{ height }}>
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
}
