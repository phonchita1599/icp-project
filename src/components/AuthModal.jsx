import React, { useState } from 'react'
import './AuthModal.css'

export default function AuthModal({
  authMode,
  onClose,
  onSwitchMode,
  onLoginSuccess,
  onRegisterSuccess,
}) {
  const [loginRole, setLoginRole] = useState('user') // 'user' | 'super_user' | 'super_admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Quick fill demo for roles
  const handleSelectRole = (role) => {
    setLoginRole(role)
    if (role === 'super_admin') {
      setEmail('admin@icp.ac.th')
      setPassword('12345678')
    } else if (role === 'super_user') {
      setEmail('dss.mentor@sut.ac.th')
      setPassword('12345678')
    } else {
      setEmail('b6501234@g.sut.ac.th')
      setPassword('12345678')
    }
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert('กรุณากรอกอีเมลและรหัสผ่าน')
      return
    }

    let role = loginRole
    if (loginRole === 'super_admin' || email.toLowerCase().includes('admin')) {
      role = 'super_admin'
    } else if (loginRole === 'super_user' || email.toLowerCase().includes('dss') || email.toLowerCase().includes('mentor')) {
      role = 'super_user'
    } else {
      role = 'user'
    }

    const isSuperUser = role === 'super_user'
    const isSuperAdmin = role === 'super_admin'

    const user = {
      name:
        role === 'super_admin'
          ? 'พรชิดา สนิทเชื้อ'
          : role === 'super_user'
          ? 'คุณพรชิดา สนิทเชื้อ'
          : email.includes('b6501234')
          ? 'นายธนกร รัตนผล'
          : 'พรชิดา สนิทเชื้อ',
      email: email,
      role: role,
      studentId: isSuperUser ? 'STAFF-65089' : isSuperAdmin ? 'STAFF-ADMIN-01' : 'B6501234',
      phone: isSuperUser ? '044-224-567 ต่อ 112' : isSuperAdmin ? '044-224-000' : '081-234-5678',
      gender: isSuperUser ? 'หญิง' : isSuperAdmin ? 'หญิง' : 'ชาย',
      birthDate: isSuperUser ? '1988-08-12' : isSuperAdmin ? '1985-03-20' : '2003-05-15',
      lineId: isSuperUser ? 'dss.sut.mentor' : isSuperAdmin ? 'admin.sut' : 'thanakorn.dev',
      avatar: isSuperUser ? 'avatar-4' : isSuperAdmin ? 'avatar-5' : 'avatar-1',
      institute: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      faculty:
        role === 'super_admin'
          ? 'ฝ่ายบริหารระบบและเทคโนโลยีสารสนเทศ (Admin Office)'
          : role === 'super_user'
          ? 'ศูนย์บริการนักศึกษาพิการ (DSS)'
          : 'สำนักวิชาเทคโนโลยีสารสนเทศ',
      major:
        role === 'super_admin'
          ? 'งานบริหารและพัฒนาระบบสารสนเทศ'
          : role === 'super_user'
          ? 'งานบริการและสนับสนุนนักศึกษาพิการ'
          : 'วิทยาการคอมพิวเตอร์',
      position:
        role === 'super_admin'
          ? 'ผู้ดูแลระบบสารสนเทศระดับสูง (System Administrator)'
          : role === 'super_user'
          ? 'เจ้าหน้าที่ศูนย์บริการนักศึกษาพิการ (DSS) / ที่ปรึกษา ICP'
          : 'นักศึกษา',
      officeRoom:
        role === 'super_admin'
          ? 'อาคารบริหาร ชั้น 3 ห้องฝ่ายไอที'
          : role === 'super_user'
          ? 'อาคารกิจการนักศึกษา (สุรสัมมนาคาร) ชั้น 1 ห้อง DSS Center'
          : '',
      studyYear: isSuperUser || isSuperAdmin ? 'เจ้าหน้าที่ประจำ' : 'ปี 3 (หลักสูตร 4 ปี)',
      gpax: isSuperUser || isSuperAdmin ? '-' : '3.45',
      advisor:
        role === 'super_admin'
          ? 'ผู้อำนวยการศูนย์คอมพิวเตอร์และสารสนเทศ'
          : role === 'super_user'
          ? 'หัวหน้าส่วนส่งเสริมและพัฒนานักศึกษา มทส.'
          : 'ดร.สมชาย มงคลสุข (อาจารย์ที่ปรึกษาสำนักวิชา)',
      disabilityType:
        isSuperUser || isSuperAdmin
          ? 'ไม่มี (เจ้าหน้าที่ / ผู้ดูแลกลุ่ม DSS)'
          : 'ความบกพร่องทางการเคลื่อนไหวหรือร่างกาย (ประเภท 3)',
      assistiveNeeds:
        role === 'super_user'
          ? 'ระบบบริหารจัดการแผนพัฒนาอาชีพนักศึกษา DSS รายบุคคล (ICP), เทคโนโลยีสิ่งอำนวยความสะดวกสำหรับนักศึกษาพิการ'
          : role === 'super_admin'
          ? 'ระบบโครงสร้างพื้นฐานเซิร์ฟเวอร์ และสิทธิ์การเข้าถึงข้อมูลระบบ ICP'
          : 'คีย์บอร์ดตามหลักสรีรศาสตร์ (Ergonomic), แท่นวางแขนปรับระดับ, สิทธิ์สอบห้องพิเศษ DSS',
      dssMentor:
        role === 'super_user'
          ? 'คุณพรชิดา สนิทเชื้อ (ผู้ประสานงานและที่ปรึกษาหลักประจำกลุ่ม DSS)'
          : role === 'super_admin'
          ? 'ทีมผู้ดูแลระบบกลาง มทส.'
          : 'คุณพรชิดา สนิทเชื้อ (ศูนย์ DSS มทส.)',
      targetCareer:
        role === 'super_user'
          ? 'ผู้เชี่ยวชาญด้านการแนะแนวและส่งเสริมอาชีพนักศึกษาพิการในระดับอุดมศึกษา'
          : role === 'super_admin'
          ? 'ผู้วิเคราะห์และพัฒนาระบบสารสนเทศองค์กร'
          : 'โปรแกรมเมอร์ (Full-Stack Web Developer)',
      coreSkills:
        role === 'super_user'
          ? 'Individualized Career Planning (ICP), การแนะแนวอาชีพนักศึกษา DSS, การประสานงานสถานประกอบการ, การประเมินสมรรถนะรายบุคคล'
          : role === 'super_admin'
          ? 'System Architecture, Database Management, Security & Access Control, Web Application Development'
          : 'React, Node.js, PostgreSQL, Git, UI Design System, Web Accessibility (WCAG)',
      portfolioUrl:
        role === 'super_user'
          ? 'https://dss.sut.ac.th'
          : role === 'super_admin'
          ? 'https://it.sut.ac.th'
          : 'https://github.com/thanakorn-sut',
      bio:
        role === 'super_user'
          ? 'เจ้าหน้าที่ศูนย์บริการนักศึกษาพิการ (DSS) มหาวิทยาลัยเทคโนโลยีสุรนารี มุ่งมั่นส่งเสริมศักยภาพและพัฒนาเส้นทางอาชีพแก่นักศึกษาพิการสู่ตลาดแรงงานอย่างยั่งยืน'
          : role === 'super_admin'
          ? 'ผู้ดูแลระบบกลาง บริหารจัดการระบบฐานข้อมูลและการเข้าถึงข้อมูลระบบ ICP ให้เกิดความปลอดภัยสูงสุด'
          : 'นักศึกษาผู้มีความมุ่งมั่นในการเป็น Full-Stack Developer พร้อมประยุกต์ใช้เทคโนโลยีสร้างสรรค์ระบบที่ทุกคนเข้าถึงได้ (Accessible Web for All)',
    }
    onLoginSuccess(user)
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert('กรุณากรอกอีเมลและรหัสผ่าน')
      return
    }
    if (password !== confirmPassword) {
      alert('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน')
      return
    }
    const user = {
      name: fullName || email.split('@')[0],
      email: email,
      role: 'user',
      faculty: 'คณะวิทยาศาสตร์และเทคโนโลยี',
      major: 'วิทยาการคอมพิวเตอร์',
    }
    onRegisterSuccess(user)
  }

  return (
    <div className="modal-overlay" onClick={onClose} id="auth-modal-overlay">
      <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="ปิด">
          ✕
        </button>

        <div className="modal-header">
          <h2 className="modal-title">{authMode === 'login' ? 'เข้าสู่ระบบ' : 'ลงทะเบียน'}</h2>
          <p className="modal-subtitle">Individualized Career Planning (ICP)</p>
        </div>

        {/* Role Selector Tabs (Only on Login Mode) */}
        {authMode === 'login' && (
          <div className="login-role-tabs">
            <button
              type="button"
              className={`login-role-tab ${loginRole === 'user' ? 'active' : ''}`}
              onClick={() => handleSelectRole('user')}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>ผู้ใช้งานทั่วไป</span>
            </button>

            <button
              type="button"
              className={`login-role-tab tab-super ${loginRole === 'super_user' ? 'active' : ''}`}
              onClick={() => handleSelectRole('super_user')}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
                <path d="M3 20h18" />
              </svg>
              <span>Super User</span>
            </button>

            <button
              type="button"
              className={`login-role-tab tab-admin ${loginRole === 'super_admin' ? 'active' : ''}`}
              onClick={() => handleSelectRole('super_admin')}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Super Admin</span>
            </button>
          </div>
        )}

        {authMode === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            {loginRole === 'super_admin' && (
              <div className="super-admin-hint-banner">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>คุณกำลังเข้าสู่ระบบในฐานะ <strong>Super Admin (ผู้ดูแลระบบสูงสุด)</strong></span>
              </div>
            )}

            {loginRole === 'super_user' && (
              <div className="super-user-hint-banner">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
                  <path d="M3 20h18" />
                </svg>
                <span>คุณกำลังเข้าสู่ระบบในฐานะ <strong>Super User (ผู้ดูแลกลุ่ม DSS)</strong></span>
              </div>
            )}

            <div className="underline-form-row">
              <div className="row-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <input
                id="login-email"
                type="email"
                className="row-input-field"
                placeholder={
                  loginRole === 'super_admin'
                    ? 'อีเมล Super Admin (เช่น admin@icp.ac.th):'
                    : loginRole === 'super_user'
                    ? 'อีเมล Super User (เช่น dss.mentor@sut.ac.th):'
                    : 'อีเมล:'
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="underline-form-row">
              <div className="row-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="row-input-field"
                placeholder="รหัสผ่าน:"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="row-action-icon-btn"
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

            <div className="form-actions-row">
              <button
                type="submit"
                className={`btn-primary-action ${
                  loginRole === 'super_admin'
                    ? 'btn-admin-submit'
                    : loginRole === 'super_user'
                    ? 'btn-super-submit'
                    : ''
                }`}
              >
                {loginRole === 'super_admin' ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>เข้าสู่ระบบ Super Admin</span>
                  </>
                ) : loginRole === 'super_user' ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
                      <path d="M3 20h18" />
                    </svg>
                    <span>เข้าสู่ระบบ Super User</span>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    <span>เข้าสู่ระบบ</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn-link-action"
                onClick={() => onSwitchMode('register')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                <span>ลงทะเบียน</span>
              </button>

              <button
                type="button"
                className="btn-link-action"
                onClick={onClose}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>ออก</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="underline-form-row">
              <div className="row-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <input
                id="register-name"
                type="text"
                className="row-input-field"
                placeholder="ชื่อ-นามสกุล:"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="underline-form-row">
              <div className="row-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <input
                id="register-email"
                type="email"
                className="row-input-field"
                placeholder="อีเมล:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="underline-form-row">
              <div className="row-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                className="row-input-field"
                placeholder="รหัสผ่าน:"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="row-action-icon-btn"
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

            <div className="underline-form-row">
              <div className="row-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <input
                id="register-confirm-password"
                type={showPassword ? 'text' : 'password'}
                className="row-input-field"
                placeholder="ยืนยันรหัสผ่าน:"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-actions-row">
              <button type="submit" className="btn-primary-action">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                <span>ลงทะเบียน</span>
              </button>

              <button
                type="button"
                className="btn-link-action"
                onClick={() => onSwitchMode('login')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                <span>เข้าสู่ระบบ</span>
              </button>

              <button
                type="button"
                className="btn-link-action"
                onClick={onClose}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>ออก</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
