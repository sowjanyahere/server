// models/Data.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  orderDate: Date,
  type: String
});

const Data = mongoose.model('datas', dataSchema);

module.exports = Data;
