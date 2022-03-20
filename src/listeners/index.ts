import { default as clickEditValue } from "./clickEditValue";
import { default as clickEditSchema } from "./clickEditSchema";
import { default as clickQuickUpdate } from "./clickQuickUpdate";
import { default as talkToBot } from "./talkToBot";
import { default as saveEditValue } from "./saveUpdateValue";
import { default as saveSchemaEdit } from "./saveSchemaEdit";
import { default as saveSchemaAdd } from "./saveSchemaAdd";
import { default as clickAddSchemaField } from "./clickAddSchemaField";
import { default as clickSchemaDelete } from "./clickSchemaDelete";
import { default as clickShowSchema } from "./clickShowSchema";
import { default as clickDataDump } from "./clickDataDump";

// Run these listeners on launch

export default [
  talkToBot,
  clickQuickUpdate,
  clickEditValue,
  saveEditValue,
  clickEditSchema,
  saveSchemaEdit,
  clickAddSchemaField,
  saveSchemaAdd,
  clickSchemaDelete,
  clickShowSchema,
  clickDataDump,
];
