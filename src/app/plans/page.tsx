
import type { Metadata } from 'next';
import PlanSelectionSection from '@/components/droppurity/PlanSelectionSection';

export const metadata: Metadata = {
  title: 'Our Plans',
  description: 'Explore Droppurity\'s flexible and affordable rental plans for smart RO water purifiers. Find the perfect plan for your home or business.',
  alternates: {
    canonical: '/plans',
  },
};

export default function DroppurityPlansPage() {
  return (
    <div className="min-h-screen"> 
      {/* PlanSelectionSection will manage its own sticky positioning at top:0 */}
      <PlanSelectionSection />
    </div>
  );
}
