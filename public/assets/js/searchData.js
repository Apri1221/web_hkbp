

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            filter: "",
            data: [],
            header: [],
        };
    }

    componentDidMount() {
        const urlFetch = fetch('http://localhost/api/data');
        urlFetch.then(result => {
            if (result.status === 200)
                return result.json()
        }).then(resJson => {
            Object.keys(resJson).map((item, key) => {
                var data = resJson[item];
                var header = Object.keys(data);
                if (this.state.header.length == 0) {
                    this.state.header.push(header);
                }
                this.state.data.push(data);
                this.setState(() => { // re-render
                    return { unseen: "does not display" }
                });
                $("#dataTable").dataTable({
                    retrieve: true,
                    searching: false,
                    lengthChange: false
                });
            })
        })
    }

    handleChange = event => {
        this.setState({ filter: event.target.value });
    };

    render() {
        const { filter, data } = this.state;
        const lowercasedFilter = filter.toLowerCase();
        const filteredData = data.filter(item => {
            return Object.keys(item).some(key =>
                item[key].toLowerCase().includes(lowercasedFilter)
            );
        });
        var header = this.state.header; // data before fetch
        if (header[0]) {
            header = header[0]; // if data already fetch
        }

        return (
            <div className="uk-margin">
                <div className="uk-inline">
                    <span class="uk-form-icon" uk-icon="icon: user"></span>
                    <input value={filter} onChange={this.handleChange}
                        className="uk-input uk-form-width-large uk-form-large"
                        placeholder="Ketik dan cari disini"
                    />
                </div>
                <table className="uk-table uk-table-striped uk-table-hover uk-table-divider" id="dataTable">
                    <thead>
                        <tr>
                            {
                                header.map((item, key) =>
                                    <th className="uk-table-expand" key={key}>{item}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map(item => ( // given an object
                                <tr key={item}>
                                    {/* we want to get the each paired value-key in obj */}
                                    {Object.keys(item).map(key =>
                                        <td key={key}>{item[key]}</td>)}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("table"));