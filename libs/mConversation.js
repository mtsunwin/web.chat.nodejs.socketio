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

    conversation(_nick, _conversation) {
        return {name: _nick, conversation: _conversation, time: getTimeNow()};
    }


}

var getTimeNow = () => {
    let date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDay()}\/${date.getMonth()+1}\/${date.getFullYear()}`;
}

module.exports = mConversation;