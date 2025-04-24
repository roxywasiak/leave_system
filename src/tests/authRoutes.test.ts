import request from 'supertest';
import app from '../app';  
import { User } from '../models/User';  
import bcrypt from 'bcrypt';

//test
beforeAll(async () => {
  const passwordHash = await bcrypt.hash('password123', 10);
  await User.create({
    firstName: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    passwordHash,
    salt: 'salt_placeholder',
    role: 'employee',
    annualLeaveBalance: 25
  });
});

describe('Auth Routes', () => {
  describe('POST /register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Jane',
          surname: 'Doe',
          email: 'jane.doe@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully');
    });
  });

  describe('POST /login', () => {
    it('should log in a user and return a token', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john.doe@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.token).toBeDefined();
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john.doe@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid email or password');
    });
  });
});
