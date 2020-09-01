const Slider = (props) => {
    const dataSlide = props.data;
    return (
        <div className="ui basic segment">
            <div className="slider slider-tingting">
                {dataSlide.map(data => {
                    const {id, title, image} = data;
                    return(
                        <div className="content slide">
                            <img src={image} alt={title}/>
                            <div className="slide-description">
                                <span>{title}</span>
                                <a className="header" href={`/article/${id}`} >selengkapnya</a>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div class="slider slider-nav">
                {dataSlide.map((e,i) => {
                    return(
                        <div>
                            <h3 className="content-slider">{i+1}</h3>
                        </div>
                    )
                })}
            </div>
            <div className="ui fitted divider"></div>
        </div>
    )
}

const List = (props) => {
    const dataList = props.data;
    return (
        <div className="ui basic segment">
            <div className="ui top left attached red label">Terbaru</div>
            <div className="ui bottom aligned selection list">
                {dataList.map(data => {
                    const {id, title, created_at} = data
                    return(
                        <a className="ui feed item" href={`/article/${id}`}>
                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        {title}<span className="date">{created_at}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    )
                })}
                <div className="ui fitted divider"></div>
                <a className="ui feed item" href="">
                    <div className="content">
                        <div className="summary">
                            Lihat tingting lebih banyak lagi di sini.
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}


class Tingting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            slide: null,
            list: null
        }
    }

    initateSlick() {
        $('.slider-tingting').slick({
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
            asNavFor: '.slider-tingting'
        });
    }

    async componentDidMount() {
        const qS = $.param({ 'limit': 10, 'image': true });
        const qL = $.param({ 'limit': 10 });
        const slide = await handleRequestAPI(`/api/tingting?${qS}`, method.GET);
        const list = await handleRequestAPI(`/api/tingting?${qL}`, method.GET);
        this.setState({slide: slide, list: list})
        this.initateSlick();
    }

    render() {
        const {slide, list} = this.state;
        if (!slide || !list) return (<div className="ui active centered inline loader"></div>);
        else return (
            <div>
                <Slider data={slide}/>
                <List data={list}/>
            </div>
        );
    }
}

$(document).ready(function () {
    ReactDOM.render(<Tingting />, document.getElementById("bannerTingting"));
});