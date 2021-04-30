import {NextFunction, Request, Response} from 'express';
import Item from '../../core/Item';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.json(await Item.findById(Number(req.params.id)));
  } catch (err) {
    return next(err);
  }
}
