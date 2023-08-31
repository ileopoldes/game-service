import { Test, TestingModule } from '@nestjs/testing';
import { ApplyDiscountConsumerService } from './apply-discount.consumer';
import { GameService } from '../game.service';

describe('ApplyDiscountConsumerService', () => {
  let service: ApplyDiscountConsumerService;
  const applyDiscountMock = jest.fn();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplyDiscountConsumerService,
        {
          provide: GameService,
          useValue: {
            applyDiscount: applyDiscountMock,
          },
        },
      ],
    }).compile();

    service = module.get<ApplyDiscountConsumerService>(
      ApplyDiscountConsumerService,
    );
  });

  beforeEach(() => applyDiscountMock.mockReset());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('applyDicount', () => {
    it('should call game service method', async () => {
      const job = { data: { totalMonth: 18, discount: 20 } };
      await service.applyDicount(job as any);
      expect(applyDiscountMock).toBeCalledWith(
        job.data.discount,
        job.data.totalMonth,
      );
    });
  });
});
