var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, required: true},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('Category', schema);