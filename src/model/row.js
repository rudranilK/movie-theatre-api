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

rowSchema.pre('updateOne', function () {
   if (this.filled_seats.length > this.seats) {
      throw new Error('Seats for this row are full!');
   }
});

const Row = mongoose.model('row', rowSchema);

module.exports = {
   Row
}