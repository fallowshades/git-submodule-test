/// <reference types="react-router" />
/// <reference types="vite/client" />
/// <reference types="vitest" />


declare module "@react-router/server-runtime" {
  interface AppLoadContext {
    get: <T>(key: any) => T;
  }
}