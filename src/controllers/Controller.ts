import { Response } from 'express';

class Controller {
    protected handleSuccess<T>(res: Response, data: T, message: string = 'Success'): void {
        res.status(200).json({ message, data });
    }

    protected handleCreated(res: Response, message: string = 'Created'): void {
        res.status(201).json({ message });
    }

    protected handleUpdated(res: Response, message: string = 'Updated'): void {
        res.status(201).json({ message });
    }

    protected handleDeleted(res: Response, message: string = 'Deleted'): void {
        res.status(202).json({ message });
    }

    protected handleBadRequest(res: Response, message: string = 'Bad Request'): void {
        res.status(400).json({ message });
    }

    protected handleUnauthorized(res: Response, message: string = 'Unauthorized'): void {
        res.status(401).json({ message });
    }

    protected handleNotFound(res: Response, message: string = 'Not found'): void {
        res.status(404).json({ message });
    }

    protected handleError(res: Response, error: unknown, message: string = 'An error occurred'): void {
        console.error(error);
        res.status(500).json({ message });
    }
}

export default Controller;