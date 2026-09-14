import React, { useState, useEffect } from 'react'
import './SkillsDefinitionPage.css'

export default function SkillsDefinitionPage({ onNavigateHome, onNavigateToCareerGoal }) {
  // Exact 7 Standard Levels (ตรงตามรูปภาพ 100%)
  const targetLevelOptions = [
    {
      id: 1,
      tag: '1',
      title: '1.ได้รู้จักหรือมีทักษะนี้เพียงเล็กน้อยเท่านั้น',
    },
    {
      id: 2,
      tag: '2',
      title: '2.ได้เรียนทักษะนี้บ้างและพอทำได้ ถึงแม้จะน้อยกว่าคนทั่วไป',
    },
    {
      id: 3,
      tag: '3',
      title: '3.ได้มีประสบการณ์ในการใช้ทักษะนี้เป็นครั้งคราว และทำได้เทียบเท่ากับคนทั่วไป',
    },
    {
      id: 4,
      tag: '4',
      title: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
    },
    {
      id: 5,
      tag: '5',
      title: '5.ได้ถ่ายทอดทักษะนี้แก่ผู้อื่น หรือเป็นต้นแบบของทักษะนี้แก่ผู้อื่น',
    },
    {
      id: 6,
      tag: 'Yes',
      title: '(Yes) มีใบประกาศ มีใบรับรอง ผ่านการฝึกประสบการณ์ ได้รับใบอนุญาตขับขี่',
    },
    {
      id: 7,
      tag: 'No',
      title: '(No) ยังไม่มีใบประกาศ ยังไม่มีใบรับรอง ยังไม่ผ่านการฝึกประสบการณ์ ยังไม่ได้รับใบอนุญาตขับขี่',
    },
  ]

  // State to track which skill dropdown is currently open (by skill.id or null)
  const [openDropdownSkillId, setOpenDropdownSkillId] = useState(null)
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)

  // Add Skill Pop-up Modal State
  const [showAddSkillModal, setShowAddSkillModal] = useState(false)
  const [addSkillSuccessMsg, setAddSkillSuccessMsg] = useState('')

  // Skill Details & Target Level Pop-up Modal State
  const [selectedSkillModal, setSelectedSkillModal] = useState(null)
  const [modalSkillForm, setModalSkillForm] = useState({
    id: null,
    name: '',
    category: '',
    customCategory: '',
    level: '',
    description: '',
    hours: '',
  })
  const [isModalLevelDropdownOpen, setIsModalLevelDropdownOpen] = useState(false)
  const [isModalCatDropdownOpen, setIsModalCatDropdownOpen] = useState(false)

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.skill-level-dropdown-container') && !e.target.closest('.modal-eval-dropdown-row')) {
        setOpenDropdownSkillId(null)
        setIsModalLevelDropdownOpen(false)
      }
      if (!e.target.closest('.custom-category-dropdown-wrap')) {
        setIsCategoryDropdownOpen(false)
        setIsModalCatDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Open Skill Pop-up Modal
  const handleOpenSkillModal = (skill) => {
    const isStandardCat = categoryOptions.some(
      (c) => c.fullName === skill.category || c.label === skill.category
    )
    setSelectedSkillModal(skill)
    setModalSkillForm({
      id: skill.id,
      name: skill.name || '',
      category: isStandardCat ? skill.category : 'custom',
      customCategory: isStandardCat ? '' : skill.category,
      level: skill.level || targetLevelOptions[3].title,
      description: skill.description || '',
      hours: skill.hours || '',
    })
    setIsModalLevelDropdownOpen(false)
    setIsModalCatDropdownOpen(false)
  }

  // Close Skill Modal
  const handleCloseSkillModal = () => {
    setSelectedSkillModal(null)
    setIsModalLevelDropdownOpen(false)
    setIsModalCatDropdownOpen(false)
  }

  // Save Skill Modal Changes
  const handleSaveSkillModal = (e) => {
    if (e) e.preventDefault()
    if (!modalSkillForm.name.trim()) {
      alert('กรุณาระบุชื่อทักษะ')
      return
    }

    let finalCategory = modalSkillForm.category
    if (modalSkillForm.category === 'custom') {
      if (!modalSkillForm.customCategory.trim()) {
        alert('กรุณาระบุชื่อหมวดหมู่ที่ต้องการ')
        return
      }
      finalCategory = modalSkillForm.customCategory.trim()
    }

    const updated = activeSkills.map((sk) =>
      sk.id === modalSkillForm.id
        ? {
            ...sk,
            name: modalSkillForm.name.trim(),
            category: finalCategory,
            level: modalSkillForm.level,
            description: modalSkillForm.description,
            hours: modalSkillForm.hours,
          }
        : sk
    )

    setSkillsDatabase({
      ...skillsDatabase,
      [selectedCareerId]: updated,
    })
    handleCloseSkillModal()
  }

  // Delete Skill from Modal
  const handleModalDeleteSkill = () => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบทักษะ "${modalSkillForm.name}" ออกจากรายการ?`)) {
      handleDeleteSkill(modalSkillForm.id)
      handleCloseSkillModal()
    }
  }

  // Helper to render professional SVG career icons
  const renderCareerIcon = (id) => {
    switch (id) {
      case 'programmer':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        )
      case 'business':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        )
      case 'sys-analyst':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        )
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        )
    }
  }

  // Default Target Careers List
  const DEFAULT_CAREER_LIST = [
    {
      id: 'programmer',
      title: 'โปรแกรมเมอร์',
      category: 'เทคโนโลยีสารสนเทศ/IT',
    },
    {
      id: 'business',
      title: 'นักธุรกิจ / E-Commerce',
      category: 'ธุรกิจ/อาชีพอิสระ/e-commerce',
    },
    {
      id: 'sys-analyst',
      title: 'นักวิเคราะห์ระบบ',
      category: 'เทคโนโลยีสารสนเทศ/IT',
    },
  ]

  // Target Careers List (Persisted to LocalStorage)
  const [careerList, setCareerList] = useState(() => {
    try {
      const saved = localStorage.getItem('icp_career_list')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Error loading careerList from localStorage:', e)
    }
    return DEFAULT_CAREER_LIST
  })

  const [selectedCareerId, setSelectedCareerId] = useState('programmer')

  // Category Options with Custom/Other Support
  const categoryOptions = [
    {
      id: 'tech',
      label: 'ทักษะทางเทคนิค (Technical)',
      fullName: 'ทักษะทางเทคนิค (Technical Skills)',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      id: 'soft',
      label: 'ทักษะทำงานร่วมกับผู้อื่น (Soft Skills)',
      fullName: 'ทักษะการทำงานร่วมกับผู้อื่น (Soft Skills)',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'comm',
      label: 'ทักษะการสื่อสารและภาษา',
      fullName: 'ทักษะการสื่อสารและภาษา',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: 'cert',
      label: 'คุณวุฒิ / ใบประกาศนียบัตร',
      fullName: 'คุณวุฒิและใบประกาศนียบัตร',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
    },
    {
      id: 'other',
      label: 'อื่นๆ (ระบุหมวดหมู่เอง)',
      fullName: 'custom',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ),
    },
  ]

  // Quick-Add Input Form State
  const [quickSkillName, setQuickSkillName] = useState('')
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('tech')
  const [customCategoryName, setCustomCategoryName] = useState('')

  // Pre-made recommended skill chips library for 1-click addition
  const recommendedSkillLibrary = {
    programmer: [
      { name: 'JavaScript & TypeScript', cat: 'ทักษะทางเทคนิค (Technical Skills)', level: targetLevelOptions[3].title },
      { name: 'React & Node.js', cat: 'ทักษะทางเทคนิค (Technical Skills)', level: targetLevelOptions[3].title },
      { name: 'ฐานข้อมูล SQL & MongoDB', cat: 'ทักษะทางเทคนิค (Technical Skills)', level: targetLevelOptions[3].title },
      { name: 'Git & GitHub', cat: 'ทักษะทางเทคนิค (Technical Skills)', level: targetLevelOptions[2].title },
      { name: 'การแก้ปัญหาเชิงตรรกะ', cat: 'ทักษะทางเทคนิค (Technical Skills)', level: targetLevelOptions[3].title },
      { name: 'การทำงานเป็นทีมแบบ Agile', cat: 'ทักษะการทำงานร่วมกับผู้อื่น (Soft Skills)', level: targetLevelOptions[2].title },
      { name: 'ภาษาอังกฤษเพื่อการสื่อสารไอที', cat: 'ทักษะการสื่อสารและภาษา', level: targetLevelOptions[2].title },
      { name: 'ใบรับรองมาตรฐานวิชาชีพไอที', cat: 'คุณวุฒิและใบประกาศนียบัตร', level: targetLevelOptions[5].title },
    ],
    business: [
      { name: 'การตลาดดิจิทัล (Digital Marketing)', cat: 'ทักษะทางเทคนิค (Technical Skills)', level: targetLevelOptions[3].title },
      { name: 'การวิเคราะห์ยอดขายและกำไร', cat: 'ทักษะทางเทคนิค (Technical Skills)', level: targetLevelOptions[3].title },
      { name: 'การเจรจาต่อรองและการขาย', cat: 'ทักษะการทำงานร่วมกับผู้อื่น (Soft Skills)', level: targetLevelOptions[3].title },
      { name: 'การบริหารความสัมพันธ์ลูกค้า (CRM)', cat: 'ทักษะการทำงานร่วมกับผู้อื่น (Soft Skills)', level: targetLevelOptions[2].title },
      { name: 'การนำเสนอแผนธุรกิจ', cat: 'ทักษะการสื่อสารและภาษา', level: targetLevelOptions[3].title },
    ],
    'sys-analyst': [
      { name: 'การเก็บและวิเคราะห์ Requirement', cat: 'ทักษะทางเทคนิค (Technical Skills)', level: targetLevelOptions[3].title },
      { name: 'การออกแบบสถาปัตยกรรมระบบ (UML/DFD)', cat: 'ทักษะทางเทคนิค (Technical Skills)', level: targetLevelOptions[3].title },
      { name: 'การจัดการฐานข้อมูลขั้นสูง', cat: 'ทักษะทางเทคนิค (Technical Skills)', level: targetLevelOptions[3].title },
      { name: 'การประสานงานระหว่างฝ่ายธุรกิจกับเทคนิค', cat: 'ทักษะการสื่อสารและภาษา', level: targetLevelOptions[3].title },
      { name: 'การบริหารโครงการไอที (Project Management)', cat: 'ทักษะการทำงานร่วมกับผู้อื่น (Soft Skills)', level: targetLevelOptions[2].title },
    ],
  }

  // Default Categorized Skills Data Store per Career (with full Thai 7-level text)
  const DEFAULT_SKILLS_DATABASE = {
    programmer: [
      {
        id: 1,
        category: 'ทักษะทางเทคนิค (Technical Skills)',
        name: 'คอมพิวเตอร์และระบบสารสนเทศ',
        level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
      },
      {
        id: 2,
        category: 'ทักษะทางเทคนิค (Technical Skills)',
        name: 'ทักษะการเขียนโปรแกรมขั้นสูง (Full-Stack)',
        level: '5.ได้ถ่ายทอดทักษะนี้แก่ผู้อื่น หรือเป็นต้นแบบของทักษะนี้แก่ผู้อื่น',
      },
      {
        id: 3,
        category: 'ทักษะการทำงานร่วมกับผู้อื่น (Soft Skills)',
        name: 'ทำงานร่วมกับผู้อื่น (Teamwork & Agile)',
        level: '3.ได้มีประสบการณ์ในการใช้ทักษะนี้เป็นครั้งคราว และทำได้เทียบเท่ากับคนทั่วไป',
      },
      {
        id: 4,
        category: 'ทักษะการสื่อสารและภาษา',
        name: 'สื่อสารภาษาอังกฤษในการทำงาน',
        level: '3.ได้มีประสบการณ์ในการใช้ทักษะนี้เป็นครั้งคราว และทำได้เทียบเท่ากับคนทั่วไป',
      },
    ],
    business: [
      {
        id: 101,
        category: 'ทักษะทางเทคนิค (Technical Skills)',
        name: 'การตลาดดิจิทัลและการยิงโฆษณา (Digital Marketing)',
        level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
      },
      {
        id: 102,
        category: 'ทักษะทางเทคนิค (Technical Skills)',
        name: 'การวิเคราะห์ยอดขายและกำไร (Financial Analytics)',
        level: '3.ได้มีประสบการณ์ในการใช้ทักษะนี้เป็นครั้งคราว และทำได้เทียบเท่ากับคนทั่วไป',
      },
      {
        id: 103,
        category: 'ทักษะการทำงานร่วมกับผู้อื่น (Soft Skills)',
        name: 'การเจรจาต่อรองและการบริหารลูกค้าสัมพันธ์',
        level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
      },
    ],
    'sys-analyst': [
      {
        id: 201,
        category: 'ทักษะทางเทคนิค (Technical Skills)',
        name: 'การวิเคราะห์ความต้องการและการออกแบบระบบ',
        level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
      },
      {
        id: 202,
        category: 'ทักษะทางเทคนิค (Technical Skills)',
        name: 'การจัดการฐานข้อมูลเชิงสัมพันธ์และ SQL',
        level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
      },
      {
        id: 203,
        category: 'ทักษะการสื่อสารและภาษา',
        name: 'การนำเสนอและประสานงานระหว่างฝ่าย',
        level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
      },
    ],
  }

  // Categorized Skills Data Store per Career (Persisted to LocalStorage)
  const [skillsDatabase, setSkillsDatabase] = useState(() => {
    try {
      const saved = localStorage.getItem('icp_skills_database')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Error loading skillsDatabase from localStorage:', e)
    }
    return DEFAULT_SKILLS_DATABASE
  })

  // Auto-sync careerList to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('icp_career_list', JSON.stringify(careerList))
    } catch (e) {
      console.error('Error saving careerList to localStorage:', e)
    }
  }, [careerList])

  // Sync from localStorage on mount (to load newly added careers from CareerGoalPage)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('icp_career_list')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCareerList(parsed)
        }
      }
    } catch (e) {
      console.error('Error reading careerList on mount:', e)
    }
  }, [])

  // Auto-sync skillsDatabase to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('icp_skills_database', JSON.stringify(skillsDatabase))
    } catch (e) {
      console.error('Error saving skillsDatabase to localStorage:', e)
    }
  }, [skillsDatabase])

  const activeCareer = careerList.find((c) => c.id === selectedCareerId) || careerList[0]
  const activeSkills = skillsDatabase[selectedCareerId] || []

  // 1-Click Quick Add Skill from Input
  const handleQuickAddSkill = (e) => {
    if (e) e.preventDefault()
    if (!quickSkillName.trim()) {
      alert('กรุณากรอกชื่อทักษะที่ต้องการเพิ่ม')
      return
    }

    let finalCategory = 'ทักษะทางเทคนิค (Technical Skills)'
    if (selectedCategoryKey === 'other') {
      if (!customCategoryName.trim()) {
        alert('กรุณาระบุชื่อหมวดหมู่ที่ต้องการ')
        return
      }
      finalCategory = customCategoryName.trim()
    } else {
      const found = categoryOptions.find((c) => c.id === selectedCategoryKey)
      if (found) finalCategory = found.fullName
    }

    const newSkill = {
      id: Date.now(),
      category: finalCategory,
      name: quickSkillName.trim(),
      level: targetLevelOptions[3].title, // Default: 4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป
    }

    setSkillsDatabase({
      ...skillsDatabase,
      [selectedCareerId]: [...activeSkills, newSkill],
    })
    setAddSkillSuccessMsg(`เพิ่มทักษะ "${quickSkillName.trim()}" สำเร็จเรียบร้อย!`)
    setTimeout(() => setAddSkillSuccessMsg(''), 3500)
    setQuickSkillName('')
  }

  // 1-Click Add Skill from Recommended Chip
  const handleAddFromChip = (chip) => {
    const exists = activeSkills.some(
      (sk) => sk.name.toLowerCase() === chip.name.toLowerCase()
    )
    if (exists) {
      alert(`ทักษะ "${chip.name}" มีอยู่ในรายการแล้ว`)
      return
    }

    const newSkill = {
      id: Date.now(),
      category: chip.cat,
      name: chip.name,
      level: chip.level || targetLevelOptions[3].title,
    }

    setSkillsDatabase({
      ...skillsDatabase,
      [selectedCareerId]: [...activeSkills, newSkill],
    })
    setAddSkillSuccessMsg(`เพิ่มทักษะ "${chip.name}" สำเร็จเรียบร้อย!`)
    setTimeout(() => setAddSkillSuccessMsg(''), 3500)
  }

  // 1-Click AI Auto-Load all skills for this career
  const handleAutoFillAllSkills = () => {
    const recommended = recommendedSkillLibrary[selectedCareerId] || []
    if (recommended.length === 0) {
      alert('ไม่มีชุดทักษะแนะนำเพิ่มเติมสำหรับอาชีพนี้')
      return
    }

    const newItems = recommended.map((chip, idx) => ({
      id: Date.now() + idx,
      category: chip.cat,
      name: chip.name,
      level: chip.level || targetLevelOptions[3].title,
    }))

    setSkillsDatabase({
      ...skillsDatabase,
      [selectedCareerId]: newItems,
    })
    alert(`โหลดชุดทักษะแนะนำสำหรับ "${activeCareer.title}" ครบถ้วน ${newItems.length} ทักษะเรียบร้อยแล้ว`)
  }

  // Level Toggle on Skill Card Dropdown
  const handleSetSkillLevel = (skillId, newLevelTitle) => {
    const updated = activeSkills.map((sk) =>
      sk.id === skillId ? { ...sk, level: newLevelTitle } : sk
    )
    setSkillsDatabase({ ...skillsDatabase, [selectedCareerId]: updated })
    setOpenDropdownSkillId(null)
  }

  // 1-Click Delete Skill
  const handleDeleteSkill = (skillId) => {
    const updated = activeSkills.filter((sk) => sk.id !== skillId)
    setSkillsDatabase({ ...skillsDatabase, [selectedCareerId]: updated })
  }

  // Add new Career Goal
  const handleAddNewCareer = () => {
    const title = prompt('กรุณาระบุชื่ออาชีพเป้าหมายใหม่ (เช่น นักออกแบบ UX/UI):')
    if (title && title.trim()) {
      const newId = `career-${Date.now()}`
      const newCareer = {
        id: newId,
        title: title.trim(),
        category: 'กลุ่มอาชีพเป้าหมายเพิ่มเติม',
      }
      setCareerList([...careerList, newCareer])
      setSkillsDatabase({
        ...skillsDatabase,
        [newId]: [
          {
            id: Date.now(),
            category: 'ทักษะทางเทคนิค (Technical Skills)',
            name: `ทักษะเฉพาะทางสำหรับ ${title.trim()}`,
            level: targetLevelOptions[3].title,
          },
          {
            id: Date.now() + 1,
            category: 'ทักษะการทำงานร่วมกับผู้อื่น (Soft Skills)',
            name: 'การทำงานร่วมกับทีมและการสื่อสาร',
            level: targetLevelOptions[2].title,
          },
        ],
      })
      setSelectedCareerId(newId)
      alert(`เพิ่มอาชีพเป้าหมาย "${title.trim()}" เรียบร้อยแล้ว`)
    }
  }

  // Export Excel / CSV Handler (บันทึก/ส่งออกไฟล์ลงเครื่อง)
  const handleExportExcel = () => {
    if (activeSkills.length === 0) {
      alert(`ไม่มีรายการคุณสมบัติและทักษะของ "${activeCareer.title}" สำหรับส่งออก`)
      return
    }

    const headers = 'ลำดับ,อาชีพเป้าหมาย,หมวดหมู่ทักษะ,คุณสมบัติและทักษะ,ระดับความคาดหวังที่กำหนด\n'
    const rows = activeSkills
      .map((sk, i) => {
        const safeCareer = (activeCareer.title || '').replace(/"/g, '""')
        const safeCat = (sk.category || '').replace(/"/g, '""')
        const safeName = (sk.name || '').replace(/"/g, '""')
        const safeLevel = (sk.level || '').replace(/"/g, '""')
        return `${i + 1},"${safeCareer}","${safeCat}","${safeName}","${safeLevel}"`
      })
      .join('\n')

    // Add UTF-8 BOM so Excel opens Thai characters correctly
    const csvContent = '\uFEFF' + headers + rows
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    const safeTitle = (activeCareer.title || 'Skills').replace(/[\\/:*?"<>|]/g, '_')
    link.setAttribute('download', `ICP_Skills_${safeTitle}_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    alert(`ดาวน์โหลดไฟล์ "${`ICP_Skills_${safeTitle}_${new Date().toISOString().slice(0, 10)}.csv`}" ลงเครื่องเรียบร้อยแล้ว!\n(สามารถเปิดด้วย Microsoft Excel ได้ทันที)`)
  }

  // Save Structure Handler (บันทึกลงหน่วยความจำของเครื่องผ่าน LocalStorage)
  const handleSaveStructure = () => {
    try {
      localStorage.setItem('icp_career_list', JSON.stringify(careerList))
      localStorage.setItem('icp_skills_database', JSON.stringify(skillsDatabase))
      alert(`บันทึกโครงสร้างคุณสมบัติและทักษะ (${activeSkills.length} รายการ) ลงในเครื่องของคุณเรียบร้อยแล้ว!\n\nข้อมูลจะถูกจัดเก็บไว้ใน Browser Storage อย่างปลอดภัย ไม่สูญหายเมื่อปิดหรือรีเฟรชเบราว์เซอร์`)
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูลลงเครื่อง')
    }
  }

  // Helper to get badge text from level title
  const getBadgeFromTitle = (title) => {
    if (!title) return 'ระดับ 4'
    if (title.startsWith('1')) return 'ระดับ 1'
    if (title.startsWith('2')) return 'ระดับ 2'
    if (title.startsWith('3')) return 'ระดับ 3'
    if (title.startsWith('4')) return 'ระดับ 4'
    if (title.startsWith('5')) return 'ระดับ 5'
    if (title.includes('Yes')) return 'Yes'
    if (title.includes('No')) return 'No'
    return 'ระดับ 4'
  }

  // Group skills by category
  const categoriesMap = activeSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  const currentRecommendedChips = recommendedSkillLibrary[selectedCareerId] || []
  const activeCatObj = categoryOptions.find((c) => c.id === selectedCategoryKey) || categoryOptions[0]

  return (
    <div className="skills-def-container">
      {/* 1. Page Banner */}
      <section className="skills-def-banner">
        <h1 className="skills-def-banner-title">คุณสมบัติ/ทักษะ (Qualifications)</h1>
      </section>

      {/* 2. Target Career Tabs Card */}
      <section className="career-target-tabs-card">
        <div className="career-tabs-header-row">
          <h2 className="career-tabs-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>เลือกอาชีพเป้าหมายที่ต้องการกำหนดทักษะ:</span>
          </h2>
        </div>

        {/* Selectable Career Pills */}
        <div className="career-pills-row">
          {careerList.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`career-pill-select-btn ${selectedCareerId === c.id ? 'active' : ''}`}
              onClick={() => setSelectedCareerId(c.id)}
            >
              <div className="career-pill-icon">{renderCareerIcon(c.id)}</div>
              <div className="career-pill-text-group">
                <span className="career-pill-title">{c.title}</span>
                <span className="career-pill-category">{c.category}</span>
              </div>
            </button>
          ))}

          <button
            type="button"
            className="career-pill-select-btn"
            style={{ borderStyle: 'dashed', backgroundColor: '#f8fafc', color: '#2563eb' }}
            onClick={() => {
              if (onNavigateToCareerGoal) {
                onNavigateToCareerGoal()
              } else {
                handleAddNewCareer()
              }
            }}
            title="เพิ่มอาชีพเป้าหมายใหม่ (เชื่อมต่อไปยังหน้ากำหนดอาชีพเป้าหมาย)"
          >
            <div className="career-pill-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <div className="career-pill-text-group">
              <span className="career-pill-title" style={{ color: '#2563eb' }}>+ เพิ่มอาชีพใหม่</span>
              <span className="career-pill-category">ไปหน้ากำหนดเป้าหมาย</span>
            </div>
          </button>
        </div>
      </section>

      {/* 3. Action Toolbar (คลิกเพื่อเปิด Pop-up เพิ่มคุณสมบัติ/ทักษะ) */}
      <section className="skills-action-toolbar-card">
        <div className="skills-toolbar-left">
          <div className="skills-toolbar-badge-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="skills-toolbar-info">
            <h4 className="skills-toolbar-title">
              คุณสมบัติและทักษะสำหรับ "{activeCareer.title}"
            </h4>
            <p className="skills-toolbar-sub">
              มีทักษะทั้งหมด {activeSkills.length} รายการ • คลิกปุ่มเพื่อเปิดหน้าต่างเพิ่มทักษะหรือโหลดทักษะแนะนำ
            </p>
          </div>
        </div>

        <div className="skills-toolbar-actions">
          <button
            type="button"
            className="btn-auto-fill-all-ai"
            onClick={handleAutoFillAllSkills}
            title="โหลดทักษะแนะนำมาตรฐานทั้งหมดในคลิกเดียว"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>โหลดชุดทักษะแนะนำอัตโนมัติ (1-Click)</span>
          </button>

          <button
            type="button"
            className="btn-open-add-skill-modal"
            onClick={() => setShowAddSkillModal(true)}
            title="คลิกเพื่อเปิดหน้าต่างป๊อปอัปเพิ่มคุณสมบัติ/ทักษะ"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>เพิ่มคุณสมบัติ/ทักษะ</span>
          </button>
        </div>
      </section>

      {/* 4. Categorized Skills Section with Dropdown Level Selector */}
      <section className="skills-categories-grid">
        {Object.keys(categoriesMap).length === 0 ? (
          <div className="skill-category-block" style={{ textAlign: 'center', padding: '36px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#64748b', fontSize: '15px' }}>
              ยังไม่มีทักษะในอาชีพนี้ สามารถคลิกปุ่ม <strong>"+ เพิ่มคุณสมบัติ/ทักษะ"</strong> หรือ <strong>"โหลดชุดทักษะแนะนำอัตโนมัติ"</strong> ได้ทันที
            </span>
            <button
              type="button"
              className="btn-open-add-skill-modal"
              onClick={() => setShowAddSkillModal(true)}
              style={{ marginTop: '4px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>เพิ่มคุณสมบัติ/ทักษะ</span>
            </button>
          </div>
        ) : (
          Object.keys(categoriesMap).map((catName) => (
            <div key={catName} className="skill-category-block">
              {/* Category Header */}
              <div className="skill-category-header">
                <div className="skill-category-title-left">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>{catName}</span>
                </div>
                <span className="category-count-badge">{categoriesMap[catName].length} ทักษะ</span>
              </div>

              {/* Skills List in this Category */}
              <div className="category-skills-list">
                {categoriesMap[catName].map((skill) => {
                  const isDropdownOpen = openDropdownSkillId === skill.id
                  const currentLevelText = skill.level || targetLevelOptions[3].title
                  const badgeText = getBadgeFromTitle(currentLevelText)
                  const isYes = badgeText === 'Yes'
                  const isNo = badgeText === 'No'

                  return (
                    <div
                      key={skill.id}
                      className="skill-item-card-simple"
                      style={{ zIndex: isDropdownOpen ? 99 : 1, position: 'relative' }}
                    >
                      <div
                        className="skill-item-left"
                        onClick={() => handleOpenSkillModal(skill)}
                        style={{ cursor: 'pointer' }}
                        title="คลิกเพื่อเปิดป๊อปอัปดูและปรับแต่งรายละเอียดทักษะ"
                      >
                        <div className="skill-icon-dot"></div>
                        <span className="skill-item-title-bold">{skill.name}</span>
                        <span
                          style={{
                            fontSize: '11px',
                            color: '#2563eb',
                            backgroundColor: '#eff6ff',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            fontWeight: '600',
                            border: '1px solid #bfdbfe',
                            marginLeft: '6px',
                          }}
                        >
                          คลิกดูรายละเอียด
                        </span>
                      </div>

                      {/* Beautiful Custom Dropdown Level Selector */}
                      <div className="skill-item-right-controls">
                        <div className="skill-level-dropdown-container">
                          <span className="level-select-label">ระดับเป้าหมาย:</span>

                          {/* Trigger Button */}
                          <button
                            type="button"
                            className={`custom-level-select-trigger ${isDropdownOpen ? 'active' : ''}`}
                            onClick={() => setOpenDropdownSkillId(isDropdownOpen ? null : skill.id)}
                            title="คลิกเพื่อเลือกระดับเป้าหมาย"
                          >
                            <span className={`trigger-level-badge ${isYes ? 'yes' : isNo ? 'no' : ''}`}>
                              {badgeText}
                            </span>
                            <span className="trigger-level-text">{currentLevelText}</span>
                            <span className={`trigger-chevron ${isDropdownOpen ? 'open' : ''}`}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </span>
                          </button>

                          {/* Floating Dropdown Menu Options */}
                          {isDropdownOpen && (
                            <ul className="custom-level-dropdown-menu-list">
                              {targetLevelOptions.map((opt) => {
                                const isSelected = currentLevelText === opt.title
                                const optBadge = opt.tag
                                const isOptYes = optBadge === 'Yes'
                                const isOptNo = optBadge === 'No'

                                return (
                                  <li
                                    key={opt.id}
                                    className={`custom-level-dropdown-item ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleSetSkillLevel(skill.id, opt.title)}
                                  >
                                    <div className={`item-level-tag ${isOptYes ? 'yes' : isOptNo ? 'no' : ''}`}>
                                      {optBadge}
                                    </div>
                                    <span className="item-level-text">{opt.title}</span>
                                    {isSelected && (
                                      <div className="item-check-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                          <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                      </div>
                                    )}
                                  </li>
                                )
                              })}
                            </ul>
                          )}
                        </div>

                        {/* Open Modal Button */}
                        <button
                          type="button"
                          className="btn-open-popup-eval"
                          onClick={() => handleOpenSkillModal(skill)}
                          title="เปิดป๊อปอัปดูและปรับแต่งรายละเอียดทักษะ"
                          style={{
                            padding: '6px 10px',
                            fontSize: '12.5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: '#f8fafc',
                            border: '1.5px solid #cbd5e1',
                            borderRadius: '8px',
                            color: '#1e40af',
                            cursor: 'pointer',
                            fontWeight: '700',
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          <span>ดู / ปรับแต่ง</span>
                        </button>

                        {/* Quick Delete */}
                        <button
                          type="button"
                          className="btn-delete-skill-quick"
                          onClick={() => handleDeleteSkill(skill.id)}
                          title="ลบทักษะนี้"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </section>

      {/* 5. Bottom Actions Bar */}
      <section className="qualifications-bottom-bar">
        <div className="bottom-bar-title">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          <span>รวมคุณสมบัติทั้งหมดของ {activeCareer.title}: <strong>{activeSkills.length} รายการ</strong></span>
        </div>

        <div className="bottom-bar-actions">
          <button type="button" className="btn-export-excel" onClick={handleExportExcel}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>ส่งออก EXCEL</span>
          </button>

          <button
            type="button"
            className="btn-save-qualifications-structure"
            onClick={handleSaveStructure}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            <span>บันทึกโครงสร้างทักษะ</span>
          </button>
        </div>
      </section>

      {/* ========================================================
          Pop-up Modal: เพิ่มคุณสมบัติ/ทักษะ (ตามรูปภาพ)
          ======================================================== */}
      {showAddSkillModal && (
        <div className="assessment-modal-overlay" onClick={() => setShowAddSkillModal(false)}>
          <div className="assessment-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px' }}>
            {/* Modal Header */}
            <div className="assessment-modal-header">
              <div className="modal-header-left-title">
                <div className="modal-skill-icon-badge" style={{ background: '#eff6ff', color: '#2563eb' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <div className="modal-skill-title-group">
                  <h3 className="modal-skill-title">เพิ่มคุณสมบัติ/ทักษะสำหรับ "{activeCareer.title}"</h3>
                  <div className="modal-skill-meta">
                    <span>พิมพ์ชื่อทักษะแล้วกด Enter หรือคลิกเลือกจากชุดทักษะแนะนำ</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  className="btn-auto-fill-all-ai"
                  onClick={handleAutoFillAllSkills}
                  title="โหลดทักษะแนะนำมาตรฐานทั้งหมดในคลิกเดียว"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span>โหลดชุดทักษะแนะนำอัตโนมัติ</span>
                </button>

                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setShowAddSkillModal(false)}
                  title="ปิดหน้าต่าง"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="assessment-modal-body" style={{ gap: '16px' }}>
              {addSkillSuccessMsg && (
                <div
                  style={{
                    backgroundColor: '#ecfdf5',
                    border: '1.5px solid #a7f3d0',
                    borderRadius: '10px',
                    padding: '10px 16px',
                    color: '#065f46',
                    fontSize: '13.5px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{addSkillSuccessMsg}</span>
                </div>
              )}

              {/* Input Form Bar */}
              <form className="quick-add-input-row" onSubmit={handleQuickAddSkill} style={{ width: '100%', margin: 0 }}>
                <input
                  type="text"
                  className="quick-add-input"
                  placeholder="พิมพ์ชื่อทักษะ เช่น การเขียนโปรแกรม Python, การทำงานเป็นทีม..."
                  value={quickSkillName}
                  onChange={(e) => setQuickSkillName(e.target.value)}
                  autoFocus
                />

                {/* Custom Category Dropdown */}
                <div className="custom-category-dropdown-wrap">
                  <button
                    type="button"
                    className={`custom-cat-dropdown-trigger ${isCategoryDropdownOpen ? 'active' : ''}`}
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    title="คลิกเพื่อเลือกหมวดหมู่ทักษะ"
                  >
                    <span className="cat-trigger-icon">{activeCatObj.icon}</span>
                    <span className="cat-trigger-label">
                      {selectedCategoryKey === 'other' && customCategoryName
                        ? `อื่นๆ: ${customCategoryName}`
                        : activeCatObj.label}
                    </span>
                    <svg
                      className={`cat-trigger-chevron ${isCategoryDropdownOpen ? 'open' : ''}`}
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {isCategoryDropdownOpen && (
                    <ul className="custom-cat-dropdown-menu" style={{ zIndex: 10000 }}>
                      {categoryOptions.map((cat) => {
                        const isSelected = selectedCategoryKey === cat.id
                        return (
                          <li
                            key={cat.id}
                            className={`custom-cat-menu-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedCategoryKey(cat.id)
                              setIsCategoryDropdownOpen(false)
                            }}
                          >
                            <span className="cat-menu-icon">{cat.icon}</span>
                            <span className="cat-menu-label">{cat.label}</span>
                            {isSelected && (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#2563eb"
                                strokeWidth="2.5"
                                style={{ marginLeft: 'auto' }}
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>

                {/* Custom Category Input if "Other" is selected */}
                {selectedCategoryKey === 'other' && (
                  <div className="custom-cat-input-box" style={{ width: '100%', marginTop: '6px' }}>
                    <input
                      type="text"
                      className="custom-cat-text-input"
                      placeholder="ระบุชื่อหมวดหมู่เอง เช่น ทักษะความเป็นผู้นำ..."
                      value={customCategoryName}
                      onChange={(e) => setCustomCategoryName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <button type="submit" className="btn-quick-add-submit" style={{ padding: '10px 20px' }}>
                  <span>+ เพิ่มทักษะ</span>
                </button>
              </form>

              {/* Clickable Quick Suggestion Chips */}
              {currentRecommendedChips.length > 0 && (
                <div className="quick-suggest-section" style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '16px', marginTop: '6px' }}>
                  <span className="quick-suggest-label" style={{ marginBottom: '10px', display: 'block' }}>
                    ทักษะแนะนำยอดนิยม (คลิกเพื่อเพิ่มทันที):
                  </span>
                  <div className="quick-chips-wrapper">
                    {currentRecommendedChips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="quick-chip-btn"
                        onClick={() => handleAddFromChip(chip)}
                        title={`คลิกเพื่อเพิ่ม "${chip.name}" เข้ารายการทันที`}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>{chip.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="assessment-modal-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
                ปัจจุบันมี <strong>{activeSkills.length} ทักษะ</strong> สำหรับ {activeCareer.title}
              </span>
              <button
                type="button"
                className="btn-modal-save"
                onClick={() => setShowAddSkillModal(false)}
                style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 24px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                เสร็จสิ้น / ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          6. Pop-up Modal: Skill Details & Target Level Customization
          ======================================================== */}
      {selectedSkillModal && (
        <div className="assessment-modal-overlay" onClick={handleCloseSkillModal}>
          <div className="assessment-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            {/* Modal Header */}
            <div className="assessment-modal-header">
              <div className="modal-header-left-title">
                <div className="modal-skill-icon-badge" style={{ background: '#eff6ff', color: '#2563eb' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div className="modal-skill-title-group">
                  <h3 className="modal-skill-title">กำหนดรายละเอียดทักษะ</h3>
                  <div className="modal-skill-meta">
                    <span className="modal-month-badge" style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                      <span>อาชีพ: {activeCareer.title}</span>
                    </span>
                  </div>
                </div>
              </div>

              <button type="button" className="modal-close-btn" onClick={handleCloseSkillModal} title="ปิดหน้าต่าง">
                ✕
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveSkillModal} className="assessment-modal-body" style={{ gap: '16px' }}>
              {/* Field 1: Skill Name */}
              <div className="modal-form-card-section">
                <label className="modal-section-label" style={{ marginBottom: '6px' }}>
                  <div className="modal-section-label-left">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <line x1="18" y1="2" x2="22" y2="6" />
                      <path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z" />
                    </svg>
                    <span>ชื่อคุณสมบัติ / ทักษะ:</span>
                  </div>
                </label>
                <input
                  type="text"
                  className="quick-add-input"
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1.5px solid #cbd5e1' }}
                  value={modalSkillForm.name}
                  onChange={(e) => setModalSkillForm({ ...modalSkillForm, name: e.target.value })}
                  placeholder="เช่น เขียนโปรแกรม JavaScript, การแก้ปัญหาเชิงวิเคราะห์..."
                  required
                />
              </div>

              {/* Field 2: Category Selector */}
              <div className="modal-form-card-section">
                <label className="modal-section-label" style={{ marginBottom: '6px' }}>
                  <div className="modal-section-label-left">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>หมวดหมู่ทักษะ:</span>
                  </div>
                </label>

                <div className="custom-category-dropdown-wrap">
                  <button
                    type="button"
                    className={`custom-cat-dropdown-trigger ${isModalCatDropdownOpen ? 'active' : ''}`}
                    onClick={() => setIsModalCatDropdownOpen(!isModalCatDropdownOpen)}
                  >
                    <span className="cat-trigger-label">
                      {modalSkillForm.category === 'custom'
                        ? `อื่นๆ: ${modalSkillForm.customCategory || '(ระบุเอง)'}`
                        : modalSkillForm.category}
                    </span>
                    <svg
                      className={`cat-trigger-chevron ${isModalCatDropdownOpen ? 'open' : ''}`}
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {isModalCatDropdownOpen && (
                    <ul className="custom-cat-dropdown-menu" style={{ zIndex: 10000 }}>
                      {categoryOptions.map((cat) => {
                        const isSelected =
                          cat.id === 'other'
                            ? modalSkillForm.category === 'custom'
                            : modalSkillForm.category === cat.fullName || modalSkillForm.category === cat.label
                        return (
                          <li
                            key={cat.id}
                            className={`custom-cat-menu-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              if (cat.id === 'other') {
                                setModalSkillForm({ ...modalSkillForm, category: 'custom' })
                              } else {
                                setModalSkillForm({ ...modalSkillForm, category: cat.fullName })
                              }
                              setIsModalCatDropdownOpen(false)
                            }}
                          >
                            <span className="cat-menu-icon">{cat.icon}</span>
                            <span className="cat-menu-label">{cat.label}</span>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>

                {modalSkillForm.category === 'custom' && (
                  <div style={{ marginTop: '8px' }}>
                    <input
                      type="text"
                      className="custom-cat-text-input"
                      placeholder="ระบุชื่อหมวดหมู่ที่ต้องการ..."
                      value={modalSkillForm.customCategory}
                      onChange={(e) => setModalSkillForm({ ...modalSkillForm, customCategory: e.target.value })}
                      required
                    />
                  </div>
                )}
              </div>

              {/* Field 3: Target Level Selector (7 Levels) */}
              <div className="modal-form-card-section">
                <label className="modal-section-label" style={{ marginBottom: '8px' }}>
                  <div className="modal-section-label-left">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 14 14" />
                    </svg>
                    <span>ระดับเป้าหมายที่ต้องการพัฒนา (7 ระดับมาตรฐาน):</span>
                  </div>
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {targetLevelOptions.map((lvl) => {
                    const isSelected = modalSkillForm.level === lvl.title
                    const isYes = lvl.tag === 'Yes'
                    const isNo = lvl.tag === 'No'
                    return (
                      <div
                        key={lvl.id}
                        onClick={() => setModalSkillForm({ ...modalSkillForm, level: lvl.title })}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: isSelected ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                          backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <input
                          type="radio"
                          name="modalTargetLevel"
                          checked={isSelected}
                          onChange={() => setModalSkillForm({ ...modalSkillForm, level: lvl.title })}
                          style={{ cursor: 'pointer', accentColor: '#2563eb' }}
                        />
                        <span
                          className={`trigger-level-badge ${isYes ? 'yes' : isNo ? 'no' : ''}`}
                          style={{ minWidth: '46px', textAlign: 'center' }}
                        >
                          {lvl.tag}
                        </span>
                        <span
                          style={{
                            fontSize: '13px',
                            fontWeight: isSelected ? '700' : '500',
                            color: isSelected ? '#1e40af' : '#334155',
                            lineHeight: 1.35,
                          }}
                        >
                          {lvl.title}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Field 4: Description / Sub-goals */}
              <div className="modal-form-card-section">
                <label className="modal-section-label" style={{ marginBottom: '6px' }}>
                  <div className="modal-section-label-left">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    <span>คำอธิบาย / รายละเอียดเพิ่มเติม (ไม่บังคับ):</span>
                  </div>
                </label>
                <textarea
                  className="modal-text-area"
                  rows={3}
                  placeholder="ระบุแนวทางการพัฒนา หรือเกณฑ์ชี้วัดความสำเร็จของทักษะนี้..."
                  value={modalSkillForm.description}
                  onChange={(e) => setModalSkillForm({ ...modalSkillForm, description: e.target.value })}
                />
              </div>

              {/* Modal Footer */}
              <div
                className="assessment-modal-footer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1.5px solid #e2e8f0',
                  marginTop: '8px',
                }}
              >
                <button
                  type="button"
                  onClick={handleModalDeleteSkill}
                  style={{
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    border: '1px solid #fca5a5',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  <span>ลบทักษะนี้</span>
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn-modal-cancel"
                    onClick={handleCloseSkillModal}
                    style={{
                      background: '#ffffff',
                      border: '1.5px solid #cbd5e1',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                    }}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="btn-modal-save"
                    style={{
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 20px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    <span>บันทึกการเปลี่ยนแปลง</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

