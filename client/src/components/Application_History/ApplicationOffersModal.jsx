import React from 'react';
import jquery from 'jquery';
import { Card, Button, Modal, Header, Image, Input, TextArea, Checkbox } from 'semantic-ui-react';
import axios from 'axios';
import ApplicationOffersFeed from './ApplicationOffersFeed.jsx';

export default class ApplicationOffersModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: 0,
      offers:[]
    }
    this.saveOffer = this.saveOffer.bind(this);
    this.handleSalary = this.handleSalary.bind(this);
  }

  componentDidMount() {
    axios.get('/api/offers?application_id='+this.props.appID)
    .then((res) => {
      console.log(res.data,'before iF');
      if(res.data.length > 0) {
        this.setState({
          offers: res.data
        });
      }
    })
  }

  saveOffer(e) {
    e.preventDefault();
    var offerInfo = {
      application_id: this.props.appID,
      base_salary: this.state.salary,
      hasHealthBenefits: $("#hasHealth").prop("checked"),
      hasPTO: $("#hasPTO").prop("checked"),
      hasRetirement: $("#hasRetirement").prop("checked"),
      coversRelocation: $("#coversRelocation").prop("checked")
    }
    axios.post('/api/offers', offerInfo)
    .then((res) => {
      this.componentDidMount();
    });
  }

  handleSalary(e) {
    e.preventDefault();
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log(this.state.offers,'statesssss');
    var style = {
      top: '10%'
    }
    return (
      <div>
        <Modal style={style} trigger={(<Button>Offers</Button>)}>
        <Modal.Header>Offers</Modal.Header>
          <Modal.Content scrolling>
            <Checkbox id="hasHealth" label='Has Health Benefits' />
            <br/>
            <Checkbox id="hasPTO" label='Has PTO' />
            <br/>
            <Checkbox id="hasRetirement" label='Has Retirement' />
            <br/>
            <Checkbox id="coversRelocation" label='Covers Relocation' />
            <br/>
            <TextArea placeholder="Salary" onChange={this.handleSalary} name="salary" value={this.state.salary}/>
            <Modal.Actions>
              <Button basic color='green' labelPosition='left' onClick={this.saveOffer}>Submit</Button>
            </Modal.Actions>
            <Card.Group>
              {this.state.offers.map((offer) => {
              return <ApplicationOffersFeed offer={offer}/>
            })}
            </Card.Group>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
/*
update modal???
update offers modal so that offers render on it and when a user sends an offer it gets sent to the database and renders on the current modal
// label tag for checkboxes? might make it look nicer?
// notes
  // changed error in offers.controller get
  // offers response will respond once with full array
    // then the rest empty arrays
*/
