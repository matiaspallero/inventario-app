'use client';

import { Trash2, Plus, Minus } from 'lucide-react';

const formatPrice = (price) => {
  return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export default function POSCart({ cart, onUpdateQuantity, onRemove, total, onCheckout }) {
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="bg-linear-to-b from-gray-100 to-gray-50 rounded-xl border-2 border-gray-300 p-6 flex flex-col items-center justify-center h-full">
        <div className="text-gray-400 text-center">
          <p className="text-6xl mb-4">🛒</p>
          <p className="text-xl font-semibold">Carrito vacío</p>
          <p className="text-sm mt-2">Selecciona productos para comenzar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="bg-linear-to-r from-green-600 to-green-700 border-b-4 border-green-800 p-4">
        <h2 className="text-2xl font-bold text-white">CARRITO</h2>
        <p className="text-green-50 text-sm">{itemsCount} artículos</p>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors">
            {/* Producto */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <p className="font-bold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-600">{item.sku}</p>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="p-1 cursor-pointer text-red-600 hover:bg-red-50 rounded transition-colors shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Cantidad y precio */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-1 cursor-pointer bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-bold">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-1 cursor-pointer bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-600">{formatPrice(item.price)} c/u</p>
                <p className="font-bold text-gray-900">{formatPrice(item.subtotal)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t-2 border-gray-200 bg-linear-to-r from-blue-50 to-blue-100 p-6 space-y-4">
        {/* Desglose */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Subtotal:</span>
            <span className="font-semibold text-gray-900">{formatPrice(total)}</span>
          </div>
        </div>

        {/* TOTAL GIGANTE */}
        <div className="bg-linear-to-r from-green-600 to-green-700 rounded-lg p-4 text-center">
          <p className="text-xs text-green-100 mb-1">TOTAL A PAGAR</p>
          <p className="text-4xl font-bold text-white">
            {formatPrice(total)}
          </p>
        </div>

        {/* Botón de checkout */}
        <button
          onClick={onCheckout}
          className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-xl transition-colors transform hover:scale-105 active:scale-95 shadow-lg"
        >
          ✓ COBRAR
        </button>
      </div>
    </div>
  );
}
