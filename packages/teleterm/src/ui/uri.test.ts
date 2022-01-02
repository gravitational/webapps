import { matchPath } from 'react-router';

test('fetch billing information', async () => {
  debugger;

  // <Route path="/section/(page)?/:page?/(sort)?/:sort?" component={Section} />

  const z = matchPath;
  const aa = z(
    '/clusters/c1/leaves/l1/servers/s3',
    '/clusters/:rootCluster/(leaves)?/:leaf?/servers/:server'
  );
  expect(aa).toEqual(1);
});
