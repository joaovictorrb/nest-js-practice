import { Test, TestingModule } from '@nestjs/testing';
import { CatsExampleController } from './cats.controller';
import { CatsExampleService } from './cats.service';

describe('CatsExampleController', () => {
    let controller: CatsExampleController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CatsExampleController],
            providers: [CatsExampleService],
        }).compile();

        controller = module.get<CatsExampleController>(CatsExampleController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});