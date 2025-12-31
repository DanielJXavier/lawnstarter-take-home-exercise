import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): string {
    return "Hey! I'm the backend!";
  }
}
