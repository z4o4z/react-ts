import * as React from 'react';
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ as dnd } from 'react-dnd';

const { useDragLayer } = dnd;

type WithDragAndDropOptions = {
  type: string;
};

const dragLayerPropsCollector = () => ({});

function withDragAndDrop<P>({ type }: WithDragAndDropOptions) {
  return (Component: React.ComponentType<P>) => (props: P & { dragItem?: object }) => {
    const collectedProps = useDragLayer(dragLayerPropsCollector);

    console.log(collectedProps);

    const { dragItem, ...ownProps } = props;

    return (
      <div>
        <Component {...ownProps as P} />
      </div>
    );
  };
}

export default withDragAndDrop;
