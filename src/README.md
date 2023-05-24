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
