"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Form = props => {
  const {
    contents
  } = props;
  return contents.map((val, index) => {
    let titleID = `title-${index}`,
        postID = `post-${index}`;
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "ui segment"
    }, /*#__PURE__*/React.createElement("div", {
      className: "field"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: titleID
    }, `Judul Konten #${index + 1}`), /*#__PURE__*/React.createElement("input", {
      className: "title",
      type: "text",
      name: titleID,
      "data-id": index,
      id: titleID,
      value: val.title
    })), /*#__PURE__*/React.createElement("div", {
      className: "field"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: postID
    }, `Isi Konten #${index + 1}`), /*#__PURE__*/React.createElement("textarea", {
      className: "post",
      type: "text",
      name: postID,
      "data-id": index,
      id: postID,
      value: val.post
    })), /*#__PURE__*/React.createElement("input", {
      className: "ui right floated negative button",
      type: "button",
      value: "Hapus",
      onClick: props.removeContent.bind(void 0, index)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        "clear": "both"
      }
    }));
  });
};

class MasterIbadah extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      dataIbadah: []
    };
  }

  callbackEdit(dataIbadah = null) {
    let boolEdit = this.state.isEdit;
    this.setState({
      isEdit: !boolEdit,
      dataIbadah: dataIbadah
    });
  }

  render() {
    const {
      isEdit,
      dataIbadah
    } = this.state;

    if (isEdit) {
      return /*#__PURE__*/React.createElement(PostIbadah, {
        callbackEdit: this.callbackEdit.bind(this),
        dataIbadah: dataIbadah
      });
    }

    return /*#__PURE__*/React.createElement(GetIbadah, {
      callbackEdit: this.callbackEdit.bind(this)
    });
  }

}

class GetIbadah extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listDataIbadah: []
    };
  }

  async getDataListIbadah() {
    const listIbadah = await handleRequestAPI('/api/ibadah/', method.GET);
    this.setState({
      listDataIbadah: listIbadah
    });
  }

  async deleteIbadah(id) {
    await handleRequestAPI(`/api/ibadah/delete/${id}`, method.DELETE);
    this.getDataListIbadah();
  }

  componentDidMount() {
    this.getDataListIbadah();
  }

  render() {
    const dataIbadahs = this.state.listDataIbadah;
    const fCallbackEdit = this.props.callbackEdit;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Kelola Data Ibadah"), /*#__PURE__*/React.createElement("table", {
      className: "ui compact celled table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Judul"), /*#__PURE__*/React.createElement("th", null, "Deskripsi"), /*#__PURE__*/React.createElement("th", {
      className: "one wide"
    }, "Aksi"))), /*#__PURE__*/React.createElement("tbody", null, dataIbadahs.map(data => {
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
        onClick: this.deleteIbadah.bind(this, id)
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

class PostIbadah extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleSubmit", e => {
      // w3schools.com/jsref/event_preventdefault.asp
      e.preventDefault();
    });

    _defineProperty(this, "handleChange", e => {
      this.setValue(e.target.dataset.id, e.target.className, e.target.value);
    });

    this.state = {
      id: null,
      title: '',
      description: '',
      contents: [{
        id: null,
        title: '',
        post: ''
      }]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendDataIbadah = this.sendDataIbadah.bind(this);
    this.addClick = this.addClick.bind(this);
    this.removeContent = this.removeContent.bind(this);
  }

  componentDidMount() {
    // we get data from MasterIbadah to be edited?
    const dataFromMaster = this.props.dataIbadah;

    if (!dataFromMaster.id) {
      return;
    } // keep eye on this, look at the data JSON API


    const {
      id,
      title,
      description,
      content,
      updated_at
    } = dataFromMaster;
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
    });
    this.setState({
      id: id,
      title: title,
      description: description,
      updated_at: updated_at,
      contents: contents
    });
    clossableMessage();
  }

  addClick() {
    // learn about prevState react
    this.setState(prevState => ({
      contents: [...prevState.contents, {
        title: '',
        post: ''
      }]
    }));
  }

  async sendDataIbadah() {
    const {
      id,
      title,
      description,
      contents
    } = this.state;
    const url = id ? `/api/ibadah/update/${id}` : '/api/ibadah/create';
    const methodREST = id ? method.PUT : method.POST;
    await handleRequestAPI(url, methodREST, {
      // object in controller Ibadah
      id: id,
      title: title,
      description: description,
      contents: contents
    }); // calling callback from Master Component

    this.props.callbackEdit();
  }

  setValue(id, name, value) {
    if (['title', 'post'].includes(name) && id != null) {
      // make duplicate of post state
      let contents = [...this.state.contents]; // check if title is correct

      if (name === 'title') this.validationBukuLagu(value, id + 1); // store data that has changed, and insert back

      contents[id][name] = value;
      this.setState({
        contents
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  validationBukuLagu(value, id_konten) {
    // checking if title Nyanyian is correct (only 1 title) eg: BE NO. 198 "Lorem Ipsum" BL.178 (wrong)
    const re = new RegExp(/\b(be|kj|bl|bn|pkj)\b.*\s*(?=\d+)[0-9](\w)/gi);

    if (value.search(re) > 0) {
      const nyanyian = value.match(re).join().replace(/[.,]/g, '').split(' ');

      if (nyanyian.length > 3) {
        // do toast
        $('body').toast({
          title: `Title Konten ${Number(id_konten)} Bermasalah`,
          message: 'Buku lagu yang digunakan tidak boleh duplikat',
          displayTime: 6000,
          showProgress: 'top',
          classProgress: 'red'
        });
      }
    }
  }

  removeContent(index) {
    let contents = [...this.state.contents];
    contents.splice(index, 1);
    this.setState({
      contents
    });
  }

  render() {
    let {
      title,
      description,
      contents,
      updated_at
    } = this.state;
    const fCallbackEdit = this.props.callbackEdit;
    updated_at = updated_at == null ? '-' : updated_at;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ui info message"
    }, /*#__PURE__*/React.createElement("i", {
      className: "close icon"
    }), /*#__PURE__*/React.createElement("span", null, "Terakhir diperbaharui : ", updated_at)), /*#__PURE__*/React.createElement("form", {
      className: "ui form",
      onSubmit: this.handleSubmit,
      onChange: this.handleChange
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
    }, "Deskripsi"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "description",
      name: "description",
      id: "description",
      value: description
    })), /*#__PURE__*/React.createElement(Form, {
      contents: contents,
      removeContent: this.removeContent
    }), /*#__PURE__*/React.createElement("button", {
      className: "ui left blue button",
      onClick: this.addClick.bind(this)
    }, "Tambah"), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      value: "Simpan",
      className: "ui positive right button",
      onClick: this.sendDataIbadah
    }), /*#__PURE__*/React.createElement("button", {
      className: "ui right floated labeled icon secondary button",
      onClick: fCallbackEdit
    }, /*#__PURE__*/React.createElement("i", {
      className: "angle left icon"
    }), "Kembali")));
  }

}

$(document).ready(function () {
  ReactDOM.render( /*#__PURE__*/React.createElement(MasterIbadah, null), document.getElementById("contentIbadah"));
});