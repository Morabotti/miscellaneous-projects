import React from 'react';
import axios from 'axios';

import SimpleMap from './components/map'
import FTable from './components/table'

import './css/App.css';

class App extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      Items: [],
      Trains: [],
      BigItems: [],
      UpdatedTime: new Date().toLocaleTimeString()
    };

    axios.get('https://rata.digitraffic.fi/api/v1/metadata/stations') 
    .then(res => {
      const Options = ["VS", "TPE", "TKU", "HKI", "SK", "JY", "PRI", "KOK", "OL", "PM", "KAJ", "JNS", "KEM", "ROI"];
      let BigData = [];
      let newData = res.data;
      newData.forEach((element, i) => {
        if(Options.indexOf(element.stationShortCode) !== -1)
        {
          BigData.push(element)
        }
      });
      this.setState({ Items: newData, BigItems: BigData});
    });

    axios.get('https://rata.digitraffic.fi/api/v1/train-locations/latest/') 
    .then(res => {
      this.setState({ Trains: res.data });
    });
  }

  UpdateTrains()
  {
    axios.get('https://rata.digitraffic.fi/api/v1/train-locations/latest/') 
    .then(res => {
      this.setState({ Trains: res.data, UpdatedTime: new Date().toLocaleTimeString()});
    });
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.UpdateTrains(),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() 
  {
    return(
      <div className="App">
        <SimpleMap
          data={this.state.Items}
          train={this.state.Trains}
          time={this.state.UpdatedTime}
          bigdata={this.state.BigItems}
        />
        
        <FTable
          data={this.state.Items}
        />
      </div>
    );
  }
}

export default App;
