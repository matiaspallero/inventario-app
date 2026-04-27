'use client';

import { TrendingUp, DollarSign, Boxes, AlertTriangle } from 'lucide-react';

export default function InventoryInsights({ items }) {
  const formatPrice = (price) => {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  // Estadísticas
  const totalInventoryValue = items.reduce((sum, item) => sum + item.price * item.stock, 0);
  const averageStock = Math.round(items.reduce((sum, item) => sum + item.stock, 0) / items.length);
  const totalItemsInStock = items.reduce((sum, item) => sum + item.stock, 0);
  const criticalCount = items.filter((item) => item.status === 'OUT_OF_STOCK' || item.status === 'LOW_STOCK').length;

  const insights = [
    {
      title: 'Valor Total del Inventario',
      value: formatPrice(totalInventoryValue),
      icon: DollarSign,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Stock Total',
      value: totalItemsInStock.toLocaleString(),
      subtext: `${items.length} productos`,
      icon: Boxes,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Stock Promedio',
      value: averageStock,
      subtext: 'por producto',
      icon: TrendingUp,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Productos en Alerta',
      value: criticalCount,
      subtext: 'requieren atención',
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {insights.map((insight, index) => {
        const Icon = insight.icon;
        return (
          <div
            key={index}
            className={`${insight.bgColor} rounded-xl p-6 border border-gray-200 shadow-sm`}
          >
            <div className="flex items-start justify-between mb-4">
              <Icon className={`${insight.textColor}`} size={28} />
              {index === 3 && criticalCount > 0 && (
                <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                  ⚠️ Crítico
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">{insight.title}</p>
            <p className={`text-2xl font-bold ${insight.textColor}`}>{insight.value}</p>
            {insight.subtext && <p className="text-xs text-gray-500 mt-2">{insight.subtext}</p>}
          </div>
        );
      })}
    </div>
  );
}
