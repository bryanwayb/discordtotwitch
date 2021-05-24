"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DiscordService_1 = __importDefault(require("./services/DiscordService"));
//const argv = require('yargs')
//    .env('D2T')
//    .options({
//        'verbose': {
//            alias: 'v',
//            type: 'boolean',
//            description: 'Enable verbose logging',
//            demandOption: false
//        },
//        'twitch-login': {
//            type: 'string',
//            description: 'Twitch user that will be used to send messages from',
//            demandOption: true
//        },
//        'twitch-auth': {
//            type: 'string',
//            description: 'Twitch authentication token to login as the given user',
//            demandOption: true
//        },
//        'twitch-channel': {
//            type: 'string',
//            description: 'Twitch channel to connect to for sending/receiving of messages',
//            demandOption: true
//        },
//        'discord-channel-id': {
//            type: 'string',
//            description: 'Discord text channel ID to monitor for messages',
//            demandOption: true
//        },
//        'discord-webhook-id': {
//            type: 'string',
//            description: 'Discord authentication channel Webhook ID to for sending messages',
//            demandOption: true
//        },
//        'discord-webhook-token': {
//            type: 'string',
//            description: 'Discord Webhook token associated to the provided Webhook ID',
//            demandOption: true
//        },
//        'discord-bot-token': {
//            type: 'string',
//            description: 'Discord bot authentication token',
//            demandOption: true
//        }
//    })
//    .argv;
//const twitchLogin = argv['twitch-login'];
//const twitchAuthentication = argv['twitch-auth'];
//const twitchChannel = argv['twitch-channel'];
//const discordChannelId = argv['discord-channel-id'];
//const discordWebhookId = argv['discord-webhook-id'];
//const discordWebhookToken = argv['discord-webhook-token'];
//const discordBotToken = argv['discord-bot-token'];
//const verbose = argv.v || argv.verbose;
//function log(...args) {
//    if(verbose) {
//        console.log.apply(console, args);
//    }
//}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var discordService;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    discordService = new DiscordService_1.default('846509015517233194');
                    return [4 /*yield*/, discordService.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, discordService.sendMessage({
                            username: 'testing username',
                            message: 'testing message'
                        })];
                case 2:
                    _a.sent();
                    discordService.onMessage(function (options) {
                        console.log(options.message);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main();
