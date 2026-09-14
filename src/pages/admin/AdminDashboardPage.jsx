import React, { useState } from 'react'
import '../user/DashboardPage.css'
import './AdminDashboardPage.css'

export default function AdminDashboardPage({
  groupsList = [],
  onNavigateToGroupMgmt,
  onNavigateToUserMgmt,
  onNavigateToSettings,
}) {
  // Helper for upward trend icon
  const renderTrendIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )

  // Super User Group Dashboard Streams
  const groupDashboardStreams = {
    all: {
      id: 'all',
      name: 'ภาพรวมทุกกลุ่ม DSS มทส.',
      category: 'ศูนย์บริการนักศึกษาพิการ (DSS) มหาวิทยาลัยเทคโนโลยีสุรนารี',
      readinessPct: '82.5%',
      readinessTrendValue: '+10%',
      pendingPct: '17.5% อยู่ระหว่างพัฒนา',
      activeMeterCount: 30, // out of 36
      activePlansTotal: '18 แผน',
      activePlansActive: '4 กำลังทำ',
      activePlansDone: '14 เสร็จสมบูรณ์แล้ว',
      plansMeterCount: 22,
      studyHours: '164 ชั่วโมง',
      studyHoursMonth: '+28 ชม. ในเดือนนี้',
      studyHoursTrendValue: '18%',
      certsCount: '8 ใบประกาศ',
      certsStatus: 'พร้อมยื่นสมัครงาน',
      assessLogs: '24 ครั้ง',
      assessMonth: '+4 ครั้งในรอบเดือนนี้',
      donutCenter: '82%',
      topSkills: [
        { name: 'การพัฒนาเว็บแอปพลิเคชัน & ซอฟต์แวร์', level: 'ระดับ 4', val: '85%', dot: 'turq', desc: 'สมาชิกกลุ่มสามารถเขียนโค้ดและพัฒนาโครงงานระบบจริงได้' },
        { name: 'การวิเคราะห์ข้อมูลและจัดการฐานข้อมูล', level: 'ระดับ 4', val: '80%', dot: 'blue', desc: 'ออกแบบฐานข้อมูลและใช้เครื่องมือ BI สรุปผลได้อย่างแม่นยำ' },
        { name: 'การทำงานร่วมกันเป็นทีม & การสื่อสาร', level: 'ระดับ 4', val: '95%', dot: 'purple', desc: 'ปรับตัวเข้ากับสภาพแวดล้อมการทำงานและประสานงานได้ดี' },
        { name: 'ทักษะภาษาอังกฤษและเทคโนโลยีสิ่งอำนวยความสะดวก', level: 'ระดับ 3', val: '75%', dot: 'gray', desc: 'ใช้งานโปรแกรมช่วยเหลือนักศึกษาพิการและสื่อสารพื้นฐานได้' },
      ],
      categories: [
        { name: 'ทักษะเฉพาะทางสายอาชีพ (Technical)', trendVal: '+12%', pct: '40%', dot: '#0f172a', desc: 'การเขียนโปรแกรม, วิเคราะห์ข้อมูล, ออกแบบ UI' },
        { name: 'ทักษะการทำงานร่วมกับผู้อื่น (Soft Skills)', trendVal: '+20%', pct: '25%', dot: 'turq', desc: 'ความรับผิดชอบ, การทำงานเป็นทีม, การแก้ไขปัญหา' },
        { name: 'การสื่อสารและนำเสนอผลงาน', trendVal: '+15%', pct: '20%', dot: 'blue', desc: 'การสัมภาษณ์งาน, การนำเสนอโปรเจกต์สหกิจศึกษา' },
        { name: 'คุณวุฒิและผลงาน Portfolio สหกิจศึกษา', trendVal: '+10%', pct: '15%', dot: 'gray', desc: 'Certificate มาตรฐานวิชาชีพ, ผลงานจริง' },
      ],
      plansList: [
        { id: 1, title: 'โครงการพัฒนาระบบบริหารจัดการ ICP สำหรับนักศึกษา DSS', status: 'completed', category: 'ฝึกปฏิบัติจริง', hours: '45 ชม.', score: '95/100', student: 'นายธนกร รัตนผล' },
        { id: 2, title: 'สอบมาตรฐานวิชาชีพไอที ITPE (Information Technology Professional Exam)', status: 'completed', category: 'ใบรับรอง', hours: '30 ชม.', score: 'ผ่านเกณฑ์', student: 'นายธนกร รัตนผล' },
        { id: 3, title: 'อบรมหลักสูตร Power BI & Data Analytics for Business', status: 'completed', category: 'คอร์สออนไลน์', hours: '20 ชม.', score: '100/100', student: 'น.ส.สุดารัตน์ พุ่มพวง' },
        { id: 4, title: 'ฝึกปฏิบัติการออกแบบ UI/UX Mobile App Accessible Design', status: 'completed', category: 'ฝึกปฏิบัติจริง', hours: '25 ชม.', score: '92/100', student: 'นายกิตติคุณ ศรีวิชัย' },
        { id: 5, title: 'ฝึกอบรมเตรียมความพร้อมการสัมภาษณ์งานและจัดทำ Portfolio สหกิจศึกษา', status: 'in-progress', category: 'การสื่อสาร', hours: '12/20 ชม.', score: 'กำลังทำ 60%', student: 'สมาชิกทุกคน' },
        { id: 6, title: 'ศึกษาแนวทางการประยุกต์ใช้ Generative AI ในการทำงาน', status: 'in-progress', category: 'คอร์สออนไลน์', hours: '10/15 ชม.', score: 'กำลังทำ 66%', student: 'กลุ่มเทคโนโลยี' },
      ],
      studyHoursWeeks: [
        { week: 'สัปดาห์ 1', hours: '32 ชม.', topic: 'React & Frontend Development Workshop' },
        { week: 'สัปดาห์ 2', hours: '40 ชม.', topic: 'Database Optimization & SQL Query Lab' },
        { week: 'สัปดาห์ 3', hours: '35 ชม.', topic: 'Data Visualization & Figma Prototyping' },
        { week: 'สัปดาห์ 4', hours: '38 ชม.', topic: 'Mock Interview & Resume Review Sessions' },
        { week: 'สัปดาห์ 5 (ปัจจุบัน)', hours: '19 ชม.', topic: 'Final Project Submission & Evaluation' },
      ],
      certificates: [
        { id: 1, title: 'Full-Stack Web Development Professional Certificate', issuer: 'Tech Academy & MOOC', date: '15 มิ.ย. 2568', certNo: 'TC-2025-9842', status: 'ตรวจสอบแล้ว', student: 'นายธนกร รัตนผล' },
        { id: 2, title: 'Google Data Analytics Professional Certificate', issuer: 'Google / Coursera', date: '20 พ.ค. 2568', certNo: 'G-DATA-8831', status: 'ตรวจสอบแล้ว', student: 'น.ส.สุดารัตน์ พุ่มพวง' },
        { id: 3, title: 'Certified Figma Design Professional', issuer: 'Figma Academy', date: '10 มิ.ย. 2568', certNo: 'FIG-2025-4190', status: 'ตรวจสอบแล้ว', student: 'นายกิตติคุณ ศรีวิชัย' },
        { id: 4, title: 'ITPE: Information Technology Passport Examination', issuer: 'สถาบันคุณวุฒิวิชาชีพ (มหาชน)', date: '28 เม.ย. 2568', certNo: 'ITPE-TH-6804', status: 'ตรวจสอบแล้ว', student: 'นายธนกร รัตนผล' },
      ],
      assessmentLogsList: [
        { id: 1, month: 'สิงหาคม 2568', date: '30 ส.ค. 2568', evaluator: 'คุณพรชิดา สนิทเชื้อ (Super User DSS)', score: '82.5%', passedCount: '4/4 ทักษะ', imagesCount: 3, note: 'นักศึกษาผ่านการทดสอบทักษะเขียนโปรแกรมและส่งมอบโปรเจกต์สหกิจศึกษาครบถ้วน' },
        { id: 2, month: 'กรกฎาคม 2568', date: '31 ก.ค. 2568', evaluator: 'คุณพรชิดา สนิทเชื้อ (Super User DSS)', score: '80.0%', passedCount: '4/4 ทักษะ', imagesCount: 2, note: 'ประเมินความก้าวหน้าการใช้เครื่องมือสิ่งอำนวยความสะดวกและการทำงานเป็นทีม' },
        { id: 3, month: 'มิถุนายน 2568', date: '30 มิ.ย. 2568', evaluator: 'อาจารย์ที่ปรึกษาสำนักวิชา + DSS', score: '78.0%', passedCount: '4/4 ทักษะ', imagesCount: 2, note: 'บันทึกการส่งงานตามเกณฑ์มาตรฐานสมรรถนะอาชีพ ICP' },
        { id: 4, month: 'พฤษภาคม 2568', date: '31 พ.ค. 2568', evaluator: 'คุณพรชิดา สนิทเชื้อ (Super User DSS)', score: '75.0%', passedCount: '3/4 ทักษะ', imagesCount: 1, note: 'เริ่มแผนพัฒนาทักษะรายบุคคลประจำภาคการศึกษา' },
      ],
      monthlyBars: [
        { month: 'ม.ค.', openPct: 65, closedPct: 35, total: '35% ความพร้อม', open: '4 ทักษะ', closed: '1 ทักษะ' },
        { month: 'ก.พ.', openPct: 52, closedPct: 48, total: '48% ความพร้อม', open: '3 ทักษะ', closed: '2 ทักษะ' },
        { month: 'มี.ค.', openPct: 40, closedPct: 60, total: '60% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'เม.ย.', openPct: 28, closedPct: 72, total: '72% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'พ.ค.', openPct: 25, closedPct: 75, total: '75% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'มิ.ย.', openPct: 22, closedPct: 78, total: '78% ความพร้อม', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'ก.ค.', openPct: 20, closedPct: 80, total: '80% ความพร้อม', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'ส.ค.', openPct: 18, closedPct: 82, total: '82% ความพร้อม', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'ก.ย.', openPct: 15, closedPct: 85, total: '85% (เป้าหมาย)', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'ต.ค.', openPct: 10, closedPct: 90, total: '90% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
        { month: 'พ.ย.', openPct: 8, closedPct: 92, total: '92% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
        { month: 'ธ.ค.', openPct: 5, closedPct: 95, total: '95% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
      ],
    },
    programmer: {
      id: 'programmer',
      name: 'กลุ่มสายงานโปรแกรมเมอร์ (IT)',
      category: 'สำนักวิชาเทคโนโลยีสารสนเทศ & ศูนย์ DSS',
      readinessPct: '85.0%',
      readinessTrendValue: '+12%',
      pendingPct: '15.0% อยู่ระหว่างพัฒนา',
      activeMeterCount: 31,
      activePlansTotal: '7 แผน',
      activePlansActive: '2 กำลังทำ',
      activePlansDone: '5 เสร็จสมบูรณ์แล้ว',
      plansMeterCount: 24,
      studyHours: '76 ชั่วโมง',
      studyHoursMonth: '+16 ชม. ในเดือนนี้',
      studyHoursTrendValue: '20%',
      certsCount: '3 ใบประกาศ',
      certsStatus: 'พร้อมยื่นสมัครงาน',
      assessLogs: '10 ครั้ง',
      assessMonth: '+2 ครั้งในรอบเดือนนี้',
      donutCenter: '85%',
      topSkills: [
        { name: 'เขียนโปรแกรม Full-Stack (React, Node.js, SQL)', level: 'ระดับ 4', val: '90%', dot: 'turq', desc: 'พัฒนาเว็บแอปพลิเคชันเชื่อมต่อฐานข้อมูลได้อย่างสมบูรณ์' },
        { name: 'การจัดการฐานข้อมูล & Query Optimization', level: 'ระดับ 4', val: '85%', dot: 'blue', desc: 'ออกแบบ ER-Diagram และเขียนคำสั่ง SQL ซับซ้อนได้' },
        { name: 'การทำงานร่วมกันแบบ Agile & Version Control', level: 'ระดับ 4', val: '95%', dot: 'purple', desc: 'ใช้งาน Git/GitHub และส่งมอบงานตรงตาม Sprint' },
        { name: 'Web Accessibility & มาตรฐาน WCAG', level: 'ระดับ 4', val: '85%', dot: 'gray', desc: 'พัฒนาเว็บไซต์ที่รองรับ Screen Reader และคีย์บอร์ด' },
      ],
      categories: [
        { name: 'ทักษะทางเทคนิคโค้ดดิ้ง', trendVal: '+15%', pct: '45%', dot: '#0f172a', desc: 'Full-Stack, SQL, RESTful API' },
        { name: 'ทักษะร่วมกับผู้อื่น (Agile/Scrum)', trendVal: '+20%', pct: '25%', dot: 'turq', desc: 'การทำงานเป็นทีม, การแก้ไขบั๊ก' },
        { name: 'การสื่อสารและนำเสนอ Technical', trendVal: '+10%', pct: '15%', dot: 'blue', desc: 'Code Review, การอธิบายสถาปัตยกรรม' },
        { name: 'คุณวุฒิและใบรับรอง', trendVal: '+12%', pct: '15%', dot: 'gray', desc: 'ITPE, Certificate สากล' },
      ],
      plansList: [
        { id: 1, title: 'พัฒนาเว็บแอปพลิเคชันระบบจัดการร้านค้า (E-Commerce Full-Stack)', status: 'completed', category: 'ฝึกปฏิบัติจริง', hours: '35 ชม.', score: '95/100', student: 'นายธนกร รัตนผล' },
        { id: 2, title: 'สอบมาตรฐานวิชาชีพไอที ITPE', status: 'completed', category: 'ใบรับรอง', hours: '20 ชม.', score: 'ผ่านเกณฑ์', student: 'นายธนกร รัตนผล' },
      ],
      studyHoursWeeks: [
        { week: 'สัปดาห์ 1', hours: '14 ชม.', topic: 'React State Management & Redux Toolkit' },
        { week: 'สัปดาห์ 2', hours: '22 ชม.', topic: 'PostgreSQL Database Indexing & Performance' },
        { week: 'สัปดาห์ 3', hours: '18 ชม.', topic: 'TypeScript Integration & Backend API' },
        { week: 'สัปดาห์ 4', hours: '20 ชม.', topic: 'Docker Containerization & CI/CD Pipelines' },
        { week: 'สัปดาห์ 5 (ปัจจุบัน)', hours: '12 ชม.', topic: 'Unit Testing with Jest' },
      ],
      certificates: [
        { id: 1, title: 'Full-Stack Web Development Professional Certificate', issuer: 'Tech Academy & MOOC', date: '15 มิ.ย. 2568', certNo: 'TC-2025-9842', status: 'ตรวจสอบแล้ว', student: 'นายธนกร รัตนผล' },
      ],
      assessmentLogsList: [
        { id: 1, month: 'สิงหาคม 2568', date: '30 ส.ค. 2568', evaluator: 'คุณพรชิดา สนิทเชื้อ (Super User DSS)', score: '85.0%', passedCount: '4/4 ทักษะ', imagesCount: 3, note: 'ผลงานโดดเด่นมาก แนะนำให้ส่งใบสมัครเข้าร่วมงานกับสถานประกอบการเครือข่าย' },
      ],
      monthlyBars: [
        { month: 'ม.ค.', openPct: 60, closedPct: 40, total: '40% ความพร้อม', open: '4 ทักษะ', closed: '1 ทักษะ' },
        { month: 'ก.พ.', openPct: 48, closedPct: 52, total: '52% ความพร้อม', open: '3 ทักษะ', closed: '2 ทักษะ' },
        { month: 'มี.ค.', openPct: 35, closedPct: 65, total: '65% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'เม.ย.', openPct: 25, closedPct: 75, total: '75% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'พ.ค.', openPct: 22, closedPct: 78, total: '78% ความพร้อม', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'มิ.ย.', openPct: 20, closedPct: 80, total: '80% ความพร้อม', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'ก.ค.', openPct: 18, closedPct: 82, total: '82% ความพร้อม', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'ส.ค.', openPct: 15, closedPct: 85, total: '85% ความพร้อม', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'ก.ย.', openPct: 10, closedPct: 90, total: '90% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
        { month: 'ต.ค.', openPct: 8, closedPct: 92, total: '92% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
        { month: 'พ.ย.', openPct: 5, closedPct: 95, total: '95% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
        { month: 'ธ.ค.', openPct: 2, closedPct: 98, total: '98% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
      ],
    },
    'data-analyst': {
      id: 'data-analyst',
      name: 'กลุ่มสายงานวิเคราะห์ข้อมูล (Data Analyst)',
      category: 'สำนักวิชาเทคโนโลยีสารสนเทศ & สังคม',
      readinessPct: '74.0%',
      readinessTrendValue: '+14%',
      pendingPct: '26.0% อยู่ระหว่างพัฒนา',
      activeMeterCount: 26,
      activePlansTotal: '5 แผน',
      activePlansActive: '2 กำลังทำ',
      activePlansDone: '3 เสร็จสมบูรณ์แล้ว',
      plansMeterCount: 16,
      studyHours: '58 ชั่วโมง',
      studyHoursMonth: '+12 ชม. ในเดือนนี้',
      studyHoursTrendValue: '15%',
      certsCount: '2 ใบประกาศ',
      certsStatus: 'ได้รับใบรับรอง Google Data',
      assessLogs: '8 ครั้ง',
      assessMonth: '+1 ครั้งในรอบเดือนนี้',
      donutCenter: '74%',
      topSkills: [
        { name: 'การวิเคราะห์ข้อมูลด้วย Python & SQL', level: 'ระดับ 3', val: '75%', dot: 'turq', desc: 'ทำ Data Cleaning และเขียน Query สรุปข้อมูล' },
        { name: 'Data Visualization (Power BI)', level: 'ระดับ 4', val: '85%', dot: 'blue', desc: 'สร้าง Interactive Dashboard เพื่อการวิเคราะห์' },
        { name: 'Data Storytelling & รายงานผล', level: 'ระดับ 3', val: '70%', dot: 'purple', desc: 'สื่อสารข้อค้นพบจากข้อมูลให้เข้าใจง่าย' },
        { name: 'สถิติพื้นฐานเพื่องานวิเคราะห์', level: 'ระดับ 3', val: '65%', dot: 'gray', desc: 'การทดสอบสมมติฐานและการกระจายตัวของข้อมูล' },
      ],
      categories: [
        { name: 'ทักษะทางเทคนิค (Python/SQL)', trendVal: '+18%', pct: '45%', dot: '#0f172a', desc: 'Data Analytics, SQL Query' },
        { name: 'ความเข้าใจเชิงธุรกิจ (Business Sense)', trendVal: '+15%', pct: '25%', dot: 'turq', desc: 'การวิเคราะห์ตัวชี้วัด KPI' },
        { name: 'การสื่อสารและนำเสนอข้อมูล', trendVal: '+20%', pct: '20%', dot: 'blue', desc: 'Data Storytelling' },
        { name: 'คุณวุฒิและใบรับรอง', trendVal: '+10%', pct: '10%', dot: 'gray', desc: 'Google Data Certificate' },
      ],
      plansList: [
        { id: 1, title: 'สร้าง Sales Performance Dashboard ด้วย Power BI', status: 'completed', category: 'ฝึกปฏิบัติจริง', hours: '20 ชม.', score: '92/100', student: 'น.ส.สุดารัตน์ พุ่มพวง' },
      ],
      studyHoursWeeks: [
        { week: 'สัปดาห์ 1', hours: '12 ชม.', topic: 'Power BI DAX Formulas' },
        { week: 'สัปดาห์ 2', hours: '15 ชม.', topic: 'Python Pandas & Data Cleaning' },
      ],
      certificates: [
        { id: 1, title: 'Google Data Analytics Professional Certificate', issuer: 'Google / Coursera', date: '20 พ.ค. 2568', certNo: 'G-DATA-8831', status: 'ตรวจสอบแล้ว', student: 'น.ส.สุดารัตน์ พุ่มพวง' },
      ],
      assessmentLogsList: [
        { id: 1, month: 'สิงหาคม 2568', date: '28 ส.ค. 2568', evaluator: 'คุณพรชิดา สนิทเชื้อ (Super User DSS)', score: '74.0%', passedCount: '3/4 ทักษะ', imagesCount: 2, note: 'พัฒนาด้าน Power BI ได้ยอดเยี่ยม แนะนำให้ฝึก SQL Window Functions เพิ่มเติม' },
      ],
      monthlyBars: [
        { month: 'ม.ค.', openPct: 70, closedPct: 30, total: '30% ความพร้อม', open: '4 ทักษะ', closed: '1 ทักษะ' },
        { month: 'ก.พ.', openPct: 60, closedPct: 40, total: '40% ความพร้อม', open: '3 ทักษะ', closed: '2 ทักษะ' },
        { month: 'มี.ค.', openPct: 50, closedPct: 50, total: '50% ความพร้อม', open: '3 ทักษะ', closed: '2 ทักษะ' },
        { month: 'เม.ย.', openPct: 42, closedPct: 58, total: '58% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'พ.ค.', openPct: 36, closedPct: 64, total: '64% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'มิ.ย.', openPct: 32, closedPct: 68, total: '68% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'ก.ค.', openPct: 28, closedPct: 72, total: '72% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'ส.ค.', openPct: 26, closedPct: 74, total: '74% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'ก.ย.', openPct: 20, closedPct: 80, total: '80% (เป้าหมาย)', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'ต.ค.', openPct: 15, closedPct: 85, total: '85% (เป้าหมาย)', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'พ.ย.', openPct: 12, closedPct: 88, total: '88% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
        { month: 'ธ.ค.', openPct: 8, closedPct: 92, total: '92% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
      ],
    },
    'ui-ux': {
      id: 'ui-ux',
      name: 'กลุ่มสายงานออกแบบ UI/UX & กราฟิก',
      category: 'สำนักวิชาวิศวกรรมศาสตร์ & ดีไซน์',
      readinessPct: '78.5%',
      readinessTrendValue: '+8%',
      pendingPct: '21.5% อยู่ระหว่างพัฒนา',
      activeMeterCount: 28,
      activePlansTotal: '6 แผน',
      activePlansActive: '2 กำลังทำ',
      activePlansDone: '4 เสร็จสมบูรณ์แล้ว',
      plansMeterCount: 18,
      studyHours: '64 ชั่วโมง',
      studyHoursMonth: '+14 ชม. ในเดือนนี้',
      studyHoursTrendValue: '20%',
      certsCount: '2 ใบประกาศ',
      certsStatus: 'ใบรับรอง Figma Design',
      assessLogs: '9 ครั้ง',
      assessMonth: '+2 ครั้งในรอบเดือนนี้',
      donutCenter: '78%',
      topSkills: [
        { name: 'Wireframe & Interactive Prototype (Figma)', level: 'ระดับ 4', val: '90%', dot: 'turq', desc: 'สร้างต้นแบบแอปพลิเคชันและทดสอบการใช้งาน' },
        { name: 'Design System & Accessible Color WCAG', level: 'ระดับ 4', val: '85%', dot: 'blue', desc: 'กำหนดมาตรฐานสีและฟอนต์สำหรับทุกคน' },
        { name: 'User Research & สรุปผลความต้องการผู้ใช้', level: 'ระดับ 3', val: '70%', dot: 'purple', desc: 'สัมภาษณ์และสร้าง User Journey' },
        { name: 'Design Handoff ส่งมอบงานให้โปรแกรมเมอร์', level: 'ระดับ 4', val: '80%', dot: 'gray', desc: 'จัดทำ Specs และ Assets ให้กับทีมพัฒนา' },
      ],
      categories: [
        { name: 'ทักษะการออกแบบ UI/UX', trendVal: '+15%', pct: '40%', dot: '#0f172a', desc: 'Figma, Design System' },
        { name: 'ความเข้าใจผู้ใช้งาน (Empathy)', trendVal: '+20%', pct: '25%', dot: 'turq', desc: 'User Research, Accessibility' },
        { name: 'การนำเสนอและสื่อสารดีไซน์', trendVal: '+12%', pct: '20%', dot: 'blue', desc: 'Design Presentation' },
        { name: 'ผลงาน Portfolio ออนไลน์', trendVal: '+10%', pct: '15%', dot: 'gray', desc: 'Case Studies' },
      ],
      plansList: [
        { id: 1, title: 'สร้าง Design System ฉบับสมบูรณ์บน Figma', status: 'completed', category: 'ฝึกปฏิบัติจริง', hours: '18 ชม.', score: '90/100', student: 'นายกิตติคุณ ศรีวิชัย' },
      ],
      studyHoursWeeks: [
        { week: 'สัปดาห์ 1', hours: '14 ชม.', topic: 'Figma Auto-Layout' },
        { week: 'สัปดาห์ 2', hours: '16 ชม.', topic: 'Design Systems Library' },
      ],
      certificates: [
        { id: 1, title: 'Certified Figma Design Professional', issuer: 'Figma Academy', date: '10 มิ.ย. 2568', certNo: 'FIG-2025-4190', status: 'ตรวจสอบแล้ว', student: 'นายกิตติคุณ ศรีวิชัย' },
      ],
      assessmentLogsList: [
        { id: 1, month: 'สิงหาคม 2568', date: '29 ส.ค. 2568', evaluator: 'คุณพรชิดา สนิทเชื้อ (Super User DSS)', score: '78.5%', passedCount: '4/4 ทักษะ', imagesCount: 4, note: 'ออกแบบ UI ระบบได้สวยงามและคำนึงถึง Accessibility อย่างดีเยี่ยม' },
      ],
      monthlyBars: [
        { month: 'ม.ค.', openPct: 68, closedPct: 32, total: '32% ความพร้อม', open: '4 ทักษะ', closed: '1 ทักษะ' },
        { month: 'ก.พ.', openPct: 55, closedPct: 45, total: '45% ความพร้อม', open: '3 ทักษะ', closed: '2 ทักษะ' },
        { month: 'มี.ค.', openPct: 46, closedPct: 54, total: '54% ความพร้อม', open: '3 ทักษะ', closed: '2 ทักษะ' },
        { month: 'เม.ย.', openPct: 38, closedPct: 62, total: '62% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'พ.ค.', openPct: 30, closedPct: 70, total: '70% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'มิ.ย.', openPct: 26, closedPct: 74, total: '74% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'ก.ค.', openPct: 24, closedPct: 76, total: '76% ความพร้อม', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'ส.ค.', openPct: 21, closedPct: 78, total: '78% ความพร้อม', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'ก.ย.', openPct: 16, closedPct: 84, total: '84% (เป้าหมาย)', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'ต.ค.', openPct: 12, closedPct: 88, total: '88% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
        { month: 'พ.ย.', openPct: 8, closedPct: 92, total: '92% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
        { month: 'ธ.ค.', openPct: 5, closedPct: 95, total: '95% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
      ],
    },
  }

  // Selected Group / Stream State
  const [selectedStreamId, setSelectedStreamId] = useState('all')
  const activeStream = groupDashboardStreams[selectedStreamId] || groupDashboardStreams.all

  // Filter States
  const [yearFilter, setYearFilter] = useState('2568')
  const [activeMonthIdx, setActiveMonthIdx] = useState(7) // August (Index 7)

  // Interactive Modal State (null | 'readiness' | 'plans' | 'topSkills' | 'categories' | 'monthDetail' | 'studyHours' | 'certs' | 'assessLogs')
  const [activeModal, setActiveModal] = useState(null)

  const activeMonth = activeStream.monthlyBars[activeMonthIdx]

  return (
    <div className="ronasit-dashboard-container">
      {/* 1. Header & Greeting Bar (Identical Layout to User Dashboard) */}
      <header className="ronasit-header-bar">
        <div className="ronasit-greeting-left-group">
          <div className="ronasit-app-brand-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="ronasit-greeting-text-block">
            <h1 className="ronasit-greeting-title">ยินดีต้อนรับ, คุณพรชิดา สนิทเชื้อ (Super User DSS)</h1>
            <p className="ronasit-greeting-subtitle">
              ภาพรวมการติดตามและประเมินผลกลุ่ม: <strong style={{ color: '#2563eb' }}>{activeStream.name}</strong> ({activeStream.category})
            </p>
          </div>
        </div>

        <div className="ronasit-header-right">
          <div className="ronasit-sync-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            <span>อัปเดตล่าสุด: <strong style={{ color: '#1e293b' }}>วันนี้</strong></span>
          </div>

          <button
            type="button"
            className="ronasit-btn-quick-assess"
            onClick={onNavigateToGroupMgmt}
            title="ไปที่หน้าจัดการกลุ่มและบันทึกผลการประเมิน"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>จัดการกลุ่ม & บันทึกผล</span>
          </button>
        </div>
      </header>

      {/* 2. Group Stream Selector Bar (Clean Pill Buttons) */}
      <section className="dashboard-career-filter-card">
        <div className="career-filter-title">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <span>เลือกกลุ่มเป้าหมายเพื่อวิเคราะห์:</span>
        </div>

        <div className="career-filter-pills-row">
          <button
            type="button"
            className={`dashboard-career-pill-btn ${selectedStreamId === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedStreamId('all')}
          >
            <span>ภาพรวมทุกกลุ่ม DSS</span>
            <span className="career-readiness-chip">82.5%</span>
          </button>

          <button
            type="button"
            className={`dashboard-career-pill-btn ${selectedStreamId === 'programmer' ? 'active' : ''}`}
            onClick={() => setSelectedStreamId('programmer')}
          >
            <span>กลุ่มโปรแกรมเมอร์ (IT)</span>
            <span className="career-readiness-chip">85.0%</span>
          </button>

          <button
            type="button"
            className={`dashboard-career-pill-btn ${selectedStreamId === 'data-analyst' ? 'active' : ''}`}
            onClick={() => setSelectedStreamId('data-analyst')}
          >
            <span>กลุ่มวิเคราะห์ข้อมูล (Data)</span>
            <span className="career-readiness-chip">74.0%</span>
          </button>

          <button
            type="button"
            className={`dashboard-career-pill-btn ${selectedStreamId === 'ui-ux' ? 'active' : ''}`}
            onClick={() => setSelectedStreamId('ui-ux')}
          >
            <span>กลุ่มออกแบบ UI/UX</span>
            <span className="career-readiness-chip">78.5%</span>
          </button>
        </div>
      </section>

      {/* 3. Main 2-Column Dashboard Grid (Exact Ronasit Layout of DashboardPage) */}
      <div className="ronasit-dashboard-grid">
        {/* Left Column: 2 Metric Cards + 2 Analytics Cards + 1 Monthly Evolution Chart */}
        <div className="ronasit-left-col">
          {/* Top Row: Group Readiness & Active Action Plans */}
          <div className="ronasit-top-metrics-row">
            {/* Card 1: ความพร้อมเฉลี่ยของกลุ่ม */}
            <div
              className="ronasit-metric-card clickable-card"
              onClick={() => setActiveModal('readiness')}
              title="คลิกเพื่อดูรายละเอียดความพร้อมของกลุ่ม"
            >
              <div className="ronasit-card-header-row">
                <h3 className="ronasit-card-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  <span>ความพร้อมของกลุ่ม "{activeStream.name}"</span>
                </h3>
                <span className="card-clickable-hint">คลิกดู ↗</span>
              </div>

              <div className="ronasit-big-number-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="ronasit-metric-big">{activeStream.readinessPct}</span>
                  <span className="ronasit-trend-pill">
                    {renderTrendIcon()}
                    <span>{activeStream.readinessTrendValue}</span>
                  </span>
                </div>
                <span className="ronasit-pending-label">{activeStream.pendingPct}</span>
              </div>

              {/* Segmented Ticks Meter */}
              <div className="ronasit-ticks-meter-wrap">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`ronasit-tick ${i < activeStream.activeMeterCount - 3 ? '' : i < activeStream.activeMeterCount ? 'active-blue' : 'inactive'}`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Card 2: แผนพัฒนาที่ดำเนินการในกลุ่ม */}
            <div
              className="ronasit-metric-card clickable-card"
              onClick={() => setActiveModal('plans')}
              title="คลิกเพื่อดูรายการแผนพัฒนาตนเองของสมาชิกในกลุ่ม"
            >
              <div className="ronasit-card-header-row">
                <h3 className="ronasit-card-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>แผนพัฒนาที่ดำเนินการในกลุ่มนี้</span>
                </h3>
                <span className="card-clickable-hint">คลิกดู ↗</span>
              </div>

              <div className="ronasit-big-number-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="ronasit-metric-big">{activeStream.activePlansTotal}</span>
                  <span className="ronasit-trend-pill" style={{ backgroundColor: '#eff6ff', color: '#1d4ed8' }}>
                    {activeStream.activePlansActive}
                  </span>
                </div>
                <span className="ronasit-pending-label">{activeStream.activePlansDone}</span>
              </div>

              {/* Segmented Ticks Meter */}
              <div className="ronasit-ticks-meter-wrap">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`ronasit-tick ${i < activeStream.plansMeterCount ? 'active-blue' : 'inactive'}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Row: Top Skills & Categories */}
          <div className="ronasit-middle-row">
            {/* Mid Card 1: ทักษะโดดเด่นประจำกลุ่ม */}
            <div
              className="ronasit-mid-card clickable-card"
              onClick={() => setActiveModal('topSkills')}
              title="คลิกเพื่อดูรายละเอียดสมรรถนะทั้งหมด"
            >
              <div className="ronasit-card-header-row">
                <h3 className="ronasit-card-title">ทักษะโดดเด่น ({activeStream.name})</h3>
                <span className="card-clickable-hint">ดูทั้งหมด ↗</span>
              </div>

              <div className="ronasit-skills-overview-wrap">
                {/* Segmented Stack Column */}
                <div className="ronasit-segmented-stack-bar">
                  <div className="ronasit-stack-segment seg-1"></div>
                  <div className="ronasit-stack-segment seg-2"></div>
                  <div className="ronasit-stack-segment seg-3"></div>
                </div>

                {/* Skills Rows List */}
                <div className="ronasit-skills-list">
                  {activeStream.topSkills.map((sk, idx) => (
                    <div key={idx} className="ronasit-skill-row">
                      <span className="ronasit-skill-name-col">
                        <span className={`ronasit-skill-dot ${sk.dot}`}></span>
                        <span>{sk.name}</span>
                      </span>
                      <span className="ronasit-skill-pct">{sk.level}</span>
                      <span className="ronasit-skill-val">{sk.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mid Card 2: สัดส่วนทักษะตามหมวดหมู่ ICP */}
            <div
              className="ronasit-mid-card clickable-card"
              onClick={() => setActiveModal('categories')}
              title="คลิกเพื่อดูสัดส่วนและรายละเอียดหมวดหมู่สมรรถนะ"
            >
              <div className="ronasit-card-header-row">
                <h3 className="ronasit-card-title">สัดส่วนทักษะตามหมวดหมู่</h3>
                <span className="card-clickable-hint">รายละเอียด ↗</span>
              </div>

              <div className="ronasit-donut-section">
                {/* Donut Chart SVG */}
                <div className="ronasit-donut-graphic-wrap">
                  <svg width="100" height="100" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#0f172a" strokeWidth="6" strokeDasharray="35 65" strokeDashoffset="25" />
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#2dd4bf" strokeWidth="6" strokeDasharray="25 75" strokeDashoffset="90" />
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#3b82f6" strokeWidth="6" strokeDasharray="20 80" strokeDashoffset="65" />
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#cbd5e1" strokeWidth="6" strokeDasharray="20 80" strokeDashoffset="45" />
                  </svg>
                  <div className="ronasit-donut-center-text">{activeStream.donutCenter}</div>
                </div>

                {/* Legends with Trend Chips */}
                <div className="ronasit-donut-legends">
                  {activeStream.categories.map((cat, idx) => (
                    <div key={idx} className="ronasit-donut-legend-item">
                      <span className="ronasit-donut-legend-name">
                        <span className={`ronasit-skill-dot ${cat.dot.startsWith('#') ? '' : cat.dot}`} style={cat.dot.startsWith('#') ? { backgroundColor: cat.dot } : {}}></span>
                        <span>{cat.name}</span>
                      </span>
                      <span className="ronasit-donut-trend-chip">
                        {renderTrendIcon()}
                        <span>{cat.trendVal}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card: Monthly Evolution Bar Chart (Exact User Dashboard Styling) */}
          <div
            className="ronasit-monthly-chart-card clickable-card"
            onClick={() => setActiveModal('monthDetail')}
            title="คลิกเพื่อดูสรุปผลประเมินรายเดือนแบบละเอียด"
          >
            <div className="ronasit-chart-top-bar">
              <div className="ronasit-chart-title-group">
                <h3 className="ronasit-card-title">ความก้าวหน้ารายเดือน: {activeStream.name}</h3>
                <div className="ronasit-chart-legends-group">
                  <span><span className="ronasit-chart-legend-circle open"></span>กำลังพัฒนา (In Progress)</span>
                  <span><span className="ronasit-chart-legend-circle closed"></span>ผ่านเกณฑ์เป้าหมาย (Mastered)</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="card-clickable-hint">คลิกดูสรุปรายเดือน ↗</span>
                <select
                  className="ronasit-filter-dropdown-select"
                  value={yearFilter}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  <option value="2568">ปี 2568 (ปัจจุบัน)</option>
                  <option value="2567">ปี 2567</option>
                </select>
              </div>
            </div>

            {/* Pillar Bar Chart */}
            <div className="ronasit-bars-chart-container">
              {activeStream.monthlyBars.map((item, idx) => {
                const isActive = activeMonthIdx === idx
                return (
                  <div
                    key={item.month}
                    className="ronasit-month-bar-col"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveMonthIdx(idx)
                      setActiveModal('monthDetail')
                    }}
                    title={`คลิกดูรายละเอียดเดือน ${item.month}`}
                  >
                    {/* Floating Tooltip for Active Month */}
                    {isActive && (
                      <div className="ronasit-floating-dark-tooltip">
                        <span><strong>{item.total}</strong> ({activeStream.name})</span>
                        <span style={{ color: '#93c5fd' }}>○ {item.open} อยู่ระหว่างพัฒนา</span>
                        <span style={{ color: '#60a5fa' }}>● {item.closed} ผ่านเกณฑ์เป้าหมาย</span>
                      </div>
                    )}

                    {/* Rounded Pillar Bar */}
                    <div className="ronasit-pillar-bar" style={{ height: `${item.openPct + item.closedPct}%` }}>
                      <div className="ronasit-pillar-top-striped" style={{ height: `${item.openPct}%` }}></div>
                      <div
                        className={`ronasit-pillar-bottom-solid ${isActive ? 'active' : ''}`}
                        style={{ height: `${item.closedPct}%` }}
                      ></div>
                    </div>

                    <span className={`ronasit-month-label ${isActive ? 'active' : ''}`}>
                      {item.month}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: 3 Stacked Widgets (Identical Layout & CSS of DashboardPage) */}
        <div className="ronasit-right-col">
          {/* Widget 1: ชั่วโมงการเรียนรู้สะสม (Study Hours) */}
          <div
            className="ronasit-widget-blue-gradient clickable-card"
            onClick={() => setActiveModal('studyHours')}
            title="คลิกเพื่อดูสรุปชั่วโมงเรียนรู้และหลักสูตรที่สะสม"
          >
            <div className="ronasit-widget-top-row">
              <span className="ronasit-widget-title-white">ชั่วโมงเรียนรู้กลุ่ม: {activeStream.name}</span>
              <span className="card-clickable-hint white">ดูบันทึก ↗</span>
            </div>

            <div>
              <div className="ronasit-widget-big-white">{activeStream.studyHours}</div>
              <div className="ronasit-widget-sub-white">
                <span>{activeStream.studyHoursMonth}</span>
                <span style={{ color: '#93c5fd', display: 'inline-flex', alignItems: 'center', gap: '2px', marginLeft: '6px' }}>
                  {renderTrendIcon()}
                  <span>{activeStream.studyHoursTrendValue}</span>
                </span>
              </div>
            </div>

            {/* Mini Pillar Bars */}
            <div className="ronasit-blue-mini-bars">
              <div className="ronasit-blue-pillar" style={{ height: '50%' }} title="สัปดาห์ 1"></div>
              <div className="ronasit-blue-pillar" style={{ height: '75%' }} title="สัปดาห์ 2"></div>
              <div className="ronasit-blue-pillar" style={{ height: '60%' }} title="สัปดาห์ 3"></div>
              <div className="ronasit-blue-pillar" style={{ height: '90%' }} title="สัปดาห์ 4"></div>
              <div className="ronasit-blue-pillar" style={{ height: '70%' }} title="สัปดาห์ 5"></div>
              <div className="ronasit-blue-pillar striped" style={{ height: '80%' }} title="สัปดาห์ปัจจุบัน: กำลังสะสม"></div>
            </div>
          </div>

          {/* Widget 2: แฟ้มสะสมงาน & ใบรับรอง (Portfolio & Certs) */}
          <div
            className="ronasit-widget-credits-card clickable-card"
            onClick={() => setActiveModal('certs')}
            title="คลิกเพื่อเปิดดูแฟ้มใบประกาศนียบัตรและผลงาน"
          >
            <div className="ronasit-widget-top-row">
              <span className="ronasit-card-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>ใบประกาศ & ผลงานกลุ่ม</span>
              </span>
              <span className="card-clickable-hint">เปิดดู ↗</span>
            </div>

            <div className="ronasit-credits-big-row">
              <div>
                <span className="ronasit-credits-big-val">{activeStream.certsCount}</span>
                <div className="ronasit-credits-used-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{activeStream.certsStatus}</span>
                </div>
              </div>

              <button
                type="button"
                className="ronasit-credits-plus-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveModal('certs')
                }}
                title="เปิดแฟ้มใบประกาศนียบัตร"
              >
                +
              </button>
            </div>
          </div>

          {/* Widget 3: ประวัติการประเมินตนเอง (Assessment Logs) */}
          <div
            className="ronasit-widget-dark-card clickable-card"
            onClick={() => setActiveModal('assessLogs')}
            title="คลิกเพื่อดูประวัติการประเมินกลุ่มทั้งหมด"
          >
            <div className="ronasit-widget-top-row">
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#ffffff' }}>
                บันทึกการประเมิน ({activeStream.name})
              </span>
              <span className="card-clickable-hint light-blue">ดูประวัติ ↗</span>
            </div>

            <div>
              <div className="ronasit-dark-big-number">{activeStream.assessLogs}</div>
              <div className="ronasit-dark-sub-label">
                <span>{activeStream.assessMonth}</span>
                <span className="ronasit-dark-sub-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  {renderTrendIcon()}
                  <span>100%</span>
                </span>
              </div>
            </div>

            {/* Smooth Wave SVG */}
            <div className="ronasit-dark-wave-container">
              <svg width="100%" height="100%" viewBox="0 0 200 48" fill="none">
                <path
                  d="M 10 38 C 50 38, 70 12, 100 24 C 130 36, 150 44, 190 32"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          Interactive Detail Pop-up Modals (Exact User Dashboard Styling)
          ======================================================== */}
      {activeModal && (
        <div className="dashboard-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="dashboard-modal-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="dashboard-modal-header">
              <div className="dashboard-modal-header-left">
                {activeModal === 'readiness' && (
                  <>
                    <div className="modal-header-badge blue">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="dashboard-modal-title">วิเคราะห์ความพร้อมของกลุ่ม "{activeStream.name}"</h3>
                      <p className="dashboard-modal-subtitle">คะแนนความพร้อมรวม {activeStream.readinessPct} ({activeStream.category})</p>
                    </div>
                  </>
                )}

                {activeModal === 'plans' && (
                  <>
                    <div className="modal-header-badge green">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="dashboard-modal-title">แผนพัฒนาที่ดำเนินการในกลุ่ม "{activeStream.name}"</h3>
                      <p className="dashboard-modal-subtitle">ทั้งหมด {activeStream.activePlansTotal} ({activeStream.activePlansDone})</p>
                    </div>
                  </>
                )}

                {activeModal === 'topSkills' && (
                  <>
                    <div className="modal-header-badge purple">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="dashboard-modal-title">ทักษะโดดเด่นประจำกลุ่ม "{activeStream.name}"</h3>
                      <p className="dashboard-modal-subtitle">สมรรถนะที่ผ่านการประเมินและการฝึกปฏิบัติ</p>
                    </div>
                  </>
                )}

                {activeModal === 'categories' && (
                  <>
                    <div className="modal-header-badge blue">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="dashboard-modal-title">สัดส่วนทักษะตามหมวดหมู่ ICP</h3>
                      <p className="dashboard-modal-subtitle">น้ำหนักสมรรถนะทั้ง 4 ด้านประจำกลุ่ม "{activeStream.name}"</p>
                    </div>
                  </>
                )}

                {activeModal === 'monthDetail' && (
                  <>
                    <div className="modal-header-badge amber">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="dashboard-modal-title">สรุปผลประเมินเดือน {activeMonth.month} 2568</h3>
                      <p className="dashboard-modal-subtitle">สถานะความพร้อม {activeMonth.total} ({activeStream.name})</p>
                    </div>
                  </>
                )}

                {activeModal === 'studyHours' && (
                  <>
                    <div className="modal-header-badge blue">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="dashboard-modal-title">ชั่วโมงเรียนรู้และฝึกปฏิบัติกลุ่ม</h3>
                      <p className="dashboard-modal-subtitle">สะสมรวม {activeStream.studyHours} ({activeStream.studyHoursMonth})</p>
                    </div>
                  </>
                )}

                {activeModal === 'certs' && (
                  <>
                    <div className="modal-header-badge purple">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="dashboard-modal-title">แฟ้มใบประกาศนียบัตร & ผลงานกลุ่ม</h3>
                      <p className="dashboard-modal-subtitle">ได้รับการรับรองแล้ว {activeStream.certsCount} ({activeStream.certsStatus})</p>
                    </div>
                  </>
                )}

                {activeModal === 'assessLogs' && (
                  <>
                    <div className="modal-header-badge green">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="dashboard-modal-title">ประวัติการบันทึกผลการประเมินกลุ่ม</h3>
                      <p className="dashboard-modal-subtitle">บันทึกสะสม {activeStream.assessLogs} ({activeStream.assessMonth})</p>
                    </div>
                  </>
                )}
              </div>

              <button
                type="button"
                className="dashboard-modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="ปิดหน้าต่าง"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="dashboard-modal-body">
              {activeModal === 'readiness' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="modal-readiness-hero-card">
                    <div className="modal-readiness-left">
                      <span className="modal-readiness-metric-big">{activeStream.readinessPct}</span>
                      <span className="modal-readiness-trend-tag">
                        {renderTrendIcon()} {activeStream.readinessTrendValue} ในเดือนนี้
                      </span>
                    </div>
                    <div className="modal-readiness-right">
                      <h4 className="modal-section-heading" style={{ color: '#1e40af', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" />
                          <circle cx="12" cy="12" r="2" />
                        </svg>
                        <span>สรุปความพร้อมสู่เป้าหมายอาชีพ</span>
                      </h4>
                      <p className="modal-readiness-desc">
                        สมาชิกในกลุ่มมีระดับความพร้อมเฉลี่ยอยู่ที่ <strong style={{ color: '#1e40af' }}>{activeStream.readinessPct}</strong> ผ่านเกณฑ์การประเมินสมรรถนะหลัก สามารถส่งต่อสถานประกอบการเพื่อการฝึกงานหรือสหกิจศึกษาได้
                      </p>
                    </div>
                  </div>

                  <h4 className="modal-section-heading" style={{ marginTop: '6px', fontSize: '15px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>เกณฑ์ทักษะและความเชี่ยวชาญของกลุ่ม</span>
                  </h4>
                  <div className="modal-skills-list-grid">
                    {activeStream.topSkills.map((sk, idx) => (
                      <div key={idx} className="modal-skill-card-item">
                        <div className="modal-sk-top">
                          <span className="modal-sk-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb', display: 'inline-block', flexShrink: 0 }}></span>
                            <span>{sk.name}</span>
                          </span>
                          <span className="modal-sk-val">{sk.level} • {sk.val}</span>
                        </div>
                        <p className="modal-sk-desc">{sk.desc}</p>
                        <div className="modal-sk-progress-bar">
                          <div className="modal-sk-progress-fill" style={{ width: sk.val }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModal === 'plans' && (
                <div className="modal-plans-list">
                  {activeStream.plansList.map((plan) => (
                    <div key={plan.id} className="modal-plan-row-card">
                      <div className="modal-plan-left">
                        <span className={`modal-plan-status-icon ${plan.status === 'completed' ? 'done' : 'doing'}`}>
                          {plan.status === 'completed' ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                          )}
                        </span>
                        <div>
                          <div className="modal-plan-title-text">{plan.title}</div>
                          <div className="modal-plan-meta-sub">
                            {plan.student && (
                              <span style={{ color: '#2563eb', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                  <circle cx="12" cy="7" r="4" />
                                </svg>
                                <span>{plan.student} • </span>
                              </span>
                            )}
                            หมวด: {plan.category} • เวลา: {plan.hours} • ผลประเมิน: <strong>{plan.score}</strong>
                          </div>
                        </div>
                      </div>
                      <span className={`modal-plan-status-tag ${plan.status === 'completed' ? 'tag-done' : 'tag-doing'}`}>
                        {plan.status === 'completed' ? 'เสร็จสมบูรณ์' : 'กำลังดำเนินการ'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeModal === 'topSkills' && (
                <div className="modal-skills-list-grid">
                  {activeStream.topSkills.map((sk, idx) => (
                    <div key={idx} className="modal-skill-card-item">
                      <div className="modal-sk-top">
                        <span className="modal-sk-name">{sk.name}</span>
                        <span className="modal-sk-val">{sk.level} ({sk.val})</span>
                      </div>
                      <p className="modal-sk-desc">{sk.desc}</p>
                      <div className="modal-sk-progress-bar">
                        <div className="modal-sk-progress-fill" style={{ width: sk.val }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModal === 'categories' && (
                <div className="modal-cat-cards-grid">
                  {activeStream.categories.map((cat, idx) => (
                    <div key={idx} className="modal-cat-card-box">
                      <div className="modal-cat-card-header">
                        <span className="modal-cat-name-text">{cat.name}</span>
                        <span className="modal-cat-pct-badge">{cat.pct}</span>
                      </div>
                      <p className="modal-cat-desc-text">{cat.desc}</p>
                      <div className="modal-cat-trend-row">
                        <span>แนวโน้มการพัฒนา:</span>
                        <strong style={{ color: '#16a34a' }}>{cat.trendVal}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModal === 'monthDetail' && (
                <div>
                  <div className="modal-month-stat-card">
                    <div className="modal-month-stat-col">
                      <span className="modal-month-stat-val text-green">{activeMonth.closed}</span>
                      <span className="modal-month-stat-lbl">ทักษะที่ผ่านเกณฑ์ ({activeMonth.closedPct}%)</span>
                    </div>
                    <div className="modal-month-stat-col">
                      <span className="modal-month-stat-val text-blue">{activeMonth.open}</span>
                      <span className="modal-month-stat-lbl">ทักษะที่กำลังพัฒนา ({activeMonth.openPct}%)</span>
                    </div>
                    <div className="modal-month-stat-col">
                      <span className="modal-month-stat-val">{activeMonth.total}</span>
                      <span className="modal-month-stat-lbl">ระดับความพร้อมรวม</span>
                    </div>
                  </div>

                  <h4 className="modal-section-heading" style={{ marginTop: '16px', marginBottom: '8px' }}>
                    บันทึกข้อเสนอแนะประจำเดือนโดย Super User DSS
                  </h4>
                  <div className="modal-mentor-feedback-card">
                    <span className="feedback-badge">คำแนะนำสำหรับกลุ่ม</span>
                    <p className="feedback-content">
                      "สมาชิกในกลุ่มมีพัฒนาการที่ยอดเยี่ยม สามารถประยุกต์ใช้เครื่องมือและทักษะเฉพาะทางในการจัดทำโครงงานได้อย่างมีประสิทธิภาพ แนะนำให้เตรียม Portfolio และเอกสารสมัครงานสหกิจให้พร้อม"
                    </p>
                  </div>
                </div>
              )}

              {activeModal === 'studyHours' && (
                <div className="modal-hours-list">
                  {activeStream.studyHoursWeeks.map((wk, i) => (
                    <div key={i} className="modal-hour-item-row">
                      <div className="modal-hour-item-left">
                        <span className="modal-hour-week-tag">{wk.week}</span>
                        <span className="modal-hour-topic-text">{wk.topic}</span>
                      </div>
                      <span className="modal-hour-val-badge">{wk.hours}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeModal === 'certs' && (
                <div className="modal-certs-cards-grid">
                  {activeStream.certificates.map((cert) => (
                    <div key={cert.id} className="modal-cert-detail-card">
                      <div className="modal-cert-badge-top">
                        <span className="modal-cert-icon-lg" style={{ color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: '#fef3c7', borderRadius: '10px', border: '1px solid #fde68a', flexShrink: 0 }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="7" />
                            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                          </svg>
                        </span>
                        <div>
                          <div className="modal-cert-name-text">{cert.title}</div>
                          {cert.student && (
                            <div style={{ color: '#2563eb', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                              </svg>
                              <span>ผู้ได้รับ: {cert.student}</span>
                            </div>
                          )}
                          <div className="modal-cert-issuer-text">{cert.issuer}</div>
                        </div>
                      </div>
                      <div className="modal-cert-footer-row">
                        <span className="modal-cert-no-tag">เลขที่: {cert.certNo}</span>
                        <span className="modal-cert-date-text">{cert.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModal === 'assessLogs' && (
                <div className="modal-logs-timeline-list">
                  {activeStream.assessmentLogsList.map((log) => (
                    <div key={log.id} className="modal-log-timeline-item">
                      <div className="modal-log-item-top">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="modal-log-month-tag">{log.month}</span>
                          <span className="modal-log-date-text">{log.date}</span>
                        </div>
                        <span className="modal-log-score-badge">{log.score}</span>
                      </div>
                      <div className="modal-log-evaluator-row">
                        <span>ผู้ประเมิน: <strong>{log.evaluator}</strong></span>
                        <span style={{ color: '#16a34a' }}>● ผ่านเกณฑ์: {log.passedCount}</span>
                      </div>
                      <p className="modal-log-note-text">{log.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="dashboard-modal-footer">
              <button
                type="button"
                className="dashboard-modal-btn-close"
                onClick={() => setActiveModal(null)}
              >
                ปิดหน้าต่าง
              </button>

              <button
                type="button"
                className="dashboard-modal-btn-action"
                onClick={() => {
                  setActiveModal(null)
                  onNavigateToGroupMgmt()
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>ไปที่หน้าจัดการกลุ่มและบันทึกผล ↗</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
