import express from 'express';
const router = express.Router();

import user from './user';
import api from './api';
import room from './room';
import handle_home from './handle_home';

router.use("/user", user);
router.use("/api", api);
router.use("/room", room);
router.use('/', handle_home);

export default router;