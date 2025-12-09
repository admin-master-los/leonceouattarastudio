import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  ExternalLink,
  Github,
  TrendingUp,
  X,
  Rocket,
  CheckCircle2,
  Award,
  Code2,
  Server,
  Cloud,
  AlertTriangle,
  Zap,
  Clock,
  Users,
} from 'lucide-react';
import { useProjects } from '../lib/useSupabaseData';

const Portfolio: React.FC = () => {
  const { data: projects, loading } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 🚀 Fonction pour ouvrir la modale avec un projet
  const openProjectModal = (project: any, index: number) => {
    setSelectedProject(project);
    setSelectedProjectIndex(index);
    setIsAnimating(true);
    setTimeout(() => setIsModalOpen(true), 50);
  };

  // 🔒 Fonction pour fermer la modale
  const closeProjectModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedProject(null);
    }, 300);
  };

  // 🔒 Bloquer le scroll quand la modale est ouverte
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // ⌨️ Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeProjectModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  return (
    <section id="portfolio" className="py-12 sm:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
            Portfolio{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Projets
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Découvrez quelques-unes de nos réalisations les plus impactantes
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
          {!loading && projects.map((project, index) => {
            return (
              <div
                key={project.id}
                className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-500 group hover:scale-[1.02] lg:hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Project Image */}
                <div className="relative">
                  <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Action buttons overlay */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => window.open(project.link, '_blank')}
                        className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300"
                      >
                        <ExternalLink size={14} className="sm:w-4 sm:h-4 text-white" />
                      </button>
                      <button className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-purple-500 hover:border-purple-500 transition-all duration-300">
                        <Github size={14} className="sm:w-4 sm:h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <h4 className="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-xs sm:text-sm">
                      <Github size={16} className="sm:w-[18px] sm:h-[18px] text-cyan-400" />
                      Stack Technique
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium hover:bg-gradient-to-r hover:from-cyan-500/40 hover:to-purple-500/40 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <h4 className="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-xs sm:text-sm">
                      <TrendingUp size={16} className="sm:w-[18px] sm:h-[18px] text-purple-400" />
                      Résultats Obtenus
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      {project.results.map((result, resultIndex) => (
                        <div
                          key={resultIndex}
                          className="text-center bg-white/5 rounded-lg p-2.5 sm:p-3"
                        >
                          <div className="text-xs sm:text-sm font-bold text-purple-400">
                            {result}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => openProjectModal(project, index)}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 font-semibold text-sm sm:text-base hover:scale-105 inline-flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
                        Voir le projet
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        document
                          .querySelector('#contact')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className="flex-1 border-2 border-cyan-400 text-cyan-400 px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-cyan-400 hover:text-black transition-all duration-300 font-semibold text-sm sm:text-base hover:scale-105 inline-flex items-center justify-center gap-2"
                    >
                      Projet similaire ?
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 px-4">
            Prêt à lancer votre projet ?
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Transformons ensemble vos idées en réalité digitale. Discutons de
            votre vision et créons quelque chose d'exceptionnel.
          </p>
          <button
            onClick={() =>
              document
                .querySelector('#contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 font-bold text-base sm:text-lg hover:scale-105 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Démarrer maintenant</span>
          </button>
        </div>
      </div>

      {/* 🎭 MODALE RESPONSIVE OPTIMISÉE */}
      {isModalOpen &&
        selectedProject &&
        selectedProject.content_project_modal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black">
            {/* Image de fond fixe avec overlay noir transparent */}
            <div
              className="fixed inset-0 opacity-20"
              style={{
                backgroundImage: `url(${selectedProject.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
              }}
            />
            
            {/* Overlay noir supplémentaire */}
            <div className="fixed inset-0 bg-black/60" />

            {/* Contenu scrollable */}
            <div className="relative min-h-screen">
              {/* HERO SECTION - Responsive */}
              <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                {/* Close Button - Position fixe en haut à droite */}
                <button
                  onClick={closeProjectModal}
                  className="fixed top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-50 group"
                  aria-label="Fermer"
                >
                  <X size={20} className="sm:w-6 sm:h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Breadcrumb */}
                <div className="mb-6 sm:mb-8 flex items-center gap-2 text-xs sm:text-sm text-gray-400 flex-wrap justify-center">
                  <span className="hover:text-cyan-400 cursor-pointer transition-colors">Home</span>
                  <span>›</span>
                  <span className="hover:text-cyan-400 cursor-pointer transition-colors">Projets</span>
                  <span>›</span>
                  <span className="text-white truncate max-w-[150px] sm:max-w-none">{selectedProject.title}</span>
                </div>

                {/* Hero Title - Responsive */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 text-center max-w-6xl leading-tight px-4">
                  {selectedProject.content_project_modal.hero_title}
                </h1>

                {/* Hero Subtitle - Responsive */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 text-center max-w-4xl leading-relaxed px-4">
                  {selectedProject.content_project_modal.hero_subtitle}
                </p>

                {/* Hero Bullets - Responsive */}
                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 text-left max-w-3xl w-full px-4">
                  {selectedProject.content_project_modal.solution.features.slice(0, 3).map(
                    (feature: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 sm:gap-4 text-sm sm:text-base md:text-lg lg:text-xl text-white"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex-shrink-0 mt-1.5 sm:mt-2" />
                        <span className="flex-1">{feature.replace(/^[•\-]\s*/, '')}</span>
                      </div>
                    )
                  )}
                </div>

                {/* CTA Button - Responsive */}
                <Link
                  to="/reserver"
                  target="_blank"
                  className="group relative px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 bg-transparent border-2 border-cyan-400 text-white rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-300 font-semibold text-sm sm:text-base lg:text-lg"
                >
                  <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                    <span className="truncate">{selectedProject.content_project_modal.cta_text}</span>
                    <ExternalLink size={18} className="sm:w-5 sm:h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </Link>

                {/* Metrics en bas - Responsive */}
                <div className="w-full px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:absolute lg:bottom-12 lg:left-0 lg:right-0">
                  <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {selectedProject.content_project_modal.metrics
                      .slice(0, 4)
                      .map((metric: any, idx: number) => (
                        <div
                          key={idx}
                          className="text-center p-3 sm:p-0"
                        >
                          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                            {metric.value}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-400">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Scroll indicator - Hidden on mobile */}
                <div className="hidden lg:block absolute bottom-32 left-1/2 -translate-x-1/2 animate-bounce">
                  <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-3 bg-gray-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* CONTENU RESTANT - Responsive */}
              <div className="relative bg-black/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-12 sm:space-y-16 lg:space-y-20">
                  
                  {/* Section Introduction */}
                  <div className="max-w-4xl">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-6 sm:mb-8">
                      {selectedProject.content_project_modal.description}
                    </p>
                  </div>

                  {/* Section Challenge - Responsive */}
                  <div className="space-y-4 sm:space-y-6">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 lg:mb-8">
                      {selectedProject.content_project_modal.challenge.title}
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-4xl">
                      {selectedProject.content_project_modal.challenge.description}
                    </p>
                  </div>

                  {/* Section Solution */}
                  <div className="space-y-4 sm:space-y-6">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 lg:mb-8">
                      {selectedProject.content_project_modal.solution.title}
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-4xl mb-6 sm:mb-8">
                      {selectedProject.content_project_modal.solution.description}
                    </p>

                    {/* Features Grid - Responsive */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                      {selectedProject.content_project_modal.solution.features.map(
                        (feature: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-lg sm:rounded-xl hover:bg-white/10 transition-colors"
                          >
                            <CheckCircle2
                              size={20}
                              className="sm:w-6 sm:h-6 text-cyan-400 mt-0.5 sm:mt-1 flex-shrink-0"
                            />
                            <span className="text-sm sm:text-base text-gray-300 leading-relaxed">{feature}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Section Résultats avec citation - Responsive */}
                  <div className="space-y-8 sm:space-y-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 lg:mb-8">
                      Résultats & Impact
                    </h2>

                    {/* Metrics Grid - Responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      {selectedProject.content_project_modal.metrics.map(
                        (result: any, index: number) => (
                          <div
                            key={index}
                            className="p-4 sm:p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg sm:rounded-xl"
                          >
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 sm:mb-3">
                              {result.value}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
                              {result.label}
                            </div>
                            <div className="text-xs text-gray-500">
                              {result.description}
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Citation Client - Responsive */}
                    {selectedProject.content_project_modal.testimonial && (
                      <div className="relative mt-12 sm:mt-16 p-6 sm:p-8 lg:p-12 bg-white/5 backdrop-blur-sm border-l-4 border-cyan-400 rounded-r-lg sm:rounded-r-xl">
                        <div className="absolute -top-4 sm:-top-6 left-4 sm:left-8 text-6xl sm:text-7xl lg:text-8xl text-cyan-400/20 font-serif">"</div>
                        <blockquote className="relative z-10">
                          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed mb-6 sm:mb-8 italic">
                            {selectedProject.content_project_modal.testimonial.quote}
                          </p>
                          <footer className="flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                              {selectedProject.content_project_modal.testimonial.author.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <div className="text-white font-semibold text-base sm:text-lg truncate">
                                {selectedProject.content_project_modal.testimonial.author}
                              </div>
                              <div className="text-gray-400 text-xs sm:text-sm truncate">
                                {selectedProject.content_project_modal.testimonial.role}
                                {' · '}
                                {selectedProject.content_project_modal.testimonial.company}
                              </div>
                            </div>
                          </footer>
                        </blockquote>
                      </div>
                    )}
                  </div>

                  {/* Section Technologies - Responsive */}
                  <div className="space-y-6 sm:space-y-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 lg:mb-8">
                      Stack Technique
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                      {/* Frontend */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                          <div className="p-2 sm:p-3 bg-cyan-500/20 rounded-lg">
                            <Code2 size={20} className="sm:w-6 sm:h-6 text-cyan-400" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white">Frontend</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {selectedProject.content_project_modal.technologies.frontend.map(
                            (tech: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 border border-cyan-500/30 text-cyan-400 rounded-lg text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* Backend */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                          <div className="p-2 sm:p-3 bg-purple-500/20 rounded-lg">
                            <Server size={20} className="sm:w-6 sm:h-6 text-purple-400" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white">Backend</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {selectedProject.content_project_modal.technologies.backend.map(
                            (tech: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 border border-purple-500/30 text-purple-400 rounded-lg text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* Infrastructure */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                          <div className="p-2 sm:p-3 bg-orange-500/20 rounded-lg">
                            <Cloud size={20} className="sm:w-6 sm:h-6 text-orange-400" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white">Infrastructure</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {selectedProject.content_project_modal.technologies.infrastructure.map(
                            (tech: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 border border-orange-500/30 text-orange-400 rounded-lg text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section CTA Final - Responsive */}
                  <div className="text-center py-12 sm:py-16 border-t border-gray-700/50">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 px-4">
                      Un projet similaire en tête ?
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
                      Discutons de vos objectifs et créons ensemble une solution sur-mesure
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                      {selectedProject.content_project_modal.demo_link &&
                        selectedProject.content_project_modal.demo_link !== '#' && (
                          <a
                            href={selectedProject.content_project_modal.demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <span className="truncate">Planifier un RDV pour ce projet</span>
                            <ExternalLink size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                          </a>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </section>
  );
};

export default Portfolio;
