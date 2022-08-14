export const DATA_URL =
  (import.meta as any).env.VITE_MODE === "production"
    ? "/vue-force-graph/miserables.json"
    : "/miserables.json";
