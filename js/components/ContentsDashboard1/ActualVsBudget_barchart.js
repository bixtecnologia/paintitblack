var config;

require(['config.js'], function (c) {
    config = configs;
})

/*
    In this example, we'll be building a barchart similar to the one in the
    Consumer Sales app in the "Budget Analysis" tab (the barchart is called
    "Actual vs Budget"). However, we will only the taking the data from Qlik,
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

class ActualVsBudget extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    hypercube = {
        "qInitialDataFetch": [
            {
                "qHeight": 12,
                "qWidth": 3
            }
        ],
        "qDimensions": [
            {
                "qLibraryId": "",
                "qDef": {
                    "qGrouping": "N",
                    "qFieldDefs": [
                        "textBudgetPeriod"
                    ],
                    "qFieldLabels": [
                        "Budget Period"
                    ],
                    "qSortCriterias": [
                        {
                            "qSortByState": 0,
                            "qSortByFrequency": 0,
                            "qSortByNumeric": 0,
                            "qSortByAscii": 0,
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
                    "autoSort": false,
                    "cId": "cxtVVLU",
                    "othersLabel": "Others"
                },
                "qNullSuppression": false,
                "qIncludeElemValue": false,
                "qOtherTotalSpec": {
                    "qOtherMode": "OTHER_OFF",
                    "qOtherCounted": {
                        "qv": "10"
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
                    "qLabel": "Actual Amount",
                    "qDescription": "",
                    "qTags": [],
                    "qGrouping": "N",
                    "qDef": "Sum ([Actual Amount])",
                    "qNumFormat": {
                        "qType": "U",
                        "qnDec": 10,
                        "qUseThou": 0,
                        "qFmt": "",
                        "qDec": "",
                        "qThou": ""
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
                    "cId": "uekwjGD",
                    "numFormatFromTemplate": true,
                    "series": {
                        "type": "bar",
                        "axis": 0,
                        "marker": "circle",
                        "markerFill": true
                    }
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
                "qAttributeExpressions": [],
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
            },
            {
                "qLibraryId": "",
                "qDef": {
                    "qLabel": "Budget %",
                    "qDescription": "",
                    "qTags": [],
                    "qGrouping": "N",
                    "qDef": "Sum ([Actual Amount])/Sum([Budget Amount])",
                    "qNumFormat": {
                        "qType": "F",
                        "qnDec": 2,
                        "qUseThou": 0,
                        "qFmt": "0%",
                        "qDec": ".",
                        "qThou": ","
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
                    "cId": "feQA",
                    "numFormatFromTemplate": true,
                    "series": {
                        "type": "marker",
                        "axis": 1,
                        "marker": "line",
                        "markerFill": true
                    }
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
                "qAttributeExpressions": [],
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
        "qInterColumnSortOrder": [0, 1, 2],
        "qSuppressZero": true,
        "qSuppressMissing": true,
        "qMode": "S",
        "qStateName": "$"
    }

    componentDidMount() {
        this.props.app.createCube(this.hypercube, (reply, app) => {
            // console.log(reply) // DEBUG the reply we received!

            // Initilize ECharts for barchart gradient
            var graphic = echarts.graphic;

            const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
            // console.log(matrix) // DEBUG the returned matrix

            // Place the data in an object structure
            const data = {
                actualAmount: [],
                budgetPercent: [],
                xAxisDims: []
            }

            matrix.forEach(element => {
                data.xAxisDims.push(element[0].qText)
                data.actualAmount.push(element[1].qNum)
                data.budgetPercent.push(element[2].qNum)
            });
            // console.log(matrix) // DEBUG data object (this should contain arrays of all data points extracted)


            // Now we start defining the appearance of our ECharts chart!
            const options = {

                // Tooltip is shown when you hover the mouse over an element in the chart
                tooltip: {
                    trigger: 'item',
                    // Formatter here is a function that can parse and edit what is displayed.
                    // In this case, we can show the values extracted up to 2 decimal places and add a multiplier
                    // Google "echarts formatter params" for more info
                    formatter: function (params) {
                        return `${params.seriesName} <br/>
                                  ${params.name}: ${(params.value / 1000000).toFixed(2)} (M) <br /`
                    }
                },

                // Edit legend positioning, font size, coloring, etc.
                // See ECharts documentation for more info
                legend: {
                    position: 'bottom',
                    bottom: '30px',
                    textStyle: {
                        color: 'white',
                        fontFamily: 'Roboto',
                        fontSize: '16'
                    }
                },

                // Grid changes the positioning of the chart inside the div
                // This can be a little fiddly to center and get right :(
                grid: {
                    left: '0px',
                    right: '0px',
                    top: '30px',
                    bottom: '70px',
                    containLabel: true
                },

                // xAxis configures the xAxis (duh) coloring, fonts, and you can
                // also format the data that is displayed on the X axis
                xAxis: {
                    axisTick: {
                        alignWithLabel: true
                    },
                    type: 'category',
                    data: data.xAxisDims, // This is the data we extracted from QSense: [Jan, Feb, Mar, ..., Dec]
                    axisLabel: {
                        fontSize: '16',
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        interval: '0',

                        // Just for the lolz, let's change all month names to their extended name
                        formatter: function (val) {
                            return val.replace('Jan', 'January').replace('Feb', 'February').replace('Mar', 'March').replace('Apr', 'April').replace('Jun', 'June').replace('Jul', 'July').replace('Aug', 'August').replace('Sep', 'September').replace('Oct', 'October').replace('Nov', 'November').replace('Dec', 'December')
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    }
                },

                // yAxis let's you configure the Y axis (duh)
                // Let's hide the Y axis to make a clean dashboard,
                // while making two Y axis (to place the Budget% data set)
                yAxis: [{
                    show: false,
                },
                {
                    show: false,
                    min: 0,
                    max: 2, // Clamp this axis to 200% (2), good enough as this should never reach that value, while making the visualization not stretched!
                }],


                // Series is where we put the data to chart in the barchart. It
                // is a list of values like so:
                series: [
                    {
                        name: reply.qHyperCube.qMeasureInfo[0].qFallbackTitle, // This returns the name directly from QSense! See for yourself by logging this expression or the entire reply object
                        data: data.actualAmount,
                        type: 'bar',
                        barWidth: '75%',
                        // color: '#0D7DD8', // We can add a fixed color like this, or make a gradient like we are using down in "itemStyle"
                        avoidLabelOverlap: true,
                        label: {
                            textStyle: {
                                fontSize: '16',
                                fontFamily: 'Roboto'
                            },
                            show: true,
                            position: 'top',
                            color: 'white',
                            formatter: function (value) {
                                return `${(value.data / 1000000).toFixed(2)}M`
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        itemStyle: {
                            // Let's make a gradient from blue to the background color!
                            color: new graphic.LinearGradient(0, 0, 0, 1.2, [{
                                offset: 0,
                                color: '#0D7DD8'
                            },
                            {
                                offset: 1,
                                color: config.darkTheme.backgroundColor // Access the config.js file and get the background color defined there!
                            }
                            ])
                        }
                    },

                    {
                        // For this data entry, let's make those tick marks that are present in the barchart in QSense. In ECharts
                        // we will make an invisible line chart with markers to replicate that feature
                        name: reply.qHyperCube.qMeasureInfo[1].qFallbackTitle,
                        data: data.budgetPercent,
                        type: 'line',
                        color: 'red',
                        yAxisIndex: 1, // Use the second Y axis
                        avoidLabelOverlap: true,
                        label: {
                            textStyle: {
                                fontSize: '14',
                                fontFamily: 'Roboto',
                                color: '#FF5C56'
                            },
                            show: true,
                            position: 'bottom',
                            color: 'white',
                            formatter: function (value) {
                                return (value.data * 100).toFixed(1) + '%'
                            }
                        },
                        labelLine: {
                            show: false
                        },

                        // Hide the line
                        lineStyle: {
                            width: 0,
                        },
                        // Add tickmark symbol and make it thicc
                        symbol: 'line',
                        symbolSize: 20,
                        itemStyle: {
                            borderWidth: 6
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
            <div className='element-container' style={{position: 'absolute', top: '55px', left: '65px'}}>
                <div style={this.props.style}>
                    {content}
                </div>
            </div>
        )
    }
}

