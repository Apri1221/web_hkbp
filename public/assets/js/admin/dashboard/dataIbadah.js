// enums
const method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

const handleRequestAPI = (url, method, data = undefined) => {
    if (!url) return; // guard claue
    console.log(data, JSON.stringify(data))
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(result => {
        if (result.status === 200) { return result.json() }
    }).then(resJson => {
        return resJson
    }).catch(error => console.log(error));
}

const Form = (props) => {
    const { contents } = props
    return (
        contents.map((val, index) => {
            let titleID = `title-${index}`, postID = `post-${index}`
            return (
                <div key={index} className="ui segment">
                    <div className="field">
                        <label htmlFor={titleID}>{`Judul Konten #${index + 1}`}</label>
                        <input className="title" type="text" name={titleID} data-id={index} id={titleID} value={val.title} />
                    </div>

                    <div className="field">
                        <label htmlFor={postID}>{`Isi Konten #${index + 1}`}</label>
                        <textarea className="post" type="text" name={postID} data-id={index} id={postID} value={val.post}></textarea>
                    </div>
                    <input className="ui right floated negative button" type='button' value='Hapus' onClick={props.removeContent.bind(this, index)} />
                    <div style={{ "clear": "both" }} />
                </div>
            )
        }))
}


class MasterIbadah extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            dataIbadah: []
        }
    }

    callbackEdit(dataIbadah = null) {
        let boolEdit = this.state.isEdit;
        this.setState({
            isEdit : !boolEdit,
            dataIbadah: dataIbadah
        })
    }

    render() {
        const {isEdit, dataIbadah} = this.state;
        if (isEdit) {
            return (
            <PostIbadah callbackEdit={this.callbackEdit.bind(this)}
            dataIbadah={dataIbadah}/>)
        }
        return (
            <GetIbadah callbackEdit={this.callbackEdit.bind(this)}/>
        );
    }
}


class GetIbadah extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listDataIbadah: []
        }
    }

    async getDataListIbadah() {
        const listIbadah = await handleRequestAPI('http://localhost:8000/api/ibadah/', method.GET);
        this.setState({ listDataIbadah: listIbadah })
    }

    componentDidMount() {
        this.getDataListIbadah()
    }

    render() {
        const dataIbadahs = this.state.listDataIbadah;
        const fCallbackEdit = this.props.callbackEdit;
        return (
            <table className="ui compact celled table">
                <thead>
                    <tr>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                        <th className="one wide">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    { dataIbadahs.map(data => {
                        {/* keep eye on this */}
                        const {id, title, description} = data; 
                        return (
                            <tr>
                                <td>{title}</td>
                                <td>{description}</td>
                                <td>
                                    <div className="ui icon buttons">
                                        <button className="ui blue basic button" onClick={fCallbackEdit.bind(null, data)}>
                                            <i className="edit outline icon"></i>
                                        </button>
                                        <a className="ui red basic button" href={`http://localhost:8000/api/ibadah/delete/${id}`}><i className="trash alternate outline icon"></i></a>
                                    </div>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
                <tfoot className="full-width">
                    <tr>
                        <th colspan="6">
                            <button class="ui right floated small primary labeled icon button" onClick={fCallbackEdit}>
                                <i class="user icon"></i> Tambah Data
                            </button>
                            <div style={{ "clear": "both" }} />
                        </th>
                    </tr>
                </tfoot>
            </table>
        );
    }
}


class PostIbadah extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            title: '',
            description: '',
            contents: [{
                id: null,
                title: '',
                post: ''
            }]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendDataIbadah = this.sendDataIbadah.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeContent = this.removeContent.bind(this);
    }

    componentDidMount() {
        // we get data from MasterIbadah to be edited?
        const dataFromMaster = this.props.dataIbadah;
        if (!dataFromMaster.id) { return }
        // keep eye on this, look at the data JSON API
        const {id, title, description, content} = dataFromMaster;
        let contents = []
        content.forEach((value) => {
            const {id, title, content} = value
            contents.push({id: id, title: title, post: content})
        })
        this.setState({
            id: id,
            title: title,
            description: description,
            contents: contents
        })
    }

    addClick() {
        // learn about prevState react
        this.setState((prevState) => ({
            contents: [...prevState.contents, { title: '', post: '' }]
        }))
    }

    handleSubmit = (e) => {
        // w3schools.com/jsref/event_preventdefault.asp
        e.preventDefault();
    }

    handleChange = (e) => {
        this.setValue(e.target.dataset.id, e.target.className, e.target.value)
    }

    async sendDataIbadah() {
        const {id, title, description, contents} = this.state;
        let urlAPI = (id) ? `http://localhost:8000/api/ibadah/update/${id}` : 'http://localhost:8000/api/ibadah/create';
        let methodREST = (id) ? method.PUT : method.POST;
        console.log(await handleRequestAPI(urlAPI, methodREST, {
            // object in controller Ibadah
            id: id,
            title: title,
            description: description,
            contents: contents
        }))
    }

    setValue(id, name, value) {
        if (['title', 'post'].includes(name) && id != null) {
            // make duplicate of post state
            let contents = [...this.state.contents]
            // store data that has changed, and insert back
            contents[id][name] = value
            this.setState({ contents });
        } else {
            this.setState({ [name]: value })
        }
    }

    removeContent(index) {
        let contents = [...this.state.contents]
        contents.splice(index, 1);
        this.setState({ contents });
    }

    render() {
        let { title, description, contents } = this.state;
        const fCallbackEdit = this.props.callbackEdit;

        return (
            <div>
                <form className="ui form" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <div className="field">
                        <label htmlFor="title">Judul</label>
                        <input type="text" className="title" name="title" id="title" value={title} />
                    </div>
                    <div className="field">
                        <label htmlFor="description">Deskripsi</label>
                        <input type="text" className="description" name="description" id="description" value={description} />
                    </div>

                    {<Form contents={contents} removeContent={this.removeContent} />}

                    <button className="ui left floated primary button" onClick={this.addClick.bind(this)}>Tambah</button>
                    <input type="submit" value="Simpan" className="ui positive button" onClick={this.sendDataIbadah}/>
                    <button className="ui right floated labeled icon secondary button" onClick={fCallbackEdit}><i className="angle left icon"></i>Kembali</button>
                </form>
            </div>
        )
    }
}

$(document).ready(function () {
    ReactDOM.render(<MasterIbadah />, document.getElementById("contentIbadah"));
});