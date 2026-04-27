'use client';

import Badge from '@/components/ui/Badge';
import { AlertCircle } from 'lucide-react';

export default function CriticalProducts({ items }) {
  const criticalItems = items
    .filter((item) => item.status === 'OUT_OF_STOCK' || item.status === 'LOW_STOCK')
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  if (criticalItems.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <p className="text-gray-400">✓ Todo el inventario está en buen estado</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-linear-to-r from-orange-50 to-orange-100 border-b border-orange-200 p-4 flex items-center gap-3">
        <AlertCircle className="text-orange-600" size={24} />
        <h3 className="font-bold text-orange-900">
          Top {criticalItems.length} Productos Críticos
        </h3>
      </div>

      <div className="divide-y divide-gray-100">
        {criticalItems.map((item) => (
          <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600 font-mono">{item.sku}</p>
              </div>
              <Badge status={item.status} />
            </div>

            <div className="flex justify-between items-center mt-3">
              <div>
                <p className="text-xs text-gray-600">Stock Actual</p>
                <p className="text-lg font-bold text-red-600">{item.stock} unidades</p>
              </div>

              {item.status === 'LOW_STOCK' && (
                <div className="text-right">
                  <p className="text-xs text-gray-600">Reorden sugerido</p>
                  <p className="text-sm font-semibold text-orange-600">
                    +{Math.max(10 - item.stock, 5)} unidades
                  </p>
                </div>
              )}

              {item.status === 'OUT_OF_STOCK' && (
                <div className="text-right">
                  <p className="text-xs text-gray-600">Acción inmediata</p>
                  <p className="text-sm font-bold text-red-600">Reabastecer</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
