
/// <reference types="vite/client" />


export interface ImportMetaEnv extends ViteCustomEnv {
  readonly VITE_BASE_API_URL: string;
  // add more VITE_ variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}