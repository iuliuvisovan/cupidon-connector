import { Router } from 'express';
import { verifyGlovoSignature } from '../middleware/auth';
import { handleDispatchedOrder, handleCancelledOrder } from '../controllers/webhooks';

const router = Router();

// Glovo webhook endpoints
router.post('/orders/dispatched', verifyGlovoSignature, handleDispatchedOrder);
router.post('/orders/cancelled', verifyGlovoSignature, handleCancelledOrder);

export default router;