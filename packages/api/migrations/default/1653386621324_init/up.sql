SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.integrations (
    team text NOT NULL,
    student text NOT NULL,
    key text NOT NULL,
    value text NOT NULL,
    uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.integrations_config (
    team text NOT NULL,
    integration text NOT NULL,
    value text NOT NULL,
    uuid uuid DEFAULT gen_random_uuid() NOT NULL
);
CREATE TABLE public.schema (
    uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    key text NOT NULL,
    label text NOT NULL,
    area text NOT NULL,
    type text NOT NULL,
    description text NOT NULL,
    default_value text,
    integration boolean NOT NULL
);
CREATE TABLE public.updates (
    team text NOT NULL,
    student text NOT NULL,
    key text NOT NULL,
    value text NOT NULL,
    uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    reporter text NOT NULL
);
ALTER TABLE ONLY public.integrations_config
    ADD CONSTRAINT integrations_config_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.integrations_config
    ADD CONSTRAINT integrations_config_team_integration_key UNIQUE (team, integration);
ALTER TABLE ONLY public.integrations
    ADD CONSTRAINT integrations_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.integrations
    ADD CONSTRAINT integrations_team_student_key_key UNIQUE (team, student, key);
ALTER TABLE ONLY public.schema
    ADD CONSTRAINT schema_key_key UNIQUE (key);
ALTER TABLE ONLY public.schema
    ADD CONSTRAINT schema_label_key UNIQUE (label);
ALTER TABLE ONLY public.schema
    ADD CONSTRAINT schema_pkey PRIMARY KEY (key);
ALTER TABLE ONLY public.updates
    ADD CONSTRAINT updates_pkey PRIMARY KEY (uuid);
