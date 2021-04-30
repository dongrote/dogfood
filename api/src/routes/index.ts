import {Router} from 'express';
import stock from './stock';
import items from './items';

const router = Router();

router.use('/stock', stock);
router.use('/items', items);

export default router;
