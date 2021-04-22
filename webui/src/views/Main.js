import {Grid} from 'semantic-ui-react';
import DogFoodInventory from '../components/DogFoodInventory';

const Main = () => (
  <Grid columns={1}>
    <Grid.Row>
      <Grid.Column>
        <DogFoodInventory />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Main;
