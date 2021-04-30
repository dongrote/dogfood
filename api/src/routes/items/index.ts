import { Router } from 'express';
import create from './create';
import findById from './findById';
import increment from './increment';
import decrement from './decrement';

const router = Router();

router.post('/', create);
router.get('/:id', findById);
router.patch('/:id/increment', increment);
router.patch('/:id/decrement', decrement);

export default router;
