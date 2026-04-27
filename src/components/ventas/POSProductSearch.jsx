'use client';

import { Search, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export default function POSProductSearch({ items, onAddToCart, searchTerm, onSearchChange }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    onAddToCart(product, selectedQuantity);
    setSelectedQuantity(1);
    onSearchChange('');
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Búsqueda prominente */}
      <div className="bg-blue-200 rounded-xl p-6 shadow-lg">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-4 text-blue-200" size={24} />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            autoFocus
            className="w-full pl-12 pr-4 py-4 text-lg border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Grid de productos */}
      <div className="flex-1 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-400">
            <p className="text-lg">Sin resultados</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleAddToCart(item)}
                disabled={item.stock === 0}
                className={`p-4 rounded-lg border-2 text-left transition-all transform ${
                  item.stock === 0
                    ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-50'
                    : 'bg-white border-blue-300 hover:border-blue-600 hover:shadow-lg'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600 font-mono">{item.sku}</p>
                  </div>
                  {item.stock === 0 && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">SIN STOCK</span>}
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-600">Stock: {item.stock}</p>
                    <p className="text-lg font-bold text-blue-600">
                      ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </p>
                  </div>
                  {item.stock > 0 && <span className="text-2xl">+</span>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
