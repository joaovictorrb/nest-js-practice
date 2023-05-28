// will modify each response in a trivial way to demonstrate the process.
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        return next.handle().pipe(map((data) => ({ data })));
    }
}

/*
expected output, assuming that route handler returns an empty array

Output:
{
    "data": []
}
*/
