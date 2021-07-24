import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-dev'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from "rollup-plugin-livereload";

export default {
    input:'src/index.js',
    output:{
        file:'dist/bundle.cjs.js',
        format:'cjs',
        name:"bundleName",
        sourcemap:true,
    },
    plugins:[
        resolve(),
        commonjs(),
        babel({
           exclude:"node_modules/**"
        }),
        livereload(),
        serve({
            open:true,
            port:8888,
            contentBase:''
        })
    ],
    external:[

    ]
}
