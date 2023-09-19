import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ApiKeyGuard implements CanActivate {
    private readonly secret;
    constructor();
    canActivate(context: ExecutionContext): boolean;
}
