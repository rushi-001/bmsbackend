import AcademicYears from "../model/academicYearsModel.js";
import BookSets from "../model/bookSetModel.js";
import Books from "../model/booksModel.js";
import Boards from "../model/boardsModel.js";

export class AdminDashboardRepository {

    AdminDashboardData = async () => {
        const [
            totalBookSets,
            totalBooks,
            currentAcademicYear,
            boards,
            recentBookSets
        ] = await Promise.all([
            // Total Book Sets count
            BookSets.countDocuments(),

            // Total Active Books count
            Books.countDocuments(),

            // Current Academic Year
            AcademicYears.findOne({ is_current: true }),

            // All Boards
            Boards.find().select('name code'),

            // Recent 3 Book Sets with lookups
            BookSets.aggregate([
                {
                    $addFields: {
                        board: { $toObjectId: "$board" },
                        medium: { $toObjectId: "$medium" },
                        class: { $toObjectId: "$class" }
                    }
                },
                { $lookup: { from: "boards", localField: "board", foreignField: "_id", as: "board" } },
                { $unwind: { path: "$board", preserveNullAndEmptyArrays: true } },
                { $lookup: { from: "mediums", localField: "medium", foreignField: "_id", as: "medium" } },
                { $unwind: { path: "$medium", preserveNullAndEmptyArrays: true } },
                { $lookup: { from: "classes", localField: "class", foreignField: "_id", as: "class" } },
                { $unwind: { path: "$class", preserveNullAndEmptyArrays: true } },
                { $lookup: { from: "book_set_items", localField: "_id", foreignField: "book_sets", as: "items" } },
                { $sort: { createdAt: -1 } },
                { $limit: 3 },
                {
                    $project: {
                        book_set_name: 1,
                        board_name: "$board.name",
                        medium_name: "$medium.name",
                        class_name: "$class.name",
                        total_books: { $size: "$items" }
                    }
                }
            ])
        ]);

        return {
            stats: {
                totalBookSets,
                totalBooks,
                currentAcademicYear: currentAcademicYear?.academic_year || null,
                totalBoards: boards.length
            },
            recentBookSets,
            boards: boards
        };
    };
}