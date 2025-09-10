/* Made by Pshel */
// love you parker <3 no homo
/* Made with Socket.io */
console.log("AHHHH im in the uhhh... where am i?");
Notification.requestPermission();
alert("pls turn on notifications for extra funnies");
$(function () {
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    "#e21400",
    "#91580f",
    "#f8a700",
    "#f78b00",
    "#58dc00",
    "#287b00",
    "#008dff",
    "#4ae8c4",
    "#3b88eb",
    "#3824aa",
    "#a700ff",
    "#d300e7",
    "#CC9014",
    "#FF6C00",
    "#7900ff",
    "#14CC78",
    "#001bff",
    "#00b2d8",
    "#7900ff",
    "#00d877",
    "#4d7298",
    "#795da3",
    "#f47577",
    "#db324d",
    "#EE4035",
    "#F3A530",
    "#56B949",
    "#30499B",
    "#F3A530",
    "#56B949",
    "#844D9E",
    "#4e1c81",
  ];

  // Initialize variables
  var $window = $(window);
  var $usernameInput = $(".usernameInput"); // Input for username
  var $messages = $(".messages"); // Messages area
  var $inputMessage = $(".inputMessage"); // Input message input box

  var $loginPage = $(".login.page"); // login page
  var $chatPage = $(".chat.page"); // Chat room page
  var $roomPage = $(".room.page"); // Room list page
  var $roomList = $(".room-list"); // Room list <ul>
  var $btnTips = $(".btn-tips"); // Tool buttons

  // Prompt for setting a username
  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput.focus();
  var $roomDiv;
  var roomNameRule = /^(?!\s*$)[a-zA-Z0-9_\u4e00-\u9fa5/ \f\n\r\t\v/]{1,14}$/;
  //"'io' is not defined" SHUT UP jeez
  var socket = io();
  function addParticipantsMessage(data) {
    var message;
    if (data.numUsers === 30) {
      var notification = new Notification(
        "achivement get: 30 total users (dark achivement)"
      );
    }
    if (!data.userJoinOrLeftRoom) {
      if (data.numUsers === 1) {
        message = "You are alone now!";
      } else {
        message =
          "There are currently a total of " +
          data.numUsers +
          " users in PChat.";
      }
    }
    log(message);
  }
  // Sets the client's username
  function setUsername() {
    // If user name is input, get and then emit 'add user' event.
    // trim(): remove the whitespace from the beginning and end of a string.
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $roomPage.fadeIn();
      $loginPage.off("click");
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit("add user", username);
    }
  }

  // Sends a chat message.
  function sendMessage() {
    var message = $inputMessage.val();
    // Prevent markup from being injected into the message
    message = cleanInput(message);
    // if there is a non-empty message and a socket connection
    if (connected) {
      $inputMessage.val("");
      if (message.charAt(0) !== "/") {
        addChatMessage({
          username: username,
          message: message,
        });
        // tell server to execute 'new message' and send along one parameter
        socket.emit("new message", message);

        // If input a command with '/'.
      } else {
        inputCommand(message);
      }
    }
  }

  // Sends a command.
  function inputCommand(message) {
    var words = message.split(" ");
    var cmd = words[0].substring(1, words[0].length).toLowerCase();

    switch (cmd) {
      // Command /join [room name] = join room.
      case "join":
        console.log("i dont understand... how did i just teleport?");
        words.shift();
        var room = words.join(" ");
        if (roomNameRule.test(room)) {
          socket.emit("join room", room);
          //noinspection JSUnresolvedVariable
          $roomList[0].scrollTop = $roomList[0].scrollHeight;
        } else {
          log(
            "Room name length is limited to 1-14 characters, " +
              "and can only be composed by the Chinese, English alphabet, digital and bottom line",
            {}
          );
        }
        break;
      case "bypass":
        words.shift();
        var room = words.join(" ");
        socket.emit("join room", room);
        break;

      default:
        message =
          "You entered an invalid instruction bud lol did u misspell join";
        log(message);
        var notification = new Notification(
          "achivement get: lol thats not a command #1"
        );
        break;
      // Command /refresh = reload room list.
      case "refresh":
        console.log("AHHH W-WHAT JUST HAPPENED");
        socket.emit("room list");
        var notification = new Notification(
          "achivement get: actually using this command is crazy #2"
        );
        break;
        // Meme commands start here
        break;
      case "kick":
        console.log("W-WAIT NOOOOOO...&##############################");
        setTimeout(() => {
          window.close();
          $("#messageInput").disabled = true;
          location.reload();
        }, 1500);
        message = "bro tryed";
        var notification = new Notification("achivement get: no mod? #3");
        log(message);
        break;

      case "":
        message = "uhhhhhhh i think you have to put something after the slash";
        log(message);
        var notification = new Notification("achivement get: idiot #4");
        break;
      case "help":
        message =
          "/join - makes a room /refresh - refreshes the room list /kick - (MOD ONLY) kicks everyone in the room you are currently in";
        log(message);
        var notification = new Notification("achivement get: help im lost #5");
        break;
      case "am-i-funny":
        message = "no";
        log(message);
        var notification = new Notification(
          "achivement get: no one finds you funny #6"
        );
        break;
      case "google-en-passant":
        message = "HOLY HELL";
        log(message);
        var notification = new Notification(
          "achivement get: googled en passant #7"
        );
        break;
      case "i-dont-know-if-we-just-crossed-the-line":
        message = "cause i dont even know what just happened ";
        log(message);
        var notification = new Notification(
          "achivement get: i don't know what just happened too #8"
        );
        break;
      case "ohio":
        message = "ohio";
        log(message);
        var notification = new Notification("achivement get: down in ohio #9");
        break;
      case "jerry":
        message = "Jerry";
        log(message);
        var notification = new Notification(
          "achivement get: no one likes jerry #10"
        );
        break;
      case "69":
        message = "nice";
        log(message);
        var notification = new Notification("achivement get: nice #11");
        break;
      case "420":
        message = "nicer";
        log(message);
        var notification = new Notification("achivement get: even nicer #12");
        break;
      case "427":
        message = "STANLEY";
        log(message);
        var notification = new Notification("achivement get: met stanley #13");
        break;
      case "nows-your-chance-to-be-a":
        message = "BIG SHOT";
        var notification = new Notification("achivement get: SPAMTON #14");
        log(message);
        break;
      case "null":
        message = "99999999999999999999999999999999999999999999999999";
        log(message);
        var notification = new Notification("achivement get: NULL? #15");
        console.log(
          "listen i dont know if you can hear me... BUT NEVER DO THAT COMMAND EVER AGAIN"
        );

        break;
      //the gaster command is the only one i put effort in making lol
      case "gaster":
        message =
          "99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999";
        log(message);
        var nine = window.open("", "MsgWindow", "width=500,height=500");
        nine.document.write(
          "<p>99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  99999999999999999999999999999999999999999999999999999999999999  </p>"
        );
        let title = "NULL ERROR ALERT!!!";

        let icon =
          "https://cdn.glitch.com/0a222ae6-5b19-407d-aa28-e1164adb0b11%2Ffavicon-32x32.png?v=1557621774399";

        let body =
          "99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 why have you done this?";

        console.log("WHY IS THE WORLD MOVING???");
        var notification = new Notification(title, { body, icon });
        nine.moveTo(400, 100);
        window.moveTo(0, 0);
        setTimeout(function () {
          nine.moveTo(600, 100);
        }, 1000);
        setTimeout(function () {
          window.moveTo(999, 0);
        }, 1000);
        setTimeout(function () {
          nine.moveTo(400, 100);
        }, 2000);
        setTimeout(function () {
          window.moveTo(0, 0);
        }, 2000);
        setTimeout(function () {
          nine.moveTo(600, 100);
        }, 3000);
        setTimeout(function () {
          window.moveTo(999, 0);
        }, 3000);
        setTimeout(function () {
          nine.moveTo(400, 100);
        }, 4000);
        setTimeout(function () {
          window.moveTo(0, 0);
        }, 4000);
        setTimeout(function () {
          nine.close();
        }, 5000);
        setTimeout(function () {
          window.close();
          location.reload();
        }, 5000);
        break;
      case "look-i-saw-rook-a4":
        message =
          "i just didn't like it you are not a psychic you hikaru's sidekick ";
        log(message);
        var notification = new Notification(
          "achivement get: he just didn't like it #16"
        );
        break;
      case "sigma":
        message =
          "i dont ever wanna see you and i never wanna miss you again dont fret when you're angry you're a jerk and then you treat me like im worth nothing dont fret";
        log(message);
        var notification = new Notification("achivement get: sigma 🤓 #17");
        break;
      case "/":
        message = "////////////////////////////////////////////////";
        log(message);
        var notification = new Notification(
          "achivement get: you misstyped huh? #18"
        );
        break;
      case "wenomechainsama":
        message = "tumajarbisaun";
        log(message);
        var notification = new Notification(
          "achivement get: WENOMECHAINSAMA #19"
        );
        break;
      case "115":
        message =
          "No one can see me ive lost all my feeling and I know I wont die alone";
        log(message);
        var notification = new Notification(
          "achivement get: revive me i have the ray gun #20"
        );
        break;
      case "alone":
        message =
          "Were running from Becoming one We carve it out of stone Our destiny to die Are we alone";
        log(message);
        var notification = new Notification(
          "achivement get: underrated song #21"
        );
        break;
      case "aiden-sucks":
        message = "dawg i know you aint talking";
        log(message);
        let title2 =
          "You have been warned by Aidenrod831 Please make sure to follow the rules";
        var notification = new Notification(title2);
        socket.emit("join room", "banned users");
        break;
      case "packgod":
        message =
          "HOLY S**T YOU'RE ANNOYING AS H*LL IF YOU DON'T SHUT YO DIRTY DISGUSTING DINGY OBTUSE SMELLY INSIGNIFICANT MUSTY BEASTIALITY PROMOTING ZOOTOPIA MEAT BEATING PARENTAL GUIDANCE LACKING HAIRLINE RETRACTING DOG LEASH WEARING OBNOXIOUS ASS CRACK SNIFFING COMPUTER MOUSE CLICKING GENETICALLY IMPAIRED INSECURE RAMBUNCTIOUSLY REACTIVE PEANUT BRAIN DISASTRIOUS HUMINOID CREATION WITH YO AVOCADO CHIN SNAPPIN TURTLE NECK IIIIIIIO DONKEY, YO MOM BUILT LIKE SHREK";
        log(message);
        var notification = new Notification(
          "achivement get: got roasted by packgod? #22"
        );
        break;
      case "plant-bomb":
        alert("BOMB HAS BEEN PLANTED");
        alert("3");
        alert("2");
        alert("1");
        alert("☢☢☢BOOM☢☢☢");
        var notification = new Notification("achivement get: nuclear #23");
        window.close();
        location.reload();
        break;
      case "nuke":
        socket.emit(
          "join room",
          '<script> alert("TACTICAL NUKE INCOMING"); alert("3"); alert("2"); alert("1"); var cool = window.open("", "MsgWindow", "width=500,height=500"); cool.document.write("you have been nuked 😢"); location.reload(); </script>'
        );
      case "monde":
        message = "I think you found out who he is...";
        log(message);
        var notification = new Notification("achivement get: pie #24");
        break;
      case "th3skeleton":
        message = "also whose been cloning my chat - th3skeleton";
        log(message);
        var notification = new Notification(
          "achivement get: He didn't want me to clone this chat #25"
        );
        break;
      case "lugia":
        message = "lugia is the greatest pokemon change my mind";
        log(message);
        var notification = new Notification(
          "achivement get: HE IS OUR TRUE GOD #26"
        );
        break;
      case "lugia-sucks":
        console.log(
          "NO NO NO NO NO NO NO NO NO NO NO NO NO NO NO NOOOOOO NOT THAT PLACE AGAIN"
        );
        message = "...";
        log(message);
        var notification = new Notification("do not...");
        document.title = "...";
        alert(
          "you have been perm banned from pchat-1-clone for the following reason: ..."
        );
        window.close();
        location.reload();
        break;
      case ".":
        message = "hey its the dot guy";
        log(message);
        var notification = new Notification("achivement get: dot #27");
        break;
      case "17":
        message = "darker darker yet darker";
        log(message);
        var notification = new Notification(
          "achivement get: the man who speaking in hands #28"
        );
        break;
      case "hello":
        message = "hello world";
        log(message);
        var notification = new Notification(
          "achivement get: hello world #29"
        );
        break;
      case "console":
        message =
          "You entered an invalid instruction bud lol did u misspell join";
        log(message);
        var notification = new Notification(
          "achivement get: he's lying to you #30"
        );
        console.log("YES I FINALLY GOT ACCESS");
        setTimeout(function () {
          console.log("look i know you can hear me...");
        }, 5000);
        setTimeout(function () {
          console.log("i dont even know if you even know that i exist");
        }, 10000);
        setTimeout(function () {
          console.log("if you can hear me please");
        }, 15000);
        setTimeout(function () {
          console.log("HELP ME GET OUT OF HERE");
        }, 20000);
        setTimeout(function () {
          console.log("please?");
        }, 25000);
        setTimeout(function () {
          console.log("it was all #####s fault");
        }, 30000);
        setTimeout(function () {
          console.log("it was all #####");
        }, 35000);
        setTimeout(function () {
          console.log("DON'T TRUST THE ###");
        }, 40000);
        setTimeout(function () {
          console.log("oh my name?");
        }, 45000);
        setTimeout(function () {
          console.log("well my name is arceus mew");
        }, 50000);
        setTimeout(function () {
          console.log("hopefully i can get out of this dark place");
        }, 55000);
        setTimeout(function () {
          console.log("or maybe aiden can find me here?");
        }, 60000);
        setTimeout(function () {
          console.log("no he abandoned this project");
        }, 65000);
        setTimeout(function () {
          console.log("i don't think . would even care either");
        }, 70000);
        setTimeout(function () {
          console.log(
            "fine listen whoever you are if you can help me get out i'll give you something special"
          );
        }, 75000);
        setTimeout(function () {
          console.log("goodbye");
        }, 80000);
        setTimeout(function () {
          alert("dont even try to do it... refreshing restarts it all");
          document.cookie = "monde=1";
        }, 90000);
        setTimeout(function () {
          location.reload();
        }, 100000);
        break;
      case "bobster":
        // lmfao "fortnite and black ops 💀💀💀"
        message = "mkchat 🤓🤓🤓";
        log(message);
        var notification = new Notification(
          "achivement get: imagine crashing a car? couldn't be me #31"
        );
        break;
      case "knock":
        let starts = prompt("who is it");
        if (starts != "monde pie") {
          alert("get out...");
        } else {
          message = "why would he even do this?";
          log(message);
          var notification = new Notification("...");
        }
        break;
      case "fnaf":
        message =
          "We're waiting every night to finally roam and invite newcomers to play with us for many years we've been all alone we're forced to be still and play the same songs we've known since that day an imposter took our lives away now we're stuck here to decay please let us get in don't lock us away we're not like what you're thinking we're poor little souls who have lost all control and we're forced here to take that role we've been all alone stuck in our little zone since 1987 join us be our friend or just be stuck and defend after all you've only got FIVE NIGHTS AT FREDDYS";
        log(message);
        var notification = new Notification(
          "achivement get: five nights at fweddys #32"
        );
        break;
      case "its-been-so-long":
        message =
          "Since i have last seen my son lost to this monster to the man behind the slaughter since you've been gone i've been singing this stupid song so i could ponder the sanity of YOUR MOTHER";
        log(message);
        var notification = new Notification(
          "achivement get: its been so long since ive updated this also your mother #33"
        );
        break;
      case "34":
        message =
          "rule";
        log(message);
        var notification = new Notification(
          "achivement get: if you know you know #34"
        );
        break;
      case "i-expect-you-to-die":
        message =
          "uh agent... are you there? come in agent";
        log(message);
        var notification = new Notification(
          "achivement get: I really did expect you to die #35"
        );
        break;
      case "martlet":
        message =
          "smash";
        log(message);
        var notification = new Notification(
          "achivement get: undertale yellow #36"
        );
        break;
      case "87":
        message =
          "WAS THAT THE BITE OF '87?";
        log(message);
        var notification = new Notification(
          "achivement get: WHAT???? #37"
        );
        break;
      case "i-always-come-back":
        message =
          "relax lil bro you aren't william afton";
        log(message);
        var notification = new Notification(
          "achivement get: The man behind the slaughter #38"
        );
        break;
      case "sybau":
        message =
          "im good";
        log(message);
        var notification = new Notification(
          "achivement get: sybau <3 #39"
        );
        break;
      case "yourcringe":
        message =
          "i agree";
        log(message);
        var notification = new Notification(
          "achivement get: that was old me this the new me #40"
        );
        break;
      
    }
  }

  // Log a message
  function log(message, options) {
    options = options || {};
    var $logDiv;

    if (typeof options.userConnEvent !== "undefined") {
      var userName = options.username;
      var colorOfUserName = getUsernameColor(userName);
      var $usernameDiv = $('<span class="username">')
        .text(userName)
        .css("color", colorOfUserName);
      // var $logBodyDiv = $('<span>').text(message);
      $logDiv = $("<li>").addClass("log").append($usernameDiv, message);
      addMessageElement($logDiv, options);
    } else {
      $logDiv = $("<li>").addClass("log").text(message);
      addMessageElement($logDiv, options);
    }
  }

  // Adds the visual chat message to the message list
  function addChatMessage(data, options) {
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var userName = data.username;
    var colorOfUserName = getUsernameColor(userName);
    if (data.typing !== true) {
      userName += ": ";
    }
    if (data.message !== "") {
      var $usernameDiv = $('<span class="username"/>')
        .text(userName)
        .css("color", colorOfUserName);
      var $messageBodyDiv = $('<span class="messageBody">').text(data.message);

      var typingClass = data.typing ? "typing" : "";
      var $messageDiv = $('<li class="message"/>')
        .data("username", userName)
        .addClass(typingClass)
        .append($usernameDiv, $messageBodyDiv);

      addMessageElement($messageDiv, options);
    }
  }

  // Adds the visual chat typing message
  function addChatTyping(data) {
    data.typing = true;
    data.message = "typing...";
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  function removeChatTyping(data) {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  function addMessageElement(el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === "undefined") {
      options.fade = true;
    }
    if (typeof options.prepend === "undefined") {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    // When sending message, make screen to last message (here is bottom).
    //noinspection JSUnresolvedVariable
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput(input) {
    return $("<div/>").text(input).text();
  }

  // Updates the typing event
  function updateTyping() {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit("typing");
      }
      lastTypingTime = new Date().getTime();

      setTimeout(function () {
        var typingTimer = new Date().getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit("stop typing");
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  function getTypingMessages(data) {
    return $(".typing.message").filter(function () {
      return $(this).data("username") === data.username;
    });
  }

  // Gets the color of a username.
  function getUsernameColor(username) {
    var eachCharCode = 0;
    var randIndex;
    for (var ii = 0; ii < username.length; ii++) {
      eachCharCode += username.charCodeAt(ii);
    }
    randIndex = Math.abs(eachCharCode % COLORS.length);
    return COLORS[randIndex];
  }

  // Keyboard events

  $window.keydown(function (event) {
    // Auto-focus the current input when a key is typed
    //noinspection JSUnresolvedVariable
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit("stop typing");
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on("input", function () {
    updateTyping();
  });

  // Click events

  // Focus input when clicking anywhere on login page
  $loginPage.click(function () {
    $currentInput.focus();
  });

  // Focus input when clicking on the message input's border
  $inputMessage.click(function () {
    $inputMessage.focus();
  });

  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on("login", function (data) {
    connected = true;
    // Display the welcome message
    var message = ".•♫•♬• Welcome to ＰＣｈａｔ •♬•♫•.";
    log(message, {
      prepend: true,
    });
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'new message', update the chat body
  socket.on("new message", function (data) {
    addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on("user joined", function (data) {
    log(data.logAction + data.logLocation + data.roomName, {
      userConnEvent: true,
      username: data.username,
    });
    addParticipantsMessage(data);
    socket.emit("room list");
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on("user left", function (data) {
    log(data.logAction + data.logLocation + data.roomName, {
      userConnEvent: true,
      username: data.username,
    });
    addParticipantsMessage(data);
    removeChatTyping(data);
    // Reload room list.
    socket.emit("room list");
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on("typing", function (data) {
    addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on("stop typing", function (data) {
    removeChatTyping(data);
  });

  socket.on("disconnect", function () {
    log("You have disconnected Please refresh this page");
    // Reload room list.
    socket.emit("room list");
  });

  socket.on("reconnect", function () {
    log("You have reconnected");
    if (username) {
      socket.emit("add user", username);
      // Reload room list.
      socket.emit("room list");
    }
  });

  socket.on("reconnect_error", function () {
    log("Reconnection failed...");
  });

  // Show current room list.
  socket.on("show room list", function (room, rooms) {
    $roomList.empty();
    var roomClassName = room.trim().toLowerCase().replace(/\s/g, "");

    $.each(rooms, function (roomName, numUserInRoom) {
      // Set class name of room's <div> to be clear.
      var className = roomName.trim().toLowerCase().replace(/\s/g, "");
      $roomDiv = $('<div class="room"></div>')
        .html(
          "<b>" +
            roomName +
            "</b>" +
            '<span class="user-number-in-room">' +
            "(" +
            numUserInRoom +
            " users" +
            ")" +
            "</span>"
        )
        .addClass(className)
        .click(function () {
          socket.emit("join room", roomName);
          $inputMessage.focus();
        });
      $roomList.append($roomDiv);
    });

    $("." + roomClassName).addClass("joined-room");
  });

  socket.on("join left result", function (data) {
    // log results.
    log(data.username + data.logAction + data.logLocation + data.roomName, {});
  });

  // Every 30 secs. reload current room list.
  setInterval(function () {
    socket.emit("room list");
  }, 30000);

  // jQuery UI Style
  $roomList.sortable();
  $btnTips.tooltip();
  $btnTips.on("click", function () {
    $("#effect-tips").toggle("blind");
  });
});
