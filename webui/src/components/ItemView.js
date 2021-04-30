import {Component} from 'react';
import {Button, Grid, Statistic} from 'semantic-ui-react';
import Item from '../lib/Item';

export default class ItemView extends Component {
  item = null;
  state = {count: 0};
  componentDidMount() {
    this.item = new Item(this.props.item);
    this.item.on('update', item => this.setState({count: item.count}));
    this.setState({count: this.item.count});
  }
  render() {
    return (
      <Grid centered columns={1}>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Button basic circular icon='plus' positive size='huge' onClick={() => this.item.increment()} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Statistic>
            <Statistic.Value>{this.state.count}</Statistic.Value>
            <Statistic.Label>{this.props.item.name}</Statistic.Label>
          </Statistic>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row verticalAlign='bottom'>
        <Grid.Column textAlign='center'>
          <Button basic circular icon='minus' size='huge' color='red' onClick={() => this.item.decrement()} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    );
  }
}
