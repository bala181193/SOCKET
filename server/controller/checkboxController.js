const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const checkbox = require('../models/checkbox');
const CheckBox = require('../models/checkbox');
const { ObjectId } = mongoose.Types
var url = "mongodb://localhost:27017/";


const checkBox = async (req, res) => {

    try {
        const saveData = new CheckBox({

            sports: [{
                cricket: req.body.cricket,
                football: req.body.football,
                kabadi: req.body.kabadi,
            }
            ]
        })
        const data = await saveData.save();
        res.status(200).json({ saveData: data })
    } catch (err) {
        res.status(500).json({ error: err })
    }


}

const getMultipleCheckbox = async (req, res) => {

    try {

        const data = await CheckBox.findOne({});

        res.status(200).json({ result: data.multipleCheckbox })

    } catch (err) {
        res.status(500).json({ errors: err })
    }

}

const multipleCheckBox = async (req, res) => {

    try {

        const arrayData = req.body;
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const dbo = client.db('workTry');

        arrayData.forEach(async (data, i) => {

            dbo.collection("checkboxData").updateOne(
                { "multipleCheckbox": { "$elemMatch": { "name": data.name } } },
                { "$set": { "multipleCheckbox.$[e].isChecked": data.isChecked } },
                { "arrayFilters": [{ "e.name": data.name }], },
                function (err, res) {
                    if (err) throw err;
                    console.log("1 document updated");
                });
        })

        return res.status(200).json({ "message": "updated Successs" })
    } catch (err) {
        return res.status(500).json({ error: err })
    }


}

module.exports = {
    checkBox,
    multipleCheckBox,
    getMultipleCheckbox
}