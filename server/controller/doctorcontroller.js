
const doctormodel = require("../models/doctormodel");

module.exports.create = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      fullName,
      specialization,
      experience,
      feesPerConsultation,
      about,
      address,
      image,
    } = req.body;

    if (
      !fullName ||
      !specialization ||
      experience === undefined ||
      feesPerConsultation === undefined ||
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
      about,
      address,
      image,
    });

 return res.status(201).json({
  success: true,
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
        return res.json({success:true,getall});


    } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};


module.exports.update = async (req,res)=>{
    try {
        const {id} = req.params;
        const {fullName,specialization,experience,feesPerConsultation,about,address,image} = req.body;

        const update = await doctormodel.findByIdAndUpdate(id,{fullName,specialization,experience,feesPerConsultation,about,address,image},{new:true});

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
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}
module.exports.getme = async (req, res) => {
  try {
    const userId = req.userId;
    const getme = await doctormodel.find({ userId });

    if (!getme) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      getme,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};