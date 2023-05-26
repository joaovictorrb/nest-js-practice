import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
/**
 * @Module() decorator provides
 * metadata that Nest makes use
 * of to organize the
 * application structure.
 */
@Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService], // Now CatsModule can provide CatsService to other modules
})
export class CatsModule {}
