import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsExampleModule } from './cats_example/cats.module';

@Module({
    imports: [CatsExampleModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
