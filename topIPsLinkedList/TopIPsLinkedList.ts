import { StoredIP } from '../StoredIP';
import { Node } from './Node';

export class TopIPsLinkedList {
    public root: Node | null = null;
    public size: number = 0;

    construtor() {
        this.initialize();
    }

    initialize() {
        this.root= null;
        this.size = 0;
    }

    insertOnLinkedList(ip: string, count: number): Node {
        const newNode = new Node(ip, count);
        this.size += 1;
        if(this.root === null){
            this.root = newNode;
            return newNode;
        }
        let currentNode = this.root;
        while(currentNode.count > count){
            currentNode = currentNode.next;
        }
        currentNode.prev.next = newNode;
        newNode.prev = currentNode.prev;
        currentNode.prev = newNode;
        newNode.next = currentNode;
        return newNode;
    }

    replaceSmallestFrequency(ip: string, count: number): boolean {
        if(count <= this.root.count){
            return false;
        }
        const newNode = new Node(ip, count);
        newNode.next = this.root.next;
        this.root = newNode;
        return true;
    }

    replaceNFrequency(ip: string, count: number): boolean {
        const ipNode = this.getIpNode(ip);
        ipNode.count = count;
        if(ipNode.count <= ipNode.next.count){
            return false;
        }
        ipNode.prev.next = ipNode.next;
        ipNode.next.prev = ipNode.prev;
        ipNode.prev = ipNode.next;
        ipNode.next = ipNode.next.next;
        return true;
    }

    getIpNode(ip: string) : Node | null{
        let ipNode = null;
        let currentIp = this.root;
        while(ipNode === null) {
            if(currentIp.ip === ip){
                ipNode = currentIp;
            }
            currentIp = currentIp.next;
        }
        return ipNode;
    }

    traverse(): StoredIP[]{
        const topIPs = [];
        let currentNode = this.root;
        while(currentNode !== null) {
            const { ip, count } = currentNode
            topIPs.unshift({ ip, count });
            currentNode = currentNode.next;
        }
        return topIPs
    }

    clear() {
        this.initialize();
    }
}