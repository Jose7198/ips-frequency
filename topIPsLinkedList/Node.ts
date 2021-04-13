export class Node {
    public ip: string;
    public count: number = 0;
    public next: Node | null = null;
    public prev: Node | null = null;

    constructor(ip: string, count: number) {
        this.ip = ip;
        this.count = count;
        this.next = null;
        this.prev = null;
    }
}