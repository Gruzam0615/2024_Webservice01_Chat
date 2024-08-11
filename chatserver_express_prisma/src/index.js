const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");

const ChatroomRoutes = require("./chatroom/routes/ChatroomRoutes");

const app = express();
const server = createServer(app);

const primsa = new PrismaClient();

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3101",
    }
});

app.set("port", process.env.PORT || 4000);
app.use(express.json());

app.get("/test01", (request, response, done) => {
    console.log("requested /test01");
    response.send("This is /test01");
});

app.use("/chat", ChatroomRoutes);

const TestRoomList = () => {
    const result = {
        "status": "200",
        "message": "제발"
    }
    return result;
}

const TestRoomList2 = async () => {
    return await primsa.chatroom.findMany()
    .then((result) => {
        return result;
    })
    .catch((error) => {
        console.log(error);
        return null;
    });
}

const serializeBigInt = async (data) => {
    const result = [];
    if(data != null) {
        await data.map(element => {
            typeof element.chatRoomIndex === "bigint" ?
                element.chatRoomIndex = Number(element.chatRoomIndex) :
                element.chatRoomIndex;
            result.push(element);
        });
        return result;
    } else {
        return result;
    }
} 

const nsp = io.of("/chatroom/");

nsp.on("connection", (socket) => {
    const USERID = socket.id;
    console.log(`${USERID} connect Namespace: /chatroom`);
    // nsp.emit("notice", `${USERID} Connect`);

    socket.on("room:list", async () => {
        const data = await TestRoomList2();
        const result = await serializeBigInt(data); 
        socket.emit("room:list", result);
    });

    socket.on("disconnect", () => {
        console.log(`${USERID} disconnect Namespace: /chatroom`);
        // nsp.emit("notice", `${USERID} Disconnect`);
    });
});

server.listen(app.get("port"), () => {
    console.log(`PORT ${app.get("port")} listening...`);
});


// const createNamespace = (namespace) => {
//     const nsp = io.of(namespace);

//     nsp.on("connection", (socket) => {
//         const USERID = socket.id;
//         console.log(`${USERID} connect Namespace: ${namespace}`);
//         nsp.emit("notice", `${USERID} Connect`);

//         socket.on("message", msg => {
//             nsp.emit("message", msg);
//         });

//         socket.on("disconnect", () => {
//             console.log(`${USERID} disconnect Namespace: ${namespace}`);
//             nsp.emit("notice", `${USERID} Disconnect`);
//         });
//     });
// };

// const namespace = `${request.baseUrl}${request.url}`
// const namespace = "/chatroom/";
// console.log("namespace: " + namespace);
// if(!io._nsps.has(namespace)) {
//     createNamespace(namespace);
// }