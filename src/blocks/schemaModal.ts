const fieldDescriptions = {
  key: { description: 'Unique Question ID', optional: false, type: 'text' },
  label: { description: 'Question Name', optional: false, type: 'text' },
  description: {
    description: 'Question Description',
    optional: false,
    type: 'text',
  },
  type: {
    description: 'Question Type',
    optional: false,
    type: 'select',
    options: ['Text', 'Yes/No'],
  },
  area: {
    description: 'Category',
    optional: false,
    type: 'select',
    options: ['PD', 'Tech', 'Both'],
  },
  integration: {
    description: 'Is this an Integration?',
    optional: false,
    type: 'select',
    options: ['Yes', 'No'],
  },
  default_value: {
    description: 'Default Value',
    type: 'text',
    optional: true,
  },
};

export default ({ schemaKey, schemaItem, timestamp, channelID, mode }: any) => {
  const blocks = [
    ...Object.entries(fieldDescriptions).map(([key, options]) => {
      const schemaValue = mode === 'add' ? '' : schemaItem[key];
      const value =
        typeof schemaValue === 'boolean'
          ? schemaValue
            ? 'Yes'
            : 'No'
          : schemaValue;
      if (options.type === 'text') {
        return {
          type: 'input',
          optional: options.optional,
          block_id: `${key}`,
          element: {
            type: 'plain_text_input',
            action_id: `value`,
            ...(value ? { initial_value: value } : {}),
            placeholder: {
              type: 'plain_text',
              text: 'Not set',
            },
          },
          label: {
            type: 'plain_text',
            text: `${options.description}`,
          },
        };
      } else if (options.type === 'select') {
        return {
          type: 'input',
          optional: options.optional,
          block_id: `${key}`,
          element: {
            type: 'static_select',
            action_id: `value`,
            ...(value
              ? {
                  initial_option: {
                    text: { type: 'plain_text', text: value },
                    value: value,
                  },
                }
              : {}),
            placeholder: {
              type: 'plain_text',
              text: options.description,
            },
            options: (options as any).options.map((option) => ({
              text: { type: 'plain_text', text: option },
              value: option,
            })),
          },
          label: {
            type: 'plain_text',
            text: `${options.description}`,
          },
        };
      }
    }),
    ...(mode === 'edit'
      ? [
          {
            type: 'actions',
            block_id: `delete`,
            elements: [
              {
                type: 'button',
                style: 'danger',
                action_id: 'DELETE_SCHEMA_FIELD',
                text: {
                  type: 'plain_text',
                  text: '🗑 Delete Question',
                  emoji: true,
                },
              },
            ],
          },
        ]
      : []),
  ];
  return {
    title: {
      type: 'plain_text',
      text: mode === 'add' ? 'New Question' : `Edit Question`,
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
    blocks,
    type: 'modal',
    callback_id: mode === 'add' ? 'SAVE_SCHEMA_ADD' : 'SAVE_SCHEMA_EDIT',
  };
};
