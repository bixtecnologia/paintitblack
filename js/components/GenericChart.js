/*
    GenericChart is used to instantiate every ECharts object in the mashup.
    Unless you really want to change its behavior, this class does not need
    changing. You can uncomment the // DEBUG line in this file to debug
    ECharts by clicking on any charts and watching the console.
*/

class GenericChart extends React.Component {

	constructor(props){
		super(props);
		this.state = {};
		this.chart = {};
        this.id = "id_" + new Date().getTime() + (Math.random() * 100).toFixed(0);
	}

	componentDidMount(){
		window.addEventListener("resize", this.updateDimensions.bind(this));

		this.renderChart();
    }
    
	componentDidUpdate(prevProps, nextProps){
		this.updateChart();
    }
    
  	componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
	}
	
	updateChart(){
		if(this.state.myChart){
			this.state.myChart.setOption(this.props.options, {notMerge: true});
		}
	}

    updateDimensions(){
		this.state.myChart.resize();
	}

	renderChart(){
		var element = document.getElementById(this.id);
		if(element){
			var myChart = echarts.init(element);
			myChart.setOption(this.props.options);
			this.setState({myChart: myChart})
			myChart.on('click', (params) => {
				if(this.props.app){
					this.props.app.field(params.seriesName).selectMatch(params.name)
				}
                // console.log(params) // DEBUG 
			});
		}
	}

	render() {       
		var style = this.props.style;

        return <div id={this.id} style={style}></div>;
  }
}
