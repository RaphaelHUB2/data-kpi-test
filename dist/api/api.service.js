"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const common_2 = require("@hub2/common");
let ApiService = class ApiService {
    constructor(http) {
        var _a, _b;
        this.http = http;
        this.apiUrl = (_a = process.env.API_URL) !== null && _a !== void 0 ? _a : '';
        this.apiSecret = (_b = process.env.API_SECRET) !== null && _b !== void 0 ? _b : '';
        if (!this.apiUrl) {
            throw new common_2.MissingEnvError('API_URL');
        }
        if (!this.apiSecret) {
            throw new common_2.MissingEnvError('API_SECRET');
        }
    }
    async get(path) {
        try {
            const config = {
                headers: {
                    Authorization: this.apiSecret
                }
            };
            const res = await (0, rxjs_1.lastValueFrom)(this.http.get(`${this.apiUrl}${path}`, config));
            return res.data;
        }
        catch (e) {
            throw new Error();
        }
    }
};
ApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map