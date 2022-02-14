var config;

require(['config.js'], function (c) {
    config = configs;
})

/*
    In this example, we'll be building a piechart similar to the one in the
    Consumer Sales app in the "KPI Dashboard" tab (the piechart is called
    "By Product Sub Group"). However, we will only the taking the data from Qlik,
    and the entire chart will be built using ECharts.

    First we define the hypercube to pass to the createCube() method (see docs:
    https://help.qlik.com/en-US/sense-developer/November2021/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/AppAPI/createCube-method.htm)

    You can also get a hypercube using the options/developer URL 
    (Google "Qlik options developer") on the object you want the cube and 
    extract the data inside the Properties tab, especially qDimensions 
    and qMeasures.

    Then we parse the data and initialize the ECharts object with the 
    GenericChart class (see GenericChart.js file).

    ECharts documentation: https://echarts.apache.org/en/option.html
*/

class MarginBySubgroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    hypercube = {
        "qInitialDataFetch": [
            {
                "qHeight": 5, // We can limit the data fetching to only XX entries here with qHeight and qWidth
                "qWidth": 2
            }
        ],
        "qDimensions": [
            {
                "qLibraryId": "",
                "qDef": {
                    "qGrouping": "N",
                    "qFieldDefs": [
                        "Product Group Desc"
                    ],
                    "qFieldLabels": [
                        "Product Group"
                    ],
                    "qSortCriterias": [
                        {
                            "qSortByState": 0,
                            "qSortByFrequency": 0,
                            "qSortByNumeric": 0,
                            "qSortByAscii": 1,
                            "qSortByLoadOrder": 1,
                            "qSortByExpression": 0,
                            "qExpression": {
                                "qv": ""
                            },
                            "qSortByGreyness": 0
                        }
                    ],
                    "qNumberPresentations": [],
                    "qReverseSort": false,
                    "qActiveField": 0,
                    "qLabelExpression": "",
                    "autoSort": true,
                    "cId": "zsZJn",
                    "othersLabel": "Others"
                },
                "qNullSuppression": false,
                "qIncludeElemValue": false,
                "qOtherTotalSpec": {
                    "qOtherMode": "OTHER_COUNTED",
                    "qOtherCounted": {
                        "qv": "15"
                    },
                    "qOtherLimit": {
                        "qv": "0"
                    },
                    "qOtherLimitMode": "OTHER_GE_LIMIT",
                    "qSuppressOther": false,
                    "qForceBadValueKeeping": true,
                    "qApplyEvenWhenPossiblyWrongResult": true,
                    "qGlobalOtherGrouping": false,
                    "qOtherCollapseInnerDimensions": false,
                    "qOtherSortMode": "OTHER_SORT_DESCENDING",
                    "qTotalMode": "TOTAL_OFF",
                    "qReferencedExpression": {
                        "qv": ""
                    }
                },
                "qShowTotal": false,
                "qShowAll": false,
                "qOtherLabel": {
                    "qv": ""
                },
                "qTotalLabel": {
                    "qv": ""
                },
                "qCalcCond": {
                    "qv": ""
                },
                "qAttributeExpressions": [],
                "qAttributeDimensions": [],
                "qCalcCondition": {
                    "qCond": {
                        "qv": ""
                    },
                    "qMsg": {
                        "qv": ""
                    }
                }
            }
        ],
        "qMeasures": [
            {
                "qLibraryId": "",
                "qDef": {
                    "qLabel": "Margin",
                    "qDescription": "",
                    "qTags": [],
                    "qGrouping": "N",
                    "qDef": "Sum([Sales Margin Amount])",
                    "qNumFormat": {
                        "qType": "U",
                        "qnDec": 10,
                        "qUseThou": 0,
                        "qFmt": "",
                        "qDec": ".",
                        "qThou": " "
                    },
                    "qRelative": false,
                    "qBrutalSum": false,
                    "qAggrFunc": "",
                    "qAccumulate": 0,
                    "qReverseSort": false,
                    "qActiveExpression": 0,
                    "qExpressions": [],
                    "qLabelExpression": "",
                    "autoSort": true,
                    "cId": "KqmUpp",
                    "numFormatFromTemplate": true
                },
                "qSortBy": {
                    "qSortByState": 0,
                    "qSortByFrequency": 0,
                    "qSortByNumeric": -1,
                    "qSortByAscii": 0,
                    "qSortByLoadOrder": 1,
                    "qSortByExpression": 0,
                    "qExpression": {
                        "qv": ""
                    },
                    "qSortByGreyness": 0
                },
                "qAttributeExpressions": [
                    {
                        "qExpression": "Colormix1((sum([Sales Margin Amount])-$(=min(aggr( sum([Sales Margin Amount]), [Product Group Desc]))))/$(=(max(aggr( sum([Sales Margin Amount]), [Product Group Desc]))-min(aggr( sum([Sales Margin Amount]), [Product Group Desc])))),white(),RGB(156,221,183))",
                        "qLibraryId": "",
                        "qAttribute": true,
                        "qNumFormat": {
                            "qType": "U",
                            "qnDec": 10,
                            "qUseThou": 0,
                            "qFmt": "",
                            "qDec": "",
                            "qThou": ""
                        },
                        "qLabel": "",
                        "qLabelExpression": "",
                        "id": "colorByExpression"
                    }
                ],
                "qAttributeDimensions": [],
                "qCalcCond": {
                    "qv": ""
                },
                "qCalcCondition": {
                    "qCond": {
                        "qv": ""
                    },
                    "qMsg": {
                        "qv": ""
                    }
                },
                "qTrendLines": [],
                "qMiniChartDef": {
                    "qDef": "",
                    "qLibraryId": "",
                    "qSortBy": {
                        "qSortByState": 0,
                        "qSortByFrequency": 0,
                        "qSortByNumeric": 0,
                        "qSortByAscii": 0,
                        "qSortByLoadOrder": 0,
                        "qSortByExpression": 0,
                        "qExpression": {
                            "qv": ""
                        },
                        "qSortByGreyness": 0
                    },
                    "qOtherTotalSpec": {
                        "qOtherMode": "OTHER_OFF",
                        "qOtherCounted": {
                            "qv": ""
                        },
                        "qOtherLimit": {
                            "qv": ""
                        },
                        "qOtherLimitMode": "OTHER_GT_LIMIT",
                        "qSuppressOther": false,
                        "qForceBadValueKeeping": true,
                        "qApplyEvenWhenPossiblyWrongResult": true,
                        "qGlobalOtherGrouping": false,
                        "qOtherCollapseInnerDimensions": false,
                        "qOtherSortMode": "OTHER_SORT_DESCENDING",
                        "qTotalMode": "TOTAL_OFF",
                        "qReferencedExpression": {
                            "qv": ""
                        }
                    },
                    "qMaxNumberPoints": -1,
                    "qAttributeExpressions": [],
                    "qNullSuppression": false
                }
            }
        ],
        "qInterColumnSortOrder": [1, 0],
        "qSuppressZero": true,
        "qSuppressMissing": true,
        "qMode": "S",
        "qStateName": "$"
    }

    componentDidMount() {
        this.props.app.createCube(this.hypercube, (reply, app) => {
            // console.log(reply) // DEBUG the reply we received!

            const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
            // console.log(matrix) // DEBUG the returned matrix

            // Place the data in an object structure
            const data = {
                margin: [],
                xAxisDims: []
            }

            matrix.forEach(element => {
                data.xAxisDims.push(element[0].qText)
                data.margin.push(element[1].qNum)
            });
            // console.log(data) // DEBUG data object (this should contain arrays of all data points extracted)

            // In ECharts, pie chart data must be in the format [{value: 'val1', name: 'name1'}, {value: 'val2', name: 'name2'}, ...]
            // So let's build that data structure:
            var piechart_data = []
            for (let i = 0; i < data.xAxisDims.length; i++) {
                piechart_data.push({ 'value': (data.margin[i] / 1000000).toFixed(1), 'name': data.xAxisDims[i] })
            }

            //Define a color pallete from blue to purple to use:
            var colorPalette = ['#0D7CD6', '#003BD3', '#1F00D1', '#6300CE', '#C100CC']



            // Now we start defining the appearance of our ECharts chart!
            const options = {

                // Tooltip is shown when you hover the mouse over an element in the chart
                tooltip: {
                    trigger: 'item',
                },

                // Edit legend positioning, font size, coloring, etc.
                // See ECharts documentation for more info
                legend: {
                    position: 'bottom',
                    bottom: '0px',
                    textStyle: {
                        color: 'white',
                        fontFamily: 'Roboto',
                        fontSize: '16'
                    }
                },

                series: [
                    {
                        name: reply.qHyperCube.qMeasureInfo[0].qFallbackTitle + ' (and I can add hardcoded text here!)',
                        data: piechart_data,
                        type: 'pie',
                        color: colorPalette,
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: true,
                        label: {
                            textStyle: {
                                fontSize: '16',
                                fontFamily: 'Roboto'
                            },
                            show: true,
                            position: 'inside',
                            color: 'white',
                            // Formatter here is bugged and we need to use this syntax (see https://github.com/wangshijun/angular-echarts/issues/34 and https://blog.csdn.net/GGGyp/article/details/103170482 (in Chinese, use Google Translate))
                            formatter: '{b}' + '\n{c}M',
                        },
                        // On mouse hover, apply shadow and bold the text
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '24',
                                fontWeight: 'bold'
                            },
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                    }
                ]
            }

            // Set the state to contain all ECharts options we set earlier
            this.setState({ options: options, objectId: reply.qInfo.qId })
        })
    }

    componentWillUnmount() {
        if (this.state.objectId) {
            this.props.app.destroySessionObject(this.state.objectId)
        }
    }

    render() {
        // While not loaded, display the Loader icon
        var content = <Loader></Loader>

        // Then display the chart normally.
        if (this.state.options) {
            content = <GenericChart options={this.state.options} style={this.props.style}></GenericChart>
        }

        return (
            <div className='element-container' style={{position: 'absolute', top: '55px', left: '1491px'}}>
                <div style={this.props.style}>
                    {content}
                </div>
            </div>
        )
    }
}

