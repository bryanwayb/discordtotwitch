import express from 'express';

const router = express.Router();

router.post('/twitch/notification', (request, response) => {
    const notificationData = request.body;
    response.send(notificationData);
});

export default router;