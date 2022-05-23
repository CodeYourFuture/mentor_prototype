import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
import * as React from "react";
import * as ApolloReactComponents from "@apollo/client/react/components";
import * as ApolloReactHoc from "@apollo/client/react/hoc";
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  numeric: number;
  timestamptz: string;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["Boolean"]>;
  _gt?: InputMaybe<Scalars["Boolean"]>;
  _gte?: InputMaybe<Scalars["Boolean"]>;
  _in?: InputMaybe<Array<Scalars["Boolean"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["Boolean"]>;
  _lte?: InputMaybe<Scalars["Boolean"]>;
  _neq?: InputMaybe<Scalars["Boolean"]>;
  _nin?: InputMaybe<Array<Scalars["Boolean"]>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["Int"]>;
  _gt?: InputMaybe<Scalars["Int"]>;
  _gte?: InputMaybe<Scalars["Int"]>;
  _in?: InputMaybe<Array<Scalars["Int"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["Int"]>;
  _lte?: InputMaybe<Scalars["Int"]>;
  _neq?: InputMaybe<Scalars["Int"]>;
  _nin?: InputMaybe<Array<Scalars["Int"]>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["String"]>;
  _gt?: InputMaybe<Scalars["String"]>;
  _gte?: InputMaybe<Scalars["String"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars["String"]>;
  _in?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars["String"]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars["String"]>;
  _lt?: InputMaybe<Scalars["String"]>;
  _lte?: InputMaybe<Scalars["String"]>;
  _neq?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars["String"]>;
  _nin?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars["String"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars["String"]>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars["String"]>;
};

/** columns and relationships of "accounts" */
export type Accounts = {
  __typename?: "accounts";
  access_token?: Maybe<Scalars["String"]>;
  access_token_expires?: Maybe<Scalars["timestamptz"]>;
  compound_id: Scalars["String"];
  created_at: Scalars["timestamptz"];
  id: Scalars["uuid"];
  provider_account_id: Scalars["String"];
  provider_id: Scalars["String"];
  provider_type: Scalars["String"];
  refresh_token?: Maybe<Scalars["String"]>;
  updated_at: Scalars["timestamptz"];
  user_id: Scalars["uuid"];
};

/** aggregated selection of "accounts" */
export type Accounts_Aggregate = {
  __typename?: "accounts_aggregate";
  aggregate?: Maybe<Accounts_Aggregate_Fields>;
  nodes: Array<Accounts>;
};

/** aggregate fields of "accounts" */
export type Accounts_Aggregate_Fields = {
  __typename?: "accounts_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Accounts_Max_Fields>;
  min?: Maybe<Accounts_Min_Fields>;
};

/** aggregate fields of "accounts" */
export type Accounts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Accounts_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression to filter rows from the table "accounts". All fields are combined with a logical 'AND'. */
export type Accounts_Bool_Exp = {
  _and?: InputMaybe<Array<Accounts_Bool_Exp>>;
  _not?: InputMaybe<Accounts_Bool_Exp>;
  _or?: InputMaybe<Array<Accounts_Bool_Exp>>;
  access_token?: InputMaybe<String_Comparison_Exp>;
  access_token_expires?: InputMaybe<Timestamptz_Comparison_Exp>;
  compound_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  provider_account_id?: InputMaybe<String_Comparison_Exp>;
  provider_id?: InputMaybe<String_Comparison_Exp>;
  provider_type?: InputMaybe<String_Comparison_Exp>;
  refresh_token?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "accounts" */
export enum Accounts_Constraint {
  /** unique or primary key constraint */
  AccountsPkey = "accounts_pkey",
}

/** input type for inserting data into table "accounts" */
export type Accounts_Insert_Input = {
  access_token?: InputMaybe<Scalars["String"]>;
  access_token_expires?: InputMaybe<Scalars["timestamptz"]>;
  compound_id?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  provider_account_id?: InputMaybe<Scalars["String"]>;
  provider_id?: InputMaybe<Scalars["String"]>;
  provider_type?: InputMaybe<Scalars["String"]>;
  refresh_token?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Accounts_Max_Fields = {
  __typename?: "accounts_max_fields";
  access_token?: Maybe<Scalars["String"]>;
  access_token_expires?: Maybe<Scalars["timestamptz"]>;
  compound_id?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  provider_account_id?: Maybe<Scalars["String"]>;
  provider_id?: Maybe<Scalars["String"]>;
  provider_type?: Maybe<Scalars["String"]>;
  refresh_token?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** aggregate min on columns */
export type Accounts_Min_Fields = {
  __typename?: "accounts_min_fields";
  access_token?: Maybe<Scalars["String"]>;
  access_token_expires?: Maybe<Scalars["timestamptz"]>;
  compound_id?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  provider_account_id?: Maybe<Scalars["String"]>;
  provider_id?: Maybe<Scalars["String"]>;
  provider_type?: Maybe<Scalars["String"]>;
  refresh_token?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
};

/** response of any mutation on the table "accounts" */
export type Accounts_Mutation_Response = {
  __typename?: "accounts_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Accounts>;
};

/** on conflict condition type for table "accounts" */
export type Accounts_On_Conflict = {
  constraint: Accounts_Constraint;
  update_columns?: Array<Accounts_Update_Column>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};

/** Ordering options when selecting data from "accounts". */
export type Accounts_Order_By = {
  access_token?: InputMaybe<Order_By>;
  access_token_expires?: InputMaybe<Order_By>;
  compound_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  provider_account_id?: InputMaybe<Order_By>;
  provider_id?: InputMaybe<Order_By>;
  provider_type?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: accounts */
export type Accounts_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "accounts" */
export enum Accounts_Select_Column {
  /** column name */
  AccessToken = "access_token",
  /** column name */
  AccessTokenExpires = "access_token_expires",
  /** column name */
  CompoundId = "compound_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  ProviderAccountId = "provider_account_id",
  /** column name */
  ProviderId = "provider_id",
  /** column name */
  ProviderType = "provider_type",
  /** column name */
  RefreshToken = "refresh_token",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "accounts" */
export type Accounts_Set_Input = {
  access_token?: InputMaybe<Scalars["String"]>;
  access_token_expires?: InputMaybe<Scalars["timestamptz"]>;
  compound_id?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  provider_account_id?: InputMaybe<Scalars["String"]>;
  provider_id?: InputMaybe<Scalars["String"]>;
  provider_type?: InputMaybe<Scalars["String"]>;
  refresh_token?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "accounts" */
export enum Accounts_Update_Column {
  /** column name */
  AccessToken = "access_token",
  /** column name */
  AccessTokenExpires = "access_token_expires",
  /** column name */
  CompoundId = "compound_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  ProviderAccountId = "provider_account_id",
  /** column name */
  ProviderId = "provider_id",
  /** column name */
  ProviderType = "provider_type",
  /** column name */
  RefreshToken = "refresh_token",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** columns and relationships of "impact" */
export type Impact = {
  __typename?: "impact";
  context?: Maybe<Scalars["String"]>;
  id: Scalars["uuid"];
  image?: Maybe<Scalars["String"]>;
  indicator: Scalars["String"];
  org: Scalars["uuid"];
  /** An object relationship */
  orgByOrg: Orgs;
  prefix?: Maybe<Scalars["String"]>;
  priority: Scalars["Int"];
  sdg: Scalars["String"];
  suffix?: Maybe<Scalars["String"]>;
  test_col?: Maybe<Scalars["String"]>;
  value: Scalars["numeric"];
};

/** aggregated selection of "impact" */
export type Impact_Aggregate = {
  __typename?: "impact_aggregate";
  aggregate?: Maybe<Impact_Aggregate_Fields>;
  nodes: Array<Impact>;
};

/** aggregate fields of "impact" */
export type Impact_Aggregate_Fields = {
  __typename?: "impact_aggregate_fields";
  avg?: Maybe<Impact_Avg_Fields>;
  count: Scalars["Int"];
  max?: Maybe<Impact_Max_Fields>;
  min?: Maybe<Impact_Min_Fields>;
  stddev?: Maybe<Impact_Stddev_Fields>;
  stddev_pop?: Maybe<Impact_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Impact_Stddev_Samp_Fields>;
  sum?: Maybe<Impact_Sum_Fields>;
  var_pop?: Maybe<Impact_Var_Pop_Fields>;
  var_samp?: Maybe<Impact_Var_Samp_Fields>;
  variance?: Maybe<Impact_Variance_Fields>;
};

/** aggregate fields of "impact" */
export type Impact_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Impact_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "impact" */
export type Impact_Aggregate_Order_By = {
  avg?: InputMaybe<Impact_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Impact_Max_Order_By>;
  min?: InputMaybe<Impact_Min_Order_By>;
  stddev?: InputMaybe<Impact_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Impact_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Impact_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Impact_Sum_Order_By>;
  var_pop?: InputMaybe<Impact_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Impact_Var_Samp_Order_By>;
  variance?: InputMaybe<Impact_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "impact" */
export type Impact_Arr_Rel_Insert_Input = {
  data: Array<Impact_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Impact_On_Conflict>;
};

/** aggregate avg on columns */
export type Impact_Avg_Fields = {
  __typename?: "impact_avg_fields";
  priority?: Maybe<Scalars["Float"]>;
  value?: Maybe<Scalars["Float"]>;
};

/** order by avg() on columns of table "impact" */
export type Impact_Avg_Order_By = {
  priority?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "impact". All fields are combined with a logical 'AND'. */
export type Impact_Bool_Exp = {
  _and?: InputMaybe<Array<Impact_Bool_Exp>>;
  _not?: InputMaybe<Impact_Bool_Exp>;
  _or?: InputMaybe<Array<Impact_Bool_Exp>>;
  context?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  indicator?: InputMaybe<String_Comparison_Exp>;
  org?: InputMaybe<Uuid_Comparison_Exp>;
  orgByOrg?: InputMaybe<Orgs_Bool_Exp>;
  prefix?: InputMaybe<String_Comparison_Exp>;
  priority?: InputMaybe<Int_Comparison_Exp>;
  sdg?: InputMaybe<String_Comparison_Exp>;
  suffix?: InputMaybe<String_Comparison_Exp>;
  test_col?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "impact" */
export enum Impact_Constraint {
  /** unique or primary key constraint */
  ImpactPkey = "impact_pkey",
}

/** input type for incrementing numeric columns in table "impact" */
export type Impact_Inc_Input = {
  priority?: InputMaybe<Scalars["Int"]>;
  value?: InputMaybe<Scalars["numeric"]>;
};

/** input type for inserting data into table "impact" */
export type Impact_Insert_Input = {
  context?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  image?: InputMaybe<Scalars["String"]>;
  indicator?: InputMaybe<Scalars["String"]>;
  org?: InputMaybe<Scalars["uuid"]>;
  orgByOrg?: InputMaybe<Orgs_Obj_Rel_Insert_Input>;
  prefix?: InputMaybe<Scalars["String"]>;
  priority?: InputMaybe<Scalars["Int"]>;
  sdg?: InputMaybe<Scalars["String"]>;
  suffix?: InputMaybe<Scalars["String"]>;
  test_col?: InputMaybe<Scalars["String"]>;
  value?: InputMaybe<Scalars["numeric"]>;
};

/** aggregate max on columns */
export type Impact_Max_Fields = {
  __typename?: "impact_max_fields";
  context?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  image?: Maybe<Scalars["String"]>;
  indicator?: Maybe<Scalars["String"]>;
  org?: Maybe<Scalars["uuid"]>;
  prefix?: Maybe<Scalars["String"]>;
  priority?: Maybe<Scalars["Int"]>;
  sdg?: Maybe<Scalars["String"]>;
  suffix?: Maybe<Scalars["String"]>;
  test_col?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["numeric"]>;
};

/** order by max() on columns of table "impact" */
export type Impact_Max_Order_By = {
  context?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  indicator?: InputMaybe<Order_By>;
  org?: InputMaybe<Order_By>;
  prefix?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
  sdg?: InputMaybe<Order_By>;
  suffix?: InputMaybe<Order_By>;
  test_col?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Impact_Min_Fields = {
  __typename?: "impact_min_fields";
  context?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  image?: Maybe<Scalars["String"]>;
  indicator?: Maybe<Scalars["String"]>;
  org?: Maybe<Scalars["uuid"]>;
  prefix?: Maybe<Scalars["String"]>;
  priority?: Maybe<Scalars["Int"]>;
  sdg?: Maybe<Scalars["String"]>;
  suffix?: Maybe<Scalars["String"]>;
  test_col?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["numeric"]>;
};

/** order by min() on columns of table "impact" */
export type Impact_Min_Order_By = {
  context?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  indicator?: InputMaybe<Order_By>;
  org?: InputMaybe<Order_By>;
  prefix?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
  sdg?: InputMaybe<Order_By>;
  suffix?: InputMaybe<Order_By>;
  test_col?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "impact" */
export type Impact_Mutation_Response = {
  __typename?: "impact_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Impact>;
};

/** on conflict condition type for table "impact" */
export type Impact_On_Conflict = {
  constraint: Impact_Constraint;
  update_columns?: Array<Impact_Update_Column>;
  where?: InputMaybe<Impact_Bool_Exp>;
};

/** Ordering options when selecting data from "impact". */
export type Impact_Order_By = {
  context?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  indicator?: InputMaybe<Order_By>;
  org?: InputMaybe<Order_By>;
  orgByOrg?: InputMaybe<Orgs_Order_By>;
  prefix?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
  sdg?: InputMaybe<Order_By>;
  suffix?: InputMaybe<Order_By>;
  test_col?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: impact */
export type Impact_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "impact" */
export enum Impact_Select_Column {
  /** column name */
  Context = "context",
  /** column name */
  Id = "id",
  /** column name */
  Image = "image",
  /** column name */
  Indicator = "indicator",
  /** column name */
  Org = "org",
  /** column name */
  Prefix = "prefix",
  /** column name */
  Priority = "priority",
  /** column name */
  Sdg = "sdg",
  /** column name */
  Suffix = "suffix",
  /** column name */
  TestCol = "test_col",
  /** column name */
  Value = "value",
}

/** input type for updating data in table "impact" */
export type Impact_Set_Input = {
  context?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  image?: InputMaybe<Scalars["String"]>;
  indicator?: InputMaybe<Scalars["String"]>;
  org?: InputMaybe<Scalars["uuid"]>;
  prefix?: InputMaybe<Scalars["String"]>;
  priority?: InputMaybe<Scalars["Int"]>;
  sdg?: InputMaybe<Scalars["String"]>;
  suffix?: InputMaybe<Scalars["String"]>;
  test_col?: InputMaybe<Scalars["String"]>;
  value?: InputMaybe<Scalars["numeric"]>;
};

/** aggregate stddev on columns */
export type Impact_Stddev_Fields = {
  __typename?: "impact_stddev_fields";
  priority?: Maybe<Scalars["Float"]>;
  value?: Maybe<Scalars["Float"]>;
};

/** order by stddev() on columns of table "impact" */
export type Impact_Stddev_Order_By = {
  priority?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Impact_Stddev_Pop_Fields = {
  __typename?: "impact_stddev_pop_fields";
  priority?: Maybe<Scalars["Float"]>;
  value?: Maybe<Scalars["Float"]>;
};

/** order by stddev_pop() on columns of table "impact" */
export type Impact_Stddev_Pop_Order_By = {
  priority?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Impact_Stddev_Samp_Fields = {
  __typename?: "impact_stddev_samp_fields";
  priority?: Maybe<Scalars["Float"]>;
  value?: Maybe<Scalars["Float"]>;
};

/** order by stddev_samp() on columns of table "impact" */
export type Impact_Stddev_Samp_Order_By = {
  priority?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Impact_Sum_Fields = {
  __typename?: "impact_sum_fields";
  priority?: Maybe<Scalars["Int"]>;
  value?: Maybe<Scalars["numeric"]>;
};

/** order by sum() on columns of table "impact" */
export type Impact_Sum_Order_By = {
  priority?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** update columns of table "impact" */
export enum Impact_Update_Column {
  /** column name */
  Context = "context",
  /** column name */
  Id = "id",
  /** column name */
  Image = "image",
  /** column name */
  Indicator = "indicator",
  /** column name */
  Org = "org",
  /** column name */
  Prefix = "prefix",
  /** column name */
  Priority = "priority",
  /** column name */
  Sdg = "sdg",
  /** column name */
  Suffix = "suffix",
  /** column name */
  TestCol = "test_col",
  /** column name */
  Value = "value",
}

/** aggregate var_pop on columns */
export type Impact_Var_Pop_Fields = {
  __typename?: "impact_var_pop_fields";
  priority?: Maybe<Scalars["Float"]>;
  value?: Maybe<Scalars["Float"]>;
};

/** order by var_pop() on columns of table "impact" */
export type Impact_Var_Pop_Order_By = {
  priority?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Impact_Var_Samp_Fields = {
  __typename?: "impact_var_samp_fields";
  priority?: Maybe<Scalars["Float"]>;
  value?: Maybe<Scalars["Float"]>;
};

/** order by var_samp() on columns of table "impact" */
export type Impact_Var_Samp_Order_By = {
  priority?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Impact_Variance_Fields = {
  __typename?: "impact_variance_fields";
  priority?: Maybe<Scalars["Float"]>;
  value?: Maybe<Scalars["Float"]>;
};

/** order by variance() on columns of table "impact" */
export type Impact_Variance_Order_By = {
  priority?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root";
  /** delete data from the table: "accounts" */
  delete_accounts?: Maybe<Accounts_Mutation_Response>;
  /** delete single row from the table: "accounts" */
  delete_accounts_by_pk?: Maybe<Accounts>;
  /** delete data from the table: "impact" */
  delete_impact?: Maybe<Impact_Mutation_Response>;
  /** delete single row from the table: "impact" */
  delete_impact_by_pk?: Maybe<Impact>;
  /** delete data from the table: "orgs" */
  delete_orgs?: Maybe<Orgs_Mutation_Response>;
  /** delete single row from the table: "orgs" */
  delete_orgs_by_pk?: Maybe<Orgs>;
  /** delete data from the table: "sessions" */
  delete_sessions?: Maybe<Sessions_Mutation_Response>;
  /** delete single row from the table: "sessions" */
  delete_sessions_by_pk?: Maybe<Sessions>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "verification_requests" */
  delete_verification_requests?: Maybe<Verification_Requests_Mutation_Response>;
  /** delete single row from the table: "verification_requests" */
  delete_verification_requests_by_pk?: Maybe<Verification_Requests>;
  /** insert data into the table: "accounts" */
  insert_accounts?: Maybe<Accounts_Mutation_Response>;
  /** insert a single row into the table: "accounts" */
  insert_accounts_one?: Maybe<Accounts>;
  /** insert data into the table: "impact" */
  insert_impact?: Maybe<Impact_Mutation_Response>;
  /** insert a single row into the table: "impact" */
  insert_impact_one?: Maybe<Impact>;
  /** insert data into the table: "orgs" */
  insert_orgs?: Maybe<Orgs_Mutation_Response>;
  /** insert a single row into the table: "orgs" */
  insert_orgs_one?: Maybe<Orgs>;
  /** insert data into the table: "sessions" */
  insert_sessions?: Maybe<Sessions_Mutation_Response>;
  /** insert a single row into the table: "sessions" */
  insert_sessions_one?: Maybe<Sessions>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** insert data into the table: "verification_requests" */
  insert_verification_requests?: Maybe<Verification_Requests_Mutation_Response>;
  /** insert a single row into the table: "verification_requests" */
  insert_verification_requests_one?: Maybe<Verification_Requests>;
  /** update data of the table: "accounts" */
  update_accounts?: Maybe<Accounts_Mutation_Response>;
  /** update single row of the table: "accounts" */
  update_accounts_by_pk?: Maybe<Accounts>;
  /** update data of the table: "impact" */
  update_impact?: Maybe<Impact_Mutation_Response>;
  /** update single row of the table: "impact" */
  update_impact_by_pk?: Maybe<Impact>;
  /** update data of the table: "orgs" */
  update_orgs?: Maybe<Orgs_Mutation_Response>;
  /** update single row of the table: "orgs" */
  update_orgs_by_pk?: Maybe<Orgs>;
  /** update data of the table: "sessions" */
  update_sessions?: Maybe<Sessions_Mutation_Response>;
  /** update single row of the table: "sessions" */
  update_sessions_by_pk?: Maybe<Sessions>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update data of the table: "verification_requests" */
  update_verification_requests?: Maybe<Verification_Requests_Mutation_Response>;
  /** update single row of the table: "verification_requests" */
  update_verification_requests_by_pk?: Maybe<Verification_Requests>;
};

/** mutation root */
export type Mutation_RootDelete_AccountsArgs = {
  where: Accounts_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Accounts_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_ImpactArgs = {
  where: Impact_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Impact_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_OrgsArgs = {
  where: Orgs_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Orgs_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_SessionsArgs = {
  where: Sessions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Sessions_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_Verification_RequestsArgs = {
  where: Verification_Requests_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Verification_Requests_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootInsert_AccountsArgs = {
  objects: Array<Accounts_Insert_Input>;
  on_conflict?: InputMaybe<Accounts_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Accounts_OneArgs = {
  object: Accounts_Insert_Input;
  on_conflict?: InputMaybe<Accounts_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ImpactArgs = {
  objects: Array<Impact_Insert_Input>;
  on_conflict?: InputMaybe<Impact_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Impact_OneArgs = {
  object: Impact_Insert_Input;
  on_conflict?: InputMaybe<Impact_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_OrgsArgs = {
  objects: Array<Orgs_Insert_Input>;
  on_conflict?: InputMaybe<Orgs_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Orgs_OneArgs = {
  object: Orgs_Insert_Input;
  on_conflict?: InputMaybe<Orgs_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_SessionsArgs = {
  objects: Array<Sessions_Insert_Input>;
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Sessions_OneArgs = {
  object: Sessions_Insert_Input;
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Verification_RequestsArgs = {
  objects: Array<Verification_Requests_Insert_Input>;
  on_conflict?: InputMaybe<Verification_Requests_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Verification_Requests_OneArgs = {
  object: Verification_Requests_Insert_Input;
  on_conflict?: InputMaybe<Verification_Requests_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_AccountsArgs = {
  _set?: InputMaybe<Accounts_Set_Input>;
  where: Accounts_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Accounts_By_PkArgs = {
  _set?: InputMaybe<Accounts_Set_Input>;
  pk_columns: Accounts_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_ImpactArgs = {
  _inc?: InputMaybe<Impact_Inc_Input>;
  _set?: InputMaybe<Impact_Set_Input>;
  where: Impact_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Impact_By_PkArgs = {
  _inc?: InputMaybe<Impact_Inc_Input>;
  _set?: InputMaybe<Impact_Set_Input>;
  pk_columns: Impact_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_OrgsArgs = {
  _set?: InputMaybe<Orgs_Set_Input>;
  where: Orgs_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Orgs_By_PkArgs = {
  _set?: InputMaybe<Orgs_Set_Input>;
  pk_columns: Orgs_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_SessionsArgs = {
  _inc?: InputMaybe<Sessions_Inc_Input>;
  _set?: InputMaybe<Sessions_Set_Input>;
  where: Sessions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Sessions_By_PkArgs = {
  _inc?: InputMaybe<Sessions_Inc_Input>;
  _set?: InputMaybe<Sessions_Set_Input>;
  pk_columns: Sessions_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Verification_RequestsArgs = {
  _set?: InputMaybe<Verification_Requests_Set_Input>;
  where: Verification_Requests_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Verification_Requests_By_PkArgs = {
  _set?: InputMaybe<Verification_Requests_Set_Input>;
  pk_columns: Verification_Requests_Pk_Columns_Input;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["numeric"]>;
  _gt?: InputMaybe<Scalars["numeric"]>;
  _gte?: InputMaybe<Scalars["numeric"]>;
  _in?: InputMaybe<Array<Scalars["numeric"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["numeric"]>;
  _lte?: InputMaybe<Scalars["numeric"]>;
  _neq?: InputMaybe<Scalars["numeric"]>;
  _nin?: InputMaybe<Array<Scalars["numeric"]>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = "asc",
  /** in ascending order, nulls first */
  AscNullsFirst = "asc_nulls_first",
  /** in ascending order, nulls last */
  AscNullsLast = "asc_nulls_last",
  /** in descending order, nulls first */
  Desc = "desc",
  /** in descending order, nulls first */
  DescNullsFirst = "desc_nulls_first",
  /** in descending order, nulls last */
  DescNullsLast = "desc_nulls_last",
}

/** columns and relationships of "orgs" */
export type Orgs = {
  __typename?: "orgs";
  /** An object relationship */
  author?: Maybe<Users>;
  author_id: Scalars["uuid"];
  created_at: Scalars["timestamptz"];
  description?: Maybe<Scalars["String"]>;
  founded_at?: Maybe<Scalars["String"]>;
  geography?: Maybe<Scalars["String"]>;
  id: Scalars["uuid"];
  /** An array relationship */
  impacts: Array<Impact>;
  /** An aggregate relationship */
  impacts_aggregate: Impact_Aggregate;
  is_test_data?: Maybe<Scalars["Boolean"]>;
  link_annual_report?: Maybe<Scalars["String"]>;
  link_financials?: Maybe<Scalars["String"]>;
  link_website?: Maybe<Scalars["String"]>;
  long_description?: Maybe<Scalars["String"]>;
  main_image?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  size?: Maybe<Scalars["String"]>;
  slug: Scalars["String"];
  updated_at: Scalars["timestamptz"];
};

/** columns and relationships of "orgs" */
export type OrgsImpactsArgs = {
  distinct_on?: InputMaybe<Array<Impact_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Impact_Order_By>>;
  where?: InputMaybe<Impact_Bool_Exp>;
};

/** columns and relationships of "orgs" */
export type OrgsImpacts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Impact_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Impact_Order_By>>;
  where?: InputMaybe<Impact_Bool_Exp>;
};

/** aggregated selection of "orgs" */
export type Orgs_Aggregate = {
  __typename?: "orgs_aggregate";
  aggregate?: Maybe<Orgs_Aggregate_Fields>;
  nodes: Array<Orgs>;
};

/** aggregate fields of "orgs" */
export type Orgs_Aggregate_Fields = {
  __typename?: "orgs_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Orgs_Max_Fields>;
  min?: Maybe<Orgs_Min_Fields>;
};

/** aggregate fields of "orgs" */
export type Orgs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Orgs_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "orgs" */
export type Orgs_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Orgs_Max_Order_By>;
  min?: InputMaybe<Orgs_Min_Order_By>;
};

/** input type for inserting array relation for remote table "orgs" */
export type Orgs_Arr_Rel_Insert_Input = {
  data: Array<Orgs_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Orgs_On_Conflict>;
};

/** Boolean expression to filter rows from the table "orgs". All fields are combined with a logical 'AND'. */
export type Orgs_Bool_Exp = {
  _and?: InputMaybe<Array<Orgs_Bool_Exp>>;
  _not?: InputMaybe<Orgs_Bool_Exp>;
  _or?: InputMaybe<Array<Orgs_Bool_Exp>>;
  author?: InputMaybe<Users_Bool_Exp>;
  author_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  founded_at?: InputMaybe<String_Comparison_Exp>;
  geography?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  impacts?: InputMaybe<Impact_Bool_Exp>;
  is_test_data?: InputMaybe<Boolean_Comparison_Exp>;
  link_annual_report?: InputMaybe<String_Comparison_Exp>;
  link_financials?: InputMaybe<String_Comparison_Exp>;
  link_website?: InputMaybe<String_Comparison_Exp>;
  long_description?: InputMaybe<String_Comparison_Exp>;
  main_image?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  size?: InputMaybe<String_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "orgs" */
export enum Orgs_Constraint {
  /** unique or primary key constraint */
  OrgsPkey = "orgs_pkey",
  /** unique or primary key constraint */
  OrgsSlugKey = "orgs_slug_key",
}

/** input type for inserting data into table "orgs" */
export type Orgs_Insert_Input = {
  author?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  author_id?: InputMaybe<Scalars["uuid"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  description?: InputMaybe<Scalars["String"]>;
  founded_at?: InputMaybe<Scalars["String"]>;
  geography?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  impacts?: InputMaybe<Impact_Arr_Rel_Insert_Input>;
  is_test_data?: InputMaybe<Scalars["Boolean"]>;
  link_annual_report?: InputMaybe<Scalars["String"]>;
  link_financials?: InputMaybe<Scalars["String"]>;
  link_website?: InputMaybe<Scalars["String"]>;
  long_description?: InputMaybe<Scalars["String"]>;
  main_image?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  size?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** aggregate max on columns */
export type Orgs_Max_Fields = {
  __typename?: "orgs_max_fields";
  author_id?: Maybe<Scalars["uuid"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  description?: Maybe<Scalars["String"]>;
  founded_at?: Maybe<Scalars["String"]>;
  geography?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  link_annual_report?: Maybe<Scalars["String"]>;
  link_financials?: Maybe<Scalars["String"]>;
  link_website?: Maybe<Scalars["String"]>;
  long_description?: Maybe<Scalars["String"]>;
  main_image?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** order by max() on columns of table "orgs" */
export type Orgs_Max_Order_By = {
  author_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  founded_at?: InputMaybe<Order_By>;
  geography?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  link_annual_report?: InputMaybe<Order_By>;
  link_financials?: InputMaybe<Order_By>;
  link_website?: InputMaybe<Order_By>;
  long_description?: InputMaybe<Order_By>;
  main_image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Orgs_Min_Fields = {
  __typename?: "orgs_min_fields";
  author_id?: Maybe<Scalars["uuid"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  description?: Maybe<Scalars["String"]>;
  founded_at?: Maybe<Scalars["String"]>;
  geography?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  link_annual_report?: Maybe<Scalars["String"]>;
  link_financials?: Maybe<Scalars["String"]>;
  link_website?: Maybe<Scalars["String"]>;
  long_description?: Maybe<Scalars["String"]>;
  main_image?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** order by min() on columns of table "orgs" */
export type Orgs_Min_Order_By = {
  author_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  founded_at?: InputMaybe<Order_By>;
  geography?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  link_annual_report?: InputMaybe<Order_By>;
  link_financials?: InputMaybe<Order_By>;
  link_website?: InputMaybe<Order_By>;
  long_description?: InputMaybe<Order_By>;
  main_image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "orgs" */
export type Orgs_Mutation_Response = {
  __typename?: "orgs_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Orgs>;
};

/** input type for inserting object relation for remote table "orgs" */
export type Orgs_Obj_Rel_Insert_Input = {
  data: Orgs_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Orgs_On_Conflict>;
};

/** on conflict condition type for table "orgs" */
export type Orgs_On_Conflict = {
  constraint: Orgs_Constraint;
  update_columns?: Array<Orgs_Update_Column>;
  where?: InputMaybe<Orgs_Bool_Exp>;
};

/** Ordering options when selecting data from "orgs". */
export type Orgs_Order_By = {
  author?: InputMaybe<Users_Order_By>;
  author_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  founded_at?: InputMaybe<Order_By>;
  geography?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  impacts_aggregate?: InputMaybe<Impact_Aggregate_Order_By>;
  is_test_data?: InputMaybe<Order_By>;
  link_annual_report?: InputMaybe<Order_By>;
  link_financials?: InputMaybe<Order_By>;
  link_website?: InputMaybe<Order_By>;
  long_description?: InputMaybe<Order_By>;
  main_image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: orgs */
export type Orgs_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "orgs" */
export enum Orgs_Select_Column {
  /** column name */
  AuthorId = "author_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Description = "description",
  /** column name */
  FoundedAt = "founded_at",
  /** column name */
  Geography = "geography",
  /** column name */
  Id = "id",
  /** column name */
  IsTestData = "is_test_data",
  /** column name */
  LinkAnnualReport = "link_annual_report",
  /** column name */
  LinkFinancials = "link_financials",
  /** column name */
  LinkWebsite = "link_website",
  /** column name */
  LongDescription = "long_description",
  /** column name */
  MainImage = "main_image",
  /** column name */
  Name = "name",
  /** column name */
  Size = "size",
  /** column name */
  Slug = "slug",
  /** column name */
  UpdatedAt = "updated_at",
}

/** input type for updating data in table "orgs" */
export type Orgs_Set_Input = {
  author_id?: InputMaybe<Scalars["uuid"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  description?: InputMaybe<Scalars["String"]>;
  founded_at?: InputMaybe<Scalars["String"]>;
  geography?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  is_test_data?: InputMaybe<Scalars["Boolean"]>;
  link_annual_report?: InputMaybe<Scalars["String"]>;
  link_financials?: InputMaybe<Scalars["String"]>;
  link_website?: InputMaybe<Scalars["String"]>;
  long_description?: InputMaybe<Scalars["String"]>;
  main_image?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  size?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** update columns of table "orgs" */
export enum Orgs_Update_Column {
  /** column name */
  AuthorId = "author_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Description = "description",
  /** column name */
  FoundedAt = "founded_at",
  /** column name */
  Geography = "geography",
  /** column name */
  Id = "id",
  /** column name */
  IsTestData = "is_test_data",
  /** column name */
  LinkAnnualReport = "link_annual_report",
  /** column name */
  LinkFinancials = "link_financials",
  /** column name */
  LinkWebsite = "link_website",
  /** column name */
  LongDescription = "long_description",
  /** column name */
  MainImage = "main_image",
  /** column name */
  Name = "name",
  /** column name */
  Size = "size",
  /** column name */
  Slug = "slug",
  /** column name */
  UpdatedAt = "updated_at",
}

export type Query_Root = {
  __typename?: "query_root";
  /** fetch data from the table: "accounts" */
  accounts: Array<Accounts>;
  /** fetch aggregated fields from the table: "accounts" */
  accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accounts_by_pk?: Maybe<Accounts>;
  /** fetch data from the table: "impact" */
  impact: Array<Impact>;
  /** fetch aggregated fields from the table: "impact" */
  impact_aggregate: Impact_Aggregate;
  /** fetch data from the table: "impact" using primary key columns */
  impact_by_pk?: Maybe<Impact>;
  /** fetch data from the table: "orgs" */
  orgs: Array<Orgs>;
  /** An aggregate relationship */
  orgs_aggregate: Orgs_Aggregate;
  /** fetch data from the table: "orgs" using primary key columns */
  orgs_by_pk?: Maybe<Orgs>;
  /** fetch data from the table: "sessions" */
  sessions: Array<Sessions>;
  /** fetch aggregated fields from the table: "sessions" */
  sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessions_by_pk?: Maybe<Sessions>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "verification_requests" */
  verification_requests: Array<Verification_Requests>;
  /** fetch aggregated fields from the table: "verification_requests" */
  verification_requests_aggregate: Verification_Requests_Aggregate;
  /** fetch data from the table: "verification_requests" using primary key columns */
  verification_requests_by_pk?: Maybe<Verification_Requests>;
};

export type Query_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};

export type Query_RootAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};

export type Query_RootAccounts_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootImpactArgs = {
  distinct_on?: InputMaybe<Array<Impact_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Impact_Order_By>>;
  where?: InputMaybe<Impact_Bool_Exp>;
};

export type Query_RootImpact_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Impact_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Impact_Order_By>>;
  where?: InputMaybe<Impact_Bool_Exp>;
};

export type Query_RootImpact_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootOrgsArgs = {
  distinct_on?: InputMaybe<Array<Orgs_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Orgs_Order_By>>;
  where?: InputMaybe<Orgs_Bool_Exp>;
};

export type Query_RootOrgs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Orgs_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Orgs_Order_By>>;
  where?: InputMaybe<Orgs_Bool_Exp>;
};

export type Query_RootOrgs_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Query_RootSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Query_RootSessions_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Query_RootUsers_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootVerification_RequestsArgs = {
  distinct_on?: InputMaybe<Array<Verification_Requests_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Verification_Requests_Order_By>>;
  where?: InputMaybe<Verification_Requests_Bool_Exp>;
};

export type Query_RootVerification_Requests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Verification_Requests_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Verification_Requests_Order_By>>;
  where?: InputMaybe<Verification_Requests_Bool_Exp>;
};

export type Query_RootVerification_Requests_By_PkArgs = {
  id: Scalars["uuid"];
};

/** columns and relationships of "sessions" */
export type Sessions = {
  __typename?: "sessions";
  access_token: Scalars["String"];
  created_at: Scalars["timestamptz"];
  expires: Scalars["timestamptz"];
  id: Scalars["uuid"];
  session_token: Scalars["String"];
  updated_at: Scalars["timestamptz"];
  user_id: Scalars["Int"];
};

/** aggregated selection of "sessions" */
export type Sessions_Aggregate = {
  __typename?: "sessions_aggregate";
  aggregate?: Maybe<Sessions_Aggregate_Fields>;
  nodes: Array<Sessions>;
};

/** aggregate fields of "sessions" */
export type Sessions_Aggregate_Fields = {
  __typename?: "sessions_aggregate_fields";
  avg?: Maybe<Sessions_Avg_Fields>;
  count: Scalars["Int"];
  max?: Maybe<Sessions_Max_Fields>;
  min?: Maybe<Sessions_Min_Fields>;
  stddev?: Maybe<Sessions_Stddev_Fields>;
  stddev_pop?: Maybe<Sessions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Sessions_Stddev_Samp_Fields>;
  sum?: Maybe<Sessions_Sum_Fields>;
  var_pop?: Maybe<Sessions_Var_Pop_Fields>;
  var_samp?: Maybe<Sessions_Var_Samp_Fields>;
  variance?: Maybe<Sessions_Variance_Fields>;
};

/** aggregate fields of "sessions" */
export type Sessions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sessions_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** aggregate avg on columns */
export type Sessions_Avg_Fields = {
  __typename?: "sessions_avg_fields";
  user_id?: Maybe<Scalars["Float"]>;
};

/** Boolean expression to filter rows from the table "sessions". All fields are combined with a logical 'AND'. */
export type Sessions_Bool_Exp = {
  _and?: InputMaybe<Array<Sessions_Bool_Exp>>;
  _not?: InputMaybe<Sessions_Bool_Exp>;
  _or?: InputMaybe<Array<Sessions_Bool_Exp>>;
  access_token?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  expires?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  session_token?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "sessions" */
export enum Sessions_Constraint {
  /** unique or primary key constraint */
  SessionsPkey = "sessions_pkey",
}

/** input type for incrementing numeric columns in table "sessions" */
export type Sessions_Inc_Input = {
  user_id?: InputMaybe<Scalars["Int"]>;
};

/** input type for inserting data into table "sessions" */
export type Sessions_Insert_Input = {
  access_token?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  expires?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  session_token?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["Int"]>;
};

/** aggregate max on columns */
export type Sessions_Max_Fields = {
  __typename?: "sessions_max_fields";
  access_token?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  expires?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  session_token?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["Int"]>;
};

/** aggregate min on columns */
export type Sessions_Min_Fields = {
  __typename?: "sessions_min_fields";
  access_token?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  expires?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  session_token?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["Int"]>;
};

/** response of any mutation on the table "sessions" */
export type Sessions_Mutation_Response = {
  __typename?: "sessions_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Sessions>;
};

/** on conflict condition type for table "sessions" */
export type Sessions_On_Conflict = {
  constraint: Sessions_Constraint;
  update_columns?: Array<Sessions_Update_Column>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** Ordering options when selecting data from "sessions". */
export type Sessions_Order_By = {
  access_token?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  expires?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  session_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: sessions */
export type Sessions_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "sessions" */
export enum Sessions_Select_Column {
  /** column name */
  AccessToken = "access_token",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Expires = "expires",
  /** column name */
  Id = "id",
  /** column name */
  SessionToken = "session_token",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "sessions" */
export type Sessions_Set_Input = {
  access_token?: InputMaybe<Scalars["String"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  expires?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  session_token?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
  user_id?: InputMaybe<Scalars["Int"]>;
};

/** aggregate stddev on columns */
export type Sessions_Stddev_Fields = {
  __typename?: "sessions_stddev_fields";
  user_id?: Maybe<Scalars["Float"]>;
};

/** aggregate stddev_pop on columns */
export type Sessions_Stddev_Pop_Fields = {
  __typename?: "sessions_stddev_pop_fields";
  user_id?: Maybe<Scalars["Float"]>;
};

/** aggregate stddev_samp on columns */
export type Sessions_Stddev_Samp_Fields = {
  __typename?: "sessions_stddev_samp_fields";
  user_id?: Maybe<Scalars["Float"]>;
};

/** aggregate sum on columns */
export type Sessions_Sum_Fields = {
  __typename?: "sessions_sum_fields";
  user_id?: Maybe<Scalars["Int"]>;
};

/** update columns of table "sessions" */
export enum Sessions_Update_Column {
  /** column name */
  AccessToken = "access_token",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Expires = "expires",
  /** column name */
  Id = "id",
  /** column name */
  SessionToken = "session_token",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** aggregate var_pop on columns */
export type Sessions_Var_Pop_Fields = {
  __typename?: "sessions_var_pop_fields";
  user_id?: Maybe<Scalars["Float"]>;
};

/** aggregate var_samp on columns */
export type Sessions_Var_Samp_Fields = {
  __typename?: "sessions_var_samp_fields";
  user_id?: Maybe<Scalars["Float"]>;
};

/** aggregate variance on columns */
export type Sessions_Variance_Fields = {
  __typename?: "sessions_variance_fields";
  user_id?: Maybe<Scalars["Float"]>;
};

export type Subscription_Root = {
  __typename?: "subscription_root";
  /** fetch data from the table: "accounts" */
  accounts: Array<Accounts>;
  /** fetch aggregated fields from the table: "accounts" */
  accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accounts_by_pk?: Maybe<Accounts>;
  /** fetch data from the table: "impact" */
  impact: Array<Impact>;
  /** fetch aggregated fields from the table: "impact" */
  impact_aggregate: Impact_Aggregate;
  /** fetch data from the table: "impact" using primary key columns */
  impact_by_pk?: Maybe<Impact>;
  /** fetch data from the table: "orgs" */
  orgs: Array<Orgs>;
  /** An aggregate relationship */
  orgs_aggregate: Orgs_Aggregate;
  /** fetch data from the table: "orgs" using primary key columns */
  orgs_by_pk?: Maybe<Orgs>;
  /** fetch data from the table: "sessions" */
  sessions: Array<Sessions>;
  /** fetch aggregated fields from the table: "sessions" */
  sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessions_by_pk?: Maybe<Sessions>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "verification_requests" */
  verification_requests: Array<Verification_Requests>;
  /** fetch aggregated fields from the table: "verification_requests" */
  verification_requests_aggregate: Verification_Requests_Aggregate;
  /** fetch data from the table: "verification_requests" using primary key columns */
  verification_requests_by_pk?: Maybe<Verification_Requests>;
};

export type Subscription_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};

export type Subscription_RootAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};

export type Subscription_RootAccounts_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootImpactArgs = {
  distinct_on?: InputMaybe<Array<Impact_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Impact_Order_By>>;
  where?: InputMaybe<Impact_Bool_Exp>;
};

export type Subscription_RootImpact_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Impact_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Impact_Order_By>>;
  where?: InputMaybe<Impact_Bool_Exp>;
};

export type Subscription_RootImpact_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootOrgsArgs = {
  distinct_on?: InputMaybe<Array<Orgs_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Orgs_Order_By>>;
  where?: InputMaybe<Orgs_Bool_Exp>;
};

export type Subscription_RootOrgs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Orgs_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Orgs_Order_By>>;
  where?: InputMaybe<Orgs_Bool_Exp>;
};

export type Subscription_RootOrgs_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Subscription_RootSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Subscription_RootSessions_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootVerification_RequestsArgs = {
  distinct_on?: InputMaybe<Array<Verification_Requests_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Verification_Requests_Order_By>>;
  where?: InputMaybe<Verification_Requests_Bool_Exp>;
};

export type Subscription_RootVerification_Requests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Verification_Requests_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Verification_Requests_Order_By>>;
  where?: InputMaybe<Verification_Requests_Bool_Exp>;
};

export type Subscription_RootVerification_Requests_By_PkArgs = {
  id: Scalars["uuid"];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["timestamptz"]>;
  _gt?: InputMaybe<Scalars["timestamptz"]>;
  _gte?: InputMaybe<Scalars["timestamptz"]>;
  _in?: InputMaybe<Array<Scalars["timestamptz"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["timestamptz"]>;
  _lte?: InputMaybe<Scalars["timestamptz"]>;
  _neq?: InputMaybe<Scalars["timestamptz"]>;
  _nin?: InputMaybe<Array<Scalars["timestamptz"]>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: "users";
  created_at: Scalars["timestamptz"];
  email: Scalars["String"];
  email_verified?: Maybe<Scalars["timestamptz"]>;
  id: Scalars["uuid"];
  image?: Maybe<Scalars["String"]>;
  is_admin?: Maybe<Scalars["String"]>;
  is_user_admin: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  /** fetch data from the table: "orgs" */
  orgs: Array<Orgs>;
  /** An aggregate relationship */
  orgs_aggregate: Orgs_Aggregate;
  updated_at: Scalars["timestamptz"];
};

/** columns and relationships of "users" */
export type UsersOrgsArgs = {
  distinct_on?: InputMaybe<Array<Orgs_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Orgs_Order_By>>;
  where?: InputMaybe<Orgs_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersOrgs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Orgs_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Orgs_Order_By>>;
  where?: InputMaybe<Orgs_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: "users_aggregate";
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: "users_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  email_verified?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  is_admin?: InputMaybe<String_Comparison_Exp>;
  is_user_admin?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  orgs?: InputMaybe<Orgs_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersEmailKey = "users_email_key",
  /** unique or primary key constraint */
  UsersPkey = "users_pkey",
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  email?: InputMaybe<Scalars["String"]>;
  email_verified?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  image?: InputMaybe<Scalars["String"]>;
  is_admin?: InputMaybe<Scalars["String"]>;
  is_user_admin?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  orgs?: InputMaybe<Orgs_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: "users_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  email?: Maybe<Scalars["String"]>;
  email_verified?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  image?: Maybe<Scalars["String"]>;
  is_admin?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: "users_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  email?: Maybe<Scalars["String"]>;
  email_verified?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  image?: Maybe<Scalars["String"]>;
  is_admin?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: "users_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  email_verified?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  is_admin?: InputMaybe<Order_By>;
  is_user_admin?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  orgs_aggregate?: InputMaybe<Orgs_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Email = "email",
  /** column name */
  EmailVerified = "email_verified",
  /** column name */
  Id = "id",
  /** column name */
  Image = "image",
  /** column name */
  IsAdmin = "is_admin",
  /** column name */
  IsUserAdmin = "is_user_admin",
  /** column name */
  Name = "name",
  /** column name */
  UpdatedAt = "updated_at",
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  email?: InputMaybe<Scalars["String"]>;
  email_verified?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  image?: InputMaybe<Scalars["String"]>;
  is_admin?: InputMaybe<Scalars["String"]>;
  is_user_admin?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Email = "email",
  /** column name */
  EmailVerified = "email_verified",
  /** column name */
  Id = "id",
  /** column name */
  Image = "image",
  /** column name */
  IsAdmin = "is_admin",
  /** column name */
  IsUserAdmin = "is_user_admin",
  /** column name */
  Name = "name",
  /** column name */
  UpdatedAt = "updated_at",
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["uuid"]>;
  _gt?: InputMaybe<Scalars["uuid"]>;
  _gte?: InputMaybe<Scalars["uuid"]>;
  _in?: InputMaybe<Array<Scalars["uuid"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["uuid"]>;
  _lte?: InputMaybe<Scalars["uuid"]>;
  _neq?: InputMaybe<Scalars["uuid"]>;
  _nin?: InputMaybe<Array<Scalars["uuid"]>>;
};

/** columns and relationships of "verification_requests" */
export type Verification_Requests = {
  __typename?: "verification_requests";
  created_at: Scalars["timestamptz"];
  expires: Scalars["timestamptz"];
  id: Scalars["uuid"];
  identifier: Scalars["String"];
  token: Scalars["String"];
  updated_at: Scalars["timestamptz"];
};

/** aggregated selection of "verification_requests" */
export type Verification_Requests_Aggregate = {
  __typename?: "verification_requests_aggregate";
  aggregate?: Maybe<Verification_Requests_Aggregate_Fields>;
  nodes: Array<Verification_Requests>;
};

/** aggregate fields of "verification_requests" */
export type Verification_Requests_Aggregate_Fields = {
  __typename?: "verification_requests_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Verification_Requests_Max_Fields>;
  min?: Maybe<Verification_Requests_Min_Fields>;
};

/** aggregate fields of "verification_requests" */
export type Verification_Requests_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Verification_Requests_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression to filter rows from the table "verification_requests". All fields are combined with a logical 'AND'. */
export type Verification_Requests_Bool_Exp = {
  _and?: InputMaybe<Array<Verification_Requests_Bool_Exp>>;
  _not?: InputMaybe<Verification_Requests_Bool_Exp>;
  _or?: InputMaybe<Array<Verification_Requests_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  expires?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  identifier?: InputMaybe<String_Comparison_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "verification_requests" */
export enum Verification_Requests_Constraint {
  /** unique or primary key constraint */
  VerificationRequestsPkey = "verification_requests_pkey",
}

/** input type for inserting data into table "verification_requests" */
export type Verification_Requests_Insert_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  expires?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  identifier?: InputMaybe<Scalars["String"]>;
  token?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** aggregate max on columns */
export type Verification_Requests_Max_Fields = {
  __typename?: "verification_requests_max_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  expires?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  identifier?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** aggregate min on columns */
export type Verification_Requests_Min_Fields = {
  __typename?: "verification_requests_min_fields";
  created_at?: Maybe<Scalars["timestamptz"]>;
  expires?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  identifier?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
};

/** response of any mutation on the table "verification_requests" */
export type Verification_Requests_Mutation_Response = {
  __typename?: "verification_requests_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Verification_Requests>;
};

/** on conflict condition type for table "verification_requests" */
export type Verification_Requests_On_Conflict = {
  constraint: Verification_Requests_Constraint;
  update_columns?: Array<Verification_Requests_Update_Column>;
  where?: InputMaybe<Verification_Requests_Bool_Exp>;
};

/** Ordering options when selecting data from "verification_requests". */
export type Verification_Requests_Order_By = {
  created_at?: InputMaybe<Order_By>;
  expires?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  identifier?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: verification_requests */
export type Verification_Requests_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "verification_requests" */
export enum Verification_Requests_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Expires = "expires",
  /** column name */
  Id = "id",
  /** column name */
  Identifier = "identifier",
  /** column name */
  Token = "token",
  /** column name */
  UpdatedAt = "updated_at",
}

/** input type for updating data in table "verification_requests" */
export type Verification_Requests_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>;
  expires?: InputMaybe<Scalars["timestamptz"]>;
  id?: InputMaybe<Scalars["uuid"]>;
  identifier?: InputMaybe<Scalars["String"]>;
  token?: InputMaybe<Scalars["String"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]>;
};

/** update columns of table "verification_requests" */
export enum Verification_Requests_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Expires = "expires",
  /** column name */
  Id = "id",
  /** column name */
  Identifier = "identifier",
  /** column name */
  Token = "token",
  /** column name */
  UpdatedAt = "updated_at",
}

export type DeleteImpactMutationVariables = Exact<{
  id: Scalars["uuid"];
}>;

export type DeleteImpactMutation = {
  __typename?: "mutation_root";
  delete_impact_by_pk?: { __typename?: "impact"; id: any } | undefined;
};

export type DeleteOrgMutationVariables = Exact<{
  id: Scalars["uuid"];
}>;

export type DeleteOrgMutation = {
  __typename?: "mutation_root";
  delete_orgs_by_pk?:
    | { __typename?: "orgs"; id: any; created_at: string; name: string }
    | undefined;
};

export type InsertImpactMutationVariables = Exact<{
  indicator: Scalars["String"];
  value: Scalars["numeric"];
  sdg: Scalars["String"];
  org: Scalars["uuid"];
  prefix?: InputMaybe<Scalars["String"]>;
  suffix?: InputMaybe<Scalars["String"]>;
  context?: InputMaybe<Scalars["String"]>;
  priority?: InputMaybe<Scalars["Int"]>;
}>;

export type InsertImpactMutation = {
  __typename?: "mutation_root";
  insert_impact_one?:
    | {
        __typename?: "impact";
        id: any;
        indicator: string;
        value: number;
        sdg: string;
        prefix?: string | undefined;
        suffix?: string | undefined;
        context?: string | undefined;
        priority: number;
      }
    | undefined;
};

export type InsertOrgMutationVariables = Exact<{
  author_id: Scalars["uuid"];
  name: Scalars["String"];
  slug: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
  long_description?: InputMaybe<Scalars["String"]>;
  main_image: Scalars["String"];
  geography?: InputMaybe<Scalars["String"]>;
  size?: InputMaybe<Scalars["String"]>;
  founded_at?: InputMaybe<Scalars["String"]>;
  link_website?: InputMaybe<Scalars["String"]>;
  link_annual_report?: InputMaybe<Scalars["String"]>;
  link_financials?: InputMaybe<Scalars["String"]>;
}>;

export type InsertOrgMutation = {
  __typename?: "mutation_root";
  insert_orgs_one?:
    | {
        __typename?: "orgs";
        id: any;
        created_at: string;
        name: string;
        slug: string;
        description?: string | undefined;
        long_description?: string | undefined;
        main_image?: string | undefined;
        geography?: string | undefined;
        size?: string | undefined;
        founded_at?: string | undefined;
        link_website?: string | undefined;
        link_financials?: string | undefined;
        link_annual_report?: string | undefined;
      }
    | undefined;
};

export type UpdateImpactMutationVariables = Exact<{
  id: Scalars["uuid"];
  value: Scalars["numeric"];
  sdg: Scalars["String"];
  indicator: Scalars["String"];
  context?: InputMaybe<Scalars["String"]>;
  prefix?: InputMaybe<Scalars["String"]>;
  suffix?: InputMaybe<Scalars["String"]>;
}>;

export type UpdateImpactMutation = {
  __typename?: "mutation_root";
  update_impact_by_pk?:
    | {
        __typename?: "impact";
        id: any;
        value: number;
        sdg: string;
        indicator: string;
        context?: string | undefined;
        prefix?: string | undefined;
        suffix?: string | undefined;
        priority: number;
      }
    | undefined;
};

export type UpdateImpactPriorityMutationVariables = Exact<{
  impactID: Scalars["uuid"];
  priority: Scalars["Int"];
}>;

export type UpdateImpactPriorityMutation = {
  __typename?: "mutation_root";
  update_impact_by_pk?:
    | { __typename?: "impact"; id: any; priority: number }
    | undefined;
};

export type UpdateOrgMutationVariables = Exact<{
  id: Scalars["uuid"];
  name?: InputMaybe<Scalars["String"]>;
  slug: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
  long_description?: InputMaybe<Scalars["String"]>;
  main_image: Scalars["String"];
  geography?: InputMaybe<Scalars["String"]>;
  size?: InputMaybe<Scalars["String"]>;
  founded_at?: InputMaybe<Scalars["String"]>;
  link_website?: InputMaybe<Scalars["String"]>;
  link_annual_report?: InputMaybe<Scalars["String"]>;
  link_financials?: InputMaybe<Scalars["String"]>;
}>;

export type UpdateOrgMutation = {
  __typename?: "mutation_root";
  update_orgs_by_pk?:
    | {
        __typename?: "orgs";
        id: any;
        created_at: string;
        name: string;
        slug: string;
        description?: string | undefined;
        long_description?: string | undefined;
        main_image?: string | undefined;
        geography?: string | undefined;
        size?: string | undefined;
        founded_at?: string | undefined;
        link_website?: string | undefined;
        link_annual_report?: string | undefined;
        link_financials?: string | undefined;
      }
    | undefined;
};

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars["uuid"];
  name?: InputMaybe<Scalars["String"]>;
}>;

export type UpdateUserMutation = {
  __typename?: "mutation_root";
  update_users?:
    | {
        __typename?: "users_mutation_response";
        returning: Array<{
          __typename?: "users";
          id: any;
          name?: string | undefined;
        }>;
      }
    | undefined;
};

export type CountOrgsQueryVariables = Exact<{ [key: string]: never }>;

export type CountOrgsQuery = {
  __typename?: "query_root";
  orgs_aggregate: {
    __typename?: "orgs_aggregate";
    aggregate?:
      | { __typename?: "orgs_aggregate_fields"; count: number }
      | undefined;
  };
};

export type FetchFeaturedQueryVariables = Exact<{
  top?: InputMaybe<Scalars["Int"]>;
}>;

export type FetchFeaturedQuery = {
  __typename?: "query_root";
  orgs: Array<{
    __typename?: "orgs";
    id: any;
    created_at: string;
    name: string;
    slug: string;
    description?: string | undefined;
    main_image?: string | undefined;
    geography?: string | undefined;
    impacts: Array<{
      __typename?: "impact";
      id: any;
      value: number;
      indicator: string;
      sdg: string;
      prefix?: string | undefined;
      suffix?: string | undefined;
    }>;
  }>;
};

export type FetchLatestQueryVariables = Exact<{
  top?: InputMaybe<Scalars["Int"]>;
}>;

export type FetchLatestQuery = {
  __typename?: "query_root";
  orgs: Array<{
    __typename?: "orgs";
    id: any;
    created_at: string;
    name: string;
    slug: string;
    description?: string | undefined;
    main_image?: string | undefined;
    geography?: string | undefined;
    impacts: Array<{
      __typename?: "impact";
      id: any;
      value: number;
      indicator: string;
      sdg: string;
      prefix?: string | undefined;
      suffix?: string | undefined;
    }>;
  }>;
};

export type FetchOrgQueryVariables = Exact<{
  slug?: InputMaybe<Scalars["String"]>;
}>;

export type FetchOrgQuery = {
  __typename?: "query_root";
  orgs: Array<{
    __typename?: "orgs";
    id: any;
    created_at: string;
    name: string;
    author_id: any;
    slug: string;
    description?: string | undefined;
    long_description?: string | undefined;
    main_image?: string | undefined;
    geography?: string | undefined;
    founded_at?: string | undefined;
    size?: string | undefined;
    link_website?: string | undefined;
    link_annual_report?: string | undefined;
    link_financials?: string | undefined;
    impacts: Array<{
      __typename?: "impact";
      id: any;
      value: number;
      indicator: string;
      sdg: string;
      context?: string | undefined;
      priority: number;
      prefix?: string | undefined;
      suffix?: string | undefined;
    }>;
  }>;
};

export type FetchOrgsQueryVariables = Exact<{ [key: string]: never }>;

export type FetchOrgsQuery = {
  __typename?: "query_root";
  orgs: Array<{
    __typename?: "orgs";
    id: any;
    created_at: string;
    name: string;
    slug: string;
    description?: string | undefined;
    main_image?: string | undefined;
    geography?: string | undefined;
    impacts: Array<{
      __typename?: "impact";
      id: any;
      value: number;
      indicator: string;
      sdg: string;
      prefix?: string | undefined;
      suffix?: string | undefined;
    }>;
  }>;
};

export type FetchUserQueryVariables = Exact<{
  userEmail: Scalars["String"];
}>;

export type FetchUserQuery = {
  __typename?: "query_root";
  users: Array<{ __typename?: "users"; is_user_admin: boolean }>;
};

export type MyOrgsQueryVariables = Exact<{
  userId: Scalars["uuid"];
}>;

export type MyOrgsQuery = {
  __typename?: "query_root";
  users_by_pk?:
    | {
        __typename?: "users";
        id: any;
        name?: string | undefined;
        orgs: Array<{
          __typename?: "orgs";
          id: any;
          created_at: string;
          name: string;
          slug: string;
          description?: string | undefined;
          main_image?: string | undefined;
          geography?: string | undefined;
          impacts: Array<{
            __typename?: "impact";
            id: any;
            value: number;
            indicator: string;
            sdg: string;
            prefix?: string | undefined;
            suffix?: string | undefined;
          }>;
        }>;
      }
    | undefined;
};

export type SearchOrgsQueryVariables = Exact<{
  q?: InputMaybe<Scalars["String"]>;
}>;

export type SearchOrgsQuery = {
  __typename?: "query_root";
  orgs: Array<{
    __typename?: "orgs";
    id: any;
    name: string;
    slug: string;
    impacts: Array<{ __typename?: "impact"; id: any; sdg: string }>;
  }>;
};

export const DeleteImpactDocument = gql`
  mutation deleteImpact($id: uuid!) {
    delete_impact_by_pk(id: $id) {
      id
    }
  }
`;
export type DeleteImpactMutationFn = Apollo.MutationFunction<
  DeleteImpactMutation,
  DeleteImpactMutationVariables
>;
export type DeleteImpactComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    DeleteImpactMutation,
    DeleteImpactMutationVariables
  >,
  "mutation"
>;

export const DeleteImpactComponent = (props: DeleteImpactComponentProps) => (
  <ApolloReactComponents.Mutation<
    DeleteImpactMutation,
    DeleteImpactMutationVariables
  >
    mutation={DeleteImpactDocument}
    {...props}
  />
);

export type DeleteImpactProps<
  TChildProps = {},
  TDataName extends string = "mutate"
> = {
  [key in TDataName]: Apollo.MutationFunction<
    DeleteImpactMutation,
    DeleteImpactMutationVariables
  >;
} & TChildProps;
export function withDeleteImpact<
  TProps,
  TChildProps = {},
  TDataName extends string = "mutate"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteImpactMutation,
    DeleteImpactMutationVariables,
    DeleteImpactProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteImpactMutation,
    DeleteImpactMutationVariables,
    DeleteImpactProps<TChildProps, TDataName>
  >(DeleteImpactDocument, {
    alias: "deleteImpact",
    ...operationOptions,
  });
}

/**
 * __useDeleteImpactMutation__
 *
 * To run a mutation, you first call `useDeleteImpactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteImpactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteImpactMutation, { data, loading, error }] = useDeleteImpactMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteImpactMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteImpactMutation,
    DeleteImpactMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteImpactMutation,
    DeleteImpactMutationVariables
  >(DeleteImpactDocument, options);
}
export type DeleteImpactMutationHookResult = ReturnType<
  typeof useDeleteImpactMutation
>;
export type DeleteImpactMutationResult =
  Apollo.MutationResult<DeleteImpactMutation>;
export type DeleteImpactMutationOptions = Apollo.BaseMutationOptions<
  DeleteImpactMutation,
  DeleteImpactMutationVariables
>;
export const DeleteOrgDocument = gql`
  mutation deleteOrg($id: uuid!) {
    delete_orgs_by_pk(id: $id) {
      id
      created_at
      name
    }
  }
`;
export type DeleteOrgMutationFn = Apollo.MutationFunction<
  DeleteOrgMutation,
  DeleteOrgMutationVariables
>;
export type DeleteOrgComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    DeleteOrgMutation,
    DeleteOrgMutationVariables
  >,
  "mutation"
>;

export const DeleteOrgComponent = (props: DeleteOrgComponentProps) => (
  <ApolloReactComponents.Mutation<DeleteOrgMutation, DeleteOrgMutationVariables>
    mutation={DeleteOrgDocument}
    {...props}
  />
);

export type DeleteOrgProps<
  TChildProps = {},
  TDataName extends string = "mutate"
> = {
  [key in TDataName]: Apollo.MutationFunction<
    DeleteOrgMutation,
    DeleteOrgMutationVariables
  >;
} & TChildProps;
export function withDeleteOrg<
  TProps,
  TChildProps = {},
  TDataName extends string = "mutate"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteOrgMutation,
    DeleteOrgMutationVariables,
    DeleteOrgProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteOrgMutation,
    DeleteOrgMutationVariables,
    DeleteOrgProps<TChildProps, TDataName>
  >(DeleteOrgDocument, {
    alias: "deleteOrg",
    ...operationOptions,
  });
}

/**
 * __useDeleteOrgMutation__
 *
 * To run a mutation, you first call `useDeleteOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrgMutation, { data, loading, error }] = useDeleteOrgMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOrgMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteOrgMutation,
    DeleteOrgMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteOrgMutation, DeleteOrgMutationVariables>(
    DeleteOrgDocument,
    options
  );
}
export type DeleteOrgMutationHookResult = ReturnType<
  typeof useDeleteOrgMutation
>;
export type DeleteOrgMutationResult = Apollo.MutationResult<DeleteOrgMutation>;
export type DeleteOrgMutationOptions = Apollo.BaseMutationOptions<
  DeleteOrgMutation,
  DeleteOrgMutationVariables
>;
export const InsertImpactDocument = gql`
  mutation insertImpact(
    $indicator: String!
    $value: numeric!
    $sdg: String!
    $org: uuid!
    $prefix: String
    $suffix: String
    $context: String
    $priority: Int
  ) {
    insert_impact_one(
      object: {
        indicator: $indicator
        value: $value
        sdg: $sdg
        org: $org
        prefix: $prefix
        suffix: $suffix
        context: $context
        priority: $priority
      }
    ) {
      id
      indicator
      value
      sdg
      prefix
      suffix
      context
      priority
    }
  }
`;
export type InsertImpactMutationFn = Apollo.MutationFunction<
  InsertImpactMutation,
  InsertImpactMutationVariables
>;
export type InsertImpactComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    InsertImpactMutation,
    InsertImpactMutationVariables
  >,
  "mutation"
>;

export const InsertImpactComponent = (props: InsertImpactComponentProps) => (
  <ApolloReactComponents.Mutation<
    InsertImpactMutation,
    InsertImpactMutationVariables
  >
    mutation={InsertImpactDocument}
    {...props}
  />
);

export type InsertImpactProps<
  TChildProps = {},
  TDataName extends string = "mutate"
> = {
  [key in TDataName]: Apollo.MutationFunction<
    InsertImpactMutation,
    InsertImpactMutationVariables
  >;
} & TChildProps;
export function withInsertImpact<
  TProps,
  TChildProps = {},
  TDataName extends string = "mutate"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    InsertImpactMutation,
    InsertImpactMutationVariables,
    InsertImpactProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    InsertImpactMutation,
    InsertImpactMutationVariables,
    InsertImpactProps<TChildProps, TDataName>
  >(InsertImpactDocument, {
    alias: "insertImpact",
    ...operationOptions,
  });
}

/**
 * __useInsertImpactMutation__
 *
 * To run a mutation, you first call `useInsertImpactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertImpactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertImpactMutation, { data, loading, error }] = useInsertImpactMutation({
 *   variables: {
 *      indicator: // value for 'indicator'
 *      value: // value for 'value'
 *      sdg: // value for 'sdg'
 *      org: // value for 'org'
 *      prefix: // value for 'prefix'
 *      suffix: // value for 'suffix'
 *      context: // value for 'context'
 *      priority: // value for 'priority'
 *   },
 * });
 */
export function useInsertImpactMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InsertImpactMutation,
    InsertImpactMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    InsertImpactMutation,
    InsertImpactMutationVariables
  >(InsertImpactDocument, options);
}
export type InsertImpactMutationHookResult = ReturnType<
  typeof useInsertImpactMutation
>;
export type InsertImpactMutationResult =
  Apollo.MutationResult<InsertImpactMutation>;
export type InsertImpactMutationOptions = Apollo.BaseMutationOptions<
  InsertImpactMutation,
  InsertImpactMutationVariables
>;
export const InsertOrgDocument = gql`
  mutation insertOrg(
    $author_id: uuid!
    $name: String!
    $slug: String!
    $description: String
    $long_description: String
    $main_image: String!
    $geography: String
    $size: String
    $founded_at: String
    $link_website: String
    $link_annual_report: String
    $link_financials: String
  ) {
    insert_orgs_one(
      object: {
        author_id: $author_id
        name: $name
        slug: $slug
        description: $description
        long_description: $long_description
        main_image: $main_image
        geography: $geography
        size: $size
        founded_at: $founded_at
        link_website: $link_website
        link_financials: $link_financials
        link_annual_report: $link_annual_report
      }
    ) {
      id
      created_at
      name
      slug
      description
      long_description
      main_image
      geography
      size
      founded_at
      link_website
      link_financials
      link_annual_report
    }
  }
`;
export type InsertOrgMutationFn = Apollo.MutationFunction<
  InsertOrgMutation,
  InsertOrgMutationVariables
>;
export type InsertOrgComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    InsertOrgMutation,
    InsertOrgMutationVariables
  >,
  "mutation"
>;

export const InsertOrgComponent = (props: InsertOrgComponentProps) => (
  <ApolloReactComponents.Mutation<InsertOrgMutation, InsertOrgMutationVariables>
    mutation={InsertOrgDocument}
    {...props}
  />
);

export type InsertOrgProps<
  TChildProps = {},
  TDataName extends string = "mutate"
> = {
  [key in TDataName]: Apollo.MutationFunction<
    InsertOrgMutation,
    InsertOrgMutationVariables
  >;
} & TChildProps;
export function withInsertOrg<
  TProps,
  TChildProps = {},
  TDataName extends string = "mutate"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    InsertOrgMutation,
    InsertOrgMutationVariables,
    InsertOrgProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    InsertOrgMutation,
    InsertOrgMutationVariables,
    InsertOrgProps<TChildProps, TDataName>
  >(InsertOrgDocument, {
    alias: "insertOrg",
    ...operationOptions,
  });
}

/**
 * __useInsertOrgMutation__
 *
 * To run a mutation, you first call `useInsertOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertOrgMutation, { data, loading, error }] = useInsertOrgMutation({
 *   variables: {
 *      author_id: // value for 'author_id'
 *      name: // value for 'name'
 *      slug: // value for 'slug'
 *      description: // value for 'description'
 *      long_description: // value for 'long_description'
 *      main_image: // value for 'main_image'
 *      geography: // value for 'geography'
 *      size: // value for 'size'
 *      founded_at: // value for 'founded_at'
 *      link_website: // value for 'link_website'
 *      link_annual_report: // value for 'link_annual_report'
 *      link_financials: // value for 'link_financials'
 *   },
 * });
 */
export function useInsertOrgMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InsertOrgMutation,
    InsertOrgMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InsertOrgMutation, InsertOrgMutationVariables>(
    InsertOrgDocument,
    options
  );
}
export type InsertOrgMutationHookResult = ReturnType<
  typeof useInsertOrgMutation
>;
export type InsertOrgMutationResult = Apollo.MutationResult<InsertOrgMutation>;
export type InsertOrgMutationOptions = Apollo.BaseMutationOptions<
  InsertOrgMutation,
  InsertOrgMutationVariables
>;
export const UpdateImpactDocument = gql`
  mutation updateImpact(
    $id: uuid!
    $value: numeric!
    $sdg: String!
    $indicator: String!
    $context: String
    $prefix: String
    $suffix: String
  ) {
    update_impact_by_pk(
      _set: {
        value: $value
        sdg: $sdg
        indicator: $indicator
        context: $context
        prefix: $prefix
        suffix: $suffix
      }
      pk_columns: { id: $id }
    ) {
      id
      value
      sdg
      indicator
      context
      prefix
      suffix
      priority
    }
  }
`;
export type UpdateImpactMutationFn = Apollo.MutationFunction<
  UpdateImpactMutation,
  UpdateImpactMutationVariables
>;
export type UpdateImpactComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateImpactMutation,
    UpdateImpactMutationVariables
  >,
  "mutation"
>;

export const UpdateImpactComponent = (props: UpdateImpactComponentProps) => (
  <ApolloReactComponents.Mutation<
    UpdateImpactMutation,
    UpdateImpactMutationVariables
  >
    mutation={UpdateImpactDocument}
    {...props}
  />
);

export type UpdateImpactProps<
  TChildProps = {},
  TDataName extends string = "mutate"
> = {
  [key in TDataName]: Apollo.MutationFunction<
    UpdateImpactMutation,
    UpdateImpactMutationVariables
  >;
} & TChildProps;
export function withUpdateImpact<
  TProps,
  TChildProps = {},
  TDataName extends string = "mutate"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateImpactMutation,
    UpdateImpactMutationVariables,
    UpdateImpactProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateImpactMutation,
    UpdateImpactMutationVariables,
    UpdateImpactProps<TChildProps, TDataName>
  >(UpdateImpactDocument, {
    alias: "updateImpact",
    ...operationOptions,
  });
}

/**
 * __useUpdateImpactMutation__
 *
 * To run a mutation, you first call `useUpdateImpactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateImpactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateImpactMutation, { data, loading, error }] = useUpdateImpactMutation({
 *   variables: {
 *      id: // value for 'id'
 *      value: // value for 'value'
 *      sdg: // value for 'sdg'
 *      indicator: // value for 'indicator'
 *      context: // value for 'context'
 *      prefix: // value for 'prefix'
 *      suffix: // value for 'suffix'
 *   },
 * });
 */
export function useUpdateImpactMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateImpactMutation,
    UpdateImpactMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateImpactMutation,
    UpdateImpactMutationVariables
  >(UpdateImpactDocument, options);
}
export type UpdateImpactMutationHookResult = ReturnType<
  typeof useUpdateImpactMutation
>;
export type UpdateImpactMutationResult =
  Apollo.MutationResult<UpdateImpactMutation>;
export type UpdateImpactMutationOptions = Apollo.BaseMutationOptions<
  UpdateImpactMutation,
  UpdateImpactMutationVariables
>;
export const UpdateImpactPriorityDocument = gql`
  mutation UpdateImpactPriority($impactID: uuid!, $priority: Int!) {
    update_impact_by_pk(
      pk_columns: { id: $impactID }
      _set: { priority: $priority }
    ) {
      id
      priority
    }
  }
`;
export type UpdateImpactPriorityMutationFn = Apollo.MutationFunction<
  UpdateImpactPriorityMutation,
  UpdateImpactPriorityMutationVariables
>;
export type UpdateImpactPriorityComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateImpactPriorityMutation,
    UpdateImpactPriorityMutationVariables
  >,
  "mutation"
>;

export const UpdateImpactPriorityComponent = (
  props: UpdateImpactPriorityComponentProps
) => (
  <ApolloReactComponents.Mutation<
    UpdateImpactPriorityMutation,
    UpdateImpactPriorityMutationVariables
  >
    mutation={UpdateImpactPriorityDocument}
    {...props}
  />
);

export type UpdateImpactPriorityProps<
  TChildProps = {},
  TDataName extends string = "mutate"
> = {
  [key in TDataName]: Apollo.MutationFunction<
    UpdateImpactPriorityMutation,
    UpdateImpactPriorityMutationVariables
  >;
} & TChildProps;
export function withUpdateImpactPriority<
  TProps,
  TChildProps = {},
  TDataName extends string = "mutate"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateImpactPriorityMutation,
    UpdateImpactPriorityMutationVariables,
    UpdateImpactPriorityProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateImpactPriorityMutation,
    UpdateImpactPriorityMutationVariables,
    UpdateImpactPriorityProps<TChildProps, TDataName>
  >(UpdateImpactPriorityDocument, {
    alias: "updateImpactPriority",
    ...operationOptions,
  });
}

/**
 * __useUpdateImpactPriorityMutation__
 *
 * To run a mutation, you first call `useUpdateImpactPriorityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateImpactPriorityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateImpactPriorityMutation, { data, loading, error }] = useUpdateImpactPriorityMutation({
 *   variables: {
 *      impactID: // value for 'impactID'
 *      priority: // value for 'priority'
 *   },
 * });
 */
export function useUpdateImpactPriorityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateImpactPriorityMutation,
    UpdateImpactPriorityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateImpactPriorityMutation,
    UpdateImpactPriorityMutationVariables
  >(UpdateImpactPriorityDocument, options);
}
export type UpdateImpactPriorityMutationHookResult = ReturnType<
  typeof useUpdateImpactPriorityMutation
>;
export type UpdateImpactPriorityMutationResult =
  Apollo.MutationResult<UpdateImpactPriorityMutation>;
export type UpdateImpactPriorityMutationOptions = Apollo.BaseMutationOptions<
  UpdateImpactPriorityMutation,
  UpdateImpactPriorityMutationVariables
>;
export const UpdateOrgDocument = gql`
  mutation updateOrg(
    $id: uuid!
    $name: String
    $slug: String!
    $description: String
    $long_description: String
    $main_image: String!
    $geography: String
    $size: String
    $founded_at: String
    $link_website: String
    $link_annual_report: String
    $link_financials: String
  ) {
    update_orgs_by_pk(
      _set: {
        name: $name
        slug: $slug
        description: $description
        long_description: $long_description
        main_image: $main_image
        geography: $geography
        size: $size
        founded_at: $founded_at
        link_website: $link_website
        link_financials: $link_financials
        link_annual_report: $link_annual_report
      }
      pk_columns: { id: $id }
    ) {
      id
      created_at
      name
      slug
      description
      long_description
      main_image
      geography
      size
      founded_at
      link_website
      link_annual_report
      link_financials
    }
  }
`;
export type UpdateOrgMutationFn = Apollo.MutationFunction<
  UpdateOrgMutation,
  UpdateOrgMutationVariables
>;
export type UpdateOrgComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateOrgMutation,
    UpdateOrgMutationVariables
  >,
  "mutation"
>;

export const UpdateOrgComponent = (props: UpdateOrgComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateOrgMutation, UpdateOrgMutationVariables>
    mutation={UpdateOrgDocument}
    {...props}
  />
);

export type UpdateOrgProps<
  TChildProps = {},
  TDataName extends string = "mutate"
> = {
  [key in TDataName]: Apollo.MutationFunction<
    UpdateOrgMutation,
    UpdateOrgMutationVariables
  >;
} & TChildProps;
export function withUpdateOrg<
  TProps,
  TChildProps = {},
  TDataName extends string = "mutate"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateOrgMutation,
    UpdateOrgMutationVariables,
    UpdateOrgProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateOrgMutation,
    UpdateOrgMutationVariables,
    UpdateOrgProps<TChildProps, TDataName>
  >(UpdateOrgDocument, {
    alias: "updateOrg",
    ...operationOptions,
  });
}

/**
 * __useUpdateOrgMutation__
 *
 * To run a mutation, you first call `useUpdateOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrgMutation, { data, loading, error }] = useUpdateOrgMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      slug: // value for 'slug'
 *      description: // value for 'description'
 *      long_description: // value for 'long_description'
 *      main_image: // value for 'main_image'
 *      geography: // value for 'geography'
 *      size: // value for 'size'
 *      founded_at: // value for 'founded_at'
 *      link_website: // value for 'link_website'
 *      link_annual_report: // value for 'link_annual_report'
 *      link_financials: // value for 'link_financials'
 *   },
 * });
 */
export function useUpdateOrgMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateOrgMutation,
    UpdateOrgMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateOrgMutation, UpdateOrgMutationVariables>(
    UpdateOrgDocument,
    options
  );
}
export type UpdateOrgMutationHookResult = ReturnType<
  typeof useUpdateOrgMutation
>;
export type UpdateOrgMutationResult = Apollo.MutationResult<UpdateOrgMutation>;
export type UpdateOrgMutationOptions = Apollo.BaseMutationOptions<
  UpdateOrgMutation,
  UpdateOrgMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($userId: uuid!, $name: String) {
    update_users(where: { id: { _eq: $userId } }, _set: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export type UpdateUserComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
  "mutation"
>;

export const UpdateUserComponent = (props: UpdateUserComponentProps) => (
  <ApolloReactComponents.Mutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
    mutation={UpdateUserDocument}
    {...props}
  />
);

export type UpdateUserProps<
  TChildProps = {},
  TDataName extends string = "mutate"
> = {
  [key in TDataName]: Apollo.MutationFunction<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >;
} & TChildProps;
export function withUpdateUser<
  TProps,
  TChildProps = {},
  TDataName extends string = "mutate"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateUserMutation,
    UpdateUserMutationVariables,
    UpdateUserProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateUserMutation,
    UpdateUserMutationVariables,
    UpdateUserProps<TChildProps, TDataName>
  >(UpdateUserDocument, {
    alias: "updateUser",
    ...operationOptions,
  });
}

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const CountOrgsDocument = gql`
  query countOrgs {
    orgs_aggregate {
      aggregate {
        count
      }
    }
  }
`;
export type CountOrgsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    CountOrgsQuery,
    CountOrgsQueryVariables
  >,
  "query"
>;

export const CountOrgsComponent = (props: CountOrgsComponentProps) => (
  <ApolloReactComponents.Query<CountOrgsQuery, CountOrgsQueryVariables>
    query={CountOrgsDocument}
    {...props}
  />
);

export type CountOrgsProps<
  TChildProps = {},
  TDataName extends string = "data"
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    CountOrgsQuery,
    CountOrgsQueryVariables
  >;
} & TChildProps;
export function withCountOrgs<
  TProps,
  TChildProps = {},
  TDataName extends string = "data"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CountOrgsQuery,
    CountOrgsQueryVariables,
    CountOrgsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    CountOrgsQuery,
    CountOrgsQueryVariables,
    CountOrgsProps<TChildProps, TDataName>
  >(CountOrgsDocument, {
    alias: "countOrgs",
    ...operationOptions,
  });
}

/**
 * __useCountOrgsQuery__
 *
 * To run a query within a React component, call `useCountOrgsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountOrgsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountOrgsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountOrgsQuery(
  baseOptions?: Apollo.QueryHookOptions<CountOrgsQuery, CountOrgsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CountOrgsQuery, CountOrgsQueryVariables>(
    CountOrgsDocument,
    options
  );
}
export function useCountOrgsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CountOrgsQuery,
    CountOrgsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CountOrgsQuery, CountOrgsQueryVariables>(
    CountOrgsDocument,
    options
  );
}
export type CountOrgsQueryHookResult = ReturnType<typeof useCountOrgsQuery>;
export type CountOrgsLazyQueryHookResult = ReturnType<
  typeof useCountOrgsLazyQuery
>;
export type CountOrgsQueryResult = Apollo.QueryResult<
  CountOrgsQuery,
  CountOrgsQueryVariables
>;
export const FetchFeaturedDocument = gql`
  query fetchFeatured($top: Int) {
    orgs(
      order_by: { name: asc }
      limit: $top
      where: {
        main_image: { _is_null: false }
        geography: { _is_null: false }
        impacts: { id: { _is_null: false } }
      }
    ) {
      id
      created_at
      name
      slug
      description
      main_image
      geography
      impacts(order_by: { priority: asc }, limit: 1) {
        id
        value
        indicator
        sdg
        prefix
        suffix
      }
    }
  }
`;
export type FetchFeaturedComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FetchFeaturedQuery,
    FetchFeaturedQueryVariables
  >,
  "query"
>;

export const FetchFeaturedComponent = (props: FetchFeaturedComponentProps) => (
  <ApolloReactComponents.Query<FetchFeaturedQuery, FetchFeaturedQueryVariables>
    query={FetchFeaturedDocument}
    {...props}
  />
);

export type FetchFeaturedProps<
  TChildProps = {},
  TDataName extends string = "data"
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    FetchFeaturedQuery,
    FetchFeaturedQueryVariables
  >;
} & TChildProps;
export function withFetchFeatured<
  TProps,
  TChildProps = {},
  TDataName extends string = "data"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FetchFeaturedQuery,
    FetchFeaturedQueryVariables,
    FetchFeaturedProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FetchFeaturedQuery,
    FetchFeaturedQueryVariables,
    FetchFeaturedProps<TChildProps, TDataName>
  >(FetchFeaturedDocument, {
    alias: "fetchFeatured",
    ...operationOptions,
  });
}

/**
 * __useFetchFeaturedQuery__
 *
 * To run a query within a React component, call `useFetchFeaturedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchFeaturedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchFeaturedQuery({
 *   variables: {
 *      top: // value for 'top'
 *   },
 * });
 */
export function useFetchFeaturedQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchFeaturedQuery,
    FetchFeaturedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchFeaturedQuery, FetchFeaturedQueryVariables>(
    FetchFeaturedDocument,
    options
  );
}
export function useFetchFeaturedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchFeaturedQuery,
    FetchFeaturedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchFeaturedQuery, FetchFeaturedQueryVariables>(
    FetchFeaturedDocument,
    options
  );
}
export type FetchFeaturedQueryHookResult = ReturnType<
  typeof useFetchFeaturedQuery
>;
export type FetchFeaturedLazyQueryHookResult = ReturnType<
  typeof useFetchFeaturedLazyQuery
>;
export type FetchFeaturedQueryResult = Apollo.QueryResult<
  FetchFeaturedQuery,
  FetchFeaturedQueryVariables
>;
export const FetchLatestDocument = gql`
  query fetchLatest($top: Int) {
    orgs(order_by: { created_at: desc }, limit: $top) {
      id
      created_at
      name
      slug
      description
      main_image
      geography
      impacts(order_by: { priority: asc }, limit: 1) {
        id
        value
        indicator
        sdg
        prefix
        suffix
      }
    }
  }
`;
export type FetchLatestComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FetchLatestQuery,
    FetchLatestQueryVariables
  >,
  "query"
>;

export const FetchLatestComponent = (props: FetchLatestComponentProps) => (
  <ApolloReactComponents.Query<FetchLatestQuery, FetchLatestQueryVariables>
    query={FetchLatestDocument}
    {...props}
  />
);

export type FetchLatestProps<
  TChildProps = {},
  TDataName extends string = "data"
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    FetchLatestQuery,
    FetchLatestQueryVariables
  >;
} & TChildProps;
export function withFetchLatest<
  TProps,
  TChildProps = {},
  TDataName extends string = "data"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FetchLatestQuery,
    FetchLatestQueryVariables,
    FetchLatestProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FetchLatestQuery,
    FetchLatestQueryVariables,
    FetchLatestProps<TChildProps, TDataName>
  >(FetchLatestDocument, {
    alias: "fetchLatest",
    ...operationOptions,
  });
}

/**
 * __useFetchLatestQuery__
 *
 * To run a query within a React component, call `useFetchLatestQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchLatestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchLatestQuery({
 *   variables: {
 *      top: // value for 'top'
 *   },
 * });
 */
export function useFetchLatestQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchLatestQuery,
    FetchLatestQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchLatestQuery, FetchLatestQueryVariables>(
    FetchLatestDocument,
    options
  );
}
export function useFetchLatestLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchLatestQuery,
    FetchLatestQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchLatestQuery, FetchLatestQueryVariables>(
    FetchLatestDocument,
    options
  );
}
export type FetchLatestQueryHookResult = ReturnType<typeof useFetchLatestQuery>;
export type FetchLatestLazyQueryHookResult = ReturnType<
  typeof useFetchLatestLazyQuery
>;
export type FetchLatestQueryResult = Apollo.QueryResult<
  FetchLatestQuery,
  FetchLatestQueryVariables
>;
export const FetchOrgDocument = gql`
  query fetchOrg($slug: String) {
    orgs(where: { slug: { _eq: $slug } }) {
      id
      created_at
      name
      author_id
      slug
      description
      long_description
      main_image
      geography
      founded_at
      size
      link_website
      link_annual_report
      link_financials
      impacts(order_by: { priority: asc }) {
        id
        value
        indicator
        sdg
        context
        priority
        prefix
        suffix
      }
    }
  }
`;
export type FetchOrgComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FetchOrgQuery,
    FetchOrgQueryVariables
  >,
  "query"
>;

export const FetchOrgComponent = (props: FetchOrgComponentProps) => (
  <ApolloReactComponents.Query<FetchOrgQuery, FetchOrgQueryVariables>
    query={FetchOrgDocument}
    {...props}
  />
);

export type FetchOrgProps<
  TChildProps = {},
  TDataName extends string = "data"
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    FetchOrgQuery,
    FetchOrgQueryVariables
  >;
} & TChildProps;
export function withFetchOrg<
  TProps,
  TChildProps = {},
  TDataName extends string = "data"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FetchOrgQuery,
    FetchOrgQueryVariables,
    FetchOrgProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FetchOrgQuery,
    FetchOrgQueryVariables,
    FetchOrgProps<TChildProps, TDataName>
  >(FetchOrgDocument, {
    alias: "fetchOrg",
    ...operationOptions,
  });
}

/**
 * __useFetchOrgQuery__
 *
 * To run a query within a React component, call `useFetchOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchOrgQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useFetchOrgQuery(
  baseOptions?: Apollo.QueryHookOptions<FetchOrgQuery, FetchOrgQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchOrgQuery, FetchOrgQueryVariables>(
    FetchOrgDocument,
    options
  );
}
export function useFetchOrgLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchOrgQuery,
    FetchOrgQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchOrgQuery, FetchOrgQueryVariables>(
    FetchOrgDocument,
    options
  );
}
export type FetchOrgQueryHookResult = ReturnType<typeof useFetchOrgQuery>;
export type FetchOrgLazyQueryHookResult = ReturnType<
  typeof useFetchOrgLazyQuery
>;
export type FetchOrgQueryResult = Apollo.QueryResult<
  FetchOrgQuery,
  FetchOrgQueryVariables
>;
export const FetchOrgsDocument = gql`
  query fetchOrgs {
    orgs(order_by: { created_at: desc }) {
      id
      created_at
      name
      slug
      description
      main_image
      geography
      impacts(order_by: { priority: asc }, limit: 1) {
        id
        value
        indicator
        sdg
        prefix
        suffix
      }
    }
  }
`;
export type FetchOrgsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FetchOrgsQuery,
    FetchOrgsQueryVariables
  >,
  "query"
>;

export const FetchOrgsComponent = (props: FetchOrgsComponentProps) => (
  <ApolloReactComponents.Query<FetchOrgsQuery, FetchOrgsQueryVariables>
    query={FetchOrgsDocument}
    {...props}
  />
);

export type FetchOrgsProps<
  TChildProps = {},
  TDataName extends string = "data"
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    FetchOrgsQuery,
    FetchOrgsQueryVariables
  >;
} & TChildProps;
export function withFetchOrgs<
  TProps,
  TChildProps = {},
  TDataName extends string = "data"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FetchOrgsQuery,
    FetchOrgsQueryVariables,
    FetchOrgsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FetchOrgsQuery,
    FetchOrgsQueryVariables,
    FetchOrgsProps<TChildProps, TDataName>
  >(FetchOrgsDocument, {
    alias: "fetchOrgs",
    ...operationOptions,
  });
}

/**
 * __useFetchOrgsQuery__
 *
 * To run a query within a React component, call `useFetchOrgsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchOrgsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchOrgsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchOrgsQuery(
  baseOptions?: Apollo.QueryHookOptions<FetchOrgsQuery, FetchOrgsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchOrgsQuery, FetchOrgsQueryVariables>(
    FetchOrgsDocument,
    options
  );
}
export function useFetchOrgsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchOrgsQuery,
    FetchOrgsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchOrgsQuery, FetchOrgsQueryVariables>(
    FetchOrgsDocument,
    options
  );
}
export type FetchOrgsQueryHookResult = ReturnType<typeof useFetchOrgsQuery>;
export type FetchOrgsLazyQueryHookResult = ReturnType<
  typeof useFetchOrgsLazyQuery
>;
export type FetchOrgsQueryResult = Apollo.QueryResult<
  FetchOrgsQuery,
  FetchOrgsQueryVariables
>;
export const FetchUserDocument = gql`
  query fetchUser($userEmail: String!) {
    users(where: { email: { _eq: $userEmail } }) {
      is_user_admin
    }
  }
`;
export type FetchUserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FetchUserQuery,
    FetchUserQueryVariables
  >,
  "query"
> &
  ({ variables: FetchUserQueryVariables; skip?: boolean } | { skip: boolean });

export const FetchUserComponent = (props: FetchUserComponentProps) => (
  <ApolloReactComponents.Query<FetchUserQuery, FetchUserQueryVariables>
    query={FetchUserDocument}
    {...props}
  />
);

export type FetchUserProps<
  TChildProps = {},
  TDataName extends string = "data"
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    FetchUserQuery,
    FetchUserQueryVariables
  >;
} & TChildProps;
export function withFetchUser<
  TProps,
  TChildProps = {},
  TDataName extends string = "data"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FetchUserQuery,
    FetchUserQueryVariables,
    FetchUserProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FetchUserQuery,
    FetchUserQueryVariables,
    FetchUserProps<TChildProps, TDataName>
  >(FetchUserDocument, {
    alias: "fetchUser",
    ...operationOptions,
  });
}

/**
 * __useFetchUserQuery__
 *
 * To run a query within a React component, call `useFetchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserQuery({
 *   variables: {
 *      userEmail: // value for 'userEmail'
 *   },
 * });
 */
export function useFetchUserQuery(
  baseOptions: Apollo.QueryHookOptions<FetchUserQuery, FetchUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchUserQuery, FetchUserQueryVariables>(
    FetchUserDocument,
    options
  );
}
export function useFetchUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchUserQuery,
    FetchUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchUserQuery, FetchUserQueryVariables>(
    FetchUserDocument,
    options
  );
}
export type FetchUserQueryHookResult = ReturnType<typeof useFetchUserQuery>;
export type FetchUserLazyQueryHookResult = ReturnType<
  typeof useFetchUserLazyQuery
>;
export type FetchUserQueryResult = Apollo.QueryResult<
  FetchUserQuery,
  FetchUserQueryVariables
>;
export const MyOrgsDocument = gql`
  query myOrgs($userId: uuid!) {
    users_by_pk(id: $userId) {
      id
      name
      orgs(order_by: { created_at: desc }) {
        id
        created_at
        name
        slug
        description
        main_image
        geography
        impacts(order_by: { priority: asc }, limit: 1) {
          id
          value
          indicator
          sdg
          prefix
          suffix
        }
      }
    }
  }
`;
export type MyOrgsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    MyOrgsQuery,
    MyOrgsQueryVariables
  >,
  "query"
> &
  ({ variables: MyOrgsQueryVariables; skip?: boolean } | { skip: boolean });

export const MyOrgsComponent = (props: MyOrgsComponentProps) => (
  <ApolloReactComponents.Query<MyOrgsQuery, MyOrgsQueryVariables>
    query={MyOrgsDocument}
    {...props}
  />
);

export type MyOrgsProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    MyOrgsQuery,
    MyOrgsQueryVariables
  >;
} & TChildProps;
export function withMyOrgs<
  TProps,
  TChildProps = {},
  TDataName extends string = "data"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    MyOrgsQuery,
    MyOrgsQueryVariables,
    MyOrgsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    MyOrgsQuery,
    MyOrgsQueryVariables,
    MyOrgsProps<TChildProps, TDataName>
  >(MyOrgsDocument, {
    alias: "myOrgs",
    ...operationOptions,
  });
}

/**
 * __useMyOrgsQuery__
 *
 * To run a query within a React component, call `useMyOrgsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrgsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrgsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMyOrgsQuery(
  baseOptions: Apollo.QueryHookOptions<MyOrgsQuery, MyOrgsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyOrgsQuery, MyOrgsQueryVariables>(
    MyOrgsDocument,
    options
  );
}
export function useMyOrgsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyOrgsQuery, MyOrgsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyOrgsQuery, MyOrgsQueryVariables>(
    MyOrgsDocument,
    options
  );
}
export type MyOrgsQueryHookResult = ReturnType<typeof useMyOrgsQuery>;
export type MyOrgsLazyQueryHookResult = ReturnType<typeof useMyOrgsLazyQuery>;
export type MyOrgsQueryResult = Apollo.QueryResult<
  MyOrgsQuery,
  MyOrgsQueryVariables
>;
export const SearchOrgsDocument = gql`
  query searchOrgs($q: String) {
    orgs(where: { name: { _ilike: $q } }) {
      id
      name
      slug
      impacts(order_by: { priority: asc }, limit: 1) {
        id
        sdg
      }
    }
  }
`;
export type SearchOrgsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    SearchOrgsQuery,
    SearchOrgsQueryVariables
  >,
  "query"
>;

export const SearchOrgsComponent = (props: SearchOrgsComponentProps) => (
  <ApolloReactComponents.Query<SearchOrgsQuery, SearchOrgsQueryVariables>
    query={SearchOrgsDocument}
    {...props}
  />
);

export type SearchOrgsProps<
  TChildProps = {},
  TDataName extends string = "data"
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    SearchOrgsQuery,
    SearchOrgsQueryVariables
  >;
} & TChildProps;
export function withSearchOrgs<
  TProps,
  TChildProps = {},
  TDataName extends string = "data"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SearchOrgsQuery,
    SearchOrgsQueryVariables,
    SearchOrgsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    SearchOrgsQuery,
    SearchOrgsQueryVariables,
    SearchOrgsProps<TChildProps, TDataName>
  >(SearchOrgsDocument, {
    alias: "searchOrgs",
    ...operationOptions,
  });
}

/**
 * __useSearchOrgsQuery__
 *
 * To run a query within a React component, call `useSearchOrgsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchOrgsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchOrgsQuery({
 *   variables: {
 *      q: // value for 'q'
 *   },
 * });
 */
export function useSearchOrgsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SearchOrgsQuery,
    SearchOrgsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchOrgsQuery, SearchOrgsQueryVariables>(
    SearchOrgsDocument,
    options
  );
}
export function useSearchOrgsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchOrgsQuery,
    SearchOrgsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchOrgsQuery, SearchOrgsQueryVariables>(
    SearchOrgsDocument,
    options
  );
}
export type SearchOrgsQueryHookResult = ReturnType<typeof useSearchOrgsQuery>;
export type SearchOrgsLazyQueryHookResult = ReturnType<
  typeof useSearchOrgsLazyQuery
>;
export type SearchOrgsQueryResult = Apollo.QueryResult<
  SearchOrgsQuery,
  SearchOrgsQueryVariables
>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Boolean_comparison_exp: Boolean_Comparison_Exp;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Int_comparison_exp: Int_Comparison_Exp;
  String: ResolverTypeWrapper<Scalars["String"]>;
  String_comparison_exp: String_Comparison_Exp;
  accounts: ResolverTypeWrapper<Accounts>;
  accounts_aggregate: ResolverTypeWrapper<Accounts_Aggregate>;
  accounts_aggregate_fields: ResolverTypeWrapper<Accounts_Aggregate_Fields>;
  accounts_bool_exp: Accounts_Bool_Exp;
  accounts_constraint: Accounts_Constraint;
  accounts_insert_input: Accounts_Insert_Input;
  accounts_max_fields: ResolverTypeWrapper<Accounts_Max_Fields>;
  accounts_min_fields: ResolverTypeWrapper<Accounts_Min_Fields>;
  accounts_mutation_response: ResolverTypeWrapper<Accounts_Mutation_Response>;
  accounts_on_conflict: Accounts_On_Conflict;
  accounts_order_by: Accounts_Order_By;
  accounts_pk_columns_input: Accounts_Pk_Columns_Input;
  accounts_select_column: Accounts_Select_Column;
  accounts_set_input: Accounts_Set_Input;
  accounts_update_column: Accounts_Update_Column;
  impact: ResolverTypeWrapper<Impact>;
  impact_aggregate: ResolverTypeWrapper<Impact_Aggregate>;
  impact_aggregate_fields: ResolverTypeWrapper<Impact_Aggregate_Fields>;
  impact_aggregate_order_by: Impact_Aggregate_Order_By;
  impact_arr_rel_insert_input: Impact_Arr_Rel_Insert_Input;
  impact_avg_fields: ResolverTypeWrapper<Impact_Avg_Fields>;
  impact_avg_order_by: Impact_Avg_Order_By;
  impact_bool_exp: Impact_Bool_Exp;
  impact_constraint: Impact_Constraint;
  impact_inc_input: Impact_Inc_Input;
  impact_insert_input: Impact_Insert_Input;
  impact_max_fields: ResolverTypeWrapper<Impact_Max_Fields>;
  impact_max_order_by: Impact_Max_Order_By;
  impact_min_fields: ResolverTypeWrapper<Impact_Min_Fields>;
  impact_min_order_by: Impact_Min_Order_By;
  impact_mutation_response: ResolverTypeWrapper<Impact_Mutation_Response>;
  impact_on_conflict: Impact_On_Conflict;
  impact_order_by: Impact_Order_By;
  impact_pk_columns_input: Impact_Pk_Columns_Input;
  impact_select_column: Impact_Select_Column;
  impact_set_input: Impact_Set_Input;
  impact_stddev_fields: ResolverTypeWrapper<Impact_Stddev_Fields>;
  impact_stddev_order_by: Impact_Stddev_Order_By;
  impact_stddev_pop_fields: ResolverTypeWrapper<Impact_Stddev_Pop_Fields>;
  impact_stddev_pop_order_by: Impact_Stddev_Pop_Order_By;
  impact_stddev_samp_fields: ResolverTypeWrapper<Impact_Stddev_Samp_Fields>;
  impact_stddev_samp_order_by: Impact_Stddev_Samp_Order_By;
  impact_sum_fields: ResolverTypeWrapper<Impact_Sum_Fields>;
  impact_sum_order_by: Impact_Sum_Order_By;
  impact_update_column: Impact_Update_Column;
  impact_var_pop_fields: ResolverTypeWrapper<Impact_Var_Pop_Fields>;
  impact_var_pop_order_by: Impact_Var_Pop_Order_By;
  impact_var_samp_fields: ResolverTypeWrapper<Impact_Var_Samp_Fields>;
  impact_var_samp_order_by: Impact_Var_Samp_Order_By;
  impact_variance_fields: ResolverTypeWrapper<Impact_Variance_Fields>;
  impact_variance_order_by: Impact_Variance_Order_By;
  mutation_root: ResolverTypeWrapper<{}>;
  numeric: ResolverTypeWrapper<Scalars["numeric"]>;
  numeric_comparison_exp: Numeric_Comparison_Exp;
  order_by: Order_By;
  orgs: ResolverTypeWrapper<Orgs>;
  orgs_aggregate: ResolverTypeWrapper<Orgs_Aggregate>;
  orgs_aggregate_fields: ResolverTypeWrapper<Orgs_Aggregate_Fields>;
  orgs_aggregate_order_by: Orgs_Aggregate_Order_By;
  orgs_arr_rel_insert_input: Orgs_Arr_Rel_Insert_Input;
  orgs_bool_exp: Orgs_Bool_Exp;
  orgs_constraint: Orgs_Constraint;
  orgs_insert_input: Orgs_Insert_Input;
  orgs_max_fields: ResolverTypeWrapper<Orgs_Max_Fields>;
  orgs_max_order_by: Orgs_Max_Order_By;
  orgs_min_fields: ResolverTypeWrapper<Orgs_Min_Fields>;
  orgs_min_order_by: Orgs_Min_Order_By;
  orgs_mutation_response: ResolverTypeWrapper<Orgs_Mutation_Response>;
  orgs_obj_rel_insert_input: Orgs_Obj_Rel_Insert_Input;
  orgs_on_conflict: Orgs_On_Conflict;
  orgs_order_by: Orgs_Order_By;
  orgs_pk_columns_input: Orgs_Pk_Columns_Input;
  orgs_select_column: Orgs_Select_Column;
  orgs_set_input: Orgs_Set_Input;
  orgs_update_column: Orgs_Update_Column;
  query_root: ResolverTypeWrapper<{}>;
  sessions: ResolverTypeWrapper<Sessions>;
  sessions_aggregate: ResolverTypeWrapper<Sessions_Aggregate>;
  sessions_aggregate_fields: ResolverTypeWrapper<Sessions_Aggregate_Fields>;
  sessions_avg_fields: ResolverTypeWrapper<Sessions_Avg_Fields>;
  sessions_bool_exp: Sessions_Bool_Exp;
  sessions_constraint: Sessions_Constraint;
  sessions_inc_input: Sessions_Inc_Input;
  sessions_insert_input: Sessions_Insert_Input;
  sessions_max_fields: ResolverTypeWrapper<Sessions_Max_Fields>;
  sessions_min_fields: ResolverTypeWrapper<Sessions_Min_Fields>;
  sessions_mutation_response: ResolverTypeWrapper<Sessions_Mutation_Response>;
  sessions_on_conflict: Sessions_On_Conflict;
  sessions_order_by: Sessions_Order_By;
  sessions_pk_columns_input: Sessions_Pk_Columns_Input;
  sessions_select_column: Sessions_Select_Column;
  sessions_set_input: Sessions_Set_Input;
  sessions_stddev_fields: ResolverTypeWrapper<Sessions_Stddev_Fields>;
  sessions_stddev_pop_fields: ResolverTypeWrapper<Sessions_Stddev_Pop_Fields>;
  sessions_stddev_samp_fields: ResolverTypeWrapper<Sessions_Stddev_Samp_Fields>;
  sessions_sum_fields: ResolverTypeWrapper<Sessions_Sum_Fields>;
  sessions_update_column: Sessions_Update_Column;
  sessions_var_pop_fields: ResolverTypeWrapper<Sessions_Var_Pop_Fields>;
  sessions_var_samp_fields: ResolverTypeWrapper<Sessions_Var_Samp_Fields>;
  sessions_variance_fields: ResolverTypeWrapper<Sessions_Variance_Fields>;
  subscription_root: ResolverTypeWrapper<{}>;
  timestamptz: ResolverTypeWrapper<Scalars["timestamptz"]>;
  timestamptz_comparison_exp: Timestamptz_Comparison_Exp;
  users: ResolverTypeWrapper<Users>;
  users_aggregate: ResolverTypeWrapper<Users_Aggregate>;
  users_aggregate_fields: ResolverTypeWrapper<Users_Aggregate_Fields>;
  users_bool_exp: Users_Bool_Exp;
  users_constraint: Users_Constraint;
  users_insert_input: Users_Insert_Input;
  users_max_fields: ResolverTypeWrapper<Users_Max_Fields>;
  users_min_fields: ResolverTypeWrapper<Users_Min_Fields>;
  users_mutation_response: ResolverTypeWrapper<Users_Mutation_Response>;
  users_obj_rel_insert_input: Users_Obj_Rel_Insert_Input;
  users_on_conflict: Users_On_Conflict;
  users_order_by: Users_Order_By;
  users_pk_columns_input: Users_Pk_Columns_Input;
  users_select_column: Users_Select_Column;
  users_set_input: Users_Set_Input;
  users_update_column: Users_Update_Column;
  uuid: ResolverTypeWrapper<Scalars["uuid"]>;
  uuid_comparison_exp: Uuid_Comparison_Exp;
  verification_requests: ResolverTypeWrapper<Verification_Requests>;
  verification_requests_aggregate: ResolverTypeWrapper<Verification_Requests_Aggregate>;
  verification_requests_aggregate_fields: ResolverTypeWrapper<Verification_Requests_Aggregate_Fields>;
  verification_requests_bool_exp: Verification_Requests_Bool_Exp;
  verification_requests_constraint: Verification_Requests_Constraint;
  verification_requests_insert_input: Verification_Requests_Insert_Input;
  verification_requests_max_fields: ResolverTypeWrapper<Verification_Requests_Max_Fields>;
  verification_requests_min_fields: ResolverTypeWrapper<Verification_Requests_Min_Fields>;
  verification_requests_mutation_response: ResolverTypeWrapper<Verification_Requests_Mutation_Response>;
  verification_requests_on_conflict: Verification_Requests_On_Conflict;
  verification_requests_order_by: Verification_Requests_Order_By;
  verification_requests_pk_columns_input: Verification_Requests_Pk_Columns_Input;
  verification_requests_select_column: Verification_Requests_Select_Column;
  verification_requests_set_input: Verification_Requests_Set_Input;
  verification_requests_update_column: Verification_Requests_Update_Column;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  Boolean_comparison_exp: Boolean_Comparison_Exp;
  Float: Scalars["Float"];
  Int: Scalars["Int"];
  Int_comparison_exp: Int_Comparison_Exp;
  String: Scalars["String"];
  String_comparison_exp: String_Comparison_Exp;
  accounts: Accounts;
  accounts_aggregate: Accounts_Aggregate;
  accounts_aggregate_fields: Accounts_Aggregate_Fields;
  accounts_bool_exp: Accounts_Bool_Exp;
  accounts_insert_input: Accounts_Insert_Input;
  accounts_max_fields: Accounts_Max_Fields;
  accounts_min_fields: Accounts_Min_Fields;
  accounts_mutation_response: Accounts_Mutation_Response;
  accounts_on_conflict: Accounts_On_Conflict;
  accounts_order_by: Accounts_Order_By;
  accounts_pk_columns_input: Accounts_Pk_Columns_Input;
  accounts_set_input: Accounts_Set_Input;
  impact: Impact;
  impact_aggregate: Impact_Aggregate;
  impact_aggregate_fields: Impact_Aggregate_Fields;
  impact_aggregate_order_by: Impact_Aggregate_Order_By;
  impact_arr_rel_insert_input: Impact_Arr_Rel_Insert_Input;
  impact_avg_fields: Impact_Avg_Fields;
  impact_avg_order_by: Impact_Avg_Order_By;
  impact_bool_exp: Impact_Bool_Exp;
  impact_inc_input: Impact_Inc_Input;
  impact_insert_input: Impact_Insert_Input;
  impact_max_fields: Impact_Max_Fields;
  impact_max_order_by: Impact_Max_Order_By;
  impact_min_fields: Impact_Min_Fields;
  impact_min_order_by: Impact_Min_Order_By;
  impact_mutation_response: Impact_Mutation_Response;
  impact_on_conflict: Impact_On_Conflict;
  impact_order_by: Impact_Order_By;
  impact_pk_columns_input: Impact_Pk_Columns_Input;
  impact_set_input: Impact_Set_Input;
  impact_stddev_fields: Impact_Stddev_Fields;
  impact_stddev_order_by: Impact_Stddev_Order_By;
  impact_stddev_pop_fields: Impact_Stddev_Pop_Fields;
  impact_stddev_pop_order_by: Impact_Stddev_Pop_Order_By;
  impact_stddev_samp_fields: Impact_Stddev_Samp_Fields;
  impact_stddev_samp_order_by: Impact_Stddev_Samp_Order_By;
  impact_sum_fields: Impact_Sum_Fields;
  impact_sum_order_by: Impact_Sum_Order_By;
  impact_var_pop_fields: Impact_Var_Pop_Fields;
  impact_var_pop_order_by: Impact_Var_Pop_Order_By;
  impact_var_samp_fields: Impact_Var_Samp_Fields;
  impact_var_samp_order_by: Impact_Var_Samp_Order_By;
  impact_variance_fields: Impact_Variance_Fields;
  impact_variance_order_by: Impact_Variance_Order_By;
  mutation_root: {};
  numeric: Scalars["numeric"];
  numeric_comparison_exp: Numeric_Comparison_Exp;
  orgs: Orgs;
  orgs_aggregate: Orgs_Aggregate;
  orgs_aggregate_fields: Orgs_Aggregate_Fields;
  orgs_aggregate_order_by: Orgs_Aggregate_Order_By;
  orgs_arr_rel_insert_input: Orgs_Arr_Rel_Insert_Input;
  orgs_bool_exp: Orgs_Bool_Exp;
  orgs_insert_input: Orgs_Insert_Input;
  orgs_max_fields: Orgs_Max_Fields;
  orgs_max_order_by: Orgs_Max_Order_By;
  orgs_min_fields: Orgs_Min_Fields;
  orgs_min_order_by: Orgs_Min_Order_By;
  orgs_mutation_response: Orgs_Mutation_Response;
  orgs_obj_rel_insert_input: Orgs_Obj_Rel_Insert_Input;
  orgs_on_conflict: Orgs_On_Conflict;
  orgs_order_by: Orgs_Order_By;
  orgs_pk_columns_input: Orgs_Pk_Columns_Input;
  orgs_set_input: Orgs_Set_Input;
  query_root: {};
  sessions: Sessions;
  sessions_aggregate: Sessions_Aggregate;
  sessions_aggregate_fields: Sessions_Aggregate_Fields;
  sessions_avg_fields: Sessions_Avg_Fields;
  sessions_bool_exp: Sessions_Bool_Exp;
  sessions_inc_input: Sessions_Inc_Input;
  sessions_insert_input: Sessions_Insert_Input;
  sessions_max_fields: Sessions_Max_Fields;
  sessions_min_fields: Sessions_Min_Fields;
  sessions_mutation_response: Sessions_Mutation_Response;
  sessions_on_conflict: Sessions_On_Conflict;
  sessions_order_by: Sessions_Order_By;
  sessions_pk_columns_input: Sessions_Pk_Columns_Input;
  sessions_set_input: Sessions_Set_Input;
  sessions_stddev_fields: Sessions_Stddev_Fields;
  sessions_stddev_pop_fields: Sessions_Stddev_Pop_Fields;
  sessions_stddev_samp_fields: Sessions_Stddev_Samp_Fields;
  sessions_sum_fields: Sessions_Sum_Fields;
  sessions_var_pop_fields: Sessions_Var_Pop_Fields;
  sessions_var_samp_fields: Sessions_Var_Samp_Fields;
  sessions_variance_fields: Sessions_Variance_Fields;
  subscription_root: {};
  timestamptz: Scalars["timestamptz"];
  timestamptz_comparison_exp: Timestamptz_Comparison_Exp;
  users: Users;
  users_aggregate: Users_Aggregate;
  users_aggregate_fields: Users_Aggregate_Fields;
  users_bool_exp: Users_Bool_Exp;
  users_insert_input: Users_Insert_Input;
  users_max_fields: Users_Max_Fields;
  users_min_fields: Users_Min_Fields;
  users_mutation_response: Users_Mutation_Response;
  users_obj_rel_insert_input: Users_Obj_Rel_Insert_Input;
  users_on_conflict: Users_On_Conflict;
  users_order_by: Users_Order_By;
  users_pk_columns_input: Users_Pk_Columns_Input;
  users_set_input: Users_Set_Input;
  uuid: Scalars["uuid"];
  uuid_comparison_exp: Uuid_Comparison_Exp;
  verification_requests: Verification_Requests;
  verification_requests_aggregate: Verification_Requests_Aggregate;
  verification_requests_aggregate_fields: Verification_Requests_Aggregate_Fields;
  verification_requests_bool_exp: Verification_Requests_Bool_Exp;
  verification_requests_insert_input: Verification_Requests_Insert_Input;
  verification_requests_max_fields: Verification_Requests_Max_Fields;
  verification_requests_min_fields: Verification_Requests_Min_Fields;
  verification_requests_mutation_response: Verification_Requests_Mutation_Response;
  verification_requests_on_conflict: Verification_Requests_On_Conflict;
  verification_requests_order_by: Verification_Requests_Order_By;
  verification_requests_pk_columns_input: Verification_Requests_Pk_Columns_Input;
  verification_requests_set_input: Verification_Requests_Set_Input;
};

export type CachedDirectiveArgs = {
  refresh?: Scalars["Boolean"];
  ttl?: Scalars["Int"];
};

export type CachedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = CachedDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["accounts"] = ResolversParentTypes["accounts"]
> = {
  access_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  access_token_expires?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  compound_id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes["timestamptz"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["uuid"], ParentType, ContextType>;
  provider_account_id?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  provider_id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  provider_type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  refresh_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updated_at?: Resolver<ResolversTypes["timestamptz"], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes["uuid"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Accounts_AggregateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["accounts_aggregate"] = ResolversParentTypes["accounts_aggregate"]
> = {
  aggregate?: Resolver<
    Maybe<ResolversTypes["accounts_aggregate_fields"]>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<Array<ResolversTypes["accounts"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Accounts_Aggregate_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["accounts_aggregate_fields"] = ResolversParentTypes["accounts_aggregate_fields"]
> = {
  count?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    Partial<Accounts_Aggregate_FieldsCountArgs>
  >;
  max?: Resolver<
    Maybe<ResolversTypes["accounts_max_fields"]>,
    ParentType,
    ContextType
  >;
  min?: Resolver<
    Maybe<ResolversTypes["accounts_min_fields"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Accounts_Max_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["accounts_max_fields"] = ResolversParentTypes["accounts_max_fields"]
> = {
  access_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  access_token_expires?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  compound_id?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  created_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  provider_account_id?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  provider_id?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  provider_type?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  refresh_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updated_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  user_id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Accounts_Min_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["accounts_min_fields"] = ResolversParentTypes["accounts_min_fields"]
> = {
  access_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  access_token_expires?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  compound_id?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  created_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  provider_account_id?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  provider_id?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  provider_type?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  refresh_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updated_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  user_id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Accounts_Mutation_ResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["accounts_mutation_response"] = ResolversParentTypes["accounts_mutation_response"]
> = {
  affected_rows?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  returning?: Resolver<
    Array<ResolversTypes["accounts"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImpactResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact"] = ResolversParentTypes["impact"]
> = {
  context?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["uuid"], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  indicator?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  org?: Resolver<ResolversTypes["uuid"], ParentType, ContextType>;
  orgByOrg?: Resolver<ResolversTypes["orgs"], ParentType, ContextType>;
  prefix?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  priority?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  sdg?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  suffix?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  test_col?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes["numeric"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Impact_AggregateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact_aggregate"] = ResolversParentTypes["impact_aggregate"]
> = {
  aggregate?: Resolver<
    Maybe<ResolversTypes["impact_aggregate_fields"]>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<Array<ResolversTypes["impact"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Impact_Aggregate_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact_aggregate_fields"] = ResolversParentTypes["impact_aggregate_fields"]
> = {
  avg?: Resolver<
    Maybe<ResolversTypes["impact_avg_fields"]>,
    ParentType,
    ContextType
  >;
  count?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    Partial<Impact_Aggregate_FieldsCountArgs>
  >;
  max?: Resolver<
    Maybe<ResolversTypes["impact_max_fields"]>,
    ParentType,
    ContextType
  >;
  min?: Resolver<
    Maybe<ResolversTypes["impact_min_fields"]>,
    ParentType,
    ContextType
  >;
  stddev?: Resolver<
    Maybe<ResolversTypes["impact_stddev_fields"]>,
    ParentType,
    ContextType
  >;
  stddev_pop?: Resolver<
    Maybe<ResolversTypes["impact_stddev_pop_fields"]>,
    ParentType,
    ContextType
  >;
  stddev_samp?: Resolver<
    Maybe<ResolversTypes["impact_stddev_samp_fields"]>,
    ParentType,
    ContextType
  >;
  sum?: Resolver<
    Maybe<ResolversTypes["impact_sum_fields"]>,
    ParentType,
    ContextType
  >;
  var_pop?: Resolver<
    Maybe<ResolversTypes["impact_var_pop_fields"]>,
    ParentType,
    ContextType
  >;
  var_samp?: Resolver<
    Maybe<ResolversTypes["impact_var_samp_fields"]>,
    ParentType,
    ContextType
  >;
  variance?: Resolver<
    Maybe<ResolversTypes["impact_variance_fields"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Impact_Avg_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact_avg_fields"] = ResolversParentTypes["impact_avg_fields"]
> = {
  priority?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Impact_Max_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact_max_fields"] = ResolversParentTypes["impact_max_fields"]
> = {
  context?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  indicator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  org?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  prefix?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  sdg?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  suffix?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  test_col?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes["numeric"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Impact_Min_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact_min_fields"] = ResolversParentTypes["impact_min_fields"]
> = {
  context?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  indicator?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  org?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  prefix?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  sdg?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  suffix?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  test_col?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes["numeric"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Impact_Mutation_ResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact_mutation_response"] = ResolversParentTypes["impact_mutation_response"]
> = {
  affected_rows?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  returning?: Resolver<
    Array<ResolversTypes["impact"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Impact_Stddev_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact_stddev_fields"] = ResolversParentTypes["impact_stddev_fields"]
> = {
  priority?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Impact_Stddev_Pop_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact_stddev_pop_fields"] = ResolversParentTypes["impact_stddev_pop_fields"]
> = {
  priority?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Impact_Stddev_Samp_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact_stddev_samp_fields"] = ResolversParentTypes["impact_stddev_samp_fields"]
> = {
  priority?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Impact_Sum_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact_sum_fields"] = ResolversParentTypes["impact_sum_fields"]
> = {
  priority?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes["numeric"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Impact_Var_Pop_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact_var_pop_fields"] = ResolversParentTypes["impact_var_pop_fields"]
> = {
  priority?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Impact_Var_Samp_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact_var_samp_fields"] = ResolversParentTypes["impact_var_samp_fields"]
> = {
  priority?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Impact_Variance_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["impact_variance_fields"] = ResolversParentTypes["impact_variance_fields"]
> = {
  priority?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Mutation_RootResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["mutation_root"] = ResolversParentTypes["mutation_root"]
> = {
  delete_accounts?: Resolver<
    Maybe<ResolversTypes["accounts_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootDelete_AccountsArgs, "where">
  >;
  delete_accounts_by_pk?: Resolver<
    Maybe<ResolversTypes["accounts"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootDelete_Accounts_By_PkArgs, "id">
  >;
  delete_impact?: Resolver<
    Maybe<ResolversTypes["impact_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootDelete_ImpactArgs, "where">
  >;
  delete_impact_by_pk?: Resolver<
    Maybe<ResolversTypes["impact"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootDelete_Impact_By_PkArgs, "id">
  >;
  delete_orgs?: Resolver<
    Maybe<ResolversTypes["orgs_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootDelete_OrgsArgs, "where">
  >;
  delete_orgs_by_pk?: Resolver<
    Maybe<ResolversTypes["orgs"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootDelete_Orgs_By_PkArgs, "id">
  >;
  delete_sessions?: Resolver<
    Maybe<ResolversTypes["sessions_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootDelete_SessionsArgs, "where">
  >;
  delete_sessions_by_pk?: Resolver<
    Maybe<ResolversTypes["sessions"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootDelete_Sessions_By_PkArgs, "id">
  >;
  delete_users?: Resolver<
    Maybe<ResolversTypes["users_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootDelete_UsersArgs, "where">
  >;
  delete_users_by_pk?: Resolver<
    Maybe<ResolversTypes["users"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootDelete_Users_By_PkArgs, "id">
  >;
  delete_verification_requests?: Resolver<
    Maybe<ResolversTypes["verification_requests_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootDelete_Verification_RequestsArgs, "where">
  >;
  delete_verification_requests_by_pk?: Resolver<
    Maybe<ResolversTypes["verification_requests"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootDelete_Verification_Requests_By_PkArgs, "id">
  >;
  insert_accounts?: Resolver<
    Maybe<ResolversTypes["accounts_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootInsert_AccountsArgs, "objects">
  >;
  insert_accounts_one?: Resolver<
    Maybe<ResolversTypes["accounts"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootInsert_Accounts_OneArgs, "object">
  >;
  insert_impact?: Resolver<
    Maybe<ResolversTypes["impact_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootInsert_ImpactArgs, "objects">
  >;
  insert_impact_one?: Resolver<
    Maybe<ResolversTypes["impact"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootInsert_Impact_OneArgs, "object">
  >;
  insert_orgs?: Resolver<
    Maybe<ResolversTypes["orgs_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootInsert_OrgsArgs, "objects">
  >;
  insert_orgs_one?: Resolver<
    Maybe<ResolversTypes["orgs"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootInsert_Orgs_OneArgs, "object">
  >;
  insert_sessions?: Resolver<
    Maybe<ResolversTypes["sessions_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootInsert_SessionsArgs, "objects">
  >;
  insert_sessions_one?: Resolver<
    Maybe<ResolversTypes["sessions"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootInsert_Sessions_OneArgs, "object">
  >;
  insert_users?: Resolver<
    Maybe<ResolversTypes["users_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootInsert_UsersArgs, "objects">
  >;
  insert_users_one?: Resolver<
    Maybe<ResolversTypes["users"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootInsert_Users_OneArgs, "object">
  >;
  insert_verification_requests?: Resolver<
    Maybe<ResolversTypes["verification_requests_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootInsert_Verification_RequestsArgs, "objects">
  >;
  insert_verification_requests_one?: Resolver<
    Maybe<ResolversTypes["verification_requests"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootInsert_Verification_Requests_OneArgs, "object">
  >;
  update_accounts?: Resolver<
    Maybe<ResolversTypes["accounts_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootUpdate_AccountsArgs, "where">
  >;
  update_accounts_by_pk?: Resolver<
    Maybe<ResolversTypes["accounts"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootUpdate_Accounts_By_PkArgs, "pk_columns">
  >;
  update_impact?: Resolver<
    Maybe<ResolversTypes["impact_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootUpdate_ImpactArgs, "where">
  >;
  update_impact_by_pk?: Resolver<
    Maybe<ResolversTypes["impact"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootUpdate_Impact_By_PkArgs, "pk_columns">
  >;
  update_orgs?: Resolver<
    Maybe<ResolversTypes["orgs_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootUpdate_OrgsArgs, "where">
  >;
  update_orgs_by_pk?: Resolver<
    Maybe<ResolversTypes["orgs"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootUpdate_Orgs_By_PkArgs, "pk_columns">
  >;
  update_sessions?: Resolver<
    Maybe<ResolversTypes["sessions_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootUpdate_SessionsArgs, "where">
  >;
  update_sessions_by_pk?: Resolver<
    Maybe<ResolversTypes["sessions"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootUpdate_Sessions_By_PkArgs, "pk_columns">
  >;
  update_users?: Resolver<
    Maybe<ResolversTypes["users_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootUpdate_UsersArgs, "where">
  >;
  update_users_by_pk?: Resolver<
    Maybe<ResolversTypes["users"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootUpdate_Users_By_PkArgs, "pk_columns">
  >;
  update_verification_requests?: Resolver<
    Maybe<ResolversTypes["verification_requests_mutation_response"]>,
    ParentType,
    ContextType,
    RequireFields<Mutation_RootUpdate_Verification_RequestsArgs, "where">
  >;
  update_verification_requests_by_pk?: Resolver<
    Maybe<ResolversTypes["verification_requests"]>,
    ParentType,
    ContextType,
    RequireFields<
      Mutation_RootUpdate_Verification_Requests_By_PkArgs,
      "pk_columns"
    >
  >;
};

export interface NumericScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["numeric"], any> {
  name: "numeric";
}

export type OrgsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["orgs"] = ResolversParentTypes["orgs"]
> = {
  author?: Resolver<Maybe<ResolversTypes["users"]>, ParentType, ContextType>;
  author_id?: Resolver<ResolversTypes["uuid"], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes["timestamptz"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  founded_at?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  geography?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["uuid"], ParentType, ContextType>;
  impacts?: Resolver<
    Array<ResolversTypes["impact"]>,
    ParentType,
    ContextType,
    Partial<OrgsImpactsArgs>
  >;
  impacts_aggregate?: Resolver<
    ResolversTypes["impact_aggregate"],
    ParentType,
    ContextType,
    Partial<OrgsImpacts_AggregateArgs>
  >;
  is_test_data?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  link_annual_report?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  link_financials?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  link_website?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  long_description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  main_image?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes["timestamptz"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orgs_AggregateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["orgs_aggregate"] = ResolversParentTypes["orgs_aggregate"]
> = {
  aggregate?: Resolver<
    Maybe<ResolversTypes["orgs_aggregate_fields"]>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<Array<ResolversTypes["orgs"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orgs_Aggregate_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["orgs_aggregate_fields"] = ResolversParentTypes["orgs_aggregate_fields"]
> = {
  count?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    Partial<Orgs_Aggregate_FieldsCountArgs>
  >;
  max?: Resolver<
    Maybe<ResolversTypes["orgs_max_fields"]>,
    ParentType,
    ContextType
  >;
  min?: Resolver<
    Maybe<ResolversTypes["orgs_min_fields"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orgs_Max_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["orgs_max_fields"] = ResolversParentTypes["orgs_max_fields"]
> = {
  author_id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  created_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  founded_at?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  geography?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  link_annual_report?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  link_financials?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  link_website?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  long_description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  main_image?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updated_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orgs_Min_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["orgs_min_fields"] = ResolversParentTypes["orgs_min_fields"]
> = {
  author_id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  created_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  founded_at?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  geography?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  link_annual_report?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  link_financials?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  link_website?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  long_description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  main_image?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updated_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Orgs_Mutation_ResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["orgs_mutation_response"] = ResolversParentTypes["orgs_mutation_response"]
> = {
  affected_rows?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes["orgs"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Query_RootResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["query_root"] = ResolversParentTypes["query_root"]
> = {
  accounts?: Resolver<
    Array<ResolversTypes["accounts"]>,
    ParentType,
    ContextType,
    Partial<Query_RootAccountsArgs>
  >;
  accounts_aggregate?: Resolver<
    ResolversTypes["accounts_aggregate"],
    ParentType,
    ContextType,
    Partial<Query_RootAccounts_AggregateArgs>
  >;
  accounts_by_pk?: Resolver<
    Maybe<ResolversTypes["accounts"]>,
    ParentType,
    ContextType,
    RequireFields<Query_RootAccounts_By_PkArgs, "id">
  >;
  impact?: Resolver<
    Array<ResolversTypes["impact"]>,
    ParentType,
    ContextType,
    Partial<Query_RootImpactArgs>
  >;
  impact_aggregate?: Resolver<
    ResolversTypes["impact_aggregate"],
    ParentType,
    ContextType,
    Partial<Query_RootImpact_AggregateArgs>
  >;
  impact_by_pk?: Resolver<
    Maybe<ResolversTypes["impact"]>,
    ParentType,
    ContextType,
    RequireFields<Query_RootImpact_By_PkArgs, "id">
  >;
  orgs?: Resolver<
    Array<ResolversTypes["orgs"]>,
    ParentType,
    ContextType,
    Partial<Query_RootOrgsArgs>
  >;
  orgs_aggregate?: Resolver<
    ResolversTypes["orgs_aggregate"],
    ParentType,
    ContextType,
    Partial<Query_RootOrgs_AggregateArgs>
  >;
  orgs_by_pk?: Resolver<
    Maybe<ResolversTypes["orgs"]>,
    ParentType,
    ContextType,
    RequireFields<Query_RootOrgs_By_PkArgs, "id">
  >;
  sessions?: Resolver<
    Array<ResolversTypes["sessions"]>,
    ParentType,
    ContextType,
    Partial<Query_RootSessionsArgs>
  >;
  sessions_aggregate?: Resolver<
    ResolversTypes["sessions_aggregate"],
    ParentType,
    ContextType,
    Partial<Query_RootSessions_AggregateArgs>
  >;
  sessions_by_pk?: Resolver<
    Maybe<ResolversTypes["sessions"]>,
    ParentType,
    ContextType,
    RequireFields<Query_RootSessions_By_PkArgs, "id">
  >;
  users?: Resolver<
    Array<ResolversTypes["users"]>,
    ParentType,
    ContextType,
    Partial<Query_RootUsersArgs>
  >;
  users_aggregate?: Resolver<
    ResolversTypes["users_aggregate"],
    ParentType,
    ContextType,
    Partial<Query_RootUsers_AggregateArgs>
  >;
  users_by_pk?: Resolver<
    Maybe<ResolversTypes["users"]>,
    ParentType,
    ContextType,
    RequireFields<Query_RootUsers_By_PkArgs, "id">
  >;
  verification_requests?: Resolver<
    Array<ResolversTypes["verification_requests"]>,
    ParentType,
    ContextType,
    Partial<Query_RootVerification_RequestsArgs>
  >;
  verification_requests_aggregate?: Resolver<
    ResolversTypes["verification_requests_aggregate"],
    ParentType,
    ContextType,
    Partial<Query_RootVerification_Requests_AggregateArgs>
  >;
  verification_requests_by_pk?: Resolver<
    Maybe<ResolversTypes["verification_requests"]>,
    ParentType,
    ContextType,
    RequireFields<Query_RootVerification_Requests_By_PkArgs, "id">
  >;
};

export type SessionsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions"] = ResolversParentTypes["sessions"]
> = {
  access_token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes["timestamptz"], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes["timestamptz"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["uuid"], ParentType, ContextType>;
  session_token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes["timestamptz"], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Sessions_AggregateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions_aggregate"] = ResolversParentTypes["sessions_aggregate"]
> = {
  aggregate?: Resolver<
    Maybe<ResolversTypes["sessions_aggregate_fields"]>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<Array<ResolversTypes["sessions"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Sessions_Aggregate_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions_aggregate_fields"] = ResolversParentTypes["sessions_aggregate_fields"]
> = {
  avg?: Resolver<
    Maybe<ResolversTypes["sessions_avg_fields"]>,
    ParentType,
    ContextType
  >;
  count?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    Partial<Sessions_Aggregate_FieldsCountArgs>
  >;
  max?: Resolver<
    Maybe<ResolversTypes["sessions_max_fields"]>,
    ParentType,
    ContextType
  >;
  min?: Resolver<
    Maybe<ResolversTypes["sessions_min_fields"]>,
    ParentType,
    ContextType
  >;
  stddev?: Resolver<
    Maybe<ResolversTypes["sessions_stddev_fields"]>,
    ParentType,
    ContextType
  >;
  stddev_pop?: Resolver<
    Maybe<ResolversTypes["sessions_stddev_pop_fields"]>,
    ParentType,
    ContextType
  >;
  stddev_samp?: Resolver<
    Maybe<ResolversTypes["sessions_stddev_samp_fields"]>,
    ParentType,
    ContextType
  >;
  sum?: Resolver<
    Maybe<ResolversTypes["sessions_sum_fields"]>,
    ParentType,
    ContextType
  >;
  var_pop?: Resolver<
    Maybe<ResolversTypes["sessions_var_pop_fields"]>,
    ParentType,
    ContextType
  >;
  var_samp?: Resolver<
    Maybe<ResolversTypes["sessions_var_samp_fields"]>,
    ParentType,
    ContextType
  >;
  variance?: Resolver<
    Maybe<ResolversTypes["sessions_variance_fields"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Sessions_Avg_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions_avg_fields"] = ResolversParentTypes["sessions_avg_fields"]
> = {
  user_id?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Sessions_Max_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions_max_fields"] = ResolversParentTypes["sessions_max_fields"]
> = {
  access_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  created_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  expires?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  session_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updated_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  user_id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Sessions_Min_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions_min_fields"] = ResolversParentTypes["sessions_min_fields"]
> = {
  access_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  created_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  expires?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  session_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updated_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  user_id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Sessions_Mutation_ResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions_mutation_response"] = ResolversParentTypes["sessions_mutation_response"]
> = {
  affected_rows?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  returning?: Resolver<
    Array<ResolversTypes["sessions"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Sessions_Stddev_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions_stddev_fields"] = ResolversParentTypes["sessions_stddev_fields"]
> = {
  user_id?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Sessions_Stddev_Pop_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions_stddev_pop_fields"] = ResolversParentTypes["sessions_stddev_pop_fields"]
> = {
  user_id?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Sessions_Stddev_Samp_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions_stddev_samp_fields"] = ResolversParentTypes["sessions_stddev_samp_fields"]
> = {
  user_id?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Sessions_Sum_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions_sum_fields"] = ResolversParentTypes["sessions_sum_fields"]
> = {
  user_id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Sessions_Var_Pop_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions_var_pop_fields"] = ResolversParentTypes["sessions_var_pop_fields"]
> = {
  user_id?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Sessions_Var_Samp_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions_var_samp_fields"] = ResolversParentTypes["sessions_var_samp_fields"]
> = {
  user_id?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Sessions_Variance_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["sessions_variance_fields"] = ResolversParentTypes["sessions_variance_fields"]
> = {
  user_id?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Subscription_RootResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["subscription_root"] = ResolversParentTypes["subscription_root"]
> = {
  accounts?: SubscriptionResolver<
    Array<ResolversTypes["accounts"]>,
    "accounts",
    ParentType,
    ContextType,
    Partial<Subscription_RootAccountsArgs>
  >;
  accounts_aggregate?: SubscriptionResolver<
    ResolversTypes["accounts_aggregate"],
    "accounts_aggregate",
    ParentType,
    ContextType,
    Partial<Subscription_RootAccounts_AggregateArgs>
  >;
  accounts_by_pk?: SubscriptionResolver<
    Maybe<ResolversTypes["accounts"]>,
    "accounts_by_pk",
    ParentType,
    ContextType,
    RequireFields<Subscription_RootAccounts_By_PkArgs, "id">
  >;
  impact?: SubscriptionResolver<
    Array<ResolversTypes["impact"]>,
    "impact",
    ParentType,
    ContextType,
    Partial<Subscription_RootImpactArgs>
  >;
  impact_aggregate?: SubscriptionResolver<
    ResolversTypes["impact_aggregate"],
    "impact_aggregate",
    ParentType,
    ContextType,
    Partial<Subscription_RootImpact_AggregateArgs>
  >;
  impact_by_pk?: SubscriptionResolver<
    Maybe<ResolversTypes["impact"]>,
    "impact_by_pk",
    ParentType,
    ContextType,
    RequireFields<Subscription_RootImpact_By_PkArgs, "id">
  >;
  orgs?: SubscriptionResolver<
    Array<ResolversTypes["orgs"]>,
    "orgs",
    ParentType,
    ContextType,
    Partial<Subscription_RootOrgsArgs>
  >;
  orgs_aggregate?: SubscriptionResolver<
    ResolversTypes["orgs_aggregate"],
    "orgs_aggregate",
    ParentType,
    ContextType,
    Partial<Subscription_RootOrgs_AggregateArgs>
  >;
  orgs_by_pk?: SubscriptionResolver<
    Maybe<ResolversTypes["orgs"]>,
    "orgs_by_pk",
    ParentType,
    ContextType,
    RequireFields<Subscription_RootOrgs_By_PkArgs, "id">
  >;
  sessions?: SubscriptionResolver<
    Array<ResolversTypes["sessions"]>,
    "sessions",
    ParentType,
    ContextType,
    Partial<Subscription_RootSessionsArgs>
  >;
  sessions_aggregate?: SubscriptionResolver<
    ResolversTypes["sessions_aggregate"],
    "sessions_aggregate",
    ParentType,
    ContextType,
    Partial<Subscription_RootSessions_AggregateArgs>
  >;
  sessions_by_pk?: SubscriptionResolver<
    Maybe<ResolversTypes["sessions"]>,
    "sessions_by_pk",
    ParentType,
    ContextType,
    RequireFields<Subscription_RootSessions_By_PkArgs, "id">
  >;
  users?: SubscriptionResolver<
    Array<ResolversTypes["users"]>,
    "users",
    ParentType,
    ContextType,
    Partial<Subscription_RootUsersArgs>
  >;
  users_aggregate?: SubscriptionResolver<
    ResolversTypes["users_aggregate"],
    "users_aggregate",
    ParentType,
    ContextType,
    Partial<Subscription_RootUsers_AggregateArgs>
  >;
  users_by_pk?: SubscriptionResolver<
    Maybe<ResolversTypes["users"]>,
    "users_by_pk",
    ParentType,
    ContextType,
    RequireFields<Subscription_RootUsers_By_PkArgs, "id">
  >;
  verification_requests?: SubscriptionResolver<
    Array<ResolversTypes["verification_requests"]>,
    "verification_requests",
    ParentType,
    ContextType,
    Partial<Subscription_RootVerification_RequestsArgs>
  >;
  verification_requests_aggregate?: SubscriptionResolver<
    ResolversTypes["verification_requests_aggregate"],
    "verification_requests_aggregate",
    ParentType,
    ContextType,
    Partial<Subscription_RootVerification_Requests_AggregateArgs>
  >;
  verification_requests_by_pk?: SubscriptionResolver<
    Maybe<ResolversTypes["verification_requests"]>,
    "verification_requests_by_pk",
    ParentType,
    ContextType,
    RequireFields<Subscription_RootVerification_Requests_By_PkArgs, "id">
  >;
};

export interface TimestamptzScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["timestamptz"], any> {
  name: "timestamptz";
}

export type UsersResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["users"] = ResolversParentTypes["users"]
> = {
  created_at?: Resolver<ResolversTypes["timestamptz"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email_verified?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["uuid"], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  is_admin?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  is_user_admin?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  orgs?: Resolver<
    Array<ResolversTypes["orgs"]>,
    ParentType,
    ContextType,
    Partial<UsersOrgsArgs>
  >;
  orgs_aggregate?: Resolver<
    ResolversTypes["orgs_aggregate"],
    ParentType,
    ContextType,
    Partial<UsersOrgs_AggregateArgs>
  >;
  updated_at?: Resolver<ResolversTypes["timestamptz"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_AggregateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["users_aggregate"] = ResolversParentTypes["users_aggregate"]
> = {
  aggregate?: Resolver<
    Maybe<ResolversTypes["users_aggregate_fields"]>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<Array<ResolversTypes["users"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Aggregate_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["users_aggregate_fields"] = ResolversParentTypes["users_aggregate_fields"]
> = {
  count?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    Partial<Users_Aggregate_FieldsCountArgs>
  >;
  max?: Resolver<
    Maybe<ResolversTypes["users_max_fields"]>,
    ParentType,
    ContextType
  >;
  min?: Resolver<
    Maybe<ResolversTypes["users_min_fields"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Max_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["users_max_fields"] = ResolversParentTypes["users_max_fields"]
> = {
  created_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  email_verified?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  is_admin?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updated_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Min_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["users_min_fields"] = ResolversParentTypes["users_min_fields"]
> = {
  created_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  email_verified?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  is_admin?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updated_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Mutation_ResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["users_mutation_response"] = ResolversParentTypes["users_mutation_response"]
> = {
  affected_rows?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes["users"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UuidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["uuid"], any> {
  name: "uuid";
}

export type Verification_RequestsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["verification_requests"] = ResolversParentTypes["verification_requests"]
> = {
  created_at?: Resolver<ResolversTypes["timestamptz"], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes["timestamptz"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["uuid"], ParentType, ContextType>;
  identifier?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes["timestamptz"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Verification_Requests_AggregateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["verification_requests_aggregate"] = ResolversParentTypes["verification_requests_aggregate"]
> = {
  aggregate?: Resolver<
    Maybe<ResolversTypes["verification_requests_aggregate_fields"]>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes["verification_requests"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Verification_Requests_Aggregate_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["verification_requests_aggregate_fields"] = ResolversParentTypes["verification_requests_aggregate_fields"]
> = {
  count?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    Partial<Verification_Requests_Aggregate_FieldsCountArgs>
  >;
  max?: Resolver<
    Maybe<ResolversTypes["verification_requests_max_fields"]>,
    ParentType,
    ContextType
  >;
  min?: Resolver<
    Maybe<ResolversTypes["verification_requests_min_fields"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Verification_Requests_Max_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["verification_requests_max_fields"] = ResolversParentTypes["verification_requests_max_fields"]
> = {
  created_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  expires?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  identifier?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  token?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updated_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Verification_Requests_Min_FieldsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["verification_requests_min_fields"] = ResolversParentTypes["verification_requests_min_fields"]
> = {
  created_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  expires?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes["uuid"]>, ParentType, ContextType>;
  identifier?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  token?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updated_at?: Resolver<
    Maybe<ResolversTypes["timestamptz"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Verification_Requests_Mutation_ResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["verification_requests_mutation_response"] = ResolversParentTypes["verification_requests_mutation_response"]
> = {
  affected_rows?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  returning?: Resolver<
    Array<ResolversTypes["verification_requests"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  accounts?: AccountsResolvers<ContextType>;
  accounts_aggregate?: Accounts_AggregateResolvers<ContextType>;
  accounts_aggregate_fields?: Accounts_Aggregate_FieldsResolvers<ContextType>;
  accounts_max_fields?: Accounts_Max_FieldsResolvers<ContextType>;
  accounts_min_fields?: Accounts_Min_FieldsResolvers<ContextType>;
  accounts_mutation_response?: Accounts_Mutation_ResponseResolvers<ContextType>;
  impact?: ImpactResolvers<ContextType>;
  impact_aggregate?: Impact_AggregateResolvers<ContextType>;
  impact_aggregate_fields?: Impact_Aggregate_FieldsResolvers<ContextType>;
  impact_avg_fields?: Impact_Avg_FieldsResolvers<ContextType>;
  impact_max_fields?: Impact_Max_FieldsResolvers<ContextType>;
  impact_min_fields?: Impact_Min_FieldsResolvers<ContextType>;
  impact_mutation_response?: Impact_Mutation_ResponseResolvers<ContextType>;
  impact_stddev_fields?: Impact_Stddev_FieldsResolvers<ContextType>;
  impact_stddev_pop_fields?: Impact_Stddev_Pop_FieldsResolvers<ContextType>;
  impact_stddev_samp_fields?: Impact_Stddev_Samp_FieldsResolvers<ContextType>;
  impact_sum_fields?: Impact_Sum_FieldsResolvers<ContextType>;
  impact_var_pop_fields?: Impact_Var_Pop_FieldsResolvers<ContextType>;
  impact_var_samp_fields?: Impact_Var_Samp_FieldsResolvers<ContextType>;
  impact_variance_fields?: Impact_Variance_FieldsResolvers<ContextType>;
  mutation_root?: Mutation_RootResolvers<ContextType>;
  numeric?: GraphQLScalarType;
  orgs?: OrgsResolvers<ContextType>;
  orgs_aggregate?: Orgs_AggregateResolvers<ContextType>;
  orgs_aggregate_fields?: Orgs_Aggregate_FieldsResolvers<ContextType>;
  orgs_max_fields?: Orgs_Max_FieldsResolvers<ContextType>;
  orgs_min_fields?: Orgs_Min_FieldsResolvers<ContextType>;
  orgs_mutation_response?: Orgs_Mutation_ResponseResolvers<ContextType>;
  query_root?: Query_RootResolvers<ContextType>;
  sessions?: SessionsResolvers<ContextType>;
  sessions_aggregate?: Sessions_AggregateResolvers<ContextType>;
  sessions_aggregate_fields?: Sessions_Aggregate_FieldsResolvers<ContextType>;
  sessions_avg_fields?: Sessions_Avg_FieldsResolvers<ContextType>;
  sessions_max_fields?: Sessions_Max_FieldsResolvers<ContextType>;
  sessions_min_fields?: Sessions_Min_FieldsResolvers<ContextType>;
  sessions_mutation_response?: Sessions_Mutation_ResponseResolvers<ContextType>;
  sessions_stddev_fields?: Sessions_Stddev_FieldsResolvers<ContextType>;
  sessions_stddev_pop_fields?: Sessions_Stddev_Pop_FieldsResolvers<ContextType>;
  sessions_stddev_samp_fields?: Sessions_Stddev_Samp_FieldsResolvers<ContextType>;
  sessions_sum_fields?: Sessions_Sum_FieldsResolvers<ContextType>;
  sessions_var_pop_fields?: Sessions_Var_Pop_FieldsResolvers<ContextType>;
  sessions_var_samp_fields?: Sessions_Var_Samp_FieldsResolvers<ContextType>;
  sessions_variance_fields?: Sessions_Variance_FieldsResolvers<ContextType>;
  subscription_root?: Subscription_RootResolvers<ContextType>;
  timestamptz?: GraphQLScalarType;
  users?: UsersResolvers<ContextType>;
  users_aggregate?: Users_AggregateResolvers<ContextType>;
  users_aggregate_fields?: Users_Aggregate_FieldsResolvers<ContextType>;
  users_max_fields?: Users_Max_FieldsResolvers<ContextType>;
  users_min_fields?: Users_Min_FieldsResolvers<ContextType>;
  users_mutation_response?: Users_Mutation_ResponseResolvers<ContextType>;
  uuid?: GraphQLScalarType;
  verification_requests?: Verification_RequestsResolvers<ContextType>;
  verification_requests_aggregate?: Verification_Requests_AggregateResolvers<ContextType>;
  verification_requests_aggregate_fields?: Verification_Requests_Aggregate_FieldsResolvers<ContextType>;
  verification_requests_max_fields?: Verification_Requests_Max_FieldsResolvers<ContextType>;
  verification_requests_min_fields?: Verification_Requests_Min_FieldsResolvers<ContextType>;
  verification_requests_mutation_response?: Verification_Requests_Mutation_ResponseResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  cached?: CachedDirectiveResolver<any, any, ContextType>;
};
