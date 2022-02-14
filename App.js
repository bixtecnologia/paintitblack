'use strict';
require(['config.js'], async (c) => { })

var browserHistory = ReactRouter.browserHistory;


class App extends React.Component {

    constructor(props) {
        super(props);
        var hash = browserHistory.getCurrentLocation().hash;
        this.state = {
            isLoading: true,
            hash: ''
        };
    }

    componentDidMount() {
        // Pagination control: for different menus/pages we have a #pageName format.
        // This sets the state to current hash whenever it changes
        browserHistory.listen((resp) => this.setState({ hash: resp.hash }));

    }

    // Useful for logging Qlik connection data. Sets state with connection info.
    // You can see this by using console.log(this.state) somewhere in render().
    qlikConnectionSuccess(state) {
        this.setState(state);
    }


    render() {
        // Set page to loading page while page is loading, then set null
        var page = this.state.isLoading ? <div className="loader-container"> <Loader/> </div> : null

        // Only draw the page once all Qlik Apps are fully loaded, and they are present in the state object.
        if (this.state.appInsuranceClaims && this.state.appConsumerSales) {

            var hash = this.state.hash;

            if (this.state.isLoading) {
                this.setState({ isLoading: false });
            }

            // Controls which page will load based on current hash
            switch (hash) {
                case '#LandingPage': page = <LandingPage appInsuranceClaims={this.state.appInsuranceClaims} appConsumerSales={this.state.appConsumerSales} hash={this.state.hash} />
                    break;

                case '#Dashboard1': page = <Dashboard1 appInsuranceClaims={this.state.appInsuranceClaims} appConsumerSales={this.state.appConsumerSales} hash={this.state.hash} />
                    break;

                case '#Dashboard2': page = <Dashboard2 appInsuranceClaims={this.state.appInsuranceClaims} appConsumerSales={this.state.appConsumerSales} hash={this.state.hash} />
                    break;

                case '#Fullscreen1': page = <FullscreenTV appInsuranceClaims={this.state.appInsuranceClaims} appConsumerSales={this.state.appConsumerSales} hash={this.state.hash} />
                    break;

                case '#Documentation': page = <Documentation appInsuranceClaims={this.state.appInsuranceClaims} appConsumerSales={this.state.appConsumerSales} hash={this.state.hash} />
                    break;

                case '#Settings': page = <SettingsPage appInsuranceClaims={this.state.appInsuranceClaims} appConsumerSales={this.state.appConsumerSales} hash={this.state.hash} />
                    break;

                default: 
                    page = <LandingPage appInsuranceClaims={this.state.appInsuranceClaims} appConsumerSales={this.state.appConsumerSales} hash={this.state.hash} />;
            }

            var side = <SideBar hash={this.state.hash} />
            var nav =  <NavBar appInsuranceClaims={this.state.appInsuranceClaims} appConsumerSales={this.state.appConsumerSales} hash={this.state.hash} />

        }
        else {
            if (this.state.errorMessage) {
                mashup = <span>{this.state.errorMessage}</span>;
            }
        }

        return (
            <div>
                <div className="content">
                    <QlikConnection onMessage={this.qlikConnectionSuccess.bind(this)}></QlikConnection>
                    {side}
                    {nav}
                    {page}
                </div>
            </div>
        )
    }
}

// Initialize React DOM
const DOMContainer = document.querySelector('#mashup-container');
ReactDOM.render(<App />, DOMContainer);

var areMenusShown = true;
// Listen for presses of ESC key and toggle navigation display when depressed
document.body.addEventListener('keyup', (e) => {
    if (e.key === "Escape") {
        if (areMenusShown) {
            sidebar.style.display = 'none';
            navbar.style.display = 'none';
        }
        else {
            sidebar.style.display = '';
            navbar.style.display = '';
        }
        areMenusShown = !areMenusShown
    }
})


