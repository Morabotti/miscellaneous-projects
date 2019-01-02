import React from 'react';
import {ComposableMap, ZoomableGroup, Geographies, Geography, Markers, Marker} from 'react-simple-maps'
import { Motion, spring } from "react-motion"
import tooltip from "wsdm-tooltip"


import Map from '../json/gadm36_FIN.json'
import '../css/map.css';


class SimpleMap extends React.Component{
    constructor()
    {
        super()
        this.state = {
            center: [25.2, 65.1],
            zoom: 1
        };
        this.handleCitySelection = this.handleCitySelection.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleAreaSelection = this.handleAreaSelection.bind(this)


        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.handleMouseMoveTrain = this.handleMouseMoveTrain.bind(this)
    }

    IsBigCity(s){
        var BigCities = ["Vaasa", "Seinäjoki", "Tampere", "Helsinki", "Turku"];
        BigCities.forEach(element => {
            return new RegExp( '\\b' + element + '\\b', 'i').test(s);
        });
        return false
    }
    
    componentDidMount() {
        this.tip = tooltip()
        this.tip.create()
    }
    
    handleMouseMove(info, evt) {
        this.tip.show(`
          <div class="tooltip-inner">
            ${info.name} (${info.shortname})
          </div>
        `)
        this.tip.position({ pageX: evt.pageX, pageY: evt.pageY })
    }

    handleMouseMoveTrain(info, evt) {
        this.tip.show(`
          <div class="tooltip-inner">
            Speed: ${info.speed} km/h
          </div>
        `)
        this.tip.position({ pageX: evt.pageX, pageY: evt.pageY })
    }

    handleMouseLeave() { this.tip.hide() }

    handleCitySelection(evt) {
        document.getElementById("ResetBtn").style.display = "block";
        this.setState({
            center: evt.coordinates,
            zoom: 3,
        })
    }

    handleAreaSelection(evt) {
        document.getElementById("ResetBtn").style.display = "block";
        if(evt.geometry.coordinates[0][0][0][0] !== undefined)
        {
            this.setState({
                center: [evt.geometry.coordinates[0][0][0][0], evt.geometry.coordinates[0][0][0][1]],
                zoom: 2,
            })
        }
        else
        {
            this.setState({
                center: [evt.geometry.coordinates[0][0][0], evt.geometry.coordinates[0][0][1]],
                zoom: 2,
            })
        }
    }


    handleReset() {
        document.getElementById("ResetBtn").style.display = "none";
        this.setState({
            center: [25.2, 65.1],
            zoom: 1,
        })
    }

