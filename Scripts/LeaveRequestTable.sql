Use leave_management;
CREATE TABLE LeaveRequest (
    leaveRequestId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    leaveTypeId INT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    status ENUM('Pending', 'Approved', 'Rejected', 'Cancelled') DEFAULT 'Pending',
    reason TEXT,
    FOREIGN KEY (userId) REFERENCES User(userId),
    FOREIGN KEY (leaveTypeId) REFERENCES LeaveType(leaveTypeId)
);
