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

const Row = mongoose.model('row', rowSchema);

module.exports = {
   Row
}