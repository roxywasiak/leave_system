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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
//test
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const passwordHash = yield bcrypt_1.default.hash('password123', 10);
    yield User_1.User.create({
        firstName: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        passwordHash,
        salt: 'salt_placeholder',
        role: 'employee',
        annualLeaveBalance: 25
    });
}));
describe('Auth Routes', () => {
    describe('POST /register', () => {
        it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/api/auth/register')
                .send({
                firstName: 'Jane',
                surname: 'Doe',
                email: 'jane.doe@example.com',
                password: 'password123'
            });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User registered successfully');
        }));
    });
    describe('POST /login', () => {
        it('should log in a user and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/api/auth/login')
                .send({
                email: 'john.doe@example.com',
                password: 'password123'
            });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful');
            expect(response.body.token).toBeDefined();
        }));
        it('should return 401 for invalid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/api/auth/login')
                .send({
                email: 'john.doe@example.com',
                password: 'wrongpassword'
            });
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid email or password');
        }));
    });
});
