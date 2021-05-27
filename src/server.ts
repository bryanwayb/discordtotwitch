import express from 'express';
import WebhookController from './controllers/webhookController';

const app = express();

app.use(express.json());
app.use('/webhook', WebhookController);

export default function listen() {
    app.listen(3000);
};