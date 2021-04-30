import {Component} from 'react';
import {Form, Button, Input} from 'semantic-ui-react';

export default class AddItemForm extends Component {
  state = {name: '', submitDisabled: true};

  onNameChange(name) { this.setState({name, submitDisabled: name.length === 0}); }

  async onSubmit() {
    await this.props.stock.addItem({name: this.state.name});
    this.resetForm();
  }

  resetForm() { this.setState({name: '', submitDisabled: true}); }

  render() {
    return (
      <Form>
        <Form.Field>
          <label>New Item Name</label>
          <Input>
            <input placeholder='Item Name' value={this.state.name} onChange={e => this.onNameChange(e.target.value)} />
            <Button primary disabled={this.state.submitDisabled} icon='plus' content='Create' onClick={() => this.onSubmit()} />
          </Input> 
        </Form.Field>
      </Form>
    );
  }
}
