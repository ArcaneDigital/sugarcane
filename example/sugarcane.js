window.$$ = function(s) {
    var c = {
        '#': 'ById',
        '.': 'sByClassName',
        '@': 'sByName',
        '=': 'sByTagName'}[s[0]];
    return document[c?'getElement'+c:'querySelectorAll'](s.slice(1))
};


var Sugarcane = {
  target: '',
  floor: '',
  originalEl: '',
  floorEl: '',
  cloneEl: '',
  state: false,
  ready: function (options) {
    Sugarcane.target = options.target || 'nav';
    Sugarcane.floor = options.floor || 'footer';
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", Sugarcane.pageStart, false);
    } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", function() {
            if (document.readyState === "complete" ) {
                Sugarcane.pageStart();
        }
        });
    } else {
      Sugarcane.pageStart();
    }
  },
  pageStart: function(){
    var t = $$(Sugarcane.target)[0];
    if(t){
      Sugarcane.floorEl = $$(Sugarcane.floor)[0];
      Sugarcane.originalEl = t;
      Sugarcane.cloneEl = t.cloneNode(true);
      Sugarcane.cloneEl.style.display = 'none';
      Sugarcane.cloneEl.style.position = 'fixed';
      Sugarcane.cloneEl.style.left = (Sugarcane.originalEl.offsetLeft + Sugarcane.originalEl.offsetParent.offsetLeft)+ 'px';
      Sugarcane.cloneEl.style.width = Sugarcane.originalEl.offsetWidth + 'px';
      Sugarcane.cloneEl.style.top = '0px';

      Sugarcane.originalEl.parentNode.insertBefore(Sugarcane.cloneEl, Sugarcane.originalEl);
      Sugarcane.switchTop = Sugarcane.originalEl.getBoundingClientRect().top;
      Sugarcane.switchFloor =  Sugarcane.floorEl ? Sugarcane.floorEl.getBoundingClientRect().top : null;
      scrollIntervalID = setInterval(Sugarcane.scrollChange, 10);

    }
  }, 
  scrollChange: function(){

    var top = Sugarcane.getScroll();

    if( ( (top + Sugarcane.originalEl.getBoundingClientRect().height) > Sugarcane.switchFloor) && Sugarcane.switchFloor) {
      Sugarcane.cloneEl.style.display = 'none';
      Sugarcane.state = false;
      return true;
    }
    else if (top > Sugarcane.switchTop && !Sugarcane.state) {
      Sugarcane.cloneEl.style.display = 'block';
      Sugarcane.originalEl.style.display = 'none';
      Sugarcane.state = true;
    } else if(top < Sugarcane.switchTop && Sugarcane.state) {
      Sugarcane.originalEl.style.display = 'block';
      Sugarcane.cloneEl.style.display = 'none';
      Sugarcane.state = false;
    } 
    return true;
  },

  getScroll: function() {
    var scroll = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
      scroll = window.pageYOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
      scroll = document.body.scrollTop;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
      scroll = document.documentElement.scrollTop;
    }
    return scroll;
  }     
}


window.Sugarcane = Sugarcane;