import mongoose from "mongoose";

const playerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    email: String,
    clientId: String,
    stats : { 
        type: Object(),
        default: [], 
        require: false 
    },
    singleStats : {
        type: Object(),
        default: [],
        require: false
    }
});

export default mongoose.model('Player', playerSchema);