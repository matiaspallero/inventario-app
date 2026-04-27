'use client';

import { useState } from 'react';
import Badge from '@/components/ui/Badge';
import { Plus, Search } from 'lucide-react';

const formatPrice = (price) => {
  return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export default function SalesForm({ items, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    onAddToCart(product, selectedQuantity);
    setSelectedQuantity(1);
  };

  return (
    <div className="space-y-4">
      {/* Búsqueda */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar producto por nombre o SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <input
            type="number"
            min="1"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(Math.max(1, parseInt(e.target.value, 10)))}
            className="w-20 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-center font-semibold"
            placeholder="Cantidad"
          />
        </div>
        <p className="text-sm text-gray-600">
          {filteredItems.length} producto{filteredItems.length !== 1 ? 's' : ''} disponible
          {filteredItems.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Lista de productos */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
            <p className="text-gray-400">No se encontraron productos</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600 font-mono">{item.sku}</p>
                </div>
                <Badge status={item.status} />
              </div>

              <div className="flex justify-between items-center mt-3">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Stock: <span className="font-semibold text-gray-900">{item.stock}</span>
                  </p>
                  <p className="text-lg font-bold text-blue-600">{formatPrice(item.price)}</p>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={item.stock === 0}
                  className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    item.stock === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Plus size={18} />
                  Agregar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
