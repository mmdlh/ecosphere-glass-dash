import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/platform/dashboard';
import { meta } from '@/lib/platform/data';
export const Route = createFileRoute('/ecology')({
 head: () => meta('ecology'),
 component: Page,
});
function Page() { return <Dashboard area="ecology"/>; }