    render()
    {
        return(
            <div className="wrapperStyles">
            <div className="Menu">
                <div className="MenuCenter">
                    <a className="Resetbutton" id="ResetBtn" onClick={this.handleReset}>Reset</a>
                </div>
            </div>
            <div className="MenuTime">
                Last time updated: {this.props.time}
            </div>
            <Motion
                defaultStyle={{
                    zoom: 1,
                    x: 25.2,
                    y: 65.1,
                }}
                style={{
                    zoom: spring(this.state.zoom, {stiffness: 210, damping: 20}),
                    x: spring(this.state.center[0], {stiffness: 210, damping: 20}),
                    y: spring(this.state.center[1], {stiffness: 210, damping: 20}),
                }}
                >
                {({zoom, x,y}) =>(
                <ComposableMap
                    projection="mercator"
                    projectionConfig={{scale: 1700}}
                    width={980}
                    heigth={1200}
                    style={{width: "100%", heigth: "auto"}}
                >
                <ZoomableGroup center={[x,y]} zoom={zoom} disablePanning>
                    <Geographies geography={Map}>
                    {(geographies, projection) => 
                        geographies.map((geography, i) =>
                        geography.id !== "ATA" && (
                            <Geography
                            key={i}
                            geography={geography}
                            projection={projection}
                            onClick={this.handleAreaSelection}
                            style={{
                                default:{
                                fill: '#ECEFF1',
                                stroke: '#607D8B',
                                strokeWidth: 0.75,
                                outline: "none",
                            },
                                hover:{
                                fill: "#5D8CAE",
                                stroke: "#607D8B",
                                strokeWidth: "0.75",
                                outline: "none",
                            },
                                pressed:{
                                fill: "#236B8E",
                                stroke: "#607D8B",
                                strokeWidth: "0.75",
                                outline: "none",
                            },
                            }}
                            />
                        ))}
                    </Geographies>
                    <Markers>
                    {this.props.data.map((marker, i) =>(
                        <Marker
                        key={i}
                        marker={{coordinates: [marker.longitude, marker.latitude], name: marker.stationName, shortname: marker.stationShortCode}}
                        style={{
                            default: {fill: "#FF5722"},
                            hover: {fill: "#FFFFFF"},
                            pressed: {fill: "#FFFFFF"}
                            
                        }}
                        onMouseMove={this.handleMouseMove}
                        onMouseLeave={this.handleMouseLeave}
                        data-station={i}
                        onClick={this.handleCitySelection}
                        >
                        
                        <circle
                        cx={0}
                        cy={0}
                        r={2.5}
                        style={{
                            stroke: "#FF5722",
                            strokeWidth: 2,
                            opacity: 1,
                        }}
                        />
                        </Marker>
                    ))}
                    </Markers>

                    <Markers>
                    {this.props.bigdata.map((marker, i) =>(
                        <Marker
                        key={i}
                        marker={{coordinates: [marker.longitude, marker.latitude], name: marker.stationName, shortname: marker.stationShortCode}}
                        style={{
                            default: {fill: "#ff9900"},
                            hover: {fill: "#e68a00"},
                            pressed: {fill: "#e68a00"}
                            
                        }}
                        onMouseMove={this.handleMouseMove}
                        onMouseLeave={this.handleMouseLeave}
                        data-station={i}
                        onClick={this.handleCitySelection}
                        >
                        
                        <circle
                        cx={0}
                        cy={0}
                        r={12}
                        style={{
                            stroke: "#ff9900",
                            strokeWidth: 2,
                            opacity: 1,
                        }}
                        />
                        <text
                            textAnchor="middle"
                            y={3.2}
                            style={{
                                fontFamily: "Roboto, sans-serif",
                                fill: "#fff",
                                fontSize: "9px",
                                cursor: "default"
                            }}
                            >
                            {marker.stationShortCode}
                        </text>
                        </Marker>
                        
                    ))}
                    </Markers>


                    <Markers>
                    
                    {this.props.train.map((marker, i) => (
                        
                        <Marker
                        key={i}
                        marker={{coordinates: [marker.location.coordinates[0], marker.location.coordinates[1]], speed:marker.speed}}
                        onMouseMove={marker.speed === 0 || marker.trainNumber > 1000 ? "" : this.handleMouseMoveTrain}
                        onMouseLeave={marker.speed === 0 || marker.trainNumber > 1000 ? "" :  this.handleMouseLeave}
                        style={{
                            default: {fill: "#3657db"},
                            hover: {fill: "#1c37a5"},
                            pressed: {fill: "#182f8e"}
                        }}
                        data-station={i}
                        onClick={this.handleCitySelection}
                        >
                        
                        <circle
                        cx={0}
                        cy={0}
                        r={marker.speed === 0 || marker.trainNumber > 1000 ? 0 : 13}
                        style={{
                            stroke: "#fff",
                            strokeWidth: 2,
                            opacity: 1,
                        }}
                        />
                        <text
                            textAnchor="middle"
                            y={2.5}
                            style={{
                                fontFamily: "Roboto, sans-serif",
                                fill: "#fff",
                                fontSize: "8px",
                                cursor: "default"
                            }}
                            >
                            {marker.speed === 0 || marker.trainNumber > 1000 ? "" : marker.trainNumber}
                        </text>
                        </Marker>
                        ))}
                    </Markers>
                </ZoomableGroup>
                </ComposableMap>
                )}
                </Motion>
            </div>
        );
    }
}

export default SimpleMap