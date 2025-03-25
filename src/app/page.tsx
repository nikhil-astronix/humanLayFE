"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, Cloud, BookText, Video, Users } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-[#0B1121] text-white">
          <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
              >
                <motion.h1 
                  className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
                  variants={fadeInUp}
                >
                  Discover Grants, Connect with Winners, Grow Your Business
                </motion.h1>
                <motion.p 
                  className="text-gray-400 text-lg mb-8"
                  variants={fadeInUp}
                >
                  Discover relevant funding instantly, explore over 20,000 expert-curated grants, and find best-fit funders from a database of over 400,000.
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-4"
                  variants={fadeInUp}
                >
                  <Link 
                    href="/auth/register" 
                    className="inline-flex items-center px-6 py-3 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-medium"
                  >
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <button className="inline-flex items-center px-6 py-3 backdrop-blur-2xl bg-white/[0.02] rounded-md p-6 border border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-gray-600 text-white font-medium">
                    <Play className="mr-2 h-5 w-5" /> Watch Demo
                  </button>
                </motion.div>
                <motion.div 
                  className="mt-8 flex items-center gap-4"
                  variants={fadeInUp}
                >
                  <div className="flex -space-x-2">
                    {[
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    ].map((avatar, i) => (
                      <motion.div
                        key={i}
                        className="relative w-8 h-8"
                        initial={{ scale: 0, x: -10 }}
                        animate={{ scale: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Image
                          className="rounded-full border-2 border-[#0B1121]"
                          src={avatar}
                          alt={`Team member ${i + 1}`}
                          width={36}
                          height={36}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-400">Trusted by 1000+ founders</p>
                    <p className="text-xs text-gray-500">Join our growing community</p>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="backdrop-blur-2xl bg-white/[0.02] rounded-2xl p-6 border border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white/90">Your Grant Matches</h3>
                      <p className="text-sm text-gray-400/80">Based on your profile</p>
                    </div>
                    <span className="px-3 py-1 bg-orange-600/10 text-orange-600 rounded-full text-sm backdrop-blur-md border border-orange-500/20">
                      87 matches
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      {
                        title: "Federal Innovation Grant",
                        amount: "$250,000",
                        desc: "Supporting early-stage technology startups in developing innovative solutions.",
                        tags: ["Tech", "Innovation"]
                      },
                      {
                        title: "Startup Growth Fund",
                        amount: "$175,000",
                        desc: "Accelerating growth for promising early-stage companies with proven traction.",
                        tags: ["Growth", "Startup"]
                      }
                    ].map((grant, i) => (
                      <motion.div
                        key={i}
                        className="bg-white/[0.03] backdrop-blur-md rounded-lg p-4 border border-white/[0.05] hover:bg-white/[0.05] transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-white">{grant.title}</h4>
                          <span className="text-orange-600">{grant.amount}</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{grant.desc}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {grant.tags.map((tag, j) => (
                              <span 
                                key={j} 
                                className="px-2.5 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <motion.section 
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Transform Your Business Journey</h2>
            <p className="text-gray-500">
              Join thousands of successful founders who have secured funding and grown their business with Human
            </p>
            <Link 
              href="/auth/register" 
              className="inline-flex items-center px-6 py-3 mt-8 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-medium"
            >
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "$50M+", label: "Grants Awarded", sublabel: "To innovative startups" },
              { number: "1000+", label: "Startups Funded", sublabel: "Across all sectors" },
              { number: "500+", label: "Active Grants", sublabel: "Ready to guide you" },
              { number: "95%", label: "Success Rate", sublabel: "In securing funding" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md border border-gray-100"
              >
                <h3 className="text-3xl font-bold text-orange-600 mb-2">{stat.number}</h3>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xs text-gray-400">{stat.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Available Grants Section */}
        <motion.section 
          className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div 
            className="flex justify-between items-center mb-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-gray-900">Available Grants</h2>
           
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Federal Innovation Grant",
                amount: "$250,000",
                org: "U.S. Department of Commerce",
                desc: "Supporting early-stage technology startups in developing innovative solutions",
                deadline: "April 15, 2025",
                tags: ["Tech", "Innovation", "Research"],
              },
              {
                title: "Small Business Relief Fund",
                amount: "$75,000",
                org: "Economic Development",
                desc: "Financial assistance for small businesses affected by economic challenges",
                deadline: "May 1, 2025",
                tags: ["Retail", "Small Business"],
              },
              {
                title: "Diversity in Tech Grant",
                amount: "$150,000",
                org: "Tech for All Foundation",
                desc: "Supporting underrepresented founders in the technology sector",
                deadline: "Jan 30, 2025",
                tags: ["Diversity", "Technology"],
              },
            ].map((grant, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md border border-gray-100"
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">{grant.title}</h3>
                    <p className="text-sm text-gray-500">{grant.org}</p>
                  </div>
                  <span className="text-orange-600 font-medium">{grant.amount}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{grant.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {grant.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Deadline: {grant.deadline}
                  </div>
                    <Link href="/grants" className="text-orange-600 text-sm hover:text-orange-600">
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Resources Section */}
        <motion.section 
          className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-2xl font-bold mb-8 text-gray-900"
            variants={fadeInUp}
          >
            Available Resources
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Cloud Credits",
                desc: "$5,000 in Google Cloud credits for your startup",
                cta: "Claim Now",
                icon: Cloud,
                color: "text-orange-600"
              },
              {
                title: "Startup Guide",
                desc: "Comprehensive guide to launching your startup",
                cta: "Download",
                icon: BookText,
                color: "text-orange-600"
              },
              {
                title: "Workshop Access",
                desc: "Online workshops and training sessions",
                cta: "Join Now",
                icon: Video,
                color: "text-orange-600"
              },
              {
                title: "Community",
                desc: "Connect with other founders and mentors",
                cta: "Connect",
                icon: Users,
                color: "text-orange-600"
              },
            ].map((resource, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md border border-gray-100"
                variants={scaleIn}
                whileHover={{ 
                  y: -5, 
                  transition: { 
                    duration: 0.4, 
                    ease: "easeOut" 
                  } 
                }}
                initial="initial"
                animate="animate"
                transition={{
                  delay: i * 0.2, 
                  duration: 0.8,  
                  ease: "easeOut"
                }}
              >
                <div className="mb-4">
                  {resource.icon && (
                    <resource.icon className={`w-8 h-8 ${resource.color}`} />
                  )}
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">{resource.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{resource.desc}</p>
                <Link 
                  href="/resources" 
                  className="inline-flex items-center text-orange-600 text-sm hover:text-orange-600"
                >
                  {resource.cta} 
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mentors Section */}
        <motion.section 
          className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-2xl font-bold mb-8 text-gray-900"
            variants={fadeInUp}
          >
            Featured Mentors
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "David Chen",
                role: "Tech Founder & Investor",
                desc: "20+ years experience in scaling startups and securing funding",
                tags: ["Fundraising", "Strategy", "Growth"],
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              },
              {
                name: "Sarah Martinez",
                role: "Product Strategy Lead",
                desc: "Expert in product development and market validation",
                tags: ["Product", "UX", "Marketing"],
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              },
              {
                name: "Michael Johnson",
                role: "Finance Expert",
                desc: "Specializes in financial planning and grant applications",
                tags: ["Finance", "Grants", "Planning"],
                image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              },
            ].map((mentor, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md border border-gray-100"
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                    <p className="text-sm text-gray-500">{mentor.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">{mentor.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.button 
                  className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md text-sm font-medium text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Schedule Meeting
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <section className="bg-[#0B1121] text-white">
          <motion.div 
            className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl font-bold mb-4"
              variants={fadeInUp}
            >
              Ready to Start Your Journey?
            </motion.h2>
            <motion.p 
              className="text-gray-400 mb-8"
              variants={fadeInUp}
            >
              Join thousands of founders who have successfully secured funding through Human Levered
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href="/auth/register"
                className="inline-flex items-center px-6 py-3 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-medium"
              >
                Create Your Profile
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
