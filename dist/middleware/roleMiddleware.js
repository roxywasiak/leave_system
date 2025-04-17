"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authoriseRoles = void 0;
const authoriseRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ message: "Access denied" });
        }
        else {
            next();
        }
    };
};
exports.authoriseRoles = authoriseRoles;
