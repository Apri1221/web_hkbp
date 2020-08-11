// enums
const method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

const handleRequestAPI = (url, method, data = undefined) => {
    if (!url) return; // guard clause
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

class DataTingting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.idTingting,
            title: '',
            content: '',
            image: null,
            updated_at: null,
        }
    }

    async getDataTingting(id) {
        const dataIbadah = await handleRequestAPI(`/api/tingting/${id}`, method.GET);
        
        const {title, image, content, updated_at} = dataIbadah[0];
        this.setState({
            title: title,
            content: content,
            image: image,
            updated_at: updated_at
        })
        console.log(this.state)
    }

    componentDidMount() {
        this.getDataTingting(this.state.id);
    }

    render() {
        console.log(this.state)
        const {title, content, image, updated_at} = this.state;
        return (
            <div>
                <img className="ui centered fluid image" src={image} />
                <div className="ui divider"></div>
                <h1 className="header">{title}</h1>
                <div className="ui circular labels">
                    <div class="ui label">Diperbaharui
                        <div class="detail">{updated_at}</div>
                    </div>
                    {/* in the future, admin - posts relation must be change */}
                    <span className="ui label">Admin</span>
                </div>
                <div className="ui basic segment">
                    <p>{content}</p>
                </div>
            </div>
        )
    }
}

$(document).ready(() => {
    var id = $("#contentTingting").attr('tingting-id');
    console.log(id)
    ReactDOM.render(<DataTingting idTingting={id} />, document.getElementById("contentTingting"));
})