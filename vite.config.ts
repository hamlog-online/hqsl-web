import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import browserslistToEsbuild from "browserslist-to-esbuild";
import tsconfigPaths from "vite-tsconfig-paths";
import UnpluginDetectDuplicatedDeps from "unplugin-detect-duplicated-deps/vite";

// We direct our code to load openpgp from CDN.
const openpgpCDN =
    "https://cdn.jsdelivr.net/npm/openpgp@5.11.1/dist/openpgp.min.mjs";

// I presume that this way, any polyfills required will end up in vendor chunk.
const browserPolicy = browserslistToEsbuild([
    // Boilerplate at start.
    "> 0.3%",
    "defaults",
    // Last versions available for Windows 7,
    // which we explicitly want to support.
    "chrome 109",
    "firefox 115",
    // Boilerplate at end.
    "last 2 versions",
    "not dead",
]);

console.log("Browser compatibility policy:", browserPolicy);

function chunkingLogic(id: string) {
    {
        // Everything can just be vendored.
        if (id.includes("node_modules")) {
            return "vendor";
        }
    }
}

export default defineConfig({
    base: "./",

    plugins: [
        tsconfigPaths(),
        UnpluginDetectDuplicatedDeps(),
        svelte({
            onwarn(warning, defaultHandler) {
                // Suppress this warning, it is annoying and unavoidable.
                if (
                    warning.code ==
                    "vite-plugin-svelte-preprocess-many-dependencies"
                ) {
                    return;
                }

                if (defaultHandler) {
                    defaultHandler(warning);
                }
            },
        }),
    ],
    // Needed for the dev mode to keep working properly.
    optimizeDeps: {
        include: ["base-x"],
    },
    build: {
        // Can be helpful when debugging.
        // minify: false,

        target: browserPolicy,

        emptyOutDir: true,
        chunkSizeWarningLimit: 600000,
        rollupOptions: {
            external: ["openpgp"],
            output: {
                manualChunks: chunkingLogic,
                paths: {
                    openpgp: openpgpCDN,
                },
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "src/variables.scss" as *;',
            },
        },
    },
});
