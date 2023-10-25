const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat, fetchChats, createGroupChat, renameGroup } = require("../controllers/chatControllers");

const router = express.Router();

router.route('/').post(protect, accessChat)
router.route('/').get(protect, fetchChats)
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroupp);
// router.route("/groupremove").delete(protect, removeFromGroup);
// router.route("/groupadd").post(protect, addToGroup);



module.exports = router;