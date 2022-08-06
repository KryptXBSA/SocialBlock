/** @format */

import * as anchor from "@project-serum/anchor";

export type AccountData = {
    author: anchor.web3.PublicKey;
    timestamp: anchor.BN;
    block: string;
    content: string;
    username: string;
    likes: anchor.web3.PublicKey[];
    comments: Number;
};
export class Message {
    publicKey: anchor.web3.PublicKey;
    author: anchor.web3.PublicKey;
    timestamp: string;
    block: string;
    content: string;
    username: string;
    likes: anchor.web3.PublicKey[];
    comments: Number;

    constructor(publicKey: anchor.web3.PublicKey, accountData: AccountData) {
        this.publicKey = publicKey;
        this.author = accountData.author;
        this.timestamp = accountData.timestamp.toString();
        this.block = accountData.block;
        this.content = accountData.content;
        this.username = accountData.username;
        this.likes = accountData.likes;
        this.comments = accountData.comments;
    }

    get key() {
        return this.publicKey.toBase58();
    }

    get authorDisplay() {
        const author = this.author.toBase58();
        return author;
    }

    get createdAt() {
        const date = getDate(this.timestamp);
        return date.toLocaleDateString();
    }

    get getUsername() {
        return this.username ? this.username : 'noUsername';
    }
    get getLikesCount() {
        return this.likes.length;
    }
    get getLikes() {
        return this.likes;
    }
    get getComments() {
        return this.comments;
    }
    get getShares() {
        return 0;
    }
    get createdAgo() {
        const date = getDate(this.timestamp);
        return timeSince(date);
    }
    get getTimestamp() {
        const date = getDate(this.timestamp);
        return date;
    }
}

// convert unix timestamp to js date object
const getDate = (timestamp: string) => {
    const utxDate = parseInt(timestamp);
    const date = new Date(utxDate * 1000);
    return date;
};

function timeSince(date: any) {
    var seconds = Math.floor(((new Date() as any) - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
var aDay = 24 * 60 * 60 * 1000;
