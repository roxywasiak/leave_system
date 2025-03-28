
# Leave Booking System API

## Overview
The Leave Booking System API is a prototype designed to manage employee leave requests. This RESTful API allows staff, managers, and admins to handle various leave-related actions. Future work will include developing a front end to utilise this API.

## Features
### Staff
**Request Leave**: Submit a request for annual leave, subject to manager approval.
**Cancel Leave Request**: Cancel a leave request, whether approved or pending.
**View Leave Status**: View all leave requests and their statuses (Pending, Approved, Rejected).
**View Remaining Leave**: Check the remaining annual leave days for the current business year (starting April 1st).

### Managers
**View Outstanding Requests**: See all pending leave requests for assigned staff members.
**Approve Leave**: Approve leave requests.
**Reject Leave**: Reject leave requests.
**View Staff Leave Balance**: Check the remaining annual leave for staff members.

### Admins
**Add Staff Member**: Add new employees to the system.
**Amend Staff Role/Department**: Update the role or department of a staff member.
**View All Outstanding Requests**: Filter leave requests by staff member, manager’s team, or company-wide.
**Amend Leave Allocation**: Adjust the annual leave assigned to a staff member.
**Approve Requests on Behalf of Managers**: Approve leave requests and track system-wide usage.

## Getting Started
1. Clone the repository.
2. Install dependencies.
3. Set up the database.
4. Run the server.

## Future Work
Development of a front end to utilise this API.
Additional features such as HR approval, manager alerts, and staff alerts.

## License
This project is licensed under the MIT License.


