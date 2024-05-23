import { Response } from 'express';

class Middleware {
    protected handleSuccess(res: Response, data: any, message: string = 'Success') {
        res.status(200).json({ message, data });
    }

    protected handleUnauthorized(res: Response, message: string = 'Unauthorized') {
        res.status(401).json({ message });
    }

    protected handleForbidden(res: Response, message: string = 'Forbidden') {
        res.status(403).json({ message });
    }

    protected handleError(res: Response, error: any, message: string = 'An error occurred') {
        console.error(error);
        res.status(500).json({ message });
    }
}

export default Middleware;