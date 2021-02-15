"use strict";

const Slider = props => {
  const dataSlide = props.data;
  return /*#__PURE__*/React.createElement("div", {
    className: "ui basic segment"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slider slider-tingting"
  }, dataSlide.map(data => {
    const {
      id,
      title,
      image
    } = data;
    return /*#__PURE__*/React.createElement("div", {
      className: "content slide",
      style: {
        backgroundImage: `url("https://fomantic-ui.com/images/wireframe/image.png")`,
        'background-position': '50% 50%',
        'background-size': 'cover'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: image
    }), /*#__PURE__*/React.createElement("div", {
      className: "slide-description"
    }, /*#__PURE__*/React.createElement("span", null, title), /*#__PURE__*/React.createElement("a", {
      className: "header",
      href: `/article/${id}`
    }, "selengkapnya")));
  })), /*#__PURE__*/React.createElement("div", {
    class: "slider slider-nav"
  }, dataSlide.map((e, i) => {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "content-slider"
    }, i + 1));
  })), /*#__PURE__*/React.createElement("div", {
    className: "ui fitted divider"
  }));
};

const List = props => {
  const dataList = props.data;
  return /*#__PURE__*/React.createElement("div", {
    className: "ui basic segment"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui top left attached red label"
  }, "Terbaru"), /*#__PURE__*/React.createElement("div", {
    className: "ui bottom aligned selection list"
  }, dataList.map(data => {
    const {
      id,
      title,
      created_at
    } = data;
    return /*#__PURE__*/React.createElement("a", {
      className: "ui feed item",
      href: `/article/${id}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "event"
    }, /*#__PURE__*/React.createElement("div", {
      className: "content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "summary"
    }, title, /*#__PURE__*/React.createElement("span", {
      className: "date"
    }, created_at)))));
  }), /*#__PURE__*/React.createElement("div", {
    className: "ui fitted divider"
  }), /*#__PURE__*/React.createElement("a", {
    className: "ui feed item",
    href: "/article"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "summary"
  }, "Lihat tingting lebih banyak lagi di sini.")))));
};

class Tingting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: null,
      list: null,
      error: false
    };
  }

  initateSlick() {
    $('.slider-tingting').slick({
      infinite: false,
      autoplay: true,
      autoplaySpeed: 4000,
      asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
      centerMode: true,
      focusOnSelect: true,
      asNavFor: '.slider-tingting'
    });
  }

  async componentDidMount() {
    const qS = $.param({
      'limit': 10,
      'image': true
    });
    const qL = $.param({
      'limit': 10
    });
    const slide = await handleRequestAPI(`/api/tingting?${qS}`, method.GET);
    const list = await handleRequestAPI(`/api/tingting?${qL}`, method.GET);
    this.setState({
      slide: slide,
      list: list
    });
    this.initateSlick();
    setTimeout(() => {
      if (!this.state.slide || !this.state.list) {
        this.setState({
          error: true
        });
      }
    }, 8000);
  }

  render() {
    const {
      slide,
      list,
      error
    } = this.state;
    const myStyle = {
      color: "gray",
      fontFamily: "Verdana",
      textAlign: "center",
      fontStyle: "italic"
    };

    if (error) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
        style: {
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("em", {
        "data-emoji": "astonished",
        class: "medium"
      })), /*#__PURE__*/React.createElement("p", {
        style: myStyle
      }, "Maaf, tidak ada data tingting yang diambil."));
    } else if (!slide || !list) return /*#__PURE__*/React.createElement("div", {
      className: "ui active centered inline loader"
    });else return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Slider, {
      data: slide
    }), /*#__PURE__*/React.createElement(List, {
      data: list
    }));
  }

}

$(document).ready(function () {
  ReactDOM.render( /*#__PURE__*/React.createElement(Tingting, null), document.getElementById("bannerTingting"));
});