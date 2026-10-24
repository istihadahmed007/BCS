'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  BookOpen,
  Stethoscope,
  Target,
  Trophy,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  CreditCard,
  BookCheck,
  ChevronRight,
  LogIn,
} from 'lucide-react';
import GoogleLoginModal from '@/components/auth/GoogleLoginModal';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F6FF] text-[#11112C] font-sans selection:bg-[#6545E8] selection:text-white">
      {/* ====================================================================
          1. FLOATING TRANSLUCENT NAVIGATION BAR (Matching Reference Image)
      ==================================================================== */}
      <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <nav
          className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-full px-5 sm:px-7 py-3 border border-purple-100/80 dark:border-purple-900/40 shadow-[0_8px_30px_rgba(101,69,232,0.08)] flex items-center justify-between transition-all"
          aria-label="Main Navigation"
        >
          {/* Brand Logo on the Left */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#11112C] dark:text-white">
              BCS<span className="text-[#6545E8]">Crack</span>
            </span>
          </Link>

          {/* Centered Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-semibold text-[#62627A] dark:text-slate-300">
            <Link
              href="/"
              className="text-[#6545E8] dark:text-purple-400 font-bold transition-colors hover:text-[#4830B8]"
            >
              Home
            </Link>
            <Link
              href="#programs"
              className="hover:text-[#6545E8] transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/question-bank"
              className="hover:text-[#6545E8] transition-colors"
            >
              Question Bank
            </Link>
            <Link
              href="/study/today"
              className="hover:text-[#6545E8] transition-colors"
            >
              Daily Practice
            </Link>
            <Link
              href="/packages"
              className="hover:text-[#6545E8] transition-colors"
            >
              Packages
            </Link>
            <Link
              href="#contact"
              className="hover:text-[#6545E8] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* CTA Button on the Right */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLoginModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#6545E8] hover:bg-[#4830B8] text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-600/25 transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center gap-1.5"
            >
              <span>Enroll Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-700 hover:text-[#6545E8] hover:bg-purple-50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl p-5 border border-purple-100 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-bold text-[#6545E8] bg-purple-50"
            >
              Home
            </Link>
            <Link
              href="#programs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#6545E8]"
            >
              Courses & Programs
            </Link>
            <Link
              href="/question-bank"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#6545E8]"
            >
              <span>Question Bank</span>
              <span className="text-[10px] font-bold text-[#6545E8] bg-purple-50 px-2 py-0.5 rounded-full">20K+</span>
            </Link>
            <Link
              href="/study/today"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#6545E8]"
            >
              Daily Practice
            </Link>
            <Link
              href="/packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#6545E8]"
            >
              Packages & Pricing
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#6545E8]"
            >
              Contact & Schedule
            </Link>
            <div className="pt-2 border-t border-purple-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginModalOpen(true);
                }}
                className="w-full py-2.5 rounded-full bg-[#6545E8] text-white text-sm font-bold text-center shadow-md shadow-purple-600/25"
              >
                Enroll Now
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          2. HERO SECTION — RECREATED FROM REFERENCE IMAGE
      ==================================================================== */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-12 md:pb-24 max-w-6xl mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#EDE9FE] via-[#F5F3FF] to-[#F8F6FF] border border-purple-100/60 shadow-[0_20px_50px_rgba(101,69,232,0.07)]">
          {/* Background Photography with Soft Lavender Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/landing/hero_study_banner.jpg"
              alt="Students learning in modern coaching academy"
              fill
              priority
              className="object-cover object-center opacity-65"
            />
            {/* Soft Translucent White & Lavender Gradient Overlay for maximum typography readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:w-3/4" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/40" />
          </div>

          {/* Hero Content Grid */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 max-w-xl">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-purple-100 shadow-xs text-xs font-bold text-[#6545E8]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Future Focused Learning</span>
              </div>

              {/* Three-line Bold Headline matching Reference */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#11112C] leading-[1.06]">
                Learn <br />
                <span className="text-[#6545E8]">Smarter</span> <br />
                Grow Faster.
              </h1>

              {/* Supporting Description */}
              <p className="text-sm sm:text-base text-[#62627A] leading-relaxed">
                A modern coaching institute and exam portal with premium purple aesthetics, clean layouts, strong typography, smooth spacing, and a fresh student-focused experience.
              </p>

              {/* Subtitle in Bengali for Context */}
              <p className="text-xs sm:text-sm text-[#4830B8] font-medium bangla-font">
                ৪৬তম সাধারণ বিসিএস ও ৫১তম বিশেষ বিসিএস (স্বাস্থ্য) প্রিলিমিনারি ২০২৬ নির্ভুল প্রস্তুতি।
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/study/today"
                  className="px-7 py-3.5 rounded-full bg-[#6545E8] hover:bg-[#4830B8] text-white text-sm font-bold shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.03] active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="#programs"
                  className="px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#11112C] text-sm font-bold border border-purple-100 shadow-xs hover:shadow-md transition-all hover:scale-[1.03] active:scale-[0.98]"
                >
                  Explore Courses
                </Link>
              </div>
            </div>

            {/* Right Column: Floating Secondary Image Card with Stats Overlay */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group hover:shadow-purple-500/20 transition-all duration-300">
                {/* Secondary Image: Students studying in library */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                  <Image
                    src="/images/landing/hero_card_students.jpg"
                    alt="University students collaborating in library"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Compact Statistics Overlay Card matching Reference */}
                <div className="p-4 sm:p-5 bg-white border-t border-purple-50 flex items-center justify-between divide-x divide-purple-100 text-center">
                  <div className="flex-1 px-3">
                    <div className="text-xl sm:text-2xl font-black text-[#11112C]">
                      20K+
                    </div>
                    <div className="text-[11px] text-[#62627A] font-medium mt-0.5">
                      Questions Indexed
                    </div>
                  </div>
                  <div className="flex-1 px-3">
                    <div className="text-xl sm:text-2xl font-black text-[#6545E8]">
                      96%
                    </div>
                    <div className="text-[11px] text-[#62627A] font-medium mt-0.5">
                      Success Rate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. INTRODUCTION SECTION — "Built For The Next Generation"
      ==================================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Rounded Educational Photography */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-purple-100/80 bg-white group">
              <div className="relative h-80 sm:h-96 w-full">
                <Image
                  src="/images/landing/intro_group_study.jpg"
                  alt="Students discussing academic topics around a wooden desk"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Key Metrics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#6545E8] uppercase tracking-wider">
                Modern Education
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#11112C] tracking-tight leading-tight">
                Built For The <br />
                Next Generation.
              </h2>
              {/* Subtle Purple Accent Line */}
              <div className="h-1 w-12 bg-[#6545E8] rounded-full mt-3" />
            </div>

            <p className="text-sm sm:text-base text-[#62627A] leading-relaxed">
              Designed with smooth visual flow, modern spacing, minimal layouts, and premium educational branding that feels completely different from ordinary coaching websites.
            </p>

            <p className="text-xs sm:text-sm text-[#62627A] bangla-font leading-relaxed">
              বাংলাদেশ সরকারি কর্ম কমিশন (BPSC)-এর সিলেবাস অনুসারে নির্দিষ্ট নেগেটিভ মার্কিং (-০.৫০), স্পেসড রিভিশন এবং বিষয়ভিত্তিক দুর্বলতা দূরীকরণের বৈজ্ঞানিক প্ল্যাটফর্ম।
            </p>

            {/* Prominent Statistics with Vertical Separation */}
            <div className="pt-2 flex items-center gap-10 divide-x divide-purple-100">
              <div className="pr-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#11112C]">
                  120+
                </div>
                <div className="text-xs sm:text-sm text-[#62627A] font-medium mt-1">
                  Expert Mentors & Curators
                </div>
              </div>
              <div className="pl-10">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#6545E8]">
                  35+
                </div>
                <div className="text-xs sm:text-sm text-[#62627A] font-medium mt-1">
                  Advanced Programs & Batches
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. POPULAR PROGRAMS / COURSES SECTION
      ==================================================================== */}
      <section id="programs" className="bg-[#F3F0FF] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Centered Heading matching Reference */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#11112C] tracking-tight">
              Popular Programs.
            </h2>
            <p className="text-xs sm:text-sm text-[#62627A] leading-relaxed">
              Structured modern sections with balanced spacing, smooth visuals, and clean desktop-first layouts.
            </p>
          </div>

          {/* 3-Column Responsive Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Program 1: General BCS */}
            <div className="bg-white rounded-3xl p-7 border border-purple-100/60 shadow-[0_8px_30px_rgba(101,69,232,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                {/* Purple Icon Container matching Reference */}
                <div className="h-12 w-12 rounded-2xl bg-[#EDE9FE] text-[#6545E8] flex items-center justify-center shadow-xs">
                  <GraduationCap className="h-6 w-6" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#11112C] group-hover:text-[#6545E8] transition-colors">
                    General BCS Preparation
                  </h3>
                  <p className="text-xs text-[#6545E8] font-bold bangla-font">
                    ১০টি সাধারণ প্রিলিমিনারি বিষয়
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#62627A] leading-relaxed">
                  Advanced preparation programs with concept-focused learning, chapter drilling, and 10th to 46th BCS past question banks.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-purple-50">
                <Link
                  href="/question-bank"
                  className="text-xs font-bold text-[#6545E8] group-hover:text-[#4830B8] flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Question Bank</span>
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Program 2: Special BCS Medical */}
            <div className="bg-white rounded-3xl p-7 border border-purple-100/60 shadow-[0_8px_30px_rgba(101,69,232,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                {/* Purple Icon Container */}
                <div className="h-12 w-12 rounded-2xl bg-[#EDE9FE] text-[#6545E8] flex items-center justify-center shadow-xs">
                  <Stethoscope className="h-6 w-6" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#11112C] group-hover:text-[#6545E8] transition-colors">
                    Special BCS (Health & Dental)
                  </h3>
                  <p className="text-xs text-[#6545E8] font-bold bangla-font">
                    সহকারী সার্জন ও সহকারী ডেন্টাল সার্জন
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#62627A] leading-relaxed">
                  Premium medical entrance guidance with personalized clinical papers, anatomy, physiology, and pathology drills.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-purple-50">
                <Link
                  href="/packages"
                  className="text-xs font-bold text-[#6545E8] group-hover:text-[#4830B8] flex items-center gap-1.5 transition-colors"
                >
                  <span>View Medical Batch</span>
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Program 3: Foundation & Mock Tests */}
            <div className="bg-white rounded-3xl p-7 border border-purple-100/60 shadow-[0_8px_30px_rgba(101,69,232,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                {/* Purple Icon Container */}
                <div className="h-12 w-12 rounded-2xl bg-[#EDE9FE] text-[#6545E8] flex items-center justify-center shadow-xs">
                  <Trophy className="h-6 w-6" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#11112C] group-hover:text-[#6545E8] transition-colors">
                    Foundation & Full Mocks
                  </h3>
                  <p className="text-xs text-[#6545E8] font-bold bangla-font">
                    ২০০ নম্বরের পূর্ণাঙ্গ মডেল টেস্ট
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#62627A] leading-relaxed">
                  Future-ready academic programs with real BPSC 120-minute timed exams, deterministic negative marking, and Mistake Notebook.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-purple-50">
                <Link
                  href="/test"
                  className="text-xs font-bold text-[#6545E8] group-hover:text-[#4830B8] flex items-center gap-1.5 transition-colors"
                >
                  <span>Start Mock Test</span>
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. LARGE PHOTOGRAPHIC CALL-TO-ACTION SECTION & BOTTOM CARDS
      ==================================================================== */}
      <section id="contact" className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-6xl mx-auto space-y-8">
        {/* Main Photographic CTA Container */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-2xl min-h-[420px] sm:min-h-[460px] flex items-center">
          {/* Background Photography: Focused student with headphones */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/landing/cta_student_headphones.jpg"
              alt="Focused student studying in front of laptop with headphones"
              fill
              className="object-cover object-center"
            />
            {/* Lavender-tinted translucent overlay on the right */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent lg:bg-gradient-to-l lg:from-slate-950/95 lg:via-slate-900/80 lg:to-transparent" />
          </div>

          {/* Content Positioned on the Right on Desktop */}
          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-16 flex justify-end">
            <div className="max-w-md space-y-5 text-left">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                Premium Learning Experience
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Education That <br />
                <span className="text-[#A78BFA]">Feels</span> Inspiring.
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Clean white and soft purple aesthetics combined with modern layouts, strong typography, and smooth premium website composition.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setLoginModalOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-[#6545E8] hover:bg-[#4830B8] text-white text-sm font-bold shadow-xl shadow-purple-600/40 transition-all hover:scale-[1.03] active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <span>Join BCSCrack</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            6. BOTTOM INFORMATION CARDS (Visit Campus & Class Timings)
        ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Visit Campus / Contact Us */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-[0_8px_30px_rgba(101,69,232,0.06)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-[#EDE9FE] text-[#6545E8] flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#11112C]">
                  Visit Campus & Hub
                </h3>
                <p className="text-xs text-[#62627A]">
                  Direct Candidate Support & Advisory
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#62627A] pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#6545E8] shrink-0 mt-0.5" />
                <span>21 Future Avenue, BPSC Cadre Zone, Agargaon, Dhaka 1207</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#6545E8] shrink-0" />
                <span>+880 1800 456 280</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#6545E8] shrink-0" />
                <span>support@vartualtutor.com / hello@bcs.vartualtutor.com</span>
              </div>
            </div>
          </div>

          {/* Card 2: Class Timings / Learning Schedule */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-[0_8px_30px_rgba(101,69,232,0.06)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-[#EDE9FE] text-[#6545E8] flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#11112C]">
                  Class Timings
                </h3>
                <p className="text-xs text-[#62627A]">
                  Weekly Examination & Drill Schedule
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#62627A] pt-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium">
                  <Clock className="h-4 w-4 text-[#6545E8]" />
                  <span>Monday – Friday</span>
                </span>
                <span className="font-bold text-[#11112C]">6 AM – 11 PM</span>
              </div>
              <div className="flex items-center justify-between border-t border-purple-50 pt-2">
                <span className="flex items-center gap-2 font-medium">
                  <Clock className="h-4 w-4 text-[#6545E8]" />
                  <span>Saturday</span>
                </span>
                <span className="font-bold text-[#11112C]">9 AM – 5 PM</span>
              </div>
              <div className="flex items-center justify-between border-t border-purple-50 pt-2">
                <span className="flex items-center gap-2 font-medium">
                  <Clock className="h-4 w-4 text-[#6545E8]" />
                  <span>Sunday</span>
                </span>
                <span className="font-bold text-[#6545E8]">Online Sessions & Full Mock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. FOOTER
      ==================================================================== */}
      <footer className="bg-white border-t border-purple-100/80 text-[#62627A] text-xs py-10 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-[#11112C]">
              BCS<span className="text-[#6545E8]">Crack</span>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-[11px] text-[#62627A]">
              Smart Exams, Better Future
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <Link href="/question-bank" className="hover:text-[#6545E8] transition-colors">
              Question Bank
            </Link>
            <Link href="/study/today" className="hover:text-[#6545E8] transition-colors">
              Daily Practice
            </Link>
            <Link href="/mistake-notebook" className="hover:text-[#6545E8] transition-colors">
              Mistake Notebook
            </Link>
            <Link href="/mock-tests" className="hover:text-[#6545E8] transition-colors">
              Mock Tests
            </Link>
            <Link href="/previous-year-questions" className="hover:text-[#6545E8] transition-colors">
              Previous Years
            </Link>
            <Link href="/packages" className="hover:text-[#6545E8] transition-colors">
              Packages
            </Link>
            <Link href="/syllabus" className="hover:text-[#6545E8] transition-colors">
              Syllabus
            </Link>
            <Link href="/admin/sources" className="hover:text-[#6545E8] transition-colors">
              Source Registry
            </Link>
            <Link href="/dashboard" className="hover:text-[#6545E8] transition-colors">
              Portal
            </Link>
          </div>

          <div className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} BCS Crack. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Google Sign-In Modal */}
      <GoogleLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        redirectUrl="/dashboard"
      />
    </div>
  );
}
