import {NextFunction, Request, Response} from 'express';
import Item from '../../core/Item';
import Stock from '../../core/Stock';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stock = await Stock.findById(req.body.StockId);
    const item = await Item.create({
      StockId: stock.id,
      name: req.body.name,
    });
    res.json(item);
  } catch (err) {
    return next(err);
  }
}
