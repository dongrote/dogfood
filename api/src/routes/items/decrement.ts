import {NextFunction, Request, Response} from 'express';
import Item from '../../core/Item';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await Item.findById(Number(req.params.id));
    await item.decrement(Number(req.body.by || 1));
    res.json(item);
  } catch (err) {
    return next(err);
  }
}
