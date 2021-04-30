import { Router } from 'express';
import findAll from './findAll';
import create from './create';
import findById from './findById';

const router = Router();

router.get('/', findAll);
router.post('/', create);
router.get('/:id', findById);

export default router;
