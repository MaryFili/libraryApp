import Document from '../models/documentSchema.js';
import path from 'path';



export const getAllDocuments = async (req, res, next) => {
    try {
        const docs = await Document.find();

        res.status(200).json({
            message: 'List of Documents',
            data: docs
        });

    } catch (err) {
        next(err);
    }
}

// export const addDocument = async (req, res, next) => {
//     try {
//         const { filename } = req.body;
//         const file = req.file.path;
//         const doc = await Document.create({ filename, file });
//         res.status(201).json({
//             message: 'Document added successfully',
//             data: doc
//         })
//     } catch (err) {
//         next(err)
//     }
// }
export const addDocument = async (req, res, next) => {
    try {

        const files = req.files.map(file => file.path);

        const docs = [];
        for (let i = 0; i < files.length; i++) {
            const doc = await Document.create({ path: files[i], name: files[i].name, file: files[i] });
            console.log(doc);
            docs.push(doc);
        };

        res.status(201).json({
            message: 'Documents added successfully',
            docs
        });
    } catch (err) {
        next(err);
    }
};

export const downloadFile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doc = await Document.findById(id);
        //if the doc doesn't exist throw an error and stops execution
        if (!doc) {
            throw new Error('Document not found');
        }

        const file = doc.file;

        const filePath = path.join(process.cwd(), file);

        //add download count
        const updatedDoc = await Document.findByIdAndUpdate(id, {
            downloadCount: doc.downloadCount + 1
        });
        //save the updated doc
        await updatedDoc.save();

        res.set('Access-Control-Expose-Headers', 'Content-Disposition')

        res.download(filePath);

    } catch (err) {
        next(err);
    }
}

export const deleteDocument = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedDoc = await Document.findByIdAndRemove(id);

        res.status(200).json({
            message: "Document deleted successfully",
        })
    } catch (err) {
        next(err);
    }
}