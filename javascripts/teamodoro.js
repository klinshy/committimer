Teamodoro = {
  lastState: null,
  lastMinute: null,
  timeDifference: 0,

  start: function() {
    this.clock = SVG("canvas").clock("100%");
    this.updateClock();
    setInterval(this.updateClock.bind(this), 500);
    setInterval(this.displayRandomGif.bind(this), 30 * 1000);

    if (this.inBreak())
      this.displayRandomGif();

    document.getElementById('about').addEventListener('click',function() {
      document.getElementById('why').style.display = 'block';
    });
    document.getElementById('close').addEventListener('click',function() {
      document.getElementById('why').style.display = 'none';
    });
  },

  updateClock: function() {
    this.updateIcon();
    this.beepOnStateChange();
    this.clock.update(this.getDate());
    this.displayRandomGifWhileInBreak();
    this.lastState = this.inBreak() ? "break" : "focus";
  },

  timeCallback: function(response) {
    this.timeDifference = new Date() - new Date(response.datetime);
  },

  getMinutes: function() {
    return new Date(new Date() + this.timeDifference).getSeconds();
  },

  getDate: function() {
    return new Date((new Date()).valueOf() + this.timeDifference);
  },

  displayRandomGif: function() {
    if (!this.inBreak())
      return;

    var request = new XMLHttpRequest();
    request.open("GET", "https://api.giphy.com/v1/gifs/random?api_key=l41lOAgtfPWzS35sY&tag=relax&rate=g", true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var gifUrl = JSON.parse(request.responseText).data.image_url;
        document.getElementById("break-gif").style["background-image"] = "URL(" + gifUrl+ ")";
        document.getElementById("break-gif").style.display = "block";
      }
    };
    request.send();
  },

  displayRandomGifWhileInBreak: function() {
    document.getElementById("break-gif").style.display = this.inBreak() ? "block" : "none";
  },

  inBreak: function() {
    var minutes = this.getDate().getMinutes();
    return (minutes >= 25 && minutes <= 29) || (minutes >= 55 && minutes <= 59);
  },
  beepOnStateChange: function() {
    if (this.inBreak() && this.lastState == "focus") {
    document.getElementById("beep").play();
    WA.chat.sendChatMessage('Time for a break. 5min. Get some fresh Air and a stretch! Stop working!', { scope: 'local', author: 'System' });
    WA.state.saveVariable('focus',"");
    WA.player.state.saveVariable('pomo-exp', '0', {
      public: false,
      persist: false,
      scope: "room"
    });
    WA.player.state.saveVariable('pomo-exp', '10', {
      public: false,
      persist: false,
      scope: "room"
    });

    } else if (!this.inBreak() && this.lastState == "break") {
    document.getElementById("beep").play();
    WA.chat.sendChatMessage('Focus Time! 25min!', { scope: 'local', author: 'C3-o-mat' });
    WA.state.saveVariable('focus',"1");
    }
  },
  
  
  updateIcon: function() {
    var minutesLeft = this.clock.minutesLeft() + 1;
    if (this.lastMinute != minutesLeft) {
      var path = "/images/countdown/";
      path += this.inBreak() ? "break/" : "focus/";
      favicon.change(path + minutesLeft + ".png");
      this.lastMinute = minutesLeft;
    }
  },
};
// Listen for messages from the iframe
window.addEventListener('message', (event) => {
// For same-origin, no need to check event.origin, but good practice to log it
console.log('Message received from iframe:', event);

// Validate message type
if (event.data && event.data.type === 'addTask') {
  WA.chat.sendChatMessage(event.data.data, { scope: 'local', author: 'System' });
    console.log('Task event received:', event.data.data);
   
} else {
    console.log('Other message received:', event.data);
}
});