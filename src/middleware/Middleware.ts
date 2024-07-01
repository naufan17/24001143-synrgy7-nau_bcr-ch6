import { Response } from 'express';

class Middleware {
    protected handleSuccess<T>(res: Response, data: T, message: string = 'Success'): void  {
        res.status(200).json({ message, data });
    }

    protected handleUnauthorized(res: Response, message: string = 'Unauthorized'): void  {
        res.status(401).json({ message });
    }

    protected handleForbidden(res: Response, message: string = 'Forbidden'): void  {
        res.status(403).json({ message });
    }

    protected handleError(res: Response, error: unknown, message: string = 'An error occurred'): void  {
        console.error(error);
        res.status(500).json({ message });
    }
}

export default Middleware;