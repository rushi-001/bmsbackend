import Books from "../model/booksModel.js";

export class bookRepository {
    findAll = async () => {
        return await Books.find();
    }
}