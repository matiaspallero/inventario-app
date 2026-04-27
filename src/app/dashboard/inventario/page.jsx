'use client';

import { useState } from 'react';
import ProductsTable from '@/components/inventario/ProductsTable';
import ProductModal from '@/components/inventario/ProductModal';
import InventoryFilters from '@/components/inventario/InventoryFilters';
import { useInventory } from '@/hooks/useInventory';
import { exportToCSV, prepareInventoryForExport } from '@/lib/exportUtils';
import { Plus, Download } from 'lucide-react';

export default function InventarioPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const {
    items,
    allItems,
    categories,
    currentPage: page,
    itemsPerPage,
    totalItems,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useInventory(searchTerm, filterStatus, filterCategory);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmitProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    handleCloseModal();
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      deleteProduct(id);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleExportCSV = () => {
    const dataToExport = prepareInventoryForExport(allItems);
    exportToCSV(dataToExport, `inventario-${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión del Inventario</h1>
          <p className="text-gray-500 mt-1">Administra tu catálogo de productos</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 cursor-pointer bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            <Download size={20} />
            Exportar CSV
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center cursor-pointer gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
          >
            <Plus size={20} />
            Nuevo Producto
          </button>
        </div>
      </div>

      {/* Filtros */}
      <InventoryFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
        filterCategory={filterCategory}
        onCategoryChange={setFilterCategory}
        categories={categories}
      />

      {/* Tabla */}
      <ProductsTable
        items={items}
        onEdit={handleOpenModal}
        onDelete={handleDeleteProduct}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        product={editingProduct}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
      />
    </div>
  );
}
