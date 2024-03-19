
// WIP
module.exports = function (req, res, next) {
   const data = res.body;

   return res.status(200).send({
      message: 'success',
      data: data || {}
   })
}