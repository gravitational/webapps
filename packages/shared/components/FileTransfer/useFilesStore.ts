/**
 * Copyright 2022 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useCallback, useMemo, useReducer, useRef } from 'react';
import { unique } from 'teleterm/ui/utils';

import {
  RunFileTransfer,
  TransferredFile,
  TransferState,
} from './FileTransferStateless';

type FilesStoreState = {
  ids: string[];
  filesById: Record<string, TransferredFile>;
};

type NewTransferredFile = Omit<TransferredFile, 'transferState'> & {
  runFileTransfer: RunFileTransfer;
};

type FilesStoreActions =
  | {
      type: 'add';
      payload: Pick<TransferredFile, 'id' | 'name'>;
    }
  | {
      type: 'updateTransferState';
      payload: {
        id: string;
        transferState: TransferState;
      };
    };

const initialState: FilesStoreState = {
  ids: [],
  filesById: {},
};

function reducer(
  state: typeof initialState,
  action: FilesStoreActions
): typeof initialState {
  switch (action.type) {
    case 'add': {
      return {
        ids: [...state.ids, action.payload.id],
        filesById: {
          ...state.filesById,
          [action.payload.id]: {
            ...action.payload,
            transferState: { type: 'processing', progress: 0 },
          },
        },
      };
    }
    case 'updateTransferState': {
      const getNextTransferState = (): TransferState => {
        if (action.payload.transferState.type === 'error') {
          const { transferState: currentTransferState } =
            state.filesById[action.payload.id];
          return {
            ...action.payload.transferState,
            progress:
              currentTransferState.type === 'processing'
                ? currentTransferState.progress
                : 0,
          };
        }
        return action.payload.transferState;
      };

      return {
        ...state,
        filesById: {
          ...state.filesById,
          [action.payload.id]: {
            ...state.filesById[action.payload.id],
            transferState: getNextTransferState(),
          },
        },
      };
    }
    default:
      throw new Error('Unhandled action', action);
  }
}

export const useFilesStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fileTransferControllers = useRef(
    new Map<
      string,
      { runFileTransfer: RunFileTransfer; abortController: AbortController }
    >()
  );

  const add = (file: Omit<NewTransferredFile, 'id'>) => {
    const id = unique();

    dispatch({ type: 'add', payload: { id, name: file.name } });
    fileTransferControllers.current.set(id, {
      runFileTransfer: file.runFileTransfer,
      abortController: new AbortController(),
    });
  };

  const updateTransferState = useCallback(
    (id: string, transferState: TransferState) => {
      dispatch({ type: 'updateTransferState', payload: { id, transferState } });
    },
    []
  );

  const start = useCallback(
    (id: string) => {
      const { runFileTransfer, abortController } =
        fileTransferControllers.current.get(id);

      runFileTransfer(
        {
          onComplete: () =>
            updateTransferState(id, {
              type: 'completed',
            }),
          onError: error =>
            updateTransferState(id, {
              type: 'error',
              progress: undefined,
              error,
            }),
          onProgress: progress =>
            updateTransferState(id, {
              type: 'processing',
              progress,
            }),
        },
        abortController
      );
    },
    [updateTransferState]
  );

  const cancel = useCallback((id: string) => {
    fileTransferControllers.current?.get(id).abortController.abort();
  }, []);

  const files = useMemo(
    () => state.ids.map(id => state.filesById[id]),
    [state.ids, state.filesById]
  );

  const isAnyTransferInProgress = useCallback(
    () => files.some(file => file.transferState.type === 'processing'),
    [files]
  );

  return {
    files,
    start,
    cancel,
    add,
    isAnyTransferInProgress,
  };
};
