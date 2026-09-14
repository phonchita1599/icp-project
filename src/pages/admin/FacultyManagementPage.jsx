import React, { useState } from 'react'
import './FacultyManagementPage.css'

export default function FacultyManagementPage({
  majorsList,
  onAddMajor,
  onDeleteMajor,
  onNavigateToRegister,
  onNavigateToCareerGoal,
  onExit,
}) {
  const [institute, setInstitute] = useState('มหาวิทยาลัยเทคโนโลยีราชมงคล')
  const [faculty, setFaculty] = useState('คณะวิทยาศาสตร์และเทคโนโลยี')
  const [educationLevel, setEducationLevel] = useState('ปริญญาตรี')
  const [major, setMajor] = useState('')

  const majorSuggestions = [
    'วิทยาการคอมพิวเตอร์',
    'เทคโนโลยีสารสนเทศ',
    'วิศวกรรมซอฟต์แวร์',
    'การตลาดดิจิทัล',
    'การบัญชี',
    'การออกแบบนิเทศศิลป์',
    'ภาษาอังกฤษเพื่อการสื่อสาร',
  ]

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!major.trim()) {
      alert('กรุณาระบุชื่อสาขาวิชา')
      return
    }

    const newMajorItem = {
      id: Date.now(),
      major: major.trim(),
      faculty: faculty.replace('คณะ:', '').trim() || 'คณะวิทยาศาสตร์และเทคโนโลยี',
      institute: institute.replace('สถาบัน:', '').trim() || 'มหาวิทยาลัยเทคโนโลยีราชมงคล',
      educationLevel: educationLevel.replace('ระดับการศึกษา:', '').trim() || 'ปริญญาตรี',
    }

    onAddMajor(newMajorItem)
    alert(`เพิ่มสาขาวิชา "${major.trim()}" สำเร็จเรียบร้อย!`)
    setMajor('')
  }

  return (
    <div className="faculty-page-container">
      <div className="faculty-card-container">
        <div className="faculty-top-banner">
          <h2 className="faculty-banner-title">การจัดการสาขาวิชา</h2>
        </div>

        <div className="faculty-inner-body">
          {/* Header Pills Section */}
          <div className="faculty-section-header">
            <div className="faculty-header-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>การจัดการข้อมูลพื้นฐาน (ค่าคงที่)</span>
            </div>
            <div className="faculty-pill-group">
              <button
                type="button"
                className="faculty-pill-btn"
                onClick={() => setInstitute('มหาวิทยาลัยเทคโนโลยีราชมงคล')}
              >
                สถาบัน
              </button>
              <button
                type="button"
                className="faculty-pill-btn"
                onClick={() => setFaculty('คณะวิทยาศาสตร์และเทคโนโลยี')}
              >
                คณะ
              </button>
              <button
                type="button"
                className="faculty-pill-btn"
                onClick={() => setEducationLevel('ปริญญาตรี')}
              >
                ระดับการศึกษา
              </button>
            </div>
          </div>

          <form onSubmit={handleAddSubmit}>
            <div className="faculty-grid-2col">
              {/* Row 1 Left: สถาบันการศึกษา * */}
              <div className="dropdown-underline-row">
                <div className="dropdown-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div className="dropdown-content-box">
                  <span className="dropdown-label">สถาบันการศึกษา *</span>
                  <input
                    type="text"
                    className="dropdown-select-input"
                    value={institute}
                    onChange={(e) => setInstitute(e.target.value)}
                    placeholder="ระบุสถาบันการศึกษา"
                    required
                  />
                </div>
                <div className="dropdown-icons-right">
                  <button type="button" className="icon-clear-btn" onClick={() => setInstitute('')} title="ล้าง">
                    ✕
                  </button>
                  <span>▾</span>
                </div>
              </div>

              {/* Row 1 Right: คณะ * */}
              <div className="dropdown-underline-row">
                <div className="dropdown-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div className="dropdown-content-box">
                  <span className="dropdown-label">คณะ *</span>
                  <input
                    type="text"
                    className="dropdown-select-input"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    placeholder="ระบุคณะ"
                    required
                  />
                </div>
                <div className="dropdown-icons-right">
                  <button type="button" className="icon-clear-btn" onClick={() => setFaculty('')} title="ล้าง">
                    ✕
                  </button>
                  <span>▾</span>
                </div>
              </div>

              {/* Row 2 Left: ระดับการศึกษา * */}
              <div className="dropdown-underline-row">
                <div className="dropdown-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div className="dropdown-content-box">
                  <span className="dropdown-label" style={{ color: '#2563eb' }}>ระดับการศึกษา *</span>
                  <input
                    type="text"
                    className="dropdown-select-input"
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    placeholder="ระบุระดับการศึกษา"
                    required
                  />
                </div>
                <div className="dropdown-icons-right">
                  <button type="button" className="icon-clear-btn" onClick={() => setEducationLevel('')} title="ล้าง">
                    ✕
                  </button>
                  <span>▾</span>
                </div>
              </div>
            </div>

            {/* Row 3: Full Width Blue Highlight Box: สาขาวิชา * */}
            <div>
              <div className="highlight-blue-field-box">
                <div className="highlight-left-content">
                  <div className="highlight-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="highlight-input"
                    placeholder="สาขาวิชา * (พิมพ์ชื่อสาขาวิชาที่ต้องการเพิ่ม)"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    required
                  />
                </div>
                <div className="highlight-right-badges">
                  <div className="badge-alert-circle">!</div>
                  <div className="badge-heart-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                </div>
              </div>
              {!major && <div className="error-text-under">ต้องใส่สาขาวิชา</div>}

              {/* Quick Suggestions Chips */}
              <div className="major-chips-row">
                <span className="major-chip-label">ตัวอย่างสาขาวิชา:</span>
                {majorSuggestions.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    className="major-chip-btn"
                    onClick={() => setMajor(sug)}
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="faculty-buttons-bar">
              <button type="submit" className="btn-blue-submit">
                เพิ่มข้อมูล (เพิ่มสาขา)
              </button>
              <button
                type="button"
                className="btn-neutral-cancel"
                onClick={() => setMajor('')}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                className="btn-neutral-cancel"
                onClick={onExit}
              >
                ออก
              </button>
              <button
                type="button"
                className="btn-neutral-cancel"
                style={{ color: '#2563eb', fontWeight: '600' }}
                onClick={onNavigateToRegister}
              >
                กลับฟอร์มการลงทะเบียน
              </button>
              <button
                type="button"
                className="btn-nav-career-goal"
                onClick={onNavigateToCareerGoal}
              >
                ไปฟอร์มกำหนดอาชีพเป้าหมาย
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ตารางแสดงรายการสาขาวิชาที่เพิ่มแล้ว */}
      <div className="majors-list-card">
        <div className="majors-list-header">
          <h3 className="majors-list-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span>รายการสาขาวิชาที่เพิ่มในระบบ</span>
          </h3>
          <span className="majors-count-badge">ทั้งหมด {majorsList.length} สาขาวิชา</span>
        </div>

        <div className="majors-table-wrapper">
          <table className="majors-table">
            <thead>
              <tr>
                <th style={{ width: '60px', textAlign: 'center' }}>ลำดับ</th>
                <th>สาขาวิชา</th>
                <th>คณะ</th>
                <th>สถาบันการศึกษา</th>
                <th>ระดับการศึกษา</th>
                <th style={{ width: '90px', textAlign: 'center' }}>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {majorsList.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ textAlign: 'center', color: '#64748b', fontWeight: '600' }}>{index + 1}</td>
                  <td className="major-name-cell">{item.major}</td>
                  <td>{item.faculty}</td>
                  <td>{item.institute}</td>
                  <td>
                    <span style={{ backgroundColor: '#e0edff', color: '#1d4ed8', padding: '3px 10px', borderRadius: '12px', fontSize: '13px', fontWeight: '600' }}>
                      {item.educationLevel}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      className="btn-delete-row"
                      onClick={() => onDeleteMajor(item.id, item.major)}
                      title="ลบสาขาวิชา"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      <span>ลบ</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
