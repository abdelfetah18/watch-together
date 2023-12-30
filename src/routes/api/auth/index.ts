import express from 'express';
const router = express.Router();

import updateToken from './update_token';

router.use("/update_token", updateToken);

export default router;