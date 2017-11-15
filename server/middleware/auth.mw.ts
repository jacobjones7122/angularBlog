import { Request, Response, NextFunction } from 'express';

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user.roll === 'admin') {
        next();
    } else {
        res.sendStatus(403);
    }
}

//RowDataPacket.roll