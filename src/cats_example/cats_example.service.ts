import { Injectable } from '@nestjs/common';
import { CreateCatsExampleDto } from './dto/create-cats_example.dto';
import { UpdateCatsExampleDto } from './dto/update-cats_example.dto';

// Services are Providers
// The main idea of a provider is that it can be injected as a dependency
@Injectable()
export class CatsExampleService {
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
