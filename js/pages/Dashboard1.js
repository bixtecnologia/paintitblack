class Dashboard1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hash: this.props.hash
        };
    }

    compononentDidMount() {
        
    }

    render() {

        /*
            Yes, yes I know I used fixed positioning for the elements, and that 
            changing something basic like margins is going to be a pain. Sorry,
            I'm not a frontend developer (quite the opposite, really), so excuse
            my poor CSS and UI/UX design decisions!
        */

        return (
            <div className="mashup-body">

                <div className="mashup-content" style={{height: '965px'}}>

                    <ActualVsBudget objectId='actual-vs-budget-barchart' app={this.props.appConsumerSales} style={{height: '300px', width: '1400px'}}> </ActualVsBudget>

                    <MarginBySubgroup objectId='margin-by-subgroup-piechart' app={this.props.appConsumerSales} style={{height: '400px', width: '400px'}}> </MarginBySubgroup>

                    <SalesByState objectId='sales-by-state-map' app={this.props.appConsumerSales}> </SalesByState>

                    <EURtoUSD></EURtoUSD>

                    <AvgClaimCosts objectId='avg-claim-costs-kpi' app={this.props.appInsuranceClaims}></AvgClaimCosts>

                </div>


            </div>);
    }
}