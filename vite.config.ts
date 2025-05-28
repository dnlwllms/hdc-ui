import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "HdcUi",
      // 적절한 확장자가 추가됩니다.
      fileName: "hdc-ui",
    },
    rollupOptions: {
      // 라이브러리에 포함하지 않을
      // 디펜던시를 명시해주세요
      external: ["react"],
      output: {
        // 라이브러리 외부에 존재하는 디펜던시를 위해
        // UMD(Universal Module Definition) 번들링 시 사용될 전역 변수를 명시할 수도 있습니다.
        globals: {
          react: "HdcUi",
        },
      },
    },
  },
});
