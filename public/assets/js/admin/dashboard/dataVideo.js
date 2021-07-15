class MasterVideo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            dataVideo: []
        }
    }

    callbackEdit(dataVideo = null) {
        let boolEdit = this.state.isEdit;
        this.setState({
            isEdit: !boolEdit,
            dataVideo: dataVideo
        })
    }

    render() {
        const { isEdit, dataVideo } = this.state;
        if (isEdit) {
            return (
                <PostVideo callbackEdit={this.callbackEdit.bind(this)}
                    dataVideo={dataVideo} />)
        }
        return (
            <GetVideo callbackEdit={this.callbackEdit.bind(this)} />
        );
    }
}


class GetVideo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listDataVideo: []
        }
    }

    async getDataListVideo() {
        const listVideo = await axios.get('/api/video/');
        this.setState({ listDataVideo: listVideo.data });
    }

    async deleteVideo(id) {
        await axios.delete(`/api/video/delete/${id}`);
        this.getDataListVideo();
    }

    componentDidMount() {
        this.getDataListVideo();
    }

    render() {
        const dataVideos = this.state.listDataVideo;
        const fCallbackEdit = this.props.callbackEdit;
        return (
            <div>
                <h1>Kelola Data Video</h1>
                <table className="ui compact celled table">
                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Deskripsi</th>
                            <th className="one wide">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataVideos.map(data => {
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
                                            <button className="ui red basic button" onClick={this.deleteVideo.bind(this, id)}><i className="trash alternate outline icon"></i></button>
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


class PostVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            url: null,
        }

        this.sendData = this.sendData.bind(this);
    }

    async initiateData() {
        // we get data from MasterVideo to be edited?
        const dataFromMaster = this.props.dataVideo;
        if (!dataFromMaster.id) { return }
        const { id, title, description, url } = dataFromMaster;
        
        this.setState({
            id: id,
            title: title,
            description: description,
            url: url,
        })
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

    onDeleteImage(e) {
        e.preventDefault();
        this.setStateImage(null);
    }

    setValueState(name, value) {
        this.setState({ [name]: value });
    }

    
    async sendData(e) {
        e.preventDefault();
        const { id, title, description, url } = this.state;
        

        let data = new FormData();
        data.append('title', title);
        data.append('description', description);
        data.append('url', url);
        const link = '/api/video/' + (id ? `update/${id}` : 'create');

        axios.post(link, data).then(r => console.log(r.data));
        // calling callback from Master Component
        this.props.callbackEdit();
    }

    render() {
        const { title, description, url } = this.state;
        const fCallbackEdit = this.props.callbackEdit;
        return (
            <form className="ui form" onChange={this.handleChangeInput}>
                <div className="field">
                    <label htmlFor="title">Judul</label>
                    <input type="text" className="title" name="title" id="title" value={title} />
                </div>
                <div className="field">
                    <label htmlFor="description">Deskripsi</label>
                    <textarea className="description" name="description" id="description" value={description}></textarea>
                </div>

                <div className="field">
                    <label htmlFor="url">Alamat / URL</label>
                    <input type="text" className="url" name="url" id="url" value={url} />
                </div>
                
                <button className="ui positive button" onClick={this.sendData}>Simpan</button>
                <button className="ui right floated labeled icon secondary button" onClick={fCallbackEdit}><i className="angle left icon"></i>Kembali</button>
                <div className="ui hidden divider"></div>
            </form>
        )
    }
}


$(document).ready(() => {
    ReactDOM.render(<MasterVideo />, document.getElementById("contentVideo"));
})