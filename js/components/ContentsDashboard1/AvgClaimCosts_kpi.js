var config;

require(['config.js'], function (c) {
    config = configs;
})

/*
    This component extract the data from a second QlikSense application.

    All that is needed is to pass the app name from QlikConnection.js to this
    components props when calling it (see it in Dashboard1.js file)
*/

class AvgClaimCosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            KPI_value: 0
        };
    }

    hypercube = {
        "qInitialDataFetch": [
            {
                "qHeight": 1,
                "qWidth": 1
            }
        ],
        "qDimensions": [],
        "qMeasures": [
            {
                "qLibraryId": "",
                "qDef": {
                    "qLabel": "Ave Claim Costs",
                    "qDescription": "",
                    "qTags": [],
                    "qGrouping": "N",
                    "qDef": "Avg([Total Claim Cost])",
                    "qNumFormat": {
                        "qType": "M",
                        "qnDec": 2,
                        "qUseThou": 0,
                        "qFmt": "£#,##0.00;-£#,##0.00",
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
                    "cId": "jHRHaH",
                    "numFormatFromTemplate": true,
                    "measureAxis": {
                        "min": 0,
                        "max": 100
                    },
                    "conditionalColoring": {
                        "useConditionalColoring": false,
                        "singleColor": 3,
                        "paletteSingleColor": {
                            "index": 6
                        },
                        "segments": {
                            "limits": [],
                            "paletteColors": [
                                {
                                    "index": 6
                                }
                            ]
                        }
                    },
                    "isCustomFormatted": false
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
        "qInterColumnSortOrder": [
            0
        ],
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

            var KPI_value = matrix[0][0].qNum.toFixed(2);
            // console.log(KPI_value) // DEBUG the KPI returned

            this.setState({
                KPI_value: KPI_value,
            })
        })

    }

    render() {

        return (
            <div className='element-container' style={{ position: 'absolute', top: '719px', left: '1491px', height: '232px', width: '420px' }}>

                <div className='kpi-card-container'>


                    <p className='kpi-card-title'> Avg. Claim Costs: </p>

                    <p className='kpi-card-content'> ${this.state.KPI_value} </p>

                </div>

            </div>
        );

    }



}
