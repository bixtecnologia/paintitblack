var config;

require(['config.js'], function (c) {
    config = configs;
})

/*
    This component extract the data from a second QlikSense application.

    All that is needed is to pass the app name from QlikConnection.js to this
    components props when calling it (see it in Dashboard1.js file)
*/

class GenericQlikObject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentDidMount() {
        var obj = this.props.app.getObject(this.props.objectID, this.props.qlikObjectID);
        // console.log(obj) // DEBUG the returned Qlik Object
    }

    componentWillUnmount(){
        this.props.app.destroySessionObject(this.props.qlikObjectID)
        }

    render() {

        return (<div className="native-chart qvobject" style={this.props.style} id={this.props.objectID}>
            <Loader/>
        </div>
        );

    }



}
