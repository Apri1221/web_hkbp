class MasterTingting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            dataTingting: []
        }
    }

    callbackEdit(dataTingting = null) {
        let boolEdit = this.state.isEdit;
        this.setState({
            isEdit: !boolEdit,
            dataTingting: dataTingting
        })
    }

    render() {
        const { isEdit, dataTingting } = this.state;
        if (isEdit) {
            return (
                <PostTingting callbackEdit={this.callbackEdit.bind(this)}
                    dataTingting={dataTingting} />)
        }
        return (
            <GetTingting callbackEdit={this.callbackEdit.bind(this)} />
        );
    }
}


class GetTingting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listDataTingting: []
        }
    }

    async getDataListTingting() {
        const listTingting = await axios.get('/api/tingting/');
        this.setState({ listDataTingting: listTingting.data });
    }

    async deleteTingting(id) {
        await axios.delete(`/api/tingting/delete/${id}`);
        this.getDataListTingting();
    }

    componentDidMount() {
        this.getDataListTingting();
    }

    render() {
        const dataTingtings = this.state.listDataTingting;
        const fCallbackEdit = this.props.callbackEdit;
        return (
            <div>
                <h1>Kelola Data Tingting</h1>
                <table className="ui compact celled table">
                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Deskripsi</th>
                            <th className="one wide">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTingtings.map(data => {
                            {/* keep eye on this */ }
                            const { id, title, content } = data;
                            return (
                                <tr>
                                    <td>{title}</td>
                                    <td>{content}</td>
                                    <td>
                                        <div className="ui icon buttons">
                                            <button className="ui blue basic button" onClick={fCallbackEdit.bind(null, data)}>
                                                <i className="edit outline icon"></i>
                                            </button>
                                            <button className="ui red basic button" onClick={this.deleteTingting.bind(this, id)}><i className="trash alternate outline icon"></i></button>
                                        </div>
                                    </td>
                                </tr>)
                        })}
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


class PostTingting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            contents: '',
            image: null,
        }

        this.onUploadImage = this.onUploadImage.bind(this);
        this.onDeleteImage = this.onDeleteImage.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    async initiateData() {
        // we get data from MasterIbadah to be edited?
        const dataFromMaster = this.props.dataTingting;
        if (!dataFromMaster.id) { return }
        // keep eye on this, look at the data JSON API
        const { id, title, content, file_attached, image } = dataFromMaster;
        // https://stackoverflow.com/questions/34485420/how-do-you-put-an-image-file-in-a-json-object
        this.setState({
            id: id,
            title: title,
            contents: content,
        })
        if (image != null) {
            $('#img-desc').val("Memuat Gambar");
            const blob_image = await fetch(image).then(r => r.blob());
            this.setStateImage(blob_image, file_attached);
        }
    }

    componentDidMount() {
        this.initiateData();
        $("input:text").click(function () {
            $(this).parent().find("input:file").click();
        });
    }

    componentDidUpdate() {
        // from parrent Dashboard html
        clossableMessage();
    }

    handleChangeInput = (e) => {
        this.setValueState(e.target.className, e.target.value);
    }

    onUploadImage(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.setStateImage(files[0]);
    }

    onDeleteImage(e) {
        e.preventDefault();
        this.setStateImage(null);
    }

    setValueState(name, value) {
        this.setState({ [name]: value })
    }

    setStateImage(file, name = null) {
        this.setState({
            image: file ? file : null
        })
        const file_name = name ? name : file ? file.name : null;
        const file_size = file ? Math.ceil(file.size / 1000) : null;
        $('#img-desc').val(file ? `${file_name} | ${file_size}KB` : null);
    }

    async sendData(e) {
        e.preventDefault();
        const { id, title, contents, image } = this.state;
        const compressedImage = await imageCompression(image);
        data.append('title', title);
        data.append('content', contents);
        data.append('image', compressedImage, image.name);
        const url = '/api/tingting/' + (id ? `update/${id}` : 'create');
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                // "Authorization" : `Bearer ${token}`}
            }
        }
        // AXIOS LARAVEL ERROR PUT REQUEST MULTIPART
        axios.post(url, data, config).then(r => console.log(r.data));
        // calling callback from Master Component
        this.props.callbackEdit();
    }

    render() {
        const { title, contents, image } = this.state;
        const fCallbackEdit = this.props.callbackEdit;
        return (
            <form className="ui form" onChange={this.handleChangeInput}>
                <div className="field">
                    <label htmlFor="title">Judul</label>
                    <input type="text" className="title" name="title" id="title" value={title} />
                </div>
                <div className="field">
                    <label htmlFor="description">Deskripsi</label>
                    <textarea className="contents" name="contents" id="contents" value={contents}></textarea>
                </div>
                <div className="field">
                    <label htmlFor="image">Lampiran Foto Sampul</label>
                    <div class="ui action input">
                        <input type="text" id="img-desc" placeholder="Klik di sini untuk upload" readonly="readonly" />
                        <input type="file" accept="image/*" name="image" id="image" onChange={this.onUploadImage} />
                        <div class="ui basic grey icon button">
                            <i class="attach icon"></i>
                        </div>
                    </div>
                </div>
                <button className="ui positive button" onClick={this.sendData}>Simpan</button>
                <button className="ui negative button" onClick={this.onDeleteImage}>Hapus</button>
                <button className="ui right floated labeled icon secondary button" onClick={fCallbackEdit}><i className="angle left icon"></i>Kembali</button>
                <div className="ui hidden divider"></div>
                <div>
                    {
                        image != null ? (<img className="ui bordered fluid image"
                            src={URL.createObjectURL(image)} />) :
                            (<div className="ui info message">
                                <i className="close icon"></i>
                                <span>Preview gambar tampil disini</span>
                            </div>)
                    }
                </div>
            </form>
        )
    }
}


$(document).ready(() => {
    ReactDOM.render(<MasterTingting />, document.getElementById("contentTingting"));
})