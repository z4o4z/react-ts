import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

import { ReduxState, MyThunkDispatch } from '../../types';

import withDragLayer from '../../hocks/withDragLayer';
import withDragAndDrop from '../../hocks/withDragAndDrop';

import { boardsLoad } from '../../redux/boards';

import BoardItem from './components/BoardItem';

type BoardsProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

// const BoardItemDragLayer = withDragLayer<React.ComponentProps<typeof BoardItem>>({ type: 'board-item' })(BoardItem);
const BoardItemDragAndDrop = withDragAndDrop<React.ComponentProps<typeof BoardItem>>({ type: 'board-item' })(BoardItem);

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
            <BoardItemDragAndDrop {...items[id]} />
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
