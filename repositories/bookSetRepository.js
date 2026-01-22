import BookSets from "../model/bookSetModel.js";

export class BookSetRepository {

    create = async (bookSetData) => {
        return BookSets.create(bookSetData);
    }

    findWithFilter = async (filter, skip, limit) => {
        // const collections = await mongoose.connection.db.listCollections().toArray();
        // console.log(collections.map(c => c.name));
        // const rawCount = await BookSets.countDocuments(filter);
        // console.log("Filter:", filter);
        // console.log("Raw count:", rawCount);
        // const sampleDoc = await BookSets.findOne().lean();
        // console.log("Sample BookSet:", JSON.stringify(sampleDoc, null, 2));
        // const boardExists = await mongoose.connection.db.collection('boards')
        //     .findOne({ _id: new mongoose.Types.ObjectId(sampleDoc.board) });
        // console.log("Board exists:", boardExists);

        const pipeline = [
            // Convert string IDs to ObjectId before lookups
            {
                $addFields: {
                    board: { $toObjectId: "$board" },
                    medium: { $toObjectId: "$medium" },
                    class: { $toObjectId: "$class" },
                    academic_year: { $toObjectId: "$academic_year" }
                }
            },

            // Match with filters (board, medium, class, academic_year, searchTerm)
            { $match: filter },

            // Lookup Board
            {
                $lookup: {
                    from: "boards",
                    localField: "board",
                    foreignField: "_id",
                    as: "board"
                }
            },
            { $unwind: { path: "$board", preserveNullAndEmptyArrays: true } },

            // Lookup Medium
            {
                $lookup: {
                    from: "mediums",
                    localField: "medium",
                    foreignField: "_id",
                    as: "medium"
                }
            },
            { $unwind: { path: "$medium", preserveNullAndEmptyArrays: true } },

            // Lookup Class
            {
                $lookup: {
                    from: "classes",
                    localField: "class",
                    foreignField: "_id",
                    as: "class"
                }
            },
            { $unwind: { path: "$class", preserveNullAndEmptyArrays: true } },

            // Lookup Academic Year
            {
                $lookup: {
                    from: "academic_years",
                    localField: "academic_year",
                    foreignField: "_id",
                    as: "academic_year"
                }
            },
            { $unwind: { path: "$academic_year", preserveNullAndEmptyArrays: true } },

            // Lookup Book Set Items with Books
            {
                $lookup: {
                    from: "book_set_items",
                    let: { bookSetId: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$book_sets", "$$bookSetId"] } } },
                        {
                            $addFields: {
                                book: { $toObjectId: "$book" }
                            }
                        },
                        {
                            $lookup: {
                                from: "books",
                                localField: "book",
                                foreignField: "_id",
                                as: "book"
                            }
                        },
                        { $unwind: { path: "$book", preserveNullAndEmptyArrays: true } },
                        {
                            $project: {
                                _id: 1,
                                quantity: 1,
                                book: "$book"
                            }
                        }
                    ],
                    as: "books"
                }
            },

            // Project final shape
            {
                $project: {
                    _id: 1,
                    book_set_name: 1,
                    board: { _id: "$board._id", board_name: "$board.name", board_code: "$board.code" },
                    medium: { _id: "$medium._id", medium_name: "$medium.name", medium_code: "$medium.code" },
                    class: { _id: "$class._id", class_name: "$class.name", class_grade: "$class.grade" },
                    academic_year: { _id: "$academic_year._id", academic_year: "$academic_year.academic_year", is_current: "$academic_year.is_current" },
                    books: 1,
                    total_books: { $size: "$books" },
                    createdAt: 1
                }
            },

            // Sort by newest first
            { $sort: { createdAt: -1 } },

            // Pagination with total count
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limit }],
                    totalCount: [{ $count: "count" }]
                }
            }
        ];

        const result = await BookSets.aggregate(pipeline);

        return {
            bookSets: result[0]?.data || [],
            totalData: result[0]?.totalCount[0]?.count || 0,
            currentPage: Math.floor(skip / limit) + 1,
            totalPages: Math.floor(result[0]?.totalCount[0]?.count / limit) || 1,
            limit
        };
    };

    updateWithId = async (bookSetId, newBookSetData) => {
        const updatedBookSet = await BookSets.findByIdAndUpdate(
            bookSetId,
            { $set: newBookSetData },
            { new: true, runValidators: true }
        );

        return updatedBookSet;
    }

    deleteWithId = async (bookSetId) => {
        return BookSets.findByIdAndDelete(bookSetId);
    }
}