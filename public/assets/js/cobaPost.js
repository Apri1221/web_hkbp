const Form = (props) => {
    let { contents } = props
    return (
        contents.map((val, index) => {
            let titleID = `title-${index}`, postID = `post-${index}`
            return (
                <div key={index} className="ui segment">
                    <div class="field">
                        <label htmlFor={titleID}>{`Judul Konten #${index + 1}`}</label>
                        <input className="title" type="text" name={titleID} data-id={index} id={titleID} value={val.title} />
                    </div>

                    <div class="field">
                        <label htmlFor={postID}>{`Isi Konten #${index + 1}`}</label>
                        <textarea className="post" type="text" name={postID} data-id={index} id={postID}>{val.post}</textarea>
                    </div>
                    <input className="ui right floated negative button" type='button' value='Hapus' onClick={props.removeClick.bind(this, index)} />
                    <div style={{ "clear": "both" }} />
                </div>
            )
        }))
}

class PostIbadah extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contents: [{
                title: '',
                post: ''
            }],
            title: '',
            description: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeClick = this.removeClick.bind(this);
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

    removeClick(index) {
        let contents = [...this.state.contents]
        contents.splice(index, 1);
        this.setState({ contents });
    }

    render() {
        let { title, description, contents } = this.state;

        return (
            <div>
                <form className="ui form" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <div class="field">
                        <label htmlFor="title">Judul</label>
                        <input type="text" className="title" name="title" id="title" value={title} />
                    </div>
                    <div class="field">
                        <label htmlFor="description">Deskripsi</label>
                        <input type="text" className="description" name="description" id="description" value={description} />
                    </div>

                    {<Form contents={contents} removeClick={this.removeClick} />}

                    <button className="ui left floated primary button" onClick={this.addClick.bind(this)}>Tambah</button>
                    <input type="submit" value="Simpan" className="ui positive button" />
                </form>
            </div>
        )
    }
}

$(document).ready(function () {
    ReactDOM.render(<PostIbadah />, document.getElementById("contentIbadah"));
});