import express from 'express';
import { upload } from '../middlewares/multer.js';
import { addDocument, downloadFile, getAllDocuments } from '../controllers/documentController.js';

const router = express.Router();

router.route('/')
    .get(getAllDocuments)
    .post(upload.single('file'), addDocument);

router.route('/download/:id').get(downloadFile)




export default router;