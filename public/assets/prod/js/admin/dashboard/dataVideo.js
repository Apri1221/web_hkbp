"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MasterVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      dataVideo: []
    };
  }

  callbackEdit(dataVideo = null) {
    let boolEdit = this.state.isEdit;
    this.setState({
      isEdit: !boolEdit,
      dataVideo: dataVideo
    });
  }

  render() {
    const {
      isEdit,
      dataVideo
    } = this.state;

    if (isEdit) {
      return /*#__PURE__*/React.createElement(PostVideo, {
        callbackEdit: this.callbackEdit.bind(this),
        dataVideo: dataVideo
      });
    }

    return /*#__PURE__*/React.createElement(GetVideo, {
      callbackEdit: this.callbackEdit.bind(this)
    });
  }

}

class GetVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listDataVideo: []
    };
  }

  async getDataListVideo() {
    const listVideo = await axios.get('/api/video?all=true');
    this.setState({
      listDataVideo: listVideo.data
    });
  }

  async deleteVideo(id) {
    await axios.delete(`/api/video/delete/${id}`);
    this.getDataListVideo();
  }

  componentDidMount() {
    this.getDataListVideo();
  }

  render() {
    const dataVideos = this.state.listDataVideo;
    const fCallbackEdit = this.props.callbackEdit;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Kelola Data Video"), /*#__PURE__*/React.createElement("table", {
      className: "ui compact celled table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Judul"), /*#__PURE__*/React.createElement("th", null, "Deskripsi"), /*#__PURE__*/React.createElement("th", {
      className: "one wide"
    }, "Aksi"))), /*#__PURE__*/React.createElement("tbody", null, dataVideos.map(data => {
      {
        /* keep eye on this */
      }
      const {
        id,
        title,
        description
      } = data;
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, title), /*#__PURE__*/React.createElement("td", null, description), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
        className: "ui icon buttons"
      }, /*#__PURE__*/React.createElement("button", {
        className: "ui blue basic button",
        onClick: fCallbackEdit.bind(null, data)
      }, /*#__PURE__*/React.createElement("i", {
        className: "edit outline icon"
      })), /*#__PURE__*/React.createElement("button", {
        className: "ui red basic button",
        onClick: this.deleteVideo.bind(this, id)
      }, /*#__PURE__*/React.createElement("i", {
        className: "trash alternate outline icon"
      })))));
    })), /*#__PURE__*/React.createElement("tfoot", {
      className: "full-width"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      colspan: "6"
    }, /*#__PURE__*/React.createElement("button", {
      class: "ui right floated small primary labeled icon button",
      onClick: fCallbackEdit
    }, /*#__PURE__*/React.createElement("i", {
      class: "plus icon"
    }), " Tambah Data"), /*#__PURE__*/React.createElement("div", {
      style: {
        "clear": "both"
      }
    }))))));
  }

}

class PostVideo extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChangeInput", e => {
      if (e.target.className == 'togle-button-custom') {
        this.setValueState('is_show', !this.state.is_show);
      } else {
        this.setValueState(e.target.className, e.target.value);
      }
    });

    this.state = {
      title: '',
      description: '',
      url: null,
      is_show: null
    };
    this.sendData = this.sendData.bind(this);
  }

  async initiateData() {
    // we get data from MasterVideo to be edited?
    const dataFromMaster = this.props.dataVideo;

    if (!dataFromMaster.id) {
      return;
    }

    const {
      id,
      title,
      description,
      url,
      is_show
    } = dataFromMaster;
    console.log(is_show);
    document.getElementById("show-video").checked = is_show == 1 ? true : false;
    this.setState({
      id: id,
      title: title,
      description: description,
      url: url,
      is_show: is_show == 1 ? true : false
    });
  }

  componentDidMount() {
    this.initiateData();
    $("input:text").click(function () {
      $(this).parent().find("input:file").click();
    });
  }

  componentDidUpdate() {
    // from parrent Dashboard html
    clossableMessage();
  }

  onDeleteImage(e) {
    e.preventDefault();
    this.setStateImage(null);
  }

  setValueState(name, value) {
    this.setState({
      [name]: value
    });
  }

  async sendData(e) {
    e.preventDefault();
    const {
      id,
      title,
      description,
      url,
      is_show
    } = this.state;
    let data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('url', url);
    data.append('is_show', is_show);
    const link = '/api/video/' + (id ? `update/${id}` : 'create');
    axios.post(link, data).then(r => {
      console.log(r.data); // calling callback from Master Component

      this.props.callbackEdit();
    });
  }

  render() {
    const {
      title,
      description,
      url
    } = this.state;
    const fCallbackEdit = this.props.callbackEdit;
    return /*#__PURE__*/React.createElement("form", {
      className: "ui form",
      onChange: this.handleChangeInput
    }, /*#__PURE__*/React.createElement("div", {
      className: "ui positive message"
    }, /*#__PURE__*/React.createElement("p", null, "Video yang ditampilkan di beranda adalah yang terakhir di tambahkan dengan status show aktif.")), /*#__PURE__*/React.createElement("div", {
      className: "field"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "title"
    }, "Judul"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "title",
      name: "title",
      id: "title",
      value: title
    })), /*#__PURE__*/React.createElement("div", {
      className: "field"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "description"
    }, "Deskripsi"), /*#__PURE__*/React.createElement("textarea", {
      className: "description",
      name: "description",
      id: "description",
      value: description
    })), /*#__PURE__*/React.createElement("div", {
      className: `ui toggle checkbox field`
    }, /*#__PURE__*/React.createElement("input", {
      className: `togle-button-custom`,
      type: "checkbox",
      name: "show-video",
      id: "show-video"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "show-video"
    }, "Tampilkan video kepada publik")), /*#__PURE__*/React.createElement("div", {
      className: "field"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "url"
    }, "Alamat / URL"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "url",
      name: "url",
      id: "url",
      value: url
    })), /*#__PURE__*/React.createElement("button", {
      className: "ui positive button",
      onClick: this.sendData
    }, "Simpan"), /*#__PURE__*/React.createElement("button", {
      className: "ui right floated labeled icon secondary button",
      onClick: fCallbackEdit
    }, /*#__PURE__*/React.createElement("i", {
      className: "angle left icon"
    }), "Kembali"), /*#__PURE__*/React.createElement("div", {
      className: "ui hidden divider"
    }));
  }

}

$(document).ready(() => {
  ReactDOM.render( /*#__PURE__*/React.createElement(MasterVideo, null), document.getElementById("contentVideo"));
});