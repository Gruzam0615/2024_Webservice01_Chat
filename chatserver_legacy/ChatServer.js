const { createServer } = require("http");
const { Server } = require("socket.io");

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost";
const PORT = 4000;
const CLIENT_PORT = 3101;

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: `${URL}:${CLIENT_PORT}`,
        credentials: true
    }
});

io.on("connection", (socket) => {
    // socket.join("roomName");
    // io.to("roomName").emit("message", "Welcome to roomName " + socket.id); // roomName에 참가중인 사용자 전원에게 Broadcast 수행

    // "message" 에 연결된 모든 사용자에게 브로드캐스트 수행
    // io.emit("message", `Welcome ${socket.id}`);
    socket.on("message", (msg) => {
        io.emit("message", `${socket.id}: ${msg}`);
    });

    socket.on("message1", (msg) => {
        io.emit("message1", `${socket.id}: ${msg}`);
    })
});

httpServer.listen(PORT, () => {
    console.log("listening: " + PORT);
});