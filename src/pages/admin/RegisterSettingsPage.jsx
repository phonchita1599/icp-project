import React, { useState, useEffect } from 'react'
import './RegisterSettingsPage.css'

export default function RegisterSettingsPage({ currentUser, onUpdateUser, onNavigateToFaculty }) {
  const [formName, setFormName] = useState(currentUser?.name || '')
  const [formEmail, setFormEmail] = useState(currentUser?.email || '')
  const [formPassword, setFormPassword] = useState('12345678')
  const [formConfirmPassword, setFormConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setFormName(currentUser.name || '')
      setFormEmail(currentUser.email || '')
    }
  }, [currentUser])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formName || !formEmail) {
      alert('กรุณากรอกชื่อ-สกุล และอีเมล')
      return
    }
    if (formConfirmPassword && formPassword !== formConfirmPassword) {
      alert('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน')
      return
    }
    onUpdateUser({
      ...currentUser,
      name: formName,
      email: formEmail,
    })
    alert('บันทึกการแก้ไขข้อมูลเรียบร้อยแล้ว!')
  }

  const handleCancel = () => {
    setFormName(currentUser?.name || 'พรชิดา สนิทเชื้อ')
    setFormEmail(currentUser?.email || 'phonchita1599@gmail.com')
    setFormPassword('12345678')
    setFormConfirmPassword('')
  }

  return (
    <div className="register-page-container">
      <div className="register-top-banner">
        <h2 className="register-banner-title">การตั้งค่าการลงทะเบียน</h2>
      </div>

      <div className="register-inner-body">
        <form onSubmit={handleSubmit}>
          <div className="register-grid-2col">
            <div className="register-input-box">
              <div className="register-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="register-content-block">
                <span className="register-micro-label">ชื่อ-สกุล *</span>
                <input
                  type="text"
                  className="register-text-input"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="register-input-box">
              <div className="register-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="register-content-block">
                <span className="register-micro-label">อีเมล *</span>
                <input
                  type="email"
                  className="register-text-input"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="register-input-box">
              <div className="register-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div className="register-content-block">
                <span className="register-micro-label">รหัสผ่าน *</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="register-text-input"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className="register-toggle-pwd-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <div className="register-input-box">
              <div className="register-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div className="register-content-block">
                <span className="register-micro-label">ยืนยันรหัสผ่าน *</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="register-text-input"
                  placeholder="กรอกเพื่อเปลี่ยนรหัสผ่าน"
                  value={formConfirmPassword}
                  onChange={(e) => setFormConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="register-buttons-bar">
            <button type="submit" className="btn-blue-submit">
              แก้ไขข้อมูล
            </button>
            <button
              type="button"
              className="btn-neutral-cancel"
              onClick={handleCancel}
            >
              ยกเลิก
            </button>
            <button
              type="button"
              className="link-goto-faculty"
              onClick={onNavigateToFaculty}
            >
              <span>ไปฟอร์มการจัดการสาขาวิชา</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
