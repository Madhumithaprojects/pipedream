import common from "../common/send-message.mjs";

export default {
  ...common,
  key: "slack-send-group-message",
  name: "Send Group Message",
  description: "Send a direct message to a group of users. See [postMessage](https://api.slack.com/methods/chat.postMessage) or [scheduleMessage](https://api.slack.com/methods/chat.scheduleMessage) docs here",
  version: "0.2.8",
  type: "action",
  props: {
    ...common.props,
    conversation: {
      propDefinition: [
        common.props.slack,
        "group",
      ],
    },
    text: {
      propDefinition: [
        common.props.slack,
        "text",
      ],
    },
    mrkdwn: {
      propDefinition: [
        common.props.slack,
        "mrkdwn",
      ],
    },
    username: {
      propDefinition: [
        common.props.slack,
        "username",
      ],
      description: "Optionally customize your bot's username (default is `Pipedream`).",
    },
    icon_emoji: {
      propDefinition: [
        common.props.slack,
        "icon_emoji",
      ],
      description: "Optionally use an emoji as the bot icon for this message (e.g., `:fire:`). This value overrides `icon_url` if both are provided.",
    },
    icon_url: {
      propDefinition: [
        common.props.slack,
        "icon_url",
      ],
      description: "Optionally provide an image URL to use as the bot icon for this message.",
    },
  },
};
