const Slider = (props) => {
    return (
        <div className="ui basic segment">
            <div className="slider slider-for">
                <div className="content slide">
                    <img src={"https://cdn.dribbble.com/users/414899/screenshots/10761442/media/df3f331b7850f1deb1504106d7060577.png"} className="ui centered fluid image" />
                    <div className="slide-description">
                        <span>Buck Homebrew Stayaway</span>
                        <a className="header" href="/article">selengkapnya</a>
                    </div>
                </div>
                <div className="content slide">
                    <img src={"https://cdn.dribbble.com/users/1151383/screenshots/3934256/quadedu_shot-small.png"} className="ui centered fluid image" />
                    <div className="slide-description">
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, fugiat, eos dolorum tempora ratione odit ipsa quidem incidunt tenetur deserunt ullam adipisci facilis velit iure ipsam facere amet quia? Nostrum.</span>
                        <a className="header" href="/article">selengkapnya</a>
                    </div>
                </div>
            </div>
            <div class="slider slider-nav">
                {/* Must be looping as much as slider-for */}
                <div>
                    <h3 className="content-slider"><span>1</span></h3>
                </div>
                <div>
                    <h3 className="content-slider"><span>2</span></h3>
                </div>
            </div>
        </div>
    )
}

const List = (props) => {
    return (
        <div className="ui bottom aligned selection list">
            <a className="ui feed item" href="">
                <div className="event">
                    <div className="content">
                        <a className="ui header">Daniel Louise </a>
                        <div className="summary">
                            You added Jenny Hess to your coworker group.
                            <span className="date">3 days ago</span>
                        </div>
                    </div>
                </div>
            </a>
            <a className="ui feed item" href="">
                <a class="ui tiny red ribbon label">baru</a>
                <div className="event">
                    <div className="content">
                        <a className="ui header">Daniel Louise </a>
                        <div className="summary">
                            You added Jenny Hess to your coworker group.
                            <span className="date">3 days ago</span>
                        </div>
                    </div>
                </div>
            </a>
            <a className="ui feed item" href="">
                <div className="event">
                    <div className="content">
                        <a className="ui header">Daniel Louise </a>
                        <div className="summary">
                            You added Jenny Hess to your coworker group.
                            <span className="date">3 days ago</span>
                        </div>
                    </div>
                </div>
            </a>
            <a className="ui feed item" href="">
                <div className="content">
                    <div className="summary">
                        Lihat tingting lebih banyak lagi di sini.
                    </div>
                </div>
            </a>
        </div>
    )
}


class Announcement extends React.Component {
    constructor(props) {
        super(props)
    }

    initateSlick() {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            autoplay: true,
            autoplaySpeed: 4000,
            asNavFor: '.slider-nav'
        });

        $('.slider-nav').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            centerMode: true,
            focusOnSelect: true,
            asNavFor: '.slider-for'
        });
    }

    componentDidMount() {
        this.initateSlick();
    }


    async handleRequestAPI(url, method, data = undefined) {
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

    render() {
        return (
            <div>
                <Slider />
                <div className="ui fitted divider"></div>
                <List />
            </div>
        );
    }
}

$(document).ready(function () {
    ReactDOM.render(<Announcement />, document.getElementById("announcement"));
});