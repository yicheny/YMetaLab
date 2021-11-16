init();

function init(){
    window.onerror = function(message, source, lineno, colno, error) {
        console.log('捕获到异常：',{message, source, lineno, colno, error});
        return true;
    }

    window.process = {
        env: {
            NODE_ENV: 'development'
        }
    }
}
