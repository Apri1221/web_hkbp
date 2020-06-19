class Announcement extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            // dots: true,
            centerMode: true,
            focusOnSelect: true
        });
    }

    async handleRequestAPI(url, method, data = undefined) {
        if (!url) return; // guard claue
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(result => {
            if (result.status === 200) { return result.json() }
        }).catch(error => console.log(error));
    }

    render() {
        return (
            <div className="section blue">
                <div class="slider slider-for">
                    {/* Must be looping as much as slider-for */}
                    <div>
                        <h3 className="content-custom">1</h3>
                    </div>
                    <div>
                        <h3 className="content-custom">2</h3>
                    </div>
                </div>
                <div class="slider slider-nav">
                    {/* Must be looping as much as slider-for */}
                    <div>
                        <h3 className="content-custom"><span>1</span></h3>
                    </div>
                    <div>
                        <h3 className="content-custom"><span>1</span></h3>
                    </div>
                </div>
            </div>
        )
    }
}

$(document).ready(function () {
    ReactDOM.render(<Announcement />, document.getElementById("announcement"));
});