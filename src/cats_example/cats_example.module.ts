import { Module } from '@nestjs/common';
import { CatsExampleService } from './cats_example.service';
import { CatsExampleController } from './cats_example.controller';

@Module({
  controllers: [CatsExampleController],
  providers: [CatsExampleService]
})
export class CatsExampleModule {}
