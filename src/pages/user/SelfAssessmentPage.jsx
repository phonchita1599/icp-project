import React, { useState } from 'react'
import './SelfAssessmentPage.css'

export default function SelfAssessmentPage({ onNavigateHome }) {
  // 7 Evaluation Options
  const evaluationOptions = [
    '1.ได้รู้จักหรือมีทักษะนี้เพียงเล็กน้อยเท่านั้น',
    '2.ได้เรียนทักษะนี้บ้างและพอทำได้ ถึงแม้จะน้อยกว่าคนทั่วไป',
    '3.ได้มีประสบการณ์ในการใช้ทักษะนี้เป็นครั้งคราว และทำได้เทียบเท่ากับคนทั่วไป',
    '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
    '5.ได้ถ่ายทอดทักษะนี้แก่ผู้อื่น หรือเป็นต้นแบบของทักษะนี้แก่ผู้อื่น',
    '(Yes) มีใบประกาศ มีใบรับรอง ผ่านการฝึกประสบการณ์ ได้รับใบอนุญาตขับขี่',
    '(No) ยังไม่มีใบประกาศ ยังไม่มีใบรับรอง ยังไม่ผ่านการฝึกประสบการณ์ ยังไม่ได้รับใบอนุญาตขับขี่',
  ]

  // Monthly Cycle Tabs List
  const [monthList, setMonthList] = useState([
    { id: '2025-01', name: 'ม.ค. 68', fullName: 'มกราคม 2568' },
    { id: '2025-02', name: 'ก.พ. 68', fullName: 'กุมภาพันธ์ 2568' },
    { id: '2025-03', name: 'มี.ค. 68', fullName: 'มีนาคม 2568' },
    { id: '2025-04', name: 'เม.ย. 68', fullName: 'เมษายน 2568' },
    { id: '2025-08', name: 'ส.ค. 68 (ปัจจุบัน)', fullName: 'สิงหาคม 2568 (เดือนล่าสุด)' },
  ])

  const [selectedMonthId, setSelectedMonthId] = useState('2025-08')

  // Selected Skill for Pop-up Modal (null = modal closed)
  const [selectedSkillModal, setSelectedSkillModal] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Multiple Target Careers State (พับเก็บและกางออกได้)
  const [careerGoals, setCareerGoals] = useState([
    {
      id: 'programmer',
      title: 'โปรแกรมเมอร์ (เทคโนโลยีสารสนเทศ/IT)',
      typeText: 'อาชีพเป้าหมายหลัก',
      isPrimary: true,
      isExpanded: true, // กางออกโดยค่าเริ่มต้น
      skills: [
        {
          id: 1,
          name: 'คอมพิวเตอร์',
          category: 'กลุ่ม: เทคโนโลยีสารสนเทศ/IT',
          evidenceTitle: 'เรียนรู้ทฤษฎีการเขียนโปรแกรม',
          evidenceChannels: 'ช่องทาง: คอร์สออนไลน์, หนังสือ, เอกสารประกอบการสอน',
        },
        {
          id: 2,
          name: 'ทักษะการเขียนโปรแกรมขั้นสูง',
          category: 'กลุ่ม: ทักษะทางเทคนิค(Technical Skill)',
          evidenceTitle: 'ศึกษาการพัฒนา Web / Mobile Application และฐานข้อมูล',
          evidenceChannels: 'ช่องทาง: GitHub Projects, คอร์สออนไลน์, โครงงานปฏิบัติจริง',
        },
        {
          id: 3,
          name: 'ทำงานร่วมกับผู้อื่น',
          category: 'กลุ่ม: การทำงานร่วมกับผู้อื่น (Interpersonal/Cooperation/Teamwork)',
          evidenceTitle: 'การทำโครงงานกลุ่มและการสื่อสารประสานงาน',
          evidenceChannels: 'ช่องทาง: กิจกรรมมหาวิทยาลัย, งานกลุ่ม, โครงการจิตอาสา',
        },
        {
          id: 4,
          name: 'สื่อสารภาษาอังกฤษขั้นเทพ',
          category: 'กลุ่ม: ทักษะการสื่อสาร(Communication Skill)',
          evidenceTitle: 'การสื่อสารภาษาอังกฤษเพื่อการทำงานและนำเสนอผลงาน',
          evidenceChannels: 'ช่องทาง: แอปเรียนภาษา, คอร์สออนไลน์, บทสนทนาในชีวิตประจำวัน',
        },
      ],
    },
    {
      id: 'data-analyst',
      title: 'นักวิเคราะห์ข้อมูล (Data Analyst)',
      typeText: 'อาชีพเป้าหมายรอง',
      isPrimary: false,
      isExpanded: false, // พับเก็บโดยค่าเริ่มต้น
      skills: [
        {
          id: 101,
          name: 'การใช้ภาษา SQL และการจัดการฐานข้อมูล',
          category: 'กลุ่ม: การบริหารจัดการข้อมูล (Database)',
          evidenceTitle: 'ฝึกเขียนคิวรี SQL สำหรับการดึงและแปลงข้อมูล',
          evidenceChannels: 'ช่องทาง: Kaggle, LeetCode SQL, ฐานข้อมูลจำลอง',
        },
        {
          id: 102,
          name: 'Data Visualization & Dashboard (Power BI / Tableau)',
          category: 'กลุ่ม: การนำเสนอข้อมูลเชิงภาพ',
          evidenceTitle: 'สร้าง Dashboard วิเคราะห์ยอดขายและพฤติกรรมผู้ใช้',
          evidenceChannels: 'ช่องทาง: Power BI Projects, รายงานสรุปข้อมูล',
        },
        {
          id: 103,
          name: 'สถิติและการวิเคราะห์เชิงตัวเลข',
          category: 'กลุ่ม: ทักษะการวิเคราะห์ (Analytical Skill)',
          evidenceTitle: 'การใช้สถิติเชิงพรรณนาและอนุมานในการตัดสินใจ',
          evidenceChannels: 'ช่องทาง: บทความวิชาการ, รายงานการวิเคราะห์',
        },
      ],
    },
    {
      id: 'uiux-designer',
      title: 'นักออกแบบ UI/UX ดิจิทัล',
      typeText: 'อาชีพเป้าหมายทางเลือก',
      isPrimary: false,
      isExpanded: false, // พับเก็บโดยค่าเริ่มต้น
      skills: [
        {
          id: 201,
          name: 'การออกแบบ User Interface (Figma / Adobe XD)',
          category: 'กลุ่ม: การออกแบบดิจิทัล (Design)',
          evidenceTitle: 'ออกแบบ Wireframe และ Prototype สำหรับ Web/Mobile',
          evidenceChannels: 'ช่องทาง: Figma Community, Dribbble Portfolio',
        },
        {
          id: 202,
          name: 'การวิจัยและทดสอบผู้ใช้งาน (User Research & Usability Testing)',
          category: 'กลุ่ม: การทำความเข้าใจผู้ใช้งาน',
          evidenceTitle: 'ทำแบบสอบถามและสัมภาษณ์ผู้ใช้งานจริง',
          evidenceChannels: 'ช่องทาง: User Journey Maps, Usability Test Reports',
        },
      ],
    },
  ])

  // Monthly Data Store: { [monthId]: { [skillId]: { level, note, images: [], durationHours, startDate, endDate, timePeriod } } }
  const [monthlyData, setMonthlyData] = useState({
    '2025-08': {
      1: {
        level: '5.ได้ถ่ายทอดทักษะนี้แก่ผู้อื่น หรือเป็นต้นแบบของทักษะนี้แก่ผู้อื่น',
        note: 'ในเดือนนี้ได้ใช้ทักษะคอมพิวเตอร์และระบบฐานข้อมูลขั้นสูงในการทำงานจริง และสอนเพื่อนร่วมทีมในการเขียนโปรแกรม',
        images: [
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&auto=format&fit=crop&q=60',
        ],
        durationHours: '25',
        startDate: '2025-08-01',
        endDate: '2025-08-25',
        timePeriod: 'สัปดาห์ละ 3 วัน (ช่วงเย็นและวันหยุด)',
      },
      2: {
        level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
        note: 'พัฒนา Full-Stack Project ด้วย React + Node.js พร้อมระบบ Authen สำเร็จสมบูรณ์',
        images: [
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&auto=format&fit=crop&q=60',
        ],
        durationHours: '40',
        startDate: '2025-08-05',
        endDate: '2025-08-28',
        timePeriod: 'วันจันทร์ - ศุกร์ (ช่วงทำโปรเจกต์)',
      },
      3: {
        level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
        note: 'ทำงานเป็นทีมแบบ Agile และสื่อสารคล่องตัว',
        images: [],
        durationHours: '16',
        startDate: '2025-08-10',
        endDate: '2025-08-26',
        timePeriod: 'กิจกรรมกลุ่มทุกวันอังคารและพฤหัสบดี',
      },
      4: {
        level: '3.ได้มีประสบการณ์ในการใช้ทักษะนี้เป็นครั้งคราว และทำได้เทียบเท่ากับคนทั่วไป',
        note: 'ฝึกสื่อสารภาษาอังกฤษและเขียนรายงานผลงานรายสัปดาห์',
        images: [],
        durationHours: '10',
        startDate: '2025-08-12',
        endDate: '2025-08-22',
        timePeriod: 'วันละ 30 นาทีผ่านแอปพลิเคชัน',
      },
      101: {
        level: '3.ได้มีประสบการณ์ในการใช้ทักษะนี้เป็นครั้งคราว และทำได้เทียบเท่ากับคนทั่วไป',
        note: 'เขียน SQL Query ดึงข้อมูลยอดขายประจำเดือน',
        images: [],
        durationHours: '12',
        startDate: '2025-08-08',
        endDate: '2025-08-20',
        timePeriod: 'ช่วงวันหยุดเสาร์-อาทิตย์',
      },
    },
    '2025-04': {
      1: {
        level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
        note: 'ผ่านการทดสอบมาตรฐานวิชาชีพไอที',
        images: [],
        durationHours: '20',
        startDate: '2025-04-01',
        endDate: '2025-04-20',
        timePeriod: 'ตลอดทั้งสัปดาห์',
      },
      2: {
        level: '3.ได้มีประสบการณ์ในการใช้ทักษะนี้เป็นครั้งคราว และทำได้เทียบเท่ากับคนทั่วไป',
        note: 'เริ่มทดลองสร้างเว็บแอปพลิเคชัน',
        images: [],
        durationHours: '15',
        startDate: '2025-04-10',
        endDate: '2025-04-25',
        timePeriod: 'ช่วงนอกเวลาเรียน',
      },
    },
  })

  // Toggle expand/collapse career accordion
  const handleToggleCareerExpand = (careerId) => {
    setCareerGoals(
      careerGoals.map((c) =>
        c.id === careerId ? { ...c, isExpanded: !c.isExpanded } : c
      )
    )
  }

  // Add new career goal
  const handleAddNewCareerGoal = () => {
    const careerTitle = prompt('กรุณาระบุชื่ออาชีพเป้าหมายใหม่ที่ต้องการเพิ่ม (เช่น ผู้ดูแลระบบคลาวด์ Cloud Engineer):')
    if (careerTitle && careerTitle.trim()) {
      const newCareerId = `career-${Date.now()}`
      const newCareer = {
        id: newCareerId,
        title: careerTitle.trim(),
        typeText: 'อาชีพเป้าหมายเพิ่มเติม',
        isPrimary: false,
        isExpanded: true,
        skills: [
          {
            id: Date.now(),
            name: `ทักษะพื้นฐานสำหรับ ${careerTitle.trim()}`,
            category: 'กลุ่ม: ทักษะเฉพาะทาง',
            evidenceTitle: 'ศึกษาและฝึกปฏิบัติตามหลักสูตรวิชาชีพ',
            evidenceChannels: 'ช่องทาง: คอร์สออนไลน์, ใบรับรอง, โครงงาน',
          },
          {
            id: Date.now() + 1,
            name: 'การสื่อสารและการทำงานร่วมกับทีม',
            category: 'กลุ่ม: ทักษะการทำงานร่วมกับผู้อื่น',
            evidenceTitle: 'การประสานงานและส่งมอบงานตรงเวลา',
            evidenceChannels: 'ช่องทาง: การทำงานจริง, รายงานกิจกรรม',
          },
        ],
      }
      setCareerGoals([...careerGoals, newCareer])
      alert(`เพิ่มอาชีพเป้าหมาย "${careerTitle.trim()}" เรียบร้อยแล้ว!`)
    }
  }

  // Helper to get active month's skill data
  const getSkillData = (skillId) => {
    return monthlyData[selectedMonthId]?.[skillId] || {
      level: '',
      note: '',
      images: [],
      durationHours: '',
      startDate: '',
      endDate: '',
      timePeriod: '',
    }
  }

  // Update specific field for active month & skill
  const updateSkillData = (skillId, field, value) => {
    setMonthlyData((prev) => {
      const currentMonthObj = prev[selectedMonthId] || {}
      const currentSkillObj = currentMonthObj[skillId] || {
        level: '',
        note: '',
        images: [],
        durationHours: '',
        startDate: '',
        endDate: '',
        timePeriod: '',
      }
      return {
        ...prev,
        [selectedMonthId]: {
          ...currentMonthObj,
          [skillId]: {
            ...currentSkillObj,
            [field]: value,
          },
        },
      }
    })
  }

  // Open Pop-up Modal for specific skill
  const handleOpenSkillModal = (skill) => {
    setSelectedSkillModal(skill)
    setIsDropdownOpen(false)
  }

  // Close Modal
  const handleCloseModal = () => {
    setSelectedSkillModal(null)
    setIsDropdownOpen(false)
  }

  // Select evaluation option
  const handleSelectOption = (skillId, option) => {
    updateSkillData(skillId, 'level', option)
    setIsDropdownOpen(false)
  }

  // Handle Photo / Image Upload
  const handleImageUpload = (skillId, e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (uploadEvent) => {
        const dataUrl = uploadEvent.target.result
        const existingImages = getSkillData(skillId).images || []
        updateSkillData(skillId, 'images', [...existingImages, dataUrl])
      }
      reader.readAsDataURL(file)
    })
  }

  // Remove Photo
  const handleRemoveImage = (skillId, imageIndex) => {
    const existingImages = getSkillData(skillId).images || []
    const updated = existingImages.filter((_, idx) => idx !== imageIndex)
    updateSkillData(skillId, 'images', updated)
  }

  // Add new evaluation month
  const handleAddNewMonth = () => {
    const newMonthName = prompt('กรุณาระบุชื่อรอบเดือนที่ต้องการเพิ่ม (เช่น ก.ย. 68):')
    if (newMonthName && newMonthName.trim()) {
      const newId = `custom-${Date.now()}`
      setMonthList([...monthList, { id: newId, name: newMonthName.trim(), fullName: `${newMonthName.trim()} (รอบใหม่)` }])
      setSelectedMonthId(newId)
      alert(`เพิ่มรอบการประเมิน "${newMonthName.trim()}" เรียบร้อยแล้ว!`)
    }
  }

  // AI Assist Evaluation
  const handleAiAssistEvaluation = (skill) => {
    const suggested = evaluationOptions[3] // "4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป"
    updateSkillData(skill.id, 'level', suggested)
    setIsDropdownOpen(false)
    alert(`🤖 AI แนะนำระดับการประเมินสำหรับ "${skill.name}":\n\nระดับ 4: "ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป"`)
  }

  // Request Evidence Recommendation
  const handleRequestEvidenceGuide = (skill) => {
    alert(`📋 คำแนะนำหลักฐานประกอบสำหรับ "${skill.name}":\n\n1. แนบรูปถ่ายหน้าจอผลงานโปรเจกต์ / โค้ดดิ้ง / Dashboard\n2. แนบรูปถ่ายใบประกาศนียบัตรหลักสูตรออนไลน์\n3. เขียนบันทึกการเรียนรู้และชั่วโมงปฏิบัติงานประจำเดือน`)
  }

  // Save assessment for active month
  const handleSaveAssessment = (skill) => {
    const data = getSkillData(skill.id)
    if (!data.level) {
      alert('กรุณาเลือกผลการประเมินก่อนบันทึก')
      return
    }
    const currentMonthObj = monthList.find((m) => m.id === selectedMonthId)
    const durationInfo = data.durationHours ? `\n• เวลาที่ใช้: ${data.durationHours} ชั่วโมง` : ''
    alert(`✓ บันทึกผลการประเมิน "${skill.name}"\nประจำรอบ: ${currentMonthObj?.fullName || selectedMonthId}${durationInfo}\n(คะแนน, บันทึกข้อความ และรูปภาพหลักฐาน ${data.images.length} รูป) สำเร็จเรียบร้อยแล้ว!`)
    handleCloseModal()
  }

  const activeMonthObj = monthList.find((m) => m.id === selectedMonthId) || monthList[monthList.length - 1]

  return (
    <div className="self-assessment-container">
      {/* 1. Monthly Cycle Selector Card */}
      <section className="assessment-month-selector-card">
        <div className="month-selector-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>รอบเดือนที่กำลังประเมิน: <strong>{activeMonthObj.fullName}</strong></span>
        </div>

        <div className="month-pill-tabs-list">
          {monthList.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`month-select-pill-btn ${selectedMonthId === m.id ? 'active' : ''}`}
              onClick={() => setSelectedMonthId(m.id)}
            >
              {m.name}
            </button>
          ))}

          <button
            type="button"
            className="btn-add-new-month"
            onClick={handleAddNewMonth}
            title="เพิ่มรอบเดือนใหม่"
          >
            <span>+ เพิ่มรอบเดือน</span>
          </button>
        </div>
      </section>

      {/* 2. AI Header Card */}
      <section className="assessment-ai-header-card">
        <div className="assessment-ai-title-block">
          <h2 className="assessment-ai-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>AI แนะนำการประเมิน</span>
          </h2>
          <p className="assessment-ai-subtitle">คลิกที่การ์ดทักษะด้านล่างเพื่อเปิดหน้าต่างประเมิน บันทึกผล และแนบรูปภาพหลักฐาน</p>
        </div>

        <button type="button" className="btn-add-assessment-manual" onClick={() => alert('เปิดฟอร์มเพิ่มทักษะใหม่ด้วยตนเอง')}>
          <span>+ เพิ่มข้อมูลเอง</span>
        </button>
      </section>

      {/* 3. Multiple Target Careers Accordion Group (พับเก็บ/กางออกได้) */}
      <section className="career-accordion-group">
        {careerGoals.map((career) => {
          const evaluatedCount = career.skills.filter((sk) => Boolean(getSkillData(sk.id).level)).length
          const totalCount = career.skills.length
          const isAllEvaluated = evaluatedCount === totalCount && totalCount > 0

          return (
            <div key={career.id} className="assessment-career-group-card">
              {/* Target Career Header (คลิกเพื่อพับเก็บ/กางออก) */}
              <div
                className={`assessment-career-header-bar ${career.isExpanded ? 'expanded' : 'collapsed'}`}
                onClick={() => handleToggleCareerExpand(career.id)}
                title={career.isExpanded ? 'คลิกเพื่อพับเก็บ' : 'คลิกเพื่อกางออกดูทักษะ'}
              >
                <div className="assessment-career-header-left">
                  <div className="career-goal-avatar-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="career-goal-title-group">
                    <h3 className="career-goal-main-title">{career.title}</h3>
                    <div className="career-profile-badge-text">
                      <span className={`career-profile-type-pill ${career.isPrimary ? 'primary' : 'secondary'}`}>
                        {career.typeText}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="career-header-right-controls">
                  <span className={`career-skills-count-pill ${isAllEvaluated ? 'all-done' : ''}`}>
                    ประเมินแล้ว {evaluatedCount}/{totalCount} ทักษะ
                  </span>

                  <div className={`career-chevron-btn ${career.isExpanded ? '' : 'collapsed'}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Skills List inside Expanded Career */}
              {career.isExpanded && (
                <div className="skills-list-container">
                  {career.skills.map((skill) => {
                    const currentSkillData = getSkillData(skill.id)
                    const isEvaluated = Boolean(currentSkillData.level)

                    return (
                      <div
                        key={skill.id}
                        className="skill-row-card"
                        onClick={() => handleOpenSkillModal(skill)}
                        title="คลิกเพื่อเปิดหน้าต่างประเมินและแนบรูปภาพ"
                      >
                        <div className="skill-row-left">
                          <div className={`skill-check-icon-box ${isEvaluated ? 'completed' : 'pending'}`}>
                            {isEvaluated ? (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 11 12 14 22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                              </svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                              </svg>
                            )}
                          </div>

                          <div className="skill-title-block">
                            <span className="skill-name-text">{skill.name}</span>
                            <span className="skill-category-text">{skill.category}</span>
                          </div>
                        </div>

                        <div className="skill-row-right">
                          {/* Duration Tag */}
                          {currentSkillData.durationHours && (
                            <span className="skill-duration-tag">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>{currentSkillData.durationHours} ชม.</span>
                            </span>
                          )}

                          {/* Photo Attached Tag */}
                          {currentSkillData.images && currentSkillData.images.length > 0 && (
                            <span className="skill-photo-count-tag">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                              </svg>
                              <span>{currentSkillData.images.length} รูป</span>
                            </span>
                          )}

                          {/* Status Tag (ตัวแดงเมื่อยังไม่ได้ประเมิน) */}
                          <span className={`skill-status-tag ${isEvaluated ? 'done' : 'pending'}`}>
                            {isEvaluated ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>ประเมินแล้ว</span>
                              </span>
                            ) : (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor' }}></span>
                                <span>ยังไม่ได้ประเมิน</span>
                              </span>
                            )}
                          </span>

                          {/* Open Button */}
                          <button
                            type="button"
                            className="btn-open-popup-eval"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenSkillModal(skill)
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            <span>{isEvaluated ? 'ดู / แก้ไข' : 'ประเมินทักษะ'}</span>
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {/* Button to Add another Dream Career Goal */}
        <button
          type="button"
          className="btn-add-more-career"
          onClick={handleAddNewCareerGoal}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span>+ เพิ่มอาชีพเป้าหมายที่อยากทำเพิ่มเติม</span>
        </button>
      </section>

      {/* ========================================================
          4. Enhanced Pop-up Modal Assessment Dialog
          ======================================================== */}
      {selectedSkillModal && (
        <div className="assessment-modal-overlay" onClick={handleCloseModal}>
          <div className="assessment-modal-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="assessment-modal-header">
              <div className="modal-header-left-title">
                <div className="modal-skill-icon-badge">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    <path d="M9 14l2 2 4-4" />
                  </svg>
                </div>
                <div className="modal-skill-title-group">
                  <h3 className="modal-skill-title">ประเมินทักษะ: {selectedSkillModal.name}</h3>
                  <div className="modal-skill-meta">
                    <span>{selectedSkillModal.category}</span>
                    <span>•</span>
                    <span className="modal-month-badge">รอบเดือน: {activeMonthObj.fullName}</span>
                  </div>
                </div>
              </div>

              <button type="button" className="modal-close-btn" onClick={handleCloseModal} title="ปิดหน้าต่าง">
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="assessment-modal-body">
              {/* 1. Evaluation Dropdown Section */}
              <div className="modal-form-card-section">
                <div className="modal-section-label">
                  <div className="modal-section-label-left">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4l3 3" />
                    </svg>
                    <span>ผลการประเมินทักษะ (7 ระดับมาตรฐาน):</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>เลือกตามระดับความสามารถจริง</span>
                </div>

                <div className="modal-eval-dropdown-row">
                  <div className="modal-custom-dropdown">
                    {/* Modern Dropdown Trigger */}
                    <button
                      type="button"
                      className={`modal-dropdown-trigger ${getSkillData(selectedSkillModal.id).level ? 'has-value' : ''}`}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span>{getSkillData(selectedSkillModal.id).level || '— คลิกเลือกผลการประเมิน —'}</span>
                      <span style={{ color: '#2563eb', display: 'flex', alignItems: 'center', transition: 'transform 0.2s ease', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>

                    {/* 7-Level Dropdown Popup List */}
                    {isDropdownOpen && (
                      <ul className="modal-dropdown-menu">
                        {evaluationOptions.map((opt, idx) => (
                          <li
                            key={idx}
                            className={`modal-dropdown-item ${getSkillData(selectedSkillModal.id).level === opt ? 'selected' : ''}`}
                            onClick={() => handleSelectOption(selectedSkillModal.id, opt)}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* AI Help Button */}
                  <button
                    type="button"
                    className="btn-ai-assist-modern"
                    onClick={() => handleAiAssistEvaluation(selectedSkillModal)}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                      <rect x="6" y="8" width="12" height="12" rx="3" />
                      <circle cx="9.5" cy="13.5" r="1" fill="currentColor" />
                      <circle cx="14.5" cy="13.5" r="1" fill="currentColor" />
                    </svg>
                    <span>AI ช่วยประเมิน</span>
                  </button>
                </div>

                {/* Evidence Guide Inline Tip */}
                <div className="modal-evidence-guide-box">
                  <div className="modal-evidence-guide-text">
                    <span className="modal-evidence-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="9" y1="18" x2="15" y2="18" />
                        <line x1="10" y1="22" x2="14" y2="22" />
                        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                      </svg>
                      <span>{selectedSkillModal.evidenceTitle}</span>
                    </span>
                    <span className="modal-evidence-sub">{selectedSkillModal.evidenceChannels}</span>
                  </div>

                  <button
                    type="button"
                    className="btn-modal-guide"
                    onClick={() => handleRequestEvidenceGuide(selectedSkillModal)}
                  >
                    ขอคำแนะนำหลักฐาน
                  </button>
                </div>
              </div>

              {/* 2. Time Spent / Activity Period Section (เวลาในการทำ) */}
              <div className="modal-form-card-section modal-time-spent-section">
                <div className="modal-section-label">
                  <div className="modal-section-label-left">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>เวลาในการทำ / ระยะเวลาและชั่วโมงที่ปฏิบัติ:</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '700' }}>
                    {getSkillData(selectedSkillModal.id).durationHours ? `⏱️ รวม ${getSkillData(selectedSkillModal.id).durationHours} ชม.` : 'ระบุเวลาที่ใช้'}
                  </span>
                </div>

                <div className="modal-time-inputs-container">
                  {/* Hours input & quick chip buttons */}
                  <div className="modal-time-row">
                    <div className="modal-time-field-group">
                      <label className="modal-time-field-label">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>จำนวนชั่วโมงที่ใช้ในการฝึกฝน / ปฏิบัติ:</span>
                      </label>
                      <div className="modal-hours-input-wrapper">
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          className="modal-time-num-input"
                          placeholder="เช่น 15"
                          value={getSkillData(selectedSkillModal.id).durationHours || ''}
                          onChange={(e) => updateSkillData(selectedSkillModal.id, 'durationHours', e.target.value)}
                        />
                        <span className="modal-hours-unit">ชั่วโมง</span>
                      </div>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="modal-quick-hours-chips">
                      <span className="quick-chip-label">เลือกด่วน:</span>
                      {['2', '3', '5', '6', '9', '12', '15'].map((hrs) => (
                        <button
                          key={hrs}
                          type="button"
                          className={`btn-quick-hour-chip ${String(getSkillData(selectedSkillModal.id).durationHours) === String(hrs) ? 'active' : ''}`}
                          onClick={() => updateSkillData(selectedSkillModal.id, 'durationHours', hrs)}
                        >
                          +{hrs} ชม.
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Photo / Evidence Image Upload & Gallery (แนบรูปภาพก่อนเขียนบันทึก) */}
              <div className="modal-form-card-section">
                <div className="modal-section-label">
                  <div className="modal-section-label-left">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    <span>รูปภาพผลงาน / หลักฐานประกอบการประเมิน:</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '700' }}>
                    {getSkillData(selectedSkillModal.id).images?.length || 0} รูปภาพ
                  </span>
                </div>

                <div className="modal-photos-wrapper">
                  {/* Upload Drag & Drop Style Zone */}
                  <label className="modal-photo-upload-zone">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageUpload(selectedSkillModal.id, e)}
                    />
                    <span className="upload-zone-text">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span>คลิกเพื่อแนบรูปภาพผลงาน หรือรูปกิจกรรม</span>
                    </span>
                    <span className="upload-zone-sub">รองรับไฟล์ JPG, PNG (สามารถเลือกได้หลายรูปพร้อมกัน)</span>
                  </label>

                  {/* Thumbnails Grid */}
                  {getSkillData(selectedSkillModal.id).images && getSkillData(selectedSkillModal.id).images.length > 0 && (
                    <div className="modal-photos-grid">
                      {getSkillData(selectedSkillModal.id).images.map((imgSrc, imgIdx) => (
                        <div key={imgIdx} className="modal-photo-thumb-card">
                          <img src={imgSrc} alt={`Evidence ${imgIdx + 1}`} className="modal-photo-img" />
                          <button
                            type="button"
                            className="btn-modal-delete-photo"
                            onClick={() => handleRemoveImage(selectedSkillModal.id, imgIdx)}
                            title="ลบรูปภาพนี้"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Monthly Notes Textarea (เขียนบันทึกตามหลังการแนบรูปภาพ) */}
              <div className="modal-form-card-section">
                <div className="modal-section-label">
                  <div className="modal-section-label-left">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span>บันทึกความก้าวหน้าและการพัฒนา ({activeMonthObj.name}):</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>สรุปผลการเรียนรู้ประจำเดือน</span>
                </div>

                <textarea
                  className="modal-textarea"
                  placeholder={`เขียนบันทึกกิจกรรมที่ได้ทำ, ผลงานที่สร้างขึ้น หรือสิ่งที่ได้เรียนรู้ในทักษะ ${selectedSkillModal.name} ประจำรอบเดือน ${activeMonthObj.name}...`}
                  value={getSkillData(selectedSkillModal.id).note}
                  onChange={(e) => updateSkillData(selectedSkillModal.id, 'note', e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="assessment-modal-footer">
              <button type="button" className="btn-modal-cancel" onClick={handleCloseModal}>
                ยกเลิก
              </button>

              <button
                type="button"
                className="btn-modal-save-eval"
                onClick={() => handleSaveAssessment(selectedSkillModal)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>บันทึกผลการประเมิน</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
