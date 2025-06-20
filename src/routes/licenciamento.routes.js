import express from 'express';
const router = express.Router();

import { 
  getLicenciamentos, 
  createLicenciamento, 
  updateLicenciamento, 
  deleteLicenciamento 
} from "../controllers/licenciamento.controller.js";

router.post('/licenciamento', createLicenciamento);
router.get('/licenciamento', getLicenciamentos);
router.patch('/licenciamento/:id_licenciamento', updateLicenciamento);
router.delete('/licenciamento/:id_licenciamento', deleteLicenciamento);

export default router;
