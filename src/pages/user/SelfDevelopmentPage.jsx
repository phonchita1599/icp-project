import React, { useState } from 'react'
import './SelfDevelopmentPage.css'

export default function SelfDevelopmentPage({ onNavigateHome }) {
  // Filter Career State: 'all' | 'programmer' | 'data-analyst' | 'ui-ux' | 'business'
  const [selectedCareerFilter, setSelectedCareerFilter] = useState('programmer')

  // Career Streams Data with Distinct Plans (ตรงตามรูปภาพ 100%)
  const [careerStreams, setCareerStreams] = useState([
    {
      id: 'programmer',
      title: 'โปรแกรมเมอร์ (เทคโนโลยีสารสนเทศ/IT)',
      shortTitle: 'โปรแกรมเมอร์',
      category: 'สายงาน: เทคโนโลยีสารสนเทศ/IT & Software Development',
      badge: 'อาชีพเป้าหมายที่ 1',
      isExpanded: true,
      plans: [
        {
          id: 'p1',
          skillName: 'คอมพิวเตอร์และระบบสารสนเทศ',
          type: 'ศึกษาเรียนรู้',
          typeClass: 'learn',
          title: 'คอร์สเรียนโครงสร้างคอมพิวเตอร์ ระบบปฏิบัติการ และสถาปัตยกรรมซอฟต์แวร์',
          description: 'ศึกษาทำความเข้าใจ Operating Systems, Computer Architecture, Memory Management และ Network Fundamentals',
          channel: 'Coursera / ThaiMOOC',
          channelUrl: 'https://www.coursera.org',
          startDate: '01/08/2025',
          endDate: '31/08/2025',
          priority: 'สูง',
          priorityClass: 'high',
          isCompleted: true,
          milestones: [
            { text: 'เรียนจบคอร์ส Computer Systems Overview (15 ชม.)', done: true },
            { text: 'ทำแบบทดสอบสถาปัตยกรรมระบบได้คะแนน 85% ขึ้นไป', done: true },
            { text: 'สรุป Mindmap สถาปัตยกรรมระบบคอมพิวเตอร์', done: true },
          ],
        },
        {
          id: 'p2',
          skillName: 'ทักษะการเขียนโปรแกรมขั้นสูง (Full-Stack)',
          type: 'ฝึกปฏิบัติ',
          typeClass: 'practice',
          title: 'พัฒนาโครงงาน Full-Stack Web Application ด้วย React + Node.js และ RESTful API',
          description: 'ลงมือสร้างโปรเจกต์เว็บแอปพลิเคชันจริง มีระบบ Authentication, Database CRUD และ Deployment บน Cloud',
          channel: 'GitHub Project / ผลงานจริง',
          channelUrl: 'https://github.com',
          startDate: '15/08/2025',
          endDate: '15/09/2025',
          priority: 'สูงมาก',
          priorityClass: 'very-high',
          isCompleted: false,
          milestones: [
            { text: 'ออกแบบสถาปัตยกรรมฐานข้อมูล Database Schema', done: true },
            { text: 'พัฒนา Backend API ด้วย Express & Node.js', done: true },
            { text: 'เชื่อมต่อ Frontend React กับ Backend API', done: false },
            { text: 'Deploy ขึ้น Vercel / Railway เพื่อทำ Portfolio', done: false },
          ],
        },
        {
          id: 'p3',
          skillName: 'ทำงานร่วมกับผู้อื่น (Teamwork & Agile)',
          type: 'ฝึกปฏิบัติ',
          typeClass: 'practice',
          title: 'การทำโครงงานกลุ่มและการจำลองระบบการทำงานแบบ Scrum Sprint',
          description: 'ฝึกการบริหารจัดการงานด้วย Jira/Trello, Daily Standup และการทำ Code Review ร่วมกับเพื่อนในทีม',
          channel: 'กิจกรรมมหาวิทยาลัย / โครงการนักศึกษา',
          channelUrl: '',
          startDate: '01/09/2025',
          endDate: '30/09/2025',
          priority: 'ปานกลาง',
          priorityClass: 'medium',
          isCompleted: false,
          milestones: [
            { text: 'เข้าร่วมวางแผน Sprint Planning ประจำสัปดาห์', done: true },
            { text: 'จัดทำ Kanban Board บน Trello เพื่อติดตามสถานะงาน', done: false },
            { text: 'ส่งมอบผลงาน Sprint Review ครั้งที่ 1', done: false },
          ],
        },
      ],
    },
    {
      id: 'data-analyst',
      title: 'นักวิเคราะห์ข้อมูล (Data Analyst)',
      shortTitle: 'นักวิเคราะห์ข้อมูล',
      category: 'สายงาน: Data Science & Business Intelligence',
      badge: 'อาชีพเป้าหมายที่ 2',
      isExpanded: true,
      plans: [
        {
          id: 'p4',
          skillName: 'SQL & Data Wrangling ขั้นสูง',
          type: 'ศึกษาเรียนรู้',
          typeClass: 'learn',
          title: 'คอร์ส Advanced SQL for Data Analysis และการจัดการ Big Data',
          description: 'ศึกษาการใช้ Window Functions, CTEs, Data Modeling และ Query Optimization สำหรับชุดข้อมูลขนาดใหญ่',
          channel: 'DataCamp / Google Data Analytics',
          channelUrl: 'https://www.datacamp.com',
          startDate: '01/08/2025',
          endDate: '25/08/2025',
          priority: 'สูงมาก',
          priorityClass: 'very-high',
          isCompleted: true,
          milestones: [
            { text: 'จบคอร์ส SQL Window Functions & Aggregations', done: true },
            { text: 'ทำแบบฝึกหัดวิเคราะห์ข้อมูลยอดขาย 1 ล้านเรคคอร์ด', done: true },
          ],
        },
        {
          id: 'p5',
          skillName: 'การสร้าง Interactive Dashboard ด้วย Power BI / Tableau',
          type: 'ฝึกปฏิบัติ',
          typeClass: 'practice',
          title: 'จัดทำ Business Dashboard สรุปอินไซต์ยอดขายและพฤติกรรมลูกค้า',
          description: 'ออกแบบ Visualization Storytelling รายงานสรุป KPI ผู้บริหาร พร้อมเจาะลึก Drill-Down รายภาคส่วน',
          channel: 'Power BI Portfolio Project',
          channelUrl: 'https://powerbi.microsoft.com',
          startDate: '10/08/2025',
          endDate: '10/09/2025',
          priority: 'สูง',
          priorityClass: 'high',
          isCompleted: false,
          milestones: [
            { text: 'เตรียมข้อมูลและทำ Data Cleaning ด้วย Power Query', done: true },
            { text: 'เขียนสูตร DAX Metrics สำคัญ 10 ตัว', done: false },
            { text: 'จัดทำ Interactive UI และ Published สู่เว็บพอร์ตโฟลิโอ', done: false },
          ],
        },
      ],
    },
    {
      id: 'ui-ux',
      title: 'นักออกแบบ UI/UX ดิจิทัล',
      shortTitle: 'นักออกแบบ UI/UX',
      category: 'สายงาน: Product Design & User Experience',
      badge: 'อาชีพเป้าหมายที่ 3',
      isExpanded: true,
      plans: [
        {
          id: 'p6',
          skillName: 'Design Systems & Figma Prototyping',
          type: 'ศึกษาเรียนรู้',
          typeClass: 'learn',
          title: 'คอร์สสร้าง Design System มาตรฐาน และ Interactive High-Fidelity Prototype ใน Figma',
          description: 'ศึกษา Auto-Layout, Component Variants, Design Tokens, และ Micro-interactions',
          channel: 'Figma Community / Udemy Design Course',
          channelUrl: 'https://figma.com',
          startDate: '05/08/2025',
          endDate: '25/08/2025',
          priority: 'สูง',
          priorityClass: 'high',
          isCompleted: true,
          milestones: [
            { text: 'สร้างชุด UI Kit Components ครบทั้ง Buttons, Inputs, Modals', done: true },
            { text: 'ออกแบบ High-Fidelity App Screen 12 หน้าจอ', done: true },
          ],
        },
        {
          id: 'p7',
          skillName: 'User Research & Usability Testing',
          type: 'ฝึกปฏิบัติ',
          typeClass: 'practice',
          title: 'จัดทำ Usability Testing โครงการ Mobile App กับกลุ่มผู้ใช้จริง 5 คน',
          description: 'ร่าง Test Script สัมภาษณ์ผู้ใช้จริง สังเกตพฤติกรรม และนำ Pain Points มาปรับปรุง UX ให้สมบูรณ์',
          channel: 'การสัมภาษณ์ผู้ใช้ / User Testing Session',
          channelUrl: '',
          startDate: '01/09/2025',
          endDate: '20/09/2025',
          priority: 'สูงมาก',
          priorityClass: 'very-high',
          isCompleted: false,
          milestones: [
            { text: 'เขียนบทสัมภาษณ์และเกณฑ์การทดสอบ (Usability Script)', done: true },
            { text: 'รวบรวมฟีดแบ็กและจัดทำรายงานสรุป UX Recommendations', done: false },
          ],
        },
      ],
    },
    {
      id: 'business',
      title: 'นักธุรกิจ / E-Commerce',
      shortTitle: 'นักธุรกิจ',
      category: 'สายงาน: การตลาดดิจิทัลและบริหารธุรกิจ',
      badge: 'อาชีพเป้าหมายที่ 4',
      isExpanded: true,
      plans: [
        {
          id: 'p8',
          skillName: 'การตลาดดิจิทัลและการยิงโฆษณา (Digital Marketing)',
          type: 'อบรมและสัมมนา',
          typeClass: 'training',
          title: 'สัมมนาการวิเคราะห์พฤติกรรมผู้บริโภคและการยิงแอดออนไลน์ปี 2025',
          description: 'เข้าร่วมสัมมนาอัปเดตอัลกอริทึมการตลาด Meta, TikTok Ads และการวางกลยุทธ์ Content Conversion',
          channel: 'Webinar ออนไลน์ / สมาคมธุรกิจ',
          channelUrl: '',
          startDate: '10/08/2025',
          endDate: '20/08/2025',
          priority: 'สูง',
          priorityClass: 'high',
          isCompleted: true,
        },
        {
          id: 'p9',
          skillName: 'ทักษะการเจรจาต่อรองและการบริหารลูกค้าสัมพันธ์ (CRM)',
          type: 'ฝึกปฏิบัติ',
          typeClass: 'practice',
          title: 'การติดต่อเจรจากับซัพพลายเออร์และการวางระบบ CRM ดูแลลูกค้าประจำ',
          description: 'ลงมือเจรจาต้นทุนสินค้าจริงและทดลองตั้งค่าระบบ Line OA + CRM เพื่อเพิ่มยอดซื้อซ้ำ',
          channel: 'การทำงานจริง / โครงงานร้านค้า',
          channelUrl: '',
          startDate: '01/09/2025',
          endDate: '30/10/2025',
          priority: 'สูงมาก',
          priorityClass: 'very-high',
          isCompleted: false,
        },
      ],
    },
  ])

  // Modals States
  const [showAddPlanModal, setShowAddPlanModal] = useState(false)
  const [selectedCareerForModal, setSelectedCareerForModal] = useState('โปรแกรมเมอร์ (เทคโนโลยีสารสนเทศ/IT)')
  const [selectedSkillForModal, setSelectedSkillForModal] = useState('คอมพิวเตอร์และระบบสารสนเทศ')
  const [devType, setDevType] = useState('ศึกษาเรียนรู้')
  const [planTitle, setPlanTitle] = useState('')
  const [planChannel, setPlanChannel] = useState('')
  const [startDate, setStartDate] = useState('2025-08-01')
  const [endDate, setEndDate] = useState('2025-08-31')
  const [priority, setPriority] = useState('สูง')

  // Detailed Modals for "กดดูได้"
  const [viewingKpiModal, setViewingKpiModal] = useState(null) // 'all' | 'in-progress' | 'completed' | 'hours' | null
  const [viewingPlanDetail, setViewingPlanDetail] = useState(null)
  const [viewingCareerSummary, setViewingCareerSummary] = useState(null)

  // Toggle Career Header Accordion
  const handleToggleCareer = (careerId) => {
    setCareerStreams(
      careerStreams.map((c) =>
        c.id === careerId ? { ...c, isExpanded: !c.isExpanded } : c
      )
    )
  }

  // Toggle Plan Completion
  const handleToggleComplete = (careerId, planId, e) => {
    if (e) e.stopPropagation()
    setCareerStreams(
      careerStreams.map((career) => {
        if (career.id !== careerId) return career
        return {
          ...career,
          plans: career.plans.map((p) =>
            p.id === planId ? { ...p, isCompleted: !p.isCompleted } : p
          ),
        }
      })
    )
  }

  // Delete Plan
  const handleDeletePlan = (careerId, planId, title, e) => {
    if (e) e.stopPropagation()
    if (window.confirm(`ต้องการลบแผนพัฒนา "${title}" ใช่หรือไม่?`)) {
      setCareerStreams(
        careerStreams.map((career) => {
          if (career.id !== careerId) return career
          return {
            ...career,
            plans: career.plans.filter((p) => p.id !== planId),
          }
        })
      )
    }
  }

  // Open Add Plan Modal for specific career
  const handleOpenAddForCareer = (careerTitle, e) => {
    if (e) e.stopPropagation()
    setSelectedCareerForModal(careerTitle)
    setPlanTitle('')
    setPlanChannel('')
    setStartDate('2025-08-01')
    setEndDate('2025-08-31')
    setPriority('สูง')
    setShowAddPlanModal(true)
  }

  // Save new plan from Modal
  const handleSaveNewPlan = () => {
    if (!planTitle.trim()) {
      alert('กรุณาระบุเรื่องที่ต้องการพัฒนา')
      return
    }

    let typeCls = 'learn'
    if (devType === 'ฝึกปฏิบัติ') typeCls = 'practice'
    if (devType === 'อบรมและสัมมนา') typeCls = 'training'

    let prioCls = 'high'
    if (priority === 'สูงมาก') prioCls = 'very-high'
    if (priority === 'ปานกลาง' || priority === 'ต่ำ') prioCls = 'medium'

    const newPlanObj = {
      id: `p-${Date.now()}`,
      skillName: selectedSkillForModal,
      type: devType,
      typeClass: typeCls,
      title: planTitle.trim(),
      description: 'แผนการพัฒนาที่กำหนดขึ้นเองเพื่อยกระดับทักษะตามเป้าหมาย ICP',
      channel: planChannel.trim() || 'คอร์สออนไลน์ / ปฏิบัติการ',
      startDate: startDate || '01/08/2025',
      endDate: endDate || '31/08/2025',
      priority: priority,
      priorityClass: prioCls,
      isCompleted: false,
      milestones: [
        { text: `เริ่มต้นดำเนินการศึกษา/ฝึกปฏิบัติ: ${planTitle.trim()}`, done: false },
        { text: 'ประเมินผลความคืบหน้ารายสัปดาห์', done: false },
        { text: 'สรุปผลงานและแนบหลักฐานในระบบ', done: false },
      ],
    }

    setCareerStreams(
      careerStreams.map((career) => {
        if (
          career.title !== selectedCareerForModal &&
          !career.title.includes(selectedCareerForModal) &&
          !selectedCareerForModal.includes(career.shortTitle)
        ) {
          return career
        }
        return {
          ...career,
          isExpanded: true,
          plans: [newPlanObj, ...career.plans],
        }
      })
    )

    alert(`เพิ่มแผนพัฒนาเรื่อง "${planTitle.trim()}" เรียบร้อยแล้ว`)
    setShowAddPlanModal(false)
  }

  // AI Smart Suggestion
  const handleAiSmartRecommend = () => {
    alert('ระบบ AI ได้วิเคราะห์ช่องว่างทักษะของคุณ และแนะนำแผนการพัฒนาที่เหมาะสมที่สุด พร้อมแหล่งเรียนรู้ระดับแนวหน้าเรียบร้อยแล้ว')
  }

  // Export Excel / CSV Handler (Download to Local Machine)
  const handleExportExcel = () => {
    const allPlans = []
    careerStreams.forEach((career) => {
      (career.plans || []).forEach((plan) => {
        allPlans.push({
          career: career.title,
          skill: plan.skillName,
          title: plan.title,
          type: plan.type,
          channel: plan.channel,
          startDate: plan.startDate,
          endDate: plan.endDate,
          priority: plan.priority,
          status: plan.isCompleted ? 'เสร็จสมบูรณ์' : 'กำลังดำเนินการ',
        })
      })
    })

    if (allPlans.length === 0) {
      alert('ไม่มีข้อมูลแผนพัฒนาตนเองสำหรับส่งออก')
      return
    }

    const headers = 'ลำดับ,สายอาชีพ,ทักษะที่เกี่ยวข้อง,หัวข้อแผนพัฒนา,รูปแบบ,ช่องทาง/สถาบัน,วันที่เริ่ม,วันที่สิ้นสุด,ความสำคัญ,สถานะ\n'
    const rows = allPlans
      .map((p, i) => {
        const safeCareer = (p.career || '').replace(/"/g, '""')
        const safeSkill = (p.skill || '').replace(/"/g, '""')
        const safeTitle = (p.title || '').replace(/"/g, '""')
        const safeType = (p.type || '').replace(/"/g, '""')
        const safeChannel = (p.channel || '').replace(/"/g, '""')
        const safeStart = (p.startDate || '').replace(/"/g, '""')
        const safeEnd = (p.endDate || '').replace(/"/g, '""')
        const safePri = (p.priority || '').replace(/"/g, '""')
        const safeStatus = (p.status || '').replace(/"/g, '""')
        return `${i + 1},"${safeCareer}","${safeSkill}","${safeTitle}","${safeType}","${safeChannel}","${safeStart}","${safeEnd}","${safePri}","${safeStatus}"`
      })
      .join('\n')

    const csvContent = '\uFEFF' + headers + rows
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `ICP_Self_Development_Plan_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    alert('ดาวน์โหลดไฟล์แผนพัฒนาตนเอง (Excel / CSV) ลงเครื่องเรียบร้อยแล้ว!')
  }

  // Calculate totals
  const allPlans = careerStreams.flatMap((c) => c.plans)
  const totalPlansCount = allPlans.length
  const completedPlansCount = allPlans.filter((p) => p.isCompleted).length
  const inProgressPlansCount = totalPlansCount - completedPlansCount

  // Filter career streams
  const filteredStreams =
    selectedCareerFilter === 'all'
      ? careerStreams
      : careerStreams.filter((c) => c.id === selectedCareerFilter)

  return (
    <div className="self-dev-container">
      {/* 1. Page Banner */}
      <section className="self-dev-banner">
        <h1 className="self-dev-banner-title">การพัฒนาตนเอง (ศึกษาเรียนรู้ ฝึกปฏิบัติ)</h1>
      </section>

      {/* 2. KPI Summary Stats Grid (Clickable to view) */}
      <section className="dev-kpi-stats-grid">
        <div
          className="dev-kpi-card"
          onClick={() => setViewingKpiModal('all')}
          title="คลิกเพื่อดูรายการแผนพัฒนาทั้งหมด"
        >
          <div className="dev-kpi-icon-box blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="dev-kpi-info">
            <span className="dev-kpi-label">แผนทั้งหมด (คลิกดู)</span>
            <span className="dev-kpi-value">{totalPlansCount} แผน</span>
          </div>
        </div>

        <div
          className="dev-kpi-card"
          onClick={() => setViewingKpiModal('in-progress')}
          title="คลิกเพื่อดูรายการแผนที่กำลังดำเนินการ"
        >
          <div className="dev-kpi-icon-box amber">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="dev-kpi-info">
            <span className="dev-kpi-label">กำลังดำเนินการ (คลิกดู)</span>
            <span className="dev-kpi-value">{inProgressPlansCount} แผน</span>
          </div>
        </div>

        <div
          className="dev-kpi-card"
          onClick={() => setViewingKpiModal('completed')}
          title="คลิกเพื่อดูรายการแผนที่เสร็จสิ้นแล้ว"
        >
          <div className="dev-kpi-icon-box green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="dev-kpi-info">
            <span className="dev-kpi-label">เสร็จสิ้นแล้ว (คลิกดู)</span>
            <span className="dev-kpi-value">{completedPlansCount} แผน</span>
          </div>
        </div>

        <div
          className="dev-kpi-card"
          onClick={() => setViewingKpiModal('hours')}
          title="คลิกเพื่อดูสรุปชั่วโมงพัฒนาสะสม"
        >
          <div className="dev-kpi-icon-box purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="dev-kpi-info">
            <span className="dev-kpi-label">ชั่วโมงพัฒนาสะสม (คลิกดู)</span>
            <span className="dev-kpi-value">86 ชม.</span>
          </div>
        </div>
      </section>

      {/* 3. Controls Bar with Career Dropdown Selector (ตรงตามรูปภาพ 100%) */}
      <section className="dev-controls-card">
        {/* Career Dropdown Selector with Chevron (ตรงตามรูปภาพ) */}
        <div className="dev-career-dropdown-container">
          <span className="dev-career-dropdown-label">เลือกสายอาชีพ:</span>
          <div className="dev-career-dropdown-wrapper">
            <select
              className="dev-career-select-field"
              value={selectedCareerFilter}
              onChange={(e) => setSelectedCareerFilter(e.target.value)}
            >
              <option value="programmer">โปรแกรมเมอร์ (เทคโนโลยีสารสนเทศ/IT)</option>
              <option value="data-analyst">นักวิเคราะห์ข้อมูล (Data Analyst)</option>
              <option value="ui-ux">นักออกแบบ UI/UX ดิจิทัล</option>
              <option value="business">นักธุรกิจ / E-Commerce</option>
              <option value="all">-- ดูทุกสายอาชีพ ({totalPlansCount} แผน) --</option>
            </select>
            <div className="dev-career-dropdown-chevron">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        <div className="dev-action-buttons-group">
          <button
            type="button"
            className="btn-ai-smart-recommend"
            onClick={handleAiSmartRecommend}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
              <rect x="6" y="8" width="12" height="12" rx="3" />
              <circle cx="9.5" cy="13.5" r="1" fill="currentColor" />
              <circle cx="14.5" cy="13.5" r="1" fill="currentColor" />
            </svg>
            <span>AI แนะนำแผนพัฒนา</span>
          </button>

          <button
            type="button"
            className="btn-add-plan-primary"
            onClick={() => handleOpenAddForCareer('โปรแกรมเมอร์ (เทคโนโลยีสารสนเทศ/IT)')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>+ เพิ่มข้อมูลแผนใหม่</span>
          </button>
        </div>
      </section>

      {/* 4. Separated Career Stream Blocks (แยกแต่ละสายอาชีพชัดเจน และสามารถกดดูได้) */}
      <section className="dev-career-sections-wrapper">
        {filteredStreams.map((career) => {
          const cCompleted = career.plans.filter((p) => p.isCompleted).length
          const cTotal = career.plans.length
          const cPercent = cTotal === 0 ? 0 : Math.round((cCompleted / cTotal) * 100)

          return (
            <div key={career.id} className="career-stream-card">
              {/* Career Stream Header Banner */}
              <div
                className="career-stream-header"
                onClick={() => handleToggleCareer(career.id)}
                title="คลิกเพื่อพับเก็บหรือกางออก"
              >
                <div className="career-stream-left">
                  <div className="career-stream-avatar">
                    {career.id === 'programmer' && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    )}
                    {career.id === 'data-analyst' && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    )}
                    {career.id === 'ui-ux' && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19l7-7 3 3-7 7-3-3z" />
                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                        <path d="M2 2l7.586 7.586" />
                        <circle cx="11" cy="11" r="2" />
                      </svg>
                    )}
                    {career.id === 'business' && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    )}
                  </div>

                  <div className="career-stream-text-block">
                    <h2 className="career-stream-title">
                      <span>{career.title}</span>
                      <span className="career-stream-badge-tag">{career.badge}</span>
                    </h2>
                    <span className="career-stream-category">{career.category}</span>
                  </div>
                </div>

                {/* Right Side: Progress Bar, View Button, Expand Chevron */}
                <div className="career-stream-right" onClick={(e) => e.stopPropagation()}>
                  <div className="career-stream-progress-group">
                    <span className="career-stream-progress-text">
                      ความคืบหน้า: {cCompleted}/{cTotal} แผน ({cPercent}%)
                    </span>
                    <div className="career-stream-progress-bar-bg">
                      <div
                        className="career-stream-progress-fill"
                        style={{ width: `${cPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Button: กดดูสรุปสายอาชีพ */}
                  <button
                    type="button"
                    className="btn-view-career-detail"
                    onClick={() => setViewingCareerSummary(career)}
                    title="คลิกเพื่อดูสรุปแผนของสายอาชีพนี้"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>กดดูสรุปอาชีพ</span>
                  </button>

                  <button
                    type="button"
                    className="btn-view-career-detail"
                    style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' }}
                    onClick={(e) => handleOpenAddForCareer(career.title, e)}
                    title="เพิ่มแผนใหม่ในอาชีพนี้"
                  >
                    <span>+ เพิ่มแผน</span>
                  </button>

                  <div
                    className={`career-stream-chevron ${career.isExpanded ? '' : 'collapsed'}`}
                    onClick={() => handleToggleCareer(career.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Plans List Inside this Career Stream */}
              {career.isExpanded && (
                <div className="career-stream-plans-container">
                  {career.plans.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '14px' }}>
                      ยังไม่มีแผนการพัฒนาในสายอาชีพนี้ (กดปุ่ม <strong>"+ เพิ่มแผน"</strong> ด้านบนได้ทันที)
                    </div>
                  ) : (
                    career.plans.map((plan) => (
                      <div
                        key={plan.id}
                        className="dev-plan-card-item"
                        onClick={() => setViewingPlanDetail({ ...plan, careerTitle: career.title })}
                        title="คลิกเพื่อเปิดดูรายละเอียดแผนงานเจาะลึก"
                      >
                        {/* Top Row: Skill & Category Badges */}
                        <div className="dev-plan-card-top-row">
                          <div className="dev-plan-skill-group">
                            <span className={`dev-plan-type-pill ${plan.typeClass}`}>
                              {plan.type}
                            </span>
                            <span className="dev-plan-skill-title">
                              ทักษะ: {plan.skillName}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                            <span className={`dev-plan-priority-tag ${plan.priorityClass}`}>
                              ความสำคัญ: {plan.priority}
                            </span>

                            <button
                              type="button"
                              className={`btn-plan-action-done ${plan.isCompleted ? 'completed' : ''}`}
                              onClick={(e) => handleToggleComplete(career.id, plan.id, e)}
                              title={plan.isCompleted ? 'คลิกเพื่อเปลี่ยนเป็นกำลังทำ' : 'คลิกเมื่อทำเสร็จสิ้นแล้ว'}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>{plan.isCompleted ? 'เสร็จสิ้นแล้ว' : 'กำลังดำเนินการ'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Main Plan Title */}
                        <h3 className="dev-plan-main-title">{plan.title}</h3>

                        {/* Meta Row: Channel, Duration, Actions */}
                        <div className="dev-plan-meta-row">
                          <div className="dev-plan-meta-left">
                            <div className="dev-plan-meta-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                              </svg>
                              <span>ช่องทาง: <strong>{plan.channel}</strong></span>
                            </div>

                            <div className="dev-plan-meta-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                              </svg>
                              <span>ระยะเวลา: <strong>{plan.startDate} - {plan.endDate}</strong></span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="dev-plan-card-actions" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              className="btn-plan-action-view"
                              onClick={() => setViewingPlanDetail({ ...plan, careerTitle: career.title })}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                              <span>กดดูรายละเอียด</span>
                            </button>

                            <button
                              type="button"
                              className="btn-plan-action-delete"
                              onClick={(e) => handleDeletePlan(career.id, plan.id, plan.title, e)}
                              title="ลบแผนนี้"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )
        })}
      </section>

      {/* 5. Bottom Action Bar */}
      <section className="dev-bottom-action-bar">
        <div className="dev-bottom-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span>รวมแผนการพัฒนาตนเองทุกสายอาชีพ: <strong>{totalPlansCount} แผนงาน</strong></span>
        </div>

        <div className="dev-bottom-actions">
          <button
            type="button"
            className="btn-export-excel"
            onClick={handleExportExcel}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>ส่งออก EXCEL</span>
          </button>
        </div>
      </section>

      {/* ========================================================
          5.5 Pop-up Modal: "กดดูสรุป KPI Stats" (KPI Detail Modal)
          ======================================================== */}
      {viewingKpiModal && (
        <div className="dev-modal-overlay" onClick={() => setViewingKpiModal(null)}>
          <div className="dev-modal-dialog kpi-summary-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dev-modal-header">
              <div className="dev-modal-title-group">
                <div className={`modal-header-icon-box ${viewingKpiModal === 'all' ? 'blue' : viewingKpiModal === 'in-progress' ? 'amber' : viewingKpiModal === 'completed' ? 'green' : 'purple'}`}>
                  {viewingKpiModal === 'all' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  )}
                  {viewingKpiModal === 'in-progress' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  )}
                  {viewingKpiModal === 'completed' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  )}
                  {viewingKpiModal === 'hours' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="dev-modal-title">
                    {viewingKpiModal === 'all' && `สรุปแผนพัฒนาตนเองทั้งหมด (${totalPlansCount} แผน)`}
                    {viewingKpiModal === 'in-progress' && `แผนพัฒนาที่กำลังดำเนินการ (${inProgressPlansCount} แผน)`}
                    {viewingKpiModal === 'completed' && `แผนพัฒนาที่เสร็จสิ้นสมบูรณ์ (${completedPlansCount} แผน)`}
                    {viewingKpiModal === 'hours' && 'สรุปชั่วโมงการพัฒนาตนเองสะสม (86 ชั่วโมง)'}
                  </h3>
                  <p className="dev-modal-subtitle">
                    {viewingKpiModal === 'all' && 'ภาพรวมแผนการเรียนรู้และฝึกปฏิบัติทุกสายอาชีพเป้าหมาย'}
                    {viewingKpiModal === 'in-progress' && 'รายการแผนงานที่อยู่ระหว่างดำเนินการพัฒนาทักษะ'}
                    {viewingKpiModal === 'completed' && 'รายการแผนงานที่สำเร็จตามเกณฑ์สมรรถนะ ICP'}
                    {viewingKpiModal === 'hours' && 'สัดส่วนและประวัติการสะสมชั่วโมงการเรียนรู้แยกตามสายอาชีพ'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="dev-modal-close-btn"
                onClick={() => setViewingKpiModal(null)}
                title="ปิด"
              >
                ✕
              </button>
            </div>

            <div className="kpi-modal-body">
              {/* Top Mini Summary Stat Pills for all modal */}
              {viewingKpiModal !== 'hours' && (
                <div className="kpi-stats-pill-grid">
                  <div className="kpi-pill-item blue" onClick={() => setViewingKpiModal('all')}>
                    <span className="kpi-pill-label">แผนทั้งหมด</span>
                    <strong className="kpi-pill-val">{totalPlansCount} แผน</strong>
                  </div>
                  <div className="kpi-pill-item amber" onClick={() => setViewingKpiModal('in-progress')}>
                    <span className="kpi-pill-label">กำลังดำเนินการ</span>
                    <strong className="kpi-pill-val">{inProgressPlansCount} แผน</strong>
                  </div>
                  <div className="kpi-pill-item green" onClick={() => setViewingKpiModal('completed')}>
                    <span className="kpi-pill-label">เสร็จสิ้นแล้ว</span>
                    <strong className="kpi-pill-val">{completedPlansCount} แผน</strong>
                  </div>
                  <div className="kpi-pill-item purple" onClick={() => setViewingKpiModal('hours')}>
                    <span className="kpi-pill-label">ชั่วโมงสะสม</span>
                    <strong className="kpi-pill-val">86 ชม.</strong>
                  </div>
                </div>
              )}

              {/* View 1, 2, 3: Plans Listing */}
              {viewingKpiModal !== 'hours' && (
                <div className="kpi-plans-scroll-list">
                  {careerStreams
                    .flatMap((career) =>
                      career.plans
                        .filter((plan) => {
                          if (viewingKpiModal === 'in-progress') return !plan.isCompleted
                          if (viewingKpiModal === 'completed') return plan.isCompleted
                          return true
                        })
                        .map((plan) => ({ ...plan, careerTitle: career.title, careerId: career.id }))
                    )
                    .map((plan) => (
                      <div
                        key={plan.id}
                        className="kpi-plan-item-card"
                        onClick={() => {
                          setViewingPlanDetail(plan)
                          setViewingKpiModal(null)
                        }}
                        title="คลิกเพื่อดูรายละเอียดเชิงลึกของแผนนี้"
                      >
                        <div className="kpi-plan-item-top">
                          <div className="kpi-plan-badges">
                            <span className="kpi-career-tag">{plan.careerTitle.split(' ')[0]}</span>
                            <span className={`dev-plan-type-pill ${plan.typeClass}`}>{plan.type}</span>
                            <span className={`dev-plan-priority-tag ${plan.priorityClass}`}>{plan.priority}</span>
                          </div>
                          <span className={`plan-status-badge ${plan.isCompleted ? 'completed' : 'in-progress'}`}>
                            {plan.isCompleted ? 'เสร็จสิ้นแล้ว' : 'กำลังดำเนินการ'}
                          </span>
                        </div>

                        <h4 className="kpi-plan-item-title">{plan.title}</h4>

                        <div className="kpi-plan-item-meta">
                          <span>ทักษะ: <strong>{plan.skillName}</strong></span>
                          <span>ช่องทาง: <strong>{plan.channel}</strong></span>
                          <span>ระยะเวลา: <strong>{plan.startDate} - {plan.endDate}</strong></span>
                        </div>

                        <div className="kpi-plan-item-bottom" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            className="btn-plan-action-view"
                            onClick={() => {
                              setViewingPlanDetail(plan)
                              setViewingKpiModal(null)
                            }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            <span>กดดูรายละเอียด</span>
                          </button>

                          <button
                            type="button"
                            className={`btn-plan-action-done ${plan.isCompleted ? 'completed' : ''}`}
                            onClick={(e) => handleToggleComplete(plan.careerId, plan.id, e)}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{plan.isCompleted ? 'เสร็จสิ้นแล้ว' : 'บันทึกเป็นเสร็จสิ้น'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* View 4: Study Hours Detailed Breakdown */}
              {viewingKpiModal === 'hours' && (
                <div className="kpi-hours-container">
                  {/* Total Highlight */}
                  <div className="kpi-hours-highlight-card">
                    <div className="hours-total-box">
                      <span className="hours-total-label">ชั่วโมงพัฒนาสะสมรวม</span>
                      <strong className="hours-total-num">86 <span className="unit">ชั่วโมง</span></strong>
                      <span className="hours-total-sub">คิดเป็น 86% ของเป้าหมายประจำภาคเรียน (100 ชม.)</span>
                    </div>

                    <div className="hours-progress-track">
                      <div className="hours-progress-fill" style={{ width: '86%' }}></div>
                    </div>
                  </div>

                  {/* 2 Activity Types Breakdown */}
                  <div className="hours-type-grid">
                    <div className="hours-type-card blue">
                      <div className="type-card-header">
                        <span className="type-title">ศึกษาเรียนรู้ (Knowledge)</span>
                        <strong className="type-val">48 ชม. (56%)</strong>
                      </div>
                      <p className="type-desc">คอร์สออนไลน์, สัมมนาไอที, บทความวิชาการ, หนังสือคู่มือ</p>
                    </div>

                    <div className="hours-type-card green">
                      <div className="type-card-header">
                        <span className="type-title">ฝึกปฏิบัติ / โครงงาน (Practice)</span>
                        <strong className="type-val">38 ชม. (44%)</strong>
                      </div>
                      <p className="type-desc">การเขียนโปรแกรมจริง, แล็บทดลอง, สร้างโมเดล, ออกแบบ Prototype</p>
                    </div>
                  </div>

                  {/* Breakdown by Career Streams */}
                  <div className="hours-by-career-box">
                    <h4 className="hours-career-title">สัดส่วนชั่วโมงแยกตามสายอาชีพเป้าหมาย:</h4>
                    <div className="hours-career-list">
                      <div className="hours-career-row">
                        <div className="career-row-info">
                          <span className="c-name">โปรแกรมเมอร์ (IT)</span>
                          <span className="c-hrs">36 ชม. (42%)</span>
                        </div>
                        <div className="c-bar-bg"><div className="c-bar-fill" style={{ width: '42%', background: '#2563eb' }}></div></div>
                      </div>

                      <div className="hours-career-row">
                        <div className="career-row-info">
                          <span className="c-name">นักวิเคราะห์ข้อมูล (Data Analyst)</span>
                          <span className="c-hrs">24 ชม. (28%)</span>
                        </div>
                        <div className="c-bar-bg"><div className="c-bar-fill" style={{ width: '28%', background: '#059669' }}></div></div>
                      </div>

                      <div className="hours-career-row">
                        <div className="career-row-info">
                          <span className="c-name">นักออกแบบ UI/UX ดิจิทัล</span>
                          <span className="c-hrs">14 ชม. (16%)</span>
                        </div>
                        <div className="c-bar-bg"><div className="c-bar-fill" style={{ width: '16%', background: '#7c3aed' }}></div></div>
                      </div>

                      <div className="hours-career-row">
                        <div className="career-row-info">
                          <span className="c-name">นักธุรกิจ / E-Commerce</span>
                          <span className="c-hrs">12 ชม. (14%)</span>
                        </div>
                        <div className="c-bar-bg"><div className="c-bar-fill" style={{ width: '14%', background: '#d97706' }}></div></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="dev-modal-footer">
              <button
                type="button"
                className="btn-dev-modal-cancel"
                onClick={() => setViewingKpiModal(null)}
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          6. Pop-up Modal: "กดดูรายละเอียดแผนพัฒนา" (Plan Detail Modal)
          ======================================================== */}
      {viewingPlanDetail && (
        <div className="dev-modal-overlay" onClick={() => setViewingPlanDetail(null)}>
          <div className="dev-modal-dialog plan-detail-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dev-modal-header">
              <div className="dev-modal-title-group">
                <div className="modal-header-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div>
                  <h3 className="dev-modal-title">รายละเอียดแผนพัฒนาตนเอง</h3>
                  <p className="dev-modal-subtitle">สายอาชีพ: {viewingPlanDetail.careerTitle}</p>
                </div>
              </div>
              <button
                type="button"
                className="dev-modal-close-btn"
                onClick={() => setViewingPlanDetail(null)}
                title="ปิด"
              >
                ✕
              </button>
            </div>

            <div className="plan-detail-modal-body">
              {/* Top Highlight Card */}
              <div className="plan-detail-top-card">
                <div className="plan-detail-badge-row">
                  <span className={`dev-plan-type-pill ${viewingPlanDetail.typeClass}`}>
                    {viewingPlanDetail.type}
                  </span>
                  <span className={`dev-plan-priority-tag ${viewingPlanDetail.priorityClass}`}>
                    ความสำคัญ: {viewingPlanDetail.priority}
                  </span>
                  <span className={`plan-status-badge ${viewingPlanDetail.isCompleted ? 'completed' : 'in-progress'}`}>
                    {viewingPlanDetail.isCompleted ? 'เสร็จสิ้นแล้ว' : 'กำลังดำเนินการ'}
                  </span>
                </div>

                <h2 className="plan-detail-title">{viewingPlanDetail.title}</h2>
                <p className="plan-detail-desc">
                  {viewingPlanDetail.description}
                </p>
              </div>

              {/* 4-Item Information Grid */}
              <div className="plan-detail-info-grid">
                <div className="plan-detail-info-item">
                  <div className="info-item-icon-box blue">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div className="info-item-text">
                    <span className="plan-detail-info-label">ทักษะที่เกี่ยวข้อง</span>
                    <strong className="plan-detail-info-value">{viewingPlanDetail.skillName}</strong>
                  </div>
                </div>

                <div className="plan-detail-info-item">
                  <div className="info-item-icon-box purple">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <div className="info-item-text">
                    <span className="plan-detail-info-label">ช่องทาง/สื่อการเรียนรู้</span>
                    <strong className="plan-detail-info-value">{viewingPlanDetail.channel}</strong>
                  </div>
                </div>

                <div className="plan-detail-info-item">
                  <div className="info-item-icon-box amber">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div className="info-item-text">
                    <span className="plan-detail-info-label">ระยะเวลาดำเนินการ</span>
                    <strong className="plan-detail-info-value">{viewingPlanDetail.startDate} - {viewingPlanDetail.endDate}</strong>
                  </div>
                </div>

                <div className="plan-detail-info-item">
                  <div className={`info-item-icon-box ${viewingPlanDetail.isCompleted ? 'green' : 'amber'}`}>
                    {viewingPlanDetail.isCompleted ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    )}
                  </div>
                  <div className="info-item-text">
                    <span className="plan-detail-info-label">สถานะปัจจุบัน</span>
                    <strong className="plan-detail-info-value" style={{ color: viewingPlanDetail.isCompleted ? '#059669' : '#d97706' }}>
                      {viewingPlanDetail.isCompleted ? 'เสร็จสิ้นสมบูรณ์' : 'กำลังดำเนินการ'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Milestones / Checklist */}
              {viewingPlanDetail.milestones && viewingPlanDetail.milestones.length > 0 && (
                <div className="plan-milestones-box">
                  <div className="milestones-box-header">
                    <div className="milestones-header-left">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                      <h4 className="plan-milestones-title">เป้าหมายย่อยและความคืบหน้า (Milestones)</h4>
                    </div>
                    <span className="milestones-count-tag">
                      {viewingPlanDetail.milestones.filter((m) => m.done).length}/{viewingPlanDetail.milestones.length} สำเร็จ
                    </span>
                  </div>

                  <div className="milestones-list">
                    {viewingPlanDetail.milestones.map((m, idx) => (
                      <div key={idx} className={`milestone-item-row ${m.done ? 'done' : ''}`}>
                        <div className={`milestone-check-box ${m.done ? 'checked' : ''}`}>
                          {m.done ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <span className="milestone-dot"></span>
                          )}
                        </div>
                        <span className="milestone-text">
                          {m.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="dev-modal-footer">
              <button
                type="button"
                className="btn-dev-modal-cancel"
                onClick={() => setViewingPlanDetail(null)}
              >
                ปิดหน้าต่าง
              </button>

              <button
                type="button"
                className="btn-toggle-plan-complete"
                style={{
                  backgroundColor: viewingPlanDetail.isCompleted ? '#f8fafc' : '#15803d',
                  color: viewingPlanDetail.isCompleted ? '#475569' : '#ffffff',
                  border: viewingPlanDetail.isCompleted ? '1.5px solid #cbd5e1' : 'none',
                }}
                onClick={() => {
                  handleToggleComplete(viewingPlanDetail.id)
                  setViewingPlanDetail({ ...viewingPlanDetail, isCompleted: !viewingPlanDetail.isCompleted })
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{viewingPlanDetail.isCompleted ? 'เปลี่ยนเป็นกำลังทำ' : 'บันทึกเป็นเสร็จสิ้นแล้ว'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          7. Pop-up Modal: "กดดูสรุปสายอาชีพ" (Career Stream Summary Modal)
          ======================================================== */}
      {viewingCareerSummary && (
        <div className="dev-modal-overlay" onClick={() => setViewingCareerSummary(null)}>
          <div className="dev-modal-dialog career-summary-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dev-modal-header">
              <div className="dev-modal-title-group">
                <div className="modal-header-icon-box blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div>
                  <h3 className="dev-modal-title">สรุปแผนพัฒนา: {viewingCareerSummary.title}</h3>
                  <p className="dev-modal-subtitle">{viewingCareerSummary.category}</p>
                </div>
              </div>
              <button
                type="button"
                className="dev-modal-close-btn"
                onClick={() => setViewingCareerSummary(null)}
                title="ปิด"
              >
                ✕
              </button>
            </div>

            <div className="career-summary-modal-body">
              {/* Top 3 Summary Cards */}
              <div className="career-summary-stat-grid">
                <div className="career-summary-stat-box blue">
                  <span className="stat-box-label">แผนทั้งหมด</span>
                  <strong className="stat-box-value">{viewingCareerSummary.plans.length} แผน</strong>
                </div>
                <div className="career-summary-stat-box green">
                  <span className="stat-box-label">เสร็จสิ้นแล้ว</span>
                  <strong className="stat-box-value">
                    {viewingCareerSummary.plans.filter((p) => p.isCompleted).length} แผน
                  </strong>
                </div>
                <div className="career-summary-stat-box amber">
                  <span className="stat-box-label">กำลังดำเนินการ</span>
                  <strong className="stat-box-value">
                    {viewingCareerSummary.plans.filter((p) => !p.isCompleted).length} แผน
                  </strong>
                </div>
              </div>

              <h4 className="career-summary-section-title">
                รายการแผนงานในสายอาชีพนี้:
              </h4>

              <div className="career-summary-plans-list">
                {viewingCareerSummary.plans.map((p) => (
                  <div
                    key={p.id}
                    className="career-summary-plan-card"
                    onClick={() => {
                      setViewingPlanDetail({ ...p, careerTitle: viewingCareerSummary.title })
                      setViewingCareerSummary(null)
                    }}
                    title="คลิกเพื่อดูรายละเอียดเชิงลึกของแผนนี้"
                  >
                    <div className="summary-plan-left">
                      <div className="summary-plan-title">{p.title}</div>
                      <div className="summary-plan-meta">
                        <span>ทักษะ: <strong>{p.skillName}</strong></span>
                        <span>•</span>
                        <span>ช่องทาง: <strong>{p.channel}</strong></span>
                      </div>
                    </div>
                    <span className={`plan-status-badge ${p.isCompleted ? 'completed' : 'in-progress'}`}>
                      {p.isCompleted ? 'เสร็จสิ้นแล้ว' : 'กำลังดำเนินการ'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dev-modal-footer">
              <button
                type="button"
                className="btn-dev-modal-cancel"
                onClick={() => setViewingCareerSummary(null)}
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          8. Modal Dialog "เพิ่มข้อมูลแผนใหม่" (ตรงตามรูปภาพ 100%)
          ======================================================== */}
      {showAddPlanModal && (
        <div className="dev-modal-overlay" onClick={() => setShowAddPlanModal(false)}>
          <div className="dev-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dev-modal-header">
              <div className="dev-modal-title-group">
                <div className="modal-header-icon-box blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="dev-modal-title">เพิ่มข้อมูลแผนใหม่</h3>
                  <p className="dev-modal-subtitle">กำหนดเป้าหมายและกิจกรรมพัฒนาทักษะรายบุคคล</p>
                </div>
              </div>
              <button
                type="button"
                className="dev-modal-close-btn"
                onClick={() => setShowAddPlanModal(false)}
                title="ปิด"
              >
                ✕
              </button>
            </div>

            <div className="dev-modal-body">
              {/* Row 1: อาชีพเป้าหมาย & คุณสมบัติที่ต้องการ */}
              <div className="dev-form-grid-2">
                <div className="dev-form-group">
                  <label className="dev-form-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <span>อาชีพเป้าหมาย *</span>
                  </label>
                  <select
                    className="dev-form-select"
                    value={selectedCareerForModal}
                    onChange={(e) => setSelectedCareerForModal(e.target.value)}
                  >
                    <option value="โปรแกรมเมอร์ (เทคโนโลยีสารสนเทศ/IT)">โปรแกรมเมอร์ (เทคโนโลยีสารสนเทศ/IT)</option>
                    <option value="นักวิเคราะห์ข้อมูล (Data Analyst)">นักวิเคราะห์ข้อมูล (Data Analyst)</option>
                    <option value="นักออกแบบ UI/UX ดิจิทัล">นักออกแบบ UI/UX ดิจิทัล</option>
                    <option value="นักธุรกิจ / E-Commerce">นักธุรกิจ / E-Commerce</option>
                  </select>
                </div>

                <div className="dev-form-group">
                  <label className="dev-form-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    <span>คุณสมบัติที่ต้องการ *</span>
                  </label>
                  <select
                    className="dev-form-select"
                    value={selectedSkillForModal}
                    onChange={(e) => setSelectedSkillForModal(e.target.value)}
                  >
                    <option value="คอมพิวเตอร์และระบบสารสนเทศ">คอมพิวเตอร์และระบบสารสนเทศ</option>
                    <option value="ทักษะการเขียนโปรแกรมขั้นสูง (Full-Stack)">ทักษะการเขียนโปรแกรมขั้นสูง (Full-Stack)</option>
                    <option value="ทำงานร่วมกับผู้อื่น (Teamwork & Agile)">ทำงานร่วมกับผู้อื่น (Teamwork & Agile)</option>
                    <option value="สื่อสารภาษาอังกฤษในการทำงาน">สื่อสารภาษาอังกฤษในการทำงาน</option>
                    <option value="SQL & Data Wrangling ขั้นสูง">SQL & Data Wrangling ขั้นสูง</option>
                    <option value="การสร้าง Interactive Dashboard ด้วย Power BI">การสร้าง Interactive Dashboard ด้วย Power BI</option>
                    <option value="Design Systems & Figma Prototyping">Design Systems & Figma Prototyping</option>
                    <option value="User Research & Usability Testing">User Research & Usability Testing</option>
                    <option value="การตลาดดิจิทัลและการยิงโฆษณา">การตลาดดิจิทัลและการยิงโฆษณา</option>
                    <option value="ทักษะการเจรจาต่อรองและการบริหารลูกค้าสัมพันธ์">ทักษะการเจรจาต่อรองและการบริหารลูกค้าสัมพันธ์</option>
                  </select>
                </div>
              </div>

              {/* Row 2: การพัฒนา & เรื่อง */}
              <div className="dev-form-grid-2">
                <div className="dev-form-group">
                  <label className="dev-form-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <span>การพัฒนา *</span>
                  </label>
                  <select
                    className="dev-form-select"
                    value={devType}
                    onChange={(e) => setDevType(e.target.value)}
                  >
                    <option value="ศึกษาเรียนรู้">ศึกษาเรียนรู้</option>
                    <option value="ฝึกปฏิบัติ">ฝึกปฏิบัติ</option>
                    <option value="อบรมและสัมมนา">อบรมและสัมมนา</option>
                    <option value="สอบใบรับรองวิชาชีพ">สอบใบรับรองวิชาชีพ</option>
                  </select>
                </div>

                <div className="dev-form-group">
                  <label className="dev-form-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                    <span>เรื่อง *</span>
                  </label>
                  <div className="dev-input-with-action">
                    <input
                      type="text"
                      className="dev-form-input"
                      placeholder="เช่น คอร์สเรียน React และ Node.js เพื่อสร้าง Web App"
                      value={planTitle}
                      onChange={(e) => setPlanTitle(e.target.value)}
                    />
                    <button
                      type="button"
                      className="dev-input-action-btn"
                      onClick={() => setPlanTitle('พัฒนาโครงงาน Full-Stack Web Application')}
                      title="AI ช่วยแนะนำหัวข้อ"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 3: ช่องทาง */}
              <div className="dev-form-group">
                <label className="dev-form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>ช่องทาง *</span>
                </label>
                <div className="dev-input-with-action">
                  <input
                    type="text"
                    className="dev-form-input"
                    placeholder="เช่น Coursera, Udemy, YouTube, โครงการในมหาวิทยาลัย..."
                    value={planChannel}
                    onChange={(e) => setPlanChannel(e.target.value)}
                  />
                  <button
                    type="button"
                    className="dev-input-action-btn"
                    onClick={() => setPlanChannel('Coursera / YouTube')}
                    title="AI แนะนำช่องทาง"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Row 4: วันเริ่มพัฒนา & วันสิ้นสุดพัฒนา */}
              <div className="dev-form-grid-2">
                <div className="dev-form-group">
                  <label className="dev-form-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>วันเริ่มพัฒนา *</span>
                  </label>
                  <input
                    type="date"
                    className="dev-form-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span style={{ fontSize: '11px', color: '#64748b' }}>วัน/เดือน/ปี ค.ศ.</span>
                </div>

                <div className="dev-form-group">
                  <label className="dev-form-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>วันสิ้นสุดพัฒนา</span>
                  </label>
                  <input
                    type="date"
                    className="dev-form-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <span style={{ fontSize: '11px', color: '#64748b' }}>วัน/เดือน/ปี ค.ศ.</span>
                </div>
              </div>

              {/* Row 5: ความสำคัญ */}
              <div className="dev-form-group">
                <label className="dev-form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>ความสำคัญ *</span>
                </label>
                <select
                  className="dev-form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="สูงมาก">สูงมาก</option>
                  <option value="สูง">สูง</option>
                  <option value="ปานกลาง">ปานกลาง</option>
                  <option value="ต่ำ">ต่ำ</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="dev-modal-footer">
              <button
                type="button"
                className="btn-dev-modal-cancel"
                onClick={() => setShowAddPlanModal(false)}
              >
                ยกเลิก
              </button>

              <button
                type="button"
                className="btn-dev-modal-submit"
                onClick={handleSaveNewPlan}
              >
                เพิ่มข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
