export default ({
  studentID,
  timestamp,
  schemaItem,
  currentValue,
  studentName,
  channelID,
  data,
}) => {
  return {
    title: {
      type: 'plain_text',
      text: `${studentName}`,
    },
    submit: {
      type: 'plain_text',
      text: 'Submit',
    },
    private_metadata: JSON.stringify({
      schemaItem,
      studentID,
      timestamp,
      channelID,
      studentName,
      data,
    }),
    blocks: [
      {
        type: 'input',
        block_id: 'view',
        element: {
          type: 'plain_text_input',
          action_id: 'input',
          ...(currentValue ? { initial_value: currentValue } : {}),
          placeholder: {
            type: 'plain_text',
            text: schemaItem.description || 'Not set',
          },
        },
        label: {
          type: 'plain_text',
          text: `${schemaItem.label}`,
        },
      },
    ],
    type: 'modal',
    callback_id: 'SAVE_UPDATE_VALUE',
  };
};
