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
exports.ApiKeyGuard = void 0;
const common_1 = require("@hub2/common");
const common_2 = require("@nestjs/common");
let ApiKeyGuard = class ApiKeyGuard {
    constructor() {
        var _a, _b;
        this.secret = (_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.SERVICE_SECRET) !== null && _b !== void 0 ? _b : '';
        if (!this.secret) {
            throw new common_1.MissingEnvError('SERVICE_SECRET');
        }
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];
        if (!apiKey || apiKey !== this.secret) {
            throw new common_2.HttpException('Unauthorized', common_2.HttpStatus.UNAUTHORIZED);
        }
        return true;
    }
};
ApiKeyGuard = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [])
], ApiKeyGuard);
exports.ApiKeyGuard = ApiKeyGuard;
//# sourceMappingURL=api-key.guard.js.map