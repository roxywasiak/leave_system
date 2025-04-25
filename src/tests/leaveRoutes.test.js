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
describe('Leave Routes', () => {
    it('should allow managers to approve leave for users they manage', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch('/api/leave/leave-requests/approve')
            .send({ leaveId: 1, userId: 1 });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Leave 1 approved');
    }));
    it('should deny access if the manager is not responsible for the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch('/api/leave/leave-requests/approve')
            .send({ leaveId: 1, userId: 5 });
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. You are not the manager of this user.');
    }));
});
describe('Leave Routes', () => {
    it('should create a leave request', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/leave/leave-request').send({
            userId: 1,
            leaveTypeId: 2,
            startDate: '2023-12-01',
            endDate: '2023-12-05',
            reason: 'Vacation',
            status: 'pending'
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Leave request created successfully');
    }));
    it('should get all leave requests', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/leave/leave-requests');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
});
