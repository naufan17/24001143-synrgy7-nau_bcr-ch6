"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Middleware {
    handleSuccess(res, data, message = 'Success') {
        res.status(200).json({ message, data });
    }
    handleUnauthorized(res, message = 'Unauthorized') {
        res.status(401).json({ message });
    }
    handleForbidden(res, message = 'Forbidden') {
        res.status(403).json({ message });
    }
    handleError(res, error, message = 'An error occurred') {
        console.error(error);
        res.status(500).json({ message });
    }
}
exports.default = Middleware;
