import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

export default class MilestoneUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.milestone.name,
      description: this.props.milestone.description,
      tech_used: this.props.milestone.tech_used,
      repo_link: this.props.milestone.repo_link,
      milestone_date: this.props.milestone.milestone_date,
      id: this.props.milestone.id
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: this.props.milestone.name,
      description: this.props.milestone.description,
      tech_used: this.props.milestone.tech_used,
      repo_link: this.props.milestone.repo_link,
      milestone_date: this.props.milestone.milestone_date,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    e.preventDefault();

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      description, milestone_date, name, repo_link, tech_used,
    } = this.state;
    const style = {
      top: '50%',
    };
    const { milestone } = this.props;
    return (
      <div>
        <Modal
          style={style} 
          trigger={(
            <Button onClick={this.componentDidMount}>
              Update Milestone
            </Button>
          )}
        >
        <Modal.Header>
          {'Update Your Milestone! '}
          <i className="trophy icon" />
        </Modal.Header>
          <Form raised="true" className="ui teal segment">
            <Modal.Content>
              <b>
                {'Project\'s Name'}
              </b>
              <input
                onChange={this.handleChange}
                name="name" value={name}
                style={{ maxHeight: 35 }} 
              />
              <br />
              <b>
                {'Description'}
              </b>
              <input
                onChange={this.handleChange}
                name="description"
                value={description}
                style={{ maxHeight: 35 }} 
              />
              <br />
              <b>
                {'Tech Stack(s)'}
              </b>
              <input
                onChange={this.handleChange}
                name="tech_used"
                value={tech_used}
                style={{ maxHeight: 35 }} 
              />
              <br />
              <b>
                {'Repository Link'}
              </b>
              <input
                onChange={this.handleChange}
                name="repo_link"
                value={repo_link}
                style={{ maxHeight: 35 }} 
              />
              <br />
              <b>
                {'Date Completed'}
              </b>
              <input
                type="date"
                onChange={this.handleChange}
                name="milestone_date"
                value={milestone_date}
                style={{ maxHeight: 35 }}
              />
              <br />
              <Modal.Actions>
                <div className="ui three bottom attached buttons">
                  <Button className="ui cancel button">
                    Cancel
                  </Button>
                  <Button
                    className="ui approve button"
                    color="teal"
                    size="medium"
                    type="submit"
                    onClick={() => {
                      this.props.update(this.props.milestone.user_id, this.state);
                    }}
                  >
                    Submit
                  </Button>
                  <Button color="red" onClick={() => {this.props.deleteMilestone(milestone.id)}}>
                    Delete
                  </Button>
                </div>
              </Modal.Actions>
            </Modal.Content>
          </Form>
        </Modal>
      </div>
    );
  }
}
