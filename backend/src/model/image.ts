// Step 3 - this is the code for ./models.js
  
var mongoose = require('mongoose');
  
var image = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
  
//Image is a model which has a schema imageSchema
const imageModel = mongoose.model('imageModel', image, 'imaege')
export {imageModel};