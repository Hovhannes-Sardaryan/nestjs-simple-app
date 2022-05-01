import { Test, TestingModule } from '@nestjs/testing';
import { AwsAuthService } from './aws-auth.service';

describe('AwsAuthService', () => {
  let service: AwsAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsAuthService],
    }).compile();

    service = module.get<AwsAuthService>(AwsAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
