import Navbar from '@/components/Navbar';
import WorkforceDashboard from '@/components/WorkforceDashboard';

export default function WorkforcePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans pb-20">
      <Navbar />
      <div className="pt-6">
        <WorkforceDashboard />
      </div>
    </main>
  );
}