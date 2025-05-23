import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Download, ExternalLink } from 'lucide-react';

const ProfileCard = () => {
  const profileData = {
    name: "David Chukwuebuka Achibiri",
    title: "Full Stack Developer",
    nationality: "Nigeria",
    email: "davidachibiri8@gmail.com",
    phone: "+234 904 714 4503",
    location: "Abuja, NG",
    website: "https://ebukas.com",
    github: "https://github.com/joules65",
    linkedin: "https://linkedin.com/in/davidachibiri1",
    bio: "Passionate developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies.",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "GraphQL", "HTML5", "CSS3", "Tailwind CSS", "Next.js"], 
  };

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
               backgroundSize: '40px 40px'
             }}>
        </div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 right-16 w-32 h-32 border border-gray-100 rotate-45"></div>
        <div className="absolute top-40 right-32 w-16 h-16 bg-blue-50"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 border border-blue-100 rotate-12"></div>
        <div className="absolute bottom-48 left-8 w-8 h-8 bg-gray-100"></div>
        <div className="absolute top-1/3 left-4 w-2 h-20 bg-blue-50"></div>
        <div className="absolute top-1/2 right-8 w-48 h-1 bg-gray-50"></div>
        
        {/* Code-like elements */}
        <div className="absolute top-24 left-1/4 text-gray-100 font-mono text-xs select-none">
          {'{ developer: true }'}
        </div>
        <div className="absolute bottom-40 right-1/4 text-blue-100 font-mono text-xs select-none">
          {'const skills = [...tech]'}
        </div>
        <div className="absolute top-2/3 left-12 text-gray-100 font-mono text-xs rotate-90 select-none">
          {'// building the future'}
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-8 py-16 relative z-10">
        
        {/* Header */}
        <div className="border-b border-gray-100 pb-12 mb-12">
          <div className="flex items-start gap-8">
            
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 bg-black text-white flex items-center justify-center text-2xl font-medium">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 border-2 border-white"></div>
            </div>

            {/* Name & Bio */}
            <div className="flex-1">
              <h1 className="text-4xl font-light text-black mb-2 tracking-tight">
                {profileData.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4 font-light">
                {profileData.title}
              </p>
              <p className="text-gray-700 leading-relaxed max-w-2xl">
                {profileData.bio}
              </p>
            </div>

            {/* Status */}
            <div className="text-right">
              <div className="inline-block px-3 py-1 border border-blue-600 text-blue-600 text-sm">
                Available
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-x-16 gap-y-6 mb-16">
          <div>
            <div className="text-gray-500 text-sm uppercase tracking-wide mb-1">Email</div>
            <a href={`mailto:${profileData.email}`} className="text-black hover:text-blue-600 transition-colors">
              {profileData.email}
            </a>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm uppercase tracking-wide mb-1">Phone</div>
            <a href={`tel:${profileData.phone}`} className="text-black hover:text-blue-600 transition-colors">
              {profileData.phone}
            </a>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm uppercase tracking-wide mb-1">Location</div>
            <div className="text-black">{profileData.location}</div>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm uppercase tracking-wide mb-1">Nationality</div>
            <div className="text-black">{profileData.nationality}</div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-black mb-8 border-b border-gray-100 pb-2">
            Technical Skills
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {profileData.skills.map((skill, index) => (
              <div key={index} className="text-center py-3 border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-colors cursor-default">
                <span className="text-sm font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <a 
            href={profileData.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-black text-white hover:bg-gray-900 transition-colors"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </a>
          
          <a 
            href={profileData.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </a>
          
          <a 
            href={profileData.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-black hover:border-black transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Portfolio
          </a>
          
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-black hover:border-black transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Download vCard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;