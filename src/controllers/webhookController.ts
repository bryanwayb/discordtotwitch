import express from 'express';
import { Notification } from '../models/twitch.eventsub'

const router = express.Router();

router.post('/twitch/notification', (request, response) => {
    const notificationData: Notification = request.body;
    response.send(notificationData);
});

export default router;