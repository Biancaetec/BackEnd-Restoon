import express from 'express';
import BannersController from '../controllers/banners.controller.js';

const router = express.Router();

// Criar Banner
router.post('/banners', BannersController.createBanners);

// Atualizar Banner
router.post('/banners', BannersController.createBanners);

export default router;