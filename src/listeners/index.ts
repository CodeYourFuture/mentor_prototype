import { default as clickEditValue } from './clickEditValue';
import { default as clickEditSchema } from './clickEditSchema';
import { default as clickQuickUpdate } from './clickQuickUpdate';
import { default as talkToBot } from './talkToBot';
import { default as saveUpdateValue } from './saveUpdateValue';
import { default as saveSchemaEdit } from './saveSchemaEdit';

// Run these listeners on launch

export default [
  clickEditValue,
  clickQuickUpdate,
  talkToBot,
  saveUpdateValue,
  clickEditSchema,
  saveSchemaEdit,
];
