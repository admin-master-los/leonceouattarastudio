import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { useSectors } from '../lib/useSupabaseData';

// 🎯 Interface TypeScript pour le contenu modal
interface ModalContent {
  hero_title: string;
  hero_subtitle: string;
  description: string;
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  case_study: {
    title: string;
    results: string[];
  };
  cta_text: string;
  tech_stack: string[];
}

interface Sector {
  id: string;
  title: string;
  description: string;
  services: string[];
  icon: string;
  image: string;
  content_modal: ModalContent;
}

const Sectors: React.FC = () => {
  const { data: sectorsRaw, loading } = useSectors();
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [selectedSectorIndex, setSelectedSectorIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 🔄 Parser les données Supabase correctement
  useEffect(() => {
    if (sectorsRaw && sectorsRaw.length > 0) {
      const parsedSectors = sectorsRaw.map((sector: any) => ({
        ...sector,
        services: Array.isArray(sector.services) 
          ? sector.services 
          : [],
        content_modal: sector.content_modal || {}
      }));
      setSectors(parsedSectors);
      
      console.log('✅ Secteurs chargés:', parsedSectors);
      console.log('✅ Content modal du premier secteur:', parsedSectors[0]?.content_modal);
      console.log('🖼️ Images des secteurs:', parsedSectors.map(s => ({ id: s.id, image: s.image })));
    }
  }, [sectorsRaw]);

  // 🎨 Helper pour récupérer les icônes Lucide
  const getIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
    return IconComponent || LucideIcons.Building2;
  };

  // 🚀 Fonction pour ouvrir la modale
  const openModal = (sector: Sector, index: number) => {
    console.log('🔍 Ouverture modale pour:', sector.title);
    console.log('📦 Content modal:', sector.content_modal);
    console.log('🖼️ URL de l\'image:', sector.image);
    
    if (!sector.content_modal || Object.keys(sector.content_modal).length === 0) {
      console.error('❌ content_modal manquant ou vide pour:', sector.id);
      alert('Erreur: Les données de ce secteur sont incomplètes.');
      return;
    }
    
    setSelectedSector(sector);
    setSelectedSectorIndex(index);
    setIsAnimating(true);
    setTimeout(() => setIsModalOpen(true), 50);
  };

  // 🔒 Fonction pour fermer la modale
  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedSector(null);
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
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // 🔄 Loading state
  if (loading) {
    return (
      <section id="sectors" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            <p className="text-gray-400 mt-4">Chargement des secteurs...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sectors" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Secteurs{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Spécialisés
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expertise métier approfondie pour des solutions parfaitement
            adaptées à votre domaine
          </p>
        </div>

        {/* Sectors Immersive Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sectors.map((sector, index) => {
            const IconComponent = getIcon(sector.icon);

            return (
              <div
                key={sector.id}
                className="relative bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={sector.image || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920'}
                    alt={sector.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <IconComponent size={24} className="text-white" />
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {sector.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-300 text-base md:text-lg mb-4 leading-relaxed text-left">
                    {sector.description}
                  </p>

                  {/* Services List */}
                  <div className="space-y-2 mb-6">
                    {sector.services && sector.services.map((service, serviceIndex) => (
                      <div
                        key={serviceIndex}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
                        <span className="text-gray-300 text-sm font-medium">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => openModal(sector, index)}
                    className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-cyan-400 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 hover:text-white transition-all duration-300 font-semibold hover:scale-105 flex items-center justify-center gap-2 group/btn"
                  >
                    <LucideIcons.ArrowRight
                      size={18}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                    Découvrir nos solutions
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Votre secteur n'est pas listé ?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Nous nous adaptons à tous les domaines d'activité. Contactez-nous
            pour discuter de vos besoins spécifiques.
          </p>
          <Link
            to="/reserver"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-full hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 font-semibold text-lg hover:scale-105 inline-flex items-center gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              <LucideIcons.Calendar size={20} />
              Planifier un échange
            </span>
          </Link>
        </div>
      </div>

      {/* 🎭 MODALE IMMERSIVE MOBILE-FIRST OPTIMISÉE */}
      {isModalOpen && selectedSector && selectedSector.content_modal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black">
          {/* 🖼️ Image de fond optimisée */}
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${selectedSector.image || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920'})` 
            }}
          />
          
          {/* Overlay gradient léger */}
          <div className="fixed inset-0 bg-gradient-to-b from-black/85 via-black/90 to-black/95" />

          {/* Contenu scrollable */}
          <div className="relative z-10 min-h-screen flex flex-col">
            
            {/* 📱 HEADER COMPACT - Sticky */}
            <div className="sticky top-0 z-20 bg-black/60 backdrop-blur-lg border-b border-white/10">
              <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 lg:py-5">
                
                {/* Layout optimisé mobile */}
                <div className="flex items-start justify-between gap-3">
                  
                  {/* Icône + Texte */}
                  <div className="flex items-start gap-2 md:gap-3 flex-1 min-w-0 pr-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                      {(() => {
                        const IconComponent = getIcon(selectedSector.icon);
                        return <IconComponent className="text-cyan-400 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />;
                      })()}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base md:text-lg lg:text-xl font-bold text-white mb-0.5 line-clamp-2">
                        {selectedSector.content_modal?.hero_title || selectedSector.title}
                      </h2>
                      <p className="text-xs md:text-sm text-gray-300 line-clamp-1">
                        {selectedSector.content_modal?.hero_subtitle || ''}
                      </p>
                    </div>
                  </div>

                  {/* Bouton fermeture */}
                  <button
                    onClick={closeModal}
                    className="w-9 h-9 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-200 group flex-shrink-0"
                    aria-label="Fermer"
                  >
                    <LucideIcons.X className="text-gray-300 group-hover:text-white w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* 📄 CONTENU PRINCIPAL */}
            <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 md:py-8 lg:py-10 space-y-8 md:space-y-10 lg:space-y-12">
              
              {/* Description Hero */}
              <div className="max-w-4xl mx-auto">
                <p className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed text-left">
                  {selectedSector.content_modal?.description || ''}
                </p>
              </div>

              {/* 💎 HIGHLIGHTS - Solutions spécialisées */}
              {selectedSector.content_modal?.highlights && selectedSector.content_modal.highlights.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                      <LucideIcons.Lightbulb className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                      Solutions Spécialisées
                    </h3>
                  </div>

                  {/* Grille progressive: 1 col mobile → 2 cols dès 640px */}
                  <div className="grid sm:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                    {selectedSector.content_modal.highlights.map((highlight: any, index: number) => {
                      const HighlightIcon = getIcon(highlight.icon);
                      return (
                        <div
                          key={index}
                          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 hover:bg-white/15 hover:border-cyan-500/40 transition-all duration-300 group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-500/50 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                              <HighlightIcon className="text-cyan-400 w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base md:text-lg lg:text-xl font-bold text-cyan-400 mb-1.5 md:mb-2 group-hover:text-cyan-300 transition-colors">
                                {highlight.title}
                              </h4>
                              <p className="text-sm md:text-base text-gray-300 leading-snug">
                                {highlight.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* 📊 CASE STUDY - Résultats */}
              {selectedSector.content_modal?.case_study && (
                <section className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8">
                  
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-500/50 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                      <LucideIcons.TrendingUp className="text-cyan-400 w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                      {selectedSector.content_modal.case_study.title}
                    </h3>
                  </div>

                  {/* Résultats - Grille progressive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {selectedSector.content_modal.case_study.results?.map((result: string, index: number) => (
                      <div
                        key={index}
                        className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg md:rounded-xl p-4 md:p-5 text-center hover:scale-105 transition-transform duration-300"
                      >
                        <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1 md:mb-2">
                          {result.split(' ')[0]}
                        </div>
                        <p className="text-xs md:text-sm text-gray-200 font-medium">
                          {result.split(' ').slice(1).join(' ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 🛠️ TECH STACK - Scroll horizontal optimisé */}
              {selectedSector.content_modal?.tech_stack && selectedSector.content_modal.tech_stack.length > 0 && (
                <section>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-4 md:mb-5 text-center">
                    Technologies Utilisées
                  </h3>
                  
                  {/* Container avec fade hints */}
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                    
                    {/* Scroll container */}
                    <div className="overflow-x-auto scrollbar-hide pb-2">
                      <div className="flex gap-2 md:gap-3 justify-start md:justify-center px-1">
                        {selectedSector.content_modal.tech_stack.map((tech: string, index: number) => (
                          <div
                            key={index}
                            className="flex-shrink-0 bg-white/10 backdrop-blur-sm border border-gray-500/30 rounded-full px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm text-gray-200 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 font-medium whitespace-nowrap"
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 🎯 CTA FOOTER - Sticky bottom optimal */}
              <section className="bg-gradient-to-r from-cyan-500/15 to-purple-500/15 backdrop-blur-sm border border-cyan-500/30 rounded-xl md:rounded-2xl lg:rounded-3xl p-5 md:p-6 lg:p-8 text-center sticky bottom-0 shadow-2xl shadow-black/50">
                <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 md:mb-3">
                  Prêt à transformer votre activité {selectedSector.title.toLowerCase()} ?
                </h4>
                <p className="text-xs md:text-sm lg:text-base text-gray-300 mb-4 md:mb-5 max-w-2xl mx-auto leading-relaxed">
                  Discutons de vos besoins spécifiques et créons ensemble la solution parfaite pour votre secteur d'activité.
                </p>
                
                {/* Bouton CTA - Touch optimisé */}
                <button
                  onClick={() => {
                    closeModal();
                    setTimeout(() => {
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 md:px-8 md:py-3.5 lg:px-10 lg:py-4 rounded-full hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 font-semibold text-sm md:text-base lg:text-lg inline-flex items-center gap-2 md:gap-3 hover:scale-105 active:scale-95 relative overflow-hidden group min-h-[48px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    <LucideIcons.MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    {selectedSector.content_modal?.cta_text || 'Nous contacter'}
                  </span>
                </button>
              </section>

            </div>
          </div>

          {/* Custom scrollbar hide */}
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      )}
    </section>
  );
};

export default Sectors;
