const tempConfig: any = {
};

class Config {
    public get(name: string): string {
        return tempConfig[name];
    }
}

export default new Config();