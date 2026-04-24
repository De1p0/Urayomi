import js from "@eslint/js";

export default [
    {
        ignores: [
            "node_modules",
            "dist",
            "scripts",
            "build",
            "src-tauri/target",
            "**/out/**",
            "**/*.min.js",
        ],
    },

    js.configs.recommended,

    {
        rules: {
            "no-unused-vars": "warn",
        },
    },
];