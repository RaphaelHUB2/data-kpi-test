import { MissingEnvError } from '@hub2/common';
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';


@Injectable()
export class ApiKeyGuard implements CanActivate {

  private readonly secret: string;

  constructor(){
    this.secret = process.env?.SERVICE_SECRET ?? '';

    if (!this.secret) {
      throw new MissingEnvError('SERVICE_SECRET');
    }
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || apiKey !== this.secret) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
