"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const leaveRoutes_1 = __importDefault(require("./routes/leaveRoutes"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/leave", leaveRoutes_1.default);
app.get("/", (_req, res) => {
    res.send("Leave System API is running...");
});
app.get("/api/test-db", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query("SELECT NOW()");
        res.json({ success: true, time: rows[0]["NOW()"] });
    }
    catch (err) {
        console.error("DB Error:", err);
        res.status(500).json({ success: false, message: "DB connection failed" });
    }
}));
exports.default = app;
