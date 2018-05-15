require('dotenv').load()
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World! 🌈'
  });
});

app.post('/charge', (req, res) => {
  const token = req.body.stripeToken;
  chargeCard({
    amount: req.body.amount * 100,
    currency: "usd",
    description: "Example charge",
    source: token,
  }, req.body.maxPayment)
  .then(transaction => {
    res.send(`
      <h1>Transaction successful</h1>
      <p>Card charged for $${(transaction.amount / 100).toFixed(2)}.
    `)
  })
  .catch(error => {
    res.send(`
      <h1>Transaction failed</h1>
      <p>${error}</p>
    `)
  });
})

const chargeCard = (chargeObject, maxPayment) => {
  return new Promise((resolve, reject) => {
    chargeObject.amount > (maxPayment * 100) || chargeObject.amount < 0
      ? reject(`Payment amount must be between $0 and $${parseInt(maxPayment).toFixed(2)}`)
      : stripe.charges.create(chargeObject, (err, charge) => {
        err ? reject(err) : resolve(charge);
    })
  })
}

app.use((req, res, next) => {
  res.status(404);
  const error = new Error('Not Found. 🔍');
  next(error);
});

app.use((error, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
    error: error.stack
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
