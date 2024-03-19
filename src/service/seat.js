const { Seat } = require("../model/seat");

module.exports.getSeatInfo = async function (req, res) {

   const { rowNo: row_no, seatNo: seat_no } = req.params;

   const seat = await Seat.findOne({ row_no, seat_no }, { __v: 0, row_no: 0 }).populate('row', { row_no: 1, is_full: 1 });

   if (!seat) return res.status(400).json({ data: null, message: `Not Found` });

   return res.status(200).json({
      message: 'success',
      data: seat
   })
}