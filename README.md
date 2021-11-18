# CYFBot

A Slackbot for tracking student data.

## How to use CYFBot

CYF bot allows mentors to update student information and review cohort progress.

#### Update Student Information

Send a DM To CYFBot with the @student_name.

#### Review cohort progress

Send a DM To CYFBot with the #cohort_channel_name.

## Dev Quickstart

Message Dom Vinyard on CYF Slack and I can help you get set up with env variables etc.

1. Clone the repository:

```bash
git clone git@github.com:DomVinyard/TeacherBot.git
```

2. Install dependencies:

```bash
yarn install
```

3. Add .env file:

```
# CYFBot Config
ACCESS_CHANNEL_ID="Cxxxxxxxxxx"

# Slack API
SLACK_SIGNING_SECRET="xxxxxxxxxxxxxxxxxxxxxxxx"
SLACK_BOT_TOKEN="xoxb-xxxxxx-xxxxxx-xxxxxxxxxxxx"
SLACK_APP_TOKEN="xapp-1-xxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx"
SLACK_USER_TOKEN="xoxp-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxx"

# Hasura Database
HASURA_URI="https://xxxxxx.hasura.app/v1/graphql"
HASURA_ADMIN_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Google Sheets
SHEETS_CLIENT_EMAIL="xxxxxx@xxxxxx.iam.gserviceaccount.com"
SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=\n-----END PRIVATE KEY-----\n"
```

4. Run development server:

```bash
yarn dev
```
