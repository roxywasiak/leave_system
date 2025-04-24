import request from 'supertest';
import app from '../app';  // Import your Express app

describe('Leave Routes', () => {
  it('should create a leave request', async () => {
    const response = await request(app).post('/api/leave/leave-request').send({
      userId: 1,
      leaveTypeId: 2,
      startDate: '2023-12-01',
      endDate: '2023-12-05',
      reason: 'Vacation',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Leave request created successfully');
  });

  it('should get all leave requests', async () => {
    const response = await request(app).get('/api/leave/leave-requests');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
