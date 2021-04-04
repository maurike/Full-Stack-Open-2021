interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface CalculateExercises {
    target: number
    exercises: number[]
}

const parseArgs = (args: Array<string>): CalculateExercises => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const ex = [];

    for (let i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers!');
        }

        ex.push(Number(args[i]));
    }

    ex.shift();

    return {
        target: Number(args[2]),
        exercises: ex
    };
};

export const calculateExercises = (target: number, exercises: number[]): Result => {
    const tDays = exercises.filter(d => d != 0);
    const tSum = exercises.reduce((a, b) => a + b, 0);
    const tAverage = tSum / exercises.length;

    let tRating = 0;
    let tRatingDesc = '';
    let tSuccess = false;

    if (tAverage >= target * 1.5) {
        tRating = 3;
        tRatingDesc = 'Goal exceeded, excellent!';
        tSuccess = true;
    } else if (tAverage >= target) {
        tRating = 2;
        tRatingDesc = 'Goal met, good!';
        tSuccess = true;
    } else {
        tRating = 1;
        tRatingDesc = 'Goal not met, could do better!';
    }

    const exercisesResult:Result = {
        periodLength: exercises.length,
        trainingDays: tDays.length,
        success: tSuccess,
        rating: tRating,
        ratingDescription: tRatingDesc,
        target: target,
        average: tAverage
    };

    console.log(exercisesResult);
    return exercisesResult;
};

try {
    const { target, exercises } = parseArgs(process.argv);
    calculateExercises(target, exercises);
} catch (e) {
    console.log('Something went wrong, error message:', e);
}
