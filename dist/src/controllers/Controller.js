"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    handleSuccess(res, data, message = 'Success') {
        res.status(200).json({ message, data });
    }
    handleCreated(res, message = 'Created') {
        res.status(201).json({ message });
    }
    handleUpdated(res, message = 'Updated') {
        res.status(201).json({ message });
    }
    handleDeleted(res, message = 'Deleted') {
        res.status(202).json({ message });
    }
    handleBadRequest(res, message = 'Bad Request') {
        res.status(400).json({ message });
    }
    handleUnauthorized(res, message = 'Unauthorized') {
        res.status(401).json({ message });
    }
    handleForbidden(res, message = 'Forbidden') {
        res.status(403).json({ message });
    }
    handleNotFound(res, message = 'Not found') {
        res.status(404).json({ message });
    }
    handleError(res, error, message = 'An error occurred') {
        console.error(error);
        res.status(500).json({ message });
    }
}
exports.default = Controller;
