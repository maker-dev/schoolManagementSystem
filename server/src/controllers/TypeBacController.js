import { TypeOfBacModel } from "../models/TypeOfBac.js";

const getTypesOfBac = async (req, res) => {
    try {
        const types = await TypeOfBacModel.find();

        res.json(types);
        
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {getTypesOfBac}