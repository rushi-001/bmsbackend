import { BookSetItemsRepository } from "../repositories/bookSetItemsRepository.js";

export class BookSetItemsServices {
    constructor() {
        this.bookSetItemsRepository = new BookSetItemsRepository();
    }

    
}