import * as React from 'react';
import { createSvgIdUrl, hullPath, Point } from '../../../utils/svg-utils';
import { DragConnectionProps } from '../topology-types';
import SvgArrowMarker from './SvgArrowMarker';

const TARGET_ARROW_MARKER_ID = 'createConnectionTargetArrowMarker';

const END_OFFSET_X = 30;
const END_OFFSET_Y = -30;

export function dragConnectorEndPoint(
  x: number,
  y: number,
  size: number,
  dragX: number,
  dragY: number,
  isDragging: boolean,
): Point {
  const endPointX: number = size / 2 + END_OFFSET_X + (isDragging ? dragX - x : 0);
  const endPointY: number = size / 2 + END_OFFSET_Y + (isDragging ? dragY - y : 0);
  return [endPointX, endPointY];
}

export const DraggingCreateConnector: React.FC<DragConnectionProps> = ({
  x,
  y,
  size,
  dragX,
  dragY,
  isDragging,
  onHover,
}) => {
  const endPoint: Point = dragConnectorEndPoint(x, y, size, dragX, dragY, isDragging);

  // Get the start point which is on the edge of the node
  const length = Math.sqrt(endPoint[0] ** 2 + endPoint[1] ** 2);
  const ratio = size / 2 / length;
  const startPoint: Point = [endPoint[0] * ratio, endPoint[1] * ratio];

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g
        onMouseEnter={() => onHover && onHover(true)}
        onMouseLeave={() => onHover && onHover(false)}
      >
        <g>
          <SvgArrowMarker
            id={TARGET_ARROW_MARKER_ID}
            nodeSize={-5}
            markerSize={12}
            className="odc-creator-edge-marker"
          />
        </g>
        {!isDragging && (
          <path
            className="odc-creator-edge__hover-box"
            d={hullPath([startPoint, endPoint], 15)}
            fillOpacity={0}
          />
        )}
        <line
          className="odc-base-edge odc-creator-edge"
          x1={startPoint[0]}
          y1={startPoint[1]}
          x2={endPoint[0]}
          y2={endPoint[1]}
          markerEnd={createSvgIdUrl(TARGET_ARROW_MARKER_ID)}
        />
      </g>
    </g>
  );
};
