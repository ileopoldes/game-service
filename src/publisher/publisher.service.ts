import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
export class PublisherService {
  constructor(private readonly repository: RepositoryService) {}
}
