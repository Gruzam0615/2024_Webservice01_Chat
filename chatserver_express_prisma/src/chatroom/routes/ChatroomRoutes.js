const express = require("express");

const ChatroomController = require("../controller/ChatroomController");

const ChatroomRoutes = express.Router();

ChatroomRoutes.get("/", ChatroomController.chatroomHandlerUsingSocket);
ChatroomRoutes.get("/test01", ChatroomController.Test01);

module.exports = ChatroomRoutes;