const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

//first drill
app.get('/sum', (req, res) => {
  const a = +req.query.a;
  const b = +req.query.b;

  if (isNaN(a) || isNaN(b)) {
    res.send('both paramenters must be numbers');
  } else {
    const response = `The sum of ${a} and ${b} is ${a + b}`;
    res.send(response);
  }
});

//2nd Drill
app.get('/cipher', (req, res) => {
  let text = req.query.text.toUpperCase().split('');
  const shift = +req.query.shift;
  text = text.map(char => {
    let code = char.charCodeAt(0);
    if (code <= 90 && code >= 65) {
      code += shift;
      if (code > 90) {
        code -= 26;
      }
    }
    return String.fromCharCode(code);
  });
  text = text.join('');
  res.send(text);
});

//3rd drill
app.get('/lotto', (req, res) => {
  if (req.query.numbers && req.query.numbers.length > 1) {
    let numbers = req.query.numbers.map(num => +num);
    let winners = [];
    for (let i = 0; i < 6; i++) {
      winners.push(Math.floor(Math.random() * 20) + 1);
    }
    if (numbers.length > 6) {
      numbers = numbers.slice(0, 6); //limit to 6 entries
    }
    let matchCount = numbers.reduce((acc, cur) => {
      if (winners.includes(cur)) {
        acc++;
      }
      return acc;
    }, 0);

    switch (matchCount) {
      case 6:
        res.send('Wow! Unbelievable! You could have won the mega millions!');
        break;
      case 5:
        res.send('Congratulations! You win $100!');
        break;
      case 4:
        res.send('Congratulations, you win a free ticket');
        break;
      default:
        res.send('Sorry, you lose');
    }
  } else {
    res.send('Please supply six numbers in the query string');
  }
});
