/**
 * Sidebar menu өгөгдлийг нэг цэгээс удирдах зорилготой.
 *
 * Одоохондоо статик config буцаана.
 * Дараа нь backend/API-гаас role-based menu татах үед энэ функцийг л өөрчлөхөд хангалттай.
 */
export async function getSidebarMenu() {
  return [
    {
      id: 'main',
      label: 'Main',
      children: [
        { id: 'dashboard', label: 'Dashboard', to: '/dashboard' },
        { id: 'home', label: 'Home', to: '/home' },
      ],
    },
    {
      id: 'info',
      label: 'Info',
      children: [{ id: 'about', label: 'About', to: '/about' }],
    },
  ];
}

