import { PartialType } from '@nestjs/mapped-types';
import { CreateCatsExampleDto } from './create-cats.dto';

export class UpdateCatsExampleDto extends PartialType(CreateCatsExampleDto) {}
