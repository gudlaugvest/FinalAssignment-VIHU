import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '53077e16-c39c-4fbe-84e2-d99d99cc1f5e',
    clientToken: 'pub982633346dd3588d6ebfb3f49ac1b189',
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'us5.datadoghq.com',
    service: 'tictactoe',
    env: 'staging',
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    defaultPrivacyLevel: 'mask-user-input',
});