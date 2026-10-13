import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/platform/dashboard';
import { meta } from '@/lib/platform/data';
export const Route = createFileRoute('/water')({
 head: () => meta('water'),
 component: Page,
});
function Page() { return <Dashboard area="water"/>; }
