import Navbar from '@/components/Navbar';
import EquipmentDashboard from '@/components/EquipmentDashboard';

export default function EquipmentPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans pb-20">
      <Navbar />
      <div className="pt-6">
        <EquipmentDashboard />
      </div>
    </main>
  );
}