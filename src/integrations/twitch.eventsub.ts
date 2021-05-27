import { httpGetJSON } from '../helpers/httpRequest';
import { URL } from 'url';
import { SubscriptionList } from '../models/twitch.eventsub';
import config from '../config';

export function getSubscriptions(): Promise<SubscriptionList> {
    return httpGetJSON<SubscriptionList>(new URL('subscriptions', config.get('twitcheventsub__baseurl')));
}