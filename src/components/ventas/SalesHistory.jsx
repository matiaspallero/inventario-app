'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const formatPrice = (price) => {
  return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export default function SalesHistory({ sales }) {
  const [expandedSale, setExpandedSale] = useState(null);

  if (sales.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <p className="text-gray-400">Sin ventas aún hoy</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {sales.map((sale) => (
        <div key={sale.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Header */}
          <button
            onClick={() =>
              setExpandedSale(expandedSale === sale.id ? null : sale.id)
            }
            className="w-full p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-left flex-1">
              <p className="font-semibold text-gray-900">{sale.id}</p>
              <p className="text-sm text-gray-600">{sale.date}</p>
            </div>
            <div className="text-right mr-4">
              <p className="font-bold text-green-600">{formatPrice(sale.total)}</p>
              <p className="text-sm text-gray-600">{sale.itemsCount} unidades</p>
            </div>
            {expandedSale === sale.id ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </button>

          {/* Detalle */}
          {expandedSale === sale.id && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="space-y-2">
                {sale.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-700">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(item.subtotal)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-300 mt-3 pt-3 flex justify-between">
                <span className="font-bold text-gray-900">Total:</span>
                <span className="font-bold text-green-600">
                  {formatPrice(sale.total)}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
