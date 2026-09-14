import React, { useState, useMemo } from 'react'
import './UserManagementPage.css'

export default function UserManagementPage({
  usersList = [],
  onAddUser,
  onUpdateUser,
  onDeleteUser,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [facultyFilter, setFacultyFilter] = useState('all')

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    faculty: 'คณะวิทยาศาสตร์และเทคโนโลยี',
    major: 'วิทยาการคอมพิวเตอร์',
    status: 'active',
  })

  const facultyOptions = [
    'คณะวิทยาศาสตร์และเทคโนโลยี',
    'คณะบริหารธุรกิจและการจัดการ',
    'คณะวิศวกรรมศาสตร์และสถาปัตยกรรม',
    'คณะศิลปศาสตร์และวิทยาการจัดการ',
  ]

  const filteredUsers = useMemo(() => {
    return usersList.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.major && u.major.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchRole = roleFilter === 'all' || u.role === roleFilter
      const matchStatus = statusFilter === 'all' || u.status === statusFilter
      const matchFaculty = facultyFilter === 'all' || u.faculty === facultyFilter

      return matchSearch && matchRole && matchStatus && matchFaculty
    })
  }, [usersList, searchTerm, roleFilter, statusFilter, facultyFilter])

  const handleOpenEdit = (user) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      faculty: user.faculty || 'คณะวิทยาศาสตร์และเทคโนโลยี',
      major: user.major || 'วิทยาการคอมพิวเตอร์',
      status: user.status || 'active',
    })
    setShowEditModal(true)
  }

  const handleSaveAdd = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      alert('กรุณากรอกชื่อและอีเมล')
      return
    }
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      faculty: formData.faculty,
      major: formData.major,
      status: formData.status,
      createdAt: 'วันนี้',
    }
    onAddUser(newUser)
    setShowAddModal(false)
    alert(`เพิ่มผู้ใช้งาน "${newUser.name}" เรียบร้อยแล้ว`)
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    if (!selectedUser) return
    onUpdateUser({
      ...selectedUser,
      ...formData,
    })
    setShowEditModal(false)
    alert(`อัปเดตข้อมูล "${formData.name}" เรียบร้อย`)
  }

  const handleToggleStatus = (userId) => {
    const target = usersList.find((u) => u.id === userId)
    if (target) {
      onUpdateUser({
        ...target,
        status: target.status === 'active' ? 'suspended' : 'active',
      })
    }
  }

  return (
    <div className="user-mgmt-container">
      <div className="user-mgmt-header">
        <div>
          <div className="mgmt-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>SUPER USER : USER MANAGEMENT</span>
          </div>
          <h1 className="mgmt-title">จัดการรายชื่อผู้ใช้งานและสิทธิ์ระบบ</h1>
          <p className="mgmt-subtitle">
            กำหนดบทบาท (Super User / อาจารย์ที่ปรึกษา / นักศึกษา), สถานะบัญชี และข้อมูลสังกัด
          </p>
        </div>

        <button
          type="button"
          className="btn-add-user"
          onClick={() => {
            setFormData({
              name: '',
              email: '',
              role: 'user',
              faculty: 'คณะวิทยาศาสตร์และเทคโนโลยี',
              major: 'วิทยาการคอมพิวเตอร์',
              status: 'active',
            })
            setShowAddModal(true)
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>เพิ่มผู้ใช้งานใหม่</span>
        </button>
      </div>

      {/* Filter Card */}
      <div className="user-mgmt-filter-card">
        <div className="search-input-wrap">
          <input
            type="text"
            className="user-search-field"
            placeholder="ค้นหาชื่อ, อีเมล หรือสาขาวิชา..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-group">
          <div className="filter-select-item">
            <label className="filter-label">บทบาท:</label>
            <select
              className="filter-dropdown"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">ทั้งหมด ทุกบทบาท</option>
              <option value="super_user">Super User (ผู้ดูแลระบบ)</option>
              <option value="advisor">อาจารย์ที่ปรึกษา</option>
              <option value="user">นักศึกษา / ผู้ใช้ทั่วไป</option>
            </select>
          </div>

          <div className="filter-select-item">
            <label className="filter-label">สถานะ:</label>
            <select
              className="filter-dropdown"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">ทุกสถานะ</option>
              <option value="active">ปกติ (Active)</option>
              <option value="suspended">ระงับ (Suspended)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="user-table-card">
        <div className="table-responsive">
          <table className="user-data-table">
            <thead>
              <tr>
                <th>ผู้ใช้งาน</th>
                <th>สังกัด (คณะ / สาขา)</th>
                <th>บทบาทระบบ (Role)</th>
                <th style={{ textAlign: 'center' }}>สถานะ</th>
                <th style={{ textAlign: 'center' }}>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-profile-cell">
                      <div className={`user-avatar-circle ${user.role === 'super_user' ? 'avatar-super' : user.role === 'advisor' ? 'avatar-advisor' : 'avatar-user'}`}>
                        {user.role === 'super_user' ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ) : user.role === 'advisor' ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                          </svg>
                        ) : (
                          user.name.charAt(0)
                        )}
                      </div>
                      <div className="user-name-meta">
                        <span className="user-full-name">{user.name}</span>
                        <span className="user-email-text">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="faculty-cell">
                      <span className="faculty-main">{user.faculty || 'คณะวิทยาศาสตร์และเทคโนโลยี'}</span>
                      <span className="major-sub">{user.major || 'สาขาวิชาทั่วไป'}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`role-select-pill ${user.role === 'super_user' ? 'pill-super' : user.role === 'advisor' ? 'pill-advisor' : 'pill-student'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      {user.role === 'super_user' ? (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span>Super User</span>
                        </>
                      ) : user.role === 'advisor' ? (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                          </svg>
                          <span>อาจารย์</span>
                        </>
                      ) : (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          <span>ผู้ใช้ทั่วไป</span>
                        </>
                      )}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      className={`status-toggle-btn ${user.status === 'active' ? 'status-active' : 'status-suspended'}`}
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      {user.status === 'active' ? 'ใช้งานปกติ' : 'ระงับชั่วคราว'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons-group">
                      <button
                        type="button"
                        className="btn-tbl-action btn-tbl-edit"
                        onClick={() => handleOpenEdit(user)}
                        title="แก้ไข"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="btn-tbl-action btn-tbl-delete"
                        onClick={() => {
                          if (window.confirm(`ต้องการลบผู้ใช้ "${user.name}" ใช่หรือไม่?`)) {
                            onDeleteUser(user.id)
                          }
                        }}
                        title="ลบ"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add User */}
      {showAddModal && (
        <div className="mgmt-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="mgmt-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="mgmt-modal-header">
              <h2 className="mgmt-modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>เพิ่มผู้ใช้งานใหม่</span>
              </h2>
              <button type="button" className="mgmt-modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveAdd}>
              <div className="mgmt-modal-body">
                <div className="form-group-row">
                  <label className="modal-field-label">ชื่อ-นามสกุล *</label>
                  <input
                    type="text"
                    className="modal-text-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group-row">
                  <label className="modal-field-label">อีเมล *</label>
                  <input
                    type="email"
                    className="modal-text-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group-row">
                  <label className="modal-field-label">บทบาท (Role) *</label>
                  <select
                    className="modal-select-input"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="user">นักศึกษา / ผู้ใช้ทั่วไป</option>
                    <option value="advisor">อาจารย์ที่ปรึกษา</option>
                    <option value="super_user">Super User (ผู้ดูแลระบบ)</option>
                  </select>
                </div>
              </div>
              <div className="mgmt-modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowAddModal(false)}>ยกเลิก</button>
                <button type="submit" className="btn-modal-submit">บันทึก</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit User */}
      {showEditModal && (
        <div className="mgmt-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="mgmt-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="mgmt-modal-header">
              <h2 className="mgmt-modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <span>แก้ไขข้อมูลผู้ใช้</span>
              </h2>
              <button type="button" className="mgmt-modal-close" onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="mgmt-modal-body">
                <div className="form-group-row">
                  <label className="modal-field-label">ชื่อ-นามสกุล *</label>
                  <input
                    type="text"
                    className="modal-text-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group-row">
                  <label className="modal-field-label">บทบาท (Role) *</label>
                  <select
                    className="modal-select-input"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="user">นักศึกษา / ผู้ใช้ทั่วไป</option>
                    <option value="advisor">อาจารย์ที่ปรึกษา</option>
                    <option value="super_user">Super User (ผู้ดูแลระบบ)</option>
                  </select>
                </div>
              </div>
              <div className="mgmt-modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowEditModal(false)}>ยกเลิก</button>
                <button type="submit" className="btn-modal-submit">บันทึกการแก้ไข</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
