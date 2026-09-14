import React from 'react'
import './SystemLogsPage.css'

export default function SystemLogsPage({ logsList = [] }) {
  const defaultLogs = [
    {
      id: 1,
      timestamp: '2025-08-30 15:42:10',
      user: 'พรชิดา สนิทเชื้อ (Super User)',
      email: 'phonchita1599@gmail.com',
      action: 'แก้ไขสิทธิ์ผู้ใช้งาน',
      details: 'เปลี่ยนบทบาทของ นายธนกร รัตนผล จาก student เป็น advisor',
      category: 'user_mgmt',
      status: 'success',
    },
    {
      id: 2,
      timestamp: '2025-08-30 11:15:33',
      user: 'พรชิดา สนิทเชื้อ (Super User)',
      email: 'phonchita1599@gmail.com',
      action: 'อัปเดต Master Data',
      details: 'เพิ่มสาขาวิชา "วิศวกรรมปัญญาประดิษฐ์และข้อมูล"',
      category: 'master_data',
      status: 'success',
    },
    {
      id: 3,
      timestamp: '2025-08-30 09:05:12',
      user: 'guest / anonymous',
      email: 'unknown@external.net',
      action: 'เข้าสู่ระบบล้มเหลว',
      details: 'กรอกรหัสผ่านผิดเกิน 3 ครั้ง สำหรับบัญชี admin@icp.ac.th',
      category: 'security',
      status: 'failed',
    },
  ]

  const activeLogs = logsList.length > 0 ? logsList : defaultLogs

  return (
    <div className="system-logs-container">
      <div className="logs-header-card">
        <div>
          <div className="logs-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>SUPER USER : AUDIT LOGS</span>
          </div>
          <h1 className="logs-title">บันทึกประวัติการใช้งานระบบ (Audit Logs)</h1>
          <p className="logs-subtitle">ติดตามการเปลี่ยนแปลงข้อมูลสำคัญและการเข้าสู่ระบบ</p>
        </div>
      </div>

      <div className="logs-table-card">
        <div className="table-responsive">
          <table className="logs-table">
            <thead>
              <tr>
                <th>วัน-เวลา</th>
                <th>ผู้ดำเนินการ</th>
                <th>การกระทำ</th>
                <th>รายละเอียด</th>
                <th style={{ textAlign: 'center' }}>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {activeLogs.map((log) => (
                <tr key={log.id}>
                  <td className="log-time-cell">{log.timestamp}</td>
                  <td>
                    <div className="log-user-block">
                      <span className="log-user-name">{log.user}</span>
                      <span className="log-user-email">{log.email}</span>
                    </div>
                  </td>
                  <td className="font-semibold text-slate-800">{log.action}</td>
                  <td className="log-details-text">{log.details}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`result-chip ${log.status === 'success' ? 'res-success' : 'res-fail'}`}>
                      {log.status === 'success' ? 'สำเร็จ' : 'ผิดพลาด'}
                    </span>
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
