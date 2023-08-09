import React from "react";
import { Routes, Route, Link } from "react-router-dom"
import { Layout, Typography, Space } from "antd"

import './App.css'

// when file name is not given, js will look for 'index.js'
import { Navbar, Exchanges, Homepage, Cryptocurrencies, News, CryptoDetails } from "./components";

function App() {
  return (
    <>
      <div className="app">

        <header className="navbar">
          <Navbar />
        </header>

        <main className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route exact path="/" element={<Homepage />} />

                <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />

                <Route path="/exchanges/:coinId?" element={<Exchanges />} />

                <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />

                <Route exact path="/news" element={<News />} />

              </Routes>
            </div>
          </Layout>

          <footer className="footer">
            <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
              CryptoApp <br />
              All rights reversed
            </Typography.Title>

            <Space>
              <Link to='/'>Home</Link>
              <Link to='/exchanges'>Exchanges</Link>
              <Link to='/news'>News</Link>
            </Space>
          </footer> 
        </main >

      </div>
    </>
  )
}

export default App
