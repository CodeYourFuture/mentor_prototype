# Mentor

A platform for tracking trainee data.

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
ACCESS_CHANNEL_NAME="general"

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

## Talk-to-Bot

The talk-to-bot service allows mentors to update trainee information and review cohort progress.

#### Update Trainee Information

Send a DM To CYFBot with the @trainee_name.

#### Review cohort progress

Send a DM To CYFBot with the #cohort_channel_name.
test
