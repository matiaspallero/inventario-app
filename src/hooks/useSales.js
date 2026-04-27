'use client';

import { useMemo, useState, useCallback } from 'react';
import { mockInventory } from '@/lib/mockData';

export function useSales() {
  const [items, setItems] = useState(mockInventory);
  const [cart, setCart] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);

  const addToCart = useCallback((product, quantity) => {
    const quantityNum = parseInt(quantity, 10);
    
    // Verificar si ya existe en el carrito
    const existingItem = cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityNum }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: quantityNum,
          subtotal: product.price * quantityNum,
        },
      ]);
    }
  }, [cart]);

  const removeFromCart = useCallback((productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  }, [cart]);

  const updateCartQuantity = useCallback((productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId
            ? { ...item, quantity, subtotal: item.price * quantity }
            : item
        )
      );
    }
  }, [cart, removeFromCart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.subtotal, 0);
  }, [cart]);

  const cartItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const processSale = useCallback(() => {
    if (cart.length === 0) return;

    // Crear registro de venta
    const sale = {
      id: `SALE-${Date.now()}`,
      date: new Date().toLocaleString('es-AR'),
      items: cart,
      total: cartTotal,
      itemsCount: cartItemsCount,
    };

    // Actualizar inventario
    const updatedItems = items.map((item) => {
      const cartItem = cart.find((c) => c.id === item.id);
      if (cartItem) {
        const newStock = item.stock - cartItem.quantity;
        const newStatus =
          newStock === 0
            ? 'OUT_OF_STOCK'
            : newStock <= 5
            ? 'LOW_STOCK'
            : 'IN_STOCK';
        return { ...item, stock: newStock, status: newStatus };
      }
      return item;
    });

    setItems(updatedItems);
    setSalesHistory([sale, ...salesHistory]);
    setCart([]);

    return sale;
  }, [cart, cartTotal, cartItemsCount, items, salesHistory]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return {
    items,
    cart,
    salesHistory,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartItemsCount,
    processSale,
    clearCart,
  };
}
