import {NextFunction, Request, Response} from 'express';
import Item from '../../core/Item';
import Stock from '../../core/Stock';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stock = await Stock.findById(req.body.StockId);
    const item = await Item.create({
      StockId: req.body.StockId,
      name: req.body.name,
    });
    await stock.addItem(item);
    res.json(item);
  } catch (err) {
    return next(err);
  }
}
