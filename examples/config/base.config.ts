export const isProd = (import.meta as any).env.VITE_MODE === "production";
export const DATA_URL = isProd
  ? "/vue-force-graph/miserables.json"
  : "/miserables.json";
  export const BLOCK_DATA_URL = isProd
  ? "/vue-force-graph/block.json"
  : "/block.json";
  export const DEPENDENCIES_DATA_URL = isProd
  ? "/vue-force-graph/d3-dependencies.csv"
  : "/d3-dependencies.csv";
