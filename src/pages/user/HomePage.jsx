import React from 'react'
import iwImg from '../../assets/iw.jpg'
import './HomePage.css'

export default function HomePage({ currentUser }) {
  return (
    <div className="home-page-container">
      <section className="banner-card">
        <h1 className="banner-title">Individualized Career Planning</h1>
      </section>

      <section className="hero-image-wrapper">
        <img
          src={iwImg}
          alt="Individualized Career Planning - Inclusive Workplace"
          className="hero-image"
        />
      </section>

      {currentUser && (
        <div className="welcome-user-footer">
          ยินดีต้อนรับคุณ <span className="welcome-user-name">{currentUser.name}</span> เข้าสู่ระบบ
        </div>
      )}
    </div>
  )
}
