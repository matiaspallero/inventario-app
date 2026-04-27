'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, AlertCircle, TrendingDown, X } from 'lucide-react';

export default function NotificationBell({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const outOfStock = items.filter((item) => item.status === 'OUT_OF_STOCK');
  const lowStock = items.filter((item) => item.status === 'LOW_STOCK');
  const totalAlerts = outOfStock.length + lowStock.length;

  // Cerrar dropdown al clickear fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón con campana */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 cursor-pointer text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        title="Notificaciones"
      >
        <Bell size={24} />
        {totalAlerts > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {totalAlerts > 9 ? '9+' : totalAlerts}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-50 to-blue-100 border-b border-gray-200 p-4 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Alertas de Inventario</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-cyan-50 rounded transition-colors"
            >
              <X size={18} className="text-gray-600 cursor-pointer" />
            </button>
          </div>

          {/* Contenido */}
          <div className="flex-1 overflow-y-auto">
            {totalAlerts === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <Bell size={32} className="mx-auto mb-2 opacity-50" />
                <p>Sin alertas</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {/* OUT OF STOCK */}
                {outOfStock.length > 0 && (
                  <>
                    <div className="p-4 bg-red-50 border-b-2 border-red-200">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="text-red-600" size={20} />
                        <h4 className="font-bold text-red-900">
                          Sin Stock ({outOfStock.length})
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {outOfStock.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            className="text-sm text-red-800 bg-white p-2 rounded"
                          >
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-xs text-red-600">{item.sku}</p>
                          </div>
                        ))}
                        {outOfStock.length > 3 && (
                          <p className="text-xs text-red-700 font-semibold">
                            +{outOfStock.length - 3} más
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* LOW STOCK */}
                {lowStock.length > 0 && (
                  <div className="p-4 bg-orange-50">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingDown className="text-orange-600" size={20} />
                      <h4 className="font-bold text-orange-900">
                        Stock Bajo ({lowStock.length})
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {lowStock.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="text-sm text-orange-800 bg-white p-2 rounded"
                        >
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs text-orange-600">
                            Stock: {item.stock} unidades
                          </p>
                        </div>
                      ))}
                      {lowStock.length > 3 && (
                        <p className="text-xs text-orange-700 font-semibold">
                          +{lowStock.length - 3} más
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {totalAlerts > 0 && (
            <div className="border-t border-gray-200 p-3 bg-gray-50">
              <a
                href="/dashboard/inventario"
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
              >
                Ver inventario completo →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
