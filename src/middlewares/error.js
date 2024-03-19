module.exports = function (err, req, res, next) {
   console.error(err.message, err);
   res.status(500).send(
      {
         message: `Something Went Wrong`,
         error: err.message
      });
}