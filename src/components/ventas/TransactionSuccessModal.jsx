'use client';

import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

const formatPrice = (price) => {
  return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export default function TransactionSuccessModal({ isOpen, sale, onClose }) {
  // Auto-cerrar después de 15 segundos
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 15000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !sale) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header Verde */}
        <div className="bg-linear-to-r from-green-600 to-green-700 p-8 text-center">
          <CheckCircle size={64} className="text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white">¡VENTA REALIZADA!</h2>
        </div>

        {/* Detalles */}
        <div className="p-6 space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Código de venta</p>
            <p className="text-lg font-mono font-bold text-gray-900">{sale.id}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Resumen de venta</p>
            <div className="space-y-1 mb-3 border-b-2 border-gray-200 pb-3">
              {sale.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.quantity}x {item.name}</span>
                  <span className="font-semibold">{formatPrice(item.subtotal)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-green-600">{formatPrice(sale.total)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center">{sale.date}</p>

          <button
            onClick={onClose}
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors mt-4"
          >
            Nueva Venta
          </button>
        </div>

        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
