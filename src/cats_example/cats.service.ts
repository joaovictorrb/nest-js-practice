import { Injectable } from '@nestjs/common';
import { CreateCatsExampleDto } from './dto/create-cats.dto';
import { UpdateCatsExampleDto } from './dto/update-cats.dto';

/*
All services can be/are providers
The main idea of a provider is that it can be injected as a dependency

Injectable - Decorator attaches metadata, which declares that CatsService is a class that can be managed by the Nest IoC container.
*/
@Injectable()
export class CatsService {
    async create(createCatBody: CreateCatsExampleDto) {
        return 'This action adds a new catsExample';
    }

    async findAll() {
        return null;
    }

    async findOne(id: number) {
        return `This action returns a #${id} catsExample`;
    }

    async update(id: number, updateCatsExampleDto: UpdateCatsExampleDto) {
        return `This action updates a #${id} catsExample`;
    }

    async remove(id: number) {
        return `This action removes a #${id} catsExample`;
    }
}
