interface CalculateBMI {
    height: number
    weight: number
}

const parseArguments = (args: Array<string>): CalculateBMI => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100 * height / 100);

  if (bmi <= 15) {
      console.log('Very severely underweight');
      return 'Very severely underweight';
  } else if (bmi <= 16) {
      console.log('Severely underweight');
      return 'Severely underweight';
  } else if (bmi <= 18.5) {
      console.log('Underweight');
      return 'Underweight';
  } else if (bmi <= 25) {
      console.log('Normal (healthy weight)');
      return 'Normal (healthy weight)';
  } else if (bmi <= 30) {
      console.log('Overweight');
      return 'Overweight';
  } else if (bmi <= 35) {
      console.log('Obese Class I (Moderately obese)');
      return 'Obese Class I (Moderately obese)';
  } else if (bmi <= 40) {
      console.log('Obese Class II (Severely obese)');
      return 'Obese Class II (Severely obese)';
  } else {
      console.log('Obese Class III (Very severely obese)');
      return 'Obese Class III (Very severely obese)';
  }
};

try {
    const { height, weight } = parseArguments(process.argv);
    calculateBmi(height, weight);
} catch (e) {
    console.log('Something went wrong, error message:', e);
}
