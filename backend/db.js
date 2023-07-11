const mongoose=require('mongoose')

const ConnectToDB = async (e) => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.log("Failed to connect to MongoDB...", err);
  }
}



module.exports=ConnectToDB;