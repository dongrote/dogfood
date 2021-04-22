import {Component} from 'react';
import {Button, Grid, Statistic} from 'semantic-ui-react';

export default class DogFoodCounter extends Component {
  state = {value: 0};
  increment() {
    this.setState({value: this.state.value + 1});
  }
  decrement() {
    this.setState({value: Math.max(this.state.value - 1, 0)});
  }
  render() {
    return (
      <Grid centered columns={1}>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button basic circular icon='plus' positive size='huge' onClick={() => this.increment()} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Statistic>
              <Statistic.Value>{this.state.value}</Statistic.Value>
              <Statistic.Label>{this.props.name}</Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row verticalAlign='bottom'>
          <Grid.Column textAlign='center'>
            <Button basic circular icon='minus' size='huge' color='red' onClick={() => this.decrement()} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
