import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (!req.query.height 
        || !req.query.weight 
        || isNaN(Number(req.query.height)) 
        || isNaN(Number(req.query.weight))) {
            res.json({
                error: 'Malformatted parameters'
            });
    }

    res.json({
        height: req.query.height,
        weight: req.query.weight,
        bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = req.body;

    if (!target || !daily_exercises) {
        res.json({
            error: 'Parameters missing'
        });
    }

    if (Array.isArray(daily_exercises)) {
        daily_exercises.map((d: number) => isNaN(d) ? res.json({ error: 'Malformatted parameters' }) : null);
    } else {
        res.json({
            error: 'Incorrect parameters'
        });
    }
    
    const result = calculateExercises(target, daily_exercises);
    res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
