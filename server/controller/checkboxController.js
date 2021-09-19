const CheckBox=require('../models/checkbox');


const checkBox=async (req,res)=>{

    console.log("reaaaaaaaaaaaaaaaaaaaaaa",req.body);
try{
    const saveData=new CheckBox({

        sports:[{
        cricket:req.body.cricket,
        football:req.body.football,
        kabadi:req.body.kabadi,
        }
        ]
    })
    const data=await saveData.save();
        res.status(200).json({saveData:data})
}catch(err)
{
    console.log("errrrrrrrrrrrrrrrrrrrr",err);
    res.status(500).json({error:err})
}


}

const getCheckboxData=async(req,res)=>{

    try{

        const data=await CheckBox.find({});

        res.status(200).json({checkData:data})

    }catch(err)
    {
        console.log("errrrrrrrrrrrrrrrrr")
    }

}
module.exports={
    checkBox
}