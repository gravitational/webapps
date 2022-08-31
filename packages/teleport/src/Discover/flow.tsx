import React from 'react';

import { ResourceKind } from 'teleport/Discover/Shared';
import { AgentStepComponent } from 'teleport/Discover/types';

export interface Resource {
  kind: ResourceKind;
  views: View[];
  icon: React.ReactElement;
}

export interface View {
  title: string;
  component?: AgentStepComponent;
  hide?: boolean;
  index?: number;
  views?: View[];
}

// computeViewChildrenSize calculates how many children a view has, without counting the first
// child. This is because the first child shares the same index with its parent, so we don't
// need to count it as it's not taking up a new index
export function computeViewChildrenSize(views: View[]) {
  let size = 0;
  for (const view of views) {
    if (view.views) {
      size += computeViewChildrenSize(view.views);
    } else {
      size += 1;
    }
  }

  return size;
}

// addIndexToViews will recursively loop over the given views, adding an index value to each one
// The first child shares its index with the parent, as we effectively ignore the fact the parent
// exists when trying to find the active view by the current step index.
export function addIndexToViews(views: View[], index = 0): View[] {
  const result: View[] = [];

  for (const view of views) {
    const copy = {
      ...view,
      index,
      parent,
    };

    if (view.views) {
      copy.views = addIndexToViews(view.views, index);

      index += computeViewChildrenSize(view.views);
    } else {
      index += 1;
    }

    result.push(copy);
  }

  return result;
}

// findViewAtIndex will recursively loop views and their children in order to find the deepest
// match at that index.
export function findViewAtIndex(
  views: View[],
  currentStep: number
): View | null {
  for (const view of views) {
    if (view.views) {
      const result = findViewAtIndex(view.views, currentStep);

      if (result) {
        return result;
      }
    }

    if (currentStep === view.index) {
      return view;
    }
  }
}

// hasActiveChildren will recursively loop through views and their children in order to find
// out if there is a view with a matching index to the given `currentStep` value
// This is because a parent is active as long as its children are active
export function hasActiveChildren(views: View[], currentStep: number) {
  for (const view of views) {
    if (view.index === currentStep) {
      return true;
    }

    if (view.views) {
      const result = hasActiveChildren(view.views, currentStep);

      if (result) {
        return true;
      }
    }
  }

  return false;
}
