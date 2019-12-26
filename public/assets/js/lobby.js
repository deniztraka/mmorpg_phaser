function Lobby() {
    var self = this;

    setInterval(function () {
        self.checkServerStatus(function (status) {
            self.setServerStatusIcon(status);
        })
    }, 10000);

    self.getCharacters();
}

Lobby.prototype.getCharacters = function () {
    $.ajax({
        url: "/getCharacters",
        contentType: "application/json;charset=utf-8",
        data: {
            email: "test1@gmail.com",
            name: "testCharacter",
            class: "warrior"
        },
        success: function (data) {
            var $createCharacterText = $(".js-create-character-text");
            var $selectCharacterText = $(".js-select-character-text");
            if(data.characters && data.characters.lenght > 0){
                $selectCharacterText.show();
                $createCharacterText.hide();
            }else{
                $createCharacterText.show();
                $selectCharacterText.hide();
            }
        },
        dataType: "json"
    });
};

Lobby.prototype.checkServerStatus = function (recallFunc) {
    $.ajax({
        url: "/status",
        success: function (data) {
            if (recallFunc != null) {
                recallFunc(data.status === "ok");
            }
        },
        dataType: "json"
    });
};

Lobby.prototype.setServerStatusIcon = function (status) {
    $serverStatus = $(".server-status");
    if (status) {
        if ($serverStatus.hasClass("offline")) {
            $serverStatus.removeClass("offline");
            $serverStatus.addClass("online");
        }
    } else {
        if ($serverStatus.hasClass("online")) {
            $serverStatus.removeClass("online");
            $serverStatus.addClass("offline");
        }
    }
};

var lobby = new Lobby();