export abstract class DatabaseService {
  abstract getClient<T = unknown>(): T;
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
}
