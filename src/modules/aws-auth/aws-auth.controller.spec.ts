import { Test, TestingModule } from '@nestjs/testing';
import { AwsAuthController } from './aws-auth.controller';

describe('AwsAuthController', () => {
  let controller: AwsAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsAuthController],
    }).compile();

    controller = module.get<AwsAuthController>(AwsAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
