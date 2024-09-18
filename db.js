const mongoose=require('mongoose')


const mongoURI="mongodb://adharshpaila788:Adharsh123@gofood-shard-00-00.e7ts6.mongodb.net:27017,gofood-shard-00-01.e7ts6.mongodb.net:27017,gofood-shard-00-02.e7ts6.mongodb.net:27017/gofood?ssl=true&replicaSet=atlas-a22owy-shard-0&authSource=admin&retryWrites=true&w=majority&appName=gofood"

const mongoDB = async () => {

    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
      
        const categoryData= mongoose.connection.db.collection("sample")
        const data=await categoryData.find({}).toArray()
        global.food_items=data;
        
        const foodCategory= mongoose.connection.db.collection("foodCateory")
        const catData=await foodCategory.find({}).toArray()
        global.food_category=catData;
        
       


        // const sample=require('./models/User')

        // const data = await sample.find({}).exec();
        // console.log("Sample Data from MongoDB:", data);



    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
    }
};
module.exports =mongoDB





//const mongoURI="mongodb+srv://adharshpaila788:Adharsh123@gofood.e7ts6.mongodb.net/gofood?retryWrites=true&w=majority&appName=gofood"
// const mongoDB=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("Connected")
//     })
// }