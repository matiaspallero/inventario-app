'use client';

import Badge from '@/components/ui/Badge';
import { Edit2, Trash2 } from 'lucide-react';

// Función para formatear precios de forma consistente (sin depender de locale)
const formatPrice = (price) => {
  return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export default function ProductsTable({
  items,
  onEdit,
  onDelete,
  currentPage,
  onPageChange,
  itemsPerPage,
  totalItems,
}) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
        <p className="text-gray-400">No hay productos que coincidan con los filtros</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-linear-to-r from-blue-50 to-blue-100 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Nombre</th>
              <th className="p-4 font-semibold text-gray-700">SKU</th>
              <th className="p-4 font-semibold text-gray-700">Categoría</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Stock</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Precio</th>
              <th className="p-4 font-semibold text-gray-700">Estado</th>
              <th className="p-4 font-semibold text-gray-700 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedItems.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{item.name}</td>
                <td className="p-4 text-sm text-gray-600 font-mono">{item.sku}</td>
                <td className="p-4 text-gray-600">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{item.category}</span>
                </td>
                <td className="p-4 text-right">
                  <span className={`font-semibold ${item.stock === 0 ? 'text-red-600' : item.stock <= 5 ? 'text-orange-600' : 'text-green-600'}`}>
                    {item.stock}
                  </span>
                </td>
                <td className="p-4 text-right font-semibold text-gray-900">{formatPrice(item.price)}</td>
                <td className="p-4">
                  <Badge status={item.status} />
                </td>
                <td className="p-4 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1 text-blue-600 hover:bg-blue-50 cursor-pointer rounded transition-colors"
                      title="Editar"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1 text-red-600 hover:bg-red-50 cursor-pointer rounded transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-semibold text-gray-900">{startIndex + 1}</span> a{' '}
            <span className="font-semibold text-gray-900">{Math.min(startIndex + itemsPerPage, totalItems)}</span> de{' '}
            <span className="font-semibold text-gray-900">{totalItems}</span> productos
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              ← Anterior
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-2 rounded-lg transition-colors font-medium text-sm ${
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
