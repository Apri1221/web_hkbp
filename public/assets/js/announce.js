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
            autoplaySpeed: 5000,
            asNavFor: '.slider-nav'
        });

        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            centerMode: true,
            focusOnSelect: true,
            mobileFirst: true,
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
                <div class="slider slider-for">
                    <div className="section">
                        <img src={"https://cdn.dribbble.com/users/414899/screenshots/10761442/media/df3f331b7850f1deb1504106d7060577.png"} className="content-slider img-slider"/>
                    </div>
                    <div className="section">
                        <img src={"https://cdn.dribbble.com/users/1151383/screenshots/3934256/quadedu_shot-small.png"} className="content-slider img-slider"/>
                    </div>
                </div>
                <div class="slider slider-nav">
                    {/* Must be looping as much as slider-for */}
                    <div>
                        <h3 className="content-slider"><span>1</span></h3>
                    </div>
                    <div>
                        <h3 className="content-slider"><span>1</span></h3>
                    </div>
                </div>
            </div>
        )
    }
}

$(document).ready(function () {
    ReactDOM.render(<Announcement />, document.getElementById("announcement"));
});