import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AuthModal from './components/AuthModal'

// User Pages
import HomePage from './pages/user/HomePage'
import UserProfilePage from './pages/user/UserProfilePage'
import DashboardPage from './pages/user/DashboardPage'
import CareerGoalPage from './pages/user/CareerGoalPage'
import SelfAssessmentPage from './pages/user/SelfAssessmentPage'
import SkillsDefinitionPage from './pages/user/SkillsDefinitionPage'
import SelfDevelopmentPage from './pages/user/SelfDevelopmentPage'

// Super User / Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import GroupManagementPage from './pages/admin/GroupManagementPage'
import UserManagementPage from './pages/admin/UserManagementPage'
import FacultyManagementPage from './pages/admin/FacultyManagementPage'
import ConstantsManagementPage from './pages/admin/ConstantsManagementPage'
import CareerSkillsManagementPage from './pages/admin/CareerSkillsManagementPage'
import RegisterSettingsPage from './pages/admin/RegisterSettingsPage'
import SystemLogsPage from './pages/admin/SystemLogsPage'
import AuthorizationPage from './pages/admin/AuthorizationPage'

import './App.css'

function App() {
  // Current user state (เริ่มต้นที่ null เพื่อให้เริ่มที่หน้า Login)
  const [currentUser, setCurrentUser] = useState(null)

  // Navigation & layout state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeMenu, setActiveMenu] = useState('home')
  const [activeSubMenu, setActiveSubMenu] = useState('register-mgmt')
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false)

  // Auth modal state (เปิดหน้าต่าง Login ทันทีเมื่อเริ่มต้นแอพ)
  const [showAuthModal, setShowAuthModal] = useState(true)
  const [authMode, setAuthMode] = useState('login')

  // Available Users Pool (นักศึกษามหาวิทยาลัยเทคโนโลยีสุรนารี)
  const [allAvailableUsers, setAllAvailableUsers] = useState([
    {
      id: 101,
      name: 'นายธนกร รัตนผล',
      email: 'b6501234@g.sut.ac.th',
      studentId: 'B6501234',
      faculty: 'สำนักวิชาเทคโนโลยีสารสนเทศ',
      major: 'วิทยาการคอมพิวเตอร์',
      institute: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      role: 'user',
    },
    {
      id: 102,
      name: 'น.ส.สุดารัตน์ พุ่มพวง',
      email: 'b6505678@g.sut.ac.th',
      studentId: 'B6505678',
      faculty: 'สำนักวิชาเทคโนโลยีสารสนเทศ',
      major: 'เทคโนโลยีสารสนเทศ',
      institute: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      role: 'user',
    },
    {
      id: 103,
      name: 'นายกิตติคุณ ศรีวิชัย',
      email: 'b6509812@g.sut.ac.th',
      studentId: 'B6509812',
      faculty: 'สำนักวิชาเทคโนโลยีสังคม',
      major: 'การจัดการเทคโนโลยีและนวัตกรรม',
      institute: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      role: 'user',
    },
    {
      id: 104,
      name: 'น.ส.จิราพร วงศ์สวัสดิ์',
      email: 'b6503421@g.sut.ac.th',
      studentId: 'B6503421',
      faculty: 'สำนักวิชาวิศวกรรมศาสตร์',
      major: 'วิศวกรรมคอมพิวเตอร์',
      institute: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      role: 'user',
    },
    {
      id: 105,
      name: 'นายอัครเดช รุ่งเรือง',
      email: 'b6608910@g.sut.ac.th',
      studentId: 'B6608910',
      faculty: 'สำนักวิชาเทคโนโลยีสังคม',
      major: 'การตลาดดิจิทัลและอีคอมเมิร์ซ',
      institute: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      role: 'user',
    },
  ])

  // Groups managed by Super User (ตัวอย่าง: กลุ่ม DSS มหาวิทยาลัยเทคโนโลยีสุรนารี)
  const [groupsList, setGroupsList] = useState([
    {
      id: 1,
      name: 'กลุ่ม DSS มหาวิทยาลัยเทคโนโลยีสุรนารี (ศูนย์บริการนักศึกษาพิการ SUT)',
      description: 'ศูนย์บริการนักศึกษาพิการ (DSS) มทส. ติดตามความก้าวหน้า ทักษะอาชีพ และการเตรียมความพร้อมสหกิจศึกษา',
      faculty: 'ศูนย์บริการนักศึกษาพิการ (DSS) มทส.',
      institute: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      targetCareer: 'โปรแกรมเมอร์ / นักพัฒนาซอฟต์แวร์',
      createdAt: '10 ม.ค. 2568',
      members: [
        {
          id: 101,
          name: 'นายธนกร รัตนผล',
          studentId: 'B6501234',
          email: 'b6501234@g.sut.ac.th',
          major: 'วิทยาการคอมพิวเตอร์ (มทส.)',
          careerGoal: 'โปรแกรมเมอร์ (Full-Stack)',
          progressPct: 85,
          completedPlans: 4,
          totalPlans: 5,
          status: 'พัฒนาได้ดีมาก',
          mentorNote: 'ผ่านเกณฑ์ประเมิน React & SQL และโครงงานสหกิจศึกษา มทส. แนะนำให้ส่งใบสมัครเข้าร่วมงานกับสถานประกอบการเครือข่าย DSS',
          advicePlan: 'เตรียม Portfolio และเรซูเม่ฉบับสมบูรณ์',
          lastEvaluated: 'สิงหาคม 2568 (โดย Super User DSS)',
          monthlyProgress: [
            {
              monthKey: '01',
              monthName: 'มกราคม 2568',
              shortMonth: 'ม.ค.',
              topic: 'ปูพื้นฐาน & ตรรกะโปรแกรมมิ่ง',
              score: 35,
              passedSkills: '1 ทักษะ',
              hours: '12 ชม.',
              status: 'กำลังพัฒนาได้ดี',
              criteria: ['ทดสอบตรรกะและอัลกอริทึมพื้นฐาน', 'การติดตั้งเครื่องมือพัฒนาโปรแกรม', 'การประเมินความต้องการอุปกรณ์ช่วยเหลือ DSS'],
              note: 'เริ่มปรับพื้นฐานการเขียนโปรแกรม Python และอัลกอริทึม เข้าใจ Flowchart และ Logic การทำงานได้ดี',
              plan: 'ฝึกทำโจทย์ Condition & Loop เพิ่มเติม',
            },
            {
              monthKey: '02',
              monthName: 'กุมภาพันธ์ 2568',
              shortMonth: 'ก.พ.',
              topic: 'โครงสร้างข้อมูล & Git Version Control',
              score: 48,
              passedSkills: '2 ทักษะ',
              hours: '16 ชม.',
              status: 'กำลังพัฒนาได้ดี',
              criteria: ['การใช้งาน Git & GitHub (Commit, Branch, PR)', 'การจัดการ Data Structures (Array, List, Map)', 'การทำงานร่วมกันผ่านระบบ Version Control'],
              note: 'ศึกษา Data Structures และ Git Version Control ได้คล่องแคล่ว ส่งงานผ่าน GitHub สม่ำเสมอ',
              plan: 'เริ่มเรียนรู้โครงสร้างหน้าเว็บ HTML5/CSS3',
            },
            {
              monthKey: '03',
              monthName: 'มีนาคม 2568',
              shortMonth: 'มี.ค.',
              topic: 'พื้นฐานเว็บ & JavaScript ES6+',
              score: 56,
              passedSkills: '3 ทักษะ',
              hours: '20 ชม.',
              status: 'กำลังพัฒนาได้ดี',
              criteria: ['การเขียน Modern JavaScript (ES6+, Arrow Function, Async/Await)', 'การจัด Layout Responsive ด้วย Flexbox/Grid', 'การจัดการ DOM Manipulation'],
              note: 'เรียนรู้ HTML5, CSS3, JavaScript ES6 และ DOM Manipulation สร้าง Interactive Form ได้ถูกต้อง',
              plan: 'เริ่มศึกษา React และ Component-based Architecture',
            },
            {
              monthKey: '04',
              monthName: 'เมษายน 2568',
              shortMonth: 'เม.ย.',
              topic: 'React Web Framework & Hooks',
              score: 65,
              passedSkills: '4 ทักษะ',
              hours: '18 ชม.',
              status: 'กำลังพัฒนาได้ดี',
              criteria: ['การสร้าง Reusable React Components', 'การใช้ React Hooks (useState, useEffect, useMemo)', 'การเชื่อมต่อ REST API และจัดการสถานะข้อมูล'],
              note: 'สร้าง Component และใช้งาน Hooks บน React ได้ถูกต้อง สามารถเชื่อมต่อ Mock API ได้อย่างราบรื่น',
              plan: 'ศึกษาการออกแบบฐานข้อมูล PostgreSQL และระบบความปลอดภัย',
            },
            {
              monthKey: '05',
              monthName: 'พฤษภาคม 2568',
              shortMonth: 'พ.ค.',
              topic: 'ฐานข้อมูล & มาตรฐานการเข้าถึง (WCAG)',
              score: 72,
              passedSkills: '5 ทักษะ',
              hours: '24 ชม.',
              status: 'กำลังพัฒนาได้ดี',
              criteria: ['การออกแบบและ Query ฐานข้อมูล PostgreSQL', 'การพัฒนาเว็บตามมาตรฐาน WCAG 2.1 (Accessibility)', 'การทำระบบ CRUD เชื่อมต่อ Backend'],
              note: 'ทำระบบ CRUD และต่อเชื่อมฐานข้อมูล PostgreSQL ได้อย่างราบรื่น ออกแบบ UI รองรับ Screen Reader ได้ตามเกณฑ์',
              plan: 'รวมชิ้นงานทำ Mini Project Full-Stack สำหรับสหกิจศึกษา',
            },
            {
              monthKey: '06',
              monthName: 'มิถุนายน 2568',
              shortMonth: 'มิ.ย.',
              topic: 'Full-Stack Mini Project & Unit Test',
              score: 78,
              passedSkills: '6 ทักษะ',
              hours: '25 ชม.',
              status: 'กำลังพัฒนาได้ดี',
              criteria: ['การพัฒนา Full-Stack Application ฉบับสมบูรณ์', 'การเขียน Unit Test & Integration Test', 'การ Deploy Application ขึ้น Cloud (Vercel/Render)'],
              note: 'ทำ Mini Project Full-Stack Web App สำเร็จตามกำหนด เขียน Unit Test ผ่านเกณฑ์ 80%',
              plan: 'จัดทำ Portfolio และเตรียมตัวสอบวัดระดับทักษะวิชาชีพ',
            },
            {
              monthKey: '07',
              monthName: 'กรกฎาคม 2568',
              shortMonth: 'ก.ค.',
              topic: 'ทดสอบทักษะวิชาชีพ & แฟ้มผลงาน Portfolio',
              score: 82,
              passedSkills: '7 ทักษะ',
              hours: '28 ชม.',
              status: 'พัฒนาได้ดีมาก',
              criteria: ['สอบผ่านเกณฑ์มาตรฐานฝีมือแรงงานด้านซอฟต์แวร์', 'จัดทำ Live Portfolio & Github Showcases', 'จัดทำเรซูเม่ฉบับสองภาษา (ไทย-อังกฤษ)'],
              note: 'ผ่านการทดสอบทักษะ Frontend & Backend ได้คะแนนสูงมาก Portfolio มีชิ้นงานจริงครบถ้วน',
              plan: 'เตรียมตัวซ้อมสัมภาษณ์งาน Mock Interview',
            },
            {
              monthKey: '08',
              monthName: 'สิงหาคม 2568',
              shortMonth: 'ส.ค.',
              topic: 'เตรียมความพร้อมสหกิจ & ซ้อมสัมภาษณ์งาน',
              score: 85,
              passedSkills: '8 ทักษะ',
              hours: '30 ชม.',
              status: 'พัฒนาได้ดีมาก',
              criteria: ['การซ้อมสัมภาษณ์งานจำลอง (Mock Interview กับสถานประกอบการ)', 'การเตรียมความพร้อมด้าน Soft Skills และวัฒนธรรมองค์กร', 'การจับคู่สถานประกอบการโครงการสหกิจศึกษา มทส.'],
              note: 'ผ่านเกณฑ์ประเมิน React & SQL และโครงงานสหกิจศึกษา มทส. มีความมั่นใจและพร้อมเริ่มงาน',
              plan: 'ส่งเอกสารเข้าร่วมสหกิจศึกษาในสถานประกอบการจริง',
            },
            {
              monthKey: '09',
              monthName: 'กันยายน 2568',
              shortMonth: 'ก.ย.',
              topic: 'เริ่มปฏิบัติงานสหกิจศึกษา & ติดตามการปรับตัว',
              score: 0,
              passedSkills: '-',
              hours: '-',
              status: 'ยังไม่ถึงรอบประเมิน',
              criteria: ['การปรับตัวเข้ากับทีมงานและกระบวนการทำงานจริง', 'การใช้เครื่องมือสื่อสารและการประสานงานในองค์กร', 'การรายงานผลการปฏิบัติงานสัปดาห์แรกต่อศูนย์ DSS'],
              note: 'รอรอบประเมินประจำเดือนกันยายน 2568 (ช่วงเริ่มปฏิบัติงานสหกิจศึกษา)',
              plan: 'บันทึก Daily Log การทำงานและปรึกษาพี่เลี้ยง DSS ประจำสัปดาห์',
            },
            {
              monthKey: '10',
              monthName: 'ตุลาคม 2568',
              shortMonth: 'ต.ค.',
              topic: 'ประเมินผลกลางเทอม (Midterm Assessment)',
              score: 0,
              passedSkills: '-',
              hours: '-',
              status: 'ยังไม่ถึงรอบประเมิน',
              criteria: ['การประเมินผลงานจากหัวหน้างานสถานประกอบการ', 'การแก้ไขปัญหาทางเทคนิคและข้อติดขัดหน้างาน', 'ความก้าวหน้าของโครงงานสหกิจศึกษา 50%'],
              note: 'รอรอบประเมินประจำเดือนตุลาคม 2568 (รอบประเมินกลางเทอม)',
              plan: 'เตรียมสรุปผลงานกลางเทอมร่วมกับอาจารย์นิเทศก์ มทส.',
            },
            {
              monthKey: '11',
              monthName: 'พฤศจิกายน 2568',
              shortMonth: 'พ.ย.',
              topic: 'นำเสนอโครงงานสหกิจ & สรุปผลงานจริง',
              score: 0,
              passedSkills: '-',
              hours: '-',
              status: 'ยังไม่ถึงรอบประเมิน',
              criteria: ['ความสมบูรณ์ของโครงงานสหกิจศึกษา 100%', 'การจัดทำรายงานสรุปผลการปฏิบัติงาน', 'การนำเสนอโครงงานต่อคณะกรรมการสถานประกอบการและ มทส.'],
              note: 'รอรอบประเมินประจำเดือนพฤศจิกายน 2568 (รอบส่งมอบโครงงาน)',
              plan: 'เตรียมเอกสารส่งมอบงานและใบรับรองการผ่านงาน',
            },
            {
              monthKey: '12',
              monthName: 'ธันวาคม 2568',
              shortMonth: 'ธ.ค.',
              topic: 'สรุปผลสัมฤทธิ์ ICP & บรรจุเข้าทำงาน',
              score: 0,
              passedSkills: '-',
              hours: '-',
              status: 'ยังไม่ถึงรอบประเมิน',
              criteria: ['การประเมินสรุปผลสัมฤทธิ์ตามแผนพัฒนารายบุคคล (ICP)', 'การเซ็นสัญญาจ้างงาน / บรรจุเข้าทำงานประจำ', 'การส่งต่อเข้าสู่เครือข่ายศิษย์เก่าคนพิการ มทส.'],
              note: 'รอรอบประเมินสรุปผลสิ้นปี 2568 (Final Career Placement)',
              plan: 'สรุปรายงานผลสำเร็จการพัฒนาอาชีพรายบุคคล',
            },
          ],
        },
        {
          id: 102,
          name: 'น.ส.สุดารัตน์ พุ่มพวง',
          studentId: 'B6505678',
          email: 'b6505678@g.sut.ac.th',
          major: 'เทคโนโลยีสารสนเทศ (มทส.)',
          careerGoal: 'Frontend Developer & UI/UX',
          progressPct: 72,
          completedPlans: 3,
          totalPlans: 5,
          status: 'กำลังพัฒนาได้ดี',
          mentorNote: 'ฝึกฝน Figma และ Responsive Web ควบคู่กับโปรแกรมสนับสนุนการเข้าถึงได้ดีเยี่ยม กำลังเรียนคอร์ส JavaScript ขั้นสูง',
          advicePlan: 'ทำ Mini Project ออกแบบเว็บไซต์ที่เข้าถึงได้ตามมาตรฐาน WCAG',
          lastEvaluated: 'สิงหาคม 2568',
          monthlyProgress: [
            { monthKey: '01', monthName: 'มกราคม 2568', shortMonth: 'ม.ค.', score: 28, passedSkills: '1 ทักษะ', hours: '10 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'เรียนรู้พื้นฐานการออกแบบและเครื่องมือ Figma', plan: 'ศึกษา Design System' },
            { monthKey: '02', monthName: 'กุมภาพันธ์ 2568', shortMonth: 'ก.พ.', score: 38, passedSkills: '2 ทักษะ', hours: '14 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'ฝึกทำ Wireframe และ UI Prototype ด้วย Figma', plan: 'เริ่มเรียน HTML/CSS' },
            { monthKey: '03', monthName: 'มีนาคม 2568', shortMonth: 'มี.ค.', score: 48, passedSkills: '2 ทักษะ', hours: '18 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'แปลงงานดีไซน์มาเป็นเว็บด้วย CSS Flexbox และ Grid', plan: 'ฝึกทำ Responsive Layout' },
            { monthKey: '04', monthName: 'เมษายน 2568', shortMonth: 'เม.ย.', score: 55, passedSkills: '3 ทักษะ', hours: '16 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'เรียนรู้ JavaScript และการจัดการ Event ต่างๆ', plan: 'ศึกษาการพัฒนาเว็บคนพิการ' },
            { monthKey: '05', monthName: 'พฤษภาคม 2568', shortMonth: 'พ.ค.', score: 62, passedSkills: '4 ทักษะ', hours: '20 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'ออกแบบตามมาตรฐาน WCAG สำหรับผู้มีความบกพร่องทางการมองเห็น', plan: 'ทำ Workshop ร่วมกับทีม DSS' },
            { monthKey: '06', monthName: 'มิถุนายน 2568', shortMonth: 'มิ.ย.', score: 68, passedSkills: '5 ทักษะ', hours: '22 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'เริ่มเขียน React สำหรับ UI Component และ Tailwind CSS', plan: 'ทำเว็บไซต์ Portfolio' },
            { monthKey: '07', monthName: 'กรกฎาคม 2568', shortMonth: 'ก.ค.', score: 70, passedSkills: '5 ทักษะ', hours: '24 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'พัฒนาเว็บต้นแบบระบบจองคิว DSS มทส. สำเร็จ', plan: 'ทดสอบ Usability กับผู้ใช้จริง' },
            { monthKey: '08', monthName: 'สิงหาคม 2568', shortMonth: 'ส.ค.', score: 72, passedSkills: '6 ทักษะ', hours: '25 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'ฝึกฝน Figma และ Responsive Web ควบคู่กับโปรแกรมสนับสนุนการเข้าถึงได้ดีเยี่ยม', plan: 'ทำ Mini Project ออกแบบตามมาตรฐาน WCAG' },
            { monthKey: '09', monthName: 'กันยายน 2568', shortMonth: 'ก.ย.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินประจำเดือนกันยายน 2568', plan: 'เตรียมผลงานประกวดนวัตกรรม' },
            { monthKey: '10', monthName: 'ตุลาคม 2568', shortMonth: 'ต.ค.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินประจำเดือนตุลาคม 2568', plan: 'เตรียมตัวสมัครงานสหกิจ' },
            { monthKey: '11', monthName: 'พฤศจิกายน 2568', shortMonth: 'พ.ย.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินประจำเดือนพฤศจิกายน 2568', plan: 'สัมภาษณ์งานกับบริษัทคู่สัญญา' },
            { monthKey: '12', monthName: 'ธันวาคม 2568', shortMonth: 'ธ.ค.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินสรุปผลสิ้นปี 2568', plan: 'สรุปผลสัมฤทธิ์ประจำปี' },
          ],
        },
        {
          id: 104,
          name: 'น.ส.จิราพร วงศ์สวัสดิ์',
          studentId: 'B6503421',
          email: 'b6503421@g.sut.ac.th',
          major: 'วิศวกรรมคอมพิวเตอร์ (มทส.)',
          careerGoal: 'Cloud & Database Engineer',
          progressPct: 60,
          completedPlans: 2,
          totalPlans: 4,
          status: 'ต้องการคำแนะนำเพิ่มเติม',
          mentorNote: 'ได้รับการสนับสนุนอุปกรณ์ช่วยเหลือจากศูนย์ DSS แล้ว กำลังฝึกปฏิบัติการจัดการฐานข้อมูล PostgreSQL และ Docker',
          advicePlan: 'นัดหมายพบอาจารย์ที่ปรึกษา DSS รายสัปดาห์เพื่อติดตามผล',
          lastEvaluated: 'สิงหาคม 2568',
          monthlyProgress: [
            { monthKey: '01', monthName: 'มกราคม 2568', shortMonth: 'ม.ค.', score: 20, passedSkills: '1 ทักษะ', hours: '8 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'เริ่มเรียนรู้ระบบปฏิบัติการ Linux และ Shell Script', plan: 'ฝึกคำสั่ง Command Line พื้นฐาน' },
            { monthKey: '02', monthName: 'กุมภาพันธ์ 2568', shortMonth: 'ก.พ.', score: 30, passedSkills: '1 ทักษะ', hours: '12 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'ติดตั้งและตั้งค่า Ubuntu Server จำลองบน VM', plan: 'ศึกษาเรื่อง Network และ Port' },
            { monthKey: '03', monthName: 'มีนาคม 2568', shortMonth: 'มี.ค.', score: 40, passedSkills: '2 ทักษะ', hours: '15 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'ศึกษาการออกแบบฐานข้อมูลเชิงสัมพันธ์และ SQL DDL/DML', plan: 'ทำแบบฝึกหัดคำสั่ง SQL' },
            { monthKey: '04', monthName: 'เมษายน 2568', shortMonth: 'เม.ย.', score: 45, passedSkills: '2 ทักษะ', hours: '14 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'เชื่อมต่อฐานข้อมูล MySQL และเขียน Store Procedure พื้นฐาน', plan: 'เริ่มศึกษา Docker Container' },
            { monthKey: '05', monthName: 'พฤษภาคม 2568', shortMonth: 'พ.ค.', score: 50, passedSkills: '3 ทักษะ', hours: '16 ชม.', status: 'ต้องการคำแนะนำเพิ่มเติม', note: 'เริ่มเรียน Dockerfile และ Docker Compose แต่ยังติดขัดเรื่อง Network Bridge', plan: 'ขอคำปรึกษาเพิ่มเติมกับพี่เลี้ยง' },
            { monthKey: '06', monthName: 'มิถุนายน 2568', shortMonth: 'มิ.ย.', score: 55, passedSkills: '3 ทักษะ', hours: '18 ชม.', status: 'ต้องการคำแนะนำเพิ่มเติม', note: 'แก้ไขปัญหา Container ได้แล้ว และเริ่มต่อ AWS Cloud เบื้องต้น', plan: 'ทำ Lab บน AWS Free Tier' },
            { monthKey: '07', monthName: 'กรกฎาคม 2568', shortMonth: 'ก.ค.', score: 58, passedSkills: '4 ทักษะ', hours: '20 ชม.', status: 'ต้องการคำแนะนำเพิ่มเติม', note: 'กำลังฝึกหัดการ Deploy Application ขึ้น Cloud', plan: 'ฝึกทำ Backup Database อัตโนมัติ' },
            { monthKey: '08', monthName: 'สิงหาคม 2568', shortMonth: 'ส.ค.', score: 60, passedSkills: '4 ทักษะ', hours: '22 ชม.', status: 'ต้องการคำแนะนำเพิ่มเติม', note: 'ได้รับการสนับสนุนอุปกรณ์ช่วยเหลือจากศูนย์ DSS แล้ว กำลังฝึก PostgreSQL และ Docker', plan: 'นัดหมายพบอาจารย์ที่ปรึกษา DSS รายสัปดาห์' },
            { monthKey: '09', monthName: 'กันยายน 2568', shortMonth: 'ก.ย.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินประจำเดือนกันยายน 2568', plan: 'ฝึกทำระบบ Monitoring ด้วย Grafana' },
            { monthKey: '10', monthName: 'ตุลาคม 2568', shortMonth: 'ต.ค.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินประจำเดือนตุลาคม 2568', plan: 'สอบใบรับรอง Cloud Practitioner' },
            { monthKey: '11', monthName: 'พฤศจิกายน 2568', shortMonth: 'พ.ย.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินประจำเดือนพฤศจิกายน 2568', plan: 'เตรียมตัวสัมภาษณ์งาน' },
            { monthKey: '12', monthName: 'ธันวาคม 2568', shortMonth: 'ธ.ค.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินสรุปผลสิ้นปี 2568', plan: 'สรุปความพร้อมการเข้าทำงาน' },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'กลุ่ม DSS - ด้านเทคโนโลยีสารสนเทศและดิจิทัล (SUT)',
      description: 'กลุ่มติดตามทักษะ Data Analytics, AI และการจัดการข้อมูลสำหรับนักศึกษา DSS สำนักวิชาเทคโนโลยีสารสนเทศ มทส.',
      faculty: 'สำนักวิชาเทคโนโลยีสารสนเทศ (มทส.)',
      institute: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      targetCareer: 'นักวิเคราะห์ข้อมูล (Data Analyst)',
      createdAt: '15 ม.ค. 2568',
      members: [
        {
          id: 103,
          name: 'นายกิตติคุณ ศรีวิชัย',
          studentId: 'B6509812',
          email: 'b6509812@g.sut.ac.th',
          major: 'การจัดการเทคโนโลยี (มทส.)',
          careerGoal: 'นักวิเคราะห์ข้อมูลธุรกิจ',
          progressPct: 78,
          completedPlans: 3,
          totalPlans: 4,
          status: 'กำลังพัฒนาได้ดี',
          mentorNote: 'ทำ Dashboard สรุปข้อมูลยอดขายและสินค้าด้วย Power BI ได้อย่างคล่องแคล่ว',
          advicePlan: 'ฝึกโจทย์การเขียน SQL Query ขั้นสูง',
          lastEvaluated: 'สิงหาคม 2568',
          monthlyProgress: [
            { monthKey: '01', monthName: 'มกราคม 2568', shortMonth: 'ม.ค.', score: 32, passedSkills: '1 ทักษะ', hours: '12 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'เรียนรู้ Excel ขั้นสูงและการใช้ Pivot Table & VLOOKUP', plan: 'ฝึกทำแบบจำลองข้อมูล' },
            { monthKey: '02', monthName: 'กุมภาพันธ์ 2568', shortMonth: 'ก.พ.', score: 45, passedSkills: '2 ทักษะ', hours: '16 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'เริ่มศึกษาภาษา SQL เบื้องต้น SELECT, WHERE, GROUP BY', plan: 'ฝึกการเชื่อมโยงหลายตาราง JOIN' },
            { monthKey: '03', monthName: 'มีนาคม 2568', shortMonth: 'มี.ค.', score: 54, passedSkills: '3 ทักษะ', hours: '18 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'เขียนคำสั่ง SQL Query ซับซ้อนและจัดรูปแบบชุดข้อมูลได้ดี', plan: 'เริ่มศึกษา Power BI' },
            { monthKey: '04', monthName: 'เมษายน 2568', shortMonth: 'เม.ย.', score: 62, passedSkills: '3 ทักษะ', hours: '20 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'สร้าง Interactive Dashboard ด้วย Power BI ชิ้นแรกได้สำเร็จ', plan: 'ศึกษาการเขียนฟังก์ชัน DAX' },
            { monthKey: '05', monthName: 'พฤษภาคม 2568', shortMonth: 'พ.ค.', score: 68, passedSkills: '4 ทักษะ', hours: '22 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'ใช้ฟังก์ชัน DAX สร้าง KPI และคำนวณสถิติทางธุรกิจได้ถูกต้อง', plan: 'ทำโปรเจกต์วิเคราะห์ยอดขายจริง' },
            { monthKey: '06', monthName: 'มิถุนายน 2568', shortMonth: 'มิ.ย.', score: 74, passedSkills: '5 ทักษะ', hours: '24 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'นำเสนอผลการวิเคราะห์ข้อมูลต่อที่ประชุม DSS มทส. ได้อย่างน่าประทับใจ', plan: 'ศึกษา Python for Data Analysis' },
            { monthKey: '07', monthName: 'กรกฎาคม 2568', shortMonth: 'ก.ค.', score: 76, passedSkills: '5 ทักษะ', hours: '25 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'เขียน Pandas และ NumPy จัดการข้อมูลขนาดใหญ่', plan: 'ฝึกเขียน Data Visualization ด้วย Seaborn' },
            { monthKey: '08', monthName: 'สิงหาคม 2568', shortMonth: 'ส.ค.', score: 78, passedSkills: '6 ทักษะ', hours: '26 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'ทำ Dashboard สรุปข้อมูลยอดขายและสินค้าด้วย Power BI ได้อย่างคล่องแคล่ว', plan: 'ฝึกโจทย์การเขียน SQL Query ขั้นสูง' },
            { monthKey: '09', monthName: 'กันยายน 2568', shortMonth: 'ก.ย.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินประจำเดือนกันยายน 2568', plan: 'เตรียมทดสอบข้อสอบ Data Analyst' },
            { monthKey: '10', monthName: 'ตุลาคม 2568', shortMonth: 'ต.ค.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินประจำเดือนตุลาคม 2568', plan: 'จัดทำ Data Portfolio' },
            { monthKey: '11', monthName: 'พฤศจิกายน 2568', shortMonth: 'พ.ย.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินประจำเดือนพฤศจิกายน 2568', plan: 'สมัครงานในตำแหน่ง Junior Data Analyst' },
            { monthKey: '12', monthName: 'ธันวาคม 2568', shortMonth: 'ธ.ค.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินสรุปผลสิ้นปี 2568', plan: 'สรุปการเข้าฝึกงานสหกิจ' },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'กลุ่ม DSS - ด้านการสื่อสารดิจิทัลและธุรกิจ (SUT)',
      description: 'กลุ่มพัฒนาสมรรถนะอาชีพด้านการตลาดดิจิทัลและงานสำนักงาน สำนักวิชาเทคโนโลยีสังคม มทส.',
      faculty: 'สำนักวิชาเทคโนโลยีสังคม (มทส.)',
      institute: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      targetCareer: 'นักการตลาดดิจิทัล & E-Commerce',
      createdAt: '20 ม.ค. 2568',
      members: [
        {
          id: 105,
          name: 'นายอัครเดช รุ่งเรือง',
          studentId: 'B6608910',
          email: 'b6608910@g.sut.ac.th',
          major: 'การตลาดดิจิทัล (มทส.)',
          careerGoal: 'Digital Marketing & Content Creator',
          progressPct: 65,
          completedPlans: 2,
          totalPlans: 4,
          status: 'กำลังพัฒนาได้ดี',
          mentorNote: 'มีความคิดสร้างสรรค์ในการทำกราฟิกและสื่อประชาสัมพันธ์ ได้รับการจัดหาคีย์บอร์ดและอุปกรณ์เสริมจากศูนย์ DSS',
          advicePlan: 'ฝึกยิงแอดแคมเปญทดลองบน TikTok Shop',
          lastEvaluated: 'สิงหาคม 2568',
          monthlyProgress: [
            { monthKey: '01', monthName: 'มกราคม 2568', shortMonth: 'ม.ค.', score: 20, passedSkills: '1 ทักษะ', hours: '8 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'ศึกษาทฤษฎีการตลาดออนไลน์และพฤติกรรมผู้บริโภคยุคดิจิทัล', plan: 'ฝึกวางกลยุทธ์ Content Marketing' },
            { monthKey: '02', monthName: 'กุมภาพันธ์ 2568', shortMonth: 'ก.พ.', score: 30, passedSkills: '1 ทักษะ', hours: '10 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'ฝึกออกแบบกราฟิกสำหรับสื่อโซเชียลด้วย Canva และ Photoshop', plan: 'สร้างชิ้นงาน Infographic' },
            { monthKey: '03', monthName: 'มีนาคม 2568', shortMonth: 'มี.ค.', score: 40, passedSkills: '2 ทักษะ', hours: '14 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'เขียนบทความลงบล็อกและจัดทำ Social Media Calendar ประจำสัปดาห์', plan: 'ศึกษาการทำ Video Content สั้น' },
            { monthKey: '04', monthName: 'เมษายน 2568', shortMonth: 'เม.ย.', score: 48, passedSkills: '2 ทักษะ', hours: '16 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'ตัดต่อวิดีโอสั้นลง TikTok และ Reels ด้วย CapCut ได้อย่างน่าสนใจ', plan: 'ศึกษาเรื่องการยิงโฆษณา Facebook Ads' },
            { monthKey: '05', monthName: 'พฤษภาคม 2568', shortMonth: 'พ.ค.', score: 55, passedSkills: '3 ทักษะ', hours: '18 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'ทดลองตั้งกลุ่มเป้าหมายและงบประมาณโฆษณา Facebook และ Instagram', plan: 'วิเคราะห์ผลลัพธ์ผ่าน Meta Business Suite' },
            { monthKey: '06', monthName: 'มิถุนายน 2568', shortMonth: 'มิ.ย.', score: 60, passedSkills: '3 ทักษะ', hours: '20 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'บริหารจัดการร้านค้าบน TikTok Shop และ Shopee ได้อย่างถูกต้อง', plan: 'ฝึกการจัดทำโปรโมชันส่งเสริมการขาย' },
            { monthKey: '07', monthName: 'กรกฎาคม 2568', shortMonth: 'ก.ค.', score: 62, passedSkills: '4 ทักษะ', hours: '22 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'ได้รับอุปกรณ์ช่วยเหลือคีย์บอร์ดพิเศษจาก DSS มทส. ช่วยพิมพ์ได้เร็วขึ้น', plan: 'เพิ่มความคล่องตัวในการสร้างคอนเทนต์' },
            { monthKey: '08', monthName: 'สิงหาคม 2568', shortMonth: 'ส.ค.', score: 65, passedSkills: '4 ทักษะ', hours: '22 ชม.', status: 'กำลังพัฒนาได้ดี', note: 'มีความคิดสร้างสรรค์ในการทำกราฟิกและสื่อประชาสัมพันธ์ กำลังขยายผลการตลาดออนไลน์', plan: 'ฝึกยิงแอดแคมเปญทดลองบน TikTok Shop' },
            { monthKey: '09', monthName: 'กันยายน 2568', shortMonth: 'ก.ย.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินประจำเดือนกันยายน 2568', plan: 'จัดทำแคมเปญตลาดโปรโมตกิจกรรม DSS' },
            { monthKey: '10', monthName: 'ตุลาคม 2568', shortMonth: 'ต.ค.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินประจำเดือนตุลาคม 2568', plan: 'รวบรวม Portfolio ชิ้นงานการตลาด' },
            { monthKey: '11', monthName: 'พฤศจิกายน 2568', shortMonth: 'พ.ย.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินประจำเดือนพฤศจิกายน 2568', plan: 'เตรียมตัวสัมภาษณ์สหกิจศึกษา' },
            { monthKey: '12', monthName: 'ธันวาคม 2568', shortMonth: 'ธ.ค.', score: 0, passedSkills: '-', hours: '-', status: 'ยังไม่ถึงรอบประเมิน', note: 'รอรอบประเมินสรุปผลสิ้นปี 2568', plan: 'สรุปผลสำเร็จของแผนการพัฒนา' },
          ],
        },
      ],
    },
  ])

  // Majors list state (สถาบัน มหาวิทยาลัยเทคโนโลยีสุรนารี)
  const [majorsList, setMajorsList] = useState([
    {
      id: 1,
      major: 'วิทยาการคอมพิวเตอร์',
      faculty: 'สำนักวิชาเทคโนโลยีสารสนเทศ',
      institute: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      educationLevel: 'ปริญญาตรี',
    },
    {
      id: 2,
      major: 'เทคโนโลยีสารสนเทศ',
      faculty: 'สำนักวิชาเทคโนโลยีสารสนเทศ',
      institute: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      educationLevel: 'ปริญญาตรี',
    },
    {
      id: 3,
      major: 'วิศวกรรมคอมพิวเตอร์',
      faculty: 'สำนักวิชาวิศวกรรมศาสตร์',
      institute: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      educationLevel: 'ปริญญาตรี',
    },
    {
      id: 4,
      major: 'การจัดการเทคโนโลยีและนวัตกรรม',
      faculty: 'สำนักวิชาเทคโนโลยีสังคม',
      institute: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      educationLevel: 'ปริญญาตรี',
    },
  ])

  // Auth handlers
  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleCloseAuth = () => {
    setShowAuthModal(false)
  }

  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
    if (user.role === 'super_admin') {
      setActiveMenu('authorization')
      alert(`เข้าสู่ระบบสำเร็จในฐานะ Super Admin (ผู้ดูแลระบบสูงสุด) 🛡️: ${user.email}`)
    } else if (user.role === 'super_user') {
      setActiveMenu('group-mgmt')
      alert(`เข้าสู่ระบบสำเร็จในฐานะ Super User (ผู้ดูแลกลุ่ม DSS มทส.) 👑: ${user.email}`)
    } else {
      setActiveMenu('dashboard')
      alert(`เข้าสู่ระบบสำเร็จ: ${user.email}`)
    }
    handleCloseAuth()
  }

  const handleRegisterSuccess = (user) => {
    setCurrentUser(user)
    setActiveMenu('dashboard')
    alert(`ลงทะเบียนสำเร็จเรียบร้อย! ยินดีต้อนรับ ${user.name}`)
    handleCloseAuth()
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setActiveMenu('home')
    alert('ออกจากระบบเรียบร้อยแล้ว')
  }

  // Menu navigation handlers
  const handleMenuClick = (item) => {
    if (item.id === 'settings') {
      setIsSettingsExpanded(!isSettingsExpanded)
      setActiveMenu('settings')
    } else {
      setActiveMenu(item.id)
    }
  }

  const handleSubMenuClick = (subId) => {
    setActiveMenu('settings')
    setActiveSubMenu(subId)
  }

  // Group Management Handlers (Super User actions)
  const handleAddGroup = (newGroup) => {
    setGroupsList([newGroup, ...groupsList])
  }

  const handleUpdateGroup = (updatedGroup) => {
    setGroupsList(groupsList.map((g) => (g.id === updatedGroup.id ? updatedGroup : g)))
  }

  const handleDeleteGroup = (groupId) => {
    setGroupsList(groupsList.filter((g) => g.id !== groupId))
  }

  const handleAddMemberToGroup = (groupId, newMember) => {
    setGroupsList(
      groupsList.map((g) => {
        if (g.id === groupId) {
          return {
            ...g,
            members: [newMember, ...(g.members || [])],
          }
        }
        return g
      })
    )
  }

  const handleUpdateMemberProgress = (groupId, updatedMember) => {
    setGroupsList(
      groupsList.map((g) => {
        if (g.id === groupId) {
          return {
            ...g,
            members: g.members.map((m) => (m.id === updatedMember.id ? updatedMember : m)),
          }
        }
        return g
      })
    )
  }

  const handleRemoveMemberFromGroup = (groupId, memberId) => {
    setGroupsList(
      groupsList.map((g) => {
        if (g.id === groupId) {
          return {
            ...g,
            members: g.members.filter((m) => m.id !== memberId),
          }
        }
        return g
      })
    )
  }

  // Major handlers
  const handleAddMajor = (newMajor) => {
    setMajorsList([newMajor, ...majorsList])
  }

  const handleDeleteMajor = (id, name) => {
    if (window.confirm(`ต้องการลบสาขาวิชา "${name}" ใช่หรือไม่?`)) {
      setMajorsList(majorsList.filter((item) => item.id !== id))
    }
  }

  // Update User Profile (Self Management Handler)
  const handleUpdateUserProfile = (updatedUser) => {
    setCurrentUser(updatedUser)
    setAllAvailableUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id || u.email === updatedUser.email ? { ...u, ...updatedUser } : u))
    )
    setGroupsList((prev) =>
      prev.map((g) => ({
        ...g,
        members: g.members?.map((m) =>
          m.id === updatedUser.id || m.email === updatedUser.email
            ? { ...m, ...updatedUser, careerGoal: updatedUser.targetCareer || m.careerGoal }
            : m
        ),
      }))
    )
  }

  return (
    <div className="app-container">
      {/* Top Navbar Component */}
      <Navbar
        currentUser={currentUser}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onNavigateToProfile={() => setActiveMenu('user-profile')}
      />

      {/* Main Layout Area */}
      <div className="app-body-layout">
        {/* Left Sidebar Menu Component */}
        {currentUser && (
          <Sidebar
            currentUser={currentUser}
            isSidebarOpen={isSidebarOpen}
            activeMenu={activeMenu}
            activeSubMenu={activeSubMenu}
            isSettingsExpanded={isSettingsExpanded}
            onMenuClick={handleMenuClick}
            onSubMenuClick={handleSubMenuClick}
          />
        )}

        {/* Right Main Content Area */}
        <main className="main-view-container">
          {/* Common / Home */}
          {activeMenu === 'home' && (
            <HomePage currentUser={currentUser} />
          )}

          {/* ========================================================
              Super User Pages (DSS SUT Group Management)
              ======================================================== */}
          {activeMenu === 'admin-dashboard' && (
            <AdminDashboardPage
              groupsList={groupsList}
              onNavigateToGroupMgmt={() => setActiveMenu('group-mgmt')}
              onNavigateToUserMgmt={() => setActiveMenu('group-mgmt')}
              onNavigateToSettings={() => {
                setActiveMenu('settings')
                setActiveSubMenu('register-mgmt')
              }}
            />
          )}

          {activeMenu === 'group-mgmt' && (
            <GroupManagementPage
              groupsList={groupsList}
              onAddGroup={handleAddGroup}
              onUpdateGroup={handleUpdateGroup}
              onDeleteGroup={handleDeleteGroup}
              onAddMemberToGroup={handleAddMemberToGroup}
              onUpdateMemberProgress={handleUpdateMemberProgress}
              onRemoveMemberFromGroup={handleRemoveMemberFromGroup}
              allAvailableUsers={allAvailableUsers}
            />
          )}

          {activeMenu === 'settings' && activeSubMenu === 'register-mgmt' && (
            <RegisterSettingsPage
              currentUser={currentUser}
              onUpdateUser={handleUpdateUserProfile}
              onNavigateToFaculty={() => handleSubMenuClick('faculty-mgmt')}
            />
          )}

          {activeMenu === 'settings' && activeSubMenu === 'faculty-mgmt' && (
            <FacultyManagementPage
              majorsList={majorsList}
              onAddMajor={handleAddMajor}
              onDeleteMajor={handleDeleteMajor}
              onNavigateToRegister={() => handleSubMenuClick('register-mgmt')}
              onNavigateToCareerGoal={() => setActiveMenu('career-goal')}
              onExit={() => setActiveMenu('home')}
            />
          )}

          {activeMenu === 'settings' && activeSubMenu === 'constants-mgmt' && (
            <ConstantsManagementPage onNavigateHome={() => setActiveMenu('home')} />
          )}

          {activeMenu === 'settings' && activeSubMenu === 'career-skills-mgmt' && (
            <CareerSkillsManagementPage onNavigateHome={() => setActiveMenu('home')} />
          )}

          {activeMenu === 'authorization' && (
            <AuthorizationPage />
          )}

          {/* ========================================================
              User Pages (ผู้ใช้งานทั่วไป / นักศึกษา)
              ======================================================== */}
          {activeMenu === 'user-profile' && (
            <UserProfilePage
              currentUser={currentUser}
              onUpdateUser={handleUpdateUserProfile}
              onNavigateToCareerGoal={() => setActiveMenu('career-goal')}
              onNavigateToDashboard={() => setActiveMenu('dashboard')}
              onNavigateHome={() => setActiveMenu('home')}
            />
          )}

          {activeMenu === 'dashboard' && (
            <DashboardPage
              onNavigateHome={() => setActiveMenu('home')}
              onNavigateToAssessment={() => setActiveMenu('self-assessment')}
              onNavigateToCareerGoal={() => setActiveMenu('career-goal')}
              onNavigateToSelfDevelopment={() => setActiveMenu('self-development')}
              onNavigateToSkills={() => setActiveMenu('skills')}
              onNavigateToProfile={() => setActiveMenu('user-profile')}
            />
          )}

          {activeMenu === 'career-goal' && (
            <CareerGoalPage
              currentUser={currentUser}
              onNavigateHome={() => setActiveMenu('home')}
              onNavigateToPersonal={() => setActiveMenu('user-profile')}
              onNavigateToSkills={() => setActiveMenu('skills')}
            />
          )}

          {activeMenu === 'self-assessment' && (
            <SelfAssessmentPage onNavigateHome={() => setActiveMenu('home')} />
          )}

          {activeMenu === 'skills' && (
            <SkillsDefinitionPage
              onNavigateHome={() => setActiveMenu('home')}
              onNavigateToCareerGoal={() => setActiveMenu('career-goal')}
            />
          )}

          {activeMenu === 'self-development' && (
            <SelfDevelopmentPage onNavigateHome={() => setActiveMenu('home')} />
          )}
        </main>
      </div>

      {/* Auth Modal Component */}
      {showAuthModal && (
        <AuthModal
          authMode={authMode}
          onClose={handleCloseAuth}
          onSwitchMode={(mode) => setAuthMode(mode)}
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
    </div>
  )
}

export default App
