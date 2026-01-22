import AcademicYears from "../model/academicYearsModel.js";

export class academicYearRepository {
    findAll = async () => {
        return await AcademicYears.find();
    }
}