import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    refreshToken: {
        type: String,
        default: ""
    }
})

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = async function (loginFormPassword) {
    return await bcrypt.compare(loginFormPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;