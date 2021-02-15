class TestPage extends React.Component {
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <div>
                <h1>Hello World!</h1>
                <p>123123hellohello</p>
            </div>
        )
    }
}


$(document).ready(function () {
    ReactDOM.render(<TestPage />, document.getElementById("testPage"));
});

