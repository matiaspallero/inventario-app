'use client';

import KpisGrid from '@/components/dashboard/KpisGrid';
import InventoryInsights from '@/components/dashboard/InventoryInsights';
import CriticalProducts from '@/components/dashboard/CriticalProducts';
import StockRotation from '@/components/dashboard/StockRotation';
import { useInventory } from '@/hooks/useInventory';

export default function DashboardPage() {
  const { allItems, stats } = useInventory();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Resumen de tu inventario y ventas</p>
      </div>

      {/* KPIs Principales */}
      <KpisGrid
        totalProducts={stats.totalProducts}
        lowStockCount={stats.lowStockCount}
        outOfStockCount={stats.outOfStockCount}
      />

      {/* Insights Avanzados */}
      <InventoryInsights items={allItems} />

      {/* Layout 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Productos Críticos (2 columnas) */}
        <div className="lg:col-span-2">
          <CriticalProducts items={allItems} />
        </div>

        {/* Resumen rápido (1 columna) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Estado del Inventario</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-700">En Stock</span>
              <span className="font-bold text-green-600">
                {allItems.filter((i) => i.status === 'IN_STOCK').length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm text-gray-700">Stock Bajo</span>
              <span className="font-bold text-orange-600">
                {allItems.filter((i) => i.status === 'LOW_STOCK').length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-sm text-gray-700">Sin Stock</span>
              <span className="font-bold text-red-600">
                {allItems.filter((i) => i.status === 'OUT_OF_STOCK').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rotación por Categoría */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Análisis por Categoría</h2>
        <StockRotation items={allItems} />
      </div>
    </div>
  );
}