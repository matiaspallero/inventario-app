'use client';

import { AlertCircle, TrendingDown } from 'lucide-react';

export default function StockAlert({ items }) {
  const outOfStock = items.filter((item) => item.status === 'OUT_OF_STOCK');
  const lowStock = items.filter((item) => item.status === 'LOW_STOCK');

  if (outOfStock.length === 0 && lowStock.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Banner OUT OF STOCK */}
      {outOfStock.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
          <div className="flex gap-3">
            <AlertCircle className="text-red-600 shrink-0" size={24} />
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-2">
                ⚠️ {outOfStock.length} Producto{outOfStock.length !== 1 ? 's' : ''} Sin Stock
              </h3>
              <div className="space-y-1">
                {outOfStock.map((item) => (
                  <p key={item.id} className="text-sm text-red-800">
                    • <span className="font-semibold">{item.name}</span> ({item.sku})
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Banner LOW STOCK */}
      {lowStock.length > 0 && (
        <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded-lg">
          <div className="flex gap-3">
            <TrendingDown className="text-orange-600 shrink-0" size={24} />
            <div className="flex-1">
              <h3 className="font-bold text-orange-900 mb-2">
                📉 {lowStock.length} Producto{lowStock.length !== 1 ? 's' : ''} con Stock Bajo
              </h3>
              <div className="space-y-1">
                {lowStock.map((item) => (
                  <p key={item.id} className="text-sm text-orange-800">
                    • <span className="font-semibold">{item.name}</span> - Stock: {item.stock} unidades
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
