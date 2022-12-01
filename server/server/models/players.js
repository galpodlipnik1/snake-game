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
        type: Array, 
        default: [], 
        require: false 
    },
});

export default mongoose.model('Player', playerSchema);