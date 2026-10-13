import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/platform/dashboard';
import { meta } from '@/lib/platform/data';
export const Route = createFileRoute('/air')({
 head: () => meta('air'),
 component: Page,
});
function Page() { return <Dashboard area="air"/>; }
