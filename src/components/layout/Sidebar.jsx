import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, LayoutDashboard, ShoppingCart } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 font-bold text-xl">
        Inventario
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Link href="/dashboard">
          <div className={`p-3 rounded-lg font-medium cursor-pointer transition-colors flex items-center gap-2 ${
            isActive('/dashboard') && !pathname.includes('/inventario')
              ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              : 'text-gray-600 hover:bg-gray-100'
          }`}>
            <LayoutDashboard size={20} />
            Dashboard
          </div>
        </Link>
        <Link href="/dashboard/inventario">
          <div className={`p-3 rounded-lg font-medium cursor-pointer transition-colors flex items-center gap-2 ${
            isActive('/dashboard/inventario')
              ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              : 'text-gray-600 hover:bg-gray-100'
          }`}>
            <Package size={20} />
            Productos
          </div>
        </Link>
        <Link href="/dashboard/ventas">
          <div className={`p-3 rounded-lg font-medium cursor-pointer transition-colors flex items-center gap-2 ${
            isActive('/dashboard/ventas')
              ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              : 'text-gray-600 hover:bg-gray-100'
          }`}>
            <ShoppingCart size={20} />
            Ventas
          </div>
        </Link>
      </nav>
    </aside>
  );
}
