import { ApiClient, HelixEventSubSubscription, HelixPaginatedResultWithTotal } from 'twitch';
import { AccessToken, AuthProvider, ClientCredentialsAuthProvider, RefreshableAuthProvider, StaticAuthProvider } from 'twitch-auth';
import config from '../config';

const clientId = config.get('twitch__clientid');
const clientSecret = config.get('twitch__clientsecret');
const defaultAuthProvider: AuthProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);

export default class TwitchIntegration {
    private apiClient: ApiClient;

    constructor(accessToken?: string) {
        let authProvider = defaultAuthProvider;

        if (accessToken) {
            const refreshToken = "todo";

            authProvider = new RefreshableAuthProvider(
                new StaticAuthProvider(clientId, accessToken),
                {
                    clientSecret,
                    refreshToken,
                    onRefresh: (token: AccessToken) => {
                        // do things with the new token data, e.g. save them in your database
                    }
                }
            );
        }

        this.apiClient = new ApiClient({ authProvider });
    }

    getSubscriptions(): Promise<HelixPaginatedResultWithTotal<HelixEventSubSubscription>> {
        return this.apiClient.helix.eventSub.getSubscriptions();
    }
};