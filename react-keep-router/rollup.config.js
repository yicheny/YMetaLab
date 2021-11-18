import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import { uglify } from 'rollup-plugin-uglify'
import typescript from "rollup-plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";

export default [
    {
        input: 'src/index.ts',
        output: {
            name: 'keepRouter',
            file: 'lib/index.js',
            format: 'cjs',
            sourcemap: true
        },
        external: [
            'react',
            "react-dom",
            'react-router-dom',
            'invariant',
        ],
        plugins: [
            uglify(),
            resolve(),
            commonjs(),
            babel({
                exclude: 'node_modules/**'
            }),
            typescript({
                exclude: "node_modules/**",
                typescript: require("typescript")
            }),
            sourceMaps(),
        ]
    },
]
