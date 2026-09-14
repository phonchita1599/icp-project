import React from 'react'
import '../CommonPages.css'

export default function ConstantsManagementPage({ onNavigateHome }) {
  return (
    <div className="subpage-container">
      <div className="subpage-header-row">
        <h2 className="subpage-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>จัดการค่าคงที่</span>
        </h2>
        <button type="button" className="btn-back-overview" onClick={onNavigateHome}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>กลับหน้าหลัก</span>
        </button>
      </div>

      <p className="subpage-description">
        กำหนดค่าคงที่ของระบบ เช่น ประเภทโครงการ ประเภทความพิการ และเกณฑ์คะแนนประเมิน
      </p>

      <div className="card-grid-2">
        <div className="feature-box">
          <div className="feature-box-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            <span>ประเภทความพิการ</span>
          </div>
          <div className="feature-box-desc">ทางการเห็น, ทางการได้ยิน, ทางการเคลื่อนไหว, ออทิสติก ฯลฯ</div>
        </div>
        <div className="feature-box">
          <div className="feature-box-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span>โครงการสนับสนุน</span>
          </div>
          <div className="feature-box-desc">โครงการพัฒนาศักยภาพแรงงาน Inclusive Workplace (IW)</div>
        </div>
      </div>
    </div>
  )
}
