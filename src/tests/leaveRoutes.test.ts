import request from 'supertest';
import app from '../app';  

describe('Leave Routes', () => {
  it('should allow managers to approve leave for users they manage', async () => {
    const response = await request(app)
      .patch('/api/leave/leave-requests/approve')
      .send({ leaveId: 1, userId: 1 });  

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Leave 1 approved');
  });

  it('should deny access if the manager is not responsible for the user', async () => {
    const response = await request(app)
      .patch('/api/leave/leave-requests/approve')
      .send({ leaveId: 1, userId: 5 }); 

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Access denied. You are not the manager of this user.');
  });
});


describe('Leave Routes', () => {
  it('should create a leave request', async () => {
    const response = await request(app).post('/api/leave/leave-request').send({
      userId: 1,
      leaveTypeId: 2,
      startDate: '2023-12-01',
      endDate: '2023-12-05',
      reason: 'Vacation',
      status: 'pending'
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
