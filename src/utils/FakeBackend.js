const user1Brief = {
    "username" : "0x91dF6A",
    "avatar" : "https://www.w3schools.com/css/img_lights.jpg",
    "isMe" : true,
    "address": "0x91dF6A7B8cF1507dbda938d135C0C7b956082689",
};
const user2Brief = {
    "username" : "0xE64F63",
    "avatar" : "https://www.w3schools.com/css/img_5terre.jpg",
    "address": "0xE64F63580D4941084D8F8c285a03B9292003BEEA",
};
const user3Brief = {
    "username" : "0xE29d95",
    "avatar" : "https://www.w3schools.com/css/img_forest.jpg",
    "address": "0xE29d95dE60F7378740844e22dEDb5939Ecb791DB",
};

const post1 = {
    "user" : user1Brief.address,
    "isMine" : true,
    "createdAt" : "2021-8-8 00:00:00",
    "title": "NFT Post 1",
    "address" : "0x0F595AD6C6297fbeE67EF1348d44a777dD15cE24",
    "ipfsHash" : "111111",
    "file": "https://www.w3schools.com/images/picture.jpg", // should just be on ipfs
    "price" : 1.1,
    "bidHistory": [{
        "TxID": "1",
        "amount": "1.1",
        "user": user2Brief.address,
    }],
    "status": "on loan", //on loan, bidding, completed
    "startDate": "2021-8-8 00:00:00",
    "endDate": "2022-8-8 00:00:00",
    "borrower": user2Brief.address,
};

const post2 = {
    "user" : user2Brief.address,
    "isMine" : false,
    "createdAt" : "2021-8-8 00:00:00",
    "title": "NFT Post 2",
    "address" : "0xF4D54031aee4B97dF4e17bd8f771AD7621D269F2",
    "ipfsHash" : "2222222",
    "file": "https://www.w3schools.com/css/paris.jpg", // should just be on ipfs
    "price" : 1.1,
    "bidHistory": [{
        "TxID": "2",
        "amount": "1.1",
        "user": user1Brief.address,
    }],
    "status": "on loan", //on loan, bidding, completed
    "startDate": "2021-8-8 00:00:00",
    "endDate": "2021-8-8 00:00:00",
    "borrower": user1Brief.address,
};

const post3 = {
    "user" : user3Brief.address,
    "isMine" : false,
    "createdAt" : "2021-8-8 00:00:00",
    "title": "NFT Post 3",
    "address" : "0x1Ce5b91528D5b8EE7599Aa0d11e4C4F36E96C58b",
    "ipfsHash" : "333333",
    "file": "https://www.w3schools.com/html/pic_trulli.jpg", // should just be on ipfs
    "price" : 1.1,
    "bidHistory": [{
        "TxID": "3",
        "amount": "1.1",
        "user": user1Brief.address,
    }],
    "status": "bidding", //on loan, bidding, completed
    "startDate": null,
    "endDate": null,
    "borrower": null,
};
const post4 = {
    "user" : user3Brief.address,
    "isMine" : false,
    "createdAt" : "2021-8-8 00:00:00",
    "title": "NFT Post 4",
    "address" : "0xC9595e27610b93D9325dfDCa2e7Da6598bB94F18",
    "ipfsHash" : "4444",
    "file": "https://www.w3schools.com/html/img_chania.jpg", // should just be on ipfs
    "price" : 1.1,
    "bidHistory": [{
        "TxID": "4",
        "amount": "1.1",
        "user": user1Brief.address,
    }],
    "status": "bidding", //on loan, bidding, completed
    "startDate": null,
    "endDate": null,
    "borrower": null,
};
const post5 = {
    "user" : user3Brief.address,
    "isMine" : false,
    "createdAt" : "2021-8-8 00:00:00",
    "title": "NFT Post 5",
    "address" : "0x74cb2Ab938cc4F0e77F680Acde53009Cc62aA48a",
    "ipfsHash" : "5555",
    "file": "https://www.w3schools.com/html/img_girl.jpg", // should just be on ipfs
    "price" : 1.1,
    "bidHistory": [{
        "TxID": "5",
        "amount": "1.1",
        "user": user1Brief.address,
    }],
    "status": "bidding", //on loan, bidding, completed
    "startDate": null,
    "endDate": null,
    "borrower": null,
};

const user1 = {
    "username" : user1Brief.username,
    "address": user1Brief.address,
    "avatar" : user1Brief.avatar,
    "isMe" : true,

    "bidPosts": [post3, post4, post5],
    "borrowPosts": [post2],
    "loanPosts": [post1],
    "history": [],
};
const user2 = {
    "_id" : 2,
    "fullname" : "Marco Wang2",
    "username" : "marco2",
    "avatar" : "https://www.w3schools.com/css/img_5terre.jpg",
    "isFollowing" : true,
    "isMe" : false,
    "bio" : "this is my bio 2",
    "postCount" : 2,
    "website" : "www.iglooisawesome2.com",
    "followingCount" : 1,
    "followersCount" : 1,
    "followers" : [user1Brief],
    "following" : [user1Brief],
    "posts" : [post1, post2],
    "savedPosts" : [post1, post2],
    "address": "0x91dF6A7B8cF1507dbda938d135C0C7b956082689",
};
const user3 = {
    "_id" : 3,
    "fullname" : "Marco Wang3",
    "username" : "marco3",
    "avatar" : "https://www.w3schools.com/css/img_forest.jpg",
    "isFollowing" : true,
    "isMe" : false,
    "bio" : "this is my bio 3",
    "postCount" : 0,
    "website" : "www.iglooisawesome3.com",
    "followingCount" : 1,
    "followersCount" : 0,
    "followers" : [],
    "following" : [user1Brief],
    "posts" : [post5],
    "savedPosts" : [],
    "address": "0x91dF6A7B8cF1507dbda938d135C0C7b956082689",
}

export {
    user1, user2, user3,
    user1Brief, user2Brief, user3Brief,
    post1, post2, post3, post4, post5
};