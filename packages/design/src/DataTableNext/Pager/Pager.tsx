import React from 'react';
import { Flex, Text } from 'design';
import { CircleArrowLeft, CircleArrowRight } from 'design/Icon';
import { StyledArrowBtn, StyledFetchMoreBtn } from './StyledPager';
import usePager, { State, Props } from './usePager';

export default function Container(props: Props) {
  const state = usePager(props);
  return <Pager {...state} />;
}

export function Pager({
  nextPage,
  prevPage,
  isNextDisabled,
  isPrevDisabled,
  from,
  to,
  count,
  fetchMore,
}: State) {
  return (
    <Flex justifyContent={fetchMore ? 'space-between' : 'end'} width="100%">
      {fetchMore && (
        <StyledFetchMoreBtn onClick={fetchMore}>Fetch More</StyledFetchMoreBtn>
      )}
      <Flex alignItems="center">
        <Text typography="body2" color="primary.contrastText" mr={2}>
          SHOWING <strong>{from + 1}</strong> - <strong>{to + 1}</strong> of{' '}
          <strong>{count}</strong>
        </Text>
        <StyledArrowBtn
          onClick={prevPage}
          title="Previous page"
          disabled={isPrevDisabled}
          mr={0}
        >
          <CircleArrowLeft fontSize="3" />
        </StyledArrowBtn>
        <StyledArrowBtn
          ml={0}
          onClick={nextPage}
          title="Next page"
          disabled={isNextDisabled}
        >
          <CircleArrowRight fontSize="3" />
        </StyledArrowBtn>
      </Flex>
    </Flex>
  );
}
