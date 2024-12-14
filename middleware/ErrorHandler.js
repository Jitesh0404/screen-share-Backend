const errorHandle = (err,next) => {
  try {
    const error = new Error();
    error.status = err.statusCode || 500, 
    error.message = err.message || "Internal Server Error";
    console.log("inside error Handler");
    
    return res.status(500).json({
      success:false,
      error
    });
  } catch (error) {
    next(error)
  }
};

module.exports = errorHandle;
