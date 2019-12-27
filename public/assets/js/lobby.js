function Lobby() {
    var self = this;

    setInterval(function() {
        self.checkServerStatus(function(status) {
            self.setServerStatusIcon(status);
        })
    }, 10000);

    self.init();

    self.getCharacters();

}

Lobby.prototype.init = function() {
    this.attachEvents();
};

Lobby.prototype.attachEvents = function() {
    var self = this;
    $createCharacter = $(".js-createCharacter");
    if ($createCharacter.length > 0) {
        $createCharacter.on("click", function(e) {
            e.preventDefault();

            self.createCharacter();
        });
    }
};

Lobby.prototype.getCharacters = function() {
    $.ajax({
        url: "/getCharacters",
        //contentType: "application/json;charset=utf-8",
        data: {
            email: "test1@gmail.com"
        },
        success: function(data) {
                $('.js-characters').html(data);

            } //,
            //dataType: "json"
    });
};

Lobby.prototype.createCharacter = function() {
    $.ajax({
        type: "POST",
        url: "/createCharacter",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            email: "test1@gmail.com",
            name: "testCharacter",
            class: "warrior"
        }),
        success: function(data) {
            console.log(data);
        },
        dataType: "json"
    });
};

Lobby.prototype.checkServerStatus = function(recallFunc) {
    $.ajax({
        url: "/status",
        success: function(data) {
            if (recallFunc != null) {
                recallFunc(data.status === "ok");
            }
        },
        dataType: "json"
    });
};

Lobby.prototype.setServerStatusIcon = function(status) {
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