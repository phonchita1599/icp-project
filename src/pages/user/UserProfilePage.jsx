import React, { useState } from 'react'
import './UserProfilePage.css'

export default function UserProfilePage({
  currentUser,
  onUpdateUser,
  onNavigateToCareerGoal,
  onNavigateToDashboard,
  onNavigateHome,
}) {
  const fileInputRef = React.useRef(null)
  const isStaff = currentUser?.role === 'super_user' || currentUser?.role === 'super_admin'
  const isSuperAdmin = currentUser?.role === 'super_admin'
  const isSuperUser = currentUser?.role === 'super_user'

  // Local form state initialized with currentUser data
  const [formData, setFormData] = useState({
    name: currentUser?.name || (isStaff ? 'คุณพรชิดา สนิทเชื้อ' : 'นายธนกร รัตนผล'),
    email: currentUser?.email || (isStaff ? 'dss.mentor@sut.ac.th' : 'b6501234@g.sut.ac.th'),
    studentId: currentUser?.studentId || (isStaff ? 'STAFF-65089' : 'B6501234'),
    phone: currentUser?.phone || (isStaff ? '044-224-567 ต่อ 112' : '081-234-5678'),
    gender: currentUser?.gender || (isStaff ? 'หญิง' : 'ชาย'),
    birthDate: currentUser?.birthDate || (isStaff ? '1988-08-12' : '2003-05-15'),
    lineId: currentUser?.lineId || (isStaff ? 'dss.sut.mentor' : 'thanakorn.dev'),
    avatar: currentUser?.avatar || (isStaff ? 'avatar-4' : 'avatar-1'),
    avatarUrl: currentUser?.avatarUrl || '',
    // Organization / Academic Info
    institute: currentUser?.institute || 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
    faculty: currentUser?.faculty || (isSuperAdmin ? 'ฝ่ายบริหารระบบและเทคโนโลยีสารสนเทศ (Admin Office)' : isStaff ? 'ศูนย์บริการนักศึกษาพิการ (DSS)' : 'สำนักวิชาเทคโนโลยีสารสนเทศ'),
    major: currentUser?.major || (isSuperAdmin ? 'งานบริหารและพัฒนาระบบสารสนเทศ' : isStaff ? 'งานสนับสนุนและพัฒนานักศึกษาพิการ' : 'วิทยาการคอมพิวเตอร์'),
    position: currentUser?.position || (isSuperAdmin ? 'ผู้ดูแลระบบสารสนเทศระดับสูง (System Administrator)' : isStaff ? 'เจ้าหน้าที่ศูนย์บริการนักศึกษาพิการ (DSS) / ที่ปรึกษา ICP' : 'นักศึกษา'),
    officeRoom: currentUser?.officeRoom || (isSuperAdmin ? 'อาคารบริหาร ชั้น 3 ห้องฝ่ายไอที' : isStaff ? 'อาคารกิจการนักศึกษา (สุรสัมมนาคาร) ชั้น 1 ห้อง DSS Center' : ''),
    studyYear: currentUser?.studyYear || (isStaff ? 'เจ้าหน้าที่ประจำ' : 'ปี 3 (หลักสูตร 4 ปี)'),
    gpax: currentUser?.gpax || (isStaff ? '-' : '3.45'),
    advisor: currentUser?.advisor || (isSuperAdmin ? 'ผู้อำนวยการศูนย์คอมพิวเตอร์และสารสนเทศ' : isStaff ? 'หัวหน้าส่วนส่งเสริมและพัฒนานักศึกษา มทส.' : 'ดร.สมชาย มงคลสุข (อาจารย์ที่ปรึกษาสำนักวิชา)'),
    // DSS Support / Scope Info
    disabilityType: currentUser?.disabilityType || (isStaff ? 'ดูแลนักศึกษาพิการทุกประเภท (การเคลื่อนไหว, การเห็น, การได้ยิน, LD, ออทิสติก)' : 'ความบกพร่องทางการเคลื่อนไหวหรือร่างกาย (ประเภท 3)'),
    assistiveNeeds: currentUser?.assistiveNeeds || (isSuperAdmin ? 'ระบบโครงสร้างพื้นฐานเซิร์ฟเวอร์ และสิทธิ์การเข้าถึงข้อมูลระบบ ICP' : isStaff ? 'ระบบบริหารจัดการแผนพัฒนาอาชีพนักศึกษา DSS รายบุคคล (ICP), เทคโนโลยีสิ่งอำนวยความสะดวกสำหรับนักศึกษาพิการ' : 'คีย์บอร์ดตามหลักสรีรศาสตร์ (Ergonomic), แท่นวางแขนปรับระดับ, สิทธิ์สอบห้องพิเศษ DSS'),
    dssMentor: currentUser?.dssMentor || (isSuperAdmin ? 'ทีมผู้ดูแลระบบกลาง มทส.' : isStaff ? 'คุณพรชิดา สนิทเชื้อ (ผู้ประสานงานและที่ปรึกษาหลักประจำกลุ่ม DSS)' : 'คุณพรชิดา สนิทเชื้อ (ศูนย์ DSS มทส.)'),
    // Career & ICP Info / Staff Mentoring & Expertise
    targetCareer: currentUser?.targetCareer || (isSuperAdmin ? 'ผู้วิเคราะห์และพัฒนาระบบสารสนเทศองค์กร' : isStaff ? 'ผู้เชี่ยวชาญด้านการแนะแนวและส่งเสริมอาชีพนักศึกษาพิการในระดับอุดมศึกษา' : 'โปรแกรมเมอร์ (Full-Stack Web Developer)'),
    coreSkills: currentUser?.coreSkills || (isSuperAdmin ? 'System Architecture, Database Management, Security & Access Control, Web Application Development' : isStaff ? 'Individualized Career Planning (ICP), การแนะแนวอาชีพนักศึกษา DSS, การประสานงานสถานประกอบการ, การประเมินสมรรถนะรายบุคคล' : 'React, Node.js, PostgreSQL, Git, UI Design System, Web Accessibility (WCAG)'),
    portfolioUrl: currentUser?.portfolioUrl || (isSuperAdmin ? 'https://it.sut.ac.th' : isStaff ? 'https://dss.sut.ac.th' : 'https://github.com/thanakorn-sut'),
    bio: currentUser?.bio || (isSuperAdmin ? 'ผู้ดูแลระบบกลาง บริหารจัดการระบบฐานข้อมูลและการเข้าถึงข้อมูลระบบ ICP ให้เกิดความปลอดภัยสูงสุด' : isStaff ? 'เจ้าหน้าที่ศูนย์บริการนักศึกษาพิการ (DSS) มหาวิทยาลัยเทคโนโลยีสุรนารี มุ่งมั่นส่งเสริมศักยภาพและพัฒนาเส้นทางอาชีพแก่นักศึกษาพิการสู่ตลาดแรงงานอย่างยั่งยืน' : 'นักศึกษาผู้มีความมุ่งมั่นในการเป็น Full-Stack Developer พร้อมประยุกต์ใช้เทคโนโลยีสร้างสรรค์ระบบที่ทุกคนเข้าถึงได้ (Accessible Web for All)'),
    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [activeTab, setActiveTab] = useState('personal') // 'personal' | 'academic' | 'dss' | 'career' | 'security'
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Predefined faculty options for students
  const facultyOptions = [
    'สำนักวิชาเทคโนโลยีสารสนเทศ',
    'สำนักวิชาวิศวกรรมศาสตร์',
    'สำนักวิชาเทคโนโลยีสังคม',
    'สำนักวิชาวิทยาศาสตร์',
    'สำนักวิชาแพทยศาสตร์',
    'สำนักวิชาพยาบาลศาสตร์',
    'สำนักวิชาทันตแพทยศาสตร์',
    'ศูนย์บริการนักศึกษาพิการ (DSS)',
  ]

  // Predefined major options for students
  const majorOptions = [
    'วิทยาการคอมพิวเตอร์',
    'เทคโนโลยีสารสนเทศ',
    'วิศวกรรมคอมพิวเตอร์',
    'วิศวกรรมซอฟต์แวร์',
    'การจัดการเทคโนโลยีและนวัตกรรม',
    'การตลาดดิจิทัลและอีคอมเมิร์ซ',
    'วิทยาการข้อมูลและการวิเคราะห์',
    'นวัตกรรมดิจิทัล',
  ]

  // Predefined options for staff
  const staffFacultyOptions = [
    'ศูนย์บริการนักศึกษาพิการ (DSS)',
    'ส่วนส่งเสริมและพัฒนานักศึกษา',
    'สำนักวิชาเทคโนโลยีสารสนเทศ',
    'สำนักวิชาวิศวกรรมศาสตร์',
    'ฝ่ายบริหารระบบและเทคโนโลยีสารสนเทศ (Admin Office)',
    'ศูนย์สหกิจศึกษาและพัฒนาอาชีพ',
    'ศูนย์คอมพิวเตอร์และสารสนเทศ',
  ]

  const staffDepartmentOptions = [
    'งานสนับสนุนและพัฒนานักศึกษาพิการ',
    'งานแนะแนวอาชีพและสหกิจศึกษา DSS',
    'งานเทคโนโลยีสิ่งอำนวยความสะดวก (AT)',
    'งานบริหารและพัฒนาระบบสารสนเทศ',
    'งานประสานงานสถานประกอบการและจัดหางาน',
    'งานให้คำปรึกษาและจิตวิทยาการศึกษา',
  ]

  const staffDisabilityScopeOptions = [
    'ดูแลนักศึกษาพิการทุกประเภท (การเคลื่อนไหว, การเห็น, การได้ยิน, LD, ออทิสติก)',
    'กลุ่มนักศึกษาความบกพร่องทางการเคลื่อนไหวหรือร่างกาย (ประเภท 3)',
    'กลุ่มนักศึกษาความบกพร่องทางการเห็น (สายตาเลือนราง/ตาบอด - ประเภท 1)',
    'กลุ่มนักศึกษาความบกพร่องทางการได้ยินหรือสื่อความหมาย (ประเภท 2)',
    'กลุ่มนักศึกษาความบกพร่องทางการเรียนรู้ (LD - ประเภท 5)',
    'กลุ่มนักศึกษาความบกพร่องทางออทิสติก (ประเภท 6)',
    'กลุ่มนักศึกษาโครงการพิเศษ / เตรียมความพร้อมสหกิจศึกษา',
  ]

  // Predefined disability options for students
  const disabilityOptions = [
    'ไม่มี (นักศึกษา / ผู้ใช้งานทั่วไป)',
    'ความบกพร่องทางการเคลื่อนไหวหรือร่างกาย (ประเภท 3)',
    'ความบกพร่องทางการเห็น (สายตาเลือนราง/ตาบอด - ประเภท 1)',
    'ความบกพร่องทางการได้ยินหรือสื่อความหมาย (ประเภท 2)',
    'ความบกพร่องทางการเรียนรู้ (LD - ประเภท 5)',
    'ความบกพร่องทางออทิสติก (ประเภท 6)',
    'อื่นๆ (ระบุความต้องการสนับสนุนพิเศษ)',
  ]

  // Predefined avatar choices
  const avatarOptions = [
    { id: 'avatar-4', emoji: '🧑‍💼', bg: '#fef3c7', label: 'เจ้าหน้าที่/อาจารย์' },
    { id: 'avatar-1', emoji: '👨‍💻', bg: '#dbeafe', label: 'Tech Guy' },
    { id: 'avatar-2', emoji: '👩‍💻', bg: '#fce7f3', label: 'Tech Girl' },
    { id: 'avatar-3', emoji: '🎓', bg: '#e0e7ff', label: 'นักศึกษา' },
    { id: 'avatar-5', emoji: '🌟', bg: '#ccfbf1', label: 'Creative' },
    { id: 'avatar-6', emoji: '🦾', bg: '#fee2e2', label: 'Empowered' },
  ]

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('ขนาดไฟล์รูปภาพต้องไม่เกิน 5MB')
        return
      }
      const reader = new FileReader()
      reader.onload = (uploadEvent) => {
        const base64Url = uploadEvent.target.result
        setFormData((prev) => ({
          ...prev,
          avatar: 'custom',
          avatarUrl: base64Url,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveCustomAvatar = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: isStaff ? 'avatar-4' : 'avatar-1',
      avatarUrl: '',
    }))
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Calculate profile completeness percentage
  const calculateCompleteness = () => {
    const fields = [
      formData.name,
      formData.email,
      formData.studentId,
      formData.phone,
      formData.institute,
      formData.faculty,
      formData.major,
      formData.targetCareer,
      formData.coreSkills,
      formData.bio,
    ]
    const filled = fields.filter((f) => f && f.toString().trim() !== '').length
    return Math.round((filled / fields.length) * 100)
  }

  const completeness = calculateCompleteness()

  const handleSaveProfile = (e) => {
    e.preventDefault()

    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        alert('รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน')
        return
      }
      if (formData.newPassword.length < 6) {
        alert('รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร')
        return
      }
    }

    const selectedAv = avatarOptions.find((a) => a.id === formData.avatar)

    const updatedUser = {
      ...currentUser,
      name: formData.name,
      email: formData.email,
      studentId: formData.studentId,
      phone: formData.phone,
      gender: formData.gender,
      birthDate: formData.birthDate,
      lineId: formData.lineId,
      avatar: formData.avatar,
      avatarUrl: formData.avatar === 'custom' ? formData.avatarUrl : (formData.avatarUrl || ''),
      avatarEmoji: formData.avatar !== 'custom' ? (selectedAv?.emoji || (isStaff ? '🧑‍💼' : '👨‍💻')) : '',
      institute: formData.institute,
      faculty: formData.faculty,
      major: formData.major,
      position: formData.position,
      officeRoom: formData.officeRoom,
      studyYear: formData.studyYear,
      gpax: formData.gpax,
      advisor: formData.advisor,
      disabilityType: formData.disabilityType,
      assistiveNeeds: formData.assistiveNeeds,
      dssMentor: formData.dssMentor,
      targetCareer: formData.targetCareer,
      coreSkills: formData.coreSkills,
      portfolioUrl: formData.portfolioUrl,
      bio: formData.bio,
    }

    onUpdateUser(updatedUser)
    setSaveSuccessMessage('บันทึกและอัปเดตข้อมูลโปรไฟล์เรียบร้อยแล้ว!')
    setTimeout(() => setSaveSuccessMessage(''), 4000)
  }

  const handleReset = () => {
    if (window.confirm('คุณต้องการคืนค่าข้อมูลเดิมใช่หรือไม่?')) {
      setFormData({
        name: currentUser?.name || (isStaff ? 'คุณพรชิดา สนิทเชื้อ' : 'นายธนกร รัตนผล'),
        email: currentUser?.email || (isStaff ? 'dss.mentor@sut.ac.th' : 'b6501234@g.sut.ac.th'),
        studentId: currentUser?.studentId || (isStaff ? 'STAFF-65089' : 'B6501234'),
        phone: currentUser?.phone || (isStaff ? '044-224-567 ต่อ 112' : '081-234-5678'),
        gender: currentUser?.gender || (isStaff ? 'หญิง' : 'ชาย'),
        birthDate: currentUser?.birthDate || (isStaff ? '1988-08-12' : '2003-05-15'),
        lineId: currentUser?.lineId || (isStaff ? 'dss.sut.mentor' : 'thanakorn.dev'),
        avatar: currentUser?.avatar || (isStaff ? 'avatar-4' : 'avatar-1'),
        avatarUrl: currentUser?.avatarUrl || '',
        institute: currentUser?.institute || 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
        faculty: currentUser?.faculty || (isSuperAdmin ? 'ฝ่ายบริหารระบบและเทคโนโลยีสารสนเทศ (Admin Office)' : isStaff ? 'ศูนย์บริการนักศึกษาพิการ (DSS)' : 'สำนักวิชาเทคโนโลยีสารสนเทศ'),
        major: currentUser?.major || (isSuperAdmin ? 'งานบริหารและพัฒนาระบบสารสนเทศ' : isStaff ? 'งานสนับสนุนและพัฒนานักศึกษาพิการ' : 'วิทยาการคอมพิวเตอร์'),
        position: currentUser?.position || (isSuperAdmin ? 'ผู้ดูแลระบบสารสนเทศระดับสูง (System Administrator)' : isStaff ? 'เจ้าหน้าที่ศูนย์บริการนักศึกษาพิการ (DSS) / ที่ปรึกษา ICP' : 'นักศึกษา'),
        officeRoom: currentUser?.officeRoom || (isSuperAdmin ? 'อาคารบริหาร ชั้น 3 ห้องฝ่ายไอที' : isStaff ? 'อาคารกิจการนักศึกษา (สุรสัมมนาคาร) ชั้น 1 ห้อง DSS Center' : ''),
        studyYear: currentUser?.studyYear || (isStaff ? 'เจ้าหน้าที่ประจำ' : 'ปี 3 (หลักสูตร 4 ปี)'),
        gpax: currentUser?.gpax || (isStaff ? '-' : '3.45'),
        advisor: currentUser?.advisor || (isSuperAdmin ? 'ผู้อำนวยการศูนย์คอมพิวเตอร์และสารสนเทศ' : isStaff ? 'หัวหน้าส่วนส่งเสริมและพัฒนานักศึกษา มทส.' : 'ดร.สมชาย มงคลสุข (อาจารย์ที่ปรึกษาสำนักวิชา)'),
        disabilityType: currentUser?.disabilityType || (isStaff ? 'ดูแลนักศึกษาพิการทุกประเภท (การเคลื่อนไหว, การเห็น, การได้ยิน, LD, ออทิสติก)' : 'ความบกพร่องทางการเคลื่อนไหวหรือร่างกาย (ประเภท 3)'),
        assistiveNeeds: currentUser?.assistiveNeeds || (isSuperAdmin ? 'ระบบโครงสร้างพื้นฐานเซิร์ฟเวอร์ และสิทธิ์การเข้าถึงข้อมูลระบบ ICP' : isStaff ? 'ระบบบริหารจัดการแผนพัฒนาอาชีพนักศึกษา DSS รายบุคคล (ICP), เทคโนโลยีสิ่งอำนวยความสะดวกสำหรับนักศึกษาพิการ' : 'คีย์บอร์ดตามหลักสรีรศาสตร์ (Ergonomic), แท่นวางแขนปรับระดับ, สิทธิ์สอบห้องพิเศษ DSS'),
        dssMentor: currentUser?.dssMentor || (isSuperAdmin ? 'ทีมผู้ดูแลระบบกลาง มทส.' : isStaff ? 'คุณพรชิดา สนิทเชื้อ (ผู้ประสานงานและที่ปรึกษาหลักประจำกลุ่ม DSS)' : 'คุณพรชิดา สนิทเชื้อ (ศูนย์ DSS มทส.)'),
        targetCareer: currentUser?.targetCareer || (isSuperAdmin ? 'ผู้วิเคราะห์และพัฒนาระบบสารสนเทศองค์กร' : isStaff ? 'ผู้เชี่ยวชาญด้านการแนะแนวและส่งเสริมอาชีพนักศึกษาพิการในระดับอุดมศึกษา' : 'โปรแกรมเมอร์ (Full-Stack Web Developer)'),
        coreSkills: currentUser?.coreSkills || (isSuperAdmin ? 'System Architecture, Database Management, Security & Access Control, Web Application Development' : isStaff ? 'Individualized Career Planning (ICP), การแนะแนวอาชีพนักศึกษา DSS, การประสานงานสถานประกอบการ, การประเมินสมรรถนะรายบุคคล' : 'React, Node.js, PostgreSQL, Git, UI Design System, Web Accessibility (WCAG)'),
        portfolioUrl: currentUser?.portfolioUrl || (isSuperAdmin ? 'https://it.sut.ac.th' : isStaff ? 'https://dss.sut.ac.th' : 'https://github.com/thanakorn-sut'),
        bio: currentUser?.bio || (isSuperAdmin ? 'ผู้ดูแลระบบกลาง บริหารจัดการระบบฐานข้อมูลและการเข้าถึงข้อมูลระบบ ICP ให้เกิดความปลอดภัยสูงสุด' : isStaff ? 'เจ้าหน้าที่ศูนย์บริการนักศึกษาพิการ (DSS) มหาวิทยาลัยเทคโนโลยีสุรนารี มุ่งมั่นส่งเสริมศักยภาพและพัฒนาเส้นทางอาชีพแก่นักศึกษาพิการสู่ตลาดแรงงานอย่างยั่งยืน' : 'นักศึกษาผู้มีความมุ่งมั่นในการเป็น Full-Stack Developer พร้อมประยุกต์ใช้เทคโนโลยีสร้างสรรค์ระบบที่ทุกคนเข้าถึงได้ (Accessible Web for All)'),
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    }
  }

  const selectedAvatarObj = avatarOptions.find((a) => a.id === formData.avatar) || avatarOptions[0]
  const isCustomAvatarActive = formData.avatar === 'custom' && !!formData.avatarUrl

  return (
    <div className="user-profile-page-container">
      {/* Top Banner & Profile Overview */}
      <div className="profile-hero-card">
        <div className="profile-hero-left">
          <div
            className="profile-avatar-wrapper"
            style={{
              backgroundColor: isCustomAvatarActive ? '#ffffff' : selectedAvatarObj.bg,
              overflow: 'hidden',
            }}
          >
            {isCustomAvatarActive ? (
              <img
                src={formData.avatarUrl}
                alt="profile avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            ) : (
              <span className="profile-avatar-emoji">{selectedAvatarObj.emoji}</span>
            )}
          </div>
          <div className="profile-hero-info">
            <div className="profile-hero-badges">
              <span className={`profile-role-pill ${isStaff ? 'staff-role' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {isSuperAdmin ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>ผู้ดูแลระบบสูงสุด (Super Admin)</span>
                  </>
                ) : isSuperUser ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span>เจ้าหน้าที่ / ผู้ดูแลกลุ่ม (Super User DSS)</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <span>นักศึกษา / ผู้ใช้งาน ICP</span>
                  </>
                )}
              </span>
            </div>
            <h1 className="profile-hero-name">{formData.name}</h1>
            <p className="profile-hero-sub">
              <span>{formData.faculty}</span> • <span>{isStaff ? (formData.position || formData.major) : formData.major}</span> • <span>{formData.institute}</span>
            </p>
          </div>
        </div>

        {/* Completeness Card */}
        <div className="profile-completeness-box">
          <div className="completeness-header">
            <span className="completeness-label">ความสมบูรณ์ของโปรไฟล์</span>
            <span className="completeness-val">{completeness}%</span>
          </div>
          <div className="completeness-track">
            <div
              className="completeness-fill"
              style={{
                width: `${completeness}%`,
                background: completeness >= 80 ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #3b82f6, #2563eb)',
              }}
            />
          </div>
          <p className="completeness-hint" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>
              {isStaff
                ? 'ข้อมูลเจ้าหน้าที่และหน่วยงานสังกัดสมบูรณ์ พร้อมสำหรับการบริหารจัดการและดูแลนักศึกษา DSS'
                : completeness >= 85
                ? 'ข้อมูลโปรไฟล์สมบูรณ์ พร้อมสำหรับการวางแผนอาชีพ ICP'
                : 'กรอกข้อมูลเพิ่มเติมเพื่อการวิเคราะห์และแนะนำอาชีพที่แม่นยำยิ่งขึ้น'}
            </span>
          </p>
        </div>
      </div>

      {/* Success Alert Banner */}
      {saveSuccessMessage && (
        <div className="profile-alert-success">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* Profile Form Card */}
      <div className="profile-main-card">
        {/* Navigation Tabs */}
        <div className="profile-tabs-bar">
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{isStaff ? 'ข้อมูลเจ้าหน้าที่' : 'ข้อมูลส่วนตัว'}</span>
          </button>

          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'academic' ? 'active' : ''}`}
            onClick={() => setActiveTab('academic')}
          >
            {isStaff ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4v18" />
                <path d="M19 21V11l-6-4" />
                <path d="M9 9v.01" />
                <path d="M9 12v.01" />
                <path d="M9 15v.01" />
                <path d="M9 18v.01" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            )}
            <span>{isStaff ? 'ตำแหน่ง & หน่วยงานสังกัด' : 'การศึกษา & มหาวิทยาลัย'}</span>
          </button>

          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'dss' ? 'active' : ''}`}
            onClick={() => setActiveTab('dss')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{isStaff ? 'งานสนับสนุน & การดูแล DSS' : 'การสนับสนุนช่วยเหลือ DSS'}</span>
          </button>

          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'career' ? 'active' : ''}`}
            onClick={() => setActiveTab('career')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span>{isStaff ? 'เป้าหมายการดูแล & ความเชี่ยวชาญ' : 'เป้าหมาย ICP & ผลงาน'}</span>
          </button>

          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>ความปลอดภัย & รหัสผ่าน</span>
          </button>
        </div>

        <form onSubmit={handleSaveProfile} className="profile-form-body">
          {/* TAB 1: ข้อมูลส่วนตัว / ข้อมูลเจ้าหน้าที่ */}
          {activeTab === 'personal' && (
            <div className="tab-pane-content">
              <div className="section-intro">
                <h3 className="section-title">
                  {isStaff ? 'ข้อมูลส่วนตัวเจ้าหน้าที่และช่องทางติดต่อ' : 'ข้อมูลส่วนตัวและช่องทางติดต่อ'}
                </h3>
                <p className="section-subtitle">
                  {isStaff
                    ? 'จัดการข้อมูลประวัติเจ้าหน้าที่ รูปอวตาร และช่องทางการติดต่อสำหรับประสานงานกับนักศึกษาและหน่วยงาน'
                    : 'จัดการข้อมูลประวัติส่วนตัว รูปอวตาร และช่องทางที่อาจารย์ที่ปรึกษาและระบบสามารถติดต่อได้'}
                </p>
              </div>

              {/* Avatar Selector */}
              <div className="avatar-selection-area">
                <div className="avatar-selection-header">
                  <label className="field-label" style={{ marginBottom: '2px' }}>
                    เลือกรูปอวตารประจำตัว หรืออัปโหลดรูปภาพของตัวเอง
                  </label>
                  <span className="avatar-selection-subhint">
                    รูปภาพนี้จะนำไปแสดงบนการ์ดข้อมูลส่วนตัวและแสดงที่มุมซ้ายบนของแถบเมนู
                  </span>
                </div>

                <div className="avatar-options-grid">
                  {avatarOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`avatar-option-btn ${formData.avatar === opt.id ? 'selected' : ''}`}
                      style={{ backgroundColor: opt.bg }}
                      onClick={() => handleChange('avatar', opt.id)}
                    >
                      <span className="avatar-opt-emoji">{opt.emoji}</span>
                      <span className="avatar-opt-label">{opt.label}</span>
                    </button>
                  ))}

                  {/* Custom Uploaded Avatar Thumbnail Card */}
                  {formData.avatarUrl && (
                    <div className={`avatar-custom-pill ${formData.avatar === 'custom' ? 'selected' : ''}`}>
                      <button
                        type="button"
                        className="avatar-custom-btn"
                        onClick={() => handleChange('avatar', 'custom')}
                        title="คลิกเพื่อเลือกใช้รูปของตัวเอง"
                      >
                        <img src={formData.avatarUrl} alt="custom" className="avatar-custom-thumb" />
                        <span className="avatar-opt-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span>รูปของฉัน</span>
                          {formData.avatar === 'custom' && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </span>
                      </button>
                      <button
                        type="button"
                        className="btn-remove-custom-img"
                        onClick={handleRemoveCustomAvatar}
                        title="ลบรูปภาพนี้"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {/* Upload button */}
                  <div className="avatar-upload-box">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageUpload}
                    />
                    <button
                      type="button"
                      className={`btn-upload-avatar-action ${formData.avatar === 'custom' && formData.avatarUrl ? 'active-custom' : ''}`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                      <span>{formData.avatarUrl ? 'เปลี่ยนรูปของตัวเอง' : '+ อัปโหลดรูปภาพตัวเอง'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field-group">
                  <label className="field-label">ชื่อ - นามสกุล <span className="req-star">*</span></label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder={isStaff ? 'เช่น คุณพรชิดา สนิทเชื้อ' : 'เช่น นายธนกร รัตนผล'}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">
                    {isStaff ? 'รหัสบุคลากร / เลขประจำตัวเจ้าหน้าที่' : 'รหัสนักศึกษา / เลขประจำตัว'} <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder={isStaff ? 'เช่น STAFF-65089' : 'เช่น B6501234'}
                    value={formData.studentId}
                    onChange={(e) => handleChange('studentId', e.target.value)}
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">อีเมลติดต่อ <span className="req-star">*</span></label>
                  <input
                    type="email"
                    className="form-control-input"
                    placeholder={isStaff ? 'เช่น dss.mentor@sut.ac.th' : 'เช่น b6501234@g.sut.ac.th'}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">เบอร์โทรศัพท์มือถือ / โทรศัพท์โต๊ะทำงาน</label>
                  <input
                    type="tel"
                    className="form-control-input"
                    placeholder={isStaff ? 'เช่น 044-224-567 ต่อ 112' : 'เช่น 081-234-5678'}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">เพศ</label>
                  <select
                    className="form-control-select"
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                  >
                    <option value="หญิง">หญิง</option>
                    <option value="ชาย">ชาย</option>
                    <option value="ไม่ระบุ / อื่นๆ">ไม่ระบุ / อื่นๆ</option>
                  </select>
                </div>

                <div className="form-field-group">
                  <label className="field-label">วัน/เดือน/ปีเกิด</label>
                  <input
                    type="date"
                    className="form-control-input"
                    value={formData.birthDate}
                    onChange={(e) => handleChange('birthDate', e.target.value)}
                  />
                </div>

                <div className="form-field-group full-width">
                  <label className="field-label">LINE ID / ช่องทางการติดต่อสื่อสารเสริม</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder={isStaff ? 'เช่น dss.sut.mentor หรือ Official LINE DSS' : 'เช่น thanakorn.dev หรือ Facebook URL'}
                    value={formData.lineId}
                    onChange={(e) => handleChange('lineId', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ตำแหน่ง & หน่วยงานสังกัด (Staff) หรือ การศึกษา & มหาวิทยาลัย (Student) */}
          {activeTab === 'academic' && (
            <div className="tab-pane-content">
              <div className="section-intro">
                <h3 className="section-title">
                  {isStaff ? 'ข้อมูลตำแหน่งและหน่วยงานสังกัด' : 'ข้อมูลการศึกษาและสังกัดสถาบัน'}
                </h3>
                <p className="section-subtitle">
                  {isStaff
                    ? 'สังกัดศูนย์บริการ หน่วยงานที่รับผิดชอบ ตำแหน่งงาน และสถานที่ปฏิบัติงานภายในมหาวิทยาลัย'
                    : 'สังกัดสำนักวิชา สาขาวิชา ชั้นปี และประวัติการศึกษาในมหาวิทยาลัยเทคโนโลยีสุรนารี'}
                </p>
              </div>

              {isStaff ? (
                /* Staff View */
                <div className="form-grid-2">
                  <div className="form-field-group full-width">
                    <label className="field-label">สถาบัน / มหาวิทยาลัย</label>
                    <input
                      type="text"
                      className="form-control-input"
                      value={formData.institute}
                      onChange={(e) => handleChange('institute', e.target.value)}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">ศูนย์บริการ / หน่วยงานสังกัด <span className="req-star">*</span></label>
                    <select
                      className="form-control-select"
                      value={formData.faculty}
                      onChange={(e) => handleChange('faculty', e.target.value)}
                    >
                      {staffFacultyOptions.map((f, i) => (
                        <option key={i} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">ฝ่ายงาน / กลุ่มงานที่รับผิดชอบ <span className="req-star">*</span></label>
                    <select
                      className="form-control-select"
                      value={formData.major}
                      onChange={(e) => handleChange('major', e.target.value)}
                    >
                      {staffDepartmentOptions.map((m, i) => (
                        <option key={i} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">ตำแหน่งงาน / บทบาทหน้าที่ <span className="req-star">*</span></label>
                    <input
                      type="text"
                      className="form-control-input"
                      placeholder="เช่น เจ้าหน้าที่ศูนย์บริการนักศึกษาพิการ (DSS) / ที่ปรึกษา ICP"
                      value={formData.position || ''}
                      onChange={(e) => handleChange('position', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">ห้องปฏิบัติงาน / สถานที่ทำงาน</label>
                    <input
                      type="text"
                      className="form-control-input"
                      placeholder="เช่น อาคารกิจการนักศึกษา (สุรสัมมนาคาร) ชั้น 1 ห้อง DSS Center"
                      value={formData.officeRoom || ''}
                      onChange={(e) => handleChange('officeRoom', e.target.value)}
                    />
                  </div>

                  <div className="form-field-group full-width">
                    <label className="field-label">ผู้บังคับบัญชา / ผู้กำกับดูแล</label>
                    <input
                      type="text"
                      className="form-control-input"
                      placeholder="เช่น หัวหน้าส่วนส่งเสริมและพัฒนานักศึกษา มทส."
                      value={formData.advisor}
                      onChange={(e) => handleChange('advisor', e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                /* Student View */
                <div className="form-grid-2">
                  <div className="form-field-group full-width">
                    <label className="field-label">สถาบันการศึกษา</label>
                    <input
                      type="text"
                      className="form-control-input"
                      value={formData.institute}
                      onChange={(e) => handleChange('institute', e.target.value)}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">สำนักวิชา / คณะ <span className="req-star">*</span></label>
                    <select
                      className="form-control-select"
                      value={formData.faculty}
                      onChange={(e) => handleChange('faculty', e.target.value)}
                    >
                      {facultyOptions.map((f, i) => (
                        <option key={i} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">สาขาวิชา <span className="req-star">*</span></label>
                    <select
                      className="form-control-select"
                      value={formData.major}
                      onChange={(e) => handleChange('major', e.target.value)}
                    >
                      {majorOptions.map((m, i) => (
                        <option key={i} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">ระดับการศึกษา & ชั้นปี</label>
                    <select
                      className="form-control-select"
                      value={formData.studyYear}
                      onChange={(e) => handleChange('studyYear', e.target.value)}
                    >
                      <option value="ปี 1 (หลักสูตร 4 ปี)">ปี 1 (หลักสูตร 4 ปี)</option>
                      <option value="ปี 2 (หลักสูตร 4 ปี)">ปี 2 (หลักสูตร 4 ปี)</option>
                      <option value="ปี 3 (หลักสูตร 4 ปี)">ปี 3 (หลักสูตร 4 ปี)</option>
                      <option value="ปี 4 (หลักสูตร 4 ปี)">ปี 4 (หลักสูตร 4 ปี)</option>
                      <option value="ระดับบัณฑิตศึกษา (ปริญญาโท/เอก)">ระดับบัณฑิตศึกษา (ปริญญาโท/เอก)</option>
                      <option value="สำเร็จการศึกษาแล้ว">สำเร็จการศึกษาแล้ว</option>
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">เกรดเฉลี่ยสะสม (GPAX)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4.00"
                      className="form-control-input"
                      placeholder="เช่น 3.45"
                      value={formData.gpax}
                      onChange={(e) => handleChange('gpax', e.target.value)}
                    />
                  </div>

                  <div className="form-field-group full-width">
                    <label className="field-label">อาจารย์ที่ปรึกษาประจำหลักสูตร / สำนักวิชา</label>
                    <input
                      type="text"
                      className="form-control-input"
                      placeholder="เช่น ดร.สมชาย มงคลสุข (อาจารย์ที่ปรึกษาสำนักวิชา)"
                      value={formData.advisor}
                      onChange={(e) => handleChange('advisor', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: งานสนับสนุน & การดูแล DSS (Staff) หรือ การสนับสนุนช่วยเหลือ DSS (Student) */}
          {activeTab === 'dss' && (
            <div className="tab-pane-content">
              <div className="section-intro">
                <h3 className="section-title">
                  {isStaff ? 'ขอบเขตงานสนับสนุนและการดูแลนักศึกษาพิการ (DSS)' : 'ข้อมูลการสนับสนุนและการดูแลศูนย์บริการนักศึกษาพิการ (DSS)'}
                </h3>
                <p className="section-subtitle">
                  {isStaff
                    ? 'ข้อมูลกลุ่มนักศึกษาที่ดูแล ขอบเขตการสนับสนุน และความช่วยเหลือที่จัดสรรให้นักศึกษา'
                    : 'ระบุความต้องการสนับสนุนพิเศษ อุปกรณ์ หรือสิ่งอำนวยความสะดวก เพื่อให้ศูนย์ DSS จัดหาได้อย่างเหมาะสม'}
                </p>
              </div>

              {isStaff ? (
                /* Staff DSS View */
                <div className="form-grid-2">
                  <div className="form-field-group full-width">
                    <label className="field-label">กลุ่มนักศึกษา / ขอบเขตความพิการที่รับผิดชอบดูแลหลัก</label>
                    <select
                      className="form-control-select"
                      value={formData.disabilityType}
                      onChange={(e) => handleChange('disabilityType', e.target.value)}
                    >
                      {staffDisabilityScopeOptions.map((d, i) => (
                        <option key={i} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field-group full-width">
                    <label className="field-label">เครื่องมือ สิ่งอำนวยความสะดวก และการสนับสนุนที่จัดหาให้นักศึกษา</label>
                    <textarea
                      rows="3"
                      className="form-control-textarea"
                      placeholder="เช่น ให้คำปรึกษาแผนพัฒนาอาชีพรายบุคคล (ICP), จัดหาเทคโนโลยีสิ่งอำนวยความสะดวก (AT), ประสานงานห้องสอบพิเศษและล่ามภาษามือ, ติดตามการฝึกงาน/สหกิจศึกษา"
                      value={formData.assistiveNeeds}
                      onChange={(e) => handleChange('assistiveNeeds', e.target.value)}
                    />
                    <small className="field-hint">ข้อมูลนี้จะใช้แสดงในระบบเพื่อเป็นแนวทางในการประสานงานสนับสนุนแก่นักศึกษาในศูนย์ DSS มทส.</small>
                  </div>

                  <div className="form-field-group full-width">
                    <label className="field-label">บทบาทหน้าที่ในศูนย์ DSS</label>
                    <input
                      type="text"
                      className="form-control-input"
                      placeholder="เช่น คุณพรชิดา สนิทเชื้อ (ผู้ประสานงานและที่ปรึกษาหลักประจำกลุ่ม DSS มทส.)"
                      value={formData.dssMentor}
                      onChange={(e) => handleChange('dssMentor', e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                /* Student DSS View */
                <div className="form-grid-2">
                  <div className="form-field-group full-width">
                    <label className="field-label">ประเภทความต้องการสนับสนุน / ความบกพร่อง</label>
                    <select
                      className="form-control-select"
                      value={formData.disabilityType}
                      onChange={(e) => handleChange('disabilityType', e.target.value)}
                    >
                      {disabilityOptions.map((d, i) => (
                        <option key={i} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field-group full-width">
                    <label className="field-label">อุปกรณ์ เครื่องมือ หรือโปรแกรมช่วยเหลือที่ใช้งาน/ต้องการเพิ่มเติม</label>
                    <textarea
                      rows="3"
                      className="form-control-textarea"
                      placeholder="เช่น คีย์บอร์ด Ergonomic, โปรแกรม NVDA Screen Reader, ห้องสอบพิเศษ, ทางลาด, ขยายแบบฟอร์ม"
                      value={formData.assistiveNeeds}
                      onChange={(e) => handleChange('assistiveNeeds', e.target.value)}
                    />
                    <small className="field-hint">ข้อมูลนี้จะเชื่อมโยงกับฝ่ายบริการการศึกษาและศูนย์ DSS มทส. เพื่อเตรียมความพร้อมอุปกรณ์</small>
                  </div>

                  <div className="form-field-group full-width">
                    <label className="field-label">เจ้าหน้าที่ / พี่เลี้ยง DSS ผู้รับผิดชอบดูแล</label>
                    <input
                      type="text"
                      className="form-control-input"
                      placeholder="เช่น คุณพรชิดา สนิทเชื้อ (ศูนย์บริการนักศึกษาพิการ DSS มทส.)"
                      value={formData.dssMentor}
                      onChange={(e) => handleChange('dssMentor', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: เป้าหมายการดูแล & ความเชี่ยวชาญ (Staff) หรือ เป้าหมาย ICP & ผลงาน (Student) */}
          {activeTab === 'career' && (
            <div className="tab-pane-content">
              <div className="section-intro">
                <h3 className="section-title">
                  {isStaff ? 'เป้าหมายการส่งเสริมอาชีพนักศึกษาและความเชี่ยวชาญ' : 'เป้าหมายอาชีพ ICP และข้อมูลผลงาน'}
                </h3>
                <p className="section-subtitle">
                  {isStaff
                    ? 'กำหนดวิสัยทัศน์ในการพัฒนาศักยภาพนักศึกษา DSS ความเชี่ยวชาญ และช่องทางเผยแพร่งาน/ข้อมูลศูนย์'
                    : 'กำหนดอาชีพที่สนใจ ทักษะเด่น และลิงก์ผลงาน Portfolio สำหรับประเมินความพร้อมและสมัครงาน'}
                </p>
              </div>

              {isStaff ? (
                /* Staff Career / Guidance View */
                <div className="form-grid-2">
                  <div className="form-field-group full-width">
                    <label className="field-label">
                      เป้าหมายและทิศทางการส่งเสริมอาชีพนักศึกษา (Mentoring Goal) <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control-input"
                      placeholder="เช่น ส่งเสริมการมีงานทำและสหกิจศึกษาของนักศึกษา DSS ให้ตรงตามศักยภาพ 100%"
                      value={formData.targetCareer}
                      onChange={(e) => handleChange('targetCareer', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group full-width">
                    <label className="field-label">ความเชี่ยวชาญและทักษะการให้คำปรึกษา (Mentoring Expertise & Skills)</label>
                    <input
                      type="text"
                      className="form-control-input"
                      placeholder="เช่น Individualized Career Planning (ICP), การจัดทำ Job Coaching, เทคโนโลยีสิ่งอำนวยความสะดวก, การประสานงานสถานประกอบการ"
                      value={formData.coreSkills}
                      onChange={(e) => handleChange('coreSkills', e.target.value)}
                    />
                  </div>

                  <div className="form-field-group full-width">
                    <label className="field-label">ลิงก์เว็บไซต์หน่วยงาน / เอกสารเผยแพร่ / ข้อมูลศูนย์ DSS</label>
                    <input
                      type="url"
                      className="form-control-input"
                      placeholder="เช่น https://dss.sut.ac.th"
                      value={formData.portfolioUrl}
                      onChange={(e) => handleChange('portfolioUrl', e.target.value)}
                    />
                  </div>

                  <div className="form-field-group full-width">
                    <label className="field-label">วิสัยทัศน์และข้อความส่งถึงนักศึกษา (Counselor Statement / Bio)</label>
                    <textarea
                      rows="3"
                      className="form-control-textarea"
                      placeholder="มุ่งมั่นส่งเสริมศักยภาพและเปิดโอกาสให้นักศึกษาทุกคนเข้าถึงเส้นทางอาชีพที่ใฝ่ฝันอย่างเท่าเทียมและมีศักดิ์ศรี"
                      value={formData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                /* Student Career View */
                <div className="form-grid-2">
                  <div className="form-field-group full-width">
                    <label className="field-label">อาชีพเป้าหมายหลัก (Target Career) <span className="req-star">*</span></label>
                    <input
                      type="text"
                      className="form-control-input"
                      placeholder="เช่น โปรแกรมเมอร์ (Full-Stack Web Developer)"
                      value={formData.targetCareer}
                      onChange={(e) => handleChange('targetCareer', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group full-width">
                    <label className="field-label">ทักษะ ความถนัด และเครื่องมือที่เชี่ยวชาญ (Core Skills)</label>
                    <input
                      type="text"
                      className="form-control-input"
                      placeholder="เช่น React, Node.js, Python, Figma, PostgreSQL, Git, WCAG 2.1"
                      value={formData.coreSkills}
                      onChange={(e) => handleChange('coreSkills', e.target.value)}
                    />
                  </div>

                  <div className="form-field-group full-width">
                    <label className="field-label">ลิงก์ Portfolio / ผลงาน / GitHub / LinkedIn</label>
                    <input
                      type="url"
                      className="form-control-input"
                      placeholder="เช่น https://github.com/thanakorn-sut หรือ https://myportfolio.com"
                      value={formData.portfolioUrl}
                      onChange={(e) => handleChange('portfolioUrl', e.target.value)}
                    />
                  </div>

                  <div className="form-field-group full-width">
                    <label className="field-label">ข้อความแนะนำตนเอง & วิสัยทัศน์ในอาชีพ (Bio / Statement)</label>
                    <textarea
                      rows="3"
                      className="form-control-textarea"
                      placeholder="แนะนำตัวสั้นๆ ความมุ่งมั่น และเป้าหมายในการพัฒนาตนเองสู่ตลาดแรงงาน"
                      value={formData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ความปลอดภัย & รหัสผ่าน */}
          {activeTab === 'security' && (
            <div className="tab-pane-content">
              <div className="section-intro">
                <h3 className="section-title">ความปลอดภัยและรหัสผ่านเข้าใช้งาน</h3>
                <p className="section-subtitle">เปลี่ยนรหัสผ่านเพื่อความปลอดภัยในการเข้าถึงข้อมูลส่วนตัวและแผนพัฒนาอาชีพ</p>
              </div>

              <div className="form-grid-2">
                <div className="form-field-group full-width">
                  <label className="field-label">รหัสผ่านปัจจุบัน</label>
                  <div className="password-input-wrap">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control-input"
                      placeholder="ระบุรหัสผ่านเดิมหากต้องการเปลี่ยนรหัสผ่านใหม่"
                      value={formData.currentPassword}
                      onChange={(e) => handleChange('currentPassword', e.target.value)}
                    />
                    <button
                      type="button"
                      className="pwd-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'ซ่อน' : 'แสดง'}
                    </button>
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="field-label">รหัสผ่านใหม่</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control-input"
                    placeholder="อย่างน้อย 6 ตัวอักษร"
                    value={formData.newPassword}
                    onChange={(e) => handleChange('newPassword', e.target.value)}
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">ยืนยันรหัสผ่านใหม่</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control-input"
                    placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Action Footer */}
          <div className="profile-form-footer">
            <div className="footer-left-links">
              {!isStaff && (
                <button
                  type="button"
                  className="link-secondary-btn"
                  onClick={onNavigateToCareerGoal}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <span>ไปที่กำหนดอาชีพเป้าหมาย</span>
                </button>
              )}

              <button
                type="button"
                className="link-secondary-btn"
                onClick={onNavigateToDashboard}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>{isStaff ? 'ดู Dashboard ความก้าวหน้ากลุ่ม' : 'ดู Dashboard การวิเคราะห์'}</span>
              </button>
            </div>

            <div className="footer-right-buttons">
              <button
                type="button"
                className="btn-profile-reset"
                onClick={handleReset}
              >
                คืนค่าเดิม
              </button>
              <button
                type="submit"
                className="btn-profile-save"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
  )
}
