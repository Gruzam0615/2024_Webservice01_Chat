import { createServer } from "http";
import * as express from "express";

import * as ChatroomRoutes from "./chatroom/routes/ChatroomRoutes";
import { Server, Socket } from "socket.io";
import { AppDataSource } from "./data-source";
import { Chatroom } from "./chatroom/entity/ChatroomEntity";

import { ClientEvents, ServerEvents } from "../../common/events";


const app: express.Express = express();
const server = createServer(app);
const io = new Server<ClientEvents, ServerEvents>(server, {
    cors: {
        origin: "http://localhost:3101",
    }
});
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3101",
//     }
// });

app.set("port", process.env.PORT || 4000);
app.use(express.json());

app.get("/test01", (request: express.Request, response: express.Response) => {
    console.log("requested /test01");
    response.send("This is /test01");
});

// app.use("/chatroom", ChatroomRoutes.router);

const nsp = io.of("/chatroom/");
const connectionDB = AppDataSource.initialize();

const roomList = async() => {
    console.log("roomListData() Called...");
    // const result = await connectionDB
    // .then(() => {
    //     const response = AppDataSource.manager.find(Chatroom);
    //     return response;
    // })
    // .catch((error) => {
    //     return undefined;
    // });
    // console.log("result");
    // console.log(result);
    
    return await "으아";
}
const roomList2 : String = "으헤";

nsp.on("connection", (socket) => {
    const USERID = socket.id;
    console.log(`${USERID} connect Namespace: /chatroom/`);
    // nsp.emit("notice", `${USERID} Connect`);

    socket.on("room:list", roomList);
    socket.on("disconnect", () => {
        console.log(`${USERID} disconnect Namespace: /chatroom/`);
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

export {
    io
}