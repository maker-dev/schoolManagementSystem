import { FieldModel } from "../models/Field.js";

const getFields = async (req, res) => {
    try {
        const { typeId } = req.query;

        const fields = await FieldModel.find({bacRequired: typeId});
        
        res.json(fields);

    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {getFields}