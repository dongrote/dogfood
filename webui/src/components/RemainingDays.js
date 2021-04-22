import {Grid, Statistic} from 'semantic-ui-react';
import dayjs from 'dayjs';

const dateFormatString = 'dddd, MMMM D';

const RemainingDays = props => (
  <Grid columns={1}>
    <Grid.Row>
      <Grid.Column>
        <Statistic>
          <Statistic.Label>Remaning Days</Statistic.Label>
          <Statistic.Value>{props.remaining}</Statistic.Value>
        </Statistic>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        {dayjs().add(props.remaining, 'd').format(dateFormatString)}
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default RemainingDays;
