import { Request, Response } from 'express'
export async function registerUser (req: Request, res: Response) {
    return res.status(200).send('ok')
}