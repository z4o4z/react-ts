import * as React from 'react';
import {
  DragLayerMonitor,
  __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ as dnd,
} from 'react-dnd';

const { useDragLayer } = dnd;

type DragLayerItem<P> = P & {
  node: HTMLElement | null;
};

function dragLayerPropsCollector<P>(monitor: DragLayerMonitor) {
  return {
    item: monitor.getItem() as DragLayerItem<P>,
    type: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    offsetDiff: monitor.getDifferenceFromInitialOffset(),
  };
}

function withDragLayer<P>() {
  return (Component: React.ComponentType<P>) => () => {
    const collectedProps = useDragLayer(dragLayerPropsCollector);

    if (
      !collectedProps ||
      !collectedProps.isDragging ||
      !collectedProps.item.node ||
      !collectedProps.offsetDiff
    ) {
      return null;
    }

    const {
      item: { node, ...props },
      offsetDiff,
    } = collectedProps;

    return (
      <div
        style={{
          width: `${node.clientWidth}px`,
          height: `${node.clientHeight}px`,
          position: 'absolute',
          top: `${offsetDiff.y}px`,
          left: `${offsetDiff.x}px`,
          zIndex: 100,
          pointerEvents: 'none',
        }}
      >
        <Component {...props as P} />
      </div>
    );
  };
}

export default withDragLayer;
