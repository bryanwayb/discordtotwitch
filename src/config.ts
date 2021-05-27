const tempConfig: any = {
    'twitcheventsub__baseurl': 'https://api.twitch.tv/helix/eventsub/'
};

class Config {
    public get(name: string): string {
        return tempConfig[name];
    }
}

export default new Config();