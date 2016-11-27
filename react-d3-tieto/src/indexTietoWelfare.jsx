import React, {Component} from 'react';
import { render } from 'react-dom';
const d3 = require('d3');

class IndexTietoWelfare extends Component {

  constructor(props) {
    super(props);
    this.state = {clientsRawData: [], workShiftedClientRawData: [], executedServicesRawData: [], occurs: 0};
  }

  componentWillMount() {
    this.loadClientsRawData();
    this.loadPlannedWorkShiftsData();
    this.loadedExecutedServicesData();
  }

  loadClientsRawData() {
    let clientsUrl = this.props.url + 'clients.json';
    console.log(clientsUrl);

    d3.json(clientsUrl, (error, data) => {
      if (error) return console.error(error);

      let clients = data.map((d) => {
        return {PersonId: d.PersonId};
      });

      this.setState({clientsRawData: clients});

    });

  }

  loadPlannedWorkShiftsData() {
    let shiftedUrl = this.props.url + 'planned_workshifts.json';
    console.log(shiftedUrl);

    let shiftedClients = []

    d3.json(shiftedUrl, (error, data) => {
      if (error) return console.error(error);

      data.forEach((shift) => {
        shift.PlannedActivities.forEach((activity) => {
          if (activity.Client !== null) {shiftedClients.push({PersonId: activity.Client.PersonId})};
        });
      });

    });
    this.setState({ workShiftedClientRawData: shiftedClients});
  }

  loadedExecutedServicesData() {
    let executedServicesUrl = this.props.url + 'executed_services.json';
    console.log(executedServicesUrl);
    let executedServices = [];

     d3.json(executedServicesUrl, (error, data) => {
      if (error) return console.error(error);

       data.forEach((d) => {
        if (d.PersonId !== null || d.PersonId !== '') {
          executedServices.push({PersonId: d.PersonId});
        }
      });
    });

    this.setState({executedServicesRawData: executedServices});

  }

  compareDiffBetweenPlannedAndExecuted() {
    let occurs = 0;
    console.log(this.state.executedServicesRawData.length);
    console.log(this.state.workShiftedClientRawData.length);
    this.state.executedServicesRawData.forEach((personDid) => {
      this.state.workShiftedClientRawData.forEach((personPlanned) => {
        console.log(personPlanned, ' ', personPlanned);
        if (personDid.substring(0,8) === personPlanned.substring(0,8)) {
          console.log(personPlanned, ' ', personPlanned);
          occurs++;
        }
      });
    });

    this.setState({occurs});
  }

  render() {
    return (
      <div>
        <h1>Welfare data examples</h1>
        <h3>Total number of clients are:  {this.state.clientsRawData.length} </h3>
        <h3>Total number of planned work shifts for clients are:  {this.state.workShiftedClientRawData.length} </h3>
        <h3>Total number of excuted work for clients are:  {this.state.executedServicesRawData.length} </h3>
      </div>
        );
  }

}


render(
  <IndexTietoWelfare url="/public/data/tieto/welfare/" />,
  document.querySelectorAll('.h1bgraph')[0]
);