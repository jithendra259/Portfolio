import { App } from '@/components/voice-agent/app';
import { APP_CONFIG_DEFAULTS } from '@/app-config';

// Aggressively cache the homepage statically
export const dynamic = 'force-static';
export const revalidate = false;

export default function Page() {
  return <App appConfig={APP_CONFIG_DEFAULTS} />;
}
