
import express from "express"

import { protectRoute } from "../middlewares/auth.middleware.js"
import { getRecommendedUsers, getMyfriends, sendFriendRequest,getFriendRequests,acceptFriendRequest,getOutgoingFriendRequests } from "../controllers/user.controller.js";

const router=express.Router();

router.use(protectRoute)

router.get("/all",getRecommendedUsers);

router.get("/friends",getMyfriends);

router.post("/friend-request/:id",sendFriendRequest);

router.post("/friend-request/:id/accept",acceptFriendRequest);

router.get("/friend-requests",getFriendRequests);

router.get("/outgoing-friend-requests",getOutgoingFriendRequests);

export default router;