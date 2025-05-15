import { Entity } from './aggregate';

export interface IRepository<T extends Entity<any>> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
}

export interface IPaginatedRepository<T extends Entity<any>> extends IRepository<T> {
  findPaginated(page: number, limit: number): Promise<{
    items: T[];
    total: number;
    page: number;
    limit: number;
  }>;
} 