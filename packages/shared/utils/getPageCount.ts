import type { AgentResponse, AgentKind } from 'teleport/services/agents';

export default function getPageCount({ page, fetchedData, limit = 15 }: Props) {
  // Calculate counts for our resource list.
  let from = 0;
  let to = 0;
  let total = 0;
  if (fetchedData.totalCount) {
    from = page.index * limit + 1;
    to = from + fetchedData.agents.length - 1;
    total = fetchedData.totalCount;
  }
  return {
    from,
    to,
    total,
  };
}

// Page keeps track of our current agent list
//  start keys and current position.
export type Page = {
  // keys are the list of start keys collected from
  // each page fetch.
  keys: string[];
  // index refers to the current index the page
  // is at in the list of keys.
  index: number;
};

type Props = {
  page: Page;
  fetchedData: AgentResponse<AgentKind>;
  limit?: number;
};
