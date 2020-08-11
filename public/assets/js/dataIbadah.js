// enums
const method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

class ContentIbadah extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            title: '',
            description: '',
            contents: [{
                id: '',
                title: '',
                post: ''
            }]
        }
    }

    handleRequestAPI(url, method, data = undefined) {
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

    async getDataIbadah(id) {
        const dataIbadah = await this.handleRequestAPI(`/api/ibadah/${id}`, method.GET);
        dataIbadah.forEach(element =>{
            // keep eye on this, look at the data JSON API
            const {id, title, description, content} = element;
            let contents = []
            content.forEach((value) => {
                const {id, title, content} = value;
                contents.push({id: id, title: title, post: content})
            })
            this.setState({
                id: id,
                title: title,
                description: description,
                contents: contents
            })
        })
    }

    componentDidMount() {
        this.getDataIbadah(this.props.idIbadah);
    }

    componentDidUpdate() {
        animateFadeIn('.ui.segment');
    }

    render() {
        const {title, description, contents} = this.state;
        return(
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <div className="ui divider huge"></div>
                <div className="ui stackable grid">
                    <div className="sixteen wide column">
                        <div className="hiddenGSAP">
                            {contents.map(element => {
                                const {title, post} = element
                                return(
                                    <div className="ui raised segment" style={{ "margin-bottom": "2.5em"}}>
                                        <h4 className="ui sub header">{title}</h4>
                                        <br></br>
                                        <p className="textIbadah">{post}</p>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>)
    }
}

$(document).ready(() => {
    var id = $("#contentIbadah").attr('post-id');
    ReactDOM.render(<ContentIbadah idIbadah={id} />, document.getElementById("contentIbadah"));
})