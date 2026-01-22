import Mediums from "../model/mediumsModel.js";

export class mediumRepository {
    findAll = async () => {
        return await Mediums.find();
    }
}