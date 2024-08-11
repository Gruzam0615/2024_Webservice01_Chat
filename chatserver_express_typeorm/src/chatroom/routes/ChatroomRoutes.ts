import * as express from "express";

import * as ChatroomController from "../controller/ChatroomController";

const router = express.Router();

router.get("/", ChatroomController.chatroomHandlerUsingSocket);
router.get("/test01", ChatroomController.Test01);

export { router };