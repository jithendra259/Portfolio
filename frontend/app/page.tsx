import { headers } from 'next/headers';
import { App } from '@/components/voice-agent/app';
import { CONFIG_ENDPOINT, getAppConfig } from '@/lib/utils';
import { APP_CONFIG_DEFAULTS } from '@/app-config';

export default async function Page() {
  const appConfig = CONFIG_ENDPOINT ? await getAppConfig(await headers()) : APP_CONFIG_DEFAULTS;

  return <App appConfig={appConfig} />;
}
