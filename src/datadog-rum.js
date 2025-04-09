import { datadogRum } from "@datadog/browser-rum";

datadogRum.init({
  applicationId: "4c9d7e40-036a-4d64-b368-6922d0c731af",
  clientToken: "pub3df1c08cb872d97a11fe631e7cffe8fb",
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: "us5.datadoghq.com",
  service: "tictactoe",
  env: "staging",
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  defaultPrivacyLevel: "mask-user-input",
});
