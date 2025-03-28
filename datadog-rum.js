import { datadogRum } from '@datadog/browser-rum';
import { reactPlugin } from '@datadog/browser-rum-react';

datadogRum.init({
    applicationId: '09851315-8157-4a00-ab3b-23207296061d',
    clientToken: 'pub573f8c19ef3b5cf0952f1215877534ae',
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