import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

import { ReduxState, MyThunkDispatch } from '../../types';

import { boardsLoad } from '../../redux/boards';

import BoardItem from './components/BoardItem';

type BoardsProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function Boards({ ids, items, loading, boardsLoad }: BoardsProps) {
  useEffect(boardsLoad, []);

  return (
    <Grid container spacing={3}>
      {loading ? (
        <Typography color="textSecondary" display="block">
          loading...
        </Typography>
      ) : (
        ids.map(id => (
          <Grid key={id} xs={6} sm={6} md={3} item>
            <BoardItem {...items[id]} />
          </Grid>
        ))
      )}
    </Grid>
  );
}

const mapStateToProps = ({ boards }: ReduxState) => ({ ...boards });
const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
  boardsLoad: () => dispatch(boardsLoad()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Boards);
