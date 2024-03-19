const { default: mongoose } = require("mongoose");
const { Row } = require("../model/row");
const { Seat } = require("../model/seat");

module.exports.getSeatInfo = async function (req, res) {

   const { rowNo: row_no, seatNo: seat_no } = req.params;

   const seat = await Seat.findOne({ row_no, seat_no }, { __v: 0, row_no: 0 }).populate('row', { row_no: 1, is_full: 1 });

   if (!seat) return res.status(404).json({ data: null, message: `Not Found` });

   return res.status(200).json({
      message: 'success',
      data: seat
   })
}

module.exports.bookSeat = async function (req, res) {
   const { rowNo: row_no, seatNo: seat_no } = req.params;

   const seat = await Seat.findOne({ row_no, seat_no });

   if (!seat) return res.status(404).json({ data: null, message: `Not Found` });

   if (seat.is_booked) return res.status(400).json({ data: null, message: `Seat is already booked` });

   //Seat is not booked - 1. check for seats +- 1 if booked, -> can't book seat
   const surroundingSeats = await Seat.find({
      row_no,
      seat_no: {
         $in: [Number(seat_no) - 1, Number(seat_no) + 1]
      }
   }, { seat_no: 1, row_no: 1, is_booked: 1 });

   if (surroundingSeats.some(el => el.is_booked)) {
      return res.status(400).json({ data: null, message: `Sorry the adjacent seat is booked` });
   }

   // Seat can be booked;
   const row = await Row.findOne({ _id: seat.row });

   const updatedSeat = await Seat.findOneAndUpdate({ _id: seat._id }, {
      $set: { is_booked: true }
   }, { new: true });

   await Row.findOneAndUpdate({ _id: row._id }, {
      $set: {
         is_full: ((row.filled_seats.length + 1) === row.seats.length)
      },
      $push: {
         filled_seats: Number(seat.seat_no)
      }
   });

   return res.status(200).json({
      data: updatedSeat
   });
}
