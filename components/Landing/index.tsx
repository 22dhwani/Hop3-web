import React from 'react';

import LandingLayout from '../../layouts/LandingLayout';
import Ecosystem from './Ecosystem';
import Hero from './Hero';
import Portal from './Portal';
import Community from './Community';
import Footer from './Footer';

const Landing = () => {
  return (
    <LandingLayout>
      <Hero />
      <Portal />
      <Ecosystem />
      <Community />
      <Footer />
    </LandingLayout>
  );
};

export default Landing;
