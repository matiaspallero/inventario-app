'use client';

import { useState } from 'react';
import { useSales } from '@/hooks/useSales';
import POSProductSearch from '@/components/ventas/POSProductSearch';
import POSCart from '@/components/ventas/POSCart';
import TransactionSuccessModal from '@/components/ventas/TransactionSuccessModal';

export default function VentasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [successSale, setSuccessSale] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    items,
    cart,
    cartTotal,
    removeFromCart,
    updateCartQuantity,
    addToCart,
    processSale,
  } = useSales();

  const handleCheckout = () => {
    const sale = processSale();
    if (sale) {
      setSuccessSale(sale);
      setShowSuccessModal(true);
      setSearchTerm('');
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setSearchTerm('');
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Layout POS: Búsqueda/Productos a la izquierda, Carrito a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full p-6">
        {/* Izquierda: Búsqueda y Productos (2/3) */}
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <POSProductSearch
            items={items}
            onAddToCart={addToCart}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        {/* Derecha: Carrito (1/3) */}
        <div className="flex flex-col min-h-0">
          <POSCart
            cart={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemove={removeFromCart}
            total={cartTotal}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      {/* Modal de éxito */}
      <TransactionSuccessModal
        isOpen={showSuccessModal}
        sale={successSale}
        onClose={handleModalClose}
      />
    </div>
  );
}
