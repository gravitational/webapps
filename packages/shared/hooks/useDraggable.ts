/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { useState, useCallback, useEffect } from 'react';

const POSITION = { x: 0, y: 0 };

export default function useDraggable(boundaries?: DraggableBoundaries) {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    position: POSITION,
  });

  const onMouseDown = useCallback(event => {
    // disable text selection
    event.stopPropagation();
    event.preventDefault();
    const { clientX, clientY } = event;
    setState(state => ({
      ...state,
      isDragging: true,
      origin: { x: clientX, y: clientY },
    }));
  }, []);

  const onMouseMove = useCallback(
    event => {
      const absolutePosition = boundaries
        ? getPositionWithinBoundaries(event, boundaries)
        : { x: event.clientX, y: event.clientY };
      const position = {
        x: absolutePosition.x - state.origin.x,
        y: absolutePosition.y - state.origin.y,
      };

      setState(state => ({
        ...state,
        position,
      }));
    },
    [state.origin]
  );

  const onMouseUp = useCallback(() => {
    setState(state => ({
      ...state,
      isDragging: false,
    }));
  }, []);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      setState(state => ({ ...state, position: { x: 0, y: 0 } }));
    }
  }, [state.isDragging, onMouseMove, onMouseUp]);

  return {
    onMouseDown,
    isDragging: state.isDragging,
    position: state.position,
  };
}

function getPositionWithinBoundaries(
  event: MouseEvent,
  boundaries: DraggableBoundaries
): DraggablePosition {
  const position = {
    y: event.clientY,
    x: event.clientX,
  };
  const minX = boundaries.getMinX?.();
  const maxX = boundaries.getMaxX?.();
  const minY = boundaries.getMinY?.();
  const maxY = boundaries.getMaxY?.();

  if (!isNaN(minY) && event.clientY < minY) {
    position.y = minY;
  }
  if (!isNaN(maxY) && event.clientY > maxY) {
    position.y = maxY;
  }
  if (!isNaN(minX) && event.clientX < minX) {
    position.x = minX;
  }
  if (!isNaN(maxX) && event.clientX > maxX) {
    position.x = maxX;
  }
  return position;
}

export interface DraggablePosition {
  x: number;
  y: number;
}

interface DraggableBoundaries {
  getMinX?(): number;
  getMaxX?(): number;
  getMinY?(): number;
  getMaxY?(): number;
}
