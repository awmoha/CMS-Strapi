module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "memo1daraa@outlook.com",
        defaultReplyTo: "memo1daraa@outlook.com",
      },
    },
  },
});

