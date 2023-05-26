import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    // By using create<NestExpressApplication> I set it to use express platform
    // https://expressjs.com/
    // I also can use NestFastifyApplication
    // However, this step is not needed, unless you actually want to access the underlying platform API.
    const app = await NestFactory.create(AppModule);

    // global middleware
    // app.use(logger)

    // global filter
    //app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(3000);
}
bootstrap();
