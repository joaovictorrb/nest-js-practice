import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
    imports: [CatsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    async configure(consumer: MiddlewareConsumer) {
        // applies middleware only for route cats
        consumer.apply(LoggerMiddleware).forRoutes('cats');
        /**
            // path can include wildcards ab*cd
            configure(consumer: MiddlewareConsumer) {
                consumer.apply(LoggerMiddleware)
                    .forRoutes({ path: 'cats', method: RequestMethod.GET });
            }

            // exclude can, well, exclude specified routes from middleware
            configure(consumer: MiddlewareConsumer) {
                consumer
                    .apply(LoggerMiddleware)
                    .exclude ({ path: 'cats', method: RequestMethod.POST})
                    .forRoutes(CatsController);  
            }

            // To apply multiple middlewares:
            consumer.apply(cors(), helmet(), etc(), LoggerMiddleware).forRoutes('cats');
            
        */
    }
}
