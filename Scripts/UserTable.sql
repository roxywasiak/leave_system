USE leave_management;
CREATE TABLE User (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    role ENUM('employee', 'manager', 'admin') NOT NULL,
    annualLeaveBalance INT DEFAULT 25
);


