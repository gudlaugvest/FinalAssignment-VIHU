import { datadogRum } from '@datadog/browser-rum';
import { reactPlugin } from '@datadog/browser-rum-react';

datadogRum.init({
    applicationId: '989f983d-f936-4be0-93a0-51ab58de4780',
    clientToken: 'pubef38c55f19f3f9b29c0e7b6a070ab2ad',
    site: 'us5.datadoghq.com',
    service:'tictactoe',
    env: 'staging',
    
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate:  100,
    sessionReplaySampleRate: 20,
    defaultPrivacyLevel: 'mask-user-input',
    plugins: [reactPlugin({ router: true })],
});