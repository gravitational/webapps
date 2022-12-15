import type { CSSProp } from 'styled-components';

import type { Theme } from './theme';

declare module 'styled-components' {
  /* eslint-disable-next-line @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends Theme {}
}

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: CSSProp;
    }
  }
}
