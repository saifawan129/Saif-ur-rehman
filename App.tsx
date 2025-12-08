import React, { useState, useMemo, useCallback } from 'react';
import { Project, TechStack, MeetingSlot } from './types';
import { PROJECTS, INITIAL_SLOTS } from './constants';
import BotWidget from './components/BotWidget';

const App = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [slots, setSlots] = useState<MeetingSlot[]>(INITIAL_SLOTS);

  // -- Portfolio Logic --
  const filteredProjects = useMemo(() => {
    if (selectedTag === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.tags.includes(selectedTag as TechStack));
  }, [selectedTag]);

  const tags = ['All', ...Object.values(TechStack)];

  // -- Scheduler Logic (Mock Backend) --
  const handleBookSlot = useCallback((slotId: string): boolean => {
    let success = false;
    setSlots(prevSlots => {
      const slotIndex = prevSlots.findIndex(s => s.id === slotId);
      if (slotIndex !== -1 && prevSlots[slotIndex].available) {
        success = true;
        const newSlots = [...prevSlots];
        newSlots[slotIndex] = { ...newSlots[slotIndex], available: false };
        return newSlots;
      }
      return prevSlots;
    });
    return success;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl tracking-tight text-slate-900">
              Dev<span className="text-blue-600">Folio</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <button className="md:hidden text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Building Scalable <span className="text-blue-600">Backend</span> & <br/> 
            High-Perf <span className="text-indigo-600">Frontend</span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Senior Full Stack Engineer specializing in Java Spring Boot, Angular, and React architectures. 
            Transforming complex requirements into robust, deployable solutions.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#projects" className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
              View Work
            </a>
            <button 
               onClick={() => alert("Try the AI Bot in the bottom right corner!")}
               className="px-8 py-3 rounded-full bg-white text-slate-700 border border-slate-200 font-medium hover:bg-slate-50 transition-colors"
            >
              Schedule Meeting
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Featured Projects</h2>
              <p className="mt-2 text-slate-600">A selection of enterprise and open-source work.</p>
            </div>
            
            {/* Tag Filters */}
            <div className="mt-6 md:mt-0 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex space-x-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedTag === tag 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map(project => (
              <div key={project.id} className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="h-64 overflow-hidden relative">
                   <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                     <span className="text-white font-medium">View Case Study &rarr;</span>
                   </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-600 mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
             <div className="text-center py-20">
               <p className="text-slate-500">No projects found for this filter.</p>
             </div>
          )}
        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="py-16 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
             <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">Powering Solutions With</p>
             <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap grayscale opacity-60">
                {/* Simple text placeholders for logos */}
                <span className="text-xl font-bold text-slate-800">Java Spring</span>
                <span className="text-xl font-bold text-slate-800">Angular</span>
                <span className="text-xl font-bold text-slate-800">PostgreSQL</span>
                <span className="text-xl font-bold text-slate-800">React</span>
                <span className="text-xl font-bold text-slate-800">Tailwind</span>
                <span className="text-xl font-bold text-slate-800">Google Cloud</span>
             </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Let's Work Together</h2>
          <p className="text-lg text-slate-600 mb-8">
            I'm currently available for freelance projects and senior engineering roles. 
            Use the AI Assistant to book a time, or drop me an email.
          </p>
          <a href="mailto:hello@example.com" className="text-blue-600 font-semibold text-lg hover:underline">
            hello@devfolio.ai
          </a>
        </div>
      </section>

      <footer className="py-8 bg-slate-900 text-slate-400 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} DevFolio. Built with React, Tailwind, and Gemini.</p>
      </footer>

      {/* AI Scheduler Widget */}
      <BotWidget slots={slots} onBookSlot={handleBookSlot} />
    </div>
  );
};

export default App;