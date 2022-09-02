const ws = require('nodejs-websocket');
const POST = 9101;

const server = ws.createServer(connect => {
    connect.on("text", data => {
        // console.log("received: "+ data);
        // connect.sendText(data);
        console.log("received: "+ data);
        setInterval(()=>{
            connect.sendText(data);
        },5000)
    });

    connect.on("close", (code, reason) => {
        console.log("connection closed!");
    });

    connect.on('error', ()=>{
        console.log("connection error!");
    });
});

server.listen(POST, ()=>{
    console.log("websocket server start success!");
});

