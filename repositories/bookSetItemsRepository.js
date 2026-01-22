import BookSetItems from "../model/bookSetItemsModel.js";

export class BookSetItemsRepository {

    async create(data) {
        return BookSetItems.create(data);
    }

    async createMany(bookSetItemsData) {
        return BookSetItems.insertMany(bookSetItemsData);
    }

    async deleteManyWithId(bookSetId) {
        return BookSetItems.deleteMany({ book_sets: bookSetId });
    }

}