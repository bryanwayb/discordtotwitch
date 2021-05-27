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
var tmi_js_1 = __importDefault(require("tmi.js"));
var logger_1 = require("../logger");
var config_1 = __importDefault(require("../config"));
var log = new logger_1.Logger('TwitchService');
var client = null;
var clientChannels = new Set();
function getClient(channel) {
    return __awaiter(this, void 0, void 0, function () {
        var username, password;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log.info("Getting client with channel " + channel);
                    if (!!clientChannels.has(channel)) return [3 /*break*/, 2];
                    log.info("Channel " + channel + " is not in the current client, will disconnect and recreate");
                    clientChannels.add(channel);
                    return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.disconnect())];
                case 1:
                    _a.sent();
                    client = null;
                    _a.label = 2;
                case 2:
                    if (!!client) return [3 /*break*/, 4];
                    username = config_1.default.get('twitch__username');
                    password = config_1.default.get('twitch__password');
                    log.info("Creating new client with username " + username + " and password " + password);
                    client = new tmi_js_1.default.Client({
                        options: { debug: false },
                        connection: {
                            reconnect: true,
                            secure: true
                        },
                        identity: {
                            username: username,
                            password: password
                        },
                        channels: Array.from(clientChannels)
                    });
                    return [4 /*yield*/, client.connect()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, client];
            }
        });
    });
}
var Twitch = /** @class */ (function () {
    function Twitch(channel) {
        this.channel = channel;
    }
    Twitch.prototype.getClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getClient(this.channel)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Twitch.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Twitch.prototype.onMessage = function (handler) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                log.info("Starting to listen to messages from channel " + this.channel);
                this.getClient().then(function (client) {
                    client.on('message', function (channel, tags, message, self) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!self) return [3 /*break*/, 2];
                                    return [4 /*yield*/, handler({
                                            username: tags['display-name'] ? tags['display-name'] : '',
                                            message: message
                                        })];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                return [2 /*return*/];
            });
        });
    };
    Twitch.prototype.sendMessage = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        log.trace("Sending message to channel " + this.channel);
                        return [4 /*yield*/, client.say(this.channel, "<" + options.username + "> " + options.message)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Twitch;
}());
exports.default = Twitch;
