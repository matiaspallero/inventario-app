'use client';

import { Trash2, Plus, Minus } from 'lucide-react';

const formatPrice = (price) => {
  return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export default function SalesCart({ cart, onUpdateQuantity, onRemove, total, onCheckout }) {
  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <p className="text-gray-400 mb-4">El carrito está vacío</p>
        <p className="text-sm text-gray-500">Selecciona productos para comenzar una venta</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-50 to-blue-100 border-b border-gray-200 p-4">
        <h2 className="text-lg font-bold text-gray-900">Carrito de Ventas</h2>
        <p className="text-sm text-gray-600 mt-1">
          {cart.length} producto{cart.length !== 1 ? 's' : ''} - {cart.reduce((sum, item) => sum + item.quantity, 0)} unidades
        </p>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600 font-mono">{item.sku}</p>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                title="Eliminar del carrito"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-1 bg-gray-200 cursor-pointer text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                  className="w-12 text-center border border-gray-300 rounded py-1 text-sm font-semibold"
                  min="1"
                />
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-1 bg-gray-200 cursor-pointer text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{formatPrice(item.price)} c/u</p>
                <p className="font-bold text-gray-900">{formatPrice(item.subtotal)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total y Checkout */}
      <div className="border-t border-gray-200 p-4 space-y-4 bg-gray-50">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold text-gray-900">{formatPrice(total)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-blue-600">{formatPrice(total)}</span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          className="w-full cursor-pointer bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-bold text-lg"
        >
          Procesar Venta
        </button>
      </div>
    </div>
  );
}
