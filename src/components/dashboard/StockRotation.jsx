'use client';

export default function StockRotation({ items }) {
  const categories = [...new Set(items.map((item) => item.category))];

  const getCategoryStats = (category) => {
    const categoryItems = items.filter((item) => item.category === category);
    const totalValue = categoryItems.reduce((sum, item) => sum + item.price * item.stock, 0);
    const totalStock = categoryItems.reduce((sum, item) => sum + item.stock, 0);
    const outOfStock = categoryItems.filter((item) => item.status === 'OUT_OF_STOCK').length;

    return {
      name: category,
      items: categoryItems.length,
      totalValue,
      totalStock,
      outOfStock,
    };
  };

  const categoryStats = categories.map((cat) => getCategoryStats(cat));
  const maxValue = Math.max(...categoryStats.map((s) => s.totalValue), 1);

  const formatPrice = (price) => {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  return (
    <div className="space-y-4">
      {categoryStats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900">{stat.name}</h3>
            <span className="text-sm text-gray-600">{stat.items} productos</span>
          </div>

          {/* Barra de progreso por valor */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">Valor en Stock</span>
              <span className="text-sm font-semibold text-blue-600">
                {formatPrice(stat.totalValue)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${(stat.totalValue / maxValue) * 100}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-50 rounded p-2">
              <p className="text-sm text-gray-600">Stock Total</p>
              <p className="font-bold text-gray-900">{stat.totalStock}</p>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <p className="text-sm text-gray-600">Sin Stock</p>
              <p className={`font-bold ${stat.outOfStock > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {stat.outOfStock}
              </p>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <p className="text-sm text-gray-600">Promedio</p>
              <p className="font-bold text-gray-900">
                {Math.round(stat.totalStock / stat.items)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
