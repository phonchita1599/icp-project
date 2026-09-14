import React, { useState, useRef, useEffect } from 'react'
import './GroupManagementPage.css'

// Standard Career Presets with Recommended Competencies for SUT DSS (20+ Diverse Pathways)
export const CAREER_PRESETS = [
  // --- กลุ่มเทคโนโลยี & ซอฟต์แวร์ ---
  {
    id: 'programmer',
    title: 'โปรแกรมเมอร์ / นักพัฒนาซอฟต์แวร์ (Frontend / Full-Stack Developer)',
    shortTitle: 'โปรแกรมเมอร์ (Full-Stack)',
    category: 'เทคโนโลยีสารสนเทศ & ซอฟต์แวร์',
    skills: [
      { id: 1, name: 'การเขียนโปรแกรม JavaScript ES6+ & TypeScript', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 2, name: 'React Web Framework & Component Architecture', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 3, name: 'การออกแบบและจัดการฐานข้อมูล PostgreSQL / SQL', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 4, name: 'ระบบ Git Version Control & GitHub Team Collaboration', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 5, name: 'มาตรฐานการเข้าถึงสำหรับคนพิการ WCAG 2.1 (Accessibility)', category: 'Assistive & Accessibility', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 6, name: 'การทำงานร่วมกันเป็นทีม & ทักษะการสื่อสารในองค์กร', category: 'Soft Skills', level: 4, targetLevel: 4, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'mobile-dev',
    title: 'นักพัฒนาโมบายแอปพลิเคชัน (Mobile Application Developer)',
    shortTitle: 'นักพัฒนาโมบายแอปพลิเคชัน',
    category: 'เทคโนโลยีสารสนเทศ & ซอฟต์แวร์',
    skills: [
      { id: 51, name: 'Flutter / React Native Cross-Platform Development', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 52, name: 'Mobile UI/UX Implementation & Responsive Layout', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 53, name: 'RESTful API Integration & Offline Data Storage', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 54, name: 'Mobile Accessibility (TalkBack / VoiceOver Support)', category: 'Assistive & Accessibility', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 55, name: 'การแก้ปัญหาเฉพาะหน้าและ Debugging', category: 'Soft Skills', level: 4, targetLevel: 4, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'data-analyst',
    title: 'นักวิเคราะห์ข้อมูลและสารสนเทศ (Data Analyst & BI Specialist)',
    shortTitle: 'นักวิเคราะห์ข้อมูล (Data Analyst)',
    category: 'ข้อมูล & ปัญญาประดิษฐ์',
    skills: [
      { id: 101, name: 'การเขียนคำสั่ง SQL ขั้นสูงเพื่อดึงและรวมข้อมูล', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 102, name: 'Data Visualization & Dashboard (Power BI / Tableau)', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 103, name: 'Python for Data Analysis (Pandas & NumPy)', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 104, name: 'Data Storytelling & การสรุปผลเพื่อการตัดสินใจ', category: 'Soft Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 105, name: 'การใช้เครื่องมือช่วยเหลือ DSS สำหรับการประมวลผลข้อมูล', category: 'Assistive & Accessibility', level: 4, targetLevel: 4, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'data-engineer-ai',
    title: 'วิศวกรข้อมูลและปัญญาประดิษฐ์ (Data Engineer & AI Specialist)',
    shortTitle: 'วิศวกรข้อมูล & AI',
    category: 'ข้อมูล & ปัญญาประดิษฐ์',
    skills: [
      { id: 151, name: 'Data Pipeline Architecture & ETL Processing', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 152, name: 'Machine Learning Basics & Generative AI Integration', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 153, name: 'Big Data Tools & Cloud Storage (GCP / AWS / Azure)', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 154, name: 'จริยธรรม AI และความเป็นส่วนตัวของข้อมูล (AI Ethics)', category: 'Assistive & Accessibility', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 155, name: 'การคิดเชิงตรรกะและการวิเคราะห์เชิงระบบ', category: 'Soft Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'it-support',
    title: 'เจ้าหน้าที่สนับสนุนเทคโนโลยีสารสนเทศ (IT Support & Network Specialist)',
    shortTitle: 'IT Support & Network',
    category: 'สนับสนุนและเครือข่าย',
    skills: [
      { id: 301, name: 'การแก้ปัญหาคอมพิวเตอร์และระบบปฏิบัติการ (Windows/Linux)', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 302, name: 'การจัดการระบบเครือข่ายพื้นฐาน (LAN, Wi-Fi, VPN, DHCP)', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 303, name: 'การติดตั้งและตั้งค่าซอฟต์แวร์/อุปกรณ์ช่วยเหลือคนพิการ DSS', category: 'Assistive & Accessibility', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 304, name: 'การดูแลและการสื่อสารประสานงานกับผู้ใช้งาน', category: 'Soft Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'วิศวกรความปลอดภัยทางไซเบอร์ (Cybersecurity Analyst)',
    shortTitle: 'ความปลอดภัยไซเบอร์ (Cybersecurity)',
    category: 'เทคโนโลยีสารสนเทศ & ซอฟต์แวร์',
    skills: [
      { id: 351, name: 'Network Security, Firewall & Vulnerability Assessment', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 352, name: 'การรักษาความมั่นคงปลอดภัยข้อมูลและกฎหมาย PDPA', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 353, name: 'Security Incident Response & Monitoring', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 354, name: 'การตระหนักรู้ด้านความปลอดภัยดิจิทัล (Security Awareness)', category: 'Assistive & Accessibility', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 355, name: 'การตัดสินใจภายใต้สถานการณ์วิกฤต', category: 'Soft Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'qa-tester',
    title: 'ผู้ทดสอบระบบและประกันคุณภาพซอฟต์แวร์ (Software QA & Tester)',
    shortTitle: 'ผู้ทดสอบระบบ (QA Tester)',
    category: 'เทคโนโลยีสารสนเทศ & ซอฟต์แวร์',
    skills: [
      { id: 371, name: 'การวางแผน Test Case, Test Scenario และ Bug Tracking', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 372, name: 'Manual Testing & API Testing (Postman)', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 373, name: 'Automated Testing Basics (Cypress / Playwright)', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 374, name: 'Accessibility Testing (Screen Reader & Contrast Check)', category: 'Assistive & Accessibility', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 375, name: 'ความละเอียดรอบคอบและการสื่อสารข้อบกพร่อง', category: 'Soft Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'วิศวกรระบบคลาวด์และดูแลระบบ (Cloud & DevOps Engineer)',
    shortTitle: 'Cloud & DevOps Engineer',
    category: 'เทคโนโลยีสารสนเทศ & ซอฟต์แวร์',
    skills: [
      { id: 381, name: 'การบริหารจัดการ Cloud Platform (AWS / GCP / Azure)', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 382, name: 'Containerization & Docker Container Management', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 383, name: 'CI/CD Pipeline Automation (GitHub Actions)', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 384, name: 'ระบบติดตามและบันทึกข้อมูล (Monitoring & Logging)', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 385, name: 'การประสานงานระหว่างฝ่ายพัฒนาและฝ่ายปฏิบัติการ', category: 'Soft Skills', level: 4, targetLevel: 4, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },

  // --- กลุ่มการออกแบบ สื่อ & ครีเอทีฟ ---
  {
    id: 'uiux-designer',
    title: 'นักออกแบบ UI/UX ดิจิทัล (UI/UX Designer)',
    shortTitle: 'นักออกแบบ UI/UX',
    category: 'ออกแบบดิจิทัล & ครีเอทีฟ',
    skills: [
      { id: 201, name: 'UI Design & Component Design System ด้วย Figma', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 202, name: 'Inclusive User Research & Usability Testing', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 203, name: 'Wireframing & Interactive Prototyping', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 204, name: 'Accessibility Color Contrast & Readability', category: 'Assistive & Accessibility', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 205, name: 'การนำเสนอ Design Showcase & การรับฟัง Feedback', category: 'Soft Skills', level: 4, targetLevel: 4, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'graphic-designer',
    title: 'นักออกแบบกราฟิกและสื่อดิจิทัล (Graphic Designer & Digital Media)',
    shortTitle: 'นักออกแบบกราฟิก (Graphic Designer)',
    category: 'ออกแบบดิจิทัล & ครีเอทีฟ',
    skills: [
      { id: 251, name: 'Adobe Photoshop / Illustrator / Canva Pro', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 252, name: 'Visual Branding, Identity & Typography Design', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 253, name: 'การออกแบบแบนเนอร์และสื่อโซเชียลมีเดีย', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 254, name: 'การออกแบบสื่อที่ทุกคนเข้าถึงได้ (Accessible Design)', category: 'Assistive & Accessibility', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 255, name: 'ความคิดสร้างสรรค์และการบริหารเวลาส่งงาน', category: 'Soft Skills', level: 4, targetLevel: 4, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'video-motion',
    title: 'นักตัดต่อวิดีโอและโมชั่นกราฟิก (Video Editor & Motion Designer)',
    shortTitle: 'นักตัดต่อวิดีโอ & Motion',
    category: 'ออกแบบดิจิทัล & ครีเอทีฟ',
    skills: [
      { id: 271, name: 'Video Editing (Premiere Pro / DaVinci Resolve / CapCut)', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 272, name: 'Motion Graphics & Animation (After Effects)', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 273, name: 'Sound Design & Audio Mixing สำหรับสื่อวิดีโอ', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 274, name: 'การจัดทำคำบรรยายแทนเสียงและซับไตเติล (Closed Caption)', category: 'Assistive & Accessibility', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 275, name: 'การเล่าเรื่องผ่านภาพ (Visual Storytelling)', category: 'Soft Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'content-creator',
    title: 'นักสร้างคอนเทนต์ดิจิทัลและสื่อออนไลน์ (Content Creator & Copywriter)',
    shortTitle: 'Content Creator & Copywriter',
    category: 'ออกแบบดิจิทัล & ครีเอทีฟ',
    skills: [
      { id: 281, name: 'การเขียนบทความ SEO, แคปชั่น และ Storytelling', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 282, name: 'การผลิตคอนเทนต์วิดีโอสั้น (TikTok / Reels / Shorts)', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 283, name: 'การวิเคราะห์ Engagement & Social Media Trends', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 284, name: 'การสื่อสารที่ครอบคลุมและไม่เลือกปฏิบัติ (Inclusive Language)', category: 'Assistive & Accessibility', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 285, name: 'ทักษะการสื่อสารโน้มน้าวใจและความคิดริเริ่ม', category: 'Soft Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },

  // --- กลุ่มธุรกิจ การตลาด & การจัดการ ---
  {
    id: 'digital-marketing',
    title: 'นักการตลาดดิจิทัลและอีคอมเมิร์ซ (Digital Marketing & E-Commerce)',
    shortTitle: 'นักการตลาดดิจิทัล (Digital Marketing)',
    category: 'ธุรกิจ & การตลาด',
    skills: [
      { id: 401, name: 'การวางแผนและสร้าง Content สื่อสังคมออนไลน์', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 402, name: 'การยิงโฆษณาและการวิเคราะห์สถิติ (Meta / Google Ads / TikTok)', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 403, name: 'การจัดการร้านค้าออนไลน์ E-commerce & Customer Service', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 404, name: 'การใช้เครื่องมือช่วยเหลือสำหรับการนำเสนองาน', category: 'Assistive & Accessibility', level: 4, targetLevel: 4, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 405, name: 'การคิดสร้างสรรค์และการสื่อสารโน้มน้าวใจ', category: 'Soft Skills', level: 4, targetLevel: 4, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'product-project-manager',
    title: 'ผู้จัดการโครงการดิจิทัล / เจ้าของผลิตภัณฑ์ (Project Manager / Product Owner)',
    shortTitle: 'Project Manager / Product Owner',
    category: 'ธุรกิจ & การตลาด',
    skills: [
      { id: 451, name: 'Agile & Scrum Framework Management (Jira / Trello)', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 452, name: 'Sprint Planning, Roadmap & Backlog Prioritization', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 453, name: 'Risk Management & Resource Allocation', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 454, name: 'Inclusive Workplace & Accommodations Planning', category: 'Assistive & Accessibility', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 455, name: 'ภาวะผู้นำและการเจรจาต่อรอง (Leadership & Negotiation)', category: 'Soft Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'business-analyst',
    title: 'นักวิเคราะห์ระบบและกระบวนการทางธุรกิจ (System & Business Analyst)',
    shortTitle: 'นักวิเคราะห์ระบบ (Business Analyst)',
    category: 'ธุรกิจ & การตลาด',
    skills: [
      { id: 471, name: 'Business Requirement Gathering & Process Flowchart (BPMN)', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 472, name: 'Software Specification & Functional Design', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 473, name: 'Data Modeling & Gap Analysis', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 474, name: 'Accessibility Compliance Assessment', category: 'Assistive & Accessibility', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 475, name: 'การเป็นตัวกลางประสานงานระหว่างฝ่ายธุรกิจและทีมไอที', category: 'Soft Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },

  // --- กลุ่มการบริหาร & สนับสนุน ---
  {
    id: 'hr-talent',
    title: 'เจ้าหน้าที่บริหารทรัพยากรมนุษย์ (HR Specialist & Talent Development)',
    shortTitle: 'เจ้าหน้าที่ HR & ฝึกอบรม',
    category: 'การบริหาร & สนับสนุนองค์กร',
    skills: [
      { id: 501, name: 'การสรรหาว่าจ้างและการจัดทำหลักสูตรฝึกอบรม (Recruitment & Training)', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 502, name: 'การจัดการข้อมูลพนักงานและระบบ HRIS', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 503, name: 'กฎหมายแรงงานและการจ้างงานคนพิการตามมาตรา 33/35', category: 'Technical Skills', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 504, name: 'Inclusive Diversity & Disability Support in Workplace', category: 'Assistive & Accessibility', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 505, name: 'มนุษยสัมพันธ์ดีเด่นและการรับฟังเชิงลึก (Empathic Listening)', category: 'Soft Skills', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'admin-officer',
    title: 'เจ้าหน้าที่ธุรการและจัดการเอกสารดิจิทัล (Digital Administrative Officer)',
    shortTitle: 'เจ้าหน้าที่ธุรการดิจิทัล',
    category: 'การบริหาร & สนับสนุนองค์กร',
    skills: [
      { id: 521, name: 'การใช้ Microsoft 365 (Word, Excel, PowerPoint) / Google Workspace ขั้นสูง', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 522, name: 'การจัดระบบเอกสารดิจิทัลและหนังสือราชการ/องค์กร', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 523, name: 'การประสานงานการประชุมและบันทึกรายงานการประชุม', category: 'Technical Skills', level: 4, targetLevel: 4, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 524, name: 'การสร้างเอกสารและไฟล์ PDF ที่เข้าถึงได้ (Accessible PDF)', category: 'Assistive & Accessibility', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 525, name: 'ความรอบคอบ ละเอียดแม่นยำ และการจัดลำดับความสำคัญ', category: 'Soft Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'accounting-finance',
    title: 'นักบัญชีและการเงินดิจิทัล (Digital Accounting & Financial Officer)',
    shortTitle: 'นักบัญชีและการเงิน',
    category: 'การบริหาร & สนับสนุนองค์กร',
    skills: [
      { id: 541, name: 'การบันทึกบัญชีและการจัดทำรายงานทางการเงิน (Financial Reporting)', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 542, name: 'การใช้โปรแกรมบัญชีสำเร็จรูป (Express / FlowAccount / Peak)', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 543, name: 'Advanced Excel formulas & Financial Modeling', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 544, name: 'ระบบบริหารการเงินดิจิทัลและภาษีอากร', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 545, name: 'ความซื่อสัตย์ ความรอบคอบ และจริยธรรมในวิชาชีพ', category: 'Soft Skills', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'translator-language',
    title: 'เจ้าหน้าที่แปลและสื่อสารภาษาต่างประเทศ (Translator & Language Specialist)',
    shortTitle: 'นักแปลและสื่อสารภาษาต่างประเทศ',
    category: 'การบริหาร & สนับสนุนองค์กร',
    skills: [
      { id: 581, name: 'การแปลเอกสารและบทความ (อังกฤษ - ไทย / อื่นๆ) ขั้นสูง', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 582, name: 'การใช้เครื่องมือช่วยแปล CAT Tools & AI-assisted Translation', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 583, name: 'การตรวจสอบและพิสูจน์อักษร (Proofreading & Editing)', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 584, name: 'การจัดทำเนื้อหาในรูปแบบ Accessible Multilingual Media', category: 'Assistive & Accessibility', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 585, name: 'ความเข้าใจข้ามวัฒนธรรมและการสื่อสารระดับสากล', category: 'Soft Skills', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
  {
    id: 'research-innovation',
    title: 'นักวิจัยและพัฒนานวัตกรรม (Research & Innovation Specialist)',
    shortTitle: 'นักวิจัยและนวัตกรรม',
    category: 'การบริหาร & สนับสนุนองค์กร',
    skills: [
      { id: 601, name: 'ระเบียบวิธีวิจัย การทบทวนวรรณกรรม และการเก็บข้อมูล', category: 'Technical Skills', level: 4, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 602, name: 'การวิเคราะห์เชิงสถิติและการสรุปรายงานวิจัย', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 603, name: 'การเขียนข้อเสนอโครงการนวัตกรรม (Grant Proposal Writing)', category: 'Technical Skills', level: 3, targetLevel: 4, status: 'กำลังพัฒนา' },
      { id: 604, name: 'Inclusive Innovation for Persons with Disabilities (Universal Design)', category: 'Assistive & Accessibility', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
      { id: 605, name: 'การคิดเชิงวิพากษ์และใฝ่รู้สิ่งใหม่อย่างต่อเนื่อง (Lifelong Learning)', category: 'Soft Skills', level: 5, targetLevel: 5, status: 'ผ่านเกณฑ์แล้ว' },
    ],
  },
]

export default function GroupManagementPage({
  groupsList = [],
  onAddGroup,
  onUpdateGroup,
  onDeleteGroup,
  onAddMemberToGroup,
  onUpdateMemberProgress,
  onRemoveMemberFromGroup,
  allAvailableUsers = [],
}) {
  // Active selected group
  const [selectedGroupId, setSelectedGroupId] = useState(groupsList[0]?.id || 1)
  const activeGroup = groupsList.find((g) => g.id === selectedGroupId) || groupsList[0]

  // Modals
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
  const [showEditGroupModal, setShowEditGroupModal] = useState(false)
  const [editGroupFormData, setEditGroupFormData] = useState({
    id: null,
    name: '',
    description: '',
    dssName: '',
    mentorName: '',
  })
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showMemberDetailModal, setShowMemberDetailModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  // Subtab inside Evaluation Modal ('monthly' | 'skills')
  const [modalSubTab, setModalSubTab] = useState('monthly')

  // 7 Standard Evaluation Options (matching user)
  const evaluationOptions = [
    '1.ได้รู้จักหรือมีทักษะนี้เพียงเล็กน้อยเท่านั้น',
    '2.ได้เรียนทักษะนี้บ้างและพอทำได้ ถึงแม้จะน้อยกว่าคนทั่วไป',
    '3.ได้มีประสบการณ์ในการใช้ทักษะนี้เป็นครั้งคราว และทำได้เทียบเท่ากับคนทั่วไป',
    '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
    '5.ได้ถ่ายทอดทักษะนี้แก่ผู้อื่น หรือเป็นต้นแบบของทักษะนี้แก่ผู้อื่น',
    '(Yes) มีใบประกาศ มีใบรับรอง ผ่านการฝึกประสบการณ์ ได้รับใบอนุญาตขับขี่',
    '(No) ยังไม่มีใบประกาศ ยังไม่มีใบรับรอง ยังไม่ผ่านการฝึกประสบการณ์ ยังไม่ได้รับใบอนุญาตขับขี่',
  ]

  // Category Options for Adding Skill
  const categoryOptions = [
    { id: 'tech', name: 'ทักษะทางเทคนิค (Technical Skills)' },
    { id: 'soft', name: 'ทักษะทางอารมณ์และสังคม (Soft Skills)' },
    { id: 'comm', name: 'ทักษะการสื่อสารและภาษา (Language & Comm)' },
    { id: 'cert', name: 'ใบรับรองวิชาชีพ / มาตรฐาน (Certificates)' },
    { id: 'assist', name: 'สิ่งอำนวยความสะดวก DSS (Assistive Tech)' },
    { id: 'other', name: 'อื่นๆ (ระบุหมวดหมู่เอง)' },
  ]

  const [selectedCatId, setSelectedCatId] = useState('tech')
  const [customCatText, setCustomCatText] = useState('')
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false)
  const [newSkillHours, setNewSkillHours] = useState('15')

  // Custom Beautiful Career Combobox State
  const [isCareerDropdownOpen, setIsCareerDropdownOpen] = useState(false)
  const [careerSearchTerm, setCareerSearchTerm] = useState('')
  const careerDropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (careerDropdownRef.current && !careerDropdownRef.current.contains(event.target)) {
        setIsCareerDropdownOpen(false)
      }
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsCareerDropdownOpen(false)
      }
    }
    if (isCareerDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCareerDropdownOpen])

  // Month Evaluation Edit Pop-up Modal State
  const [showEditMonthModal, setShowEditMonthModal] = useState(false)

  const handleOpenEditMonthModal = (idx) => {
    handleSelectMonth(idx)
    setShowEditMonthModal(true)
  }

  const handleCloseEditMonthModal = () => {
    setShowEditMonthModal(false)
  }

  // Add Individual Skill Popup Modal State
  const [showAddSkillModal, setShowAddSkillModal] = useState(false)
  const [addSkillModalData, setAddSkillModalData] = useState({
    name: '',
    categoryId: 'tech',
    customCategory: '',
    hours: '15',
    level: 4,
    status: 'กำลังพัฒนา',
    note: '',
  })

  // Super User Evaluation Popup Modal for individual skill
  const [selectedSkillEvalModal, setSelectedSkillEvalModal] = useState(null)
  const [isEvalDropdownOpen, setIsEvalDropdownOpen] = useState(false)
  const [evalModalData, setEvalModalData] = useState({
    level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
    hours: '25',
    images: [],
    note: '',
  })

  // Individual Skills Matrix for the selected member
  const [memberSkills, setMemberSkills] = useState([])
  const [newSkillForm, setNewSkillForm] = useState({
    name: '',
    category: 'Technical Skills',
    targetLevel: 5,
  })

  // Forms state
  const [groupFormData, setGroupFormData] = useState({
    name: '',
    description: '',
    dssName: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
    mentorName: 'อ.ที่ปรึกษา / พี่เลี้ยงศูนย์บริการ DSS',
  })
  const [selectedUserToAdd, setSelectedUserToAdd] = useState('')
  const [userSearchQuery, setUserSearchQuery] = useState('')
  const [customSkillText, setCustomSkillText] = useState('')
  const [autoSyncScore, setAutoSyncScore] = useState(true)

  // Inline editing state for skill card name & hours
  const [editingSkillId, setEditingSkillId] = useState(null)
  const [editingSkillName, setEditingSkillName] = useState('')

  // Quick Add Custom Skill Bar state at the top of cards grid
  const [quickSkillName, setQuickSkillName] = useState('')
  const [quickSkillCat, setQuickSkillCat] = useState('Technical Skills')
  const [quickSkillHours, setQuickSkillHours] = useState('25')

  // Active month index for monthly evaluation (0 = Jan ... 7 = Aug ... 11 = Dec)
  const [activeMonthIdx, setActiveMonthIdx] = useState(7) // Default to สิงหาคม (Index 7)

  // Standard 12-Month Balanced Evaluation Syllabus for SUT DSS
  const DEFAULT_12_MONTHS_SYLLABUS = [
    {
      monthKey: '01',
      monthName: 'มกราคม 2568',
      shortMonth: 'ม.ค.',
      topic: 'ปูพื้นฐานการเขียนโปรแกรม & ตรรกะอัลกอริทึม',
      shortTopic: 'ปูพื้นฐาน',
      score: 67,
      passedSkills: '2 ทักษะ',
      hours: '12 ชม.',
      status: 'กำลังพัฒนาได้ดี',
      criteria: ['ทดสอบตรรกะและอัลกอริทึมพื้นฐาน (Condition, Loop)', 'การติดตั้งและตั้งค่าเครื่องมือพัฒนาซอฟต์แวร์', 'การประเมินความต้องการอุปกรณ์ช่วยเหลือ DSS มทส.'],
      passedCriteria: [0, 1],
      criteriaDetails: {
        0: {
          level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
          hours: '12',
          images: [],
          note: 'ทดสอบตรรกะ Condition และ Loop ผ่านเกณฑ์ 85% เขียน Flowchart ได้ถูกต้อง',
        },
        1: {
          level: '3.ได้มีประสบการณ์ในการใช้ทักษะนี้เป็นครั้งคราว และทำได้เทียบเท่ากับคนทั่วไป',
          hours: '8',
          images: [],
          note: 'ติดตั้ง VS Code, Python Environment และ Git บนเครื่องเรียบร้อย',
        },
      },
      note: 'เริ่มปรับพื้นฐานการเขียนโปรแกรม Python และอัลกอริทึม เข้าใจ Flowchart และ Logic การทำงานได้ดี',
      plan: 'ฝึกทำโจทย์ Condition & Loop เพิ่มเติม',
      userSelfScore: 65,
      userSelfStatus: 'เข้าใจพื้นฐานดี',
      userSelfNote: 'เรียนรู้ Logic และเขียน Python ฟังก์ชันพื้นฐานได้แล้ว มีความเข้าใจคำสั่ง Loop ดีขึ้น',
      userSelfEvidence: 'https://github.com/sut-student/python-basics-lab1',
      userSelfPassedCriteria: [0, 1],
    },
    {
      monthKey: '02',
      monthName: 'กุมภาพันธ์ 2568',
      shortMonth: 'ก.พ.',
      topic: 'โครงสร้างข้อมูล & ระบบ Git Version Control',
      shortTopic: 'Git & Data',
      score: 67,
      passedSkills: '2 ทักษะ',
      hours: '16 ชม.',
      status: 'กำลังพัฒนาได้ดี',
      criteria: ['การใช้งาน Git & GitHub (Commit, Branch, Pull Request)', 'การจัดการ Data Structures (Array, List, Map, Set)', 'การทำงานร่วมกันเป็นทีมผ่าน Version Control'],
      passedCriteria: [0, 1],
      criteriaDetails: {
        0: {
          level: '5.ได้ถ่ายทอดทักษะนี้แก่ผู้อื่น หรือเป็นต้นแบบของทักษะนี้แก่ผู้อื่น',
          hours: '18',
          images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&auto=format&fit=crop&q=60'],
          note: 'ใช้งาน Git & GitHub คล่องแคล่ว สร้าง Branch และ Pull Request ได้อย่างชำนาญ',
        },
        1: {
          level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
          hours: '14',
          images: [],
          note: 'ทำแบบฝึกหัด Array, List, Set และ Map ผ่านเกณฑ์การทดสอบครบถ้วน',
        },
        2: {
          level: '2.ได้เรียนทักษะนี้บ้างและพอทำได้ ถึงแม้จะน้อยกว่าคนทั่วไป',
          hours: '6',
          images: [],
          note: 'อยู่ระหว่างฝึกการแก้ปัญหา Merge Conflict ในการทำงานร่วมกันเป็นทีม',
        },
      },
      note: 'ศึกษา Data Structures และ Git Version Control ได้คล่องแคล่ว ส่งงานผ่าน GitHub สม่ำเสมอ',
      plan: 'เริ่มเรียนรู้โครงสร้างหน้าเว็บ HTML5/CSS3',
      userSelfScore: 70,
      userSelfStatus: 'ใช้งาน Git ได้คล่อง',
      userSelfNote: 'สามารถสร้าง Branch และส่ง Pull Request บน GitHub ได้ถูกต้อง ทำการทดลองโครงสร้าง Array และ Map ผ่านเกณฑ์',
      userSelfEvidence: 'https://github.com/sut-student/data-structure-assignment',
      userSelfPassedCriteria: [0, 1],
    },
    {
      monthKey: '03',
      monthName: 'มีนาคม 2568',
      shortMonth: 'มี.ค.',
      topic: 'พื้นฐานการพัฒนาเว็บ & JavaScript ES6+',
      shortTopic: 'Web & JS',
      score: 100,
      passedSkills: '3 ทักษะ',
      hours: '20 ชม.',
      status: 'พัฒนาได้ดีมาก',
      criteria: ['การเขียน Modern JavaScript (ES6+, Async/Await, Fetch)', 'การจัด Layout Responsive ด้วย CSS Flexbox และ Grid', 'การจัดการ DOM Manipulation และ Event Handling'],
      passedCriteria: [0, 1, 2],
      criteriaDetails: {
        0: {
          level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
          hours: '20',
          images: [],
          note: 'เขียน Modern JavaScript ES6+ ได้ดีมาก ใช้ Async/Await เชื่อมต่อ REST API สำเร็จ',
        },
        1: {
          level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
          hours: '16',
          images: [],
          note: 'ออกแบบหน้าเว็บแบบ Responsive ด้วย CSS Flexbox และ Grid รองรับทุกขนาดหน้าจอ',
        },
        2: {
          level: '3.ได้มีประสบการณ์ในการใช้ทักษะนี้เป็นครั้งคราว และทำได้เทียบเท่ากับคนทั่วไป',
          hours: '12',
          images: [],
          note: 'จัดการ DOM Manipulation และ Event Handling สร้าง Interactive UI ได้ถูกต้อง',
        },
      },
      note: 'เรียนรู้ HTML5, CSS3, JavaScript ES6 และ DOM Manipulation สร้าง Interactive Form ได้ถูกต้อง',
      plan: 'เริ่มศึกษา React และ Component-based Architecture',
      userSelfScore: 90,
      userSelfStatus: 'เขียน JavaScript ได้ดี',
      userSelfNote: 'เข้าใจการใช้ Fetch API และการจัดหน้าจอ Responsive ด้วย Flexbox/Grid ได้อย่างถูกต้อง',
      userSelfEvidence: 'https://codepen.io/sut-dss-student/pen/responsive-form',
      userSelfPassedCriteria: [0, 1, 2],
    },
    {
      monthKey: '04',
      monthName: 'เมษายน 2568',
      shortMonth: 'เม.ย.',
      topic: 'Frontend Web Framework (React Components & Hooks)',
      shortTopic: 'React Web',
      score: 67,
      passedSkills: '2 ทักษะ',
      hours: '18 ชม.',
      status: 'กำลังพัฒนาได้ดี',
      criteria: ['การสร้าง Reusable React Components & Props', 'การจัดการ State ด้วย React Hooks (useState, useEffect, useMemo)', 'การเชื่อมต่อ REST API และจัดการสถานะข้อมูลแบบ Asynchronous'],
      passedCriteria: [0, 1],
      criteriaDetails: {
        0: {
          level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
          hours: '18',
          images: [],
          note: 'สร้าง Reusable React Components แบ่งสัดส่วนของ UI ได้เป็นระเบียบ',
        },
        1: {
          level: '3.ได้มีประสบการณ์ในการใช้ทักษะนี้เป็นครั้งคราว และทำได้เทียบเท่ากับคนทั่วไป',
          hours: '15',
          images: [],
          note: 'ใช้งาน useState, useEffect ได้อย่างถูกต้อง และเข้าใจวงจรการ Render',
        },
      },
      note: 'สร้าง Component และใช้งาน Hooks บน React ได้ถูกต้อง สามารถเชื่อมต่อ Mock API ได้อย่างราบรื่น',
      plan: 'ศึกษาการออกแบบฐานข้อมูล PostgreSQL และระบบความปลอดภัย',
      userSelfScore: 70,
      userSelfStatus: 'สร้าง React App ได้แล้ว',
      userSelfNote: 'พัฒนา Single Page Application โดยใช้ React และเชื่อมต่อ API แสดงผลข้อมูลได้ตามโจทย์',
      userSelfEvidence: 'https://github.com/sut-student/react-icp-miniapp',
      userSelfPassedCriteria: [0, 1],
    },
    {
      monthKey: '05',
      monthName: 'พฤษภาคม 2568',
      shortMonth: 'พ.ค.',
      topic: 'ฐานข้อมูล & มาตรฐานการเข้าถึงสำหรับคนพิการ (WCAG)',
      shortTopic: 'DB & WCAG',
      score: 100,
      passedSkills: '3 ทักษะ',
      hours: '24 ชม.',
      status: 'พัฒนาได้ดีมาก',
      criteria: ['การออกแบบและ Query ฐานข้อมูล PostgreSQL (DDL/DML)', 'การพัฒนาเว็บตามมาตรฐาน WCAG 2.1 (Web Accessibility)', 'การสร้างระบบ CRUD Backend API เชื่อมต่อฐานข้อมูล'],
      passedCriteria: [0, 1, 2],
      criteriaDetails: {
        0: {
          level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
          hours: '24',
          images: [],
          note: 'ออกแบบ Relational Schema บน PostgreSQL และเขียนคำสั่ง SQL Query ได้ถูกต้องแม่นยำ',
        },
        1: {
          level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
          hours: '18',
          images: [],
          note: 'ปรับแต่งเว็บให้ได้มาตรฐาน WCAG 2.1 รองรับ Screen Reader และคีย์บอร์ดนำทางสมบูรณ์',
        },
        2: {
          level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
          hours: '20',
          images: [],
          note: 'สร้าง Node.js REST API จัดการระบบ CRUD เชื่อมโยงกับฐานข้อมูลได้อย่างมีประสิทธิภาพ',
        },
      },
      note: 'ทำระบบ CRUD และต่อเชื่อมฐานข้อมูล PostgreSQL ได้อย่างราบรื่น ออกแบบ UI รองรับ Screen Reader ได้ตามเกณฑ์',
      plan: 'รวมชิ้นงานทำ Mini Project Full-Stack สำหรับสหกิจศึกษา',
      userSelfScore: 92,
      userSelfStatus: 'รองรับ Accessibility',
      userSelfNote: 'ออกแบบระบบฐานข้อมูล PostgreSQL และปรับปรุงหน้า UI ให้รองรับ Screen Reader สำหรับผู้พิการทางสายตา',
      userSelfEvidence: 'https://github.com/sut-student/accessible-postgres-crud',
      userSelfPassedCriteria: [0, 1, 2],
    },
    {
      monthKey: '06',
      monthName: 'มิถุนายน 2568',
      shortMonth: 'มิ.ย.',
      topic: 'Full-Stack Mini Project & การทดสอบระบบ (Testing)',
      shortTopic: 'Mini Project',
      score: 67,
      passedSkills: '2 ทักษะ',
      hours: '25 ชม.',
      status: 'กำลังพัฒนาได้ดี',
      criteria: ['การพัฒนา Full-Stack Web Application ฉบับสมบูรณ์', 'การเขียน Unit Test & Integration Test', 'การ Deploy Application ขึ้น Cloud Platform (Vercel/Render)'],
      passedCriteria: [0, 2],
      criteriaDetails: {
        0: {
          level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
          hours: '28',
          images: [],
          note: 'พัฒนา Mini Project Full-Stack สำเร็จตามกำหนดการ ชิ้นงานพร้อมนำเสนอ',
        },
        1: {
          level: '2.ได้เรียนทักษะนี้บ้างและพอทำได้ ถึงแม้จะน้อยกว่าคนทั่วไป',
          hours: '10',
          images: [],
          note: 'อยู่ระหว่างฝึกเขียน Unit Test ด้วย Jest เพิ่มเติมเพื่อให้ครอบคลุมฟังก์ชันหลัก',
        },
        2: {
          level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
          hours: '14',
          images: [],
          note: 'Deploy เว็บไซต์และฐานข้อมูลขึ้น Cloud (Vercel & Render) ทำงานได้ปกติ',
        },
      },
      note: 'ทำ Mini Project Full-Stack Web App สำเร็จตามกำหนด เขียน Unit Test ผ่านเกณฑ์ 80%',
      plan: 'จัดทำ Portfolio และเตรียมตัวสอบวัดระดับทักษะวิชาชีพ',
      userSelfScore: 80,
      userSelfStatus: 'Mini Project สำเร็จสมบูรณ์',
      userSelfNote: 'ส่งมอบ Full-Stack Web Application พร้อม Deploy ขึ้น Vercel และผ่าน Unit Test 82%',
      userSelfEvidence: 'https://sut-icp-mini-project.vercel.app',
      userSelfPassedCriteria: [0, 2],
    },
    {
      monthKey: '07',
      monthName: 'กรกฎาคม 2568',
      shortMonth: 'ก.ค.',
      topic: 'ทดสอบทักษะวิชาชีพ & จัดทำแฟ้มผลงาน Portfolio',
      shortTopic: 'Portfolio',
      score: 67,
      passedSkills: '2 ทักษะ',
      hours: '28 ชม.',
      status: 'กำลังพัฒนาได้ดี',
      criteria: ['สอบผ่านเกณฑ์มาตรฐานสมรรถนะวิชาชีพด้านซอฟต์แวร์', 'จัดทำ Live Portfolio & GitHub Showcases', 'จัดทำเรซูเม่ฉบับสองภาษา (ไทย-อังกฤษ) สำหรับสหกิจศึกษา'],
      passedCriteria: [0, 1],
      criteriaDetails: {
        0: {
          level: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
          hours: '25',
          images: [],
          note: 'สอบผ่านเกณฑ์มาตรฐานสมรรถนะวิชาชีพด้านซอฟต์แวร์ระดับดีเยี่ยม',
        },
        1: {
          level: '5.ได้ถ่ายทอดทักษะนี้แก่ผู้อื่น หรือเป็นต้นแบบของทักษะนี้แก่ผู้อื่น',
          hours: '20',
          images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&auto=format&fit=crop&q=60'],
          note: 'จัดทำ Live Portfolio เว็บไซต์พร้อม Showcase โค้ดผลงานบน GitHub อย่างมืออาชีพ',
        },
      },
      note: 'ผ่านการทดสอบทักษะ Frontend & Backend ได้คะแนนสูงมาก Portfolio มีชิ้นงานจริงครบถ้วน',
      plan: 'เตรียมตัวซ้อมสัมภาษณ์งาน Mock Interview',
      userSelfScore: 85,
      userSelfStatus: 'Portfolio ครบถ้วนพร้อมยื่น',
      userSelfNote: 'จัดทำเว็บไซต์ Portfolio และเรซูเม่ภาษาไทย-อังกฤษ พร้อม Link ผลงาน GitHub ครบถ้วน',
      userSelfEvidence: 'https://thanakorn-dev.portfolio.sut.ac.th',
      userSelfPassedCriteria: [0, 1],
    },
    {
      monthKey: '08',
      monthName: 'สิงหาคม 2568',
      shortMonth: 'ส.ค.',
      topic: 'เตรียมความพร้อมสหกิจศึกษา & ซ้อมสัมภาษณ์งาน',
      shortTopic: 'สหกิจ/สัมภาษณ์',
      score: 33,
      passedSkills: '1 ทักษะ',
      hours: '30 ชม.',
      status: 'ต้องการคำแนะนำเพิ่มเติม',
      criteria: ['การซ้อมสัมภาษณ์งานจำลอง (Mock Interview กับสถานประกอบการ)', 'การเตรียมความพร้อมด้าน Soft Skills และวัฒนธรรมองค์กร', 'การจับคู่สถานประกอบการโครงการสหกิจศึกษา มทส.'],
      passedCriteria: [0],
      criteriaDetails: {
        0: {
          level: '5.ได้ถ่ายทอดทักษะนี้แก่ผู้อื่น หรือเป็นต้นแบบของทักษะนี้แก่ผู้อื่น',
          hours: '30',
          images: [],
          note: 'ผ่านการซ้อมสัมภาษณ์ Mock Interview กับพี่เลี้ยง DSS มทส. มีความมั่นใจและตอบคำถามได้ยอดเยี่ยม',
          superDecision: 'passed',
        },
        1: {
          level: '2.ได้เรียนทักษะนี้บ้างและพอทำได้ ถึงแม้จะน้อยกว่าคนทั่วไป',
          hours: '12',
          images: [],
          note: 'กำลังศึกษาและฝึกทักษะ Soft Skills และการปรับตัวเข้ากับวัฒนธรรมองค์กร',
          superDecision: 'failed',
        },
      },
      note: 'ผ่านการซ้อมสัมภาษณ์ Mock Interview ได้ดีมาก รอส่งผลงาน Soft Skills และการจับคู่สถานประกอบการ',
      plan: 'ส่งเอกสารเข้าร่วมสหกิจศึกษาในสถานประกอบการจริง',
      userSelfScore: 88,
      userSelfStatus: 'พร้อมเริ่มสหกิจศึกษา',
      userSelfNote: 'ผ่านการซ้อมสัมภาษณ์ Mock Interview กับพี่เลี้ยง DSS ได้รับข้อเสนอแนะในการตอบคำถามเชิงเทคนิคดีมาก',
      userSelfEvidence: 'https://drive.google.com/mock-interview-sut-dss-cert',
      userSelfPassedCriteria: [0],
    },
    {
      monthKey: '09',
      monthName: 'กันยายน 2568',
      shortMonth: 'ก.ย.',
      topic: 'เริ่มปฏิบัติงานสหกิจศึกษา & ติดตามการปรับตัวในองค์กร',
      shortTopic: 'เริ่มสหกิจ',
      score: 0,
      passedSkills: '-',
      hours: '-',
      status: 'ยังไม่ถึงรอบประเมิน',
      criteria: ['การปรับตัวเข้ากับทีมงานและกระบวนการทำงานจริงในองค์กร', 'การใช้เครื่องมือสื่อสารและการประสานงานในที่ทำงาน', 'การส่งรายงานผลการปฏิบัติงานสัปดาห์แรกต่อศูนย์ DSS มทส.'],
      passedCriteria: [],
      note: 'รอรอบประเมินประจำเดือนกันยายน 2568 (ช่วงเริ่มปฏิบัติงานสหกิจศึกษา)',
      plan: 'บันทึก Daily Log การทำงานและปรึกษาพี่เลี้ยง DSS ประจำสัปดาห์',
      userSelfScore: 0,
      userSelfStatus: 'ยังไม่ถึงรอบประเมิน',
      userSelfNote: '',
      userSelfEvidence: '',
      userSelfPassedCriteria: [],
    },
    {
      monthKey: '10',
      monthName: 'ตุลาคม 2568',
      shortMonth: 'ต.ค.',
      topic: 'ประเมินผลการปฏิบัติงานกลางเทอม (Midterm Assessment)',
      shortTopic: 'Midterm',
      score: 0,
      passedSkills: '-',
      hours: '-',
      status: 'ยังไม่ถึงรอบประเมิน',
      criteria: ['การประเมินผลงานจากหัวหน้างานสถานประกอบการรอบกลางเทอม', 'การแก้ไขปัญหาทางเทคนิคและข้อติดขัดในการปฏิบัติงานจริง', 'ความก้าวหน้าของโครงงานสหกิจศึกษาบรรลุเป้าหมาย 50%'],
      passedCriteria: [],
      note: 'รอรอบประเมินประจำเดือนตุลาคม 2568 (รอบประเมินกลางเทอม)',
      plan: 'เตรียมสรุปผลงานกลางเทอมร่วมกับอาจารย์นิเทศก์ มทส.',
      userSelfScore: 0,
      userSelfStatus: 'ยังไม่ถึงรอบประเมิน',
      userSelfNote: '',
      userSelfEvidence: '',
      userSelfPassedCriteria: [],
    },
    {
      monthKey: '11',
      monthName: 'พฤศจิกายน 2568',
      shortMonth: 'พ.ย.',
      topic: 'นำเสนอโครงงานสหกิจศึกษา & สรุปผลสัมฤทธิ์หน้างาน',
      shortTopic: 'Final Project',
      score: 0,
      passedSkills: '-',
      hours: '-',
      status: 'ยังไม่ถึงรอบประเมิน',
      criteria: ['ความสมบูรณ์ของโครงงานสหกิจศึกษา 100% พร้อมใช้งานจริง', 'การจัดทำรายงานสรุปผลการปฏิบัติงานสหกิจศึกษาฉบับสมบูรณ์', 'การนำเสนอโครงงานต่อคณะกรรมการสถานประกอบการและ มทส.'],
      passedCriteria: [],
      note: 'รอรอบประเมินประจำเดือนพฤศจิกายน 2568 (รอบส่งมอบโครงงาน)',
      plan: 'เตรียมเอกสารส่งมอบงานและขอใบรับรองการผ่านงาน',
      userSelfScore: 0,
      userSelfStatus: 'ยังไม่ถึงรอบประเมิน',
      userSelfNote: '',
      userSelfEvidence: '',
      userSelfPassedCriteria: [],
    },
    {
      monthKey: '12',
      monthName: 'ธันวาคม 2568',
      shortMonth: 'ธ.ค.',
      topic: 'สรุปผลสัมฤทธิ์แผนพัฒนารายบุคคล (ICP) & บรรจุเข้าทำงาน',
      shortTopic: 'บรรจุเข้าทำงาน',
      score: 0,
      passedSkills: '-',
      hours: '-',
      status: 'ยังไม่ถึงรอบประเมิน',
      criteria: ['การประเมินสรุปผลสัมฤทธิ์ตามแผนพัฒนารายบุคคล (ICP)', 'การเซ็นสัญญาจ้างงาน / บรรจุเข้าทำงานประจำในสถานประกอบการ', 'การส่งต่อข้อมูลเข้าสู่เครือข่ายศิษย์เก่าคนพิการ มทส.'],
      passedCriteria: [],
      note: 'รอรอบประเมินสรุปผลสิ้นปี 2568 (Final Career Placement)',
      plan: 'สรุปรายงานผลสำเร็จการพัฒนาอาชีพรายบุคคล',
      userSelfScore: 0,
      userSelfStatus: 'ยังไม่ถึงรอบประเมิน',
      userSelfNote: '',
      userSelfEvidence: '',
      userSelfPassedCriteria: [],
    },
  ]

  // Helper to find preset skills for member
  const getInitialMemberSkills = (member) => {
    if (member?.skills && Array.isArray(member.skills) && member.skills.length > 0) {
      return member.skills
    }
    const matchedPreset = CAREER_PRESETS.find(
      (p) => member?.careerGoal?.includes(p.shortTitle) || member?.careerGoal?.includes(p.id) || p.title.includes(member?.careerGoal)
    )
    return matchedPreset ? matchedPreset.skills : CAREER_PRESETS[0].skills
  }

  // Helper for 12 months structure
  const getMonthsList = (member) => {
    const list =
      member?.monthlyProgress && Array.isArray(member.monthlyProgress) && member.monthlyProgress.length === 12
        ? member.monthlyProgress
        : DEFAULT_12_MONTHS_SYLLABUS
    return list.map((m) => ({
      ...m,
      status: m.status === 'พร้อมยื่นสมัครงานแล้ว' ? 'พัฒนาได้ดีมาก' : m.status,
    }))
  }

  // Helper to display clean short category names on cards
  const getShortCategoryName = (cat = '') => {
    if (!cat) return 'ทักษะทั่วไป'
    if (cat.includes('Technical')) return 'ทักษะทางเทคนิค'
    if (cat.includes('Soft')) return 'Soft Skills'
    if (cat.includes('Language') || cat.includes('สื่อสาร')) return 'การสื่อสาร & ภาษา'
    if (cat.includes('Assistive') || cat.includes('ช่วยเหลือ') || cat.includes('อำนวย')) return 'เครื่องมือ DSS'
    if (cat.includes('Cert') || cat.includes('ประกาศ') || cat.includes('มาตรฐาน')) return 'ใบรับรอง'
    return cat.replace(/\s*\(.*?\)/g, '').trim() || cat
  }

  // Automatic Score Calculation based on Passed Criteria
  const calcAutoScore = (passedList = [], criteriaList = []) => {
    if (!criteriaList || criteriaList.length === 0) return 0
    return Math.min(100, Math.round((passedList.length / criteriaList.length) * 100))
  }

  // Status mapping from score
  const getStatusFromScore = (sc) => {
    if (sc >= 80) return 'พัฒนาได้ดีมาก'
    if (sc >= 60) return 'กำลังพัฒนาได้ดี'
    if (sc >= 40) return 'ต้องการคำแนะนำเพิ่มเติม'
    if (sc > 0) return 'ต้องเร่งปรับปรุงทักษะ'
    return 'ยังไม่ถึงรอบประเมิน'
  }

  // Helper to verify if a criterion has at least 1 piece of evidence/submission
  // (Photo is NOT mandatory, but must have at least one: level, hours, note, images, or evidence link)
  const hasCriterionSubmission = (cIdx, details = evaluationData?.criteriaDetails) => {
    const detail = (details || {})[cIdx]
    if (!detail) return false
    const hasLevel = Boolean(detail.level && String(detail.level).trim() !== '')
    const hasHours = Boolean(detail.hours && (parseInt(detail.hours, 10) > 0 || String(detail.hours).trim() !== ''))
    const hasNote = Boolean(detail.note && String(detail.note).trim().length > 0)
    const hasImages = Boolean(detail.images && Array.isArray(detail.images) && detail.images.length > 0)
    const hasEvidenceUrl = Boolean(detail.evidenceUrl && String(detail.evidenceUrl).trim().length > 0)
    return hasLevel || hasHours || hasNote || hasImages || hasEvidenceUrl
  }

  // Monthly Evaluation & Feedback Form State
  const [evaluationData, setEvaluationData] = useState({
    topic: 'เตรียมความพร้อมสหกิจศึกษา & ซ้อมสัมภาษณ์งาน',
    score: 35,
    status: 'ต้องการคำแนะนำเพิ่มเติม',
    passedSkills: '1 ทักษะ',
    hours: '30 ชม.',
    criteria: ['การซ้อมสัมภาษณ์งานจำลอง (Mock Interview กับสถานประกอบการ)', 'การเตรียมความพร้อมด้าน Soft Skills และวัฒนธรรมองค์กร', 'การจับคู่สถานประกอบการโครงการสหกิจศึกษา มทส.'],
    passedCriteria: [0],
    criteriaDetails: {
      0: {
        level: '5.ได้ถ่ายทอดทักษะนี้แก่ผู้อื่น หรือเป็นต้นแบบของทักษะนี้แก่ผู้อื่น',
        hours: '30',
        images: [],
        note: 'ผ่านการซ้อมสัมภาษณ์ Mock Interview กับพี่เลี้ยง DSS มทส. มีความมั่นใจและตอบคำถามได้ยอดเยี่ยม',
        superDecision: 'passed',
      },
      1: {
        level: '2.ได้เรียนทักษะนี้บ้างและพอทำได้ ถึงแม้จะน้อยกว่าคนทั่วไป',
        hours: '12',
        images: [],
        note: 'กำลังศึกษาและฝึกทักษะ Soft Skills และการปรับตัวเข้ากับวัฒนธรรมองค์กร',
        superDecision: 'failed',
      },
    },
    mentorNote: 'ผ่านการซ้อมสัมภาษณ์ Mock Interview ได้ดีมาก รอส่งผลงาน Soft Skills และการจับคู่สถานประกอบการ',
    advicePlan: 'จัดทำเอกสารและหลักฐานเพิ่มเติมสำหรับทักษะที่เหลือ',
    userSelfScore: 88,
    userSelfStatus: 'พร้อมเริ่มสหกิจศึกษา',
    userSelfNote: 'นักศึกษาได้บันทึกการเรียนรู้และส่งผลงานในเดือนนี้เรียบร้อยแล้ว',
    userSelfEvidence: 'https://drive.google.com/mock-interview-sut-dss-cert',
    userSelfPassedCriteria: [0],
  })

  const [saveSuccessMsg, setSaveSuccessMsg] = useState('')

  // Open member detail modal
  const handleOpenMemberDetail = (member) => {
    const months = getMonthsList(member)
    const latestEvaluatedIdx = 7
    const initialSkills = getInitialMemberSkills(member)
    
    setSelectedMember({
      ...member,
      monthlyProgress: months,
      skills: initialSkills,
    })
    setMemberSkills(initialSkills)
    setActiveMonthIdx(latestEvaluatedIdx)
    setModalSubTab('monthly')

    const curMonthData = months[latestEvaluatedIdx]
    const criteria = curMonthData.criteria || DEFAULT_12_MONTHS_SYLLABUS[latestEvaluatedIdx].criteria
    const initialCriteriaDetails = curMonthData.criteriaDetails || {
      0: {
        level: '5.ได้ถ่ายทอดทักษะนี้แก่ผู้อื่น หรือเป็นต้นแบบของทักษะนี้แก่ผู้อื่น',
        hours: curMonthData.hours ? String(parseInt(curMonthData.hours)) : '30',
        images: [],
        note: curMonthData.note || 'ผ่านการซ้อมสัมภาษณ์ Mock Interview กับพี่เลี้ยง DSS มทส. มีความมั่นใจและตอบคำถามได้ยอดเยี่ยม',
        superDecision: 'passed',
      },
      1: {
        level: '2.ได้เรียนทักษะนี้บ้างและพอทำได้ ถึงแม้จะน้อยกว่าคนทั่วไป',
        hours: '12',
        images: [],
        note: 'กำลังศึกษาและฝึกทักษะ Soft Skills และการปรับตัวเข้ากับวัฒนธรรมองค์กร',
        superDecision: 'failed',
      },
    }

    // A criterion can only pass if it has at least 1 form of submission/evidence!
    const rawPassed = Array.isArray(curMonthData.passedCriteria) ? curMonthData.passedCriteria : [0]
    const validPassed = rawPassed.filter((cIdx) => hasCriterionSubmission(cIdx, initialCriteriaDetails))
    const calculatedScore = curMonthData.score !== undefined ? curMonthData.score : calcAutoScore(validPassed, criteria)

    setEvaluationData({
      topic: curMonthData.topic || DEFAULT_12_MONTHS_SYLLABUS[latestEvaluatedIdx].topic,
      score: calculatedScore,
      status:
        (curMonthData.status === 'พร้อมยื่นสมัครงานแล้ว' ? 'พัฒนาได้ดีมาก' : curMonthData.status) ||
        (member.status === 'พร้อมยื่นสมัครงานแล้ว' ? 'พัฒนาได้ดีมาก' : member.status) ||
        getStatusFromScore(calculatedScore),
      passedSkills: `${validPassed.length} ทักษะ`,
      hours: curMonthData.hours || '30 ชม.',
      criteria: criteria,
      passedCriteria: validPassed,
      criteriaDetails: initialCriteriaDetails,
      mentorNote: curMonthData.note || member.mentorNote || '',
      advicePlan: curMonthData.plan || member.advicePlan || '',
      userSelfScore: curMonthData.userSelfScore !== undefined ? curMonthData.userSelfScore : 85,
      userSelfStatus: curMonthData.userSelfStatus || 'ประเมินแล้ว',
      userSelfNote: curMonthData.userSelfNote || 'นักศึกษาได้บันทึกการเรียนรู้และส่งผลงานในเดือนนี้เรียบร้อยแล้ว',
      userSelfEvidence: curMonthData.userSelfEvidence || 'https://github.com/sut-student/project-portfolio',
      userSelfPassedCriteria: curMonthData.userSelfPassedCriteria || validPassed,
    })
    setSaveSuccessMsg('')
    setCustomSkillText('')
    setShowMemberDetailModal(true)
  }

  // Switch member inside modal
  const handleSwitchMember = (targetIdx) => {
    const mems = activeGroup?.members || []
    if (targetIdx >= 0 && targetIdx < mems.length) {
      handleOpenMemberDetail(mems[targetIdx])
    }
  }

  // Get custom careers saved in localStorage
  const getCustomCareersFromStorage = () => {
    try {
      const saved = localStorage.getItem('icp_career_list')
      if (saved) {
        const list = JSON.parse(saved)
        if (Array.isArray(list)) {
          return list.filter((c) => !CAREER_PRESETS.some((p) => p.id === c.id || p.shortTitle === c.title || p.title === c.title))
        }
      }
    } catch (e) {
      console.error('Error reading custom careers:', e)
    }
    return []
  }

  // Career Selection & Preset Loading
  const handleSelectCareerPreset = (careerTitle, autoLoad = false) => {
    if (!selectedMember) return
    if (careerTitle === 'other') {
      const updatedMember = {
        ...selectedMember,
        careerGoal:
          selectedMember.careerGoal &&
          !CAREER_PRESETS.some((p) => p.shortTitle === selectedMember.careerGoal || p.title === selectedMember.careerGoal)
            ? selectedMember.careerGoal
            : 'อื่นๆ (ระบุชื่ออาชีพเอง)',
      }
      setSelectedMember(updatedMember)
      onUpdateMemberProgress(activeGroup.id, updatedMember)
      setSaveSuccessMsg(`เลือกโหมด "อื่นๆ" เรียบร้อย สามารถพิมพ์ชื่ออาชีพและเพิ่มทักษะเฉพาะด้านได้ตามต้องการ`)
      setTimeout(() => setSaveSuccessMsg(''), 3500)
      setTimeout(() => {
        document.getElementById('member-career-custom-input')?.focus()
      }, 150)
      return
    }

    const matched = CAREER_PRESETS.find((p) => p.title === careerTitle || p.id === careerTitle || p.shortTitle === careerTitle)
    const newCareer = matched ? matched.title : careerTitle

    const updatedMember = {
      ...selectedMember,
      careerGoal: newCareer,
    }

    if (autoLoad && matched) {
      setMemberSkills(matched.skills)
      updatedMember.skills = matched.skills
    }

    setSelectedMember(updatedMember)
    onUpdateMemberProgress(activeGroup.id, updatedMember)
    setSaveSuccessMsg(`อัปเดตอาชีพเป้าหมายของ "${selectedMember.name}" เป็น "${newCareer}" เรียบร้อย!`)
    setTimeout(() => setSaveSuccessMsg(''), 3500)
  }

  // Update Individual Skill Rating (1-5 Stars)
  const handleSkillRatingChange = (skillId, newLevel) => {
    const updated = memberSkills.map((s) => (s.id === skillId ? { ...s, level: newLevel } : s))
    setMemberSkills(updated)
  }

  // Update Individual Skill Status
  const handleSkillStatusChange = (skillId, newStatus) => {
    const updated = memberSkills.map((s) => (s.id === skillId ? { ...s, status: newStatus } : s))
    setMemberSkills(updated)
  }

  // Delete Individual Skill
  const handleDeleteIndividualSkill = (skillId) => {
    const updated = memberSkills.filter((s) => s.id !== skillId)
    setMemberSkills(updated)
    if (selectedMember) {
      const updatedMember = { ...selectedMember, skills: updated }
      setSelectedMember(updatedMember)
      onUpdateMemberProgress(activeGroup.id, updatedMember)
    }
  }

  // Inline edit skill name handlers
  const handleStartEditSkill = (skill) => {
    setEditingSkillId(skill.id)
    setEditingSkillName(skill.name)
  }

  const handleSaveSkillName = (skillId) => {
    if (!editingSkillName.trim()) return
    const updated = memberSkills.map((s) => (s.id === skillId ? { ...s, name: editingSkillName.trim() } : s))
    setMemberSkills(updated)
    setEditingSkillId(null)
    if (selectedMember) {
      const updatedMember = { ...selectedMember, skills: updated }
      setSelectedMember(updatedMember)
      onUpdateMemberProgress(activeGroup.id, updatedMember)
    }
    setSaveSuccessMsg(`แก้ไขชื่อทักษะเป็น "${editingSkillName.trim()}" เรียบร้อย`)
    setTimeout(() => setSaveSuccessMsg(''), 3000)
  }

  const handleCancelEditSkill = () => {
    setEditingSkillId(null)
    setEditingSkillName('')
  }

  // Quick edit hours directly on card
  const handleSkillHoursChange = (skillId, newHours) => {
    const updated = memberSkills.map((s) => (s.id === skillId ? { ...s, hours: newHours } : s))
    setMemberSkills(updated)
    if (selectedMember) {
      const updatedMember = { ...selectedMember, skills: updated }
      setSelectedMember(updatedMember)
      onUpdateMemberProgress(activeGroup.id, updatedMember)
    }
  }

  // Quick Add Custom Skill (Type directly from top bar)
  const handleQuickAddSkill = (e) => {
    e?.preventDefault?.()
    if (!quickSkillName.trim()) {
      alert('กรุณากรอกชื่อทักษะที่ต้องการเพิ่ม')
      return
    }

    const newSkill = {
      id: Date.now(),
      name: quickSkillName.trim(),
      category: quickSkillCat,
      level: 4,
      targetLevel: 5,
      status: 'กำลังพัฒนา',
      hours: quickSkillHours ? (quickSkillHours.includes('ชม.') ? quickSkillHours : `${quickSkillHours} ชม.`) : '25 ชม.',
      images: [],
      note: '',
      evalLevel: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
    }

    const updated = [...memberSkills, newSkill]
    setMemberSkills(updated)
    if (selectedMember) {
      const updatedMember = { ...selectedMember, skills: updated }
      setSelectedMember(updatedMember)
      onUpdateMemberProgress(activeGroup.id, updatedMember)
    }

    setQuickSkillName('')
    setQuickSkillHours('25')
    setSaveSuccessMsg(`เพิ่มทักษะ "${newSkill.name}" สำเร็จเรียบร้อย!`)
    setTimeout(() => setSaveSuccessMsg(''), 3500)
  }

  // Add New Individual Skill (with category & custom category support)
  const handleAddIndividualSkill = (e) => {
    e?.preventDefault?.()
    if (!newSkillForm.name.trim()) return

    let finalCategory = 'ทักษะทางเทคนิค (Technical Skills)'
    if (selectedCatId === 'other') {
      finalCategory = customCatText.trim() ? customCatText.trim() : 'อื่นๆ (กำหนดเอง)'
    } else {
      const found = categoryOptions.find((c) => c.id === selectedCatId)
      finalCategory = found ? found.name : 'ทักษะทางเทคนิค (Technical Skills)'
    }

    const newSkill = {
      id: Date.now(),
      name: newSkillForm.name.trim(),
      category: finalCategory,
      level: 4,
      targetLevel: Number(newSkillForm.targetLevel) || 5,
      status: 'กำลังพัฒนา',
      hours: newSkillHours || '15',
      images: [],
      note: '',
      evalLevel: '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
    }

    setMemberSkills([...memberSkills, newSkill])
    setNewSkillForm({
      name: '',
      category: 'Technical Skills',
      targetLevel: 5,
    })
    setCustomCatText('')
    setIsCatDropdownOpen(false)
  }

  // Open & Close Add Individual Skill Popup Modal
  const handleOpenAddSkillModal = () => {
    setAddSkillModalData({
      name: '',
      categoryId: selectedCatId || 'tech',
      customCategory: '',
      hours: '15',
      level: 4,
      status: 'กำลังพัฒนา',
      note: '',
    })
    setIsCatDropdownOpen(false)
    setShowAddSkillModal(true)
  }

  const handleCloseAddSkillModal = () => {
    setShowAddSkillModal(false)
    setIsCatDropdownOpen(false)
  }

  const handleSaveAddSkillFromModal = (e) => {
    e?.preventDefault?.()
    if (!addSkillModalData.name.trim()) {
      alert('กรุณาระบุชื่อทักษะที่ต้องการเพิ่ม')
      return
    }

    let finalCategory = 'ทักษะทางเทคนิค (Technical Skills)'
    if (addSkillModalData.categoryId === 'other') {
      finalCategory = addSkillModalData.customCategory.trim() ? addSkillModalData.customCategory.trim() : 'อื่นๆ (กำหนดเอง)'
    } else {
      const found = categoryOptions.find((c) => c.id === addSkillModalData.categoryId)
      finalCategory = found ? found.name : 'ทักษะทางเทคนิค (Technical Skills)'
    }

    const newSkill = {
      id: Date.now(),
      name: addSkillModalData.name.trim(),
      category: finalCategory,
      level: Number(addSkillModalData.level) || 4,
      targetLevel: 5,
      status: addSkillModalData.status || 'กำลังพัฒนา',
      hours: addSkillModalData.hours ? (addSkillModalData.hours.includes('ชม.') ? addSkillModalData.hours : `${addSkillModalData.hours} ชม.`) : '15 ชม.',
      images: [],
      note: addSkillModalData.note || '',
      evalLevel: addSkillModalData.level === 5 ? evaluationOptions[4] : addSkillModalData.level === 4 ? evaluationOptions[3] : addSkillModalData.level === 3 ? evaluationOptions[2] : evaluationOptions[1],
    }

    const updated = [...memberSkills, newSkill]
    setMemberSkills(updated)
    if (selectedMember) {
      const updatedMember = { ...selectedMember, skills: updated }
      setSelectedMember(updatedMember)
      onUpdateMemberProgress(activeGroup.id, updatedMember)
    }

    setShowAddSkillModal(false)
    setSaveSuccessMsg(`เพิ่มทักษะ "${newSkill.name}" ในป๊อปอัปสำเร็จเรียบร้อย!`)
    setTimeout(() => setSaveSuccessMsg(''), 3500)
  }

  // Open Assessment Modal for specific member skill
  const handleOpenSkillEvalModal = (skill) => {
    setSelectedSkillEvalModal(skill)
    setIsEvalDropdownOpen(false)
    const isPassed = Boolean(skill.status?.includes('ผ่าน') && !skill.status?.includes('ไม่ผ่าน'))
    setEvalModalData({
      name: skill.name || '',
      level: skill.evalLevel || (skill.level === 5 ? evaluationOptions[4] : skill.level === 4 ? evaluationOptions[3] : skill.level === 3 ? evaluationOptions[2] : evaluationOptions[1]),
      hours: skill.hours ? skill.hours.replace(/[^0-9.]/g, '') || '25' : '25',
      images: skill.images || [],
      note: skill.note || '',
      decision: isPassed ? 'passed' : 'failed',
    })
  }

  // Open Assessment Modal from Monthly Evaluation (+ เพิ่มทักษะ หรือคลิกที่เกณฑ์)
  const handleOpenMonthlySkillModal = (skillNameOrIdx) => {
    const activeMonthsList = getMonthsList(selectedMember)
    const currentMonthDef = activeMonthsList[activeMonthIdx] || DEFAULT_12_MONTHS_SYLLABUS[activeMonthIdx]
    const currentMonthName = currentMonthDef?.shortMonth 
      ? `${currentMonthDef.shortMonth} 2568 (เดือนล่าสุด)` 
      : 'สิงหาคม 2568 (เดือนล่าสุด)'
    const categoryName = selectedMember?.careerGoal || 'เทคโนโลยีสารสนเทศ/IT'

    let skillObj = null
    if (typeof skillNameOrIdx === 'number') {
      const name = evaluationData.criteria[skillNameOrIdx]
      const isPassed = (evaluationData.passedCriteria || []).includes(skillNameOrIdx)
      const detail = (evaluationData.criteriaDetails || {})[skillNameOrIdx] || {}
      const hasSub = hasCriterionSubmission(skillNameOrIdx, evaluationData.criteriaDetails)
      const initialDecision = isPassed ? 'passed' : (detail.superDecision === 'failed' ? 'failed' : (hasSub ? 'failed' : 'passed'))
      skillObj = {
        id: `criteria-${skillNameOrIdx}`,
        name: name,
        category: categoryName,
        monthContext: currentMonthName,
        isCriteria: true,
        criteriaIdx: skillNameOrIdx,
        evalLevel: detail.level || (isPassed ? evaluationOptions[4] : ''),
        hours: detail.hours || (evaluationData.hours ? evaluationData.hours.replace(/[^0-9.]/g, '') || '' : ''),
        images: detail.images || [],
        note: detail.note || '',
        decision: initialDecision,
      }
    } else {
      const initialName = (typeof skillNameOrIdx === 'string' && skillNameOrIdx.trim()) 
        ? skillNameOrIdx.trim() 
        : (customSkillText.trim() || 'คอมพิวเตอร์และเทคโนโลยีสารสนเทศ')
      skillObj = {
        id: `new-criteria-${Date.now()}`,
        name: initialName,
        category: categoryName,
        monthContext: currentMonthName,
        isNewCriteria: true,
        evalLevel: '',
        hours: '20',
        images: [],
        note: '',
        decision: 'passed',
      }
    }

    setSelectedSkillEvalModal(skillObj)
    setIsEvalDropdownOpen(false)
    setEvalModalData({
      name: skillObj.name,
      level: skillObj.evalLevel || '',
      hours: skillObj.hours || '',
      images: skillObj.images || [],
      note: skillObj.note || '',
      decision: skillObj.decision || 'passed',
    })
  }

  // Close Skill Eval Modal
  const handleCloseSkillEvalModal = () => {
    setSelectedSkillEvalModal(null)
    setIsEvalDropdownOpen(false)
  }

  // Image Upload for Super User Skill Assessment
  const handleSkillImageUpload = (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (uploadEvent) => {
        const dataUrl = uploadEvent.target.result
        setEvalModalData((prev) => ({
          ...prev,
          images: [...(prev.images || []), dataUrl],
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  // Remove Photo from Super User Skill Assessment
  const handleRemoveSkillImage = (imageIndex) => {
    setEvalModalData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, idx) => idx !== imageIndex),
    }))
  }

  // AI Assist Evaluation for Super User
  const handleAiAssistSkillEval = () => {
    const suggested = evaluationOptions[4] || evaluationOptions[3]
    setEvalModalData((prev) => ({
      ...prev,
      level: suggested,
    }))
    setIsEvalDropdownOpen(false)
    alert(`AI แนะนำระดับการประเมินสำหรับ "${evalModalData.name || selectedSkillEvalModal.name}":\n\nระดับ 5: "ได้ถ่ายทอดทักษะนี้แก่ผู้อื่น หรือเป็นต้นแบบของทักษะนี้แก่ผู้อื่น"`)
  }

  // Save Skill Eval Modal
  const handleSaveSkillEval = () => {
    if (!selectedSkillEvalModal || !selectedMember) return
    const skillName = (evalModalData.name || selectedSkillEvalModal.name || '').trim()
    if (!skillName) {
      alert('กรุณาระบุชื่อทักษะ')
      return
    }

    // Must have at least 1 form of evidence / submission (photo not mandatory, but must have at least one)
    const hasAnySubmission = Boolean(
      (evalModalData.level && evalModalData.level.trim() !== '') ||
      (evalModalData.hours && (parseInt(evalModalData.hours, 10) > 0 || String(evalModalData.hours).trim() !== '')) ||
      (evalModalData.note && evalModalData.note.trim().length > 0) ||
      (evalModalData.images && evalModalData.images.length > 0)
    )

    if (!hasAnySubmission) {
      alert(
        '⚠️ ยังไม่สามารถบันทึกผลได้:\n\n' +
        'กรุณาระบุข้อมูลอย่างน้อย 1 รายการ\n' +
        '(เช่น เลือกระดับประเมิน, จำนวนชั่วโมง, เขียนบันทึกผลงาน หรือแนบรูปภาพ — ไม่จำเป็นต้องมีรูป แต่ต้องมีอย่างใดอย่างหนึ่ง) เพื่อใช้เป็นเกณฑ์การประเมิน'
      )
      return
    }

    // Determine whether criterion is mastered/passed
    // Super User decision has top priority: can explicitly award Pass or Fail
    let isMastered = false
    if (evalModalData.decision === 'failed') {
      isMastered = false
    } else if (evalModalData.decision === 'passed') {
      isMastered = true
    } else {
      if (evalModalData.level) {
        isMastered = evalModalData.level.includes('5.') || evalModalData.level.includes('4.') || evalModalData.level.includes('3.') || evalModalData.level.includes('(Yes)')
      } else {
        isMastered = true
      }
    }

    const newStarLevel = evalModalData.level?.includes('5.') ? 5 : evalModalData.level?.includes('4.') ? 4 : evalModalData.level?.includes('3.') ? 3 : evalModalData.level?.includes('2.') ? 2 : (evalModalData.level ? 1 : 3)

    if (selectedSkillEvalModal.isNewCriteria) {
      // Add as new skill in Monthly Evaluation criteria
      const updatedCriteria = [...(evaluationData.criteria || []), skillName]
      const newIdx = updatedCriteria.length - 1
      const updatedPassed = isMastered 
        ? [...(evaluationData.passedCriteria || []), newIdx]
        : (evaluationData.passedCriteria || [])
      const calculatedScore = calcAutoScore(updatedPassed, updatedCriteria)
      const updatedDetails = {
        ...(evaluationData.criteriaDetails || {}),
        [newIdx]: {
          level: evalModalData.level,
          hours: evalModalData.hours || '',
          images: evalModalData.images || [],
          note: evalModalData.note || '',
          superDecision: isMastered ? 'passed' : 'failed',
        },
      }

      setEvaluationData({
        ...evaluationData,
        criteria: updatedCriteria,
        passedCriteria: updatedPassed,
        criteriaDetails: updatedDetails,
        score: autoSyncScore ? calculatedScore : evaluationData.score,
        status: autoSyncScore ? getStatusFromScore(calculatedScore) : evaluationData.status,
        passedSkills: `${updatedPassed.length} ทักษะ`,
        hours: evalModalData.hours ? `${evalModalData.hours} ชม.` : evaluationData.hours,
      })
      setCustomSkillText('')

      // Also add to member individual skills matrix
      const newMemberSkill = {
        id: Date.now(),
        name: skillName,
        category: selectedSkillEvalModal.category || 'Technical Skills',
        level: newStarLevel,
        status: isMastered ? 'ผ่านเกณฑ์แล้ว' : 'ไม่ผ่านเกณฑ์ (กำลังพัฒนา)',
        hours: evalModalData.hours ? `${evalModalData.hours} ชม.` : '20 ชม.',
        images: evalModalData.images || [],
        note: evalModalData.note || '',
        evalLevel: evalModalData.level,
      }
      setMemberSkills((prev) => [...prev, newMemberSkill])
    } else if (selectedSkillEvalModal.isCriteria) {
      // Update existing Monthly Evaluation criteria
      const cIdx = selectedSkillEvalModal.criteriaIdx
      const currentPassed = evaluationData.passedCriteria || []
      let updatedPassed = currentPassed
      if (isMastered && !currentPassed.includes(cIdx)) {
        updatedPassed = [...currentPassed, cIdx]
      } else if (!isMastered && currentPassed.includes(cIdx)) {
        updatedPassed = currentPassed.filter((x) => x !== cIdx)
      }

      const updatedCriteria = [...(evaluationData.criteria || [])]
      updatedCriteria[cIdx] = skillName
      const calculatedScore = calcAutoScore(updatedPassed, updatedCriteria)
      const updatedDetails = {
        ...(evaluationData.criteriaDetails || {}),
        [cIdx]: {
          level: evalModalData.level,
          hours: evalModalData.hours || '',
          images: evalModalData.images || [],
          note: evalModalData.note || '',
          superDecision: isMastered ? 'passed' : 'failed',
        },
      }

      setEvaluationData({
        ...evaluationData,
        criteria: updatedCriteria,
        passedCriteria: updatedPassed,
        criteriaDetails: updatedDetails,
        score: autoSyncScore ? calculatedScore : evaluationData.score,
        status: autoSyncScore ? getStatusFromScore(calculatedScore) : evaluationData.status,
        passedSkills: `${updatedPassed.length} ทักษะ`,
        hours: evalModalData.hours ? `${evalModalData.hours} ชม.` : evaluationData.hours,
      })
    } else {
      // Update Individual Skill in Subtab 2
      const updatedSkills = memberSkills.map((s) => {
        if (s.id === selectedSkillEvalModal.id) {
          return {
            ...s,
            name: skillName,
            evalLevel: evalModalData.level,
            level: newStarLevel,
            hours: evalModalData.hours ? `${evalModalData.hours} ชม.` : s.hours,
            images: evalModalData.images,
            note: evalModalData.note,
            status: isMastered ? 'ผ่านเกณฑ์แล้ว' : 'ไม่ผ่านเกณฑ์ (กำลังพัฒนา)',
          }
        }
        return s
      })

      setMemberSkills(updatedSkills)
      const updatedMember = {
        ...selectedMember,
        skills: updatedSkills,
      }
      setSelectedMember(updatedMember)
      onUpdateMemberProgress(activeGroup.id, updatedMember)
    }

    const durationInfo = evalModalData.hours ? `, เวลาที่ใช้: ${evalModalData.hours} ชม.` : ''
    alert(`บันทึกผลการประเมินทักษะ "${skillName}" เรียบร้อยแล้ว!\nผลการตัดสินโดย Super User: ${isMastered ? '✓ ผ่านเกณฑ์แล้ว' : '✕ ไม่ผ่านเกณฑ์ (กำลังพัฒนา)'}${durationInfo}`)
    handleCloseSkillEvalModal()
  }

  // Save Member Individual Skills Matrix
  const handleSaveMemberSkills = (e) => {
    e?.preventDefault?.()
    if (!selectedMember || !activeGroup) return

    const updatedMember = {
      ...selectedMember,
      skills: memberSkills,
    }

    setSelectedMember(updatedMember)
    onUpdateMemberProgress(activeGroup.id, updatedMember)
    setSaveSuccessMsg(`บันทึกชุดทักษะเฉพาะบุคคลของ "${selectedMember.name}" เรียบร้อยแล้ว! (${memberSkills.length} ทักษะ)`)
    setTimeout(() => setSaveSuccessMsg(''), 4000)
  }

  // Switch active month in modal
  const handleSelectMonth = (idx) => {
    if (!selectedMember) return
    setActiveMonthIdx(idx)
    const months = getMonthsList(selectedMember)
    const targetMonth = months[idx] || DEFAULT_12_MONTHS_SYLLABUS[idx]
    const criteria = targetMonth.criteria || DEFAULT_12_MONTHS_SYLLABUS[idx]?.criteria || []
    const targetDetails = targetMonth.criteriaDetails || (idx === 7 ? {
      0: {
        level: '5.ได้ถ่ายทอดทักษะนี้แก่ผู้อื่น หรือเป็นต้นแบบของทักษะนี้แก่ผู้อื่น',
        hours: targetMonth.hours ? String(parseInt(targetMonth.hours)) : '30',
        images: [],
        note: targetMonth.note || 'ผ่านการซ้อมสัมภาษณ์ Mock Interview กับพี่เลี้ยง DSS มทส.',
        superDecision: 'passed',
      },
      1: {
        level: '2.ได้เรียนทักษะนี้บ้างและพอทำได้ ถึงแม้จะน้อยกว่าคนทั่วไป',
        hours: '12',
        images: [],
        note: 'กำลังศึกษาและฝึกทักษะ Soft Skills และการปรับตัวเข้ากับวัฒนธรรมองค์กร',
        superDecision: 'failed',
      },
    } : {})

    const rawPassed = Array.isArray(targetMonth.passedCriteria) ? targetMonth.passedCriteria : (targetMonth.score > 0 ? [0] : [])
    const validPassed = rawPassed.filter((cIdx) => hasCriterionSubmission(cIdx, targetDetails))
    const calculatedScore = targetMonth.score !== undefined ? targetMonth.score : calcAutoScore(validPassed, criteria)

    setEvaluationData({
      topic: targetMonth.topic || DEFAULT_12_MONTHS_SYLLABUS[idx]?.topic || '',
      score: calculatedScore,
      status: targetMonth.status || getStatusFromScore(calculatedScore),
      passedSkills: `${validPassed.length} ทักษะ`,
      hours: targetMonth.hours || '-',
      criteria: criteria,
      passedCriteria: validPassed,
      criteriaDetails: targetDetails,
      mentorNote: targetMonth.note || '',
      advicePlan: targetMonth.plan || '',
      userSelfScore: targetMonth.userSelfScore !== undefined ? targetMonth.userSelfScore : (targetMonth.score > 0 ? targetMonth.score : 0),
      userSelfStatus: targetMonth.userSelfStatus || (targetMonth.score > 0 ? 'ประเมินตนเองแล้ว' : 'ยังไม่ถึงรอบประเมิน'),
      userSelfNote: targetMonth.userSelfNote || '',
      userSelfEvidence: targetMonth.userSelfEvidence || '',
      userSelfPassedCriteria: targetMonth.userSelfPassedCriteria || validPassed,
    })
    setSaveSuccessMsg('')
    setCustomSkillText('')
  }

  // Toggle criteria item passed/pending & auto-adjust score
  const handleToggleCriteria = (cIdx) => {
    const currentPassed = evaluationData.passedCriteria || []
    let newPassed = []
    const updatedDetails = { ...(evaluationData.criteriaDetails || {}) }

    if (currentPassed.includes(cIdx)) {
      // Super user toggles off -> mark as not passed / failed
      newPassed = currentPassed.filter((item) => item !== cIdx)
      updatedDetails[cIdx] = {
        ...(updatedDetails[cIdx] || {}),
        superDecision: 'failed',
      }
    } else {
      // Must have at least 1 piece of evidence/data to pass!
      const hasSubmission = hasCriterionSubmission(cIdx, evaluationData.criteriaDetails)
      if (!hasSubmission) {
        alert(
          `⚠️ ยังไม่สามารถให้ "ผ่านเกณฑ์" ได้\n\n` +
          `เนื่องจากเกณฑ์ "${evaluationData.criteria[cIdx] || 'ข้อนี้'}" ยังไม่มีข้อมูลส่งหรือประเมิน\n\n` +
          `📌 เงื่อนไขการผ่านเกณฑ์: ต้องมีข้อมูลอย่างน้อย 1 รายการ\n` +
          `(เลือกระดับประเมิน, บันทึกชั่วโมง, เขียนบันทึกผลงาน หรือแนบรูปภาพ — ไม่จำเป็นต้องมีรูป แต่ต้องมีอย่างใดอย่างหนึ่ง)\n\n` +
          `ระบบจะเปิดหน้าต่างประเมินให้คุณระบุข้อมูลทันที`
        )
        handleOpenMonthlySkillModal(cIdx)
        return
      }
      newPassed = [...currentPassed, cIdx]
      updatedDetails[cIdx] = {
        ...(updatedDetails[cIdx] || {}),
        superDecision: 'passed',
      }
    }

    const calculatedScore = calcAutoScore(newPassed, evaluationData.criteria)
    const calculatedStatus = getStatusFromScore(calculatedScore)

    setEvaluationData({
      ...evaluationData,
      passedCriteria: newPassed,
      criteriaDetails: updatedDetails,
      score: autoSyncScore ? calculatedScore : evaluationData.score,
      status: autoSyncScore ? calculatedStatus : evaluationData.status,
      passedSkills: `${newPassed.length} ทักษะ`,
    })
  }

  // Add Custom Skill / Criteria to this month
  const handleAddCustomSkill = (e) => {
    e?.preventDefault?.()
    const trimmed = customSkillText.trim()
    if (!trimmed) return

    const updatedCriteria = [...(evaluationData.criteria || []), trimmed]
    // Do NOT auto-pass without evidence:
    const calculatedScore = calcAutoScore(evaluationData.passedCriteria, updatedCriteria)

    setEvaluationData({
      ...evaluationData,
      criteria: updatedCriteria,
      score: autoSyncScore ? calculatedScore : evaluationData.score,
      status: autoSyncScore ? getStatusFromScore(calculatedScore) : evaluationData.status,
    })
    setCustomSkillText('')
    handleOpenMonthlySkillModal(updatedCriteria.length - 1)
  }

  // Remove Criteria from this month
  const handleRemoveCriteria = (indexToRemove, e) => {
    e?.stopPropagation?.()
    const updatedCriteria = (evaluationData.criteria || []).filter((_, idx) => idx !== indexToRemove)
    const updatedPassed = (evaluationData.passedCriteria || [])
      .filter((idx) => idx !== indexToRemove)
      .map((idx) => (idx > indexToRemove ? idx - 1 : idx))

    const calculatedScore = calcAutoScore(updatedPassed, updatedCriteria)

    setEvaluationData({
      ...evaluationData,
      criteria: updatedCriteria,
      passedCriteria: updatedPassed,
      score: autoSyncScore ? calculatedScore : evaluationData.score,
      status: autoSyncScore ? getStatusFromScore(calculatedScore) : evaluationData.status,
      passedSkills: `${updatedPassed.length} ทักษะ`,
    })
  }

  // Force sync score from passed criteria now
  const handleForceSyncScore = () => {
    const calculatedScore = calcAutoScore(evaluationData.passedCriteria, evaluationData.criteria)
    setEvaluationData({
      ...evaluationData,
      score: calculatedScore,
      status: getStatusFromScore(calculatedScore),
      passedSkills: `${evaluationData.passedCriteria?.length || 0} ทักษะ`,
    })
  }

  // Randomize Mock Evaluation for demonstration
  const handleRandomizeMockEvaluation = () => {
    const criteria = evaluationData.criteria || []
    if (criteria.length === 0) return

    const mockLevelsPassed = [
      '4.ได้ใช้ทักษะนี้ประจำหรือในงานและทำได้ดีกว่าคนทั่วไป',
      '5.ได้ถ่ายทอดทักษะนี้แก่ผู้อื่น หรือเป็นต้นแบบของทักษะนี้แก่ผู้อื่น',
      '3.ได้มีประสบการณ์ในการใช้ทักษะนี้เป็นครั้งคราว และทำได้เทียบเท่ากับคนทั่วไป',
    ]
    const mockLevelsDev = [
      '2.ได้เรียนทักษะนี้บ้างและพอทำได้ ถึงแม้จะน้อยกว่าคนทั่วไป',
      '1.มีความรู้หรือเคยได้ยิน แต่ยังไม่เคยลงมือปฏิบัติ',
    ]

    const mockPassedNotes = [
      'ปฏิบัติการฝึกฝนและทำแบบประเมินผลงานผ่านเกณฑ์มาตรฐาน DSS มทส. เรียบร้อยแล้ว ผลงานยอดเยี่ยม',
      'ผ่านการทดสอบทักษะภาคปฏิบัติ ส่งชิ้นงานการพัฒนาครบถ้วนและตอบคำถามเชิงลึกได้เป็นอย่างดี',
      'นำความรู้ไปประยุกต์ใช้จริงและผ่านเกณฑ์การประเมินจากพี่เลี้ยงที่ปรึกษาอย่างน่าพึงพอใจ',
      'มีผลงานเป็นรูปธรรม ชิ้นงานตรงตามข้อกำหนดและสามารถเป็นแบบอย่างในการทำงานได้',
    ]
    const mockDevNotes = [
      'กำลังศึกษาค้นคว้าและฝึกฝนเพิ่มเติมตามคำแนะนำของพี่เลี้ยง ยังต้องปรับปรุงรายละเอียดบางส่วน',
      'อยู่ระหว่างขั้นตอนการลงมือปฏิบัติและทดลองใช้งาน ยังต้องการคำแนะนำและเวลาในการฝึกทักษะเพิ่ม',
      'เริ่มทำความเข้าใจแนวคิดหลักแล้ว รอส่งชิ้นงานและหลักฐานการประเมินฉบับสมบูรณ์',
    ]

    const mockImages = [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&auto=format&fit=crop&q=60',
    ]

    // Determine target passed count (random between 1 and criteria.length)
    const targetPassedCount = Math.floor(Math.random() * criteria.length) + 1
    const shuffledIndices = criteria.map((_, idx) => idx).sort(() => Math.random() - 0.5)
    const passedSet = new Set(shuffledIndices.slice(0, targetPassedCount))

    const newDetails = {}
    let totalHours = 0

    criteria.forEach((crit, idx) => {
      const willPass = passedSet.has(idx)
      if (willPass) {
        const hrs = Math.floor(Math.random() * 16) + 15 // 15 - 30 hrs
        totalHours += hrs
        const withImg = Math.random() > 0.6
        newDetails[idx] = {
          level: mockLevelsPassed[Math.floor(Math.random() * mockLevelsPassed.length)],
          hours: String(hrs),
          images: withImg ? [mockImages[Math.floor(Math.random() * mockImages.length)]] : [],
          note: mockPassedNotes[Math.floor(Math.random() * mockPassedNotes.length)],
          superDecision: 'passed',
        }
      } else {
        // Either developing (70%) or empty/waiting (30%)
        const isDeveloping = Math.random() > 0.3
        if (isDeveloping) {
          const hrs = Math.floor(Math.random() * 10) + 4 // 4 - 13 hrs
          totalHours += hrs
          newDetails[idx] = {
            level: mockLevelsDev[Math.floor(Math.random() * mockLevelsDev.length)],
            hours: String(hrs),
            images: [],
            note: mockDevNotes[Math.floor(Math.random() * mockDevNotes.length)],
            superDecision: 'failed',
          }
        } else {
          // Empty / Waiting
          newDetails[idx] = {
            level: '',
            hours: '',
            images: [],
            note: '',
            superDecision: undefined,
          }
        }
      }
    })

    const newPassedCriteria = criteria
      .map((_, idx) => idx)
      .filter((idx) => passedSet.has(idx) && hasCriterionSubmission(idx, newDetails))

    const calculatedScore = calcAutoScore(newPassedCriteria, criteria)
    const calculatedStatus = getStatusFromScore(calculatedScore)

    const updatedEval = {
      ...evaluationData,
      passedCriteria: newPassedCriteria,
      criteriaDetails: newDetails,
      score: calculatedScore,
      status: calculatedStatus,
      passedSkills: `${newPassedCriteria.length} ทักษะ`,
      hours: `${totalHours > 0 ? totalHours : 20} ชม.`,
      mentorNote: `ประเมินสมรรถนะจำลอง (Mock) ประจำเดือน: นักศึกษาผ่านเกณฑ์ ${newPassedCriteria.length} จาก ${criteria.length} ทักษะ (${calculatedScore}%) ${newPassedCriteria.length === criteria.length ? 'ผลงานครบถ้วนยอดเยี่ยมตามเป้าหมาย' : 'มีบางทักษะที่กำลังพัฒนาและรอส่งหลักฐานเพิ่มเติม'}`,
      advicePlan: 'ติดตามผลการพัฒนาในเกณฑ์ที่เหลือ และดำเนินการตามแผนการเรียนรู้ต่อเนื่อง',
    }

    setEvaluationData(updatedEval)

    // Also sync to selectedMember's monthlyProgress if currently in member modal
    if (selectedMember && activeGroup) {
      const months = [...getMonthsList(selectedMember)]
      const curMonthDef = months[activeMonthIdx] || DEFAULT_12_MONTHS_SYLLABUS[activeMonthIdx]
      months[activeMonthIdx] = {
        ...curMonthDef,
        topic: updatedEval.topic,
        score: calculatedScore,
        status: calculatedStatus,
        passedSkills: `${newPassedCriteria.length} ทักษะ`,
        hours: `${totalHours > 0 ? totalHours : 20} ชม.`,
        criteria: criteria,
        passedCriteria: newPassedCriteria,
        criteriaDetails: newDetails,
        note: updatedEval.mentorNote,
        plan: updatedEval.advicePlan,
      }
      const updatedMember = {
        ...selectedMember,
        monthlyProgress: months,
      }
      setSelectedMember(updatedMember)
      onUpdateMemberProgress(activeGroup.id, updatedMember)
    }

    setSaveSuccessMsg(`🎲 สุ่มผลประเมินจำลอง (Mock) สำเร็จ! ผ่าน ${newPassedCriteria.length}/${criteria.length} ทักษะ (${calculatedScore}%)`)
    setTimeout(() => setSaveSuccessMsg(''), 4000)
  }

  // Save monthly evaluation & feedback
  const handleSaveMonthlyEvaluation = (e) => {
    e?.preventDefault?.()
    if (!activeGroup || !selectedMember) return

    const months = [...getMonthsList(selectedMember)]
    const currentMonthDef = months[activeMonthIdx] || DEFAULT_12_MONTHS_SYLLABUS[activeMonthIdx]

    // Updated single month data
    const updatedMonthData = {
      ...currentMonthDef,
      topic: evaluationData.topic,
      score: Number(evaluationData.score),
      status: evaluationData.status,
      passedSkills: evaluationData.passedSkills,
      hours: evaluationData.hours,
      criteria: evaluationData.criteria,
      passedCriteria: evaluationData.passedCriteria,
      criteriaDetails: evaluationData.criteriaDetails,
      note: evaluationData.mentorNote,
      plan: evaluationData.advicePlan,
      userSelfScore: evaluationData.userSelfScore,
      userSelfStatus: evaluationData.userSelfStatus,
      userSelfNote: evaluationData.userSelfNote,
      userSelfEvidence: evaluationData.userSelfEvidence,
      userSelfPassedCriteria: evaluationData.userSelfPassedCriteria,
    }

    months[activeMonthIdx] = updatedMonthData

    // Calculate overall progress from the most recent evaluated month or active month
    const evaluatedMonths = months.filter((m) => m.status !== 'ยังไม่ถึงรอบประเมิน' && m.score > 0)
    const latestScore = Number(evaluationData.score) > 0 
      ? Number(evaluationData.score) 
      : (evaluatedMonths.length > 0 ? evaluatedMonths[evaluatedMonths.length - 1].score : selectedMember.progressPct)

    const updatedMember = {
      ...selectedMember,
      progressPct: latestScore,
      status: evaluationData.status !== 'ยังไม่ถึงรอบประเมิน' ? evaluationData.status : selectedMember.status,
      mentorNote: evaluationData.mentorNote || selectedMember.mentorNote,
      advicePlan: evaluationData.advicePlan || selectedMember.advicePlan,
      lastEvaluated: `${currentMonthDef.monthName} (โดย Super User DSS)`,
      monthlyProgress: months,
      skills: memberSkills,
    }

    setSelectedMember(updatedMember)
    onUpdateMemberProgress(activeGroup.id, updatedMember)

    setShowEditMonthModal(false)
    setSaveSuccessMsg(`บันทึกผลการประเมินรอบเดือน ${currentMonthDef.monthName} เรียบร้อยแล้ว!`)
    setTimeout(() => {
      setSaveSuccessMsg('')
    }, 4000)
  }

  // Copy data from previous month
  const handleCopyFromPrevMonth = () => {
    if (activeMonthIdx === 0 || !selectedMember) return
    const months = getMonthsList(selectedMember)
    const prevMonth = months[activeMonthIdx - 1]
    if (prevMonth) {
      setEvaluationData({
        topic: prevMonth.topic || evaluationData.topic,
        score: prevMonth.score || 50,
        status: prevMonth.status || 'กำลังพัฒนาได้ดี',
        passedSkills: prevMonth.passedSkills || '1 ทักษะ',
        hours: prevMonth.hours || '15 ชม.',
        criteria: prevMonth.criteria || evaluationData.criteria,
        passedCriteria: prevMonth.passedCriteria || [0, 1],
        mentorNote: prevMonth.note ? `(ต่อยอดจาก ${prevMonth.shortMonth}) ` + prevMonth.note : '',
        advicePlan: prevMonth.plan || '',
        userSelfScore: prevMonth.userSelfScore || 50,
        userSelfStatus: prevMonth.userSelfStatus || 'ประเมินแล้ว',
        userSelfNote: prevMonth.userSelfNote || '',
        userSelfEvidence: prevMonth.userSelfEvidence || '',
        userSelfPassedCriteria: prevMonth.userSelfPassedCriteria || [0, 1],
      })
    }
  }

  // Create group submit
  const handleCreateGroupSubmit = (e) => {
    e.preventDefault()
    if (!groupFormData.name) {
      alert('กรุณากรอกชื่อกลุ่ม')
      return
    }

    const newGroup = {
      id: Date.now(),
      name: groupFormData.name,
      description: groupFormData.description || 'กลุ่มติดตามความก้าวหน้าและการพัฒนาอาชีพ ศูนย์บริการนักศึกษาพิการ (DSS)',
      dssName: groupFormData.dssName || 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      mentorName: groupFormData.mentorName || 'อ.ที่ปรึกษา / พี่เลี้ยงศูนย์บริการ DSS',
      createdAt: new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' }),
      members: [],
    }

    onAddGroup(newGroup)
    setSelectedGroupId(newGroup.id)
    setShowCreateGroupModal(false)
    setGroupFormData({
      name: '',
      description: '',
      dssName: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
      mentorName: 'อ.ที่ปรึกษา / พี่เลี้ยงศูนย์บริการ DSS',
    })
    alert(`สร้างกลุ่ม "${newGroup.name}" สำเร็จ!`)
  }

  // Open Edit Group Modal
  const handleOpenEditGroup = (groupToEdit = activeGroup) => {
    if (!groupToEdit) return
    setEditGroupFormData({
      id: groupToEdit.id,
      name: groupToEdit.name || '',
      description: groupToEdit.description || '',
      dssName: groupToEdit.dssName || groupToEdit.faculty || 'ศูนย์บริการนักศึกษาพิการ (DSS) มทส.',
      mentorName: groupToEdit.mentorName || 'อ.ที่ปรึกษา / พี่เลี้ยงศูนย์บริการ DSS',
    })
    setShowEditGroupModal(true)
  }

  // Submit Edit Group
  const handleEditGroupSubmit = (e) => {
    e.preventDefault()
    if (!editGroupFormData.name.trim()) {
      alert('กรุณากรอกชื่อกลุ่ม')
      return
    }

    const current = groupsList.find((g) => g.id === editGroupFormData.id) || activeGroup
    const updated = {
      ...current,
      name: editGroupFormData.name.trim(),
      description: editGroupFormData.description.trim() || 'กลุ่มติดตามความก้าวหน้าและการพัฒนาอาชีพ ศูนย์บริการนักศึกษาพิการ (DSS)',
      dssName: editGroupFormData.dssName.trim() || 'ศูนย์บริการนักศึกษาพิการ (DSS) มทส.',
      mentorName: editGroupFormData.mentorName.trim() || 'อ.ที่ปรึกษา / พี่เลี้ยงศูนย์บริการ DSS',
    }

    if (onUpdateGroup) {
      onUpdateGroup(updated)
    }
    setShowEditGroupModal(false)
    alert(`แก้ไขข้อมูลกลุ่ม "${updated.name}" สำเร็จเรียบร้อยแล้ว!`)
  }

  // Add member submit
  const handleAddMemberSubmit = (e) => {
    e.preventDefault()
    if (!selectedUserToAdd) {
      alert('กรุณาเลือกผู้ใช้งานที่ต้องการเพิ่มเข้ากลุ่ม')
      return
    }

    const userObj = allAvailableUsers.find((u) => u.id === Number(selectedUserToAdd))
    if (!userObj) return

    const initialMonths = getMonthsList({ progressPct: 60, status: 'กำลังพัฒนาได้ดี' })

    const newMember = {
      id: userObj.id,
      name: userObj.name,
      studentId: userObj.studentId || `B65${Math.floor(1000 + Math.random() * 9000)}`,
      email: userObj.email,
      major: userObj.major || 'วิทยาการคอมพิวเตอร์ (มทส.)',
      careerGoal: userObj.targetCareer || 'โปรแกรมเมอร์ (Full-Stack)',
      progressPct: 60,
      completedPlans: 2,
      totalPlans: 5,
      status: 'กำลังพัฒนาได้ดี',
      mentorNote: 'เริ่มต้นเข้ากลุ่มติดตามความก้าวหน้า DSS มทส.',
      advicePlan: 'จัดทำแผนพัฒนารายบุคคลประจำปี 2568',
      lastEvaluated: 'สิงหาคม 2568 (เพิ่งเพิ่มเข้ากลุ่ม)',
      monthlyProgress: initialMonths,
    }

    onAddMemberToGroup(activeGroup.id, newMember)
    setShowAddMemberModal(false)
    setSelectedUserToAdd('')
    alert(`เพิ่ม "${newMember.name}" เข้ากลุ่ม "${activeGroup.name}" เรียบร้อยแล้ว`)
  }

  // Calculate Group Average Progress
  const members = activeGroup?.members || []
  const avgProgress = members.length > 0
    ? Math.round(members.reduce((acc, m) => acc + (m.progressPct || 0), 0) / members.length)
    : 0

  // Filter available users to add with real-time search
  const availableUsersToAdd = allAvailableUsers
    .filter((u) => !members.some((m) => m.id === u.id))
    .filter((u) => {
      if (!userSearchQuery.trim()) return true
      const q = userSearchQuery.toLowerCase()
      return (
        u.name?.toLowerCase().includes(q) ||
        u.studentId?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.major?.toLowerCase().includes(q) ||
        u.faculty?.toLowerCase().includes(q)
      )
    })

  return (
    <div className="group-mgmt-container">
      {/* Top Banner */}
      <div className="group-mgmt-banner">
        <div className="group-banner-left">
          <div className="group-crown-badge">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div className="group-role-tag">SUPER USER : GROUP MENTOR & SUPERVISOR</div>
            <h1 className="group-banner-title">ระบบจัดการกลุ่มและติดตามความก้าวหน้า</h1>
            <p className="group-banner-subtitle">
              ดูแลผู้ใช้เฉพาะกลุ่มของตนเอง ตั้งกลุ่ม บันทึกผลการประเมิน ให้คำแนะนำ และติดตามพัฒนาการของสมาชิก
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn-create-group"
          onClick={() => setShowCreateGroupModal(true)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>สร้างกลุ่มใหม่</span>
        </button>
      </div>

      {/* Group Selector Cards */}
      <div className="group-tabs-scroll-row">
        {groupsList.map((grp) => {
          const isSelected = grp.id === activeGroup?.id
          const count = grp.members?.length || 0
          return (
            <div
              key={grp.id}
              className={`group-selector-card ${isSelected ? 'active' : ''}`}
              onClick={() => setSelectedGroupId(grp.id)}
            >
              <div className="group-card-top">
                <span className="group-card-title">{grp.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {isSelected && <span className="group-active-dot">กำลังดูอยู่</span>}
                  <button
                    type="button"
                    className="btn-card-quick-edit"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenEditGroup(grp)
                    }}
                    title="แก้ไขข้อมูลกลุ่มนี้"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  {groupsList.length > 1 && (
                    <button
                      type="button"
                      className="btn-card-quick-delete"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (window.confirm(`ต้องการลด/ลบกลุ่ม "${grp.name}" ใช่หรือไม่?`)) {
                          onDeleteGroup(grp.id)
                        }
                      }}
                      title="ลด/ลบกลุ่มนี้"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <span className="group-card-desc">{grp.description}</span>
              <div className="group-card-footer">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>{count} สมาชิก</span>
                </span>
                <span className="group-career-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="3" y1="21" x2="21" y2="21" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <polyline points="5 10 5 21" />
                    <polyline points="19 10 19 21" />
                    <polyline points="9 10 9 21" />
                    <polyline points="15 10 15 21" />
                    <polygon points="12 2 2 7 22 7" />
                  </svg>
                  <span>{grp.dssName || grp.faculty || 'DSS มทส.'}</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Active Group Details & Summary */}
      {activeGroup && (
        <div className="active-group-panel">
          <div className="group-summary-header">
            <div>
              <div className="group-active-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="3" y1="21" x2="21" y2="21" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <polyline points="5 10 5 21" />
                  <polyline points="19 10 19 21" />
                  <polyline points="9 10 9 21" />
                  <polyline points="15 10 15 21" />
                  <polygon points="12 2 2 7 22 7" />
                </svg>
                <span>{activeGroup.dssName || activeGroup.faculty || 'ศูนย์บริการนักศึกษาพิการ (DSS) มทส.'}</span>
              </div>
              <h2 className="active-group-name">{activeGroup.name}</h2>
              <p className="active-group-meta">
                ผู้ดูแลกลุ่ม: <strong>{activeGroup.mentorName || 'พี่เลี้ยงศูนย์บริการ DSS'}</strong> • สมาชิก: <strong>{members.length} คน</strong> • สร้างเมื่อ: {activeGroup.createdAt || '1 ม.ค. 68'}
              </p>
            </div>

            <div className="group-actions-right">
              <button
                type="button"
                className="btn-edit-group"
                onClick={() => handleOpenEditGroup(activeGroup)}
                title="แก้ไขข้อมูลกลุ่มนี้"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <span>แก้ไขกลุ่ม</span>
              </button>

              <button
                type="button"
                className="btn-add-member"
                onClick={() => setShowAddMemberModal(true)}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                <span>เพิ่มสมาชิกเข้ากลุ่ม</span>
              </button>

              {groupsList.length > 1 && (
                <button
                  type="button"
                  className="btn-delete-group"
                  onClick={() => {
                    if (window.confirm(`ต้องการลบกลุ่ม "${activeGroup.name}" ใช่หรือไม่?`)) {
                      onDeleteGroup(activeGroup.id)
                    }
                  }}
                  title="ลบกลุ่มนี้"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                  <span>ลด/ลบกลุ่ม</span>
                </button>
              )}
            </div>
          </div>

          {/* Group Metric Stats */}
          <div className="group-stats-strip">
            <div className="group-stat-box">
              <span className="stat-label">สมาชิกในกลุ่ม</span>
              <span className="stat-value">{members.length} คน</span>
            </div>
            <div className="group-stat-box">
              <span className="stat-label">ความก้าวหน้าเฉลี่ยของกลุ่ม</span>
              <div className="stat-progress-wrap">
                <span className="stat-value highlight">{avgProgress}%</span>
                <div className="stat-mini-bar">
                  <div className="stat-mini-fill" style={{ width: `${avgProgress}%` }}></div>
                </div>
              </div>
            </div>
            <div className="group-stat-box">
              <span className="stat-label">สมาชิกที่พร้อมยื่นสมัครงาน (&gt;80%)</span>
              <span className="stat-value text-green">
                {members.filter((m) => (m.progressPct || 0) >= 80).length} คน
              </span>
            </div>
          </div>

          {/* Members Table */}
          <div className="group-members-table-wrap">
            <div className="members-table-header">
              <h3 className="members-table-title">รายชื่อสมาชิกและความก้าวหน้ารายบุคคล</h3>
              <span className="members-table-hint" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>คลิก "ดูความก้าวหน้า &amp; บันทึกผล" เพื่อแก้ไขและประเมินสมาชิก</span>
              </span>
            </div>

            {members.length === 0 ? (
              <div className="empty-members-box">
                <p>ยังไม่มีสมาชิกในกลุ่มนี้</p>
                <button
                  type="button"
                  className="btn-add-member"
                  onClick={() => setShowAddMemberModal(true)}
                >
                  + เพิ่มสมาชิกคนแรก
                </button>
              </div>
            ) : (
              <table className="members-table">
                <thead>
                  <tr>
                    <th>สมาชิก</th>
                    <th>รหัส / สาขา</th>
                    <th>อาชีพเป้าหมาย</th>
                    <th style={{ width: '220px' }}>ความก้าวหน้า (Progress)</th>
                    <th>สถานะ / คำแนะนำล่าสุด</th>
                    <th style={{ textAlign: 'center' }}>การจัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id}>
                      {/* Member profile */}
                      <td>
                        <div className="member-profile-block">
                          <div className="member-avatar">{member.name.charAt(0)}</div>
                          <div>
                            <span className="member-name">{member.name}</span>
                            <span className="member-email">{member.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* ID & Major */}
                      <td>
                        <div className="member-academic-info">
                          <span className="member-code">{member.studentId}</span>
                          <span className="member-major">{member.major}</span>
                        </div>
                      </td>

                      {/* Career Goal */}
                      <td>
                        <span className="member-career-pill">{member.careerGoal}</span>
                      </td>

                      {/* Progress */}
                      <td>
                        <div className="member-progress-cell">
                          <div className="progress-num-row">
                            <span className="progress-num-text">{member.progressPct || 0}%</span>
                            <span className="progress-plan-count">
                              แผน: {member.completedPlans || 0}/{member.totalPlans || 4} สำเร็จ
                            </span>
                          </div>
                          <div className="progress-bar-track">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: `${member.progressPct || 0}%`,
                                backgroundColor: (member.progressPct || 0) >= 80 ? '#10b981' : (member.progressPct || 0) >= 60 ? '#2563eb' : '#f59e0b',
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Status & Mentor Note */}
                      <td>
                        <div className="mentor-note-block">
                          <span className={`status-pill ${member.status?.includes('ดี') ? 'pill-good' : 'pill-warn'}`}>
                            {member.status || 'กำลังพัฒนา'}
                          </span>
                          <p className="mentor-note-text" title={member.mentorNote}>
                            {member.mentorNote || 'ยังไม่มีบันทึกคำแนะนำ'}
                          </p>
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: 'center' }}>
                        <div className="member-actions-row">
                          <button
                            type="button"
                            className="btn-track-progress"
                            onClick={() => handleOpenMemberDetail(member)}
                            title="ดูความก้าวหน้าและบันทึกผล"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            <span>บันทึก / ดูผล</span>
                          </button>
                          <button
                            type="button"
                            className="btn-remove-member"
                            onClick={() => {
                              if (window.confirm(`ต้องการนำ "${member.name}" ออกจากกลุ่มนี้หรือไม่?`)) {
                                onRemoveMemberFromGroup(activeGroup.id, member.id)
                              }
                            }}
                            title="ลด/นำสมาชิกออกจากกลุ่ม"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            <span>นำออก</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Modal: Create Group */}
      {showCreateGroupModal && (
        <div className="mgmt-modal-overlay" onClick={() => setShowCreateGroupModal(false)}>
          <div className="mgmt-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="mgmt-modal-header">
              <h2 className="mgmt-modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span>สร้างกลุ่มดูแลผู้ใช้งานใหม่ (DSS)</span>
              </h2>
              <button type="button" className="mgmt-modal-close" onClick={() => setShowCreateGroupModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateGroupSubmit}>
              <div className="mgmt-modal-body">
                <div className="form-group-row">
                  <label className="modal-field-label">ชื่อกลุ่ม DSS *</label>
                  <input
                    type="text"
                    className="modal-text-input"
                    placeholder="เช่น กลุ่ม DSS มหาวิทยาลัยเทคโนโลยีสุรนารี หรือ กลุ่ม DSS มหาวิทยาลัยขอนแก่น"
                    value={groupFormData.name}
                    onChange={(e) => setGroupFormData({ ...groupFormData, name: e.target.value })}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group-row">
                  <label className="modal-field-label">ชื่อศูนย์บริการ DSS / สถาบัน</label>
                  <input
                    type="text"
                    className="modal-text-input"
                    placeholder="เช่น ศูนย์บริการนักศึกษาพิการ (DSS) มหาวิทยาลัยเทคโนโลยีสุรนารี"
                    value={groupFormData.dssName}
                    onChange={(e) => setGroupFormData({ ...groupFormData, dssName: e.target.value })}
                  />
                </div>

                <div className="form-group-row">
                  <label className="modal-field-label">ผู้ดูแลกลุ่ม / พี่เลี้ยง DSS</label>
                  <input
                    type="text"
                    className="modal-text-input"
                    placeholder="เช่น อ.ที่ปรึกษา / พี่เลี้ยงศูนย์บริการนักศึกษาพิการ DSS มทส."
                    value={groupFormData.mentorName}
                    onChange={(e) => setGroupFormData({ ...groupFormData, mentorName: e.target.value })}
                  />
                </div>

                <div className="form-group-row">
                  <label className="modal-field-label">คำอธิบายกลุ่ม</label>
                  <textarea
                    className="modal-text-area"
                    placeholder="ระบุวัตถุประสงค์และการติดตามดูแลนักศึกษาในกลุ่ม..."
                    value={groupFormData.description}
                    onChange={(e) => setGroupFormData({ ...groupFormData, description: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>

              <div className="mgmt-modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowCreateGroupModal(false)}>ยกเลิก</button>
                <button type="submit" className="btn-modal-submit">สร้างกลุ่ม</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Group */}
      {showEditGroupModal && (
        <div className="mgmt-modal-overlay" onClick={() => setShowEditGroupModal(false)}>
          <div className="mgmt-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="mgmt-modal-header">
              <h2 className="mgmt-modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <span>แก้ไขข้อมูลกลุ่ม (DSS)</span>
              </h2>
              <button type="button" className="mgmt-modal-close" onClick={() => setShowEditGroupModal(false)}>✕</button>
            </div>
            <form onSubmit={handleEditGroupSubmit}>
              <div className="mgmt-modal-body">
                <div className="form-group-row">
                  <label className="modal-field-label">ชื่อกลุ่ม DSS *</label>
                  <input
                    type="text"
                    className="modal-text-input"
                    placeholder="เช่น กลุ่ม DSS มหาวิทยาลัยเทคโนโลยีสุรนารี หรือ กลุ่ม DSS มหาวิทยาลัยขอนแก่น"
                    value={editGroupFormData.name}
                    onChange={(e) => setEditGroupFormData({ ...editGroupFormData, name: e.target.value })}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group-row">
                  <label className="modal-field-label">ชื่อศูนย์บริการ DSS / สถาบัน</label>
                  <input
                    type="text"
                    className="modal-text-input"
                    placeholder="เช่น ศูนย์บริการนักศึกษาพิการ (DSS) มหาวิทยาลัยเทคโนโลยีสุรนารี"
                    value={editGroupFormData.dssName}
                    onChange={(e) => setEditGroupFormData({ ...editGroupFormData, dssName: e.target.value })}
                  />
                </div>

                <div className="form-group-row">
                  <label className="modal-field-label">ผู้ดูแลกลุ่ม / พี่เลี้ยง DSS</label>
                  <input
                    type="text"
                    className="modal-text-input"
                    placeholder="เช่น อ.ที่ปรึกษา / พี่เลี้ยงศูนย์บริการนักศึกษาพิการ DSS มทส."
                    value={editGroupFormData.mentorName}
                    onChange={(e) => setEditGroupFormData({ ...editGroupFormData, mentorName: e.target.value })}
                  />
                </div>

                <div className="form-group-row">
                  <label className="modal-field-label">คำอธิบายกลุ่ม</label>
                  <textarea
                    className="modal-text-area"
                    placeholder="ระบุวัตถุประสงค์และการติดตามดูแลนักศึกษาในกลุ่ม..."
                    value={editGroupFormData.description}
                    onChange={(e) => setEditGroupFormData({ ...editGroupFormData, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>

              <div className="mgmt-modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowEditGroupModal(false)}>ยกเลิก</button>
                <button type="submit" className="btn-modal-submit" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  <span>บันทึกการแก้ไข</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Member to Group */}
      {showAddMemberModal && (
        <div
          className="mgmt-modal-overlay"
          onClick={() => {
            setShowAddMemberModal(false)
            setUserSearchQuery('')
            setSelectedUserToAdd('')
          }}
        >
          <div className="mgmt-modal-card modal-user-picker" onClick={(e) => e.stopPropagation()}>
            <div className="mgmt-modal-header">
              <div className="add-member-header-info">
                <span className="add-member-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <div>
                  <h2 className="mgmt-modal-title">เพิ่มสมาชิกเข้ากลุ่ม</h2>
                  <span className="member-modal-sub">กลุ่ม: <strong>{activeGroup?.name}</strong></span>
                </div>
              </div>
              <button
                type="button"
                className="mgmt-modal-close"
                onClick={() => {
                  setShowAddMemberModal(false)
                  setUserSearchQuery('')
                  setSelectedUserToAdd('')
                }}
                title="ปิดหน้าต่าง"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit}>
              <div className="mgmt-modal-body">
                {/* Search Bar Input */}
                <div className="user-search-box-wrap">
                  <label className="modal-field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span>ค้นหาผู้ใช้งานจากระบบ (ค้นหาด้วยชื่อ, รหัสนักศึกษา, สาขาวิชา หรืออีเมล):</span>
                  </label>
                  <div className="user-search-input-inner">
                    <span className="search-icon-inside">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="user-search-input"
                      placeholder="พิมพ์ชื่อ, นามสกุล, รหัส B65xxxxx, สาขาวิชา หรืออีเมล..."
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      autoFocus
                    />
                    {userSearchQuery && (
                      <button
                        type="button"
                        className="btn-clear-search"
                        onClick={() => setUserSearchQuery('')}
                        title="ล้างคำค้นหา"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Available Users List Header */}
                <div className="user-list-count-row">
                  <span className="user-list-count-label">
                    {userSearchQuery ? `ผลการค้นหาสำหรับ "${userSearchQuery}":` : 'รายชื่อผู้ใช้ที่พร้อมเพิ่มเข้ากลุ่ม:'}
                  </span>
                  <span className="user-list-count-badge">
                    พบ {availableUsersToAdd.length} รายชื่อ
                  </span>
                </div>

                {/* Users Selection Cards List */}
                <div className="user-picker-list-container">
                  {availableUsersToAdd.length === 0 ? (
                    <div className="user-picker-empty">
                      <span className="user-picker-empty-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      </span>
                      <p className="user-picker-empty-text">
                        {userSearchQuery
                          ? `ไม่พบผู้ใช้งานที่ตรงกับ "${userSearchQuery}"`
                          : 'ผู้ใช้งานทุกคนในระบบได้ถูกเพิ่มเข้ากลุ่มนี้แล้ว'}
                      </p>
                      {userSearchQuery && (
                        <button
                          type="button"
                          className="btn-reset-search"
                          onClick={() => setUserSearchQuery('')}
                        >
                          ล้างคำค้นหาเพื่อดูทั้งหมด
                        </button>
                      )}
                    </div>
                  ) : (
                    availableUsersToAdd.map((u) => {
                      const isSelected = selectedUserToAdd === u.id || selectedUserToAdd === String(u.id)
                      return (
                        <div
                          key={u.id}
                          className={`user-picker-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => setSelectedUserToAdd(u.id)}
                        >
                          <div className="user-picker-radio-indicator">
                            <input
                              type="radio"
                              name="selected_user_radio"
                              checked={isSelected}
                              onChange={() => setSelectedUserToAdd(u.id)}
                            />
                          </div>

                          <div className="user-picker-avatar">
                            {u.name?.charAt(0) || 'U'}
                          </div>

                          <div className="user-picker-info">
                            <div className="user-picker-name-row">
                              <span className="user-picker-name">{u.name}</span>
                              {u.studentId && (
                                <span className="user-picker-code-badge">รหัส: {u.studentId}</span>
                              )}
                            </div>
                            <div className="user-picker-meta-row">
                              <span className="user-picker-major" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                  <line x1="3" y1="21" x2="21" y2="21" />
                                  <line x1="3" y1="10" x2="21" y2="10" />
                                  <polyline points="5 10 5 21" />
                                  <polyline points="19 10 19 21" />
                                  <polygon points="12 2 2 7 22 7" />
                                </svg>
                                <span>{u.major || u.faculty || 'มทส.'}</span>
                              </span>
                              <span className="user-picker-email" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                  <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <span>{u.email}</span>
                              </span>
                            </div>
                          </div>

                          {isSelected && (
                            <span className="user-picker-selected-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>เลือกแล้ว</span>
                            </span>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>

                <p className="modal-hint-text">
                  เมื่อเลือกและเพิ่มสมาชิกเข้ากลุ่ม คุณในฐานะ Super User จะสามารถติดตามความก้าวหน้า เลือกอาชีพ และบันทึกผลการประเมินรายเดือนของสมาชิกคนนี้ได้
                </p>
              </div>

              <div className="mgmt-modal-footer">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => {
                    setShowAddMemberModal(false)
                    setUserSearchQuery('')
                    setSelectedUserToAdd('')
                  }}
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="btn-modal-submit"
                  disabled={!selectedUserToAdd}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>เพิ่มเข้ากลุ่ม {selectedUserToAdd ? '(1 คน)' : ''}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Member Detail & 12-Month Progress Evaluation / Feedback */}
      {showMemberDetailModal && selectedMember && (
        <div className="mgmt-modal-overlay" onClick={() => setShowMemberDetailModal(false)}>
          <div className="mgmt-modal-card modal-large" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="mgmt-modal-header">
              <div className="member-modal-title-row">
                <span className="member-modal-avatar">{selectedMember.name.charAt(0)}</span>
                <div className="member-modal-info">
                  <div className="member-modal-tag-row">
                    <span className="member-inst-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <line x1="3" y1="21" x2="21" y2="21" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                        <polyline points="5 10 5 21" />
                        <polyline points="19 10 19 21" />
                        <polygon points="12 2 2 7 22 7" />
                      </svg>
                      <span>{selectedMember.major || 'มหาวิทยาลัยเทคโนโลยีสุรนารี'}</span>
                    </span>
                    <span className="member-code-badge">รหัส: {selectedMember.studentId}</span>
                    <span className="member-career-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                      <span>{selectedMember.careerGoal || 'โปรแกรมเมอร์'}</span>
                    </span>
                  </div>
                  <h2 className="mgmt-modal-title">{selectedMember.name}</h2>
                  <span className="member-modal-sub">
                    กลุ่ม: <strong>{activeGroup?.name}</strong> • ศูนย์บริการนักศึกษาพิการ (DSS) มทส.
                  </span>
                </div>
              </div>

              <button type="button" className="mgmt-modal-close" onClick={() => setShowMemberDetailModal(false)} title="ปิดหน้าต่าง">✕</button>
            </div>

            <div className="mgmt-modal-body">
              {/* Dedicated Full-Width Student Switcher Toolbar */}
              <div className="student-switcher-toolbar">
                <div className="switcher-info-group">
                  <span className="switcher-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <div className="switcher-text-group">
                    <span className="switcher-main-label">เลือกประเมินนักศึกษาในกลุ่ม:</span>
                    <span className="switcher-count-badge">
                      คนที่ {members.findIndex((m) => m.id === selectedMember.id) + 1} จาก {members.length} คน
                    </span>
                  </div>
                </div>

                <div className="switcher-select-wrap">
                  <select
                    className="student-dropdown-select"
                    value={members.findIndex((m) => m.id === selectedMember.id)}
                    onChange={(e) => handleSwitchMember(Number(e.target.value))}
                  >
                    {members.map((m, idx) => (
                      <option key={m.id} value={idx}>
                        {idx + 1}. {m.name} — {m.careerGoal || 'ยังไม่ระบุอาชีพ'} ({m.progressPct || 0}%)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="switcher-action-buttons">
                  <button
                    type="button"
                    className="btn-switch-nav"
                    disabled={members.findIndex((m) => m.id === selectedMember.id) <= 0}
                    onClick={() => handleSwitchMember(members.findIndex((m) => m.id === selectedMember.id) - 1)}
                    title="นักศึกษาก่อนหน้า"
                  >
                    ◀ ก่อนหน้า
                  </button>
                  <button
                    type="button"
                    className="btn-switch-nav"
                    disabled={members.findIndex((m) => m.id === selectedMember.id) >= members.length - 1}
                    onClick={() => handleSwitchMember(members.findIndex((m) => m.id === selectedMember.id) + 1)}
                    title="นักศึกษาถัดไป"
                  >
                    ถัดไป ▶
                  </button>
                </div>
              </div>
              {/* Top Overview Bar */}
              <div className="member-eval-stats-grid">
                <div className="eval-stat-card">
                  <span className="eval-label">ความพร้อมสู่อาชีพปัจจุบัน</span>
                  <span className="eval-val highlight">{selectedMember.progressPct || 0}%</span>
                </div>
                <div className="eval-stat-card">
                  <span className="eval-label">เป้าหมายอาชีพ</span>
                  <span className="eval-val text-sm" style={{ fontWeight: 600, color: '#1e3a8a' }}>{selectedMember.careerGoal || 'โปรแกรมเมอร์'}</span>
                </div>
                <div className="eval-stat-card">
                  <span className="eval-label">ทักษะเฉพาะบุคคล</span>
                  <span className="eval-val text-sm" style={{ fontWeight: 600, color: '#059669' }}>
                    {memberSkills.filter((s) => s.status === 'ผ่านเกณฑ์แล้ว').length} / {memberSkills.length} ทักษะ
                  </span>
                </div>
                <div className="eval-stat-card">
                  <span className="eval-label">รอบประเมินล่าสุด</span>
                  <span className="eval-val text-sm">{selectedMember.lastEvaluated || 'สิงหาคม 2568'}</span>
                </div>
              </div>

              {/* Modal Subtabs (12-Month vs Career & Skills) */}
              <div className="modal-subtab-bar">
                <button
                  type="button"
                  className={`modal-subtab-btn ${modalSubTab === 'monthly' ? 'active' : ''}`}
                  onClick={() => setModalSubTab('monthly')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>การประเมินรายเดือน (12 เดือน & Dual Assessment)</span>
                </button>
                <button
                  type="button"
                  className={`modal-subtab-btn ${modalSubTab === 'skills' ? 'active' : ''}`}
                  onClick={() => setModalSubTab('skills')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  <span>เลือกอาชีพ & กำหนดทักษะเฉพาะบุคคล ({memberSkills.length} ทักษะ)</span>
                </button>
              </div>

              {/* SUBTAB 1: 12-MONTH EVALUATION */}
              {modalSubTab === 'monthly' && (
                <>

              {/* 12-Month Interactive Navigator & Bar Chart Strip */}
              <div className="months-tracker-section">
                <div className="months-tracker-header">
                  <div>
                    <h3 className="months-tracker-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                      <span>แผนภูมิและประวัติความก้าวหน้า 12 เดือน (ประจำปี 2568)</span>
                    </h3>
                    <p className="months-tracker-subtitle">คลิกเลือกเดือนที่ต้องการ (ม.ค. - ธ.ค.) เพื่อดูเป้าหมาย ทักษะที่ประเมิน และบันทึกผล</p>
                  </div>
                  <span className="active-month-badge">
                    กำลังดู: <strong>{getMonthsList(selectedMember)[activeMonthIdx]?.monthName}</strong>
                  </span>
                </div>

                <div className="months-bars-row">
                  {getMonthsList(selectedMember).map((mObj, idx) => {
                    const isSelected = activeMonthIdx === idx
                    const score = mObj.score || 0
                    const isPending = mObj.status === 'ยังไม่ถึงรอบประเมิน' || score === 0

                    return (
                      <button
                        type="button"
                        key={mObj.monthKey || idx}
                        className={`month-col-btn ${isSelected ? 'selected' : ''} ${isPending ? 'pending' : ''}`}
                        onClick={() => handleSelectMonth(idx)}
                        title={`${mObj.monthName}: ${mObj.topic} (คะแนน ${score}%)`}
                      >
                        {/* Mini vertical bar */}
                        <div className="month-bar-track">
                          <div
                            className="month-bar-fill"
                            style={{
                              height: `${score}%`,
                              backgroundColor: score >= 80 ? '#10b981' : score >= 60 ? '#2563eb' : score > 0 ? '#f59e0b' : '#cbd5e1',
                            }}
                          ></div>
                        </div>

                        {/* Score text */}
                        <span className="month-score-tag">{isPending ? '-' : `${score}%`}</span>

                        {/* Month Pill label */}
                        <span className="month-short-name">{mObj.shortMonth}</span>

                        {/* Month Short Topic Pill */}
                        <span className="month-topic-pill" title={mObj.topic}>
                          {mObj.shortTopic || mObj.topic?.slice(0, 10) || 'ประเมิน'}
                        </span>

                        {/* Status dot */}
                        <span
                          className="month-status-dot"
                          style={{
                            backgroundColor: score >= 80 ? '#10b981' : score >= 60 ? '#3b82f6' : score > 0 ? '#f59e0b' : '#cbd5e1',
                          }}
                        ></span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Monthly Editor Card */}
              <div className="monthly-edit-card">
                <div className="monthly-edit-header">
                  <div className="monthly-edit-title-group">
                    <span className="monthly-calendar-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </span>
                    <div>
                      <div className="monthly-module-pill">
                        รอบประเมินที่ {activeMonthIdx + 1} จาก 12 เดือน • ศูนย์บริการนักศึกษาพิการ (DSS) มทส.
                      </div>
                      <h4 className="monthly-edit-title">
                        การประเมินรอบเดือน: <span>{getMonthsList(selectedMember)[activeMonthIdx]?.monthName}</span>
                      </h4>
                    </div>
                  </div>

                  <div className="monthly-nav-controls">
                    <button
                      type="button"
                      onClick={() => handleOpenEditMonthModal(activeMonthIdx)}
                      title="เปิดหน้าต่างป๊อปอัปเพื่อแก้ไขผลการประเมินเดือนนี้"
                      style={{
                        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                        color: '#1d4ed8',
                        border: '1.5px solid #93c5fd',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                      <span>เปิดป๊อปอัปแก้ไข</span>
                    </button>

                    {activeMonthIdx > 0 && (
                      <button
                        type="button"
                        className="btn-copy-prev"
                        onClick={handleCopyFromPrevMonth}
                        title="ดึงข้อมูลและเกณฑ์จากเดือนก่อนหน้ามาเป็นต้นแบบ"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        <span>คัดลอกจากเดือนก่อนหน้า</span>
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn-month-nav"
                      disabled={activeMonthIdx === 0}
                      onClick={() => handleSelectMonth(Math.max(0, activeMonthIdx - 1))}
                    >
                      ◀ ก่อนหน้า
                    </button>
                    <button
                      type="button"
                      className="btn-month-nav"
                      disabled={activeMonthIdx === 11}
                      onClick={() => handleSelectMonth(Math.min(11, activeMonthIdx + 1))}
                    >
                      ถัดไป ▶
                    </button>
                  </div>
                </div>

                {saveSuccessMsg && (
                  <div className="month-save-alert">
                    {saveSuccessMsg}
                  </div>
                )}

                <form onSubmit={handleSaveMonthlyEvaluation} className="monthly-edit-form">
                  {/* Dual Assessment Container */}
                  <div className="dual-assessment-container">
                    {/* SECTION 1: User Self-Assessment View */}
                    <div className="user-self-eval-box">
                      <div className="user-self-eval-header">
                        <span className="user-self-eval-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          <span>ส่วนที่ 1: ผลการประเมินตนเองของนักศึกษา (User Self-Assessment)</span>
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="user-self-eval-score-badge">
                            คะแนนประเมินตนเอง: {evaluationData.userSelfScore || 0}%
                          </span>
                          <span className="status-pill pill-good">
                            {evaluationData.userSelfStatus || 'ประเมินแล้ว'}
                          </span>
                        </div>
                      </div>

                      <div className="user-self-eval-body">
                        <div className="user-self-note-block">
                          <span className="user-self-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            <span>บันทึกการเรียนรู้และการฝึกทักษะของนักศึกษา:</span>
                          </span>
                          <p className="user-self-text">
                            {evaluationData.userSelfNote || 'นักศึกษาได้เรียนรู้ตามแผนพัฒนาตนเองและส่งหลักฐานผลงานเรียบร้อยแล้ว'}
                          </p>
                        </div>

                        <div className="user-self-note-block">
                          <span className="user-self-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                            <span>แฟ้มผลงาน / หลักฐานแนบ (Evidence & Showcase):</span>
                          </span>
                          {evaluationData.userSelfEvidence ? (
                            <a
                              href={evaluationData.userSelfEvidence}
                              target="_blank"
                              rel="noreferrer"
                              className="user-self-text"
                              style={{ color: '#2563eb', textDecoration: 'underline', wordBreak: 'break-all', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                              </svg>
                              <span>{evaluationData.userSelfEvidence}</span>
                            </a>
                          ) : (
                            <span className="user-self-text" style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                              - แนบในระบบแฟ้มผลงานกลาง DSS -
                            </span>
                          )}
                          <div style={{ marginTop: '6px', fontSize: '12px', color: '#047857', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>ทักษะที่นักศึกษาประเมินว่าผ่าน: {evaluationData.userSelfPassedCriteria?.length || (evaluationData.passedCriteria?.length || 0)} รายการ</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: Super User / Mentor Supervisor Evaluation */}
                    <div className="monthly-milestone-box">
                      <div className="milestone-box-header">
                        <span className="milestone-badge-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                        </span>
                        <div className="milestone-text-group">
                          <label className="milestone-label">
                            ส่วนที่ 2: การประเมินและให้คำแนะนำโดย Super User / Mentor (Supervisor Guidance)
                          </label>
                          <input
                            type="text"
                            className="milestone-input"
                            value={evaluationData.topic}
                            onChange={(e) => setEvaluationData({ ...evaluationData, topic: e.target.value })}
                            placeholder="ระบุหัวข้อหรือสมรรถนะหลักที่ประเมินในเดือนนี้..."
                            required
                          />
                        </div>
                      </div>

                      {/* Criteria Checklist for this month */}
                      <div className="milestone-criteria-wrap">
                        <div className="criteria-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                          <span className="criteria-section-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>เกณฑ์และทักษะที่ประเมินประจำเดือน ({evaluationData.passedCriteria?.length || 0}/{(evaluationData.criteria || []).length} ผ่านแล้ว)</span>
                          </span>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <button
                              type="button"
                              onClick={handleRandomizeMockEvaluation}
                              className="btn-random-mock-eval"
                              title="สุ่มผลการประเมินจำลอง (Mock) เพื่อทดสอบข้อมูลเกณฑ์ทั้ง 3 รูปแบบ (ผ่านเกณฑ์, กำลังพัฒนา, รอข้อมูล)"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                border: '1.5px solid #d8b4fe',
                                background: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)',
                                color: '#9333ea',
                                fontWeight: 700,
                                fontSize: '11.5px',
                                cursor: 'pointer',
                                boxShadow: '0 1px 3px rgba(147, 51, 234, 0.12)',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <span>🎲 สุ่มประเมินจำลอง (Mock)</span>
                            </button>
                            <span className="criteria-hint">คลิกที่ทักษะเพื่อเปิดป๊อปอัปประเมิน 7 ระดับมาตรฐาน (แบบ User) หรือติ๊กเช็กผ่าน/ไม่ผ่าน</span>
                          </div>
                        </div>

                        {/* Evidence & Passing Condition Banner */}
                        <div style={{
                          background: '#f8fafc',
                          border: '1px dashed #cbd5e1',
                          borderRadius: '8px',
                          padding: '6px 12px',
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '11.5px',
                          color: '#334155',
                          lineHeight: '1.4'
                        }}>
                          <span style={{ fontSize: '14px', flexShrink: 0 }}>💡</span>
                          <span><strong>เงื่อนไขการผ่านเกณฑ์:</strong> ต้องมีข้อมูลการประเมินอย่างน้อย 1 รายการ (ระดับทักษะ, จำนวนชั่วโมง, บันทึกผลงาน หรือรูปภาพ — <em>ไม่จำเป็นต้องมีรูปภาพ แต่ต้องมีอย่างใดอย่างหนึ่ง</em>)</span>
                        </div>

                        <div className="criteria-items-list">
                          {(evaluationData.criteria || []).map((critText, cIdx) => {
                            const isPassed = (evaluationData.passedCriteria || []).includes(cIdx)
                            const detail = (evaluationData.criteriaDetails || {})[cIdx]
                            const hasSub = hasCriterionSubmission(cIdx, evaluationData.criteriaDetails)
                            return (
                              <div
                                key={cIdx}
                                className={`criteria-item-pill ${isPassed ? 'passed' : detail?.superDecision === 'failed' ? 'failed' : 'pending'}`}
                                onClick={() => handleOpenMonthlySkillModal(cIdx)}
                                title="คลิกเพื่อเปิดป๊อปอัปประเมินทักษะนี้ (7 ระดับมาตรฐาน แบบ User)"
                                style={{ cursor: 'pointer' }}
                              >
                                <span
                                  className="criteria-checkbox-box"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleToggleCriteria(cIdx)
                                  }}
                                  title={isPassed ? "คลิกเพื่อสลับเป็นไม่ผ่านเกณฑ์" : hasSub ? "คลิกเพื่อสลับเป็นผ่านเกณฑ์" : "ต้องมีข้อมูลอย่างน้อย 1 รายการจึงจะผ่านได้ (คลิกเพื่อประเมิน)"}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    background: isPassed ? '#10b981' : detail?.superDecision === 'failed' ? '#fee2e2' : '#ffffff',
                                    borderColor: isPassed ? '#10b981' : detail?.superDecision === 'failed' ? '#f87171' : '#cbd5e1',
                                  }}
                                >
                                  {isPassed ? (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  ) : detail?.superDecision === 'failed' ? (
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3">
                                      <line x1="18" y1="6" x2="6" y2="18" />
                                      <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                  ) : (
                                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', border: '1.5px solid #94a3b8' }} />
                                  )}
                                </span>

                                <span className="criteria-text" style={{ flex: 1, fontWeight: isPassed ? 700 : 600 }}>
                                  {critText}
                                </span>

                                {detail?.level && (
                                  <span
                                    style={{
                                      fontSize: '11px',
                                      fontWeight: 700,
                                      padding: '2px 8px',
                                      borderRadius: '6px',
                                      background: '#eff6ff',
                                      color: '#1d4ed8',
                                      border: '1px solid #bfdbfe',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      maxWidth: '160px',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                    }}
                                    title={detail.level}
                                  >
                                    <span>⭐</span>
                                    <span>{detail.level.split('.')[0] || 'ระดับ'}. {detail.level.slice(2, 14)}...</span>
                                  </span>
                                )}

                                {detail?.hours && (
                                  <span style={{ fontSize: '11px', color: '#0369a1', background: '#f0f9ff', padding: '2px 7px', borderRadius: '6px', fontWeight: 600, border: '1px solid #bae6fd' }}>
                                    ⏱ {detail.hours} ชม.
                                  </span>
                                )}

                                {detail?.note && detail.note.trim() && (
                                  <span 
                                    style={{ fontSize: '11px', color: '#475569', background: '#f1f5f9', padding: '2px 7px', borderRadius: '6px', fontWeight: 600, border: '1px solid #cbd5e1' }}
                                    title={detail.note}
                                  >
                                    📝 มีบันทึก
                                  </span>
                                )}

                                {detail?.images && detail.images.length > 0 && (
                                  <span style={{ fontSize: '11px', color: '#7c3aed', background: '#f5f3ff', padding: '2px 7px', borderRadius: '6px', fontWeight: 700, border: '1px solid #ddd6fe' }}>
                                    📷 {detail.images.length} รูป
                                  </span>
                                )}

                                {isPassed ? (
                                  <span className="criteria-status-badge passed">
                                    ✓ ผ่านเกณฑ์
                                  </span>
                                ) : detail?.superDecision === 'failed' ? (
                                  <span className="criteria-status-badge" style={{ background: '#fef2f2', color: '#dc2626', borderColor: '#fca5a5', fontWeight: 700 }}>
                                    ✕ ไม่ผ่านเกณฑ์
                                  </span>
                                ) : hasSub ? (
                                  <span className="criteria-status-badge pending" style={{ background: '#fffbeb', color: '#b45309', borderColor: '#fde68a' }}>
                                    🔄 กำลังพัฒนา
                                  </span>
                                ) : (
                                  <span className="criteria-status-badge pending" style={{ background: '#f8fafc', color: '#64748b', borderColor: '#cbd5e1' }} title="ยังไม่มีข้อมูลส่ง (ไม่จำเป็นต้องมีรูป แต่ต้องมีอย่างใดอย่างหนึ่ง)">
                                    ⏳ รอข้อมูล/ประเมิน
                                  </span>
                                )}

                                <button
                                  type="button"
                                  className="btn-criteria-eval-direct"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleOpenMonthlySkillModal(cIdx)
                                  }}
                                  style={{
                                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '4px 10px',
                                    fontSize: '11.5px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    boxShadow: '0 1px 4px rgba(37, 99, 235, 0.25)',
                                    transition: 'all 0.15s ease',
                                    flexShrink: 0,
                                  }}
                                  title="เปิดหน้าต่างประเมินทักษะนี้แบบ User"
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                  </svg>
                                  <span>ประเมิน</span>
                                </button>

                                {(evaluationData.criteria || []).length > 1 && (
                                  <button
                                    type="button"
                                    className="btn-remove-criteria-item"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleRemoveCriteria(cIdx, e)
                                    }}
                                    title="ลบทักษะนี้ออกจากเดือนนี้"
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            )
                          })}
                        </div>

                        {/* Add Custom Skill / Criteria Input -> Opens Pop-up Modal like Image 2 */}
                        <div className="add-custom-skill-wrap">
                          <input
                            type="text"
                            className="add-custom-skill-input"
                            placeholder="+ เพิ่มทักษะ / กำหนดเกณฑ์ประเมินใหม่ในเดือนนี้..."
                            value={customSkillText}
                            onChange={(e) => setCustomSkillText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                handleOpenMonthlySkillModal(customSkillText)
                              }
                            }}
                          />
                          <button
                            type="button"
                            className="btn-add-custom-skill"
                            onClick={() => handleOpenMonthlySkillModal(customSkillText)}
                            title="คลิกเพื่อเปิดหน้าต่างป๊อปอัปเพิ่มและประเมินทักษะใหม่"
                          >
                            + เพิ่มทักษะ
                          </button>
                        </div>
                      </div>

                      {/* Auto Sync Percentage Bar */}
                      <div className="auto-sync-bar">
                        <div className="auto-sync-info" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.4">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                          <span>
                            คำนวณคะแนนตามเกณฑ์อัตโนมัติ: <strong>{calcAutoScore(evaluationData.passedCriteria, evaluationData.criteria)}%</strong> (ผ่าน {evaluationData.passedCriteria?.length || 0}/{(evaluationData.criteria || []).length} ทักษะ)
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <label className="auto-sync-toggle-label">
                            <input
                              type="checkbox"
                              checked={autoSyncScore}
                              onChange={(e) => {
                                setAutoSyncScore(e.target.checked)
                                if (e.target.checked) {
                                  handleForceSyncScore()
                                }
                              }}
                            />
                            <span>ซิงค์คะแนนอัตโนมัติ</span>
                          </label>
                          <button
                            type="button"
                            className="btn-sync-score-now"
                            onClick={handleForceSyncScore}
                            title="คำนวณและอัปเดตคะแนนทันที"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <polyline points="23 4 23 10 17 10" />
                              <polyline points="1 20 1 14 7 14" />
                              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                            </svg>
                            <span>ซิงค์ทันที</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Balanced Two-column inputs: Score, Status, Skills & Hours */}
                  <div className="form-two-cols">
                    {/* Left Col: Score Slider & Input */}
                    <div className="form-group-col">
                      <div className="slider-header-row">
                        <label className="modal-field-label">ความพร้อมสู่อาชีพประจำเดือนนี้ (%):</label>
                        <span className="slider-current-val">{evaluationData.score}%</span>
                      </div>
                      <div className="score-input-slider-row">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          className="score-range-slider"
                          value={evaluationData.score}
                          onChange={(e) => setEvaluationData({ ...evaluationData, score: Number(e.target.value) })}
                        />
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className="score-number-input"
                          value={evaluationData.score}
                          onChange={(e) => setEvaluationData({ ...evaluationData, score: Number(e.target.value) })}
                        />
                      </div>
                    </div>

                    {/* Right Col: Status Select */}
                    <div className="form-group-col">
                      <label className="modal-field-label">สถานะการพัฒนาในเดือนนี้:</label>
                      <select
                        className="modal-select-input"
                        value={evaluationData.status === 'พร้อมยื่นสมัครงานแล้ว' ? 'พัฒนาได้ดีมาก' : evaluationData.status}
                        onChange={(e) => setEvaluationData({ ...evaluationData, status: e.target.value })}
                      >
                        <option value="พัฒนาได้ดีมาก">พัฒนาได้ดีมาก (Very Good / &gt;80%)</option>
                        <option value="กำลังพัฒนาได้ดี">กำลังพัฒนาได้ดี (On Track / 60-79%)</option>
                        <option value="ต้องการคำแนะนำเพิ่มเติม">ต้องการคำแนะนำเพิ่มเติม (40-59%)</option>
                        <option value="ต้องเร่งปรับปรุงทักษะ">ต้องเร่งปรับปรุงทักษะ (&lt;40%)</option>
                        <option value="ยังไม่ถึงรอบประเมิน">ยังไม่ถึงรอบประเมิน (Pending)</option>
                      </select>
                    </div>
                  </div>

                  {/* Two-column inputs: Passed Skills & Hours */}
                  <div className="form-two-cols">
                    <div className="form-group-col">
                      <label className="modal-field-label">จำนวนทักษะที่ผ่านเกณฑ์สะสมในเดือนนี้:</label>
                      <input
                        type="text"
                        className="modal-text-input"
                        placeholder="เช่น 8 ทักษะ หรือ 4 ทักษะ"
                        value={evaluationData.passedSkills}
                        onChange={(e) => setEvaluationData({ ...evaluationData, passedSkills: e.target.value })}
                      />
                    </div>

                    <div className="form-group-col">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label className="modal-field-label">ชั่วโมงการเรียนรู้ / ฝึกอบรมในเดือนนี้:</label>
                        <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>{evaluationData.hours || '0 ชม.'}</span>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="modal-text-input"
                        placeholder="เช่น 30 ชม. หรือ 24 ชม."
                        value={evaluationData.hours}
                        onChange={(e) => setEvaluationData({ ...evaluationData, hours: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Mentor Feedback Note */}
                  <div className="form-group-row">
                    <label className="modal-field-label">
                      บันทึกข้อเสนอแนะและผลการประเมินจาก Super User / Mentor (ประจำเดือน {getMonthsList(selectedMember)[activeMonthIdx]?.shortMonth}) *
                    </label>
                    <textarea
                      className="modal-text-area"
                      placeholder={`พิมพ์คำแนะนำและผลการประเมินสำหรับหัวข้อ "${evaluationData.topic}" เพื่อให้นักศึกษาได้ติดตามและปรับปรุงตัว...`}
                      value={evaluationData.mentorNote}
                      onChange={(e) => setEvaluationData({ ...evaluationData, mentorNote: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  {/* Action Item Plan */}
                  <div className="form-group-row">
                    <label className="modal-field-label">
                      แผนการพัฒนาต่อเนื่อง / มอบหมายงานในเดือนถัดไป (Action Item)
                    </label>
                    <input
                      type="text"
                      className="modal-text-input"
                      placeholder="เช่น ทำ Mini Project เชื่อมต่อ API หรือ ฝึกซ้อม Mock Interview สหกิจศึกษา"
                      value={evaluationData.advicePlan}
                      onChange={(e) => setEvaluationData({ ...evaluationData, advicePlan: e.target.value })}
                    />
                  </div>

                  <div className="monthly-edit-submit-row">
                    <button type="submit" className="btn-save-month-eval" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                      <span>บันทึกผลการประเมินรอบเดือน ({getMonthsList(selectedMember)[activeMonthIdx]?.shortMonth} 2568)</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* 12-Month History Table */}
              <div className="monthly-history-table-section">
                <div className="history-table-header-row">
                  <h4 className="monthly-history-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>ตารางสรุปผลการประเมินรายเดือนตลอดทั้งปี (12 เดือน)</span>
                  </h4>
                  <span className="history-table-subtitle">สรุปหัวข้อที่ประเมิน คะแนน ความพร้อม และข้อเสนอแนะรายเดือน</span>
                </div>
                <div className="history-table-wrap">
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th style={{ width: '85px' }}>เดือน</th>
                        <th style={{ width: '220px' }}>หัวข้อที่ประเมินประจำเดือน</th>
                        <th style={{ width: '130px' }}>ความพร้อม (%)</th>
                        <th style={{ width: '90px' }}>ทักษะผ่าน</th>
                        <th style={{ width: '80px' }}>ชม. อบรม</th>
                        <th style={{ width: '120px' }}>สถานะ</th>
                        <th>ข้อเสนอแนะของ Super User / พี่เลี้ยง DSS</th>
                        <th style={{ width: '70px', textAlign: 'center' }}>แก้ไข</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getMonthsList(selectedMember).map((mObj, idx) => {
                        const isCurActive = activeMonthIdx === idx
                        return (
                          <tr
                            key={mObj.monthKey || idx}
                            className={isCurActive ? 'row-active' : ''}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleOpenEditMonthModal(idx)}
                            title={`คลิกเพื่อเปิดป๊อปอัปแก้ไขรอบเดือน ${mObj.monthName}`}
                          >
                            <td>
                              <span className="table-month-name">{mObj.shortMonth}</span>
                            </td>
                            <td>
                              <div className="table-topic-block">
                                <span className="table-topic-text">{mObj.topic || DEFAULT_12_MONTHS_SYLLABUS[idx]?.topic}</span>
                              </div>
                            </td>
                            <td>
                              <div className="table-score-badge">
                                <span className="score-badge-val">{mObj.score}%</span>
                                <div className="table-mini-bar">
                                  <div
                                    className="table-mini-fill"
                                    style={{
                                      width: `${mObj.score}%`,
                                      backgroundColor: mObj.score >= 80 ? '#10b981' : mObj.score >= 60 ? '#2563eb' : mObj.score > 0 ? '#f59e0b' : '#cbd5e1',
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td>{mObj.passedSkills || '-'}</td>
                            <td>{mObj.hours || '-'}</td>
                            <td>
                              <span className={`status-pill-sm ${mObj.status?.includes('ดี') || mObj.status?.includes('พร้อม') ? 'pill-good' : mObj.status?.includes('ยังไม่ถึง') ? 'pill-pending' : 'pill-warn'}`}>
                                {mObj.status || '-'}
                              </span>
                            </td>
                            <td className="table-note-cell">
                              <span className="table-note-text" title={mObj.note}>
                                {mObj.note || <em className="text-gray">- ยังไม่มีบันทึก -</em>}
                              </span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <button
                                type="button"
                                className={`btn-edit-month-action ${isCurActive ? 'active' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleOpenEditMonthModal(idx)
                                }}
                                title={`คลิกเพื่อเปิดป๊อปอัปแก้ไขผลการประเมินรอบเดือน ${mObj.monthName}`}
                              >
                                {isCurActive ? '✏️ แก้ไข (ดูอยู่)' : '✏️ แก้ไข'}
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
                </>
              )}

              {/* SUBTAB 2: CAREER SELECTION & INDIVIDUAL SKILLS MATRIX */}
              {modalSubTab === 'skills' && (
                <div className="member-skills-section">
                  {/* Career Selection Card */}
                  <div className="career-select-card">
                    <div className="career-select-header">
                      <span className="career-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" />
                          <circle cx="12" cy="12" r="2" />
                        </svg>
                      </span>
                      <div>
                        <h4 className="career-select-title">เลือกเส้นทางอาชีพและชุดทักษะมาตรฐานสำหรับ {selectedMember.name}</h4>
                        <p className="career-select-sub">
                          เลือกอาชีพที่นักศึกษาต้องการมุ่งเน้น Super User สามารถโหลดชุดทักษะมาตรฐานและปรับแต่งเพิ่ม/ลดระดับทักษะเฉพาะบุคคลได้
                        </p>
                      </div>
                    </div>

                    <div className="career-select-controls">
                      <div className="career-select-dropdown-wrap">
                        <label className="career-select-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>เลือกจากชุดอาชีพแนะนำ หรือเลือก "อื่นๆ":</span>
                          {selectedMember.careerGoal && (
                            <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 700, background: '#eff6ff', padding: '1px 8px', borderRadius: '9999px', border: '1px solid #bfdbfe' }}>
                              กำลังเลือก: {selectedMember.careerGoal.length > 25 ? selectedMember.careerGoal.slice(0, 25) + '...' : selectedMember.careerGoal}
                            </span>
                          )}
                        </label>

                        {/* Custom Combobox Trigger & Popover */}
                        <div className="career-custom-combobox-wrap" ref={careerDropdownRef}>
                          <button
                            type="button"
                            className={`career-combobox-trigger ${isCareerDropdownOpen ? 'active' : ''}`}
                            onClick={() => setIsCareerDropdownOpen(!isCareerDropdownOpen)}
                          >
                            <div className="combobox-trigger-content">
                              <span className="combobox-trigger-icon-badge">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10" />
                                  <circle cx="12" cy="12" r="6" />
                                  <circle cx="12" cy="12" r="2" />
                                </svg>
                              </span>
                              <div className="combobox-trigger-text">
                                {selectedMember.careerGoal ? (
                                  <>
                                    <span className="combobox-selected-title" title={selectedMember.careerGoal}>
                                      {selectedMember.careerGoal}
                                    </span>
                                    {CAREER_PRESETS.find((p) => p.shortTitle === selectedMember.careerGoal || p.title === selectedMember.careerGoal) && (
                                      <span className="combobox-selected-sub">
                                        {CAREER_PRESETS.find((p) => p.shortTitle === selectedMember.careerGoal || p.title === selectedMember.careerGoal).category} • {CAREER_PRESETS.find((p) => p.shortTitle === selectedMember.careerGoal || p.title === selectedMember.careerGoal).skills.length} ทักษะหลัก
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span className="combobox-placeholder-title">-- 🎯 เลือกอาชีพแนะนำ หรือ อื่นๆ --</span>
                                )}
                              </div>
                            </div>

                            <div className="combobox-trigger-right">
                              {selectedMember.careerGoal && (
                                <span
                                  className="combobox-clear-btn"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedMember({ ...selectedMember, careerGoal: '' })
                                  }}
                                  title="ล้างการเลือกอาชีพ"
                                >
                                  ✕
                                </span>
                              )}
                              <span className={`combobox-chevron ${isCareerDropdownOpen ? 'open' : ''}`}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </span>
                            </div>
                          </button>

                          {/* Floating Popover Menu */}
                          {isCareerDropdownOpen && (
                            <div className="career-combobox-menu">
                              {/* Search Bar */}
                              <div className="combobox-search-box">
                                <span className="combobox-search-icon">
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                  </svg>
                                </span>
                                <input
                                  type="text"
                                  className="combobox-search-input"
                                  placeholder="ค้นหาชื่ออาชีพหรือสายงาน..."
                                  value={careerSearchTerm}
                                  onChange={(e) => setCareerSearchTerm(e.target.value)}
                                  autoFocus
                                  onClick={(e) => e.stopPropagation()}
                                />
                                {careerSearchTerm && (
                                  <button
                                    type="button"
                                    className="combobox-search-clear"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setCareerSearchTerm('')
                                    }}
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>

                              {/* Options List */}
                              <div className="combobox-options-scroll">
                                {/* Group 0: Custom Careers */}
                                {(() => {
                                  const customList = getCustomCareersFromStorage().filter(
                                    (c) => !careerSearchTerm.trim() || c.title.toLowerCase().includes(careerSearchTerm.toLowerCase().trim())
                                  )
                                  if (customList.length === 0) return null
                                  return (
                                    <div className="combobox-group">
                                      <div className="combobox-group-header">
                                        <span className="combobox-group-title">
                                          <span>📌</span>
                                          <span>อาชีพที่บันทึกไว้ในระบบ (Custom Careers)</span>
                                        </span>
                                        <span className="combobox-group-count">{customList.length} อาชีพ</span>
                                      </div>
                                      {customList.map((c) => {
                                        const isSel = selectedMember.careerGoal === c.title
                                        return (
                                          <div
                                            key={c.id}
                                            className={`combobox-item ${isSel ? 'selected' : ''}`}
                                            onClick={() => {
                                              handleSelectCareerPreset(c.title, false)
                                              setIsCareerDropdownOpen(false)
                                              setCareerSearchTerm('')
                                            }}
                                          >
                                            <div className="combobox-item-left">
                                              <span className="combobox-item-title">{c.title}</span>
                                              <div className="combobox-item-meta">
                                                <span className="combobox-skill-badge" style={{ background: '#fef3c7', color: '#92400e', borderColor: '#fde68a' }}>
                                                  กำหนดเอง
                                                </span>
                                              </div>
                                            </div>
                                            <div className="combobox-item-right">
                                              {isSel && <span className="combobox-selected-badge">✓ เลือกอยู่</span>}
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  )
                                })()}

                                {/* Group 1: Technology & Software */}
                                {(() => {
                                  const list = CAREER_PRESETS.filter((p) => p.category.includes('เทคโนโลยี') || p.category.includes('ข้อมูล') || p.category.includes('สนับสนุน')).filter(
                                    (p) =>
                                      !careerSearchTerm.trim() ||
                                      p.title.toLowerCase().includes(careerSearchTerm.toLowerCase().trim()) ||
                                      p.shortTitle.toLowerCase().includes(careerSearchTerm.toLowerCase().trim()) ||
                                      p.category.toLowerCase().includes(careerSearchTerm.toLowerCase().trim())
                                  )
                                  if (list.length === 0) return null
                                  return (
                                    <div className="combobox-group">
                                      <div className="combobox-group-header">
                                        <span className="combobox-group-title">
                                          <span>💻</span>
                                          <span>สายงานเทคโนโลยี & ซอฟต์แวร์ (Technology & Software)</span>
                                        </span>
                                        <span className="combobox-group-count">{list.length} อาชีพ</span>
                                      </div>
                                      {list.map((p) => {
                                        const isSel = selectedMember.careerGoal === p.shortTitle || selectedMember.careerGoal === p.title
                                        return (
                                          <div
                                            key={p.id}
                                            className={`combobox-item ${isSel ? 'selected' : ''}`}
                                            onClick={() => {
                                              handleSelectCareerPreset(p.shortTitle, false)
                                              setIsCareerDropdownOpen(false)
                                              setCareerSearchTerm('')
                                            }}
                                          >
                                            <div className="combobox-item-left">
                                              <span className="combobox-item-title">{p.title}</span>
                                              <div className="combobox-item-meta">
                                                <span className="combobox-skill-badge">{p.skills.length} ทักษะหลัก</span>
                                                <span style={{ fontSize: '11px', color: '#64748b' }}>{p.category}</span>
                                              </div>
                                            </div>
                                            <div className="combobox-item-right">
                                              {isSel && <span className="combobox-selected-badge">✓ เลือกอยู่</span>}
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  )
                                })()}

                                {/* Group 2: Design & Media */}
                                {(() => {
                                  const list = CAREER_PRESETS.filter((p) => p.category.includes('ออกแบบ') || p.category.includes('ครีเอทีฟ')).filter(
                                    (p) =>
                                      !careerSearchTerm.trim() ||
                                      p.title.toLowerCase().includes(careerSearchTerm.toLowerCase().trim()) ||
                                      p.shortTitle.toLowerCase().includes(careerSearchTerm.toLowerCase().trim()) ||
                                      p.category.toLowerCase().includes(careerSearchTerm.toLowerCase().trim())
                                  )
                                  if (list.length === 0) return null
                                  return (
                                    <div className="combobox-group">
                                      <div className="combobox-group-header">
                                        <span className="combobox-group-title">
                                          <span>🎨</span>
                                          <span>สายงานออกแบบ สื่อดิจิทัล & ครีเอทีฟ (Design & Media)</span>
                                        </span>
                                        <span className="combobox-group-count">{list.length} อาชีพ</span>
                                      </div>
                                      {list.map((p) => {
                                        const isSel = selectedMember.careerGoal === p.shortTitle || selectedMember.careerGoal === p.title
                                        return (
                                          <div
                                            key={p.id}
                                            className={`combobox-item ${isSel ? 'selected' : ''}`}
                                            onClick={() => {
                                              handleSelectCareerPreset(p.shortTitle, false)
                                              setIsCareerDropdownOpen(false)
                                              setCareerSearchTerm('')
                                            }}
                                          >
                                            <div className="combobox-item-left">
                                              <span className="combobox-item-title">{p.title}</span>
                                              <div className="combobox-item-meta">
                                                <span className="combobox-skill-badge">{p.skills.length} ทักษะหลัก</span>
                                                <span style={{ fontSize: '11px', color: '#64748b' }}>{p.category}</span>
                                              </div>
                                            </div>
                                            <div className="combobox-item-right">
                                              {isSel && <span className="combobox-selected-badge">✓ เลือกอยู่</span>}
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  )
                                })()}

                                {/* Group 3: Business & Management */}
                                {(() => {
                                  const list = CAREER_PRESETS.filter((p) => p.category.includes('ธุรกิจ') || p.category.includes('การตลาด')).filter(
                                    (p) =>
                                      !careerSearchTerm.trim() ||
                                      p.title.toLowerCase().includes(careerSearchTerm.toLowerCase().trim()) ||
                                      p.shortTitle.toLowerCase().includes(careerSearchTerm.toLowerCase().trim()) ||
                                      p.category.toLowerCase().includes(careerSearchTerm.toLowerCase().trim())
                                  )
                                  if (list.length === 0) return null
                                  return (
                                    <div className="combobox-group">
                                      <div className="combobox-group-header">
                                        <span className="combobox-group-title">
                                          <span>📈</span>
                                          <span>สายงานธุรกิจ การตลาด & การจัดการ (Business & Management)</span>
                                        </span>
                                        <span className="combobox-group-count">{list.length} อาชีพ</span>
                                      </div>
                                      {list.map((p) => {
                                        const isSel = selectedMember.careerGoal === p.shortTitle || selectedMember.careerGoal === p.title
                                        return (
                                          <div
                                            key={p.id}
                                            className={`combobox-item ${isSel ? 'selected' : ''}`}
                                            onClick={() => {
                                              handleSelectCareerPreset(p.shortTitle, false)
                                              setIsCareerDropdownOpen(false)
                                              setCareerSearchTerm('')
                                            }}
                                          >
                                            <div className="combobox-item-left">
                                              <span className="combobox-item-title">{p.title}</span>
                                              <div className="combobox-item-meta">
                                                <span className="combobox-skill-badge">{p.skills.length} ทักษะหลัก</span>
                                                <span style={{ fontSize: '11px', color: '#64748b' }}>{p.category}</span>
                                              </div>
                                            </div>
                                            <div className="combobox-item-right">
                                              {isSel && <span className="combobox-selected-badge">✓ เลือกอยู่</span>}
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  )
                                })()}

                                {/* Group 4: Administration & Support */}
                                {(() => {
                                  const list = CAREER_PRESETS.filter((p) => p.category.includes('บริหาร') || p.category.includes('สนับสนุนองค์กร')).filter(
                                    (p) =>
                                      !careerSearchTerm.trim() ||
                                      p.title.toLowerCase().includes(careerSearchTerm.toLowerCase().trim()) ||
                                      p.shortTitle.toLowerCase().includes(careerSearchTerm.toLowerCase().trim()) ||
                                      p.category.toLowerCase().includes(careerSearchTerm.toLowerCase().trim())
                                  )
                                  if (list.length === 0) return null
                                  return (
                                    <div className="combobox-group">
                                      <div className="combobox-group-header">
                                        <span className="combobox-group-title">
                                          <span>🏢</span>
                                          <span>สายงานบริหาร & สนับสนุน (Administration & Support)</span>
                                        </span>
                                        <span className="combobox-group-count">{list.length} อาชีพ</span>
                                      </div>
                                      {list.map((p) => {
                                        const isSel = selectedMember.careerGoal === p.shortTitle || selectedMember.careerGoal === p.title
                                        return (
                                          <div
                                            key={p.id}
                                            className={`combobox-item ${isSel ? 'selected' : ''}`}
                                            onClick={() => {
                                              handleSelectCareerPreset(p.shortTitle, false)
                                              setIsCareerDropdownOpen(false)
                                              setCareerSearchTerm('')
                                            }}
                                          >
                                            <div className="combobox-item-left">
                                              <span className="combobox-item-title">{p.title}</span>
                                              <div className="combobox-item-meta">
                                                <span className="combobox-skill-badge">{p.skills.length} ทักษะหลัก</span>
                                                <span style={{ fontSize: '11px', color: '#64748b' }}>{p.category}</span>
                                              </div>
                                            </div>
                                            <div className="combobox-item-right">
                                              {isSel && <span className="combobox-selected-badge">✓ เลือกอยู่</span>}
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  )
                                })()}

                                {/* Group 5: Other / Custom Option */}
                                <div className="combobox-group">
                                  <div className="combobox-group-header">
                                    <span className="combobox-group-title">
                                      <span>✨</span>
                                      <span>ตัวเลือกกำหนดเอง (Custom)</span>
                                    </span>
                                  </div>
                                  <div
                                    className={`combobox-item ${selectedMember.careerGoal && (selectedMember.careerGoal.startsWith('อื่นๆ') || selectedMember.careerGoal.includes('กำหนดเอง')) ? 'selected' : ''}`}
                                    onClick={() => {
                                      handleSelectCareerPreset('other', false)
                                      setIsCareerDropdownOpen(false)
                                      setCareerSearchTerm('')
                                    }}
                                  >
                                    <div className="combobox-item-left">
                                      <span className="combobox-item-title" style={{ color: '#d97706', fontWeight: 700 }}>
                                        ⭐ อื่นๆ (ระบุชื่ออาชีพและกำหนดทักษะเอง)
                                      </span>
                                      <div className="combobox-item-meta">
                                        <span style={{ fontSize: '11px', color: '#78350f' }}>
                                          พิมพ์ชื่ออาชีพเป้าหมายได้อย่างอิสระ พร้อมกำหนดทักษะเฉพาะด้าน
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Empty Search Fallback */}
                                {careerSearchTerm.trim() && (
                                  <div className="combobox-empty-search">
                                    <div style={{ fontSize: '12.5px', color: '#64748b' }}>
                                      ต้องการใช้ชื่อ "<strong>{careerSearchTerm}</strong>" เป็นอาชีพใหม่?
                                    </div>
                                    <button
                                      type="button"
                                      className="btn-use-custom-search"
                                      onClick={() => {
                                        handleSelectCareerPreset(careerSearchTerm.trim(), false)
                                        setIsCareerDropdownOpen(false)
                                        setCareerSearchTerm('')
                                      }}
                                    >
                                      ✨ ใช้ชื่อ "{careerSearchTerm.trim()}" เป็นอาชีพเป้าหมาย
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="career-custom-input-wrap">
                        <label className="career-select-label">หรือระบุชื่ออาชีพเป้าหมายเอง (อิสระ):</label>
                        <input
                          id="member-career-custom-input"
                          type="text"
                          className="modal-text-input"
                          value={selectedMember.careerGoal || ''}
                          placeholder="เช่น นักแปลภาษา, นักออกแบบเสียง, เจ้าหน้าที่ HR, ฯลฯ"
                          onChange={(e) => {
                            const updated = { ...selectedMember, careerGoal: e.target.value }
                            setSelectedMember(updated)
                          }}
                        />
                      </div>

                      <button
                        type="button"
                        className="btn-load-preset"
                        onClick={() => {
                          const matched = CAREER_PRESETS.find(
                            (p) => p.shortTitle === selectedMember.careerGoal || p.title === selectedMember.careerGoal
                          )
                          if (matched) {
                            handleSelectCareerPreset(matched.shortTitle, true)
                          } else {
                            setSaveSuccessMsg('สำหรับอาชีพที่กำหนดเอง คุณสามารถใช้ปุ่ม "+ เพิ่มทักษะใหม่" ด้านล่างเพื่อเพิ่มทักษะเฉพาะด้านได้ตามต้องการ')
                            setTimeout(() => setSaveSuccessMsg(''), 4500)
                          }
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                        <span>โหลดชุดทักษะแนะนำสำหรับอาชีพนี้</span>
                      </button>
                    </div>
                  </div>

                  {saveSuccessMsg && (
                    <div className="month-save-alert" style={{ marginBottom: '16px' }}>
                      {saveSuccessMsg}
                    </div>
                  )}

                  {/* Skills Grid */}
                  <div className="skills-matrix-header">
                    <div>
                      <h4 className="skills-matrix-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span>รายการทักษะเฉพาะบุคคลและผลการประเมิน ({memberSkills.length} ทักษะ)</span>
                      </h4>
                      <p className="skills-matrix-sub">
                        Super User สามารถประเมินระดับความเชี่ยวชาญ (1-5 ดาว) ปรับสถานะ หรือลบ/เพิ่มทักษะได้ตามศักยภาพของนักศึกษา
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span className="skills-count-pill">
                        ผ่านเกณฑ์แล้ว: {memberSkills.filter((s) => s.status === 'ผ่านเกณฑ์แล้ว').length} / {memberSkills.length} ทักษะ
                      </span>
                      <button
                        type="button"
                        className="btn-open-add-skill-modal"
                        onClick={handleOpenAddSkillModal}
                        title="เปิดหน้าต่างป๊อปอัปเพิ่มทักษะใหม่เฉพาะบุคคล"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>+ เพิ่มทักษะใหม่ (ป๊อปอัป)</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Custom Skill Input Bar (กรอกทักษะเองด่วน) */}
                  <div className="quick-custom-skill-panel">
                    <div className="quick-panel-header">
                      <div className="quick-panel-title">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>กรอกทักษะใหม่ด้วยตนเอง (Custom Skill):</span>
                      </div>
                      <span className="quick-panel-hint">พิมพ์ชื่อทักษะใดๆ ที่ต้องการประเมิน แล้วกดเพิ่มลงในการ์ดได้ทันที</span>
                    </div>

                    <form onSubmit={handleQuickAddSkill} className="quick-panel-form">
                      <div className="quick-field-name">
                        <input
                          type="text"
                          className="quick-text-input"
                          placeholder="พิมพ์ชื่อทักษะที่ต้องการกรอกเอง เช่น Docker, การสื่อสาร, Figma, Python..."
                          value={quickSkillName}
                          onChange={(e) => setQuickSkillName(e.target.value)}
                        />
                      </div>

                      <div className="quick-field-cat">
                        <select
                          className="quick-select-input"
                          value={quickSkillCat}
                          onChange={(e) => setQuickSkillCat(e.target.value)}
                        >
                          <option value="Technical Skills">Technical Skills (ทักษะเฉพาะทาง)</option>
                          <option value="Soft Skills">Soft Skills (ทักษะการทำงานร่วมกับผู้อื่น)</option>
                          <option value="Assistive & Accessibility">Assistive & Accessibility (เครื่องมือช่วยเหลือ)</option>
                          <option value="General & Communication">General Skills (ทักษะทั่วไป)</option>
                          <option value="อื่นๆ (กำหนดเอง)">อื่นๆ (กำหนดเอง)</option>
                        </select>
                      </div>

                      <div className="quick-field-hours">
                        <input
                          type="number"
                          className="quick-hours-input"
                          placeholder="25"
                          value={quickSkillHours}
                          onChange={(e) => setQuickSkillHours(e.target.value)}
                          title="จำนวนชั่วโมงฝึกฝน"
                        />
                        <span className="quick-hours-unit">ชม.</span>
                      </div>

                      <button type="submit" className="btn-quick-submit-skill">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>+ กรอกทักษะนี้เพิ่ม</span>
                      </button>
                    </form>
                  </div>

                  <div className="skills-cards-grid">
                    {memberSkills.map((skill) => {
                      const catBadgeClass =
                        skill.category?.includes('Technical')
                          ? 'cat-tech'
                          : skill.category?.includes('Soft')
                          ? 'cat-soft'
                          : 'cat-assist'

                      const catIcon = skill.category?.includes('Technical') ? (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      ) : skill.category?.includes('Soft') ? (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>
                      ) : (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      )

                      const statusClass = skill.status === 'ผ่านเกณฑ์แล้ว' ? 'status-pill-passed' : skill.status === 'กำลังพัฒนา' ? 'status-pill-developing' : 'status-pill-improving'

                      return (
                        <div key={skill.id} className="skill-card-item">
                          <div className="skill-card-top">
                            <span className={`skill-cat-badge ${catBadgeClass}`} title={skill.category}>
                              {catIcon}
                              <span>{getShortCategoryName(skill.category)}</span>
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                              <div className="skill-direct-hours-wrap" title="ชั่วโมงฝึกฝน (คลิกเพื่อพิมพ์แก้ไขจำนวนชั่วโมงได้)">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <input
                                  type="number"
                                  className="skill-direct-hours-input"
                                  value={skill.hours ? skill.hours.replace(/[^0-9.]/g, '') : ''}
                                  placeholder="25"
                                  onChange={(e) => handleSkillHoursChange(skill.id, e.target.value ? `${e.target.value} ชม.` : '')}
                                />
                                <span className="skill-direct-hours-label">ชม.</span>
                              </div>
                              <button
                                type="button"
                                className="btn-skill-delete"
                                title="ลบทักษะนี้"
                                onClick={() => handleDeleteIndividualSkill(skill.id)}
                              >
                                ✕
                              </button>
                            </div>
                          </div>

                          {/* Skill Name Row with Inline Edit */}
                          {editingSkillId === skill.id ? (
                            <div className="skill-card-inline-edit-wrap">
                              <input
                                type="text"
                                className="skill-card-inline-edit-input"
                                value={editingSkillName}
                                autoFocus
                                onChange={(e) => setEditingSkillName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveSkillName(skill.id)
                                  if (e.key === 'Escape') handleCancelEditSkill()
                                }}
                              />
                              <div className="skill-card-inline-edit-btns">
                                <button
                                  type="button"
                                  className="btn-inline-save"
                                  onClick={() => handleSaveSkillName(skill.id)}
                                >
                                  ✓ บันทึก
                                </button>
                                <button
                                  type="button"
                                  className="btn-inline-cancel"
                                  onClick={handleCancelEditSkill}
                                >
                                  ยกเลิก
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="skill-name-header-row">
                              <h5
                                className="skill-card-name"
                                onClick={() => handleOpenSkillEvalModal(skill)}
                                style={{ cursor: 'pointer', margin: 0 }}
                                title="คลิกเพื่อเปิดป๊อปอัปประเมินทักษะ"
                              >
                                <span>{skill.name}</span>
                              </h5>
                              <button
                                type="button"
                                className="btn-card-edit-skill"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleStartEditSkill(skill)
                                }}
                                title="คลิกเพื่อพิมพ์แก้ไขชื่อทักษะนี้"
                              >
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                                <span>แก้ไข</span>
                              </button>
                            </div>
                          )}

                          <div className="skill-rating-box">
                            <div className="rating-label-row">
                              <span className="rating-label">ระดับความเชี่ยวชาญ:</span>
                              <span className="rating-num-tag">{skill.level || 1} / 5</span>
                            </div>
                            <div className="star-rating-buttons">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  className={`star-rate-btn ${star <= (skill.level || 0) ? 'active' : ''}`}
                                  onClick={() => handleSkillRatingChange(skill.id, star)}
                                  title={`ให้คะแนน ${star} ดาว`}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill={star <= (skill.level || 0) ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="1.8">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                  </svg>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Status & Open Full Eval Button */}
                          <div className="skill-status-box">
                            <div className={`skill-status-select-wrap ${statusClass}`}>
                              <select
                                className="skill-status-select"
                                value={skill.status || 'กำลังพัฒนา'}
                                onChange={(e) => handleSkillStatusChange(skill.id, e.target.value)}
                              >
                                <option value="ผ่านเกณฑ์แล้ว">ผ่านเกณฑ์แล้ว</option>
                                <option value="กำลังพัฒนา">กำลังพัฒนา</option>
                                <option value="ต้องปรับปรุง">ต้องปรับปรุง</option>
                              </select>
                            </div>

                            <button
                              type="button"
                              className="btn-open-popup-eval"
                              onClick={() => handleOpenSkillEvalModal(skill)}
                              title="เปิดหน้าต่างประเมินทักษะ บันทึกเวลา และแนบหลักฐาน"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                              <span>ประเมิน / ดูผล</span>
                            </button>
                          </div>
                        </div>
                      )
                    })}

                    {/* Add New Skill Trigger Card (Opens Popup Modal) */}
                    <div
                      className="add-skill-card-trigger"
                      onClick={handleOpenAddSkillModal}
                      role="button"
                      tabIndex={0}
                      title="คลิกเพื่อเปิดป๊อปอัปเพิ่มทักษะใหม่เฉพาะบุคคล"
                    >
                      <div className="add-skill-trigger-icon-wrap">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>
                      <h5 className="add-skill-trigger-title">+ เพิ่มทักษะใหม่เฉพาะบุคคล</h5>
                      <p className="add-skill-trigger-desc">
                        คลิกเพื่อเปิดหน้าต่างป๊อปอัป ระบุชื่อ หมวดหมู่ ชั่วโมง และระดับความเชี่ยวชาญ
                      </p>
                      <span className="btn-add-skill-trigger-badge">
                        <span>เปิดป๊อปอัปเพิ่มทักษะ</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Save Skills Button */}
                  <div className="skills-save-footer">
                    <button
                      type="button"
                      className="btn-save-member-skills"
                      onClick={handleSaveMemberSkills}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ marginRight: '8px' }}>
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                      <span>บันทึกการเลือกอาชีพและชุดทักษะเฉพาะบุคคล ({selectedMember.name})</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer (ส่วนท้าย: บันทึกผลการประเมิน & เปิดป๊อปอัป) */}
            <div className="mgmt-modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div className="modal-footer-status-summary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#475569' }}>
                {modalSubTab === 'monthly' ? (
                  <>
                    <span style={{ fontWeight: 700, color: '#1e3a8a', background: '#eff6ff', padding: '4px 10px', borderRadius: '7px', border: '1px solid #bfdbfe', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>รอบเดือน: {getMonthsList(selectedMember)[activeMonthIdx]?.monthName} ({activeMonthIdx + 1}/12)</span>
                    </span>
                    <span style={{ fontWeight: 800, color: '#047857', background: '#ecfdf5', padding: '4px 10px', borderRadius: '7px', border: '1px solid #a7f3d0' }}>
                      ความพร้อม: {evaluationData.score}% ({evaluationData.status})
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                      ผ่าน {(evaluationData.passedCriteria || []).length}/{(evaluationData.criteria || []).length} เกณฑ์
                    </span>
                  </>
                ) : (
                  <span style={{ fontWeight: 700, color: '#1e3a8a', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                    <span>อาชีพเป้าหมาย: <strong>{selectedMember.careerGoal || 'ยังไม่ระบุ'}</strong> ({memberSkills.length} ทักษะ)</span>
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button type="button" className="btn-modal-cancel" onClick={() => setShowMemberDetailModal(false)}>
                  ปิดหน้าต่าง
                </button>

                {modalSubTab === 'monthly' ? (
                  <>
                    <button
                      type="button"
                      className="btn-modal-save-eval"
                      onClick={handleSaveMonthlyEvaluation}
                      style={{
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '9px 22px',
                        fontWeight: 800,
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 3px 10px rgba(37, 99, 235, 0.28)',
                        transition: 'all 0.2s ease',
                      }}
                      title="บันทึกผลการประเมินและข้อเสนอแนะรอบเดือนปัจจุบัน"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>✓ บันทึกผลการประเมิน ({getMonthsList(selectedMember)[activeMonthIdx]?.shortMonth})</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn-save-member-skills"
                    onClick={handleSaveMemberSkills}
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '9px 22px',
                      fontWeight: 800,
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 3px 10px rgba(16, 185, 129, 0.28)',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    <span>บันทึกชุดทักษะเฉพาะบุคคล</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          Pop-up Modal: Super User Evaluation for Specific Skill
          ======================================================== */}
      {selectedSkillEvalModal && (
        <div className="assessment-modal-overlay" onClick={handleCloseSkillEvalModal} style={{ zIndex: 2600 }}>
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
                  <h3 className="modal-skill-title">ประเมินทักษะ: {evalModalData.name || selectedSkillEvalModal.name}</h3>
                  <div className="modal-skill-meta">
                    <span>กลุ่ม: {selectedSkillEvalModal.category || selectedMember?.careerGoal || 'เทคโนโลยีสารสนเทศ/IT'}</span>
                    <span>•</span>
                    <span className="modal-month-badge">รอบเดือน: {selectedSkillEvalModal.monthContext || `${getMonthsList(selectedMember)[activeMonthIdx]?.monthName || 'สิงหาคม 2568'} (เดือนล่าสุด)`}</span>
                  </div>
                </div>
              </div>

              <button type="button" className="modal-close-btn" onClick={handleCloseSkillEvalModal} title="ปิดหน้าต่าง">
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="assessment-modal-body">
              {/* Passing Rule Notice */}
              <div style={{
                background: '#f0fdf4',
                border: '1.5px solid #86efac',
                borderRadius: '10px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '12.5px',
                color: '#166534',
                lineHeight: '1.4'
              }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>💡</span>
                <div>
                  <strong>เงื่อนไขการผ่านเกณฑ์:</strong> ต้องระบุข้อมูลอย่างน้อย 1 รายการ 
                  (เลือกระดับประเมิน, บันทึกชั่วโมง, เขียนบันทึกผลงาน หรือแนบรูปภาพ — <em>ไม่จำเป็นต้องมีรูปภาพ แต่ต้องมีอย่างใดอย่างหนึ่ง</em>)
                </div>
              </div>

              {/* Skill Name Input (Always Editable / กรอกเองได้เสมอ) */}
              <div className="modal-form-card-section" style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px' }}>
                <label className="modal-section-label" style={{ marginBottom: '6px' }}>
                  <div className="modal-section-label-left">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>ชื่อทักษะ (สามารถพิมพ์แก้ไขหรือกรอกชื่อทักษะเองได้):</span>
                  </div>
                </label>
                <input
                  type="text"
                  className="modal-text-input"
                  value={evalModalData.name}
                  onChange={(e) => setEvalModalData({ ...evalModalData, name: e.target.value })}
                  placeholder="เช่น คอมพิวเตอร์, การเขียนโปรแกรม Full-Stack, การสื่อสาร..."
                  required
                  style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '9px 12px' }}
                />
              </div>

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
                    <button
                      type="button"
                      className={`modal-dropdown-trigger ${evalModalData.level ? 'has-value' : ''}`}
                      onClick={() => setIsEvalDropdownOpen(!isEvalDropdownOpen)}
                    >
                      <span>{evalModalData.level || '— คลิกเลือกผลการประเมิน —'}</span>
                      <span style={{ color: '#2563eb', display: 'flex', alignItems: 'center', transition: 'transform 0.2s ease', transform: isEvalDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>

                    {isEvalDropdownOpen && (
                      <ul className="modal-dropdown-menu">
                        {evaluationOptions.map((opt, idx) => (
                          <li
                            key={idx}
                            className={`modal-dropdown-item ${evalModalData.level === opt ? 'selected' : ''}`}
                            onClick={() => {
                              setEvalModalData({ ...evalModalData, level: opt })
                              setIsEvalDropdownOpen(false)
                            }}
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
                    onClick={handleAiAssistSkillEval}
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

                {/* Evidence Guide Inline Tip (ตรงตามรูปภาพ 100%) */}
                <div className="modal-evidence-guide-box">
                  <div className="modal-evidence-guide-text">
                    <span className="modal-evidence-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="9" y1="18" x2="15" y2="18" />
                        <line x1="10" y1="22" x2="14" y2="22" />
                        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                      </svg>
                      <span>เรียนรู้ทฤษฎีการเขียนโปรแกรม</span>
                    </span>
                    <span className="modal-evidence-sub">ช่องทาง: คอร์สออนไลน์, หนังสือ, เอกสารประกอบการสอน</span>
                  </div>

                  <button
                    type="button"
                    className="btn-modal-guide"
                    onClick={() => alert(`คำแนะนำหลักฐานสำหรับ "${evalModalData.name || selectedSkillEvalModal.name}":\n\n- สามารถแนบภาพถ่ายหน้าจอโปรเจกต์งาน, ลิงก์ GitHub หรือภาพการเข้าร่วมกิจกรรม\n- บันทึกชั่วโมงการฝึกฝนจริงเพื่อให้พี่เลี้ยงและที่ปรึกษาประเมินความพร้อมได้แม่นยำ`)}
                  >
                    ขอคำแนะนำหลักฐาน
                  </button>
                </div>
              </div>

              {/* Super User Decision Section: ให้ผ่านเกณฑ์ vs ไม่ผ่านเกณฑ์ */}
              <div
                className="modal-form-card-section"
                style={{
                  background: evalModalData.decision === 'passed' ? '#f0fdf4' : '#fef2f2',
                  border: evalModalData.decision === 'passed' ? '1.5px solid #86efac' : '1.5px solid #fca5a5',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div className="modal-section-label" style={{ marginBottom: '10px' }}>
                  <div className="modal-section-label-left">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={evalModalData.decision === 'passed' ? '#16a34a' : '#dc2626'} strokeWidth="2.2">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '13.5px' }}>
                      ผลการตัดสินโดย Super User / Mentor:
                    </span>
                  </div>
                  <span style={{
                    fontSize: '11.5px',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    background: evalModalData.decision === 'passed' ? '#dcfce7' : '#fee2e2',
                    color: evalModalData.decision === 'passed' ? '#15803d' : '#b91c1c',
                    border: evalModalData.decision === 'passed' ? '1px solid #bbf7d0' : '1px solid #fecaca',
                  }}>
                    {evalModalData.decision === 'passed' ? '✓ ผ่านเกณฑ์การประเมิน' : '✕ ไม่ผ่านเกณฑ์ (ต้องพัฒนาต่อ)'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setEvalModalData({ ...evalModalData, decision: 'passed' })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13.5px',
                      fontWeight: 800,
                      transition: 'all 0.15s ease',
                      background: evalModalData.decision === 'passed' ? '#10b981' : '#ffffff',
                      color: evalModalData.decision === 'passed' ? '#ffffff' : '#334155',
                      border: evalModalData.decision === 'passed' ? '2px solid #059669' : '1.5px solid #cbd5e1',
                      boxShadow: evalModalData.decision === 'passed' ? '0 3px 10px rgba(16, 185, 129, 0.35)' : 'none',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>✓ ให้ผ่านเกณฑ์ (Pass)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEvalModalData({ ...evalModalData, decision: 'failed' })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13.5px',
                      fontWeight: 800,
                      transition: 'all 0.15s ease',
                      background: evalModalData.decision === 'failed' ? '#ef4444' : '#ffffff',
                      color: evalModalData.decision === 'failed' ? '#ffffff' : '#334155',
                      border: evalModalData.decision === 'failed' ? '2px solid #dc2626' : '1.5px solid #cbd5e1',
                      boxShadow: evalModalData.decision === 'failed' ? '0 3px 10px rgba(239, 68, 68, 0.35)' : 'none',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span>✕ ให้ไม่ผ่านเกณฑ์ (Fail / พัฒนาต่อ)</span>
                  </button>
                </div>

                <div style={{ marginTop: '8px', fontSize: '11.5px', color: evalModalData.decision === 'passed' ? '#166534' : '#991b1b', lineHeight: 1.4 }}>
                  {evalModalData.decision === 'passed' ? (
                    <span>💡 <strong>สถานะผ่านเกณฑ์:</strong> ทักษะนี้จะถูกนับเป็นทักษะที่ผ่านเกณฑ์สะสม และคำนวณคะแนนตามสัดส่วนอัตโนมัติ</span>
                  ) : (
                    <span>⚠️ <strong>สถานะไม่ผ่านเกณฑ์:</strong> Super User ประเมินว่ายังไม่ผ่านเกณฑ์ ทักษะนี้จะไม่ถูกนับรวมในคะแนนสะสม และจะแสดงสถานะให้ปรับปรุง</span>
                  )}
                </div>
              </div>

              {/* 2. Time Spent Section (เวลาในการทำ) */}
              <div className="modal-form-card-section modal-time-spent-section">
                <div className="modal-section-label">
                  <div className="modal-section-label-left">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>เวลาในการทำ / ระยะเวลาและชั่วโมงที่ปฏิบัติ:</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#1d4ed8', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '9999px', padding: '2px 10px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {evalModalData.hours ? (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>รวม {evalModalData.hours} ชม.</span>
                      </>
                    ) : (
                      'ระบุเวลาที่ใช้'
                    )}
                  </span>
                </div>

                <div className="modal-time-inputs-container">
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
                          value={evalModalData.hours || ''}
                          onChange={(e) => setEvalModalData({ ...evalModalData, hours: e.target.value })}
                        />
                        <span className="modal-hours-unit">ชั่วโมง</span>
                      </div>
                    </div>

                    <div className="modal-quick-hours-chips">
                      <span className="quick-chip-label">เลือกด่วน:</span>
                      {['2', '3', '5', '6', '9', '12', '15'].map((hrs) => (
                        <button
                          key={hrs}
                          type="button"
                          className={`btn-quick-hour-chip ${String(evalModalData.hours) === String(hrs) ? 'active' : ''}`}
                          onClick={() => setEvalModalData({ ...evalModalData, hours: hrs })}
                        >
                          +{hrs} ชม.
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Photo / Evidence Image Upload & Gallery */}
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
                    {evalModalData.images?.length || 0} รูปภาพ
                  </span>
                </div>

                <div className="modal-photos-wrapper">
                  <label className="modal-photo-upload-zone">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                      onChange={handleSkillImageUpload}
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

                  {evalModalData.images && evalModalData.images.length > 0 && (
                    <div className="modal-photos-grid">
                      {evalModalData.images.map((imgSrc, imgIdx) => (
                        <div key={imgIdx} className="modal-photo-thumb-card">
                          <img src={imgSrc} alt={`Evidence ${imgIdx + 1}`} className="modal-photo-img" />
                          <button
                            type="button"
                            className="btn-modal-delete-photo"
                            onClick={() => handleRemoveSkillImage(imgIdx)}
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

              {/* 4. Notes Textarea */}
              <div className="modal-form-card-section">
                <div className="modal-section-label">
                  <div className="modal-section-label-left">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span>บันทึกข้อเสนอแนะและผลการประเมินจาก Super User / Mentor:</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>คำแนะนำสำหรับนักศึกษา</span>
                </div>

                <textarea
                  className="modal-textarea"
                  placeholder={`บันทึกข้อเสนอแนะ ผลการพัฒนา หรือจุดที่ควรพัฒนาเพิ่มเติมในทักษะ ${selectedSkillEvalModal.name} สำหรับ ${selectedMember?.name}...`}
                  value={evalModalData.note}
                  onChange={(e) => setEvalModalData({ ...evalModalData, note: e.target.value })}
                ></textarea>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="assessment-modal-footer">
              <button type="button" className="btn-modal-cancel" onClick={handleCloseSkillEvalModal}>
                ยกเลิก
              </button>

              <button
                type="button"
                className="btn-modal-save-eval"
                onClick={handleSaveSkillEval}
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

      {/* Add New Skill Popup Modal */}
      {showAddSkillModal && (
        <div
          className="assessment-modal-overlay"
          onClick={handleCloseAddSkillModal}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            overflow: 'hidden',
          }}
        >
          <div
            className="assessment-modal-dialog add-skill-popup-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '560px',
              width: '95%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: '16px',
              margin: 'auto',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.35)',
              background: '#ffffff',
            }}
          >
            {/* Modal Header */}
            <div
              className="assessment-modal-header"
              style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                borderBottom: '1.5px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div className="assessment-modal-title-group">
                <div className="assessment-modal-icon-badge" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <div>
                  <h3 className="assessment-modal-title" style={{ color: '#ffffff', margin: 0, fontSize: '15.5px' }}>
                    เพิ่มทักษะใหม่เฉพาะบุคคล (Add Skill)
                  </h3>
                  <p className="assessment-modal-sub" style={{ color: '#bfdbfe', margin: '2px 0 0 0', fontSize: '12px' }}>
                    สำหรับนักศึกษา: <strong>{selectedMember?.name}</strong> ({selectedMember?.institution || 'มทส.'})
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="btn-close-modal"
                onClick={handleCloseAddSkillModal}
                title="ปิดหน้าต่าง"
                style={{ color: '#ffffff' }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div
              className="assessment-modal-body"
              style={{
                padding: '14px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                overflowY: 'auto',
                flex: '1 1 auto',
                minHeight: 0,
                maxHeight: 'calc(85vh - 110px)',
              }}
            >
              {/* Field 1: Skill Name */}
              <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '10px' }}>
                <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <span>ชื่อทักษะที่ต้องการเพิ่ม: *</span>
                </label>
                <input
                  type="text"
                  className="modal-text-input"
                  placeholder="เช่น Docker, Figma, Data Modeling, Node.js, การสื่อสาร..."
                  value={addSkillModalData.name}
                  onChange={(e) => setAddSkillModalData({ ...addSkillModalData, name: e.target.value })}
                  autoFocus
                  style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', fontSize: '13.5px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                />
              </div>

              {/* Field 2: Category Dropdown */}
              <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '10px', position: 'relative' }}>
                <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  <span>หมวดหมู่ทักษะ (Skill Category):</span>
                </label>

                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    className="custom-cat-dropdown-trigger"
                    onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#0f172a' }}
                  >
                    <span>{categoryOptions.find((c) => c.id === addSkillModalData.categoryId)?.name || 'เลือกหมวดหมู่'}</span>
                    <span style={{ color: '#2563eb', transition: 'transform 0.2s', transform: isCatDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  {isCatDropdownOpen && (
                    <div
                      className="custom-cat-dropdown-menu"
                      style={{
                        position: 'absolute',
                        top: '105%',
                        left: 0,
                        right: 0,
                        background: '#ffffff',
                        border: '1.5px solid #bfdbfe',
                        borderRadius: '8px',
                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
                        zIndex: 99,
                        overflow: 'hidden',
                      }}
                    >
                      {categoryOptions.map((opt) => (
                        <div
                          key={opt.id}
                          className={`custom-cat-dropdown-item ${addSkillModalData.categoryId === opt.id ? 'selected' : ''}`}
                          style={{
                            padding: '9px 12px',
                            cursor: 'pointer',
                            fontSize: '12.5px',
                            fontWeight: addSkillModalData.categoryId === opt.id ? 700 : 500,
                            background: addSkillModalData.categoryId === opt.id ? '#eff6ff' : '#ffffff',
                            color: addSkillModalData.categoryId === opt.id ? '#1d4ed8' : '#334155',
                            borderBottom: '1px solid #f1f5f9',
                          }}
                          onClick={() => {
                            setAddSkillModalData({ ...addSkillModalData, categoryId: opt.id })
                            setIsCatDropdownOpen(false)
                          }}
                        >
                          <span>{opt.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {addSkillModalData.categoryId === 'other' && (
                  <div style={{ marginTop: '8px' }}>
                    <label className="modal-field-label" style={{ fontSize: '11.5px', color: '#475569', marginBottom: '3px', display: 'block' }}>
                      ระบุชื่อหมวดหมู่ที่ต้องการเอง:
                    </label>
                    <input
                      type="text"
                      className="modal-text-input"
                      placeholder="เช่น IoT, คลาวด์, ความปลอดภัยไซเบอร์..."
                      value={addSkillModalData.customCategory}
                      onChange={(e) => setAddSkillModalData({ ...addSkillModalData, customCategory: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', fontSize: '13px', borderRadius: '6px', border: '1.5px solid #93c5fd' }}
                    />
                  </div>
                )}
              </div>

              {/* Field 3: Training Hours with Quick Chips */}
              <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>เวลาที่ใช้ฝึกฝน / ปฏิบัติ:</span>
                  </label>
                  <span style={{ fontSize: '12.5px', color: '#2563eb', fontWeight: '800' }}>
                    {addSkillModalData.hours || '0'} ชั่วโมง
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="number"
                    min="0"
                    className="modal-text-input"
                    style={{ width: '80px', padding: '6px 10px', fontSize: '13.5px', fontWeight: '700', borderRadius: '6px', border: '1.5px solid #cbd5e1' }}
                    value={addSkillModalData.hours}
                    onChange={(e) => setAddSkillModalData({ ...addSkillModalData, hours: e.target.value })}
                    placeholder="15"
                  />
                  <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>ชั่วโมง</span>
                </div>

                <div className="modal-quick-hours-chips" style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                  <span className="quick-chip-label" style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>เลือกด่วน:</span>
                  {['2', '3', '5', '6', '9', '12', '15', '20', '25', '30'].map((h) => (
                    <button
                      key={h}
                      type="button"
                      className={`btn-quick-hour-chip ${String(addSkillModalData.hours) === String(h) ? 'active' : ''}`}
                      onClick={() => setAddSkillModalData({ ...addSkillModalData, hours: h })}
                      style={{ padding: '3px 8px', fontSize: '11.5px' }}
                    >
                      +{h} ชม.
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 4: Initial Level (Rating 1-5 Stars) & Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '10px' }}>
                  <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                    <span>ระดับความเชี่ยวชาญ:</span>
                    <span style={{ color: '#2563eb', fontWeight: 800 }}>{addSkillModalData.level} / 5</span>
                  </label>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-rate-btn ${star <= addSkillModalData.level ? 'active' : ''}`}
                        onClick={() => setAddSkillModalData({ ...addSkillModalData, level: star })}
                        style={{ cursor: 'pointer', padding: '3px' }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill={star <= addSkillModalData.level ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="1.8">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '10px' }}>
                  <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                    สถานะการประเมิน:
                  </label>
                  <select
                    className="skill-status-select"
                    value={addSkillModalData.status}
                    onChange={(e) => setAddSkillModalData({ ...addSkillModalData, status: e.target.value })}
                    style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', fontWeight: 700, background: '#ffffff' }}
                  >
                    <option value="กำลังพัฒนา">กำลังพัฒนา</option>
                    <option value="ผ่านเกณฑ์แล้ว">ผ่านเกณฑ์แล้ว</option>
                    <option value="ต้องปรับปรุง">ต้องปรับปรุง</option>
                  </select>
                </div>
              </div>

              {/* Field 5: Optional Notes */}
              <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '10px' }}>
                <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                  บันทึกข้อเสนอแนะหรือเป้าหมายเพิ่มเติม (ถ้ามี):
                </label>
                <textarea
                  className="modal-textarea"
                  placeholder="เช่น มุ่งเน้นทำโจทย์จริง, รอสอบ Certificate, หรือบันทึกเพื่อติดตามผลรอบถัดไป..."
                  value={addSkillModalData.note}
                  onChange={(e) => setAddSkillModalData({ ...addSkillModalData, note: e.target.value })}
                  style={{ width: '100%', boxSizing: 'border-box', minHeight: '52px', padding: '7px 10px', fontSize: '12.5px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                ></textarea>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className="assessment-modal-footer"
              style={{
                padding: '10px 18px',
                background: '#f8fafc',
                borderTop: '1.5px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '10px',
                flexShrink: 0,
              }}
            >
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={handleCloseAddSkillModal}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                ยกเลิก
              </button>

              <button
                type="button"
                className="btn-modal-save-eval"
                onClick={handleSaveAddSkillFromModal}
                disabled={!addSkillModalData.name.trim()}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: addSkillModalData.name.trim() ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : '#cbd5e1',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: addSkillModalData.name.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: addSkillModalData.name.trim() ? '0 2px 8px rgba(37, 99, 235, 0.3)' : 'none',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>✓ บันทึกเพิ่มทักษะ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Month Evaluation Edit Pop-up Modal */}
      {showEditMonthModal && (
        <div
          className="assessment-modal-overlay"
          onClick={handleCloseEditMonthModal}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            overflow: 'hidden',
          }}
        >
          <div
            className="assessment-modal-dialog edit-month-popup-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '780px',
              width: '95%',
              maxHeight: '86vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: '16px',
              margin: 'auto',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.35)',
              background: '#ffffff',
            }}
          >
            {/* Modal Header */}
            <div
              className="assessment-modal-header"
              style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                borderBottom: '1.5px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div className="assessment-modal-title-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="assessment-modal-icon-badge" style={{ background: 'rgba(255, 255, 255, 0.2)', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 className="assessment-modal-title" style={{ color: '#ffffff', margin: 0, fontSize: '16px', fontWeight: 800 }}>
                      แก้ไขผลการประเมิน: {getMonthsList(selectedMember)[activeMonthIdx]?.monthName}
                    </h3>
                    <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', color: '#ffffff', padding: '1px 8px', borderRadius: '9999px', fontWeight: 700 }}>
                      รอบที่ {activeMonthIdx + 1}/12
                    </span>
                  </div>
                  <p className="assessment-modal-sub" style={{ color: '#bfdbfe', margin: '2px 0 0 0', fontSize: '12.5px' }}>
                    สำหรับนักศึกษา: <strong>{selectedMember?.name}</strong> ({selectedMember?.institution || 'มทส.'})
                  </p>
                </div>
              </div>

              {/* Month Navigation inside modal & Close button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => handleSelectMonth(Math.max(0, activeMonthIdx - 1))}
                  disabled={activeMonthIdx === 0}
                  style={{
                    background: activeMonthIdx === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                    color: activeMonthIdx === 0 ? 'rgba(255,255,255,0.4)' : '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '5px 9px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: activeMonthIdx === 0 ? 'not-allowed' : 'pointer',
                  }}
                  title="เดือนก่อนหน้า"
                >
                  ◀
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectMonth(Math.min(11, activeMonthIdx + 1))}
                  disabled={activeMonthIdx === 11}
                  style={{
                    background: activeMonthIdx === 11 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                    color: activeMonthIdx === 11 ? 'rgba(255,255,255,0.4)' : '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '5px 9px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: activeMonthIdx === 11 ? 'not-allowed' : 'pointer',
                  }}
                  title="เดือนถัดไป"
                >
                  ▶
                </button>
                <button
                  type="button"
                  className="btn-close-modal"
                  onClick={handleCloseEditMonthModal}
                  title="ปิดหน้าต่าง"
                  style={{ color: '#ffffff', marginLeft: '6px', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveMonthlyEvaluation} style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', overflow: 'hidden' }}>
              <div
                className="assessment-modal-body"
                style={{
                  padding: '16px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  overflowY: 'auto',
                  flex: '1 1 auto',
                  minHeight: 0,
                  maxHeight: 'calc(86vh - 125px)',
                }}
              >
                {/* Field 1: Topic / Milestone */}
                <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px' }}>
                  <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span>หัวข้อหรือสมรรถนะหลักที่ประเมินประจำเดือน ({getMonthsList(selectedMember)[activeMonthIdx]?.shortMonth}): *</span>
                  </label>
                  <input
                    type="text"
                    className="modal-text-input"
                    value={evaluationData.topic}
                    onChange={(e) => setEvaluationData({ ...evaluationData, topic: e.target.value })}
                    placeholder="ระบุหัวข้อสมรรถนะที่มุ่งเน้นในเดือนนี้..."
                    required
                    style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', fontSize: '13.5px', fontWeight: 600, borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                  />
                </div>

                {/* Field 2: Criteria Checklist */}
                <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                    <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>เกณฑ์และทักษะที่ประเมินประจำเดือน:</span>
                      <span style={{ color: '#059669', fontSize: '11.5px', fontWeight: 800 }}>
                        ({evaluationData.passedCriteria?.length || 0}/{(evaluationData.criteria || []).length} ผ่านแล้ว)
                      </span>
                    </label>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={handleRandomizeMockEvaluation}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1px solid #d8b4fe',
                          background: '#faf5ff',
                          color: '#9333ea',
                          fontWeight: 700,
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                        title="สุ่มผลประเมินจำลอง (Mock) ให้มีทั้งผ่านเกณฑ์, กำลังพัฒนา และรอข้อมูล"
                      >
                        <span>🎲 สุ่มประเมินจำลอง</span>
                      </button>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>คลิกเพื่อสลับสถานะผ่าน/ไม่ผ่าน</span>
                    </div>
                  </div>

                  {/* Evidence & Passing Condition Banner */}
                  <div style={{
                    background: '#f8fafc',
                    border: '1px dashed #cbd5e1',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '11.5px',
                    color: '#334155',
                    lineHeight: '1.4'
                  }}>
                    <span style={{ fontSize: '14px', flexShrink: 0 }}>💡</span>
                    <span><strong>เงื่อนไขการผ่านเกณฑ์:</strong> ต้องมีข้อมูลการประเมินอย่างน้อย 1 รายการ (ระดับทักษะ, จำนวนชั่วโมง, บันทึกผลงาน หรือรูปภาพ — <em>ไม่จำเป็นต้องมีรูปภาพ แต่ต้องมีอย่างใดอย่างหนึ่ง</em>)</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
                    {(evaluationData.criteria || []).map((critText, cIdx) => {
                      const isPassed = (evaluationData.passedCriteria || []).includes(cIdx)
                      const detail = (evaluationData.criteriaDetails || {})[cIdx]
                      const hasSub = hasCriterionSubmission(cIdx, evaluationData.criteriaDetails)
                      return (
                        <div
                          key={cIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '7px 12px',
                            borderRadius: '8px',
                            background: isPassed ? '#ecfdf5' : detail?.superDecision === 'failed' ? '#fff5f5' : '#f8fafc',
                            border: isPassed ? '1.5px solid #a7f3d0' : detail?.superDecision === 'failed' ? '1.5px solid #fecaca' : '1px solid #e2e8f0',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                          onClick={() => handleOpenMonthlySkillModal(cIdx)}
                          title="คลิกเพื่อเปิดป๊อปอัปประเมินทักษะนี้ (7 ระดับมาตรฐาน แบบ User)"
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                            <span
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleCriteria(cIdx)
                              }}
                              title={isPassed ? "คลิกเพื่อสลับเป็นไม่ผ่านเกณฑ์" : hasSub ? "คลิกเพื่อสลับเป็นผ่านเกณฑ์" : "ต้องมีข้อมูลอย่างน้อย 1 รายการจึงจะผ่านได้ (คลิกเพื่อประเมิน)"}
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '5px',
                                background: isPassed ? '#10b981' : detail?.superDecision === 'failed' ? '#fee2e2' : '#ffffff',
                                border: isPassed ? 'none' : detail?.superDecision === 'failed' ? '1.5px solid #f87171' : '1.5px solid #cbd5e1',
                                color: isPassed ? '#ffffff' : detail?.superDecision === 'failed' ? '#dc2626' : '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                fontWeight: 900,
                                flexShrink: 0,
                                cursor: 'pointer',
                              }}
                            >
                              {isPassed ? '✓' : detail?.superDecision === 'failed' ? '✕' : ''}
                            </span>
                            <span style={{ fontSize: '13px', color: isPassed ? '#065f46' : detail?.superDecision === 'failed' ? '#991b1b' : '#334155', fontWeight: isPassed ? 700 : 500 }}>
                              {critText}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {detail?.level && (
                              <span
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  padding: '2px 8px',
                                  borderRadius: '6px',
                                  background: '#eff6ff',
                                  color: '#1d4ed8',
                                  border: '1px solid #bfdbfe',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  maxWidth: '140px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                                title={detail.level}
                              >
                                <span>⭐</span>
                                <span>{detail.level.split('.')[0] || 'ระดับ'}. {detail.level.slice(2, 12)}...</span>
                              </span>
                            )}

                            {detail?.hours && (
                              <span style={{ fontSize: '11px', color: '#0369a1', background: '#f0f9ff', padding: '2px 6px', borderRadius: '5px', fontWeight: 600, border: '1px solid #bae6fd' }}>
                                ⏱ {detail.hours} ชม.
                              </span>
                            )}

                            {detail?.note && detail.note.trim() && (
                              <span 
                                style={{ fontSize: '11px', color: '#475569', background: '#f1f5f9', padding: '2px 6px', borderRadius: '5px', fontWeight: 600, border: '1px solid #cbd5e1' }}
                                title={detail.note}
                              >
                                📝 มีบันทึก
                              </span>
                            )}

                            {detail?.images && detail.images.length > 0 && (
                              <span style={{ fontSize: '11px', color: '#7c3aed', background: '#f5f3ff', padding: '2px 6px', borderRadius: '5px', fontWeight: 700, border: '1px solid #ddd6fe' }}>
                                📷 {detail.images.length} รูป
                              </span>
                            )}

                            <span style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              background: isPassed ? '#d1fae5' : detail?.superDecision === 'failed' ? '#fee2e2' : hasSub ? '#fffbeb' : '#f1f5f9',
                              color: isPassed ? '#047857' : detail?.superDecision === 'failed' ? '#b91c1c' : hasSub ? '#b45309' : '#64748b',
                              border: isPassed ? '1px solid #a7f3d0' : detail?.superDecision === 'failed' ? '1px solid #fca5a5' : hasSub ? '1px solid #fde68a' : '1px solid #e2e8f0',
                            }}
                            title={isPassed ? "ผ่านเกณฑ์แล้ว" : detail?.superDecision === 'failed' ? "Super User ประเมินไม่ผ่านเกณฑ์" : hasSub ? "กำลังพัฒนา (ระดับยังไม่ถึงเกณฑ์ผ่าน)" : "ยังไม่มีข้อมูลส่ง (ไม่จำเป็นต้องมีรูป แต่ต้องมีอย่างใดอย่างหนึ่ง)"}
                            >
                              {isPassed ? 'ผ่านเกณฑ์แล้ว' : detail?.superDecision === 'failed' ? '✕ ไม่ผ่านเกณฑ์' : hasSub ? 'กำลังพัฒนา' : 'รอข้อมูล/ประเมิน'}
                            </span>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleOpenMonthlySkillModal(cIdx)
                              }}
                              style={{
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '3px 8px',
                                fontSize: '11px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                boxShadow: '0 1px 4px rgba(37, 99, 235, 0.25)',
                              }}
                              title="เปิดหน้าต่างประเมินทักษะนี้แบบ User"
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                              <span>ประเมิน</span>
                            </button>

                            {(evaluationData.criteria || []).length > 1 && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRemoveCriteria(cIdx, e)
                                }}
                                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px 4px', fontSize: '12px' }}
                                title="ลบเกณฑ์นี้"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Add Criteria Input */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="text"
                      className="modal-text-input"
                      placeholder="+ พิมพ์เกณฑ์หรือทักษะใหม่ประจำเดือนนี้ แล้วกดเพิ่ม..."
                      value={customSkillText}
                      onChange={(e) => setCustomSkillText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddCustomSkill(e)
                        }
                      }}
                      style={{ flex: 1, padding: '7px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1.5px solid #cbd5e1' }}
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomSkill}
                      style={{
                        background: '#eff6ff',
                        color: '#1d4ed8',
                        border: '1.5px solid #bfdbfe',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      + เพิ่มเกณฑ์
                    </button>
                  </div>
                </div>

                {/* Field 3: Score & Status (2 Columns) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                  {/* Left: Score Slider */}
                  <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12px', margin: 0 }}>
                        ความพร้อมสู่อาชีพ (%):
                      </label>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: evaluationData.score >= 80 ? '#059669' : evaluationData.score >= 60 ? '#2563eb' : '#f59e0b' }}>
                        {evaluationData.score}%
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        style={{ flex: 1, cursor: 'pointer' }}
                        value={evaluationData.score}
                        onChange={(e) => setEvaluationData({ ...evaluationData, score: Number(e.target.value) })}
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        style={{ width: '65px', padding: '6px', fontSize: '13px', fontWeight: 800, textAlign: 'center', borderRadius: '6px', border: '1.5px solid #cbd5e1' }}
                        value={evaluationData.score}
                        onChange={(e) => setEvaluationData({ ...evaluationData, score: Number(e.target.value) })}
                      />
                    </div>
                    {/* Quick Sync hint */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        คำนวณตามเกณฑ์: <strong>{calcAutoScore(evaluationData.passedCriteria, evaluationData.criteria)}%</strong>
                      </span>
                      <button
                        type="button"
                        onClick={handleForceSyncScore}
                        style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '11px', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        ซิงค์คะแนนตามเกณฑ์
                      </button>
                    </div>
                  </div>

                  {/* Right: Status Select */}
                  <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px' }}>
                    <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
                      สถานะการพัฒนาในเดือนนี้:
                    </label>
                    <select
                      className="modal-select-input"
                      value={evaluationData.status === 'พร้อมยื่นสมัครงานแล้ว' ? 'พัฒนาได้ดีมาก' : evaluationData.status}
                      onChange={(e) => setEvaluationData({ ...evaluationData, status: e.target.value })}
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '12.5px', fontWeight: 700, background: '#ffffff' }}
                    >
                      <option value="พัฒนาได้ดีมาก">พัฒนาได้ดีมาก (Very Good / &gt;80%)</option>
                      <option value="กำลังพัฒนาได้ดี">กำลังพัฒนาได้ดี (On Track / 60-79%)</option>
                      <option value="ต้องการคำแนะนำเพิ่มเติม">ต้องการคำแนะนำเพิ่มเติม (40-59%)</option>
                      <option value="ต้องเร่งปรับปรุงทักษะ">ต้องเร่งปรับปรุงทักษะ (&lt;40%)</option>
                      <option value="ยังไม่ถึงรอบประเมิน">ยังไม่ถึงรอบประเมิน (Pending)</option>
                    </select>
                  </div>
                </div>

                {/* Field 4: Passed Skills & Hours (2 Columns) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '10px' }}>
                    <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                      จำนวนทักษะที่ผ่านเกณฑ์สะสม:
                    </label>
                    <input
                      type="text"
                      className="modal-text-input"
                      placeholder="เช่น 8 ทักษะ หรือ 4 ทักษะ"
                      value={evaluationData.passedSkills}
                      onChange={(e) => setEvaluationData({ ...evaluationData, passedSkills: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', fontSize: '13px', borderRadius: '6px', border: '1.5px solid #cbd5e1' }}
                    />
                  </div>

                  <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12px', margin: 0 }}>
                        ชั่วโมงการเรียนรู้ / ฝึกอบรม:
                      </label>
                      <span style={{ fontSize: '11.5px', color: '#2563eb', fontWeight: 800 }}>{evaluationData.hours}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input
                        type="text"
                        className="modal-text-input"
                        placeholder="เช่น 30 ชม."
                        value={evaluationData.hours}
                        onChange={(e) => setEvaluationData({ ...evaluationData, hours: e.target.value })}
                        style={{ flex: 1, padding: '7px 10px', fontSize: '13px', borderRadius: '6px', border: '1.5px solid #cbd5e1' }}
                      />
                      {['15 ชม.', '20 ชม.', '25 ชม.', '30 ชม.'].map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setEvaluationData({ ...evaluationData, hours: h })}
                          style={{
                            background: evaluationData.hours === h ? '#eff6ff' : '#f8fafc',
                            color: evaluationData.hours === h ? '#1d4ed8' : '#64748b',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            padding: '5px 7px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Field 5: Super User Mentor Notes */}
                <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px' }}>
                  <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>บันทึกข้อเสนอแนะและผลการประเมินจาก Super User / Mentor: *</span>
                  </label>
                  <textarea
                    className="modal-textarea"
                    placeholder={`พิมพ์คำแนะนำและผลการประเมินสำหรับหัวข้อ "${evaluationData.topic}" ประจำเดือน ${getMonthsList(selectedMember)[activeMonthIdx]?.shortMonth}...`}
                    value={evaluationData.mentorNote}
                    onChange={(e) => setEvaluationData({ ...evaluationData, mentorNote: e.target.value })}
                    rows={3}
                    required
                    style={{ width: '100%', boxSizing: 'border-box', minHeight: '65px', padding: '8px 12px', fontSize: '12.5px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                  />
                </div>

                {/* Field 6: Action Item Plan */}
                <div className="modal-form-card-section" style={{ background: '#ffffff', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '10px' }}>
                  <label className="modal-field-label" style={{ fontWeight: 800, color: '#0f172a', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                    แผนการพัฒนาต่อเนื่อง / มอบหมายงานในเดือนถัดไป (Action Item):
                  </label>
                  <input
                    type="text"
                    className="modal-text-input"
                    placeholder="เช่น ทำ Mini Project เชื่อมต่อ API หรือ ฝึกซ้อม Mock Interview สหกิจศึกษา..."
                    value={evaluationData.advicePlan}
                    onChange={(e) => setEvaluationData({ ...evaluationData, advicePlan: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '7px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1.5px solid #cbd5e1' }}
                  />
                </div>

                {/* Section 7: User Self-Assessment Information Card */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#475569', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>ข้อมูลการประเมินตนเองของนักศึกษา (User Self-Assessment)</span>
                    </span>
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#047857', background: '#ecfdf5', padding: '2px 8px', borderRadius: '9999px', border: '1px solid #a7f3d0' }}>
                      ประเมินตนเอง: {evaluationData.userSelfScore || 0}%
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
                    {evaluationData.userSelfNote || 'นักศึกษาได้บันทึกการเรียนรู้และส่งหลักฐานในระบบเรียบร้อย'}
                  </div>
                  {evaluationData.userSelfEvidence && (
                    <div style={{ marginTop: '5px', fontSize: '11.5px' }}>
                      <span style={{ color: '#64748b' }}>หลักฐานแนบ: </span>
                      <a href={evaluationData.userSelfEvidence} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                        {evaluationData.userSelfEvidence}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div
                className="assessment-modal-footer"
                style={{
                  padding: '12px 22px',
                  background: '#f8fafc',
                  borderTop: '1.5px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '10px',
                  flexShrink: 0,
                }}
              >
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={handleCloseEditMonthModal}
                  style={{ padding: '8px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  className="btn-modal-save-eval"
                  style={{
                    padding: '9px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>✓ บันทึกผลการประเมินรอบเดือน ({getMonthsList(selectedMember)[activeMonthIdx]?.shortMonth})</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
