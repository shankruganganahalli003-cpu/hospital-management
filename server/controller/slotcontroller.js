const slotmodel = require("../models/slotmodel");


module.exports.create = async (req,res) => {
    try {

        const {doctorId,date,time} =req.body;

        if(!date || !time){
            return res.status(400).json({message:"please select Date and Time"});
        }

       const isBooked = await slotmodel.findOne({
  doctorId,
  date: new Date(date),
  time,
});

     if (isBooked) {
  return res.status(400).json({ message: "Its booked Please select another Slot" });
}
           
        const createSlot = await slotmodel.create({
                doctorId,date,time,isBooked:true
            });

        return res.status(200).json({message:"Booked Successfully",createSlot});

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message:"Internal server error"})
    }    
}


    module.exports.getall = async (req,res) => {
        try {
            
            const getall = await slotmodel.find({isBooked:true});
            return res.status(200).json({message:"Fetched",getall});

        }catch (err) {
        console.log(err.message);
        return res.status(500).json({message:"Internal server error"})
    }    
        
    }

    