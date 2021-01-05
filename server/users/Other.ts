// This module is detiacted to other aspects of users that are not incldued in route/model
// As such, this module covers aspects that are not used in the other
// In users aspect, it will be for encryption/tokenize

// Get the username/email, create a hash from that and the current time
// time is -1 for puproses of unit testing
// NOTE: We know username/email is all unique
// https://nodejs.org/api/crypto.html#crypto_crypto Has some good cyrpto stuff
const crypto = require('crypto');

function resetPassword_token(user){
        // NOTE check if efficent
        const hash = crypto.createHash('sha256');
        let secret=""
        // Wlil generate a password token that will be completely random
        // secret = crypto.randomBytes(100)+ hash.read(user)
        
        // Because I'm a super paranoid, this token will have three componets
        // The first is a random byte, which is based on OpenSSL's RAND_bytes()
        // The second part, is a hash based on the username
        // A potetnail explit if given the token
        // is test it for different values, they can see the last part
        // is the same: possiple shuffling is needed
        // secret = crypto.randomBytes(25)+hash.digest(user)

        // NOTE Right now lol it makes the databse looks really weird so here you go 
        secret = user+"chicken"
        return secret

}



export {resetPassword_token}
