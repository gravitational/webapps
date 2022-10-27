import { Page } from './getPageCount';

export default function getStartKey({ dir = '', page }: Props) {
  switch (dir) {
    case 'prev':
      return page.keys[page.index - 1];
    case 'next':
      return page.keys[page.index + 1];
    default:
      return undefined;
  }
}

type Props = {
  dir: '' | 'prev' | 'next';
  page: Page;
};
