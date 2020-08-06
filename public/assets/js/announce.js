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
            slidesToShow: 3,
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
            <div className="ui basic segment">
                <div className="slider slider-for">
                    <div className="content slide">
                        <img src={"https://cdn.dribbble.com/users/414899/screenshots/10761442/media/df3f331b7850f1deb1504106d7060577.png"} className="ui centered fluid image" />
                        <div className="slide-description">
                            <span>Buck's Homebrew Stayaway</span>
                            <a className="header" href="">selengkapnya</a>
                        </div>
                    </div>
                    <div className="content slide">
                        <img src={"https://cdn.dribbble.com/users/1151383/screenshots/3934256/quadedu_shot-small.png"} className="ui centered fluid image" />
                        <div className="slide-description">
                            <span>Arrowhead Valley Camp Ragnarok</span>
                            <a className="header" href="">selengkapnya</a>
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
        );
    }
}

$(document).ready(function () {
    ReactDOM.render(<Announcement />, document.getElementById("announcement"));
});