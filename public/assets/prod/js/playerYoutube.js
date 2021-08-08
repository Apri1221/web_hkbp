"use strict";

class PlayerYoutube extends React.Component {
  constructor() {
    super();
    this.state = {
      showVideo: false
    };
  }

  getIdVideo(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  async componentDidMount() {
    const listVideo = await handleRequestAPI('/api/video', method.GET);

    if (listVideo.length === 0) {
      return;
    }

    this.setState({
      showVideo: true
    });
    const idVideo = this.getIdVideo(listVideo[0]['url']);
    const platform = listVideo[0]['type'];
    const player = new Plyr('#player', {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
      fullscreen: {
        enabled: true,
        fallback: true,
        iosNative: false
      },
      ratio: '16:9',
      youtube: {
        noCookie: false,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1
      }
    });
    player.source = {
      type: 'video',
      sources: [{
        src: idVideo,
        provider: platform
      }]
    };
  }

  render() {
    const {
      showVideo
    } = this.state;

    if (showVideo) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
        class: "header"
      }, "Stream Video"), /*#__PURE__*/React.createElement("video", {
        controls: true,
        crossorigin: true,
        id: "player"
      }), /*#__PURE__*/React.createElement("div", {
        class: "ui hidden divider huge"
      }));
    }

    return /*#__PURE__*/React.createElement("div", null);
  }

}

$(document).ready(function () {
  ReactDOM.render( /*#__PURE__*/React.createElement(PlayerYoutube, null), document.getElementById("playerYoutube"));
});