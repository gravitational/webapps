import React from 'react';
import Validation, { useRule } from '.';
import { render, fireEvent, wait, screen } from 'design/utils/testing';

test('useRule', async () => {
  let results;
  await wait(() => {
    results = render(
      <TestValidation value="" rule={required} isVisible={true} />
    );
  });

  // tests initial run of useRule hook, returns valid set to true
  expect(results.container.firstChild.textContent).toBe('Valid');

  // tests that triggering validator, runs the rule cb
  // which tests successful subscription to onValidate (that calls rule cb)
  fireEvent.click(screen.getByRole('button'));
  expect(results.container.firstChild.textContent).toBe(
    'this field is required'
  );

  // rerender component with proper value and expect no errors
  // tests that rule cb is called which proves that there is one instance of Validator
  results.rerender(
    <TestValidation value="mama" rule={required} isVisible={true} />
  );
  expect(results.container.firstChild.textContent).toBe('Valid');

  // test unmount unsubscribes onValidate
  results.unmount();
  results.rerender(
    <TestValidation value="mama" rule={required} isVisible={false} />
  );
  fireEvent.click(screen.getByRole('button'));
  expect(results.container.firstChild.textContent).toBe('');
});

// Component to setup Validation context
function TestValidation(props) {
  return (
    <Validation>
      {({ validator }) => (
        <>
          {props.isVisible ? (
            <TestUseRule value={props.value} rule={props.rule} />
          ) : null}
          <button role="button" onClick={() => validator.validate()} />
        </>
      )}
    </Validation>
  );
}

// Component to test useRule
function TestUseRule({ value, rule }) {
  const results = useRule(rule(value));
  return (
    <>
      {results.valid && 'Valid'}
      {!results.valid && results.message}
    </>
  );
}

// a rule to use for useRule
const required = value => () => {
  return {
    valid: !!value,
    message: !value ? 'this field is required' : '',
  };
};
