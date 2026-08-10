import Navbar from '@/components/Navbar';
import ReportsDashboard from '@/components/ReportsDashboard';

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans pb-20">
      <Navbar />
      <div className="pt-6">
        <ReportsDashboard />
      </div>
    </main>
  );
}