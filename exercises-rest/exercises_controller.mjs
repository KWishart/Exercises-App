import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';
import { ExpressValidator } from 'express-validator';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

//Validate date
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
};



//Create a new exercise
app.post('/exercises', (req, res) => {
    if (isDateValid(req.body.date)) {
        exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Request failed'});
        });
    } else {
        console.error(error);
            res.status(400).json({Error: 'Request failed'});
    }
    
});

//Retrieve exercise based on ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if (exercise != null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({Error: 'Not Found'});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Request failed'});
        });
});

//Retrieve all exercises
app.get('/exercises', (req, res) => {
    exercises.findExercise(req.query)
        .then(exercises => {
            res.status(200).json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Request failed'});
        })
});


//Update an exercise by ID
app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date});
            }
            else {
                res.status(404).json({Error: 'Not Found'});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Invalid request'});
        });
});


//Delete an exercise
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({Error: 'Not found'});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Request failed'});
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});