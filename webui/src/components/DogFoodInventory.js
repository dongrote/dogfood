import {Divider, Grid} from 'semantic-ui-react';
import RemainingDays from './RemainingDays';
import DogFoodCounter from './DogFoodCounter';

const DogFoodInventory = () => (
  <Grid>
    <Grid.Row columns={1}>
      <Grid.Column textAlign='center'>
        <RemainingDays remaining={10} />
      </Grid.Column>
    </Grid.Row>
    <Divider />
    <Grid.Row columns={3} divided>
      <Grid.Column>
        <DogFoodCounter name='Salmon' />
      </Grid.Column>
      <Grid.Column>
        <DogFoodCounter name='Turkey (PMR)' />
      </Grid.Column>
      <Grid.Column>
        <DogFoodCounter name='Turkey (HVM)' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default DogFoodInventory;
