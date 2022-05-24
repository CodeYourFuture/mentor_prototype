# Mentor (for Slack)

<img width="1138" alt="image" src="https://user-images.githubusercontent.com/1271197/169831301-bd14075c-09dd-416c-beaa-2ffa12a4fc51.png">

## Quickstart

.env
Docker

---

## Microservices

Mentor is composed of four packages.

### packages/report

A NextJS static site. Generates three reports.

1. Per-trainee report
2. Per-cohort report
3. Per-organisation report

Also generates a log of all mentor updates and the ability to download this feed as csv. This is protected by login with slack

### packages/chatbot

Long running process that's always listening. It uses the @slack/bolt library to interface with Slack.

When a mentor types a DM to the bot it:

1. Interprets the message
2. Requests information about a trainee
3. Saves that information to the database
4. Updates the report

Has a cron job running that posts an update to the admin channel once per week.

### packages/integrations

Runs on a cron, node worker.

### packages/api

hasura

---

## Deployment

Each service has its own github action
