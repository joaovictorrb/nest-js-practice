import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return data ? user?.[data] : user;
    },
);

/**
    @Get()
    async findOne(@User('firstName') firstName: string) {
        console.log(`Hello ${firstName}`);
    }

    @Get()
    // validateCustomDecorators option must be set to true. ValidationPipe does not 
    // validate arguments annotated with the custom decorators by default.
    async findOne(
        @User(new ValidationPipe({ validateCustomDecorators: true }))
        user: UserEntity,
    ) {
        console.log(user);
    }
*/
