import express from 'express';
import BannersController from '../controllers/banners.controller.js';

const router = express.Router();

// Criar Banner
router.post('/banners', BannersController.createBanners);
router.get('/banners', BannersController.createBanners);
router.delete('/banners', BannersController.createBanners);
router.patch('/banners', BannersController.createBanners);


// Atualizar Banner
// router.post('/banners', BannersController.createBanners);

export default router; 