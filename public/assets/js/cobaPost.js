const Form = (props) => {
    let { contents } = props
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
                        <textarea className="post" type="text" name={postID} data-id={index} id={postID}>{val.post}</textarea>
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
            data: []
        }
    }

    callbackEdit(dataIbadah = null) {
        let boolEdit = this.state.isEdit;
        this.setState({
            isEdit : !boolEdit,
            data: dataIbadah
        })
    }

    render() {
        return (
            <div> 
                { (this.state.isEdit) ? <PostIbadah callbackEdit={this.callbackEdit.bind(this)}/> : <GetIbadah callbackEdit={this.callbackEdit.bind(this)}/> }
            </div>
        );
    }
}


class GetIbadah extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            title: '',
            description: ''
        }
    }

    getDataFromApi() {
        // future function, store it to state
    }

    render() {
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
                    <tr>
                        <td>Tata Ibadah 28 Juni 2020</td>
                        <td>Ini deskripsi</td>
                        <td>
                            <div className="ui icon buttons">
                                <button className="ui blue basic button" onClick={this.props.callbackEdit}>
                                    <i className="edit outline icon"></i>
                                </button>
                                <a className="ui red basic button" href=""><i className="trash alternate outline icon"></i></a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}


class PostIbadah extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            title: '',
            description: '',
            contents: [{
                title: '',
                post: ''
            }]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeContent = this.removeContent.bind(this);
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
        console.log(e.target.dataset.id, e.target.className, e.target.value)
        this.setValue(e.target.dataset.id, e.target.className, e.target.value)
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
                    <input type="submit" value="Simpan" className="ui positive button"/>
                    <button className="ui right floated secondary button" onClick={this.props.callbackEdit}>Kembali</button>
                </form>
            </div>
        )
    }
}

$(document).ready(function () {
    ReactDOM.render(<MasterIbadah />, document.getElementById("contentIbadah"));
});