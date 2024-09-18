import React from 'react';
import Header from '../shared/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer';
import Chatbot from '../shared/ChatBot';
import { Container } from '../components/Container';


const RootLayout = () => {
  return (
    <Container>
      <Header />
      <main>
        <Chatbot />
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
}

export default RootLayout;
