import { PartialType } from '@nestjs/mapped-types';
import { CreateCatsExampleDto } from './create-cats_example.dto';

export class UpdateCatsExampleDto extends PartialType(CreateCatsExampleDto) {}
