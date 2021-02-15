"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TableJemaat = props => {
  const data = props.data;
  return /*#__PURE__*/React.createElement("div", {
    id: "tableJemaat",
    className: "raised-shadow"
  }, /*#__PURE__*/React.createElement("table", {
    className: "ui single line selectable sortable striped unstackable table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, data.header.map((item, key) => {
    if (item != 'Kode Keluarga') {
      return /*#__PURE__*/React.createElement("th", {
        className: "sorted ascending",
        key: key
      }, item);
    }
  }), data.user_role == 'admin' ? '' : /*#__PURE__*/React.createElement("th", null, "Aksi"))), /*#__PURE__*/React.createElement("tbody", {
    id: "tBodyJemaat"
  }, data.filteredData.map(item =>
  /*#__PURE__*/
  // given an object
  React.createElement("tr", {
    key: item
  },
  /* we want to get the each paired value-key in obj */
  Object.keys(item).map(key => {
    if (key != 'Kode Keluarga') {
      {
        /* we dont want print column Kode Keluarga */
      }
      return /*#__PURE__*/React.createElement("td", {
        key: key
      }, item[key]);
    }
  }), (() => {
    {
      /* we want print Kode Keluarga here */
    }

    switch (data.user_role) {
      case 'admin':
        return;

      case 'user':
        return /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
          onClick: props.whenClicked.bind(null, item['Kode Keluarga'], data.sektor, data.user_role),
          id: `btn${item['Kode Keluarga']}`,
          className: "ui inverted blue button btnModal"
        }, /*#__PURE__*/React.createElement("i", {
          className: "child icon"
        }), "Anggota Keluarga"));
    }
  })())))));
};

const LoadingPreview = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "ui info message"
  }, /*#__PURE__*/React.createElement("span", null, "Pilih sektor terlebih dahulu"));
};

class DataJemaat extends React.Component {
  constructor() {
    super();

    _defineProperty(this, "handleSearch", event => {
      this.setState({
        filter: event.target.value
      });
    });

    _defineProperty(this, "getDataJemaatSektor", event => {
      // check search history
      const sektor = event.target.value;
      if (sektor == '' || sektor == this.state.sektor) return;
      const user_role = this.state.user_role;
      const relation = 'Kepala Keluarga'; // define whatever you want, default

      const urlFetch = this.handleRequestAPI(`/api/jemaat/${sektor}/${user_role}/` + (user_role != 'admin' ? `Hubungan?relation=${relation}` : ''), method.GET);
      urlFetch.then(resJson => {
        const data = Object.keys(resJson).map(item => {
          // adding item Usia
          resJson[item]['Usia'] = this.calculateAge(resJson[item]['Tanggal Lahir']);

          if (user_role != 'admin') {
            // removing some item if user role
            ['Hubungan', 'Tanggal Lahir'].forEach(properties => {
              delete resJson[item][properties];
            });
          }

          return resJson[item];
        });
        this.setState({
          sektor: sektor,
          data: data
        });
        $('table').tablesort(); // sort with tablesort js and semantic
      });
    });

    this.state = {
      sektor: '',
      filter: '',
      data: [],
      listSektor: [],
      user_role: ''
    }; // register this method into this class

    this.getDataKeluargaJemaat = this.getDataKeluargaJemaat.bind(this);
    this.getDataJemaatSektor = this.getDataJemaatSektor.bind(this);
  }

  componentDidMount() {
    $('#dropdown-sektor').dropdown({
      clearable: true
    });
    const urlFetch = this.handleRequestAPI('/api/jemaat/list', method.GET);
    urlFetch.then(resJson => {
      Object.keys(resJson).map(item => {
        this.state.listSektor.push(resJson[item]);
      });
      this.setState({
        user_role: $('#contentJemaat').attr('type-user')
      });
    }).catch(error => console.log(error));
  }

  async handleRequestAPI(url, method, data = undefined) {
    if (!url) return; // guard claue

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
    }).catch(error => console.log(error));
  }

  calculateAge(dateString) {
    if (!dateString) return '';
    dateString = dateString.split(/\//g).reverse().join('-');
    return String(Math.floor((new Date() - new Date(dateString)) / 3.15576e+10));
  }

  getDataKeluargaJemaat(kodeKeluarga, sektor, user_role) {
    const contentTarget = '#detailKeluarga';
    const formTarget = '#dataKeluarga';
    const modalTarget = '#modalDataKeluarga';
    const btnIDTarget = `#btn${kodeKeluarga}`;
    const urlFetch = this.handleRequestAPI(`/api/jemaat/${sektor}/${user_role}/Keluarga?familyID=${kodeKeluarga}`, method.GET);

    try {
      urlFetch.then(resJson => {
        const data = Object.keys(resJson).map(item => {
          return resJson[item];
        }); // ini mulai setelah data sektor telah ada

        $(contentTarget).text('Keluarga ' + data[0]['Nama']);
        $(formTarget).html('');
        data.forEach(item => {
          $(formTarget).append(`<div class="ui list"><div class="item"><div class="header">${item['Nama']}</div>${item['Hubungan']}</div></div>`);
        }); // start animate button and modal

        $(btnIDTarget).toggleClass('loading');
        $(modalTarget).modal({
          inverted: true
        }).modal('toggle');
      });
    } finally {
      // perform animate again
      $(btnIDTarget).toggleClass('loading');
    }
  }

  render() {
    const {
      filter,
      data,
      listSektor,
      sektor,
      user_role
    } = this.state; // this will do action for table if data[0] not null

    var header, filteredData;

    if (data[0]) {
      header = Object.keys(data[0]).map(key => key);
      filteredData = data.filter(item => {
        return Object.keys(item).some(key => item[key].toLowerCase().includes(filter.toLowerCase()));
      });
    } // passing object data table to Table Component


    const dataTable = { ...{
        filteredData: filteredData
      },
      header,
      sektor,
      user_role
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ui large form segment"
    }, /*#__PURE__*/React.createElement("label", {
      for: "search_jemaat"
    }), /*#__PURE__*/React.createElement("div", {
      className: "ui inline fields"
    }, /*#__PURE__*/React.createElement("div", {
      className: "field"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ui left icon input"
    }, /*#__PURE__*/React.createElement("input", {
      id: "search_jemaat",
      value: filter,
      onChange: this.handleSearch,
      type: "text",
      placeholder: "Cari Jemaat"
    }), /*#__PURE__*/React.createElement("i", {
      className: "users icon"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "ui hidden section divider"
    }), /*#__PURE__*/React.createElement("div", {
      className: "field"
    }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("select", {
      id: "dropdown-sektor",
      className: "ui fluid search dropdown",
      onChange: this.getDataJemaatSektor
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Pilih Sektor"), listSektor.map(item =>
    /*#__PURE__*/
    // given an object
    React.createElement("option", {
      value: item['sektor']
    }, item['sektor']))))))), !data[0] ? !sektor ? /*#__PURE__*/React.createElement(LoadingPreview, null) : null : /*#__PURE__*/React.createElement(TableJemaat, {
      data: dataTable,
      whenClicked: this.getDataKeluargaJemaat
    }));
  }

}

$(document).ready(function () {
  ReactDOM.render( /*#__PURE__*/React.createElement(DataJemaat, null), document.getElementById('contentJemaat'));
});