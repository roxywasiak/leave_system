USE leave_management;
CREATE TABLE LeaveType (
    leaveTypeId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    initialBalance INT DEFAULT 25,
    maxRollOverDays INT DEFAULT 5
);

