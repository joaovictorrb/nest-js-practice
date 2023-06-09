import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common-examples/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats-example/cats.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './guard-example/roles.guard';
import { LoggingInterceptor } from './interceptor-example/loggin.interceptor';

/*
    cannot inject dependencies since this is done outside the context of any module. In order to solve this issue, you can set up a guard directly from any module using the following construction:
*/
@Module({
    imports: [CatsModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
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
