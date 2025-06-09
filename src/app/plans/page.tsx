
import PlanSelectionSection from '@/components/droppurity/PlanSelectionSection';

export default function DroppurityPlansPage() {
  return (
    <div className="min-h-screen"> 
      {/* PlanSelectionSection will manage its own sticky positioning at top:0 */}
      <PlanSelectionSection />
    </div>
  );
}
