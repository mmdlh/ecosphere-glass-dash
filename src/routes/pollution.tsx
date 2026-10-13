import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/platform/dashboard';
import { meta } from '@/lib/platform/data';
export const Route = createFileRoute('/pollution')({
 head: () => meta('pollution'),
 component: Page,
});
function Page() { return <Dashboard area="pollution"/>; }
