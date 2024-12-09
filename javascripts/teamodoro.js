
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
    const breakSession = {
      prompts: [
  "Schließe die Augen und atme fünfmal langsam und tief ein. Jetzt ist Zeit für eine fünfminütige Pause.",
  "Strecke deine Arme und Beine - löse alle Verspannungen.",
  "Trinke ein Glas Wasser; versorge deinen Körper und Geist mit Flüssigkeit.",
  "Gehe nach draußen oder schaue aus dem Fenster, um deinen Geist zu erfrischen.",
  "Überprüfe dich selbst: Wie fühlst du dich im Moment?",
  "Nimm dir ein paar Augenblicke Zeit, um dich einfach zu entspannen und die Stille zu genießen.",
  "Mache eine kurze Achtsamkeitsübung - konzentriere dich auf deine Sinne.",
  "Gehe in deinem Raum umher, um deinen Kreislauf in Schwung zu bringen.",
  "Lächle! Selbst ein kleines Lächeln kann deine Stimmung heben.",
  "Nimm dir einen Moment Zeit, um deine bisherigen Fortschritte zu würdigen.",
  "Mache eine leichte Yogapose oder Dehnung, um Spannungen zu lösen.",
  "Lege ein Lied auf, das du liebst, und lass dich davon anregen.",
  "Schreibe eine Sache auf, für die du heute dankbar bist.",
  "Rolle deine Schultern und lockere deinen Nacken.",
  "Bespritze dein Gesicht mit Wasser oder wasche dir die Hände, um dich erfrischt zu fühlen.",
  "Konzentriere dich auf etwas Schönes, wie eine Pflanze oder ein Bild.",
  "Nimm einen achtsamen Bissen von einem Snack - genieße den Geschmack.",
  "Stehe aufrecht und übe eine Minute lang eine selbstbewusste Haltung.",
  "Stelle dir vor, wie du deine nächste Sitzung erfolgreich abschließt.",
  "Danke dir selbst dafür, dass du gekommen bist und dich bemüht hast.",
  "Übe eine schnelle Atemtechnik, um deinen Geist zu beruhigen.",
  "Strecke deinen Rücken und drehe dich leicht, um dich zu lockern.",
  "Verbringe einen Moment in Dankbarkeit für diese Pause.",
  "Schreibe einen kleinen Erfolg der letzten Sitzung auf.",
  "Mache einen kurzen Spaziergang, und sei es nur durch den Raum.",
  "Spiele ein kurzes, fröhliches Video ab oder höre Naturgeräusche.",
  "Massiere deine Hände oder Schläfen, um deine Muskeln zu entspannen.",
  "Schau dich um und finde drei Dinge, die dir Freude bereiten.",
  "Atme langsam und bewusst, um dich wieder zu sammeln.",
  "Feiere diese Pause - sie ist wohlverdient! Genieße deine fünf Minuten."
      ]
    };
    const focusSession = {
      prompts: [
  "Beginne mit einer kleinen Aufgabe; jeder Schritt zählt. Du hast jetzt 25 Minuten Zeit.",
  "Konzentriere dich auf den Fortschritt, nicht auf Perfektion. Deine 25 Minuten laufen.",
  "Du bist hier, um etwas zu erreichen - bleib auf dem Weg. 25 Minuten Fokus.",
  "Teile die Aufgabe in kleinere Stücke auf und gehe eins nach dem anderen an. 25 Minuten Fokuszeit.",
  "Denk daran, dass der Anfang das Schwierigste ist - du hast es bereits geschafft. 25 Minuten Fokus.",
  "Diese Zeit ist für dich und deine Ziele - nutze sie sinnvoll. 25 Minuten Fokus.",
  "Schon fünf Minuten Anstrengung führen zum Erfolg. Jetzt hast du 25 Minuten.",
  "Bleib präsent; Ablenkungen können warten. 25 Minuten Fokuszeit.",
  "Eine konzentrierte Sitzung jetzt bedeutet weniger Stress später. 25 Minuten Fokus.",
  "Du schaffst das - mach weiter so! 25 Minuten Fokuszeit.",
  "Kleine Siege bringen großen Schwung. 25 Minuten Fokus.",
  "Jedes bisschen Anstrengung bringt dich der Ziellinie näher. 25 Minuten Fokus.",
  "Denk an die Genugtuung, die du empfinden wirst, wenn du es geschafft hast. 25 Minuten Fokus.",
  "Konzentriere dich immer nur auf eine Sache - das ist alles, was im Moment zählt. 25 Minuten Fokus.",
  "Vertraue dem Prozess und arbeite einfach weiter. 25 Minuten Fokus.",
  "Atme tief durch und tauche wieder ein - du machst Fortschritte. 25 Minuten Fokus.",
  "Dies ist deine Zeit zu glänzen. Lass die Arbeit fließen. 25 Minuten Fokus.",
  "Du erschaffst etwas Bedeutendes, einen Schritt nach dem anderen. 25 Minuten Fokus.",
  "Nimm dir diese 25 Minuten Zeit und sieh, wie weit du gehen kannst.",
  "Beende deine Arbeit, die Pause steht vor der Tür. 25 Minuten Fokus.",
  "Schalte Ablenkungen aus und tauche ganz in die Aufgabe ein. 25 Minuten Fokus.",
  "Auch kleine Fortschritte sind ein Schritt nach vorn - bleib dran. 25 Minuten Fokus.",
  "Lass dich nicht von Perfektionismus bremsen - gib einfach dein Bestes. 25 Minuten Fokus.",
  "Du baust eine Dynamik auf, die dich voranbringt. 25 Minuten Fokus.",
  "Jeder konzentrierte Moment heute macht den morgigen Tag einfacher. 25 Minuten Fokus.",
  "Fordere dich selbst heraus, noch ein bisschen länger in der Zone zu bleiben. 25 Minuten Fokus.",
  "Du hast schon schwierigere Dinge getan, das hier ist nicht anders. 25 Minuten Fokus.",
  "Betrachte diese Sitzung als ein Geschenk an dein zukünftiges Ich. 25 Minuten Fokus.",
  "Verwandle deinen Fokus in eine Superkraft - bleib wachsam. 25 Minuten Fokus.",
  "Dies ist der Moment, in dem du echte Fortschritte machen kannst - leg los! 25 Minuten Fokus."
      ]
    };
    if (this.inBreak() && this.lastState == "focus") {
      document.getElementById("beep").play();
      const breakPrompt = breakSession.prompts[Math.floor(Math.random() * breakSession.prompts.length)];
      WA.chat.sendChatMessage(breakPrompt, { scope: 'local', author: 'C3-o-mat' });
      WA.state.saveVariable('focus', "");
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
      const focusPrompt = focusSession.prompts[Math.floor(Math.random() * focusSession.prompts.length)];
      WA.chat.sendChatMessage(focusPrompt, { scope: 'local', author: 'C3-o-mat' });
      WA.state.saveVariable('focus', "1");
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