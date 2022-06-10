import React from 'react';
import FieldInput from 'shared/components/FieldInput';
import { requiredField } from 'shared/components/Validation/rules';
import { FieldTextArea } from 'shared/components/FieldTextArea';
import { Flex, Text } from 'design';
import Toggle from 'teleport/components/Toggle';
import { ShareFeedbackFormValues } from './types';

interface ShareFeedbackFormProps {
  formValues: ShareFeedbackFormValues;

  setFormValues(values: ShareFeedbackFormValues): void;
}

export function ShareFeedbackForm({
  formValues,
  setFormValues,
}: ShareFeedbackFormProps) {
  const isFieldRequiringEmailEnabled =
    formValues.newsletterEnabled || formValues.salesContactEnabled;

  function updateFormField<T extends keyof ShareFeedbackFormValues>(
    field: T,
    value: ShareFeedbackFormValues[T]
  ) {
    setFormValues({ ...formValues, [field]: value });
  }

  return (
    <>
      <FieldInput
        mt={3}
        type="email"
        label="Email Address"
        autoFocus
        css={`
          input {
            font-size: 14px;
          }
        `}
        rule={value =>
          isFieldRequiringEmailEnabled
            ? requiredField('Email is required')(value)
            : () => ({ valid: true })
        }
        value={formValues.email}
        onChange={e => updateFormField('email', e.target.value)}
      />
      <FieldTextArea
        mt={1}
        label="Any suggestions?"
        textAreaCss={`
                font-size: 14px;
              `}
        value={formValues.feedback}
        onChange={e => updateFormField('feedback', e.target.value)}
        placeholder="Type your suggestions here"
      />
      <Flex>
        <Toggle
          isToggled={formValues.newsletterEnabled}
          onToggle={() => {
            updateFormField('newsletterEnabled', !formValues.newsletterEnabled);
          }}
        />
        <Text ml={2} color="text.primary">
          Sign me up for the newsletter
        </Text>
      </Flex>
      <Flex>
        <Toggle
          isToggled={formValues.salesContactEnabled}
          onToggle={() => {
            updateFormField(
              'salesContactEnabled',
              !formValues.salesContactEnabled
            );
          }}
        />
        <Text ml={2} color="text.primary">
          I want to be contacted by the sales team
        </Text>
      </Flex>
    </>
  );
}
