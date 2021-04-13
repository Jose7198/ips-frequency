import { IPsHashTable } from './IPsHashTable'
import { TopIPsLinkedList } from './topIPsLinkedList/TopIPsLinkedList';

let ipTable: IPsHashTable = {}
const topIpsLinkedList = new TopIPsLinkedList();

export const request_handled = (ip: string) => {
    if(ipTable[ip]){
        ipTable[ip].count += 1;
    }else{
        ipTable[ip] = { count: 1, isTopVisitor: false };
    }
    checkOperationOnLinkedList(ip);
}

const checkOperationOnLinkedList = (ip) => {
    const ipData = ipTable[ip];
    const {count, isTopVisitor} = ipData
    if (isTopVisitor) {
        topIpsLinkedList.replaceNFrequency(ip, count);
    } else {
        if (topIpsLinkedList.size < 100) {
            topIpsLinkedList.insertOnLinkedList(ip, count);
            ipTable[ip].isTopVisitor = true;
        } else {
            ipTable[ip].isTopVisitor = topIpsLinkedList.replaceSmallestFrequency(ip, count);
        }
    }
}

export const top100 = () => {
    return topIpsLinkedList.traverse();
}

export const clear = () => {
    ipTable = {};
    topIpsLinkedList.clear();
}