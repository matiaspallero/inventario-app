'use client';

import Sidebar from '@/components/layout/Sidebar';
import NotificationBell from '@/components/layout/NotificationBell';
import { useInventory } from '@/hooks/useInventory';

export default function DashboardLayout({ children }) {
  const { allItems } = useInventory();

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header con notificaciones */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-end">
          <NotificationBell items={allItems} />
        </div>
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}