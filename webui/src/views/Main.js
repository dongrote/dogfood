import {Grid} from 'semantic-ui-react';
import StockView from '../components/StockView';

const Main = () => (
  <Grid columns={1}>
    <Grid.Row>
      <Grid.Column>
        <StockView StockId={1} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Main;
