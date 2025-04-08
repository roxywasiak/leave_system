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
exports.register = void 0;
const db_1 = __importDefault(require("../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, department, interests, availability, notifications } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const [result] = yield db_1.default.execute(`INSERT INTO users (email, password, department, interests, availability, notifications)
       VALUES (?, ?, ?, ?, ?, ?)`, [email, hashedPassword, department, interests, availability, notifications]);
        res.status(201).json({ message: 'User registered' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.register = register;
