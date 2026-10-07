import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Benefits from '../components/landing/Benefits';
import CTA from '../components/landing/CTA';
import Footer from '../components/common/Footer';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
import NewProjectModal from '../components/dashboard/NewProjectModal';
import { useAuth } from '../context/AuthContext';

export default function LandingPage({ onNavigateDashboard, onOpenEditorWithProject }) {
  const { isAuthenticated } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState('');

  const handleGeneratePrompt = (prompt) => {
    if (isAuthenticated) {
      setIsNewProjectOpen(true);
    } else {
      setPendingPrompt(prompt);
      setIsRegisterOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    if (pendingPrompt) {
      setIsNewProjectOpen(true);
      setPendingPrompt('');
    } else {
      onNavigateDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col selection:bg-[#FF00A8] selection:text-white">
      {/* Navbar */}
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onNavigateDashboard={onNavigateDashboard}
      />

      {/* Hero Section */}
      <Hero
        onGeneratePrompt={handleGeneratePrompt}
        onGetStarted={() => {
          if (isAuthenticated) onNavigateDashboard();
          else setIsRegisterOpen(true);
        }}
      />

      {/* Core Features */}
      <Features />

      {/* How it Works */}
      <HowItWorks />

      {/* Why WebCraft / Benefits */}
      <Benefits />

      {/* Call To Action */}
      <CTA
        onGetStarted={() => {
          if (isAuthenticated) onNavigateDashboard();
          else setIsRegisterOpen(true);
        }}
      />

      {/* Footer */}
      <Footer />

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        onSwitchToForgot={() => {
          setIsLoginOpen(false);
          setIsForgotOpen(true);
        }}
        onSuccess={handleAuthSuccess}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
        onSuccess={handleAuthSuccess}
      />

      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        onSwitchToLogin={() => {
          setIsForgotOpen(false);
          setIsLoginOpen(true);
        }}
      />

      {/* Project Generator Modal */}
      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onProjectCreated={(project) => {
          setIsNewProjectOpen(false);
          onOpenEditorWithProject(project._id || project.id);
        }}
      />
    </div>
  );
}
