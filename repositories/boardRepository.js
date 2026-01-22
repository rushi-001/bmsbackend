import Boards from "../model/boardsModel.js";

export class boardRepository {
    findAll = async () => {
        return await Boards.find();
    }
}