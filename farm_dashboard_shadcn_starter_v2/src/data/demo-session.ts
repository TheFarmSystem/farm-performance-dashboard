export const demoSession = {
  athlete: {
    name: "Riley Valentine",
    date: "2026-01-27",
    bats: "R",
  },
  kpis: {
    creation: { value: "72.4 mph", label: "Bat Speed Avg", sub: "Peak 78.1" },
    efficiency: { value: "68%", label: "On-Plane", sub: "Window + consistency" },
    outcome: { value: "94 mph", label: "Exit Velo Avg", sub: "Peak 101" },
  },
  signature: { creation: 0.72, efficiency: 0.62, outcome: 0.68 },
  charts: {
    batSpeed: {
      values: [66,67,68,69,70,70,71,72,72,73,74,75,76,78,71,72,70,69,73,74,75,72,71,70],
      avg: 72.4,
      peak: 78.1,
    },
    rotAccel: { min: 6.2, max: 16.8, avg: 12.1, peak: 15.9 },
    onPlane: { windowStart: 0.28, windowEnd: 0.62, contactPoint: 0.55 },
    attackAngle: { values: [8, 10, 12, 11, 9, 13, 14, 10, 9, 12, 11, 10], targetLow: 9, targetHigh: 13 },
    exitVelo: {
      values: [86,88,90,92,93,94,95,96,98,101,89,91,97,94,93,95],
      avg: 94,
      peak: 101,
    },
    launchAngle: { min: -5, max: 35, avg: 14, peak: 26 },
    spray: {
      points: [
        { x: -0.6, y: 0.22 },
        { x: -0.4, y: 0.55, hot: true },
        { x: -0.2, y: 0.38 },
        { x: 0.1, y: 0.62 },
        { x: 0.25, y: 0.48 },
        { x: 0.55, y: 0.58, hot: true },
        { x: 0.7, y: 0.78 },
        { x: -0.1, y: 0.82 },
        { x: 0.35, y: 0.30 },
      ],
    },
  },
  insights: {
    overview:
      "Capacity is present. The biggest lever is improving consistency through the zone so your best swings show up more often.",
    creation:
      "Your top-end speed is real. The next step is repeatability. Make the average climb toward your peak.",
    efficiency:
      "When the on‑plane window widens, adjustability goes up. The goal is not perfect angles. It’s a bigger window more often.",
    outcome:
      "Your best contact is loud. Training priority is getting more swings into the 'hot' cluster, not chasing a single max.",
  },
  source: {
    rapsodoPages: [],
  },
};
