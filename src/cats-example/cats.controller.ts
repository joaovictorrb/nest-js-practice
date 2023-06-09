import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    Optional,
    UseFilters,
    ParseIntPipe,
    UseGuards,
    SetMetadata,
    UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';
import { Cat } from './interfaces/cat.interface';
import { CustomForbiddenException } from 'src/common-examples/exceptions/custom.exception';
import { HttpExceptionFilter } from 'src/common-examples/exceptions/filter/http-exception.filter';
import { RolesGuard } from 'src/guard-example/roles.guard';
import { Roles } from 'src/decorators-example/roles.decorator';
import { LoggingInterceptor } from 'src/interceptor-example/loggin.interceptor';

@Controller('cats') // <- Prefix http://localhost:3000/cats-example
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
    // Provider injected
    //constructor(@Optional() private readonly catsService: CatsService) {}
    constructor(@Optional() private readonly catsService: CatsService) {}

    /**
     * Body receives createCatBody
     * createCatBody must be of type CreateCatsExampleDto
     * and it must obey it's properties
     */
    @Post('new')
    @UseFilters(new HttpExceptionFilter()) // bind filter to request
    // @Roles('admin') //@SetMetadata('roles', ['admin'])
    async create(@Body() createCatBody: CreateCatsDto) {
        console.log('new cat created');
        // throw new CustomForbiddenException();
        // return this.catsService.create(createCatBody);
    }

    @Get() //By using @Req, I am using Library-Specific == express
    async findAll(@Req() request: Request): Promise<Cat[]> {
        try {
            return this.catsService.findAll();
        } catch (error) {
            /*
                Throwing standard exceptions
                HttpException
                    - Param1: String or Objects
                    - Param2: status, defined by HttpStatus.Code
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            */
            /*
                Here's an example overriding the entire response body and providing an error cause:
                throw new HttpException(
                    {
                        status: HttpStatus.FORBIDDEN,
                        error: 'This is a custom message',
                    },
                    HttpStatus.FORBIDDEN,
                    {
                        cause: error,
                    },
                );
            */
            throw new CustomForbiddenException();
        }
    }

    @Get(':id') // <- Prefix http://localhost:3000/cats/:id
    async findOne(@Param('id', ParseIntPipe) id: string) {
        return this.catsService.findOne(+id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCatsDto: UpdateCatsDto,
    ) {
        return this.catsService.update(+id, updateCatsDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.catsService.remove(+id);
    }
}
