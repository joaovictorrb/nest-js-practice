import { Module } from '@nestjs/common';
import { CatsExampleService } from './cats.service';
import { CatsExampleController } from './cats.controller';

@Module({
    controllers: [CatsExampleController],
    providers: [CatsExampleService],
})
export class CatsExampleModule {}
