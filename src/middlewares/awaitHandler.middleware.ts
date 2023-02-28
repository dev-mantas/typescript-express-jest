import {Request, Response, NextFunction} from 'express'
export const awaitHandler = (middleware: any) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try {
            await middleware(req, res, next)
        }
        catch(err)
        {
            next(err)
        }
    }
}