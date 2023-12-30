import express from 'express';
const router = express.Router();

import user from './user';
import room from './room';
import auth from './auth';

router.use("/user", user);
router.use("/room", room);
router.use("/auth", auth);

export default router;