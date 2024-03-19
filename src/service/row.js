const { Row } = require('../model/row');
const { Seat } = require('../model/seat');

module.exports.addRow = async (req, res) => {
   const rows = await Row.countDocuments({});

   const newRow = new Row({
      row_no: rows + 1,
   });

   const seats = [];
   for (let seatNo = 1; seatNo <= 2 * rows + 1; seatNo++) {
      seats.push({
         row_no: newRow.row_no,
         seat_no: seatNo
      })
   }

   const result = await Seat.insertMany(seats);
   newRow.seats = result.map(el => el._id);

   await newRow.save();

   return res.status(200).send({
      message: 'success',
      data: newRow
   })
}

module.exports.getAll = async (req, res) => {
   const rows = await Row.find({}, { __v: 0 }).populate('seats', { row_no: 0, __v: 0 });

   return res.status(200).json({
      data: { rows }
   });
}
