"use strict";

class AllTingting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tingtings: []
    };
  }

  async getAllDataTingting() {
    // provide API untuk tampilin semua tingting
    const dataTingting = await handleRequestAPI(`/api/tingting/`, method.GET);
    this.setState({
      tingtings: dataTingting
    });
    console.log(this.state.tingtings);
  }

  componentDidMount() {
    this.getAllDataTingting();
  }

  render() {
    const {
      tingtings
    } = this.state;
    const regexTagHtml = /<.+?>/g;
    return /*#__PURE__*/React.createElement("div", {
      class: "ui two doubling horizontal cards"
    }, tingtings.map(tingting => {
      const {
        id,
        image,
        title,
        updated_at,
        content
      } = tingting;
      const contentTingting = content.replace(regexTagHtml, '');
      return /*#__PURE__*/React.createElement("div", {
        class: "card"
      }, image != null ? /*#__PURE__*/React.createElement("div", {
        class: "image",
        style: {
          backgroundColor: `#fff`,
          'background-position': '50% 50%',
          'background-size': 'cover'
        }
      }, /*#__PURE__*/React.createElement("img", {
        style: {
          'height': '150px',
          'object-fit': 'cover',
          'object-position': 'center'
        },
        src: image,
        onError: "this.onerror=null; this.src='https://fomantic-ui.com/images/wireframe/image.png';"
      })) : /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", {
        class: "content"
      }, /*#__PURE__*/React.createElement("div", {
        class: "header"
      }, title), /*#__PURE__*/React.createElement("div", {
        class: "meta"
      }, /*#__PURE__*/React.createElement("a", null, updated_at)), /*#__PURE__*/React.createElement("div", {
        class: "description",
        style: {
          'display': '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          'overflow': 'hidden'
        }
      }, contentTingting)), /*#__PURE__*/React.createElement("div", {
        class: "extra content"
      }, /*#__PURE__*/React.createElement("a", {
        class: "ui primary right floated right labeled icon button",
        href: `/article/${id}`,
        rel: "noopener noreferrer"
      }, "Lihat", /*#__PURE__*/React.createElement("i", {
        class: "right chevron icon"
      }))));
    }));
  }

}

class DataTingting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.idTingting,
      title: '',
      content: '',
      image: null,
      updated_at: null
    };
  }

  async getDataTingting(id) {
    const dataTingting = await handleRequestAPI(`/api/tingting/${id}`, method.GET);
    const {
      title,
      image,
      content,
      updated_at
    } = dataTingting[0];
    this.setState({
      title: title,
      content: content,
      image: image,
      updated_at: updated_at
    });
  }

  componentDidMount() {
    if (this.state.id != null) {
      this.getDataTingting(this.state.id);
    }
  }

  render() {
    const {
      title,
      content,
      image,
      updated_at
    } = this.state;
    const regexTagHtml = /<.+?>/g;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
      style: {
        backgroundImage: `url("https://fomantic-ui.com/images/wireframe/image.png")`,
        'background-position': '50% 50%',
        'background-size': 'cover'
      },
      className: "ui fluid raised image",
      src: image,
      alt: title
    }), /*#__PURE__*/React.createElement("div", {
      className: "ui divider"
    }), /*#__PURE__*/React.createElement("h1", {
      className: "header"
    }, title), /*#__PURE__*/React.createElement("div", {
      className: "ui circular labels"
    }, /*#__PURE__*/React.createElement("div", {
      class: "ui label"
    }, "Diperbaharui", /*#__PURE__*/React.createElement("div", {
      class: "detail"
    }, updated_at)), /*#__PURE__*/React.createElement("span", {
      className: "ui label"
    }, "Admin")), /*#__PURE__*/React.createElement("div", {
      className: "ui basic segment"
    }, regexTagHtml.test(content) ? /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: content
      }
    }) : /*#__PURE__*/React.createElement("div", {
      class: "description",
      style: {
        'display': '-webkit-box',
        '-webkit-line-clamp': '3',
        '-webkit-box-orient': 'vertical',
        'overflow': 'hidden'
      }
    }, content)));
  }

}

$(document).ready(() => {
  var id = $("#contentTingting").attr('tingting-id');

  if (id != '') {
    ReactDOM.render( /*#__PURE__*/React.createElement(DataTingting, {
      idTingting: id
    }), document.getElementById("contentTingting"));
  } else {
    ReactDOM.render( /*#__PURE__*/React.createElement(AllTingting, null), document.getElementById("contentTingting"));
  }
});