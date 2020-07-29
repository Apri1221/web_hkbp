{/* <div class="ui form">
    <div class="field">
        <input type="text" name="first-name" placeholder="First name">
                    </div>
        <div class="field">
            <textarea placeholder="Some example text..."></textarea>
        </div>
    </div> */}


// enums
const method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

class ContentTingting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            success: false,
            error: false,
        }

        this.fileUpload = this.fileUpload.bind(this)
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    }

    createImage(file) {
        this.setState({
            image: URL.createObjectURL(file)
        })
    }

    async fileUpload() {
        const values = this.state.image;

        await axios.post('http://localhost:8000/api/tingting/create', values,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // "Authorization" : `Bearer ${token}`}
                }
            }).then((res) => {
                if (res.data == '1') {
                    this.setState({ success: true });
                } else {
                    this.setState({ error: true })
                }
            }).catch((e) => console.log(e))
    }

    render() {
        const { image } = this.state;
        return (
            <form onSubmit={this.onFormSubmit} encType="multipart/form-data" className="ui form">
                <h1>Kelola Tingting</h1>
                <input type="file" onChange={this.onChange} />
                <div className="ui hidden divider"></div>
                <div>
                    {
                        image ? (<img className="add_image" name="add_image" src={image} />) : ('Preview Image')
                    }
                </div>
            </form>
        )
    }
}

$(document).ready(() => {
    ReactDOM.render(<ContentTingting />, document.getElementById("contentTingting"));
})