var config;

require(['config.js'], function (c) {
    config = configs;
});

/*
    This class is responsible for managing the connection to all QlikSense 
    applications used in the mashup template. There is no need to change the
    connection parameters, even in PRD, since we are already getting the URL
    of the window. 

    When in DEV (QlikSense Desktop): the openApp() method should contain the 
    application's file name exactly (for instance: "Consumer Sales.qvf").

    When in PRD (QlikSense Enterprise): the openApp() method should be the
    app's ID (for instance "15f8fed9-afd7-4450-8725-19b30ad15308").

    When adding/removing apps, do NOT forget to take them in/out in the 
    onMessage() method at the end of this file, and also reflect the changes
    in App.js (wait for them to load and pass them in props).

    Paint It Black! has been tested while connected to 10 different apps in 
    DEV and PRD envs and the performance was perfectly satisfactory, just FYI.
*/

class QlikConnection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.createConnection();
    }

    createConnection() {

        var connConfig = {
            host: window.location.hostname,
            prefix: "/",
            port: window.location.port,
            isSecure: window.location.protocol === "https:"
        };
        require.config({
            baseUrl: (connConfig.isSecure ? "https://" : "http://") + connConfig.host + (connConfig.port ? ":" + connConfig.port : "") + connConfig.prefix + "resources",
            waitSeconds: 0,
        });


        require(["js/qlik"], (qlik) => {

            if (config.environment === 'DEV') {
                // Open app Consumer Sales DEV
                var appConsumerSales = qlik.openApp(config.devQvfNames.ConsumerSales, connConfig)

                // Open app Insurance Claims DEV
                var appInsuranceClaims = qlik.openApp(config.devQvfNames.InsuranceClaims, connConfig)

            }
            else if (config.environment === 'PRD') {
                // Open app Consumer Sales PRD
                var appConsumerSales = qlik.openApp(config.prdQvfNames.ConsumerSales, connConfig)

                // Open app Insurance Claims PRD
                var appInsuranceClaims = qlik.openApp(config.prdQvfNames.InsuranceClaims, connConfig)

            }

            // Update when onMessage received
            this.props.onMessage({
                appConsumerSales: appConsumerSales,
                appInsuranceClaims: appInsuranceClaims,
            })
        })
    }

    render() {
        return <span />;
    }
}