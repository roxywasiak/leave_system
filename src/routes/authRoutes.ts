import express from "express";
import { register,login} from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";
import { authoriseRoles } from "../middleware/roleMiddleware";
import { approveLeave } from "../controllers/leaveController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Manager or Admin only can approve leave
router.patch(
  "/leave-requests/approve",
  verifyToken,
  authoriseRoles("manager", "admin"),
  approveLeave
);

export default router;
