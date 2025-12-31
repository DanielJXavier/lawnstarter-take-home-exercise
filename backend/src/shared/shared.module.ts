import { Module, Global } from '@nestjs/common';
import { SwapiService } from './swapi.service';

@Global()
@Module({
  providers: [SwapiService],
  exports: [SwapiService],
})
export class SharedModule {}
