class Music extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            musicList: [
                {
                    name: "",
                    singer: "",
                    cover: "",
                    musicSrc: "",
                }
            ],
        }
    }

    componentDidMount() {
        this.setState({
            musicList: this.props.musicList
        })
    }

    componentWillUnmount() {
        this.setState({
            musicList: this.props.musicList
        })
    }

    render() {
        const { musicList } = this.state;
        const currentSong = musicList[0];
        if (currentSong == undefined) {
            return (
                <div className="card-music">
                    <div className="ui basic segment">
                        <h3>Tidak ada daftar lagu</h3>
                    </div>
                </div>    
            );
        }
        const options = {
            audioLists: musicList,
            autoPlay: false,
            autoPlayInitLoadPlayList: false,
            glassBg: true,
            showDownload: false,
            showThemeSwitch: false,
            showMediaSession: true,
            showDestroy: false,
            showReload: false,
            showPlayMode: false,
            remove: false,
            toggleMode:false,
            mode: 'full',
            responsive: false,
            showLyric: false,
            // audio play handle
            onAudioPlay(audioInfo) {
                sendData(audioInfo.name);
            },
        }
        
        return (
            <ReactJkMusicPlayer
                {...options}
                mobileMediaQuery="(max-width: 1024px)"
                quietUpdate
                clearPriorAudioLists
            />
        )
    }
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
            }],
            musicList: [],
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
        }).catch(error => sendCrashReport(error, url));
    }

    async getDataIbadah(id_ibadah) {
        const dataIbadah = await this.handleRequestAPI(`/api/ibadah/${id_ibadah}`, method.GET);
        // keep eye on this, look at the data JSON API
        const { id, title, description, content } = dataIbadah[0];
        let contents = []
        content.forEach((value) => {
            const { id, title, content } = value;
            contents.push({ id: id, title: title, post: content });
            this.getMusicList(title + content);
        })
        this.setState({
            id: id,
            title: title,
            description: description,
            contents: contents
        })
    }

    async getMusicList(content) {
        const re = new RegExp(/\b(be|kj|bl|bn|pkj)\b.*\s*(?=\d+)[0-9](\w)/gi);

        // https://files.alkitab.app/addon/audio/songs/v2/BE_1.mid
        if (content.search(re) > 0) {
            for (const item of content.match(re)) {
                const nyanyian = item.replace(/[.,]/g, '').split(' ');
                if (nyanyian.length > 3) continue
                const buku = nyanyian[0];
                const nomor = nyanyian[2];
                
                const is_already = this.state.musicList.some(e => e['name'] == nyanyian)
                const url = `/assets/musics/${buku}_${nomor}.mp3`;

                if(is_already || buku == undefined || nomor == undefined) continue;
                this.state.musicList.push({
                    name: item,
                    singer: null,
                    cover: 'https://www.bensound.com/bensound-img/buddy.jpg',
                    musicSrc: url,
                })
            }
        }
    }

    componentDidMount() {
        this.getDataIbadah(this.props.idIbadah);
    }

    componentDidUpdate() {
        animateFadeIn('.ui.segment');
    }

    render() {
        const { title, description, contents, musicList } = this.state;

        return (
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <div className="ui divider huge"></div>
                <div className="ui very relaxed stackable grid">
                    <div className="twelve wide column">
                        {contents.map(element => {
                            const { title, post } = element
                            return (
                                <div className="hiddenGSAP">
                                    <div className="ui raised segment" style={{ "margin-bottom": "3em" }}>
                                        <h4 className="ui sub header">{title}</h4>
                                        <br></br>
                                        <p className="textIbadah">{post}</p>
                                    </div>
                                </div>)
                        })}
                    </div>
                    <Music musicList={musicList} />
                    
                </div>
            </div>)
    }
}

$(document).ready(() => {
    var id = $("#contentIbadah").attr('post-id');
    ReactDOM.render(<ContentIbadah idIbadah={id} />, document.getElementById("contentIbadah"));
})