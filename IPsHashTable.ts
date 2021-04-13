import { StoredIP } from './StoredIP';

export interface IPsHashTable {
    [ip: string]: StoredIP;
}