"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MasterTingting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      dataTingting: []
    };
  }

  callbackEdit(dataTingting = null) {
    if (tinyMCE.activeEditor !== null) {
      tinyMCE.activeEditor.destroy();
    }

    let boolEdit = this.state.isEdit;
    this.setState({
      isEdit: !boolEdit,
      dataTingting: dataTingting
    });
  }

  render() {
    const {
      isEdit,
      dataTingting
    } = this.state;

    if (isEdit) {
      return /*#__PURE__*/React.createElement(PostTingting, {
        callbackEdit: this.callbackEdit.bind(this),
        dataTingting: dataTingting
      });
    }

    return /*#__PURE__*/React.createElement(GetTingting, {
      callbackEdit: this.callbackEdit.bind(this)
    });
  }

}

class GetTingting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listDataTingting: []
    };
  }

  async getDataListTingting() {
    const listTingting = await axios.get('/api/tingting/');
    this.setState({
      listDataTingting: listTingting.data
    });
  }

  async deleteTingting(id) {
    await axios.delete(`/api/tingting/delete/${id}`);
    this.getDataListTingting();
  }

  componentDidMount() {
    this.getDataListTingting();
  }

  render() {
    const dataTingtings = this.state.listDataTingting;
    const fCallbackEdit = this.props.callbackEdit;
    const regexTagHtml = /<.+?>/g;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Kelola Data Tingting"), /*#__PURE__*/React.createElement("table", {
      className: "ui compact celled table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Judul"), /*#__PURE__*/React.createElement("th", null, "Deskripsi"), /*#__PURE__*/React.createElement("th", {
      className: "one wide"
    }, "Aksi"))), /*#__PURE__*/React.createElement("tbody", null, dataTingtings.map(data => {
      {
        /* keep eye on this */
      }
      const {
        id,
        title,
        content
      } = data;
      const contentTingting = content.replace(regexTagHtml, '');
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, title), /*#__PURE__*/React.createElement("td", null, contentTingting), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
        className: "ui icon buttons"
      }, /*#__PURE__*/React.createElement("button", {
        className: "ui blue basic button",
        onClick: fCallbackEdit.bind(null, data)
      }, /*#__PURE__*/React.createElement("i", {
        className: "edit outline icon"
      })), /*#__PURE__*/React.createElement("button", {
        className: "ui red basic button",
        onClick: this.deleteTingting.bind(this, id)
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

class PostTingting extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChangeInput", e => {
      this.setValueState(e.target.className, e.target.value);
    });

    this.state = {
      title: '',
      contents: '',
      image: null
    };
    this.onUploadImage = this.onUploadImage.bind(this);
    this.onDeleteImage = this.onDeleteImage.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  async initiateData() {
    // we get data from MasterIbadah to be edited?
    const dataFromMaster = this.props.dataTingting;

    if (!dataFromMaster.id) {
      return;
    } // keep eye on this, look at the data JSON API


    const {
      id,
      title,
      content,
      file_attached,
      image
    } = dataFromMaster; // https://stackoverflow.com/questions/34485420/how-do-you-put-an-image-file-in-a-json-object

    this.setState({
      id: id,
      title: title,
      contents: content
    });
    const isContentNull = tinyMCE.activeEditor.getContent() === '';

    if (isContentNull) {
      tinymce.activeEditor.setContent(content);
    }

    if (image != null) {
      $('#img-desc').val("Memuat Gambar");
      const blob_image = await fetch(image).then(r => r.blob());
      this.setStateImage(blob_image, file_attached);
    }
  }

  componentDidMount() {
    tinymce.init({
      selector: 'textarea',
      plugins: ''
    });
    this.initiateData();
    $("input:text").click(function () {
      $(this).parent().find("input:file").click();
    });
  }

  componentDidUpdate() {
    // from parrent Dashboard html
    clossableMessage();
  }

  onUploadImage(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    this.setStateImage(files[0]);
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

  async setStateImage(file = null, name = null) {
    const file_name = name ? name : file ? file.name : null;
    let file_size = file ? Math.ceil(file.size / 1000) : null;

    if (file_size > 2048) {
      let options = {
        maxSizeMB: 2,
        useWebWorker: true
      };
      file = await imageCompression(file, options);
      file_size = Math.ceil(file.size / 1000);
    }

    console.log(file);
    this.setState({
      image: file
    });
    $('#img-desc').val(file ? `${file_name} | ${file_size}KB` : null);
  }

  async sendData(e) {
    e.preventDefault();
    const {
      id,
      title,
      contents,
      image
    } = this.state;
    const contentTingting = tinyMCE.activeEditor.getContent();
    let data = new FormData();
    data.append('title', title);
    data.append('content', contentTingting);
    data.append('image', image);
    const url = '/api/tingting/' + (id ? `update/${id}` : 'create');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data' // "Authorization" : `Bearer ${token}`}

      }
    };
    console.log(image); // AXIOS LARAVEL ERROR PUT REQUEST MULTIPART

    axios.post(url, data, config).then(r => {
      console.log(r.data); // calling callback from Master Component

      this.props.callbackEdit();
    });
  }

  render() {
    const {
      title,
      contents,
      image
    } = this.state;
    const fCallbackEdit = this.props.callbackEdit;
    return /*#__PURE__*/React.createElement("form", {
      className: "ui form",
      onChange: this.handleChangeInput
    }, /*#__PURE__*/React.createElement("div", {
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
      className: "contents",
      name: "contents",
      id: "contents",
      value: contents
    })), /*#__PURE__*/React.createElement("div", {
      className: "field"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "image"
    }, "Lampiran Foto Sampul"), /*#__PURE__*/React.createElement("div", {
      class: "ui action input"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "img-desc",
      placeholder: "Klik di sini untuk upload",
      readonly: "readonly"
    }), /*#__PURE__*/React.createElement("input", {
      type: "file",
      accept: "image/*",
      name: "image",
      id: "image",
      onChange: this.onUploadImage
    }), /*#__PURE__*/React.createElement("div", {
      class: "ui basic grey icon button"
    }, /*#__PURE__*/React.createElement("i", {
      class: "attach icon"
    })), /*#__PURE__*/React.createElement("button", {
      className: "ui negative button",
      onClick: this.onDeleteImage
    }, /*#__PURE__*/React.createElement("i", {
      class: "trash alternate outline icon"
    }), "Hapus"))), /*#__PURE__*/React.createElement("button", {
      className: "ui positive button",
      onClick: this.sendData
    }, "Simpan"), /*#__PURE__*/React.createElement("button", {
      className: "ui right floated labeled icon secondary button",
      onClick: fCallbackEdit
    }, /*#__PURE__*/React.createElement("i", {
      className: "angle left icon"
    }), "Kembali"), /*#__PURE__*/React.createElement("div", {
      className: "ui hidden divider"
    }), /*#__PURE__*/React.createElement("div", null, image != null ? /*#__PURE__*/React.createElement("img", {
      className: "ui bordered fluid image",
      src: URL.createObjectURL(image)
    }) : /*#__PURE__*/React.createElement("div", {
      className: "ui info message"
    }, /*#__PURE__*/React.createElement("i", {
      className: "close icon"
    }), /*#__PURE__*/React.createElement("span", null, "Preview gambar tampil disini"))));
  }

}

$(document).ready(() => {
  ReactDOM.render( /*#__PURE__*/React.createElement(MasterTingting, null), document.getElementById("contentTingting"));
});