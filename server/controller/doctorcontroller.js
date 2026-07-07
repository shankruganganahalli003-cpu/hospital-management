
const doctormodel = require("../models/doctormodel");

module.exports.create = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      fullName,
      specialization,
      experience,
      feesPerConsultation,
      timings,
      about,
      address,
      image,
    } = req.body;

    if (
      !fullName ||
      !specialization ||
      experience === undefined ||
      feesPerConsultation === undefined ||
      !timings ||
      !about ||
      !image
    ) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const existingDoctor = await doctormodel.findOne({ userId });

    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor profile already exists" });
    }

    const doctor = await doctormodel.create({
      userId,
      fullName,
      specialization,
      experience,
      feesPerConsultation,
      timings,
      about,
      address,
      image,
    });

    return res.status(201).json({
      message: "Doctor created successfully",
      doctor,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports.getall = async (req,res)=>{
    try {
        
        const getall = await doctormodel.find();
        return res.json({getall});


    } catch (err) {
        console.log(err.message);

    }
};


module.exports.update = async (req,res)=>{
    try {
        const {id} = req.params;
        const {fullName,specialization,experience,feesPerConsultation,timings,about,address,image} = req.body;

        const update = await doctormodel.findByIdAndUpdate(id,{fullName,specialization,experience,feesPerConsultation,timings,about,address,image},{new:true});

        return res.json({update});
    } catch (err) {
        console.log(err.message);
    }
}


module.exports.deletedoctor = async (req,res)=>{
    try {

        const {id} = req.params;
        const deleteDoctor = await doctormodel.findByIdAndDelete(id);
        return res.json({deleteDoctor});
        
    } catch (err) {
        console.log(err.message);
    }
}

