export interface NotificationCondition {
    broadcaster_user_id: string;
}

export interface NotificationTransport {
    method: string;
    callback: string;
}

export interface NotificationSubscription {
    id: string;
    status: string;
    type: string;
    version: string;
    cost: number;
    condition: NotificationCondition;
    transport: Transport;
    created_at: Date;
}

export interface NotificationEvent {
    user_id: string;
    user_login: string;
    user_name: string;
    broadcaster_user_id: string;
    broadcaster_user_login: string;
    broadcaster_user_name: string;
}

export interface Notification {
    subscription: NotificationSubscription;
    event: Event;
}

export interface SubscriptionList {
    data: NotificationSubscription[];
    total: number;
    total_cost: number;
    max_total_cost: number;
}