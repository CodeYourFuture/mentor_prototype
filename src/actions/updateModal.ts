import schema from '../schema';

export const modal = ({
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
    callback_id: 'SUBMIT_MODAL',
  };
};

// export default async ({ say, slackclient, student, timestamp }: any) => {
//   const studentProfile = await slackclient.users.profile.get({
//     user: student,
//   });
//   const studentName = studentProfile.profile.real_name;
//   const actionValue = `${student}:${timestamp}`;
//   const fields = schema.map(({ key, label, area, description }) => {
//     return {
//       type: 'input',
//       block_id: `${student}_${key}_input`,
//       label: {
//         type: 'plain_text',
//         text: label,
//       },
//       element: {
//         type: 'plain_text_input',
//         action_id: 'plain_input',
//         initial_value: '',
//         placeholder: {
//           type: 'plain_text',
//           text: 'Enter some plain text',
//         },
//       },
//     };
//   });
//   const blocks = [
//     {
//       type: 'context',
//       elements: [
//         {
//           type: 'mrkdwn',
//           text: `Summary of *${studentName}*\n\n`,
//         },
//       ],
//     },
//     {
//       type: 'divider',
//     },
//     ...fields,
//     {
//       type: 'divider',
//     },
//     {
//       type: 'actions',
//       elements: [
//         {
//           type: 'button',
//           style: 'danger',
//           action_id: 'UPDATE_RECORDS',
//           text: {
//             type: 'plain_text',
//             text: 'Update',
//             emoji: true,
//           },
//           value: actionValue,
//         },
//       ],
//     },
//   ];

//   await say({ blocks, text: '', thread_ts: timestamp });
// };
