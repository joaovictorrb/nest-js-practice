import { Test, TestingModule } from '@nestjs/testing';
import { CatsExampleService } from './cats.service';

describe('CatsExampleService', () => {
    let service: CatsExampleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CatsExampleService],
        }).compile();

        service = module.get<CatsExampleService>(CatsExampleService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
