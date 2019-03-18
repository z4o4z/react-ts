import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { ReduxState, MyThunkDispatch } from '../../types';

import { boardsLoad } from '../../redux/boards';

type BoardsProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function Boards({ ids, items, loading, boardsLoad }: BoardsProps) {
  useEffect(boardsLoad, []);

  return <div>{loading ? 'loading' : JSON.stringify(items)}</div>;
}

const mapStateToProps = ({ boards }: ReduxState) => ({ ...boards });
const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
  boardsLoad: () => dispatch(boardsLoad()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Boards);
