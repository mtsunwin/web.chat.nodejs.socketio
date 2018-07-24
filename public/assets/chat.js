var socket = io();

$(document).ready(function () {

    checkNickname();

    socket.on("infor", function (data) {
        console.log("tmt", data);
        if (data) {
            $('#input_nickname').attr('disabled', 'disabled');
            $('#btn_nickname').attr('disabled', 'disabled');
            $('#btn-input').removeAttr('disabled');
            $('#btn-chat').removeAttr('disabled');
        }
    });

    $('#btn-chat').on('click', function (e) {
        genaratorConversation(true, $('#btn-input').val());
        socket.emit('message_group', $('#btn-input').val());
    });
});

socket.on('conversation_group', function (data) {
    console.log(data);
    genaratorConversation(false, data);
});

socket.on('waiting', function (data) {
    console.log('waiting', data);
});

// Xử lý nickname
function checkNickname() {

    $('#btn_nickname').click(function (e) {
        let nick = $('#input_nickname').val();
        socket.emit('connection', nick);
    });
}

/**
 *
 * @param _type true -> me, false -> someone
 * @param _data
 */
function genaratorConversation(_type, _data) {
    let str;
    if (_type) {
        str = `<li class="right clearfix"><span class="chat-img pull-right">
                    <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle"/>
                </span>
                    <div class="chat-body clearfix">
                        <div class="header">
                            <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>
                            </small>
                            <strong class="pull-right primary-font">${$('#input_nickname').val()}</strong>
                        </div>
                        <p>
                            ${_data}
                        </p>
                    </div>
                </li>`;
    } else {
        str = `<li class="left clearfix"><span class="chat-img pull-left">
                    <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle"/>
                </span>
                    <div class="chat-body clearfix">
                        <div class="header">
                            <strong class="primary-font">${_data.name}</strong>
                            <small class="pull-right text-muted">
                                <span class="glyphicon glyphicon-time"></span>${_data.time}
                            </small>
                        </div>
                        <p>
                            ${_data.conversation}
                        </p>
                    </div>
                </li>`;
    }
    $('.chat').append(str);
}

