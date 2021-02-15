"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: [{
        name: "",
        singer: "",
        cover: "",
        musicSrc: ""
      }]
    };
  }

  componentDidMount() {
    this.setState({
      musicList: this.props.musicList
    });
  }

  componentWillUnmount() {
    this.setState({
      musicList: this.props.musicList
    });
  }

  render() {
    const {
      musicList
    } = this.state;
    const currentSong = musicList[0];

    if (currentSong == undefined) {
      return /*#__PURE__*/React.createElement("div", {
        className: "card-music"
      }, /*#__PURE__*/React.createElement("div", {
        className: "ui basic segment"
      }, /*#__PURE__*/React.createElement("h3", null, "Tidak ada daftar lagu")));
    }

    const options = {
      audioLists: musicList,
      autoPlay: false,
      autoPlayInitLoadPlayList: false,
      glassBg: true,
      showDownload: false,
      showThemeSwitch: false,
      showMediaSession: true,
      showDestroy: false,
      showReload: false,
      showPlayMode: false,
      remove: false,
      toggleMode: false,
      mode: 'full',
      responsive: false,
      showLyric: false,

      // audio play handle
      onAudioPlay(audioInfo) {
        sendData(audioInfo.name);
      }

    };
    return /*#__PURE__*/React.createElement(ReactJkMusicPlayer, _extends({}, options, {
      mobileMediaQuery: "(max-width: 1024px)",
      quietUpdate: true,
      clearPriorAudioLists: true
    }));
  }

}

class ContentIbadah extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      description: '',
      contents: [{
        id: '',
        title: '',
        post: ''
      }],
      musicList: []
    };
  }

  handleRequestAPI(url, method, data = undefined) {
    if (!url) return; // guard clause

    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(result => {
      if (result.status === 200) {
        return result.json();
      }
    }).then(resJson => {
      return resJson;
    }).catch(error => sendCrashReport(error, url));
  }

  async getDataIbadah(id_ibadah) {
    const dataIbadah = await this.handleRequestAPI(`/api/ibadah/${id_ibadah}`, method.GET); // keep eye on this, look at the data JSON API

    const {
      id,
      title,
      description,
      content
    } = dataIbadah[0];
    let contents = [];
    content.forEach(value => {
      const {
        id,
        title,
        content
      } = value;
      contents.push({
        id: id,
        title: title,
        post: content
      });
      this.getMusicList(title + content);
    });
    this.setState({
      id: id,
      title: title,
      description: description,
      contents: contents
    });
  }

  async getMusicList(content) {
    const re = new RegExp(/\b(be|kj|bl|bn|pkj)\b.*\s*(?=\d+)[0-9](\w)/gi); // https://files.alkitab.app/addon/audio/songs/v2/BE_1.mid

    if (content.search(re) > 0) {
      for (const item of content.match(re)) {
        const nyanyian = item.replace(/[.,]/g, '').split(' ');
        if (nyanyian.length > 3) continue;
        const buku = nyanyian[0];
        const nomor = nyanyian[2];
        const is_already = this.state.musicList.some(e => e['name'] == nyanyian);
        const url = `/assets/musics/${buku}_${nomor}.mp3`;
        if (is_already || buku == undefined || nomor == undefined) continue;
        this.state.musicList.push({
          name: item,
          singer: null,
          cover: 'https://www.bensound.com/bensound-img/buddy.jpg',
          musicSrc: url
        });
      }
    }
  }

  componentDidMount() {
    this.getDataIbadah(this.props.idIbadah);
  }

  componentDidUpdate() {
    animateFadeIn('.ui.segment');
  }

  render() {
    const {
      title,
      description,
      contents,
      musicList
    } = this.state;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, title), /*#__PURE__*/React.createElement("p", null, description), /*#__PURE__*/React.createElement("div", {
      className: "ui divider huge"
    }), /*#__PURE__*/React.createElement("div", {
      className: "ui very relaxed stackable grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twelve wide column"
    }, contents.map(element => {
      const {
        title,
        post
      } = element;
      return /*#__PURE__*/React.createElement("div", {
        className: "hiddenGSAP"
      }, /*#__PURE__*/React.createElement("div", {
        className: "ui raised segment",
        style: {
          "margin-bottom": "3em"
        }
      }, /*#__PURE__*/React.createElement("h4", {
        className: "ui sub header"
      }, title), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", {
        className: "textIbadah"
      }, post)));
    })), /*#__PURE__*/React.createElement(Music, {
      musicList: musicList
    })));
  }

}

$(document).ready(() => {
  var id = $("#contentIbadah").attr('post-id');
  ReactDOM.render( /*#__PURE__*/React.createElement(ContentIbadah, {
    idIbadah: id
  }), document.getElementById("contentIbadah"));
});