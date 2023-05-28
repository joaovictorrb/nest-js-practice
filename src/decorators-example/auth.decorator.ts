import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/guard-example/auth.guard';
import { RolesGuard } from 'src/guard-example/roles.guard';

export function Auth(...roles) {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AuthGuard, RolesGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}
function ApiBearerAuth(): ClassDecorator | MethodDecorator | PropertyDecorator {
    throw new Error('Function not implemented.');
}

function ApiUnauthorizedResponse(arg0: {
    description: string;
}): ClassDecorator | MethodDecorator | PropertyDecorator {
    throw new Error('Function not implemented.');
}

/*
@Get('users')
@Auth('admin')
findAllUsers() {}
*/
