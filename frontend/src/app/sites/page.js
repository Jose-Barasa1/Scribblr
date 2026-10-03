import Navbar from '@/components/Navbar';
import SitesDashboard from '@/components/SitesDashboard';

export default function SitesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans pb-20">
      <Navbar />
      <div className="pt-6">
        <SitesDashboard />
      </div>
    </main>
  );
}