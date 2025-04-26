USE leave_management;
CREATE TABLE LeaveType (
    leaveTypeId INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    initialBalance INT DEFAULT 25,
    maxRollOverDays INT DEFAULT 5
);

