import React, { useState } from 'react'
import './DashboardPage.css'

export default function DashboardPage({
  onNavigateHome,
  onNavigateToAssessment,
  onNavigateToCareerGoal,
  onNavigateToSelfDevelopment,
  onNavigateToSkills,
  onNavigateToProfile,
}) {
  // Helper for upward trend icon
  const renderTrendIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )

  // Career Stream Database for Dashboard
  const careerDashboardData = {
    programmer: {
      id: 'programmer',
      name: 'โปรแกรมเมอร์',
      category: 'เทคโนโลยีสารสนเทศ/IT',
      readinessPct: '82.5%',
      readinessTrendValue: '+10%',
      pendingPct: '17.5% อยู่ระหว่างพัฒนา',
      activeMeterCount: 30, // out of 36
      activePlansTotal: '7 แผน',
      activePlansActive: '3 กำลังทำ',
      activePlansDone: '4 เสร็จสมบูรณ์แล้ว',
      plansMeterCount: 20,
      studyHours: '86 ชั่วโมง',
      studyHoursMonth: '+16 ชม. ในเดือนนี้',
      studyHoursTrendValue: '18%',
      certsCount: '3 ใบประกาศ',
      certsStatus: 'พร้อมยื่นสมัครงาน',
      assessLogs: '12 ครั้ง',
      assessMonth: '+2 ครั้งในรอบเดือนนี้',
      donutCenter: '82%',
      topSkills: [
        { name: 'เขียนโปรแกรม Full-Stack (React & Node.js)', level: 'ระดับ 4', val: '85%', dot: 'turq', desc: 'พัฒนาเว็บแอปพลิเคชันเชื่อมต่อฐานข้อมูลได้คล่องแคล่ว' },
        { name: 'จัดการฐานข้อมูล SQL & Database Design', level: 'ระดับ 4', val: '80%', dot: 'blue', desc: 'ออกแบบ ER-Diagram และเขียน Query ซับซ้อนได้' },
        { name: 'ทำงานเป็นทีมแบบ Agile & Scrum Sprint', level: 'ระดับ 4', val: '100%', dot: 'purple', desc: 'วางแผนงานและส่งมอบงานในแต่ละ Sprint ตรงเวลา' },
        { name: 'ภาษาอังกฤษเพื่อการทำงานและเขียนโค้ด', level: 'ระดับ 3', val: '75%', dot: 'gray', desc: 'อ่าน Technical Documentation และสื่อสารในทีมได้' },
      ],
      categories: [
        { name: 'ทักษะทางเทคนิค (Technical)', trendVal: '+12%', pct: '40%', dot: '#0f172a', desc: 'โค้ดดิ้ง, สถาปัตยกรรมระบบ, ฐานข้อมูล' },
        { name: 'ทักษะร่วมกับผู้อื่น (Soft Skills)', trendVal: '+25%', pct: '25%', dot: 'turq', desc: 'การทำงานเป็นทีม, การแก้ปัญหาเชิงวิเคราะห์' },
        { name: 'การสื่อสารและภาษา', trendVal: '+15%', pct: '20%', dot: 'blue', desc: 'การนำเสนองาน, ภาษาอังกฤษเพื่ออาชีพ' },
        { name: 'คุณวุฒิและใบรับรอง', trendVal: '+10%', pct: '15%', dot: 'gray', desc: 'Certificate มาตรฐานสากล, โครงงาน Portfolio' },
      ],
      plansList: [
        { id: 1, title: 'พัฒนาเว็บแอปพลิเคชันระบบจัดการร้านค้า (E-Commerce Full-Stack)', status: 'completed', category: 'ฝึกปฏิบัติจริง', hours: '35 ชม.', score: '95/100' },
        { id: 2, title: 'สอบมาตรฐานวิชาชีพไอที ITPE (Information Technology Professional Exam)', status: 'completed', category: 'ใบรับรอง', hours: '20 ชม.', score: 'ผ่านเกณฑ์' },
        { id: 3, title: 'เรียนคอร์ส Advanced SQL & Indexing Optimization', status: 'completed', category: 'คอร์สออนไลน์', hours: '15 ชม.', score: '100/100' },
        { id: 4, title: 'ฝึกปฏิบัติการเขียนโค้ด Clean Code & Test-Driven Development (TDD)', status: 'completed', category: 'ฝึกปฏิบัติจริง', hours: '16 ชม.', score: 'ผ่านเกณฑ์' },
        { id: 5, title: 'ศึกษาการทำ CI/CD Automation และ Docker Deployment', status: 'in-progress', category: 'ฝึกปฏิบัติจริง', hours: '12/20 ชม.', score: 'กำลังทำ 60%' },
        { id: 6, title: 'พัฒนา RESTful API ด้วย Express & TypeScript', status: 'in-progress', category: 'คอร์สออนไลน์', hours: '8/15 ชม.', score: 'กำลังทำ 53%' },
        { id: 7, title: 'ฝึกซ้อมสัมภาษณ์งานภาษาอังกฤษสำหรับตำแหน่ง Software Engineer', status: 'in-progress', category: 'การสื่อสาร', hours: '6/10 ชม.', score: 'กำลังทำ 60%' },
      ],
      studyHoursWeeks: [
        { week: 'สัปดาห์ 1', hours: '14 ชม.', topic: 'React State Management & Redux Toolkit' },
        { week: 'สัปดาห์ 2', hours: '22 ชม.', topic: 'PostgreSQL Database Indexing & Performance' },
        { week: 'สัปดาห์ 3', hours: '18 ชม.', topic: 'TypeScript Integration & Backend Architecture' },
        { week: 'สัปดาห์ 4', hours: '20 ชม.', topic: 'Docker Containerization & CI/CD Pipelines' },
        { week: 'สัปดาห์ 5 (ปัจจุบัน)', hours: '12 ชม.', topic: 'Unit Testing with Jest & Mocking' },
      ],
      certificates: [
        { id: 1, title: 'Full-Stack Web Development Professional Certificate', issuer: 'Tech Academy & MOOC', date: '15 มิ.ย. 2568', certNo: 'TC-2025-9842', status: 'ตรวจสอบแล้ว' },
        { id: 2, title: 'ITPE: Information Technology Passport Examination', issuer: 'สถาบันคุณวุฒิวิชาชีพ (องค์การมหาชน)', date: '28 เม.ย. 2568', certNo: 'ITPE-TH-6804', status: 'ตรวจสอบแล้ว' },
        { id: 3, title: 'Advanced SQL Query & Database Design Certificate', issuer: 'DataCamp Global', date: '10 ม.ค. 2568', certNo: 'DC-SQL-5412', status: 'ตรวจสอบแล้ว' },
      ],
      assessmentLogsList: [
        { id: 1, month: 'สิงหาคม 2568', date: '30 ส.ค. 2568', evaluator: 'ประเมินตนเอง + อาจารย์ที่ปรึกษา', score: '82.5%', passedCount: '4/4 ทักษะ', imagesCount: 3, note: 'ส่งมอบผลงานโปรเจกต์เว็บและแนบใบประกาศนียบัตรครบถ้วน' },
        { id: 2, month: 'กรกฎาคม 2568', date: '31 ก.ค. 2568', evaluator: 'ประเมินตนเอง', score: '80.0%', passedCount: '4/4 ทักษะ', imagesCount: 2, note: 'ฝึกทำโจทย์ Coding และเขียนสรุปความรู้' },
        { id: 3, month: 'มิถุนายน 2568', date: '30 มิ.ย. 2568', evaluator: 'ประเมินตนเอง', score: '78.0%', passedCount: '4/4 ทักษะ', imagesCount: 2, note: 'สอบผ่านหลักสูตร Full-Stack' },
        { id: 4, month: 'พฤษภาคม 2568', date: '31 พ.ค. 2568', evaluator: 'ประเมินตนเอง', score: '75.0%', passedCount: '3/4 ทักษะ', imagesCount: 1, note: 'เริ่มฝึกฝน TypeScript และ REST API' },
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
    'data-analyst': {
      id: 'data-analyst',
      name: 'นักวิเคราะห์ข้อมูล (Data Analyst)',
      category: 'เทคโนโลยีสารสนเทศ & วิเคราะห์ข้อมูล',
      readinessPct: '74.0%',
      readinessTrendValue: '+14%',
      pendingPct: '26.0% อยู่ระหว่างพัฒนา',
      activeMeterCount: 26,
      activePlansTotal: '5 แผน',
      activePlansActive: '2 กำลังทำ',
      activePlansDone: '3 เสร็จสมบูรณ์แล้ว',
      plansMeterCount: 15,
      studyHours: '58 ชั่วโมง',
      studyHoursMonth: '+12 ชม. ในเดือนนี้',
      studyHoursTrendValue: '15%',
      certsCount: '2 ใบประกาศ',
      certsStatus: 'ได้รับใบรับรอง Google Data',
      assessLogs: '9 ครั้ง',
      assessMonth: '+1 ครั้งในรอบเดือนนี้',
      donutCenter: '74%',
      topSkills: [
        { name: 'การวิเคราะห์ข้อมูลด้วย Python (Pandas/NumPy)', level: 'ระดับ 3', val: '75%', dot: 'turq', desc: 'ทำ Data Cleaning และ Exploratory Data Analysis (EDA)' },
        { name: 'Data Visualization (Power BI & Tableau)', level: 'ระดับ 4', val: '85%', dot: 'blue', desc: 'สร้าง Interactive Dashboard เพื่อการตัดสินใจทางธุรกิจ' },
        { name: 'การเขียนคำสั่ง SQL ขั้นสูงเพื่อดึงข้อมูล', level: 'ระดับ 4', val: '90%', dot: 'purple', desc: 'เขียน Window Functions, CTE และ Subquery ได้คล่อง' },
        { name: 'Data Storytelling & รายงานผลต่อผู้บริหาร', level: 'ระดับ 3', val: '70%', dot: 'gray', desc: 'แปลงข้อมูลเชิงลึกเป็นกลยุทธ์ที่เข้าใจง่าย' },
      ],
      categories: [
        { name: 'ทักษะทางเทคนิค (Python/SQL)', trendVal: '+18%', pct: '45%', dot: '#0f172a', desc: 'Data Analytics, SQL, Python Programming' },
        { name: 'ทักษะร่วมกับผู้อื่น (Business Sense)', trendVal: '+15%', pct: '25%', dot: 'turq', desc: 'ความเข้าใจธุรกิจ, การตีความ KPI' },
        { name: 'การสื่อสารและนำเสนอข้อมูล', trendVal: '+20%', pct: '20%', dot: 'blue', desc: 'Data Storytelling, Dashboard Design' },
        { name: 'คุณวุฒิและใบรับรอง', trendVal: '+10%', pct: '10%', dot: 'gray', desc: 'Google Data Analytics Certificate' },
      ],
      plansList: [
        { id: 1, title: 'สร้าง Sales Performance Dashboard ด้วย Power BI', status: 'completed', category: 'ฝึกปฏิบัติจริง', hours: '20 ชม.', score: '92/100' },
        { id: 2, title: 'เรียนคอร์ส Google Data Analytics Professional Certificate', status: 'completed', category: 'ใบรับรอง', hours: '25 ชม.', score: 'ผ่านเกณฑ์' },
        { id: 3, title: 'ฝึกวิเคราะห์ข้อมูล Customer Churn ด้วย Python', status: 'completed', category: 'ฝึกปฏิบัติจริง', hours: '13 ชม.', score: '88/100' },
        { id: 4, title: 'ศึกษา Machine Learning พื้นฐานเพื่อการพยากรณ์ยอดขาย', status: 'in-progress', category: 'คอร์สออนไลน์', hours: '10/20 ชม.', score: 'กำลังทำ 50%' },
        { id: 5, title: 'ฝึกนำเสนอผลงาน Data Insight ต่อทีมผู้บริหาร', status: 'in-progress', category: 'การสื่อสาร', hours: '5/10 ชม.', score: 'กำลังทำ 50%' },
      ],
      studyHoursWeeks: [
        { week: 'สัปดาห์ 1', hours: '12 ชม.', topic: 'Power BI DAX Formulas & Data Modeling' },
        { week: 'สัปดาห์ 2', hours: '15 ชม.', topic: 'Python Pandas & Data Cleaning Workflows' },
        { week: 'สัปดาห์ 3', hours: '10 ชม.', topic: 'SQL Aggregations & Cohort Analysis' },
        { week: 'สัปดาห์ 4', hours: '14 ชม.', topic: 'Interactive Dashboard Styling & UI' },
        { week: 'สัปดาห์ 5 (ปัจจุบัน)', hours: '7 ชม.', topic: 'Data Storytelling Presentation Practice' },
      ],
      certificates: [
        { id: 1, title: 'Google Data Analytics Professional Certificate', issuer: 'Google / Coursera', date: '20 พ.ค. 2568', certNo: 'G-DATA-8831', status: 'ตรวจสอบแล้ว' },
        { id: 2, title: 'Microsoft Certified: Power BI Data Analyst Associate', issuer: 'Microsoft', date: '12 มี.ค. 2568', certNo: 'MS-PL300-119', status: 'ตรวจสอบแล้ว' },
      ],
      assessmentLogsList: [
        { id: 1, month: 'สิงหาคม 2568', date: '28 ส.ค. 2568', evaluator: 'ประเมินตนเอง', score: '74.0%', passedCount: '3/4 ทักษะ', imagesCount: 2, note: 'อัปเดต Dashboard ยอดขายและแนบใบรับรอง Google Data' },
        { id: 2, month: 'กรกฎาคม 2568', date: '30 ก.ค. 2568', evaluator: 'ประเมินตนเอง', score: '72.0%', passedCount: '3/4 ทักษะ', imagesCount: 1, note: 'ฝึกเขียน SQL Window Functions' },
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
      name: 'นักออกแบบ UI/UX ดิจิทัล',
      category: 'ดีไซน์ดิจิทัล & Product Design',
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
      assessLogs: '10 ครั้ง',
      assessMonth: '+2 ครั้งในรอบเดือนนี้',
      donutCenter: '78%',
      topSkills: [
        { name: 'Wireframe & High-Fidelity Prototype (Figma)', level: 'ระดับ 4', val: '90%', dot: 'turq', desc: 'สร้าง Interactive Prototype ด้วย Figma Component & Auto-Layout' },
        { name: 'User Research & Usability Testing', level: 'ระดับ 3', val: '70%', dot: 'blue', desc: 'สัมภาษณ์ผู้ใช้และทำสรุป User Persona & Journey' },
        { name: 'Design System & มาตรฐานการเข้าถึง WCAG', level: 'ระดับ 4', val: '85%', dot: 'purple', desc: 'กำหนด Design Tokens และ Accessible Color Contrast' },
        { name: 'การส่งต่องานให้นักพัฒนา (Design Handoff)', level: 'ระดับ 4', val: '80%', dot: 'gray', desc: 'จัดทำ Redline Specs และ Assets Export สำหรับ Frontend' },
      ],
      categories: [
        { name: 'ทักษะการออกแบบ (UI/UX)', trendVal: '+15%', pct: '40%', dot: '#0f172a', desc: 'Figma, Prototyping, Design Systems' },
        { name: 'ทักษะความเข้าใจผู้ใช้ (Empathy)', trendVal: '+20%', pct: '25%', dot: 'turq', desc: 'User Research, Usability Testing' },
        { name: 'การนำเสนอและสื่อสารดีไซน์', trendVal: '+12%', pct: '20%', dot: 'blue', desc: 'Design Presentation & Stakeholder Pitch' },
        { name: 'คุณวุฒิและผลงาน Portfolio', trendVal: '+10%', pct: '15%', dot: 'gray', desc: 'Case Studies, Figma Certificate' },
      ],
      plansList: [
        { id: 1, title: 'ออกแบบ Mobile App Redesign สำหรับแอปพลิเคชันการเรียนรู้', status: 'completed', category: 'ฝึกปฏิบัติจริง', hours: '25 ชม.', score: '94/100' },
        { id: 2, title: 'สร้าง Design System ฉบับสมบูรณ์บน Figma', status: 'completed', category: 'ฝึกปฏิบัติจริง', hours: '18 ชม.', score: '90/100' },
        { id: 3, title: 'เรียนคอร์ส Figma for Advanced UX/UI Designers', status: 'completed', category: 'ใบรับรอง', hours: '15 ชม.', score: 'ผ่านเกณฑ์' },
        { id: 4, title: 'ทำ Usability Testing กับกลุ่มผู้ใช้งานจริง 5 คน', status: 'completed', category: 'ฝึกปฏิบัติจริง', hours: '6 ชม.', score: 'ผ่านเกณฑ์' },
        { id: 5, title: 'จัดทำ UX Case Study สำหรับ Portfolio ออนไลน์', status: 'in-progress', category: 'ฝึกปฏิบัติจริง', hours: '10/16 ชม.', score: 'กำลังทำ 62%' },
        { id: 6, title: 'ศึกษาแนวคิด Micro-Interactions ด้วย Principle / Framer', status: 'in-progress', category: 'คอร์สออนไลน์', hours: '4/10 ชม.', score: 'กำลังทำ 40%' },
      ],
      studyHoursWeeks: [
        { week: 'สัปดาห์ 1', hours: '14 ชม.', topic: 'Figma Auto-Layout & Variables' },
        { week: 'สัปดาห์ 2', hours: '16 ชม.', topic: 'Design Systems & Component Library' },
        { week: 'สัปดาห์ 3', hours: '12 ชม.', topic: 'User Journey Mapping & Wireframing' },
        { week: 'สัปดาห์ 4', hours: '15 ชม.', topic: 'High-Fidelity UI & Typography Scaling' },
        { week: 'สัปดาห์ 5 (ปัจจุบัน)', hours: '7 ชม.', topic: 'UX Case Study Documentation' },
      ],
      certificates: [
        { id: 1, title: 'Certified Figma Design Professional', issuer: 'Figma Academy', date: '10 มิ.ย. 2568', certNo: 'FIG-2025-4190', status: 'ตรวจสอบแล้ว' },
        { id: 2, title: 'Interaction Design & User Research Foundation', issuer: 'Interaction Design Foundation (IxDF)', date: '18 ก.พ. 2568', certNo: 'IXDF-8812', status: 'ตรวจสอบแล้ว' },
      ],
      assessmentLogsList: [
        { id: 1, month: 'สิงหาคม 2568', date: '29 ส.ค. 2568', evaluator: 'ประเมินตนเอง + อาจารย์ผู้สอน', score: '78.5%', passedCount: '4/4 ทักษะ', imagesCount: 4, note: 'แนบภาพ Prototype Figma และลิงก์เคสสตัดี' },
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
    business: {
      id: 'business',
      name: 'นักธุรกิจ / E-Commerce',
      category: 'ธุรกิจ/อาชีพอิสระ/e-commerce',
      readinessPct: '68.0%',
      readinessTrendValue: '+12%',
      pendingPct: '32.0% อยู่ระหว่างพัฒนา',
      activeMeterCount: 24,
      activePlansTotal: '4 แผน',
      activePlansActive: '2 กำลังทำ',
      activePlansDone: '2 เสร็จสมบูรณ์แล้ว',
      plansMeterCount: 14,
      studyHours: '42 ชั่วโมง',
      studyHoursMonth: '+10 ชม. ในเดือนนี้',
      studyHoursTrendValue: '12%',
      certsCount: '1 ใบประกาศ',
      certsStatus: 'ใบรับรอง Digital Marketing',
      assessLogs: '7 ครั้ง',
      assessMonth: '+1 ครั้งในรอบเดือนนี้',
      donutCenter: '68%',
      topSkills: [
        { name: 'การตลาดดิจิทัลและยิงแอด (Digital Ads)', level: 'ระดับ 3', val: '70%', dot: 'turq', desc: 'วางแผนแคมเปญโฆษณาบน Facebook & TikTok' },
        { name: 'การคำนวณกำไร-ขาดทุน และวิเคราะห์ต้นทุน', level: 'ระดับ 3', val: '65%', dot: 'blue', desc: 'ทำบัญชีรายรับ-รายจ่าย และคำนวณจุดคุ้มทุน (BEP)' },
        { name: 'การเจรจาต่อรองและการดูแลลูกค้า (CRM)', level: 'ระดับ 4', val: '85%', dot: 'purple', desc: 'ปิดการขายและดูแลลูกค้าเก่าเพื่อการซื้อซ้ำ' },
        { name: 'การบริหารจัดส่งและสต็อกสินค้า (Inventory)', level: 'ระดับ 3', val: '60%', dot: 'gray', desc: 'ควบคุมสต็อกสินค้าและประสานขนส่ง' },
      ],
      categories: [
        { name: 'ทักษะทางเทคนิค (Online Shop)', trendVal: '+12%', pct: '35%', dot: '#0f172a', desc: 'E-Commerce Platform, Live Streaming' },
        { name: 'ทักษะการเจรจาและการขาย', trendVal: '+18%', pct: '30%', dot: 'turq', desc: 'Sales, Negotiation, Customer Relations' },
        { name: 'การสื่อสารและการดูแลลูกค้า', trendVal: '+14%', pct: '20%', dot: 'blue', desc: 'Content Creation, Copywriting' },
        { name: 'คุณวุฒิและใบรับรองธุรกิจ', trendVal: '+8%', pct: '15%', dot: 'gray', desc: 'Digital Marketing Certificate' },
      ],
      plansList: [
        { id: 1, title: 'เปิดร้านค้าออนไลน์และทดลองยิงแคมเปญโฆษณา TikTok Shop', status: 'completed', category: 'ฝึกปฏิบัติจริง', hours: '18 ชม.', score: '90/100' },
        { id: 2, title: 'เรียนคอร์ส E-Commerce Business & Financial Management', status: 'completed', category: 'ใบรับรอง', hours: '12 ชม.', score: 'ผ่านเกณฑ์' },
        { id: 3, title: 'ทำแผนการตลาดยุค AI สำหรับเพิ่มยอดขาย 200%', status: 'in-progress', category: 'ฝึกปฏิบัติจริง', hours: '8/15 ชม.', score: 'กำลังทำ 53%' },
        { id: 4, title: 'ฝึกการตอบแชทและปิดการขายด้วย CRM Scripts', status: 'in-progress', category: 'การสื่อสาร', hours: '4/8 ชม.', score: 'กำลังทำ 50%' },
      ],
      studyHoursWeeks: [
        { week: 'สัปดาห์ 1', hours: '8 ชม.', topic: 'TikTok & Facebook Ads Optimization' },
        { week: 'สัปดาห์ 2', hours: '12 ชม.', topic: 'Product Sourcing & Unit Economics' },
        { week: 'สัปดาห์ 3', hours: '10 ชม.', topic: 'Customer Retention & Loyalty Programs' },
        { week: 'สัปดาห์ 4', hours: '8 ชม.', topic: 'E-Commerce Live Selling Techniques' },
        { week: 'สัปดาห์ 5 (ปัจจุบัน)', hours: '4 ชม.', topic: 'Financial Tracking with Spreadsheets' },
      ],
      certificates: [
        { id: 1, title: 'Meta Certified Digital Marketing Associate', issuer: 'Meta (Facebook)', date: '14 ม.ค. 2568', certNo: 'META-DM-9901', status: 'ตรวจสอบแล้ว' },
      ],
      assessmentLogsList: [
        { id: 1, month: 'สิงหาคม 2568', date: '25 ส.ค. 2568', evaluator: 'ประเมินตนเอง', score: '68.0%', passedCount: '3/4 ทักษะ', imagesCount: 2, note: 'บันทึกยอดขายจริงและแนบใบประกาศ Meta' },
      ],
      monthlyBars: [
        { month: 'ม.ค.', openPct: 75, closedPct: 25, total: '25% ความพร้อม', open: '4 ทักษะ', closed: '1 ทักษะ' },
        { month: 'ก.พ.', openPct: 65, closedPct: 35, total: '35% ความพร้อม', open: '4 ทักษะ', closed: '1 ทักษะ' },
        { month: 'มี.ค.', openPct: 58, closedPct: 42, total: '42% ความพร้อม', open: '3 ทักษะ', closed: '2 ทักษะ' },
        { month: 'เม.ย.', openPct: 50, closedPct: 50, total: '50% ความพร้อม', open: '3 ทักษะ', closed: '2 ทักษะ' },
        { month: 'พ.ค.', openPct: 44, closedPct: 56, total: '56% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'มิ.ย.', openPct: 38, closedPct: 62, total: '62% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'ก.ค.', openPct: 35, closedPct: 65, total: '65% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'ส.ค.', openPct: 32, closedPct: 68, total: '68% ความพร้อม', open: '2 ทักษะ', closed: '3 ทักษะ' },
        { month: 'ก.ย.', openPct: 25, closedPct: 75, total: '75% (เป้าหมาย)', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'ต.ค.', openPct: 20, closedPct: 80, total: '80% (เป้าหมาย)', open: '1 ทักษะ', closed: '4 ทักษะ' },
        { month: 'พ.ย.', openPct: 15, closedPct: 85, total: '85% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
        { month: 'ธ.ค.', openPct: 10, closedPct: 90, total: '90% (เป้าหมาย)', open: '0 ทักษะ', closed: '5 ทักษะ' },
      ],
    },
  }

  // Selected Career Stream State
  const [selectedCareerId, setSelectedCareerId] = useState('programmer')
  const activeCareer = careerDashboardData[selectedCareerId] || careerDashboardData.programmer

  // Filter States
  const [topSkillsFilter, setTopSkillsFilter] = useState('recent')
  const [yearFilter, setYearFilter] = useState('2568')
  const [activeMonthIdx, setActiveMonthIdx] = useState(7) // August (Index 7)

  // Interactive Modal State (null | 'readiness' | 'plans' | 'topSkills' | 'categories' | 'monthDetail' | 'studyHours' | 'certs' | 'assessLogs')
  const [activeModal, setActiveModal] = useState(null)

  const activeMonth = activeCareer.monthlyBars[activeMonthIdx]

  return (
    <div className="ronasit-dashboard-container">
      {/* 1. Header & Greeting Bar */}
      <header className="ronasit-header-bar">
        <div className="ronasit-greeting-left-group">
          <div className="ronasit-app-brand-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="ronasit-greeting-text-block">
            <h1 className="ronasit-greeting-title">ยินดีต้อนรับ, คุณพรชิตา สนิทเชื้อ</h1>
            <p className="ronasit-greeting-subtitle">
              ภาพรวมการพัฒนาตนเองและแผนอาชีพ: <strong style={{ color: '#2563eb' }}>{activeCareer.name}</strong> ({activeCareer.category})
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

          {onNavigateToProfile && (
            <button
              type="button"
              className="ronasit-btn-quick-assess"
              onClick={onNavigateToProfile}
              title="จัดการข้อมูลส่วนตัวของคุณ"
              style={{
                background: '#ffffff',
                color: '#2563eb',
                borderColor: '#bfdbfe',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>ข้อมูลส่วนตัว</span>
            </button>
          )}

          <button
            type="button"
            className="ronasit-btn-quick-assess"
            onClick={onNavigateToAssessment}
            title="ไปที่หน้าประเมินตนเอง"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span>ประเมินตนเอง</span>
          </button>
        </div>
      </header>

      {/* 2. Career Stream Selector Bar */}
      <section className="dashboard-career-filter-card">
        <div className="career-filter-title">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <span>เลือกสายอาชีพเป้าหมายเพื่อวิเคราะห์:</span>
        </div>

        <div className="career-filter-pills-row">
          <button
            type="button"
            className={`dashboard-career-pill-btn ${selectedCareerId === 'programmer' ? 'active' : ''}`}
            onClick={() => setSelectedCareerId('programmer')}
          >
            <span>โปรแกรมเมอร์ (IT)</span>
            <span className="career-readiness-chip">82.5%</span>
          </button>

          <button
            type="button"
            className={`dashboard-career-pill-btn ${selectedCareerId === 'data-analyst' ? 'active' : ''}`}
            onClick={() => setSelectedCareerId('data-analyst')}
          >
            <span>นักวิเคราะห์ข้อมูล (Data)</span>
            <span className="career-readiness-chip">74.0%</span>
          </button>

          <button
            type="button"
            className={`dashboard-career-pill-btn ${selectedCareerId === 'ui-ux' ? 'active' : ''}`}
            onClick={() => setSelectedCareerId('ui-ux')}
          >
            <span>นักออกแบบ UI/UX</span>
            <span className="career-readiness-chip">78.5%</span>
          </button>

          <button
            type="button"
            className={`dashboard-career-pill-btn ${selectedCareerId === 'business' ? 'active' : ''}`}
            onClick={() => setSelectedCareerId('business')}
          >
            <span>นักธุรกิจ / E-Commerce</span>
            <span className="career-readiness-chip">68.0%</span>
          </button>
        </div>
      </section>

      {/* 3. Main 2-Column Dashboard Grid */}
      <div className="ronasit-dashboard-grid">
        {/* Left Column: 2 Metric Cards + 2 Analytics Cards + 1 Monthly Evolution Chart */}
        <div className="ronasit-left-col">
          {/* Top Row: Career Readiness & Active Action Plans for Selected Career */}
          <div className="ronasit-top-metrics-row">
            {/* Card 1: ความพร้อมสู่อาชีพเป้าหมาย (Career Readiness Rate) */}
            <div
              className="ronasit-metric-card clickable-card"
              onClick={() => setActiveModal('readiness')}
              title="คลิกเพื่อดูรายละเอียดความพร้อมสู่อาชีพและผลวิเคราะห์เชิงลึก"
            >
              <div className="ronasit-card-header-row">
                <h3 className="ronasit-card-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  <span>ความพร้อมสู่อาชีพ "{activeCareer.name}"</span>
                </h3>
                <span className="card-clickable-hint">คลิกดู ↗</span>
              </div>

              <div className="ronasit-big-number-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="ronasit-metric-big">{activeCareer.readinessPct}</span>
                  <span className="ronasit-trend-pill">
                    {renderTrendIcon()}
                    <span>{activeCareer.readinessTrendValue}</span>
                  </span>
                </div>
                <span className="ronasit-pending-label">{activeCareer.pendingPct}</span>
              </div>

              {/* Segmented Ticks Meter */}
              <div className="ronasit-ticks-meter-wrap">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`ronasit-tick ${i < activeCareer.activeMeterCount - 3 ? '' : i < activeCareer.activeMeterCount ? 'active-blue' : 'inactive'}`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Card 2: แผนพัฒนาตนเองที่ดำเนินการ (Active Action Plans) */}
            <div
              className="ronasit-metric-card clickable-card"
              onClick={() => setActiveModal('plans')}
              title="คลิกเพื่อดูรายการแผนพัฒนาตนเองทั้งหมด"
            >
              <div className="ronasit-card-header-row">
                <h3 className="ronasit-card-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>แผนพัฒนาที่ดำเนินการในสายอาชีพนี้</span>
                </h3>
                <span className="card-clickable-hint">คลิกดู ↗</span>
              </div>

              <div className="ronasit-big-number-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="ronasit-metric-big">{activeCareer.activePlansTotal}</span>
                  <span className="ronasit-trend-pill" style={{ backgroundColor: '#eff6ff', color: '#1d4ed8' }}>
                    {activeCareer.activePlansActive}
                  </span>
                </div>
                <span className="ronasit-pending-label">{activeCareer.activePlansDone}</span>
              </div>

              {/* Segmented Ticks Meter */}
              <div className="ronasit-ticks-meter-wrap">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`ronasit-tick ${i < activeCareer.plansMeterCount ? 'active-blue' : 'inactive'}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Row: Top Skills & Categories */}
          <div className="ronasit-middle-row">
            {/* Mid Card 1: ทักษะหลักที่มีพัฒนาการโดดเด่นประจำสายอาชีพ */}
            <div
              className="ronasit-mid-card clickable-card"
              onClick={() => setActiveModal('topSkills')}
              title="คลิกเพื่อดูรายละเอียดทักษะและความเชี่ยวชาญทั้งหมด"
            >
              <div className="ronasit-card-header-row">
                <h3 className="ronasit-card-title">ทักษะโดดเด่น ({activeCareer.name})</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="card-clickable-hint">ดูทั้งหมด ↗</span>
                </div>
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
                  {activeCareer.topSkills.map((sk, idx) => (
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
                <span className="card-clickable-hint">{activeCareer.name} ↗</span>
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
                  <div className="ronasit-donut-center-text">{activeCareer.donutCenter}</div>
                </div>

                {/* Legends with Trend Chips */}
                <div className="ronasit-donut-legends">
                  {activeCareer.categories.map((cat, idx) => (
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

          {/* Bottom Card: Monthly Evolution Bar Chart for Selected Career */}
          <div
            className="ronasit-monthly-chart-card clickable-card"
            onClick={() => setActiveModal('monthDetail')}
            title="คลิกเพื่อดูสรุปผลประเมินรายเดือนแบบละเอียด"
          >
            <div className="ronasit-chart-top-bar">
              <div className="ronasit-chart-title-group">
                <h3 className="ronasit-card-title">ความก้าวหน้ารายเดือน: {activeCareer.name}</h3>
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
              {activeCareer.monthlyBars.map((item, idx) => {
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
                        <span><strong>{item.total}</strong> ({activeCareer.name})</span>
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

        {/* Right Column: 3 Stacked Widgets (เนื้อหาปรับตามสายอาชีพ) */}
        <div className="ronasit-right-col">
          {/* Widget 1: ชั่วโมงการเรียนรู้สะสม (Study Hours) */}
          <div
            className="ronasit-widget-blue-gradient clickable-card"
            onClick={() => setActiveModal('studyHours')}
            title="คลิกเพื่อดูสรุปชั่วโมงเรียนรู้และหลักสูตรที่สะสม"
          >
            <div className="ronasit-widget-top-row">
              <span className="ronasit-widget-title-white">ชั่วโมงเรียนรู้: {activeCareer.name}</span>
              <span className="card-clickable-hint white">ดูบันทึก ↗</span>
            </div>

            <div>
              <div className="ronasit-widget-big-white">{activeCareer.studyHours}</div>
              <div className="ronasit-widget-sub-white">
                <span>{activeCareer.studyHoursMonth}</span>
                <span style={{ color: '#93c5fd', display: 'inline-flex', alignItems: 'center', gap: '2px', marginLeft: '6px' }}>
                  {renderTrendIcon()}
                  <span>{activeCareer.studyHoursTrendValue}</span>
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
                <span>ใบประกาศ & ผลงาน</span>
              </span>
              <span className="card-clickable-hint">เปิดดู ↗</span>
            </div>

            <div className="ronasit-credits-big-row">
              <div>
                <span className="ronasit-credits-big-val">{activeCareer.certsCount}</span>
                <div className="ronasit-credits-used-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{activeCareer.certsStatus}</span>
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
            title="คลิกเพื่อดูประวัติการประเมินตนเองทั้งหมด"
          >
            <div className="ronasit-widget-top-row">
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#ffffff' }}>
                บันทึกการประเมิน ({activeCareer.name})
              </span>
              <span className="card-clickable-hint light-blue">ดูประวัติ ↗</span>
            </div>

            <div>
              <div className="ronasit-dark-big-number">{activeCareer.assessLogs}</div>
              <div className="ronasit-dark-sub-label">
                <span>{activeCareer.assessMonth}</span>
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
          Interactive Detail Pop-up Modals
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
                      <h3 className="dashboard-modal-title">วิเคราะห์ความพร้อมสู่สายอาชีพ "{activeCareer.name}"</h3>
                      <p className="dashboard-modal-subtitle">คะแนนความพร้อมรวม {activeCareer.readinessPct} ({activeCareer.category})</p>
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
                      <h3 className="dashboard-modal-title">แผนพัฒนาตนเอง: {activeCareer.name} ({activeCareer.activePlansTotal})</h3>
                      <p className="dashboard-modal-subtitle">{activeCareer.activePlansActive} • {activeCareer.activePlansDone}</p>
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
                      <h3 className="dashboard-modal-title">ทักษะและความเชี่ยวชาญ: {activeCareer.name}</h3>
                      <p className="dashboard-modal-subtitle">ระดับความสามารถและทักษะที่ผ่านเกณฑ์เป้าหมาย</p>
                    </div>
                  </>
                )}

                {activeModal === 'categories' && (
                  <>
                    <div className="modal-header-badge cyan">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a10 10 0 0 1 10 10h-10z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="dashboard-modal-title">สัดส่วนสมรรถนะตามหมวดหมู่ ICP</h3>
                      <p className="dashboard-modal-subtitle">การกระจายตัวของทักษะ 4 ด้านหลักสำหรับ {activeCareer.name}</p>
                    </div>
                  </>
                )}

                {activeModal === 'monthDetail' && (
                  <>
                    <div className="modal-header-badge blue">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="dashboard-modal-title">ความก้าวหน้าประจำเดือน: {activeMonth.month} {yearFilter}</h3>
                      <p className="dashboard-modal-subtitle">ความพร้อม {activeMonth.total} • {activeMonth.closed} ผ่านเกณฑ์</p>
                    </div>
                  </>
                )}

                {activeModal === 'studyHours' && (
                  <>
                    <div className="modal-header-badge amber">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="dashboard-modal-title">บันทึกชั่วโมงการเรียนรู้สะสม: {activeCareer.studyHours}</h3>
                      <p className="dashboard-modal-subtitle">{activeCareer.studyHoursMonth} (สายอาชีพ: {activeCareer.name})</p>
                    </div>
                  </>
                )}

                {activeModal === 'certs' && (
                  <>
                    <div className="modal-header-badge amber">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="dashboard-modal-title">แฟ้มใบประกาศนียบัตร & ผลงาน ({activeCareer.certsCount})</h3>
                      <p className="dashboard-modal-subtitle">หลักฐานความเชี่ยวชาญสำหรับสายอาชีพ "{activeCareer.name}"</p>
                    </div>
                  </>
                )}

                {activeModal === 'assessLogs' && (
                  <>
                    <div className="modal-header-badge dark">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="dashboard-modal-title">ประวัติการบันทึกการประเมินตนเอง ({activeCareer.assessLogs})</h3>
                      <p className="dashboard-modal-subtitle">บันทึกคะแนนและหลักฐานย้อนหลังสำหรับ {activeCareer.name}</p>
                    </div>
                  </>
                )}
              </div>

              <button
                type="button"
                className="dashboard-modal-close-btn"
                onClick={() => setActiveModal(null)}
                title="ปิดหน้าต่าง"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="dashboard-modal-body">
              {/* 1. Readiness Breakdown Modal */}
              {activeModal === 'readiness' && (
                <div className="dashboard-modal-content-wrapper">
                  <div className="modal-summary-banner blue">
                    <div className="summary-score-box">
                      <span className="summary-big-score">{activeCareer.readinessPct}</span>
                      <span className="summary-badge-green">พร้อมทำงานในสายอาชีพนี้</span>
                    </div>
                    <div className="summary-text-box">
                      <h4>ผลการวิเคราะห์ความพร้อมโดยรวม</h4>
                      <p>คุณมีระดับสมรรถนะผ่านเกณฑ์เป้าหมายในทักษะหลักแล้ว และมีแผนพัฒนาตนเองดำเนินการอยู่ <strong>{activeCareer.activePlansTotal}</strong> เพื่อเตรียมความพร้อมขั้นสูงสุด</p>
                    </div>
                  </div>

                  <h4 className="modal-section-heading">ความเชี่ยวชาญจำแนกตามทักษะหลัก:</h4>
                  <div className="modal-items-list">
                    {activeCareer.topSkills.map((sk, idx) => (
                      <div key={idx} className="modal-detail-row-card">
                        <div className="detail-row-left">
                          <span className={`detail-skill-dot ${sk.dot}`}></span>
                          <div>
                            <strong className="detail-title">{sk.name}</strong>
                            <p className="detail-desc">{sk.desc}</p>
                          </div>
                        </div>
                        <div className="detail-row-right">
                          <span className="detail-level-pill">{sk.level}</span>
                          <span className="detail-val-badge">{sk.val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Development Plans Modal */}
              {activeModal === 'plans' && (
                <div className="dashboard-modal-content-wrapper">
                  <div className="modal-summary-banner green">
                    <div className="summary-score-box">
                      <span className="summary-big-score">{activeCareer.activePlansTotal}</span>
                      <span className="summary-badge-green">{activeCareer.activePlansDone}</span>
                    </div>
                    <div className="summary-text-box">
                      <h4>สถานะการขับเคลื่อนแผนพัฒนา</h4>
                      <p>สายอาชีพ "{activeCareer.name}" ดำเนินการเสร็จแล้ว <strong>{activeCareer.activePlansDone}</strong> และอยู่ระหว่างการเรียนรู้ <strong>{activeCareer.activePlansActive}</strong></p>
                    </div>
                  </div>

                  <h4 className="modal-section-heading">รายการแผนพัฒนาตนเองทั้งหมด:</h4>
                  <div className="modal-items-list">
                    {activeCareer.plansList.map((plan) => (
                      <div key={plan.id} className="modal-detail-row-card">
                        <div className="detail-row-left">
                          <div className={`plan-status-icon-box ${plan.status}`}>
                            {plan.status === 'completed' ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <strong className="detail-title">{plan.title}</strong>
                            <div className="plan-meta-sub">
                              <span className="meta-tag">{plan.category}</span>
                              <span>• ใช้เวลา: {plan.hours}</span>
                            </div>
                          </div>
                        </div>
                        <div className="detail-row-right">
                          <span className={`plan-status-badge ${plan.status}`}>
                            {plan.status === 'completed' ? '✓ สำเร็จแล้ว' : '⏳ กำลังทำ'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Top Skills Inventory Modal */}
              {activeModal === 'topSkills' && (
                <div className="dashboard-modal-content-wrapper">
                  <h4 className="modal-section-heading">รายละเอียดทักษะและความสามารถ:</h4>
                  <div className="modal-items-list">
                    {activeCareer.topSkills.map((sk, idx) => (
                      <div key={idx} className="modal-detail-row-card">
                        <div className="detail-row-left">
                          <span className={`detail-skill-dot ${sk.dot}`}></span>
                          <div>
                            <strong className="detail-title">{sk.name}</strong>
                            <p className="detail-desc">{sk.desc}</p>
                          </div>
                        </div>
                        <div className="detail-row-right">
                          <span className="detail-level-pill">{sk.level}</span>
                          <span className="detail-val-badge">{sk.val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Categories Donut Modal */}
              {activeModal === 'categories' && (
                <div className="dashboard-modal-content-wrapper">
                  <h4 className="modal-section-heading">สัดส่วนและเป้าหมายตามหมวดหมู่สมรรถนะ:</h4>
                  <div className="modal-items-list">
                    {activeCareer.categories.map((cat, idx) => (
                      <div key={idx} className="modal-detail-row-card">
                        <div className="detail-row-left">
                          <span className={`detail-skill-dot ${cat.dot.startsWith('#') ? '' : cat.dot}`} style={cat.dot.startsWith('#') ? { backgroundColor: cat.dot } : {}}></span>
                          <div>
                            <strong className="detail-title">{cat.name}</strong>
                            <p className="detail-desc">{cat.desc}</p>
                          </div>
                        </div>
                        <div className="detail-row-right">
                          <span className="detail-val-badge">{cat.pct}</span>
                          <span className="detail-trend-pill">
                            {renderTrendIcon()}
                            <span>{cat.trendVal}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Monthly Evolution Modal */}
              {activeModal === 'monthDetail' && (
                <div className="dashboard-modal-content-wrapper">
                  <div className="modal-summary-banner blue">
                    <div className="summary-score-box">
                      <span className="summary-big-score">{activeMonth.total.split(' ')[0]}</span>
                      <span className="summary-badge-green">รอบเดือน {activeMonth.month} {yearFilter}</span>
                    </div>
                    <div className="summary-text-box">
                      <h4>ความก้าวหน้าในรอบเดือน {activeMonth.month}</h4>
                      <p>มีทักษะที่ผ่านเกณฑ์แล้ว <strong>{activeMonth.closed}</strong> และทักษะที่กำลังพัฒนา <strong>{activeMonth.open}</strong></p>
                    </div>
                  </div>

                  <h4 className="modal-section-heading">เลือกรอบเดือนเพื่อดูย้อนหลัง:</h4>
                  <div className="modal-month-selector-pills">
                    {activeCareer.monthlyBars.map((m, idx) => (
                      <button
                        key={m.month}
                        type="button"
                        className={`modal-month-pill-btn ${activeMonthIdx === idx ? 'active' : ''}`}
                        onClick={() => setActiveMonthIdx(idx)}
                      >
                        {m.month} ({m.total.split(' ')[0]})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Study Hours Modal */}
              {activeModal === 'studyHours' && (
                <div className="dashboard-modal-content-wrapper">
                  <div className="modal-summary-banner amber">
                    <div className="summary-score-box">
                      <span className="summary-big-score">{activeCareer.studyHours}</span>
                      <span className="summary-badge-green">{activeCareer.studyHoursMonth}</span>
                    </div>
                    <div className="summary-text-box">
                      <h4>การสะสมชั่วโมงเรียนรู้และฝึกปฏิบัติ</h4>
                      <p>มีการบันทึกเวลาเรียนคอร์สออนไลน์ การทำแบบฝึกหัด และการพัฒนาโปรเจกต์จริงอย่างต่อเนื่อง</p>
                    </div>
                  </div>

                  <h4 className="modal-section-heading">บันทึกชั่วโมงเรียนรู้รายสัปดาห์:</h4>
                  <div className="modal-items-list">
                    {activeCareer.studyHoursWeeks.map((w, idx) => (
                      <div key={idx} className="modal-detail-row-card">
                        <div className="detail-row-left">
                          <div className="hour-badge-box">
                            <span className="hour-val">{w.hours}</span>
                          </div>
                          <div>
                            <strong className="detail-title">{w.week}</strong>
                            <p className="detail-desc">{w.topic}</p>
                          </div>
                        </div>
                        <div className="detail-row-right">
                          <span className="detail-status-pill green">✓ บันทึกสำเร็จ</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Certificates Modal */}
              {activeModal === 'certs' && (
                <div className="dashboard-modal-content-wrapper">
                  <div className="modal-summary-banner amber">
                    <div className="summary-score-box">
                      <span className="summary-big-score">{activeCareer.certsCount}</span>
                      <span className="summary-badge-green">พร้อมยื่นสมัครงาน</span>
                    </div>
                    <div className="summary-text-box">
                      <h4>แฟ้มสะสมใบประกาศนียบัตรวิชาชีพ</h4>
                      <p>ใบประกาศนียบัตรและใบรับรองมาตรฐานวิชาชีพที่ผ่านการตรวจสอบและยืนยันในระบบ</p>
                    </div>
                  </div>

                  <h4 className="modal-section-heading">รายการใบรับรองมาตรฐาน:</h4>
                  <div className="modal-items-list">
                    {activeCareer.certificates.map((cert) => (
                      <div key={cert.id} className="modal-detail-row-card">
                        <div className="detail-row-left">
                          <div className="cert-medal-box">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2">
                              <circle cx="12" cy="8" r="7" />
                              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                            </svg>
                          </div>
                          <div>
                            <strong className="detail-title">{cert.title}</strong>
                            <div className="plan-meta-sub">
                              <span>ออกโดย: {cert.issuer}</span>
                              <span>• วันที่: {cert.date}</span>
                              <span>• รหัส: {cert.certNo}</span>
                            </div>
                          </div>
                        </div>
                        <div className="detail-row-right">
                          <span className="detail-status-pill green">✓ {cert.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. Assessment History Logs Modal */}
              {activeModal === 'assessLogs' && (
                <div className="dashboard-modal-content-wrapper">
                  <h4 className="modal-section-heading">ประวัติการประเมินตนเองย้อนหลัง ({activeCareer.name}):</h4>
                  <div className="modal-items-list">
                    {activeCareer.assessmentLogsList.map((log) => (
                      <div key={log.id} className="modal-detail-row-card">
                        <div className="detail-row-left">
                          <div className="log-avatar-box">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          </div>
                          <div>
                            <strong className="detail-title">{log.month} (บันทึกเมื่อ {log.date})</strong>
                            <p className="detail-desc">{log.note}</p>
                            <div className="plan-meta-sub">
                              <span>ผู้ประเมิน: {log.evaluator}</span>
                              <span>• ผ่าน: {log.passedCount}</span>
                              <span>• แนบรูป: {log.imagesCount} รูป</span>
                            </div>
                          </div>
                        </div>
                        <div className="detail-row-right">
                          <span className="detail-val-badge">{log.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="dashboard-modal-footer">
              <button
                type="button"
                className="btn-dashboard-modal-cancel"
                onClick={() => setActiveModal(null)}
              >
                ปิดหน้าต่าง
              </button>

              {(activeModal === 'readiness' || activeModal === 'assessLogs' || activeModal === 'monthDetail') && (
                <button
                  type="button"
                  className="btn-dashboard-modal-action"
                  onClick={() => {
                    setActiveModal(null)
                    if (onNavigateToAssessment) onNavigateToAssessment()
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <span>ไปที่หน้าการประเมินตนเอง</span>
                </button>
              )}

              {activeModal === 'plans' && (
                <button
                  type="button"
                  className="btn-dashboard-modal-action"
                  onClick={() => {
                    setActiveModal(null)
                    if (onNavigateToSelfDevelopment) onNavigateToSelfDevelopment()
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>ไปที่หน้าการพัฒนาตนเอง</span>
                </button>
              )}

              {(activeModal === 'topSkills' || activeModal === 'categories') && (
                <button
                  type="button"
                  className="btn-dashboard-modal-action"
                  onClick={() => {
                    setActiveModal(null)
                    if (onNavigateToSkills) onNavigateToSkills()
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>ไปที่หน้ากำหนดคุณสมบัติ/ทักษะ</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
