# TeacherBot

A bot to help teachers teach.

## Getting starterd

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
# These all come from Slack Apps Dashboard
SLACK_SIGNING_SECRET="<string>"
SLACK_BOT_TOKEN="<string>"
SLACK_APP_TOKEN="<string>"
SLACK_USER_TOKEN="<string>"

# These come from Hasura (Database wrapper)
HASURA_URI="<string>"
HASURA_ADMIN_SECRET="<string>"
```

4. Run development server:

```bash
yarn dev
```
