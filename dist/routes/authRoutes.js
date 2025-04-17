"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const leaveController_1 = require("../controllers/leaveController");
const router = express_1.default.Router();
router.post("/register", authController_1.register);
router.post("/login", authController_1.Login);
// Manager or Admin only can approve leave
router.patch("/leave-requests/approve", authMiddleware_1.verifyToken, (0, roleMiddleware_1.authoriseRoles)("manager", "admin"), leaveController_1.approveLeave);
exports.default = router;
