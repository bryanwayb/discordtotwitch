const tempConfig: any = {
    'discord__bottoken': 'NjY0ODgxODg2NDU5MzMwNTYy.Xhdhgg.EVNxY-vSoDEwtq0i01Ugblr4dEI'
};

class Config {
    public get(name: string): string {
        return tempConfig[name];
    }
}

export default new Config();