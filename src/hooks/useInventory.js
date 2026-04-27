'use client';

import { useMemo, useState, useCallback } from 'react';
import { mockInventory } from '@/lib/mockData';

export function useInventory(searchTerm = '', filterStatus = null, filterCategory = null) {
  const [items, setItems] = useState(mockInventory);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = useMemo(() => {
    let result = items;

    // Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.sku.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term)
      );
    }

    // Filtrar por estado
    if (filterStatus) {
      result = result.filter((item) => item.status === filterStatus);
    }

    // Filtrar por categoría
    if (filterCategory) {
      result = result.filter((item) => item.category === filterCategory);
    }

    return result;
  }, [items, searchTerm, filterStatus, filterCategory]);

  const stats = useMemo(() => ({
    totalProducts: items.length,
    lowStockCount: items.filter((item) => item.status === 'LOW_STOCK').length,
    outOfStockCount: items.filter((item) => item.status === 'OUT_OF_STOCK').length,
  }), [items]);

  const categories = useMemo(() => {
    return [...new Set(items.map((item) => item.category))].sort();
  }, [items]);

  const addProduct = useCallback((product) => {
    const newProduct = {
      id: String(Math.max(...items.map((i) => Number(i.id)), 0) + 1),
      ...product,
    };
    setItems([...items, newProduct]);
  }, [items]);

  const updateProduct = useCallback((id, updatedData) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updatedData } : item)));
  }, [items]);

  const deleteProduct = useCallback((id) => {
    setItems(items.filter((item) => item.id !== id));
  }, [items]);

  return {
    items: filtered,
    allItems: items,
    stats,
    categories,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalItems: filtered.length,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
