var config;

require(['config.js'], function (c) {
    config = configs;
})

/*
    This is a LeftletJS map component. Leaflet is used broadly on most websites
    when embedding an interactive map, and allows you to overlay data, polygons,
    customize most appearance aspects and more. We're gonna combine the map
    with an external API and data from the Consumer Sales QlikSense app.
*/

class SalesByState extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    /*
        Let's combine our Leaflet map with some external API requests to spice things up:

        Define a function that uses a public API to grab the US state borders coordinates so we can draw them later.

        This is not very performant since the US states borders don't really change all that much, if at all,
        so it is probably a good idea to just request it manually, save it in a file and import it instead of requesting 
        it every time, but I wanna show you how we can request data from all kinds of APIs and display them in conjunction 
        with our Qlik data, and there's not much relevant info I could easily find online that didn't require an API key
        and my e-mail address. You can improve the performance here by caching the response as well!

        Personally, I've used this information to overlay fire spots on the Amazon rainforest from an API maintained by NASA
        in a mashup for a client in the forestry industry.
    */

    getUSstateBorders(APIquery) {
        return fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-state-boundaries&q=' + APIquery)

            .then(APIresponse => {

                // If request returns anything other than 200 (success), raise error
                if (APIresponse.status >= 400) {
                    throw new Error(`Paint It Black! warns: request failed with status ${APIresponse.status}`);
                }
                return APIresponse.json()
            })

            .then(APIdata => {
                // console.log(APIdata) // DEBUG the returned data from external API
                var parsedData = [];

                // For every record returned (each record is an US state)
                for (let k = 0; k < APIdata.records.length; k++) {
                    let coordinateList = APIdata.records[k].fields.st_asgeojson.coordinates[0];

                    if (k == 6 || k == 17 || k == 19 || k == 20 || k == 26 || k == 41) {
                        coordinateList = APIdata.records[k].fields.st_asgeojson.coordinates[0][0]; // The API is bugged(?) as of Feb 9th 2022 and some states return a nested list. Probably due to different "islands" in states. Flattening the list
                    }

                    for (const element of coordinateList) {
                        element.reverse(); // We must reverse the list since the API returns [Long, Lat] and we need [Lat, Long]
                    }

                    parsedData.push(coordinateList)
                }

                // console.log(parsedData) // DEBUG the data that is sent to Leaflet to draw the shapes
                return parsedData
            });


    }

    hypercube = {
        "qInitialDataFetch": [
            {
                "qHeight": 50,
                "qWidth": 2
            }
        ],
        "qDimensions": [
            {
                "qLibraryId": "",
                "qDef": {
                    "qGrouping": "N",
                    "qFieldDefs": [
                        "State"
                    ],
                    "qFieldLabels": [
                        ""
                    ],
                    "qSortCriterias": [
                        {
                            "qSortByState": 0,
                            "qSortByFrequency": 0,
                            "qSortByNumeric": 1,
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
                    "cId": "UnnPGFD",
                    "othersLabel": "Outros",
                    "textAlign": {
                        "auto": true,
                        "align": "left"
                    },
                    "representation": {
                        "type": "text",
                        "urlPosition": "dimension",
                        "urlLabel": "",
                        "linkUrl": ""
                    }
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
                    "qv": "Outros"
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
                    "qLabel": "",
                    "qDescription": "",
                    "qTags": [],
                    "qGrouping": "N",
                    "qDef": "Sum ([Sales Amount])",
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
                    "qAggrFunc": "Expr",
                    "qAccumulate": 0,
                    "qReverseSort": false,
                    "qActiveExpression": 0,
                    "qExpressions": [],
                    "qLabelExpression": "",
                    "autoSort": true,
                    "cId": "EJPwDE",
                    "numFormatFromTemplate": true,
                    "textAlign": {
                        "auto": true,
                        "align": "left"
                    },
                    "representation": {
                        "type": "text",
                        "indicator": {
                            "showTextValues": true,
                            "applySegmentColors": false,
                            "position": "right"
                        },
                        "miniChart": {
                            "type": "sparkline",
                            "colors": {
                                "main": {
                                    "index": 6
                                },
                                "max": {
                                    "index": 0,
                                    "color": "none"
                                },
                                "min": {
                                    "index": 0,
                                    "color": "none"
                                },
                                "first": {
                                    "index": 0,
                                    "color": "none"
                                },
                                "last": {
                                    "index": 0,
                                    "color": "none"
                                },
                                "positive": {
                                    "index": 6
                                },
                                "negative": {
                                    "index": 10,
                                    "color": "#f93f17"
                                }
                            },
                            "showDots": true,
                            "yAxis": {
                                "scale": "local",
                                "position": "auto"
                            }
                        }
                    },
                    "conditionalColoring": {
                        "segments": {
                            "limits": [],
                            "paletteColors": [
                                {
                                    "index": 6,
                                    "icon": "dot"
                                }
                            ]
                        }
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
                        "qSuppressOther": true,
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
                    "qNullSuppression": true
                }
            }
        ],
        "qInterColumnSortOrder": [0, 1],
        "qSuppressZero": false,
        "qSuppressMissing": true,
        "qMode": "S",
        "qStateName": "$"
    }

    componentDidMount = async () => {

        // Initializing the Leaflet Map
        var map = new L.map(document.getElementById('custom_openstreetmap'), {
            zoomControl: false,
            renderer: L.canvas({ padding: 5 })
        });
        map.createPane('borders');
        map.createPane('markers');
        map.getPane('markers').style.zIndex = 700; // Map layers: place marker on top of the border data from API request

        // Map alternatives: https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
        // or even           https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
            attribution: 'Paint It Black! by Fellipe Fernandes | BIX Tecnologia',
            className: 'map-tiles'
        }).addTo(map);

        var centerOfMap = L.latLng('38', '-110'); // This is the default position that the map opens to. It is also possible to use the flyTo Leaflet method to make the map automatically pan around!
        map.setView(centerOfMap, 4);

    
        // Now let's get some data from Qlik
        this.props.app.createCube(this.hypercube, (reply, app) => {
            // console.log(reply) // DEBUG the reply we received!

            const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
            // console.log(matrix) // DEBUG the returned matrix

            // Place the data in an object structure
            var data = {
                states: [],
                sales: [],
                distrCenter: []
            }

            matrix.forEach(element => {
                data.states.push(element[0].qText)
                data.sales.push(element[1].qNum)
            });

            // I'm gonna manually add some points on the map that represent distribution centers or whatever, just some random data to put in together that we don't have in the app!
            // When interacting with the distribution center marker, we can make a popup that shows the Sales value on that state extracted from the Consumer Sales app.
            // If you have decent apps with concise information, this integration can be seamless, but since this example app is limited, let's forge some locations and names:
            data.distrCenter.push([33.882188, -117.959737, 'California General Dist. Center', data.sales[4]], [39.684283, -105.039815, 'Central America Unified Dist. Center', data.sales[5]], [40.863222, -74.086770, 'East Coast Dist. Center', data.sales[32]]) // One in CA, one in CO and one in NY

            for (const element of data.distrCenter) {
                var marker = new L.circleMarker([element[0], element[1]], {
                    radius: 7,
                    fillColor: '#FF2E00',
                    color: 'black',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 1,
                    pane: 'markers'
                })

                marker.bindPopup("<b> Location: " + element[2] + "</b><br> Sales in the state:" + (element[3]/1000000).toFixed(3) + "M" + "</br>" + "</b><br> Lat:" + element[0] + "</br>" + "</b> Lon:" + element[1]).openPopup()
                marker.addTo(map)
            }
        });

        // Request the data to draw polylines
        const poly = await this.getUSstateBorders('&rows=56&exclude.gid=13&exclude.gid=23&exclude.gid=24&exclude.gid=29&exclude.gid=10&exclude.gid=16')
        L.polygon(poly, { 
            color: '#0094FF', 
            weight: '1', 
            fillOpacity: '0.05',
            pane: 'borders' 
        }).addTo(map);
         
    }

    render() {
        return (
            <div className='element-container' style={{position: 'absolute', top: '380px', left: '65px', height: '570px', width: '1420px'}}>

                <div className='sales-map' id="custom_openstreetmap"> </div>

            </div>
        );

    }



}
