const Blog = require('../models/blog');
const logger = require('../utils/logger');
const createTransporter = require('../config/nodemailer');
const { generatePostPublishedEmail } = require('../utils/postPublishedTemplates');

/**
 * Create a new blog post
 * @param {Object} blogData - The blog data
 * @param {Object} user - The user creating the blog
 * @returns {Promise<Object>} Created blog post
 */
exports.createBlog = async (blogData, user) => {
    try {
        const blog = new Blog({
            ...blogData,
            author: user._id  // Use user ID, not name
        });

        const savedBlog = await blog.save();
        logger.info(`Blog created successfully with ID: ${savedBlog._id}`);

        // Send email notification
        try {
            const transporter = createTransporter();
            const emailContent = generatePostPublishedEmail(
                user.name,
                blogData.title,
                `${process.env.FRONTEND_URL}/blogs/${savedBlog._id}`
            );

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Your Blog Post is Live!',
                html: emailContent
            });

            logger.info(`Publication notification email sent to ${user.email}`);
        } catch (emailError) {
            logger.error(`Failed to send publication notification email: ${emailError.message}`);
            // Don't throw error here as the blog was created successfully
        }

        return savedBlog;
    } catch (error) {
        logger.error(`Failed to create blog: ${error.message}`);
        throw new Error('Failed to create blog post');
    }
};

/**
 * Get all blog posts
 * @returns {Promise<Array>} Array of blog posts
 */
exports.getAllBlogs = async () => {
    try {
        const blogs = await Blog.find()
            .sort({ createdAt: -1 }) // Assuming schema uses createdAt (camelCase)
            .populate('author', 'name'); // Populate author name
        
        logger.info('Successfully retrieved all blogs');
        return blogs;
    } catch (error) {
        logger.error(`Failed to fetch blogs: ${error.message}`);
        throw new Error('Failed to fetch blog posts');
    }
};

/**
 * Get a blog post by ID
 * @param {string} id - The blog post ID
 * @returns {Promise<Object>} Blog post
 */
exports.getBlogById = async (id) => {
    try {
        const blog = await Blog.findById(id)
            .populate('author', 'name');

        if (!blog) {
            logger.warn(`Blog not found with ID: ${id}`);
            throw new Error('Blog post not found');
        }

        logger.info(`Successfully retrieved blog with ID: ${id}`);
        return blog;
    } catch (error) {
        logger.error(`Failed to fetch blog: ${error.message}`);
        throw error;
    }
};

/**
 * Update a blog post
 * @param {string} id - The blog post ID
 * @param {Object} updateData - The update data
 * @param {Object} user - The user updating the blog
 * @returns {Promise<Object>} Updated blog post
 */
exports.updateBlog = async (id, updateData, user) => {
    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            logger.warn(`Blog not found with ID: ${id}`);
            throw new Error('Blog post not found');
        }

        // Check if the user is the author of the blog
        if (blog.author.toString() !== user._id.toString()) {
            logger.warn(`Unauthorized update attempt on blog ${id} by user ${user._id}`);
            throw new Error('Unauthorized to update this blog post');
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: Date.now() },
            { new: true }
        ).populate('author', 'name');

        logger.info(`Blog updated successfully with ID: ${id}`);
        return updatedBlog;
    } catch (error) {
        logger.error(`Failed to update blog: ${error.message}`);
        throw error;
    }
};

/**
 * Delete a blog post
 * @param {string} id - The blog post ID
 * @param {Object} user - The user deleting the blog
 * @returns {Promise<void>}
 */
exports.deleteBlog = async (id, user) => {
    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            logger.warn(`Blog not found with ID: ${id}`);
            throw new Error('Blog post not found');
        }

        if (blog.author.toString() !== user._id.toString()) {
            logger.warn(`Unauthorized deletion attempt on blog ${id} by user ${user._id}`);
            throw new Error('Unauthorized to delete this blog post');
        }

        await Blog.findByIdAndDelete(id);
        logger.info(`Blog deleted successfully with ID: ${id}`);
    } catch (error) {
        logger.error(`Failed to delete blog: ${error.message}`);
        throw error;
    }
};