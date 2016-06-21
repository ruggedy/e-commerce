var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    image: [{
        imagePath: {type: String, required: true},
        imageFileName: {type: String, required: true},
        imageType: {type: String, required: true}
    }],
    desc: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    category: [{type: Schema.Types.ObjectId, ref: 'Category'}]
});

module.exports = mongoose.model('Product', schema);