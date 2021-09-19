const express=require('express');
const checkBoxController=require('../controller/checkboxController');

const router=express.Router();

router.post('/checkBox',checkBoxController.checkBox)

module.exports=router;