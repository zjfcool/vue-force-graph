export const isProd = (import.meta as any).env.VITE_MODE === "production";
export const DATA_URL = isProd
  ? "/vue-force-graph/miserables.json"
  : "/miserables.json";
