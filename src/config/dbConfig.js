import mongoose from "mongoose";

mongoose.connect(
    "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.wqzxbwl.mongodb.net/dashboard",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect : ' + err));
