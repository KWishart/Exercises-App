import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

// define the schema
const exerciseSchema =mongoose.Schema({
    name: { type: String, required: true},
    reps: { type: Number, required: true},
    weight: { type: Number, required: true},
    unit: { type: String, required: true},
    date: { type: String, required: true}
});

// creates a class
const Exercise = mongoose.model("Exercise", exerciseSchema);


// creates an exercise
// parameters = name, reps, weight, unit, date
// returns a promise
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
};

// finds an exercise
// parameters = id
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
};

const findExercise = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
};

const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
    return result.modifiedCount;
};

const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
};

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export { createExercise, findExerciseById, findExercise, replaceExercise, deleteById };