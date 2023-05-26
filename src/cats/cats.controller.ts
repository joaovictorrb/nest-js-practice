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
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats') // <- Prefix http://localhost:3000/cats-example
export class CatsController {
    // Provider injected
    constructor(@Optional() private readonly catsService: CatsService) {}

    //constructor(@Optional() private readonly catsService: CatsService) {}

    @Post()
    /**
     * Body receives createCatBody
     * createCatBody must be of type CreateCatsExampleDto
     * and it must obey it's properties
     */
    async create(@Body() createCatBody: CreateCatsDto) {
        return this.catsService.create(createCatBody);
    }

    @Get() //By using @Req, I am using Library-Specific == express
    async findAll(@Req() request: Request): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id') // <- Prefix http://localhost:3000/cats-example:id
    async findOne(@Param('id') id: string) {
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
