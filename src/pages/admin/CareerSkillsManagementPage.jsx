import React from 'react'
import '../CommonPages.css'

export default function CareerSkillsManagementPage({ onNavigateHome }) {
  return (
    <div className="subpage-container">
      <div className="subpage-header-row">
        <h2 className="subpage-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>จัดการอาชีพ/คุณสมบัติ/ทักษะ</span>
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
        จัดการฐานข้อมูลกลุ่มอาชีพ คุณสมบัติที่ต้องการ และชุดทักษะความสามารถ
      </p>

      <div className="card-grid-2">
        <div className="feature-box">
          <div className="feature-box-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span>ฐานข้อมูลอาชีพ</span>
          </div>
          <div className="feature-box-desc">หมวดหมู่อาชีพ รายละเอียดงาน และสมรรถนะประจำตำแหน่ง</div>
        </div>
        <div className="feature-box">
          <div className="feature-box-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>คุณสมบัติ & ทักษะ</span>
          </div>
          <div className="feature-box-desc">เกณฑ์มาตรฐานทักษะ (Hard Skills / Soft Skills) และตัวชี้วัด</div>
        </div>
      </div>
    </div>
  )
}
