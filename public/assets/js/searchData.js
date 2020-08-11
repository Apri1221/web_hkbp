// enums
const method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

const TableJemaat = props => {
    const data = props.data;
    return (
        <div id="tableJemaat" className="raised-shadow">
            <table className="ui single line selectable sortable striped unstackable table">
                <thead>
                    <tr>
                        {data.header.map((item, key) => {
                            if (item != 'Kode Keluarga') {
                                return (<th className="sorted ascending" key={key}>{item}</th>);
                            }
                        })}
                        {data.user_role == 'admin' ? '' : <th>Aksi</th>}
                    </tr>
                </thead>
                <tbody id="tBodyJemaat">
                    {data.filteredData.map(item => ( // given an object
                        <tr key={item}>
                            { /* we want to get the each paired value-key in obj */
                                Object.keys(item).map(key => {
                                    if (key != 'Kode Keluarga') {
                                        {/* we dont want print column Kode Keluarga */ }
                                        return (<td key={key}>{item[key]}</td>);
                                    }
                                })
                            }
                            {(() => {
                                {/* we want print Kode Keluarga here */ }
                                switch (data.user_role) {
                                    case 'admin': return;
                                    case 'user': return (
                                        <td>
                                            {/* this is for print button on aksi column */}
                                            <button onClick={props.whenClicked.bind(null, item['Kode Keluarga'], data.sektor, data.user_role)}
                                                id={`btn${item['Kode Keluarga']}`}
                                                className="ui inverted blue button btnModal"><i className="child icon"></i>Anggota Keluarga</button>
                                        </td>);
                                }
                            })()}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const LoadingPreview = () => {
    return (
        <div className="ui info message">
            <span>Pilih sektor terlebih dahulu</span>
        </div>
    )
}

class DataJemaat extends React.Component {
    constructor() {
        super();
        this.state = {
            sektor: '',
            filter: '',
            data: [],
            listSektor: [],
            user_role: ''
        }

        // register this method into this class
        this.getDataKeluargaJemaat = this.getDataKeluargaJemaat.bind(this);
        this.getDataJemaatSektor = this.getDataJemaatSektor.bind(this);
    }

    componentDidMount() {
        $('#dropdown-sektor').dropdown({ clearable: true });
        const urlFetch = this.handleRequestAPI('/api/jemaat/list', method.GET);
        urlFetch.then(resJson => {
            Object.keys(resJson).map((item) => {
                this.state.listSektor.push(resJson[item]);
            })
            this.setState({ user_role: $('#contentJemaat').attr('type-user') });
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
            if (result.status === 200) { return result.json() }
        }).catch(error => console.log(error));
    }

    handleSearch = event => {
        this.setState({ filter: event.target.value });
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
                const data = Object.keys(resJson).map(item => { return resJson[item] });

                // ini mulai setelah data sektor telah ada
                $(contentTarget).text('Keluarga ' + data[0]['Nama']);
                $(formTarget).html('');

                data.forEach(item => {
                    $(formTarget).append(`<div class="ui list"><div class="item"><div class="header">${item['Nama']}</div>${item['Hubungan']}</div></div>`);
                });

                // start animate button and modal
                $(btnIDTarget).toggleClass('loading');
                $(modalTarget).modal({ inverted: true }).modal('toggle');
            })
        } finally {
            // perform animate again
            $(btnIDTarget).toggleClass('loading');
        }
    }

    getDataJemaatSektor = event => {
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

                if (user_role != 'admin') { // removing some item if user role
                    ['Hubungan', 'Tanggal Lahir'].forEach(properties => {
                        delete resJson[item][properties];
                    });
                }

                return resJson[item];
            })
            this.setState({ sektor: sektor, data: data });
            $('table').tablesort(); // sort with tablesort js and semantic
        })
    }

    render() {
        const { filter, data, listSektor, sektor, user_role } = this.state;

        // this will do action for table if data[0] not null
        var header, filteredData;
        if (data[0]) {
            header = Object.keys(data[0]).map(key => key);
            filteredData = data.filter(item => {
                return Object.keys(item).some(key =>
                    item[key].toLowerCase().includes(filter.toLowerCase())
                )
            });
        }

        // passing object data table to Table Component
        const dataTable = { ... { filteredData: filteredData }, header, sektor, user_role };

        return (
            <div>
                <div className="ui large form segment">
                    <div className="ui inline fields">
                        <div className="field">
                            <div className="ui left icon input">
                                {/* Correct: handleClick is passed as a reference! */}
                                <input value={filter} onChange={this.handleSearch} type="text" placeholder="Cari Jemaat" />
                                <i className="users icon"></i>
                            </div>
                        </div>
                        <div className="ui hidden section divider"></div>
                        <div className="field">
                            <select id="dropdown-sektor" className="ui fluid search dropdown" onChange={this.getDataJemaatSektor}>
                                <option value="">Pilih Sektor</option>
                                {listSektor.map(item => ( // given an object
                                    <option value={item['sektor']}>{item['sektor']}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {/* render content depend on given condition, pass the method */}
                {!data[0] ? !sektor ? <LoadingPreview/> : null :
                <TableJemaat data={dataTable} whenClicked={this.getDataKeluargaJemaat} />}
            </div>
        )
    }
}

$(document).ready(function () {
    ReactDOM.render(<DataJemaat />, document.getElementById('contentJemaat'));
});