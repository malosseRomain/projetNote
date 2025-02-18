import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { languageOptions: { globals: globals.browser } }, // Définition des globales pour le navigateur
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        settings: {
            react: {
                version: "18" // spécifie la version de React
            }
        }
    },
    {
        languageOptions: {
            globals: {
                process: "readonly", // Autorise process dans l'environnement Node.js
                module: "readonly" // Autorise module dans l'environnement Node.js
            }
        }
    },
    {
        // rules: {
        //     "no-console": "error" // Ajout de la règle no-console pour signaler les console.log
        // }
    }
];
