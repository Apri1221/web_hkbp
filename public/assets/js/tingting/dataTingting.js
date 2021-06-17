class AllTingting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tingtings: []
        }
    }

    async getAllDataTingting() {
        // provide API untuk tampilin semua tingting
        const dataTingting = await handleRequestAPI(`/api/tingting/`, method.GET);
        this.setState({
            tingtings: dataTingting
        })
        console.log(this.state.tingtings)
    }

    componentDidMount() {
        this.getAllDataTingting();
    }

    render() {
        const { tingtings } = this.state;
        const regexTagHtml = /<.+?>/g;
        return (
            <div class="ui two doubling horizontal cards">
                {
                    tingtings.map(tingting => {
                        const { id, image, title, updated_at, content } = tingting;
                        const contentTingting = content.replace(regexTagHtml, '');
                        return (
                            <div class="card">
                                {
                                    image != null ? (
                                        <div class="image"
                                            style={{
                                                backgroundColor: `#fff`,
                                                'background-position': '50% 50%',
                                                'background-size': 'cover'
                                            }}>
                                            <img style={{'height': '150px', 'object-fit': 'cover', 'object-position': 'center'}} 
                                                src={image} 
                                                onError="this.onerror=null; this.src='https://fomantic-ui.com/images/wireframe/image.png';"
                                            />
                                        </div>) 
                                        : (<div></div>)    
                                }
                                <div class="content">
                                    <div class="header">{title}</div>
                                    <div class="meta">
                                        <a>{updated_at}</a>
                                    </div>
                                    <div class="description" 
                                        style={{'display': '-webkit-box', '-webkit-line-clamp': '3', '-webkit-box-orient': 'vertical', 'overflow': 'hidden'}}>
                                        {contentTingting}
                                    </div>
                                </div>
                                <div class="extra content">
                                    <a class="ui primary right floated right labeled icon button" href={`/article/${id}`} rel="noopener noreferrer">Lihat<i class="right chevron icon"></i></a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
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
        const dataTingting = await handleRequestAPI(`/api/tingting/${id}`, method.GET);

        const { title, image, content, updated_at } = dataTingting[0];
        this.setState({
            title: title,
            content: content,
            image: image,
            updated_at: updated_at
        })
    }

    componentDidMount() {
        if (this.state.id != null) {
            this.getDataTingting(this.state.id);
        }
    }

    render() {
        const { title, content, image, updated_at } = this.state;
        const regexTagHtml = /<.+?>/g;
        return (
            <div>
                <img style={{
                    backgroundImage: `url("https://fomantic-ui.com/images/wireframe/image.png")`,
                    'background-position': '50% 50%',
                    'background-size': 'cover'
                }} className="ui fluid raised image" src={image} alt={title} />
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
                    {
                        regexTagHtml.test(content) 
                            ? <div dangerouslySetInnerHTML={{__html: content}}></div> 
                            : <div class="description" style={{'display': '-webkit-box', '-webkit-line-clamp': '3', '-webkit-box-orient': 'vertical', 'overflow': 'hidden'}}>{content}</div>
                    }
                </div>
            </div>
        )
    }
}

$(document).ready(() => {
    var id = $("#contentTingting").attr('tingting-id');
    if (id != '') {
        ReactDOM.render(<DataTingting idTingting={id} />, document.getElementById("contentTingting"));
    } else {
        ReactDOM.render(<AllTingting />, document.getElementById("contentTingting"));
    }
})