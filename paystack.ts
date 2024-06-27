import express from 'express';
import { json } from 'body-parser';
import { verify }from './auth';

const app = express();

app.use(json());


app.post('/paystack/webhook', (req, res) => {
    const eventData = req.body;
    const signature = req.headers['x-paystack-signature'];
  
    if (!verify(eventData, signature)) {
      return res.sendStatus(400);
    }
  
    if (eventData.event === 'charge.success') {
      const transactionId = eventData.data.id;

      console.log(`Transaction ${transactionId} was successful`);
    }
  
    //return res.sendStatus(200);
    return eventData.data;
  });