export default function Badge({ status }) {
  const statusConfig = {
    IN_STOCK: 'bg-green-100 text-green-700',
    LOW_STOCK: 'bg-amber-100 text-amber-700',
    OUT_OF_STOCK: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[status] || statusConfig.IN_STOCK}`}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
}
