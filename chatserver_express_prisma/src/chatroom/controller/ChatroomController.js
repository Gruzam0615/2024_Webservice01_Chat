
const v4 = require("uuid");

const Test01 = (request, response, done) => {
    response.status(200).send({
        "status": 200,
        "data": true,
        "message": "requested /Chatroom/test01"
    })
}

const chatroomHandlerUsingSocket = (request, response, done) => {
    console.log("called chatroomHandlerUsingSocket");
   
    response.status(200).send({
        "status": 200,
        "message": "called chatroomHandlerUsingSocket",
    });
}

const createChatRoom = async(request, response, done) => {
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

const getChatRoomList = async(request, response) => {
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

module.exports = {
    Test01,
    chatroomHandlerUsingSocket,
    createChatRoom,
    getChatRoomList
}