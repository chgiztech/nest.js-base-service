import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getData() {
    return {
      message: 'Hello Server!',
    };
  }
}
