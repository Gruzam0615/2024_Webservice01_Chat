
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { io } from "../../index";
import { AppDataSource } from "../../data-source";
import { Chatroom } from "../entity/ChatroomEntity";

const connectionDB = AppDataSource.initialize();

const Test01 = (request: Request, response: Response) => {
    response.status(200).send({
        "status": 200,
        "data": true,
        "message": "requested /Chatroom/test01"
    })
}

const chatroomHandlerUsingSocket = (request: Request, response: Response) => {
    console.log("called chatroomHandlerUsingSocket");
   
    response.status(200).send({
        "status": 200,
        "message": "called chatroomHandlerUsingSocket",
    });
}

const createChatRoom = async(request: Request, response: Response) => {
    const data = await connectionDB
    .then(() => {
        const inputData = new Chatroom();
        inputData.chatRoomUUID = uuidv4();
        inputData.chatRoomTitle = request.body.chatRoomTitle;
        return AppDataSource.manager.save(inputData);
    })
    .catch((error) => {
        return error;
    })

    response.status(200).send({
        "status": 200,
        "data": data
    });
}

const getChatRoomList = async(request: Request, response: Response) => {
    console.log("requested getChatRoomList");
    const result = await connectionDB
    .then(() => {
        return AppDataSource.manager.find(Chatroom);
    })
    .catch(error => {
        return error;
    })
    // console.log("result: ");
    // console.log(result);

    response.status(200).send({
        "status": 200,
        "data": result
    });
}

export {
    Test01,
    chatroomHandlerUsingSocket,
    createChatRoom,
    getChatRoomList
}