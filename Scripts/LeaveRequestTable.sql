Use leave_management;
CREATE TABLE LeaveRequest (
    leaveRequestId INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    leaveTypeId INT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    status VARCHAR (20) DEFAULT 'Pending'CHECK(STATUS IN ('Approved', 'Rejected', 'Cancelled')),
    reason TEXT,
    FOREIGN KEY (userId) REFERENCES Users(userId),
    FOREIGN KEY (leaveTypeId) REFERENCES LeaveType(leaveTypeId)
);
