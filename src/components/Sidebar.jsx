import React from 'react'
import './Sidebar.css'

export default function Sidebar({
  currentUser,
  isSidebarOpen,
  activeMenu,
  activeSubMenu,
  isSettingsExpanded,
  onMenuClick,
  onSubMenuClick,
}) {
  const isSuperAdmin = currentUser?.role === 'super_admin'
  const isSuperUser = currentUser?.role === 'super_user'

  // Master Settings Sub-items
  const settingsSubItems = [
    {
      id: 'register-mgmt',
      title: 'จัดการลงทะเบียน',
      subtitle: 'ข้อมูลการลงทะเบียน',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: 'faculty-mgmt',
      title: 'การจัดการสาขาวิชา',
      subtitle: 'สถาบัน คณะ ปริญญา สาขาวิชา',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: 'constants-mgmt',
      title: 'จัดการค่าคงที่',
      subtitle: 'โครงการ ความพิการ ค่าต่างๆ',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      id: 'career-skills-mgmt',
      title: 'จัดการอาชีพ/คุณสมบัติ/ทักษะ',
      subtitle: 'อาชีพ คุณสมบัติ/ทักษะ',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ]

  // Super Admin Menus (matching user screenshot)
  const superAdminMenuItems = [
    {
      id: 'settings',
      title: 'การตั้งค่าข้อมูล',
      subtitle: 'สถาบัน คณะ ระดับ การจัดการ สาขาวิชา',
      hasSubmenu: true,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      id: 'user-profile',
      title: 'จัดการข้อมูลส่วนตัว',
      subtitle: 'การศึกษา ความพิการ',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: 'career-goal',
      title: 'จัดการเป้าหมาย',
      subtitle: 'อาชีพในอนาคต',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      id: 'skills',
      title: 'จัดการคุณสมบัติ/ทักษะ',
      subtitle: 'คุณสมบัติและทักษะ เป้าหมาย ระดับ',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      id: 'self-development',
      title: 'จัดการพัฒนาตนเอง',
      subtitle: 'ศึกษาเรียนรู้ ฝึกปฏิบัติ',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4" />
          <path d="m4.93 4.93 2.83 2.83" />
          <path d="M2 12h4" />
          <path d="m4.93 19.07 2.83-2.83" />
          <path d="M12 18v4" />
          <path d="m16.24 16.24 2.83 2.83" />
          <path d="M18 12h4" />
          <path d="m16.24 7.76 2.83-2.83" />
        </svg>
      ),
    },
    {
      id: 'self-assessment',
      title: 'จัดการประเมินตนเอง',
      subtitle: 'เดือน ระดับ',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: 'authorization',
      title: 'ตั้งค่าสิทธิ์การเข้าถึง',
      subtitle: 'เพิ่ม/แก้ไข/อัปเดต/ลบ ตามบทบาท',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
  ]

  // Super User Menus
  const superUserMenuItems = [
    {
      id: 'admin-dashboard',
      title: 'Dashboard ความก้าวหน้ากลุ่ม',
      subtitle: 'ภาพรวมพัฒนาการของกลุ่มที่ดูแล',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      ),
    },
    {
      id: 'group-mgmt',
      title: 'จัดการกลุ่ม & บันทึกผลสมาชิก',
      subtitle: 'ตั้งกลุ่ม เพิ่มคน ประเมินและให้คำแนะนำ',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'user-profile',
      title: 'ข้อมูลเจ้าหน้าที่ DSS (โปรไฟล์)',
      subtitle: 'สังกัดศูนย์ DSS และขอบเขตการดูแล',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ]

  // Standard User Menus
  const userMenuItems = [
    {
      id: 'user-profile',
      title: 'จัดการข้อมูลส่วนตัว (โปรไฟล์)',
      subtitle: 'ประวัติ สังกัด การศึกษา DSS',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: 'dashboard',
      title: 'Dashboard การวิเคราะห์',
      subtitle: 'สรุปผล แนะนำการพัฒนา',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      id: 'career-goal',
      title: 'กำหนดอาชีพเป้าหมาย',
      subtitle: 'อาชีพในอนาคต',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      id: 'self-assessment',
      title: 'การประเมินตนเอง',
      subtitle: 'เดือน ระดับ',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: 'skills',
      title: 'กำหนดคุณสมบัติ/ทักษะ',
      subtitle: 'คุณสมบัติและทักษะ เป้าหมาย ระดับ',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      id: 'self-development',
      title: 'การพัฒนาตนเอง',
      subtitle: 'ศึกษาเรียนรู้ ฝึกปฏิบัติ',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4" />
          <path d="m4.93 4.93 2.83 2.83" />
          <path d="M2 12h4" />
          <path d="m4.93 19.07 2.83-2.83" />
          <path d="M12 18v4" />
          <path d="m16.24 16.24 2.83 2.83" />
          <path d="M18 12h4" />
          <path d="m16.24 7.76 2.83-2.83" />
        </svg>
      ),
    },
  ]

  const renderMenuItem = (item) => (
    <li key={item.id} className="sidebar-menu-item">
      <button
        type="button"
        className={`sidebar-menu-link ${activeMenu === item.id ? 'active' : ''}`}
        onClick={() => onMenuClick(item)}
      >
        <div className="menu-icon-wrapper">{item.icon}</div>
        <div className="menu-text-block">
          <span className="menu-title">{item.title}</span>
          <span className="menu-subtitle">{item.subtitle}</span>
        </div>
        {item.hasSubmenu && (
          <svg
            className={`chevron-icon ${isSettingsExpanded ? 'open' : ''}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </button>

      {/* Floating Submenu */}
      {item.hasSubmenu && isSettingsExpanded && (
        <div className="floating-submenu-card">
          <ul className="flyout-menu-list">
            {settingsSubItems.map((sub) => (
              <li key={sub.id} className="flyout-menu-item">
                <button
                  type="button"
                  className={`flyout-menu-btn ${activeMenu === 'settings' && activeSubMenu === sub.id ? 'active' : ''}`}
                  onClick={() => onSubMenuClick(sub.id)}
                >
                  <div className="flyout-icon-box">{sub.icon}</div>
                  <div className="menu-text-block">
                    <span className="flyout-title">{sub.title}</span>
                    <span className="flyout-subtitle">{sub.subtitle}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )

  return (
    <aside className={`app-sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-header">
        <span className="sidebar-title">
          {isSuperAdmin
            ? 'Individual Career Planning (ผู้ดูแลระบบ)'
            : isSuperUser
            ? 'ICP (Super User / Mentor)'
            : 'Individual Career Planning (ผู้ใช้ระบบ)'}
        </span>
      </div>

      <ul className="sidebar-menu-list">
        {/* Super Admin Sections */}
        {isSuperAdmin ? (
          <>
            <li className="sidebar-section-divider">
              <span>เมนูผู้ดูแลระบบ (ADMIN)</span>
            </li>
            {superAdminMenuItems.map(renderMenuItem)}
          </>
        ) : isSuperUser ? (
          <>
            <li className="sidebar-section-divider">
              <span>เมนูผู้ดูแลกลุ่ม (SUPER USER)</span>
            </li>
            {superUserMenuItems.map(renderMenuItem)}
          </>
        ) : (
          /* Regular User Section */
          userMenuItems.map(renderMenuItem)
        )}
      </ul>
    </aside>
  )
}
