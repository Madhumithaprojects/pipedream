import common from "../common/base.mjs";

export default {
  ...common,
  key: "slack-new-mention",
  name: "New Mention (Instant)",
  version: "1.0.2",
  description: "Emit new event when a username or specific keyword is mentioned in a channel",
  type: "source",
  dedupe: "unique",
  props: {
    ...common.props,
    conversations: {
      propDefinition: [
        common.props.slack,
        "conversation",
      ],
      type: "string[]",
      label: "Channels",
      description: "Select one or more channels to monitor for new messages.",
      optional: true,
    },
    // eslint-disable-next-line pipedream/props-description,pipedream/props-label
    slackApphook: {
      type: "$.interface.apphook",
      appProp: "slack",
      async eventNames() {
        return this.conversations || [
          "message",
        ];
      },
    },
    keyword: {
      propDefinition: [
        common.props.slack,
        "keyword",
      ],
    },
    isUsername: {
      propDefinition: [
        common.props.slack,
        "isUsername",
      ],
    },
    ignoreBot: {
      propDefinition: [
        common.props.slack,
        "ignoreBot",
      ],
    },
  },
  methods: {
    ...common.methods,
    getSummary() {
      return "New mention received";
    },
    async processEvent(event) {
      if (event.type !== "message") {
        console.log(`Ignoring event with unexpected type "${event.type}"`);
        return;
      }
      if (event.subtype != null && event.subtype != "bot_message" && event.subtype != "file_share") {
      // This source is designed to just emit an event for each new message received.
      // Due to inconsistencies with the shape of message_changed and message_deleted
      // events, we are ignoring them for now. If you want to handle these types of
      // events, feel free to change this code!!
        console.log("Ignoring message with subtype.");
        return;
      }
      if ((this.ignoreBot) && (event.subtype == "bot_message" || event.bot_id)) {
        return;
      }
      let emitEvent = false;
      const elements = event.blocks[0]?.elements[0]?.elements;

      if (this.isUsername && elements) {
        for (const item of elements) {
          if (item.user_id) {
            const username = await this.getUserName(item.user_id);
            if (username === this.word) {
              emitEvent = true;
              break;
            }
          }
        }

      } else if (event.text.indexOf(this.word) !== -1) {
        emitEvent = true;
      }
      if (emitEvent) {
        return event;
      }
    },
  },
};
