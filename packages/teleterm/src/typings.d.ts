declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
declare module '*.gif';
declare module '*.ico';

declare module 'raw-loader!*' {
  const contents: string;
  export = contents;
}
