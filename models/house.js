const mongoose= require('mongoose');
const Review=require('./review');
const Schema =mongoose.Schema;

const HouseSchema= new Schema({
    title:String,
    image:String,
    price:Number,
    description:String,
    location:String,
    // reviews array will store id's of reviews
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});


// this middlewhere is called when we are trying to delete House 
HouseSchema.post('findOneAndDelete',async function (doc) {
    // if it is deleted then we will remove all reviews it have
    if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

module.exports=mongoose.model('House',HouseSchema);