'use strict'

class mConversation {
    createNickname(_arrayNick, _nick, callback) {
        let boolean = false;
        _arrayNick.forEach(function (e) {
            if (e === _nick) {
                boolean = true;
            }
        });
        return callback(boolean);
    }

}

module.exports = mConversation;