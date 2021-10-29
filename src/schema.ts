export default [
  {
    key: 'attendance',
    label: 'Class Attendance',
    area: 'PD',
    type: 'text',
    description: 'Percentage of classes attended',
    defaultValue: '0%',
  },
  {
    key: 'codewars',
    label: 'Codewars Score',
    area: 'Tech',
    description: 'Score on codewars.com (lower is better)',
    integration: true,
  },
  {
    key: 'cv_written',
    label: 'Has written a CV',
    area: 'Tech',
    description: 'Written and submitted a CV?',
    defaultValue: 'No',
  },
];
