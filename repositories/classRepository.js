import Classes from "../model/classesModel.js";

export class classRepository {
    findAll = async () => {
        return await Classes.find();
    }
}