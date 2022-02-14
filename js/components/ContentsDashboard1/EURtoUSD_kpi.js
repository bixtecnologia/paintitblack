var config;

require(['config.js'], function (c) {
    config = configs;
})

/*
    This component is not linked to QlikSense at all, but is instead a simple
    KPI card that extracts data from an open currency API.

    Let's bring the current value of the EUR/USD currency pair.
*/

class EURtoUSD extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,

            EURUSD: 0,
            changeEURUSD: '',
            colorEURUSD: ''
        };
    }

    getCurrencyDataEUR_USD() {
        return fetch('https://economia.awesomeapi.com.br/last/EUR-USD')

            .then(APIresponse => {

                // If request returns anything other than 200 (success), raise error
                if (APIresponse.status >= 400) {
                    throw new Error(`Paint It Black! warns: request failed with status ${APIresponse.status}`);
                }
                return APIresponse.json()
            })

            .then(APIdata => {
                // console.log(APIdata) // DEBUG data returned from API
                var value = [APIdata.EURUSD.ask, APIdata.EURUSD.pctChange]
                return value
            })

            .then(value => {  
                value[0] = value[0].substring(0,5);
                value[1] = value[1].substring(0,4); 

                // Display the pctChange as green if positive, and add an arrow up. Vice-versa when negative
                var color;
                if (value[1] >= 0) {
                    color = config.Dashboard1.EURUSD_upchange_color
                    value[1] = '▲ ' + value[1]
                }
                else {
                    color = config.Dashboard1.EURUSD_downchange_color
                    value[1] = '▼ ' + value[1]
                }

                this.setState({
                    EURUSD: value[0],
                    changeEURUSD: value[1],
                    colorEURUSD: color
                });

            });


    }

    componentDidMount = async () => {
        await this.getCurrencyDataEUR_USD();

        // Set an interval of XX seconds to fetch the most recent data. This triggers a render of the component
        // without refreshing the page! Yay for React!
        setInterval( async() => {
            // console.log('Fetching EUR/USD');
            await this.getCurrencyDataEUR_USD();
        }, config.Dashboard1.EURUSD_repeat_delay*1000)
    }

    render() {

        return (
            <div className='element-container' style={{ position: 'absolute', top: '481px', left: '1491px', height: '232px', width: '420px'}}>

                <div className='kpi-card-container'> 


                    <p className='kpi-card-title'>💰 EUR/USD:</p>

                    <p className='kpi-card-content' style={{ left: '34%' }}> {this.state.EURUSD} |</p>
                    <p className='kpi-card-content' style={{ left: '66%', color: this.state.colorEURUSD }}> {this.state.changeEURUSD}% </p>

                </div>

            </div>
        );

    }



}
