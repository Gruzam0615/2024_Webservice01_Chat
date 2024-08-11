import "reflect-metadata"
import { DataSource } from "typeorm"
import { Chatroom } from "./chatroom/entity/ChatroomEntity"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "webservice01",
    synchronize: false,
    logging: false,
    entities: [
        Chatroom
    ],
    migrations: [],
    subscribers: [],
})
