USE leave_management;
CREATE TABLE Role (
    roleId INT AUTO_INCREMENT PRIMARY KEY,
    name ENUM('employee', 'manager', 'admin') UNIQUE NOT NULL
);
