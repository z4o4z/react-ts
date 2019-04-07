import * as React from 'react';
import juxt from 'lodash/fp/juxt';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ as dnd } from 'react-dnd';

const { useRef, useEffect } = React;
const { useDrag, useDrop } = dnd;

type WithDragAndDropOptions = {
  type: string;
};

function withDragAndDrop<P>({ type }: WithDragAndDropOptions) {
  return (Component: React.ComponentType<P>) => (props: P) => {
    const nodeRef = useRef();
    const [, dropRef] = useDrop({ accept: type });
    const [{ isDragging }, dragRef, dragPreview] = useDrag({
      item: { type, ...props },
      begin: () => ({ type, node: nodeRef.current, ...props }),
      collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    useEffect(() => {
      dragPreview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    return (
      <div
        ref={juxt([ref => (nodeRef.current = ref), dragRef, dropRef])}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        <Component {...props} />
      </div>
    );
  };
}

export default withDragAndDrop;
