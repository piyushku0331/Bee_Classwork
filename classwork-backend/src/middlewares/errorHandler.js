const ERROR_HANDLER = (err, req, res, next) => {
    console.log('Error occurred:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {},
    });
};
module.exports = ERROR_HANDLER;