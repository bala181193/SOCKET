var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const checkboxData = new Schema({

sports:[
  {
    cricket:{
        type:Boolean,
        default:"",
      },
      football:{
        type:Boolean,
        default:"",
      },
      kabadi:{
         type:Boolean,
        default:"",
      },
  }
],
  
 multipleCheckbox:[{name:{type:String,isChecked:{type:Boolean}}}],
  date: {
    type: Date,
    default: Date.now,
  }
  
});



module.exports  = mongoose.model("checkboxData",checkboxData, "checkboxData");
