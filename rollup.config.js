import { terser } from "rollup-plugin-terser";
                
export default {
    input: 'mjs/rullo.js',
    output: [
        { file: 'dist/js/rullo.js', formate: 'iife'},
        { file: 'dist/js/rullo.min.js', formate: 'iife', plugins: [terser()]}
    ]
}