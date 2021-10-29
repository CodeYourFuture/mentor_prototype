const fieldDescriptions = {
  label: 'Human readable label',
  description: 'A simple description of this field',
  type: 'text or yes/no',
  area: 'PD or Tech',
  default_value: 'The starting value of this field',
  integration: 'Is this derived from an integration?',
};

export default ({ schemaKey, schemaItem, timestamp, channelID }) => {
  return {
    title: {
      type: 'plain_text',
      text: `Edit Schema`,
    },
    submit: {
      type: 'plain_text',
      text: 'Submit',
    },
    private_metadata: JSON.stringify({
      schemaKey,
      timestamp,
      channelID,
    }),
    blocks: Object.entries(fieldDescriptions).map(([key, description]) => {
      const schemaValue = schemaItem[key];
      const value =
        typeof schemaValue === 'boolean' ? schemaValue.toString() : schemaValue;
      return {
        type: 'input',
        block_id: `${key}`,
        element: {
          type: 'plain_text_input',
          action_id: `value`,
          ...(value ? { initial_value: value } : {}),
          placeholder: {
            type: 'plain_text',
            text: description,
          },
        },
        label: {
          type: 'plain_text',
          text: `${key}`,
        },
      };
    }),
    type: 'modal',
    callback_id: 'SAVE_SCHEMA_EDIT',
  };
};
