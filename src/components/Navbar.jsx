import React from 'react'
import './Navbar.css'

export default function Navbar({
  currentUser,
  isSidebarOpen,
  onToggleSidebar,
  onOpenAuth,
  onLogout,
  onNavigateToProfile,
}) {
  const avatarEmojiMap = {
    'avatar-1': '👨‍💻',
    'avatar-2': '👩‍💻',
    'avatar-3': '🎓',
    'avatar-4': '🧑‍💼',
    'avatar-5': '🌟',
    'avatar-6': '🦾',
  }

  const currentAvatarEmoji = currentUser?.avatarEmoji || (currentUser?.avatar ? avatarEmojiMap[currentUser.avatar] : null)

  return (
    <header className="top-navbar">
      <div className="nav-left-section">
        {currentUser && (
          <button
            type="button"
            className="hamburger-btn"
            onClick={onToggleSidebar}
            title={isSidebarOpen ? 'ย่อแถบเมนู' : 'ขยายแถบเมนู'}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}

        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="user-badge-text"
              onClick={onNavigateToProfile}
              title="คลิกเพื่อจัดการข้อมูลส่วนตัวของคุณ"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                borderRadius: '6px',
                padding: '4px 10px',
                cursor: 'pointer',
                fontSize: '14.5px',
                fontFamily: 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
            >
              {currentUser.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt="avatar"
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid #ffffff',
                    display: 'inline-block',
                    flexShrink: 0
                  }}
                />
              ) : currentAvatarEmoji ? (
                <span style={{ fontSize: '18px', lineHeight: 1, display: 'inline-flex', alignItems: 'center' }}>
                  {currentAvatarEmoji}
                </span>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
              <span>{currentUser.role === 'super_admin' ? `admin: ${currentUser.name}` : currentUser.name}</span>
              <span style={{ fontSize: '11px', opacity: 0.8, textDecoration: 'underline' }}>[แก้ไขข้อมูล]</span>
            </button>
            {currentUser.role === 'super_admin' && (
              <span style={{
                background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
                color: '#1e40af',
                fontSize: '11.5px',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '9999px',
                border: '1px solid #93c5fd',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                🛡️ Super Admin
              </span>
            )}
            {currentUser.role === 'super_user' && (
              <span style={{
                background: 'linear-gradient(135deg, #fef08a, #fde047)',
                color: '#854d0e',
                fontSize: '11.5px',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '9999px',
                border: '1px solid #facc15',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                👑 Super User
              </span>
            )}
          </div>
        ) : (
          <span className="user-badge-text">Individualized Career Planning (ICP)</span>
        )}
      </div>

      <div className="nav-right-section">
        {currentUser ? (
          <button
            type="button"
            className="nav-btn"
            onClick={onLogout}
            title="ออกจากระบบ"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>ออกจากระบบ</span>
          </button>
        ) : (
          <button
            type="button"
            className="nav-btn"
            onClick={() => onOpenAuth('login')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            <span>เข้าสู่ระบบ</span>
          </button>
        )}
      </div>
    </header>
  )
}
