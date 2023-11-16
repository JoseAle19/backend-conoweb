import Unit from "../models/Units.js";
const UnitModel = new Unit();

export const getUnits = async (req, res) => {
    try {
        const response = await UnitModel.find();
        return res.json({
        message: "Unidades encontradas",
        units: response,
        status: true,
        });
    } catch (e) {
        return res.json({
        message: e,
        units: {},
        status: false,
        });
    }
}