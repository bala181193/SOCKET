const express = require('express');
const checkBoxController = require('../controller/checkboxController');

const router = express.Router();

router.post('/checkBox', checkBoxController.checkBox)
router.route('/multipleCheckBox')
.post(checkBoxController.multipleCheckBox)
router.route('/getMultipleCheckBox').get(checkBoxController.getMultipleCheckbox) 



module.exports = router;