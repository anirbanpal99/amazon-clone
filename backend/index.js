const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51J04IZSBoIMJkwMVkWfbkOmXSRTIQIhXz1gT9BdUqRKEDgssWoEPFNBGb5kZwNPz2nR7x7CVh2qwGKzGrJbYrF3g00XcrbP9F9');

// - API

// - App config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get('/', (req, res) => res.status(200).send('App is working!'));
app.post('/payments/create', async (req, res) => {
    const total = req.query.total;
    console.log('Payment Request Recieeved for amount  >>> ', total);

    if (total > 0 && total !== undefined) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "inr",
            description: "A Sample Payment"
        });
        return res.status(201).send({
            clientSecret: paymentIntent.client_secret,
        })
    }
    return res.status(200).send({})
});

// - Listen command
app.listen(8080, () => console.log("App is running on port 8080"));