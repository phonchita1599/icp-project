import React, { useState } from 'react'
import './AuthorizationPage.css'

export default function AuthorizationPage() {
  const initialPermissions = [
    {
      id: 'registration',
      resource: 'จัดการลงทะเบียน (Registration)',
      user: { view: true, edit: true, update: true, delete: true },
      superUser: { view: true, edit: true, update: true, delete: true },
      adminFixed: 'เต็มที่',
    },
    {
      id: 'department',
      resource: 'การจัดการสาขาวิชา (Department)',
      user: { view: true, edit: true, update: true, delete: true },
      superUser: { view: true, edit: true, update: true, delete: true },
      adminFixed: 'เต็มที่',
    },
    {
      id: 'constants',
      resource: 'จัดการค่าคงที่ (Constants)',
      user: { view: false, edit: false, update: false, delete: false },
      superUser: { view: false, edit: false, update: false, delete: false },
      adminFixed: 'เต็มที่',
    },
    {
      id: 'career_qualification',
      resource: 'จัดการอาชีพ/คุณสมบัติ/ทักษะ (Career/Qualification)',
      user: { view: true, edit: true, update: true, delete: true },
      superUser: { view: true, edit: true, update: true, delete: true },
      adminFixed: 'เต็มที่',
    },
  ]

  const [permissions, setPermissions] = useState(initialPermissions)

  const handleToggle = (resourceId, role, action) => {
    setPermissions((prev) =>
      prev.map((item) => {
        if (item.id === resourceId) {
          return {
            ...item,
            [role]: {
              ...item[role],
              [action]: !item[role][action],
            },
          }
        }
        return item
      })
    )
  }

  const handleReset = () => {
    setPermissions(initialPermissions)
    alert('รีเซ็ตการตั้งค่าสิทธิ์เป็นค่าเริ่มต้นเรียบร้อยแล้ว')
  }

  const handleSave = () => {
    alert('บันทึกการตั้งค่าสิทธิ์การเข้าถึง (Authorization) เรียบร้อยแล้ว!')
  }

  return (
    <div className="auth-page-container">
      <div className="auth-page-header">
        <h1 className="auth-page-title">ตั้งค่าสิทธิ์การเข้าถึง (Authorization)</h1>
        <p className="auth-page-subtitle">
          กำหนดสิทธิ์เพิ่ม / แก้ไข / อัปเดต / ลบ ให้ผู้ใช้ระบบและผู้ดูแลกลุ่ม สำหรับแต่ละทรัพยากร (Admin มีสิทธิ์เต็มที่เสมอ)
        </p>
      </div>

      <div className="auth-card">
        <div className="auth-table-responsive">
          <table className="auth-matrix-table">
            <thead>
              <tr className="auth-header-top-row">
                <th className="th-resource" rowSpan="2">ทรัพยากร</th>
                <th className="th-role" colSpan="4">ผู้ใช้ระบบ (User)</th>
                <th className="th-role" colSpan="4">ผู้ดูแลกลุ่ม (Super-User)</th>
                <th className="th-role th-admin" rowSpan="2">
                  ผู้ดูแลระบบ (Admin)
                  <span className="th-subtext">เต็มที่ (Fixed)</span>
                </th>
              </tr>
              <tr className="auth-header-sub-row">
                {/* User actions */}
                <th className="th-action-group" colSpan="4">
                  <span className="th-action-combo">เห็น / แก้ไข / อัปเดต / ลบ</span>
                </th>
                {/* Super-User actions */}
                <th className="th-action-group" colSpan="4">
                  <span className="th-action-combo">เห็น / แก้ไข / อัปเดต / ลบ</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((row) => (
                <tr key={row.id} className="auth-data-row">
                  <td className="td-resource-name">{row.resource}</td>

                  {/* User Checkboxes */}
                  <td className="td-actions-cell" colSpan="4">
                    <div className="checkboxes-wrapper">
                      <label className="auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={row.user.view}
                          onChange={() => handleToggle(row.id, 'user', 'view')}
                        />
                        <span>เห็น</span>
                      </label>
                      <label className="auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={row.user.edit}
                          onChange={() => handleToggle(row.id, 'user', 'edit')}
                        />
                        <span>แก้ไข</span>
                      </label>
                      <label className="auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={row.user.update}
                          onChange={() => handleToggle(row.id, 'user', 'update')}
                        />
                        <span>อัปเดต</span>
                      </label>
                      <label className="auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={row.user.delete}
                          onChange={() => handleToggle(row.id, 'user', 'delete')}
                        />
                        <span>ลบ</span>
                      </label>
                    </div>
                  </td>

                  {/* Super User Checkboxes */}
                  <td className="td-actions-cell" colSpan="4">
                    <div className="checkboxes-wrapper">
                      <label className="auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={row.superUser.view}
                          onChange={() => handleToggle(row.id, 'superUser', 'view')}
                        />
                        <span>เห็น</span>
                      </label>
                      <label className="auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={row.superUser.edit}
                          onChange={() => handleToggle(row.id, 'superUser', 'edit')}
                        />
                        <span>แก้ไข</span>
                      </label>
                      <label className="auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={row.superUser.update}
                          onChange={() => handleToggle(row.id, 'superUser', 'update')}
                        />
                        <span>อัปเดต</span>
                      </label>
                      <label className="auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={row.superUser.delete}
                          onChange={() => handleToggle(row.id, 'superUser', 'delete')}
                        />
                        <span>ลบ</span>
                      </label>
                    </div>
                  </td>

                  {/* Admin (Fixed) */}
                  <td className="td-admin-fixed">
                    <span className="admin-fixed-pill">เต็มที่</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="auth-actions-footer">
          <button type="button" className="btn-auth-reset" onClick={handleReset}>
            รีเซ็ต
          </button>
          <button type="button" className="btn-auth-save" onClick={handleSave}>
            บันทึกสิทธิ์
          </button>
        </div>
      </div>
    </div>
  )
}
