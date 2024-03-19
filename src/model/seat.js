const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
   seat_no: Number,
   row_no: Number,
   row: {
      type: mongoose.Types.ObjectId,
      ref: 'row'
   },
   is_booked: {
      type: Boolean,
      default: false
   },
});

const Seat = mongoose.model('seat', seatSchema);

module.exports = {
   Seat,
   seatSchema
}
