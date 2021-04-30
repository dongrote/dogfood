import { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Stock from '../lib/Stock';

export default class CreateStock extends Component {
  state = {name: '', submitDisabled: true, error: false, errorMessage: ''};
  onChangeName(name) { this.setState({name, submitDisabled: name.length === 0}); }
  async onSubmit() {
    this.setState({error: false});
    try {
      await Stock.create({name: this.state.name});
      if (this.props.onCreate) this.props.onCreate();
    } catch (err) {
      this.setState({error: true, errorMessage: err.message});
    }
  }
  render() {
    return (
      <Form error={this.state.error}>
        <Form.Field>
          <label>Stock Name</label>
          <Input>
            <input placeholder='Name' value={this.state.name} onChange={e => this.onChangeName(e.target.value)} />
            <Button primary disabled={this.state.submitDisabled} icon='plus' content='Create' onClick={() => this.onSubmit()} />
          </Input>
        </Form.Field>
        <Message error header='There was an error.' content={this.state.errorMessage} />
      </Form>
    );
  }
}
