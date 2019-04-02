import * as React from 'react';
import juxt from 'lodash/fp/juxt';
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ as dnd } from 'react-dnd';

const { useDrag, useDrop } = dnd;

type WithDragAndDropOptions = {
  type: string;
};

function withDragAndDrop<P>({ type }: WithDragAndDropOptions) {
  return (Component: React.ComponentType<P>) => (props: P & { dragItem?: object }) => {
    const [collectedDropProps, dropRef] = useDrop({ accept: type });
    const [collectedDragProps, dragRef] = useDrag({ item: { type, ...props.dragItem } });

    console.log({
      collectedDropProps,
      collectedDragProps,
    });

    const { dragItem, ...ownProps } = props;

    return (
      <div ref={juxt([dragRef, dropRef])}>
        <Component {...ownProps as P} />
      </div>
    );
  };
}

export default withDragAndDrop;
