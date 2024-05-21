import { Response } from 'express';

class Controller {
    protected handleSuccess(res: Response, data: any, message: string = 'Success') {
        res.status(200).json({ message, data });
    }

    protected handleCreated(res: Response, message: string = 'Created') {
        res.status(201).json({ message });
    }

    protected handleUpdated(res: Response, message: string = 'Updated') {
        res.status(201).json({ message });
    }

    protected handleDeleted(res: Response, message: string = 'Deleted') {
        res.status(202).json({ message });
    }

    protected handleBadRequest(res: Response, message: string = 'Bad Request') {
        res.status(400).json({ message });
    }

    protected handleUnauthorized(res: Response, message: string = 'Unauthorized') {
        res.status(401).json({ message });
    }

    protected handleNotFound(res: Response, message: string = 'Not found') {
        res.status(404).json({ message });
    }

    protected handleError(res: Response, error: any, message: string = 'An error occurred') {
        console.error(error);
        res.status(500).json({ message, error });
    }
}

export default Controller;