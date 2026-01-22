import jwt from 'jsonwebtoken'

export class tokenUtils {
    static generateAccessToken(payload) {
        return jwt.sign({ ...payload, type: "AT" }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN });
    }

    static generateRefreshToken(payload) {
        return jwt.sign({ ...payload, type: "RT" }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
    }

    static verifyAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    static verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}