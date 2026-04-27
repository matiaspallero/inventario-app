import KpiCard from '@/components/ui/KpiCard';
import { Package, AlertTriangle, XOctagon } from 'lucide-react';

export default function KpisGrid({ totalProducts, lowStockCount, outOfStockCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KpiCard
        title="Total Productos"
        value={totalProducts}
        icon={Package}
        colorClass="bg-blue-50 text-blue-600"
      />
      <KpiCard
        title="Stock Bajo"
        value={lowStockCount}
        icon={AlertTriangle}
        colorClass="bg-amber-50 text-amber-600"
      />
      <KpiCard
        title="Sin Stock"
        value={outOfStockCount}
        icon={XOctagon}
        colorClass="bg-red-50 text-red-600"
      />
    </div>
  );
}
