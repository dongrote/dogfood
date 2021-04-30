import {Component} from 'react';
import {Divider, Grid, Header} from 'semantic-ui-react';
import ItemView from './ItemView';
import Stock, {StockNotFoundError} from '../lib/Stock';
import CreateStock from './CreateStock';
import AddItemForm from './AddItemForm';
import Item from '../lib/Item';

export default class StockView extends Component {
  state = {stock: null, name: '', stockId: null, items: [], noStockAvailable: true};
  stock = null;

  async componentDidMount() { await this.fetchStock(); }

  async fetchStock() {
    try {
      this.stock = await Stock.findById(this.props.StockId);
      this.stock.on('items', () => this.setState({items: this.stock.items}));
      this.setState({noStockAvailable: false, name: this.stock.name, stockId: this.stock.id, stock: this.stock, items: this.stock.items});
    } catch (err) {
      if (err instanceof StockNotFoundError) {
        this.setState({noStockAvailable: true});
      } else {
        throw err;
      }
    }
  }

  render() {
    return this.state.noStockAvailable ? this.renderNoStock() : this.renderStock();
  }

  renderNoStock() {
    return <CreateStock onCreate={() => this.fetchStock()} />;
  }

  renderStock() {
    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column textAlign='center'>
            <Header as='h2' content={this.state.name} />
          </Grid.Column>
        </Grid.Row>
        <Divider />
        {this.state.items.length === 0 && (
          <Grid.Row columns={1}>
            <Grid.Column>
              <Header as='h3' content='No Items in Stock! Add a new one.' />
            </Grid.Column>
          </Grid.Row>
        )}
        {this.state.items.length > 0 && (
          <Grid.Row columns={3} divided>
            {this.state.items.map((item, i) => (
              <Grid.Column key={i}>
                <ItemView item={item} />
              </Grid.Column>
            ))}
          </Grid.Row>
        )}
        <Divider />
        <Grid.Row columns={1}>
          <Grid.Column>
            <AddItemForm stock={this.state.stock} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
