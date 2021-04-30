import { NextFunction, Request, Response } from "express";
import Stock from "../../core/Stock";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.json(await Stock.findById(Number(req.params.id)));
  } catch (err) {
    return next(err);
  }
}
