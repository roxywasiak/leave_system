import request from 'supertest';
import app from '../app'; 
describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
      department: 'HR',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered');
  });

  it('should log in with correct credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should fail to log in with invalid credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'wrong@example.com',
      password: 'wrongpassword',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
