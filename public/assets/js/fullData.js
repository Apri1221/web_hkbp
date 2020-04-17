class ContentFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            header: [],
            search: ""
        }
    }

    componentDidMount() {
        const urlFetch = fetch('http://localhost/api/data');
        urlFetch.then(result => {
            if (result.status === 200)
                return result.json()
        }).then(resJson => {
            this.setState({
                'data': resJson
            })
        })
    }


    getHeader(obj) {
        Object.keys(obj).map((item, key) => {
            var data = this.state.data[item];
            var header = Object.keys(data);
            if (this.state.header.length == 0) {
                this.state.header.push(header);
            }
        })
    }

    render_table() {
        return (
            <table className="uk-table uk-table-striped uk-table-hover uk-table-divider">
                <thead>
                    <tr>
                        {   // the array of header has key 0
                            this.state.header[0].map((item, key) =>
                            <th className="uk-table-expand" key={key}>{item}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {   // data that we get have many row
                        Object.keys(this.state.data).map((row, key) =>
                        <tr key={key}>
                            {   // each row have column, the column is a key
                                Object.keys(this.state.data[row]).map((column, key) =>
                                <td key={key}>{this.state.data[row][column]}</td>)
                            }
                        </tr>)
                    }
                </tbody>
            </table>
        );
    }

    render() {
        this.getHeader(this.state.data);
        console.log(this.state.header[0]);
        if (!this.state.header[0]) {
            return <h1>Anjay Belum</h1>
        }
        else {
            return (
                this.render_table()
            );
        }

    }
}

ReactDOM.render(
    <ContentFeed />, document.getElementById('table')
);