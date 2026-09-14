import React, { useState, useEffect } from 'react'
import './CareerGoalPage.css'

export default function CareerGoalPage({
  currentUser,
  onNavigateHome,
  onNavigateToPersonal,
  onNavigateToSkills,
}) {
  // AI Recommendation State (ตรงตามรูปภาพ)
  const [aiRecommendations, setAiRecommendations] = useState([
    {
      id: 1,
      title: 'นักพัฒนาซอฟต์แวร์',
      category: 'เทคโนโลยีสารสนเทศ/IT',
      matchScore: 80,
      isWfh: true,
      reason: 'สามารถทำงานจากที่บ้านได้ และเน้นใช้ทักษะการคิดวิเคราะห์',
    },
    {
      id: 2,
      title: 'นักวิเคราะห์ข้อมูล',
      category: 'เทคโนโลยีสารสนเทศ/IT',
      matchScore: 75,
      isWfh: true,
      reason: 'เป็นงานที่เน้นใช้ทักษะการประมวลผลข้อมูล สามารถปรับสภาพแวดล้อมการทำงานได้',
    },
  ])

  const [isAiLoading, setIsAiLoading] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_free_api_key') || '')

  // AI Search Inputs & WFH Filter State
  const [aiSearchText, setAiSearchText] = useState('')
  const [isWfhFilterActive, setIsWfhFilterActive] = useState(false)
  const [activeChip, setActiveChip] = useState('')

  // Default Career Goals Preset
  const DEFAULT_CAREER_GOALS = [
    {
      id: 1,
      title: 'โปรแกรมเมอร์ (เทคโนโลยีสารสนเทศ/IT)',
      startDate: '26/07/2025',
      selected: true,
    },
    {
      id: 2,
      title: 'นักธุรกิจ / E-Commerce (ธุรกิจ/อาชีพอิสระ/e-commerce)',
      startDate: '26/07/2025',
      selected: true,
    },
    {
      id: 3,
      title: 'นักวิเคราะห์ระบบ (เทคโนโลยีสารสนเทศ/IT)',
      startDate: '26/07/2025',
      selected: true,
    },
  ]

  // Career List State (เชื่อมโยงกับระบบ และบันทึกลง LocalStorage)
  const [careerGoals, setCareerGoals] = useState(() => {
    try {
      const saved = localStorage.getItem('icp_career_goals')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      console.error('Error loading careerGoals from localStorage:', e)
    }
    return DEFAULT_CAREER_GOALS
  })

  // Auto-sync career goals to localStorage and sync with Skills Definition careerList
  useEffect(() => {
    try {
      localStorage.setItem('icp_career_goals', JSON.stringify(careerGoals))

      const mappedList = careerGoals.map((g, idx) => {
        const match = (g.title || '').match(/^(.*?)(?:\s*\((.*?)\))?$/)
        const mainTitle = match ? match[1].trim() : g.title
        const cat = match && match[2] ? match[2].trim() : 'กลุ่มอาชีพเป้าหมาย'
        let fixedId = `career-${g.id || idx}`
        if (mainTitle.includes('โปรแกรมเมอร์')) fixedId = 'programmer'
        else if (mainTitle.includes('นักธุรกิจ')) fixedId = 'business'
        else if (mainTitle.includes('นักวิเคราะห์ระบบ')) fixedId = 'sys-analyst'

        return {
          id: fixedId,
          title: mainTitle,
          category: cat,
        }
      })
      localStorage.setItem('icp_career_list', JSON.stringify(mappedList))
    } catch (e) {
      console.error('Error syncing career goals:', e)
    }
  }, [careerGoals])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectAll, setSelectAll] = useState(true)

  // Manual Add / Edit Modal State
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCareer, setEditingCareer] = useState(null)
  const [manualTitle, setManualTitle] = useState('')
  const [manualCategory, setManualCategory] = useState('')
  const [manualDate, setManualDate] = useState('26/07/2025')

  // Comprehensive AI Career Database with WFH & Field mapping
  const smartCareerKnowledgeBase = [
    // สายไอที & WFH
    {
      title: 'นักพัฒนาซอฟต์แวร์และแอปพลิเคชัน',
      category: 'เทคโนโลยีสารสนเทศ/IT',
      tags: ['it', 'คอมพิวเตอร์', 'โปรแกรมเมอร์', 'วิทยาการคอมพิวเตอร์', 'wfh', 'เขียนโปรแกรม', 'ซอฟต์แวร์'],
      isWfh: true,
      matchScore: 85,
      reason: 'สามารถทำงานจากที่บ้านได้ 100% (WFH) เน้นใช้ทักษะการคิดวิเคราะห์และการเขียนโปรแกรม',
    },
    {
      title: 'นักวิเคราะห์ข้อมูล (Data Analyst)',
      category: 'เทคโนโลยีสารสนเทศ/IT',
      tags: ['it', 'ข้อมูล', 'สถิติ', 'data', 'วิเคราะห์', 'wfh', 'คอมพิวเตอร์'],
      isWfh: true,
      matchScore: 82,
      reason: 'เป็นงานที่เน้นใช้ทักษะการประมวลผลข้อมูล สามารถทำงานออนไลน์และปรับสภาพแวดล้อมได้ยืดหยุ่น',
    },
    {
      title: 'นักออกแบบ UI/UX ดิจิทัล',
      category: 'ศิลปกรรมและออกแบบ',
      tags: ['ออกแบบ', 'ศิลปกรรม', 'กราฟิก', 'ui', 'ux', 'wfh', 'นิเทศศิลป์', 'วาดรูป'],
      isWfh: true,
      matchScore: 80,
      reason: 'ออกแบบหน้าตาและประสบการณ์การใช้งานแอปพลิเคชัน ทำงานผ่านเครื่องมือคลาวด์แบบ WFH ได้เต็มรูปแบบ',
    },
    // สายการตลาด & คอนเทนต์
    {
      title: 'ผู้เชี่ยวชาญการตลาดดิจิทัลและแอดมินเพจ',
      category: 'บริหารธุรกิจ/การตลาด',
      tags: ['การตลาด', 'บริหาร', 'ขาย', 'คอนเทนต์', 'แอดมิน', 'social', 'wfh', 'ออนไลน์'],
      isWfh: true,
      matchScore: 78,
      reason: 'ดูแลแคมเปญโฆษณาออนไลน์และสื่อสารกับลูกค้า เหมาะสำหรับการทำงานระยะไกล (Work From Home)',
    },
    {
      title: 'นักเขียนคอนเทนต์และบทความดิจิทัล',
      category: 'นิเทศศาสตร์/ภาษา',
      tags: ['เขียน', 'ภาษา', 'นิเทศ', 'บทความ', 'สื่อ', 'wfh', 'มนุษยศาสตร์', 'แปล'],
      isWfh: true,
      matchScore: 88,
      reason: 'สร้างสรรค์เนื้อหาบทความและสื่อประชาสัมพันธ์ออนไลน์ สามารถจัดการเวลาและทำงานจากที่บ้านได้อิสระ',
    },
    // สายบัญชี & เอกสาร
    {
      title: 'เจ้าหน้าที่บัญชีและตรวจสอบข้อมูลดิจิทัล',
      category: 'บัญชีและการเงิน',
      tags: ['บัญชี', 'การเงิน', 'ตัวเลข', 'เอกสาร', 'wfh', 'บริหาร'],
      isWfh: true,
      matchScore: 80,
      reason: 'บันทึกและตรวจสอบรายการบัญชีผ่านระบบคลาวด์ มีความละเอียดรอบคอบ ทำงานจากบ้านได้สะดวก',
    },
    // สายงานทั่วไป & ช่วยเหลือผู้ใช้
    {
      title: 'เจ้าหน้าที่สนับสนุนลูกค้าและประสานงานออนไลน์ (Customer Care Remote)',
      category: 'บริการลูกค้า/สำนักงาน',
      tags: ['บริการ', 'แอดมิน', 'ประสานงาน', 'ช่วยเหลือ', 'สื่อสาร', 'wfh'],
      isWfh: true,
      matchScore: 76,
      reason: 'ตอบคำถามและช่วยเหลือลูกค้าผ่านช่องทางแชทและอีเมล รองรับการทำงานจากที่บ้าน 100%',
    },
    {
      title: 'นักแปลภาษาและถอดเสียงดิจิทัล (Digital Translator)',
      category: 'ภาษา/มนุษยศาสตร์',
      tags: ['ภาษา', 'อังกฤษ', 'แปล', 'ถอดเสียง', 'wfh', 'ต่างประเทศ'],
      isWfh: true,
      matchScore: 84,
      reason: 'แปลเอกสารและสื่อสารข้ามภาษาแบบออนไลน์ สามารถรับงานและส่งงานผ่านระบบดิจิทัลแบบ WFH',
    },
  ]

  // Preset search chips
  const searchChips = [
    { label: 'AI WFH (ทำงานที่บ้าน 100%)', query: 'wfh', isWfh: true },
    { label: 'เทคโนโลยีสารสนเทศ/IT', query: 'คอมพิวเตอร์', isWfh: false },
    { label: 'วิเคราะห์ข้อมูล (Data)', query: 'ข้อมูล', isWfh: false },
    { label: 'ศิลปกรรม & ออกแบบ', query: 'ออกแบบ', isWfh: false },
    { label: 'บริหารธุรกิจ & การตลาด', query: 'การตลาด', isWfh: false },
    { label: 'บัญชี & การเงิน', query: 'บัญชี', isWfh: false },
  ]

  // Intelligent AI Search Career Function
  const handleSearchCareersWithAi = async (customQuery, forceWfh) => {
    setIsAiLoading(true)
    const query = (customQuery !== undefined ? customQuery : aiSearchText).trim().toLowerCase()
    const filterWfh = forceWfh !== undefined ? forceWfh : isWfhFilterActive

    // 1. If user provided a free Gemini API Key
    if (apiKey.trim()) {
      try {
        const wfhPrompt = filterWfh ? 'โดยเน้นอาชีพที่สามารถทำงานจากที่บ้านได้ 100% (Work From Home/WFH)' : ''
        const promptText = `คุณคือระบบ AI แนะนำอาชีพของโครงการ Individualized Career Planning (ICP)
กรุณาวิเคราะห์และแนะนำ 2-3 อาชีพเป้าหมายที่ตรงกับคำค้นหา: "${query || 'อาชีพที่น่าสนใจและตอบโจทย์ตลาดงาน'}" ${wfhPrompt}
ตอบกลับเฉพาะรูปแบบ JSON Array เท่านั้น ในรูปแบบ:
[
  {
    "title": "ชื่ออาชีพ",
    "category": "หมวดหมู่อาชีพ",
    "matchScore": 85,
    "reason": "เหตุผลที่แนะนำ เช่น สามารถทำงานจากที่บ้านได้ และเน้นใช้ทักษะ..."
  }
]`

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] }),
          }
        )

        if (response.ok) {
          const data = await response.json()
          const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
          const cleanedText = textContent.replace(/```json/g, '').replace(/```/g, '').trim()
          const parsed = JSON.parse(cleanedText)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAiRecommendations(parsed.map((item, i) => ({
              ...item,
              id: Date.now() + i,
              isWfh: filterWfh || item.reason?.toLowerCase().includes('บ้าน') || item.reason?.toLowerCase().includes('wfh'),
            })))
            setIsAiLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('Gemini search error, falling back to smart engine:', err)
      }
    }

    // 2. Fallback Smart Built-in AI Search & WFH Matcher
    setTimeout(() => {
      let results = smartCareerKnowledgeBase

      if (filterWfh) {
        results = results.filter((c) => c.isWfh)
      }

      if (query) {
        const matched = results.filter(
          (c) =>
            c.title.toLowerCase().includes(query) ||
            c.category.toLowerCase().includes(query) ||
            c.tags.some((t) => t.includes(query) || query.includes(t)) ||
            c.reason.toLowerCase().includes(query)
        )
        if (matched.length > 0) {
          results = matched
        }
      }

      // Format results with fresh random match scores (75% - 92%)
      const shuffled = [...results].sort(() => 0.5 - Math.random())
      const finalItems = shuffled.slice(0, 3).map((item, i) => ({
        ...item,
        id: Date.now() + i,
        matchScore: Math.floor(Math.random() * 15) + 78,
      }))

      setAiRecommendations(finalItems)
      setIsAiLoading(false)
    }, 600)
  }

  // Handle Preset Chip Click
  const handleChipClick = (chip) => {
    setActiveChip(chip.label)
    setAiSearchText(chip.query === 'wfh' ? '' : chip.query)
    if (chip.isWfh) {
      setIsWfhFilterActive(true)
      handleSearchCareersWithAi(chip.query === 'wfh' ? '' : chip.query, true)
    } else {
      handleSearchCareersWithAi(chip.query, isWfhFilterActive)
    }
  }

  // Add AI card to target career list
  const handleAddAiCardToStructure = (rec) => {
    const formattedTitle = `${rec.title} (${rec.category})`
    const exists = careerGoals.some((c) => c.title === formattedTitle)
    if (exists) {
      alert(`อาชีพ "${formattedTitle}" มีอยู่ในโครงสร้างอาชีพเป้าหมายแล้ว`)
      return
    }

    const newItem = {
      id: Date.now(),
      title: formattedTitle,
      startDate: new Date().toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      selected: true,
    }

    setCareerGoals([newItem, ...careerGoals])
    alert(`เพิ่มอาชีพ "${rec.title}" เข้าสู่โครงสร้างอาชีพเป้าหมายเรียบร้อยแล้ว!`)
  }

  // Delete single AI card
  const handleDeleteAiCard = (id) => {
    setAiRecommendations(aiRecommendations.filter((item) => item.id !== id))
  }

  // Toggle select all checkbox
  const handleToggleSelectAll = () => {
    const nextState = !selectAll
    setSelectAll(nextState)
    setCareerGoals(careerGoals.map((item) => ({ ...item, selected: nextState })))
  }

  // Toggle single career checkbox
  const handleToggleItem = (id) => {
    const updated = careerGoals.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    )
    setCareerGoals(updated)
    setSelectAll(updated.every((item) => item.selected))
  }

  // Delete single career item
  const handleDeleteCareer = (id, title) => {
    if (window.confirm(`ต้องการลบอาชีพ "${title}" ใช่หรือไม่?`)) {
      setCareerGoals(careerGoals.filter((item) => item.id !== id))
    }
  }

  // Delete all selected career items
  const handleDeleteSelected = () => {
    const selectedCount = careerGoals.filter((item) => item.selected).length
    if (selectedCount === 0) {
      alert('กรุณาเลือกรายการที่ต้องการลบ')
      return
    }
    if (window.confirm(`ต้องการลบรายการที่เลือกทั้งหมด (${selectedCount} รายการ) ใช่หรือไม่?`)) {
      setCareerGoals(careerGoals.filter((item) => !item.selected))
      setSelectAll(false)
    }
  }

  // Open Edit modal
  const handleOpenEdit = (item) => {
    setEditingCareer(item)
    setManualTitle(item.title)
    setManualCategory('')
    setManualDate(item.startDate || '26/07/2025')
    setShowAddModal(true)
  }

  // Open Manual Add modal
  const handleOpenAddManual = () => {
    setEditingCareer(null)
    setManualTitle('')
    setManualCategory('เทคโนโลยีสารสนเทศ/IT')
    setManualDate('26/07/2025')
    setShowAddModal(true)
  }

  // Save manual/edited career
  const handleSaveCareer = (e) => {
    e.preventDefault()
    if (!manualTitle.trim()) {
      alert('กรุณากรอกชื่ออาชีพ')
      return
    }

    if (editingCareer) {
      setCareerGoals(
        careerGoals.map((item) =>
          item.id === editingCareer.id
            ? { ...item, title: manualTitle.trim(), startDate: manualDate }
            : item
        )
      )
      alert('แก้ไขข้อมูลอาชีพเรียบร้อยแล้ว!')
    } else {
      const newItem = {
        id: Date.now(),
        title: manualCategory ? `${manualTitle.trim()} (${manualCategory.trim()})` : manualTitle.trim(),
        startDate: manualDate,
        selected: true,
      }
      setCareerGoals([newItem, ...careerGoals])
      alert('เพิ่มข้อมูลอาชีพเป้าหมายเรียบร้อยแล้ว!')
    }
    setShowAddModal(false)
  }

  // Export to Excel / CSV
  const handleExportExcel = () => {
    if (careerGoals.length === 0) {
      alert('ไม่มีข้อมูลอาชีพสำหรับส่งออก')
      return
    }
    const headers = 'ลำดับ,ชื่ออาชีพเป้าหมาย,วันที่เริ่มแผน\n'
    const rows = careerGoals
      .map((c, i) => `${i + 1},"${c.title}","${c.startDate}"`)
      .join('\n')
    const csvContent = '\uFEFF' + headers + rows
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `Career_Plan_Report_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filtered Career list based on search
  const filteredCareers = careerGoals.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const hasSelectedItems = careerGoals.some((item) => item.selected)

  return (
    <div className="career-goal-container">
      {/* Top Banner (ตรงตามรูป) */}
      <section className="career-goal-banner">
        <h1 className="career-goal-banner-title">อาชีพเป้าหมาย</h1>
      </section>

      {/* Section 1: AI แนะนำอาชีพ (ตรงตามรูป) */}
      <section className="ai-recommendation-card">
        <div className="ai-header-row">
          <div className="ai-title-block">
            <h2 className="ai-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>AI แนะนำอาชีพ</span>
            </h2>
            <p className="ai-subtitle">คลิกปุ่ม "ขอคำแนะนำใหม่" หรือค้นหาตามสาขาวิชาที่เรียน/ความสนใจ</p>
          </div>

          <div className="ai-header-actions">
            <button
              type="button"
              className="btn-ai-fetch"
              onClick={() => handleSearchCareersWithAi(aiSearchText, isWfhFilterActive)}
              disabled={isAiLoading}
            >
              <span>{isAiLoading ? 'กำลังประมวลผล...' : 'ขอคำแนะนำใหม่'}</span>
            </button>

            <button
              type="button"
              className="btn-add-manual"
              onClick={handleOpenAddManual}
            >
              <span>เพิ่มข้อมูลเอง</span>
            </button>
          </div>
        </div>

        {/* AI Career Search & WFH Filter Bar (ระบบค้นหาอาชีพตามสาขาที่เรียน & AI WFH) */}
        <div className="ai-search-filter-section">
          <form
            className="ai-search-input-row"
            onSubmit={(e) => {
              e.preventDefault()
              handleSearchCareersWithAi(aiSearchText, isWfhFilterActive)
            }}
          >
            <div className="ai-search-input-wrapper">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="ai-search-text-input"
                placeholder="ค้นหาอาชีพตามสาขาวิชาที่เรียน หรืออาชีพที่อยากทำ (เช่น วิทยาการคอมพิวเตอร์, บัญชี, การตลาด, ออกแบบ...)"
                value={aiSearchText}
                onChange={(e) => setAiSearchText(e.target.value)}
              />
              {aiSearchText && (
                <button
                  type="button"
                  onClick={() => setAiSearchText('')}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* WFH Toggle Button */}
            <button
              type="button"
              className={`btn-toggle-wfh ${isWfhFilterActive ? 'active' : ''}`}
              onClick={() => {
                const nextWfh = !isWfhFilterActive
                setIsWfhFilterActive(nextWfh)
                handleSearchCareersWithAi(aiSearchText, nextWfh)
              }}
              title="กรองเฉพาะอาชีพที่ทำงานจากที่บ้าน (Work From Home)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>เฉพาะงาน WFH</span>
              {isWfhFilterActive && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>

            {/* Submit AI Search Button */}
            <button type="submit" className="btn-submit-ai-search" disabled={isAiLoading}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
              </svg>
              <span>ค้นหาด้วย AI</span>
            </button>
          </form>

          {/* Quick Preset Search Chips */}
          <div className="ai-search-chips-row">
            <span className="ai-chip-title">ค้นหาด่วน:</span>
            {searchChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                className={`ai-preset-chip-btn ${activeChip === chip.label ? 'active' : ''}`}
                onClick={() => handleChipClick(chip)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Alert Warning Box (ตรงตามรูป) */}
        <div className="ai-alert-box">
          <div className="ai-alert-icon">i</div>
          <div className="ai-alert-text">
            <strong>คำเตือน:</strong> คำแนะนำที่ได้รับจาก AI เป็นเพียงข้อมูลเบื้องต้นเท่านั้น ไม่ใช่การรับประกันความถูกต้อง ควรตรวจสอบและพิจารณาก่อนตัดสินใจเสมอ
          </div>
        </div>

        {/* AI Output Cards / Loading */}
        {isAiLoading ? (
          <div className="ai-loading-box">
            <svg className="spinner-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            <span>กำลังค้นหาและประมวลผลคำแนะนำอาชีพด้วย AI...</span>
          </div>
        ) : (
          <div className="ai-recommendations-list">
            {aiRecommendations.map((rec) => (
              <div key={rec.id} className="ai-career-row-card">
                <div className="ai-career-left-info">
                  <h3 className="ai-career-title">
                    <span>{rec.title}</span>
                  </h3>
                  <div className="ai-career-meta-row">
                    <span>กลุ่ม: {rec.category}</span>
                    <span className="ai-match-badge">{rec.matchScore}% Match</span>
                    {rec.isWfh && (
                      <span className="ai-wfh-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <span>WFH</span>
                      </span>
                    )}
                  </div>
                  <div className="ai-career-reason-text">
                    เหตุผล: {rec.reason}
                  </div>
                </div>

                {/* 3 Stacked Buttons on the Right (มีในระบบ / ลบ / เพิ่ม) */}
                <div className="ai-career-right-actions">
                  <button type="button" className="btn-ai-in-system" title="มีในระบบ">
                    มีในระบบ
                  </button>
                  <button
                    type="button"
                    className="btn-ai-delete-card"
                    onClick={() => handleDeleteAiCard(rec.id)}
                    title="ลบคำแนะนำ"
                  >
                    ลบ
                  </button>
                  <button
                    type="button"
                    className="btn-ai-add-card"
                    onClick={() => handleAddAiCardToStructure(rec)}
                    title="เพิ่มเข้าโครงสร้างอาชีพเป้าหมาย"
                  >
                    เพิ่ม
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 2: โครงสร้างอาชีพเป้าหมาย (ตรงตามรูป) */}
      <section className="structure-card-container">
        <div className="structure-header-banner">
          <div className="structure-left-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span>โครงสร้างอาชีพเป้าหมาย</span>
          </div>

          <div className="structure-right-controls">
            <div className="search-career-box">
              <input
                type="text"
                className="search-career-input"
                placeholder="ค้นหาอาชีพ"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            <button
              type="button"
              className="btn-report-badge"
              onClick={handleExportExcel}
              title="บันทึกไฟล์ Career Plan Report"
            >
              <span>Career_Plan_Re</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </button>

            <button
              type="button"
              className="btn-export-excel"
              onClick={handleExportExcel}
            >
              ส่งออก EXCEL
            </button>

            <label className="select-all-label">
              <input
                type="checkbox"
                className="select-all-checkbox"
                checked={selectAll}
                onChange={handleToggleSelectAll}
              />
              <span>{selectAll ? '✓ เลือกทั้งหมด' : 'เลือกทั้งหมด'}</span>
            </label>

            {hasSelectedItems && (
              <button
                type="button"
                className="btn-delete-selected"
                onClick={handleDeleteSelected}
              >
                ลบที่เลือก
              </button>
            )}
          </div>
        </div>

        {/* Target Career List (ตรงตามรูป) */}
        <div className="career-items-list">
          {filteredCareers.map((item) => (
            <div key={item.id} className="career-item-row">
              <div className="career-item-left">
                <input
                  type="checkbox"
                  className="career-item-checkbox"
                  checked={item.selected}
                  onChange={() => handleToggleItem(item.id)}
                />
                <div className="career-briefcase-icon">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z" />
                  </svg>
                </div>
                <span className="career-item-title-text">
                  {item.title} - เริ่มแผน: {item.startDate}
                </span>
              </div>

              <div className="career-item-actions">
                <button
                  type="button"
                  className="btn-item-edit"
                  onClick={() => handleOpenEdit(item)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span>แก้ไข</span>
                </button>
                <button
                  type="button"
                  className="btn-item-delete"
                  onClick={() => handleDeleteCareer(item.id, item.title)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  <span>ลบ</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation Links (ตรงตามรูป) */}
      <footer className="career-bottom-navigation">
        <button
          type="button"
          className="nav-link-item link-exit"
          onClick={onNavigateHome}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>ออก</span>
        </button>
        <button
          type="button"
          className="nav-link-item"
          onClick={onNavigateToPersonal}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>กลับฟอร์มกรอกข้อมูลส่วนตัว</span>
        </button>
        <button
          type="button"
          className="nav-link-item btn-primary-nav"
          onClick={onNavigateToSkills}
        >
          <span>ไปฟอร์มกำหนดคุณสมบัติ</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </footer>

      {/* Manual Add / Edit Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowAddModal(false)}
            >
              ✕
            </button>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingCareer ? 'แก้ไขอาชีพเป้าหมาย' : 'เพิ่มอาชีพเป้าหมายเอง'}
              </h2>
              <p className="modal-subtitle">กำหนดรายละเอียดและวันที่เริ่มต้นแผนพัฒนา</p>
            </div>
            <form onSubmit={handleSaveCareer}>
              <div className="underline-form-row">
                <input
                  type="text"
                  className="row-input-field"
                  placeholder="ชื่ออาชีพ (เช่น โปรแกรมเมอร์): *"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="underline-form-row">
                <input
                  type="text"
                  className="row-input-field"
                  placeholder="หมวดหมู่งาน (เช่น เทคโนโลยีสารสนเทศ/IT):"
                  value={manualCategory}
                  onChange={(e) => setManualCategory(e.target.value)}
                />
              </div>
              <div className="underline-form-row">
                <input
                  type="text"
                  className="row-input-field"
                  placeholder="วันที่เริ่มแผน (เช่น 26/07/2025): *"
                  value={manualDate}
                  onChange={(e) => setManualDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-actions-row">
                <button type="submit" className="btn-primary-action">
                  บันทึก
                </button>
                <button
                  type="button"
                  className="btn-link-action"
                  onClick={() => setShowAddModal(false)}
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
