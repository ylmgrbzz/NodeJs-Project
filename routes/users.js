import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Yalım Gürbüz');
});

export default router;
