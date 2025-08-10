
const User = require('../models/user');
const OTP = require('../models/otp');
const logger = require('../utils/logger');
const { sendOTP } = require('../config/validator');


/**
 * Register a new user
 * @param {Object} userData
 * @returns {Promise<Object>}
 */
exports.registerUser = async (userData) => {
    try {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        const user = new User({
            ...userData,
            is_verified: false
        });
        const savedUser = await user.save();
        await sendOTP(user.email);
        logger.info(`User registered: ${user.email}`);
        return { id: savedUser._id, email: savedUser.email };
    } catch (error) {
        logger.error(`Registration failed: ${error.message}`);
        throw error;
    }
};


/**
 * Login user (no password check, no JWT)
 * @param {Object} param0
 * @returns {Promise<Object>} user info if found and verified
 */
exports.loginUser = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        if (!user.is_verified) {
            throw new Error('Email not verified. Please verify your email.');
        }
        // NOTE: No password check or JWT
        logger.info(`User login (no password check): ${user.email}`);
        return { id: user._id, email: user.email };
    } catch (error) {
        logger.error(`Login failed: ${error.message}`);
        throw error;
    }
};


/**
 * Verify OTP for user
 * @param {string} email
 * @param {string} otp
 * @returns {Promise<Object>}
 */
exports.verifyOtp = async (email, otp) => {
    try {
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            throw new Error('Invalid or expired OTP');
        }
        await User.updateOne({ email }, { is_verified: true });
        await OTP.deleteMany({ email });
        logger.info(`OTP verified for: ${email}`);
        return { email, verified: true };
    } catch (error) {
        logger.error(`OTP verification failed: ${error.message}`);
        throw error;
    }
};


/**
 * Get user profile
 * @param {string} userId
 * @returns {Promise<Object>}
 */
exports.getProfile = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        logger.info(`Profile retrieved for user: ${user.email}`);
        return user;
    } catch (error) {
        logger.error(`Get profile failed: ${error.message}`);
        throw error;
    }
};


/**
 * Update user profile
 * @param {string} userId
 * @param {Object} updateData
 * @returns {Promise<Object>}
 */
exports.updateProfile = async (userId, updateData) => {
    try {
        // No password hashing
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password');
        if (!updatedUser) {
            throw new Error('User not found');
        }
        logger.info(`User profile updated: ${updatedUser.email}`);
        return updatedUser;
    } catch (error) {
        logger.error(`Update profile failed: ${error.message}`);
        throw error;
    }
};