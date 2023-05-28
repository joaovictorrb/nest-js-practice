import { SetMetadata } from '@nestjs/common';

/*
With the construction above, we attached the roles metadata (roles is a key, while ['admin'] is a particular value) to the create() method. While this works, it's not good practice to use @SetMetadata() directly in your routes. Instead, create your own decorators
*/

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
