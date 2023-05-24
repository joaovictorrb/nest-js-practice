import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
} from '@nestjs/common';
import { CatsExampleService } from './cats_example.service';
import { CreateCatsExampleDto } from './dto/create-cats_example.dto';
import { UpdateCatsExampleDto } from './dto/update-cats_example.dto';
import { CatExample } from './interfaces/cat.interface';

@Controller('cats-example') // <- Prefix http://localhost:3000/cats-example
export class CatsExampleController {
    // Provider injected
    constructor(private readonly catsExampleService: CatsExampleService) {}

    @Post()
    /**
     * Body receives createCatBody
     * createCatBody must be of type CreateCatsExampleDto
     * and it must obey it's properties
     */
    async create(@Body() createCatBody: CreateCatsExampleDto) {
        return this.catsExampleService.create(createCatBody);
    }

    @Get() //By using @Req, I am using Library-Specific == express
    async findAll(@Req() request: Request): Promise<CatExample[]> {
        return this.catsExampleService.findAll();
    }

    @Get(':id') // <- Prefix http://localhost:3000/cats-example:id
    async findOne(@Param('id') id: string) {
        return this.catsExampleService.findOne(+id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCatsExampleDto: UpdateCatsExampleDto,
    ) {
        return this.catsExampleService.update(+id, updateCatsExampleDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.catsExampleService.remove(+id);
    }
}
