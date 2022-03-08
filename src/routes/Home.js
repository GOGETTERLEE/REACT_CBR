import React from 'react'
import Navbar from '../components/home/Navbar'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import './HomeStyle.css'

const Home = () => {
  return (
    <div>
      <section className="header">
        <Navbar />
        <Hero />
      </section>
        <About />
    </div>
  )
}

export default Home