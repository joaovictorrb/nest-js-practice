# Curiosities

## Route wildcards

Pattern based routes are supported as well. For instance, the asterisk is used as a wildcard, and will match any combination of characters.

```ts
  @Get('ab*cd')
  findAll() {
    return 'This route uses a wildcard';
  }
```

The 'ab\*cd' route path will match abcd, ab_cd, abecd, and so on. The characters ?, +, \*, and () may be used in a route path, and are subsets of their regular expression counterparts. The hyphen ( -) and the dot (.) are interpreted literally by string-based paths.

## Status Code

Status code is always 200 by default, except for POST requests which are 201.

However, We can change it by using @HttpCode(desiredStatusCode)

## Sub-Domain Routing

The @Controller decorator can take a host option to require that the HTTP host of the incoming requests matches some specific value.

```ts
@Controller({ host: 'admin.example.com' })
export class AdminController {
    @Get()
    index(): string {
        return 'Admin page';
    }
}
```

WARNING
Since Fastify lacks support for nested routers, when using sub-domain routing, the (default) Express adapter should be used instead.
Similar to a route path, the hosts option can use tokens to capture the dynamic value at that position in the host name. The host parameter token in the @Controller() decorator example below demonstrates this usage. Host parameters declared in this way can be accessed using the @HostParam() decorator, which should be added to the method signature.

```ts
@Controller({ host: ':account.example.com' })
export class AccountController {
    @Get()
    getInfo(@HostParam('account') account: string) {
        return account;
    }
}
```

## What is Promise?

Promise is just an object that represents a task. It might finish right now or in a little while.

## Request payloads#

Our previous example of the POST route handler didn't accept any client params. Let's fix this by adding the @Body() decorator here.

But first (if you use TypeScript), we need to determine the DTO (Data Transfer Object) schema.

-   A DTO is an object that defines how the data will be sent over the network.

We could determine the DTO schema by using TypeScript interfaces, or by simple classes. Interestingly, we recommend using classes here. Why? Classes are part of the JavaScript ES6 standard, and therefore they are preserved as real entities in the compiled JavaScript. On the other hand, since TypeScript interfaces are removed during the transpilation, Nest can't refer to them at runtime. This is important because features such as Pipes enable additional possibilities when they have access to the metatype of the variable at runtime.

## Learn SOLID principles

https://en.wikipedia.org/wiki/SOLID (docs recommended this url)

## Property-based injection#

The technique we've used so far is called constructor-based injection, as providers are injected via the constructor method. In some very specific cases, property-based injection might be useful. For instance, if your top-level class depends on either one or multiple providers, passing them all the way up by calling super() in sub-classes from the constructor can be very tedious. In order to avoid this, you can use the @Inject() decorator at the property level.

## The @Global() decorator

Makes the module global-scoped. Global modules should be registered only once, generally by the root or core module.

## Dynamic Modules

Note that the properties returned by the dynamic module extend (rather than override) the base module metadata defined in the @Module() decorator. That's how both the statically declared Connection provider and the dynamically generated repository providers are exported from the module.

If you want to register a dynamic module in the global scope, set the global property to true.

```ts
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
    providers: [Connection],
})
export class DatabaseModule {
    static forRoot(entities = [], options?): DynamicModule {
        const providers = createDatabaseProviders(options, entities);
        return {
            module: DatabaseModule,
            providers: providers,
            exports: providers,
        };
    }
}

// The DatabaseModule can be imported and configured in the following manner:

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
    imports: [DatabaseModule.forRoot([User])],
})
export class AppModule {}
```

## Middleware

Middleware functions can perform the following tasks:

-   execute any code.
-   make changes to the request and the response objects.
-   end the request-response cycle.
-   call the next middleware function in the stack.
-   if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

### Applying middleware#

There is no place for middleware in the @Module() decorator. Instead, we set them up using the configure() method of the module class. Modules that include middleware have to implement the NestModule interface. Let's set up the LoggerMiddleware at the AppModule level.

### Middleware consumer

The MiddlewareConsumer is a helper class. It provides several built-in methods to manage middleware.
The forRoutes() method can take a single string, multiple strings, a RouteInfo object, a controller class and even multiple controller classes.

## Pipes have two typical use cases:

transformation: transform input data to the desired form (e.g., from string to integer)
validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception

Pipes run inside the exceptions zone. This means that when a Pipe throws an exception it is handled by the exceptions layer

Nest comes with nine pipes available out-of-the-box:

-   ValidationPipe
-   ParseIntPipe
-   ParseFloatPipe
-   ParseBoolPipe
-   ParseArrayPipe
-   ParseUUIDPipe
-   ParseEnumPipe
-   DefaultValuePipe
-   ParseFilePipe

ParseIntPipe. This is an example of the transformation use case, where the pipe ensures that a method handler parameter is converted to a JavaScript integer

## Guards

Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions present at run-time.
This is often referred to as authorization.

-   Guards are executed after all middleware, but before any interceptor or pipe.

## Interceptors

Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented Programming (AOP) technique. They make it possible to:

-   bind extra logic before / after method execution
-   transform the result returned from a function
-   transform the exception thrown from a function
-   extend the basic function behavior
-   completely override a function depending on specific conditions (e.g., for caching purposes)

Consider, for example, an incoming POST /cats request. This request is destined for the create() handler defined inside the CatsController. If an interceptor which does not call the handle() method is called anywhere along the way, the create() method won't be executed. Once handle() is called (and its Observable has been returned), the create() handler will be triggered. And once the response stream is received via the Observable, additional operations can be performed on the stream, and a final result returned to the caller.

## Decorators

Decorator is an expression which returns a function and can take a target, name and property descriptor as arguments.
