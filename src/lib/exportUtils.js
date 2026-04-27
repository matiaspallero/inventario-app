// Utilidad para exportar datos a CSV
export function exportToCSV(data, filename = 'inventario.csv') {
  if (!data || data.length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  // Obtener encabezados
  const headers = Object.keys(data[0]);

  // Crear fila de encabezados con comillas
  const csvHeaders = headers.map((h) => `"${h}"`).join(',');

  // Crear filas de datos
  const csvRows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header];
        // Escapar comillas y envolver en comillas si contiene comas
        const escaped = String(value || '').replace(/"/g, '""');
        return `"${escaped}"`;
      })
      .join(',')
  );

  // Combinar encabezados y filas
  const csvContent = [csvHeaders, ...csvRows].join('\n');

  // Crear blob y descargar
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function prepareInventoryForExport(items) {
  return items.map((item) => ({
    ID: item.id,
    'Nombre del Producto': item.name,
    SKU: item.sku,
    Categoría: item.category,
    Stock: item.stock,
    Precio: item.price,
    Estado: item.status,
  }));
}
