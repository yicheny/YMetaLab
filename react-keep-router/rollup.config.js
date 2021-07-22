import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

export default [
    {
        input: 'src/index.js',
        output: {
            name: 'keepRouter',
            file: 'lib/index.js',
            format: 'cjs',
            sourcemap: true
        },
        external: [
            'react',
            'react-router-dom',
            'invariant',
        ],
        plugins: [
            resolve(),
            babel({
                exclude: 'node_modules/**'
            })
        ]
    },

    {
        input: 'src/index.js',
        output: {
            name: 'keepRouter',
            file: 'lib/index.min.js',
            format: 'umd'
        },
        external: [
            'react',
            'react-router-dom',
            'invariant',
        ],
        plugins: [
            resolve(),
            babel({
                exclude: 'node_modules/**'
            }),
            uglify()
        ]
    }
]
