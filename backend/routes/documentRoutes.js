import express from 'express';
import { upload } from '../middlewares/multer.js';
import { addDocument, deleteDocument, downloadFile, getAllDocuments, updateDocument } from '../controllers/documentController.js';

const router = express.Router();

router.route('/')
    .get(getAllDocuments)
    .post(upload.array("files", 10), addDocument);

router.route('/:id')
    .get(downloadFile)
    .delete(deleteDocument)
    .patch(updateDocument)




export default router;