import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div id='mainslider' class="intro">
  <div class="sides">
  <Link to={localStorage.getItem('authorisation')?'student':'login'} style={{ textDecoration: 'none' }}>
    <div class="side monkey">
      <h2 class="name">Student</h2> 
      <div><img src='assets/student.png' width={250}/></div>
    </div>
    </Link>
    <div class="versus">
    </div>
    <Link to={localStorage.getItem('authorisation')?'mentor':'login'} style={{ textDecoration: 'none' }}>
    <div class="side robot">
      <h2 class="name">Mentor</h2> 
      <div><img src='assets/teacher.png' width={250}/></div>
    </div>
    </Link>
  </div>
</div>
  )
}