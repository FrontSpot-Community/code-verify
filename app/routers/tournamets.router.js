import express from 'express';

const router = express.Router();

router.get('/tournamets', (req, res, next) => {
    next();
});

export default router;
