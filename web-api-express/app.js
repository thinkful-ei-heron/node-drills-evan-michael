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

app.get('/sum', (req, res) => {
  const a = +req.query.a;
  const b = +req.query.b;

  if(isNaN(a) || isNaN(b)) {
    res.send ('both paramenters must be numbers');
  } else {
    const response =  `The sum of ${a} and ${b} is ${a+b}`;
    res.send (response);
  }

});