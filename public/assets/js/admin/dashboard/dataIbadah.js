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
            isEdit: !boolEdit,
            dataIbadah: dataIbadah
        })
    }

    render() {
        const { isEdit, dataIbadah } = this.state;
        if (isEdit) {
            return (
                <PostIbadah callbackEdit={this.callbackEdit.bind(this)}
                    dataIbadah={dataIbadah} />)
        }
        return (
            <GetIbadah callbackEdit={this.callbackEdit.bind(this)} />
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
        const listIbadah = await handleRequestAPI('/api/ibadah/', method.GET);
        this.setState({ listDataIbadah: listIbadah })
    }

    async deleteIbadah(id) {
        await handleRequestAPI(`/api/ibadah/delete/${id}`, method.DELETE);
        this.getDataListIbadah();
    }

    componentDidMount() {
        this.getDataListIbadah()
    }

    render() {
        const dataIbadahs = this.state.listDataIbadah;
        const fCallbackEdit = this.props.callbackEdit;
        return (
            <div>
            <h1>Kelola Data Ibadah</h1>
            <table className="ui compact celled table">
                <thead>
                    <tr>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                        <th className="one wide">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {dataIbadahs.map(data => {
                        {/* keep eye on this */ }
                        const { id, title, description } = data;
                        return (
                            <tr>
                                <td>{title}</td>
                                <td>{description}</td>
                                <td>
                                    <div className="ui icon buttons">
                                        <button className="ui blue basic button" onClick={fCallbackEdit.bind(null, data)}>
                                            <i className="edit outline icon"></i>
                                        </button>
                                        <button className="ui red basic button" onClick={this.deleteIbadah.bind(this, id)}><i className="trash alternate outline icon"></i></button>
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
                                <i class="plus icon"></i> Tambah Data
                            </button>
                            <div style={{ "clear": "both" }} />
                        </th>
                    </tr>
                </tfoot>
            </table>
            </div>
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
        const { id, title, description, content, updated_at } = dataFromMaster;
        let contents = []
        content.forEach((value) => {
            const { id, title, content } = value
            contents.push({ id: id, title: title, post: content })
        })
        this.setState({
            id: id,
            title: title,
            description: description,
            updated_at: updated_at,
            contents: contents
        })
        clossableMessage();
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
        const { id, title, description, contents } = this.state;
        const url = (id) ? `/api/ibadah/update/${id}` : '/api/ibadah/create';
        const methodREST = (id) ? method.PUT : method.POST;
        await handleRequestAPI(url, methodREST, {
            // object in controller Ibadah
            id: id,
            title: title,
            description: description,
            contents: contents
        })
        // calling callback from Master Component
        this.props.callbackEdit();
    }

    setValue(id, name, value) {
        if (['title', 'post'].includes(name) && id != null) {
            // make duplicate of post state
            let contents = [...this.state.contents]

            // check if title is correct
            if (name === 'title') this.validationBukuLagu(value, id+1);

            // store data that has changed, and insert back
            contents[id][name] = value
            this.setState({ contents });
        } else {
            this.setState({ [name]: value })
        }
    }

    validationBukuLagu(value, id_konten) {
        // checking if title Nyanyian is correct (only 1 title) eg: BE NO. 198 "Lorem Ipsum" BL.178 (wrong)
        
        const re = new RegExp(/\b(be|kj|bl|bn|pkj)\b.*\s*(?=\d+)[0-9](\w)/gi);
        if (value.search(re) > 0) {
            const nyanyian = value.match(re).join().replace(/[.,]/g, '').split(' ');
            if (nyanyian.length > 3) {
                // do toast
                $('body')
                    .toast({
                        title: `Title Konten ${Number(id_konten)} Bermasalah`,
                        message: 'Buku lagu yang digunakan tidak boleh duplikat',
                        displayTime: 6000,
                        showProgress: 'top',
                        classProgress: 'red'
                    })
                ;
            }
        }
    }

    removeContent(index) {
        let contents = [...this.state.contents]
        contents.splice(index, 1);
        this.setState({ contents });
    }

    render() {
        let { title, description, contents, updated_at } = this.state;
        const fCallbackEdit = this.props.callbackEdit;

        updated_at = updated_at == null ? '-' : updated_at;

        return (
            <div>
                <div className="ui info message">
                    <i className="close icon"></i>
                    <span>Terakhir diperbaharui : {updated_at}</span>
                </div>
                <form className="ui form" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <div className="field">
                        <label htmlFor="title">Judul</label>
                        <input type="text" className="title" name="title" id="title" value={title} />
                    </div>
                    <div className="field">
                        <label htmlFor="description">Deskripsi</label>
                        <input type="text" className="description" name="description" id="description" value={description} />
                    </div>

                    <Form contents={contents} removeContent={this.removeContent} />

                    <button className="ui left blue button" onClick={this.addClick.bind(this)}>Tambah</button>
                    <input type="submit" value="Simpan" className="ui positive right button" onClick={this.sendDataIbadah} />
                    <button className="ui right floated labeled icon secondary button" onClick={fCallbackEdit}><i className="angle left icon"></i>Kembali</button>
                </form>
            </div>
        )
    }
}

$(document).ready(function () {
    ReactDOM.render(<MasterIbadah />, document.getElementById("contentIbadah"));
});