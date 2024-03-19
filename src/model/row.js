const mongoose = require('mongoose');

const rowSchema = new mongoose.Schema({
   row_no: {
      type: Number,
      unique: true
   },
   seats: {
      type: [mongoose.Types.ObjectId],
      ref: 'seat',
      default: [],
   },
   filled_seats: {
      type: [Number],
      default: []
   },
   is_full: {
      type: Boolean,
      default: false
   }
});

//WIP - validate capacity is full or not
// rowSchema.pre('findOneAndUpdate', function (next) {
//    const update = this.getUpdate();
//    const filledSeats = update.$set ? update.$set.filled_seats : undefined;


//    if (filledSeats && filledSeats.length > this.seats.length) {
//       throw new Error('Seats for this row are full!');
//    }
//    next();
// });

const Row = mongoose.model('row', rowSchema);

module.exports = {
   Row
}