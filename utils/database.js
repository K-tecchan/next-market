import mongoose from "mongoose";

const connectDB = async() => {
  try {
    await mongoose.connect('mongodb+srv://tecchan:gorillagorilla@cluster0.2onbr.mongodb.net/?retryWrites=true&w=majority')
    console.log('Success: Connected to MongoDB')
  } catch(err) {
    console.log('Failure: Unconnected to MongoDB')
    throw new Error()
  }
}

export default connectDB