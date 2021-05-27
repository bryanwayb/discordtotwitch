const tempConfig: any = {

    'twitchbot__username': 'ttv_chat_bot',
    'twitch__clientid': 'b4ij2zgtttpgg686l1i1bb7wr0u2i2',
    'mongodb__url': 'mongodb://root:development@localhost:27017'
};

class Config {
    public get(name: string): string {
        return tempConfig[name];
    }
}

export default new Config();