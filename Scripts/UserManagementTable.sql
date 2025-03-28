USE leave_management;
CREATE TABLE UserManagement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    managerId INT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE,
    FOREIGN KEY (userId) REFERENCES User(userId),
    FOREIGN KEY (managerId) REFERENCES User(userId)
);
