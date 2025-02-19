import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        settings: {
            react: {
                version: "18"
            }
        }
    },
    {
        languageOptions: {
            globals: {
                process: "readonly",
                module: "readonly"
            }
        }
    },
    {
        plugins: {
            unusedImports: pluginUnusedImports
        },
        rules: {
            quotes: ["error", "double"],
            indent: ["error", 4],
            semi: ["error", "always"]
        }
    }
];
