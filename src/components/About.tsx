import React, { useState } from 'react';
import { CheckCircle, Target, Cpu, Rocket, TrendingUp } from 'lucide-react';

const TransformationSection = () => {
  const [activePhase, setActivePhase] = useState(0);

  const transformationPhases = [
    {
      id: 1,
      icon: Target,
      title: 'Diagnostic & Stratégie',
      subtitle: 'Analyse de vos besoins métier',
      description: 'Audit approfondi de vos processus actuels, identification des points de friction et définition des objectifs de transformation.',
      benefits: [
        'Cartographie des processus existants',
        'Identification des opportunités d\'automatisation',
        'Feuille de route personnalisée',
        'ROI estimé et KPIs définis'
      ],
      color: 'from-cyan-500 to-blue-500',
      duration: '1-2 semaines'
    },
    {
      id: 2,
      icon: Cpu,
      title: 'Conception & Architecture',
      subtitle: 'Design de solutions robustes',
      description: 'Conception technique détaillée avec choix des technologies optimales pour vos contraintes métier et techniques.',
      benefits: [
        'Architecture scalable et sécurisée',
        'Choix technologiques justifiés',
        'Maquettes fonctionnelles',
        'Spécifications techniques complètes'
      ],
      color: 'from-purple-500 to-pink-500',
      duration: '2-3 semaines'
    },
    {
      id: 3,
      icon: Rocket,
      title: 'Développement & Tests',
      subtitle: 'Réalisation et validation',
      description: 'Développement itératif avec tests continus, démonstrations régulières et ajustements en temps réel selon vos retours.',
      benefits: [
        'Méthodologie agile',
        'Tests automatisés (TDD)',
        'Démos hebdomadaires',
        'Code review systématique'
      ],
      color: 'from-green-500 to-teal-500',
      duration: '4-12 semaines'
    },
    {
      id: 4,
      icon: TrendingUp,
      title: 'Déploiement & Formation',
      subtitle: 'Mise en production accompagnée',
      description: 'Déploiement progressif avec formation de vos équipes, documentation complète et support au démarrage.',
      benefits: [
        'Migration sans interruption',
        'Formation utilisateurs & admins',
        'Documentation détaillée',
        'Assistance au démarrage (1 mois)'
      ],
      color: 'from-orange-500 to-red-500',
      duration: '1-2 semaines'
    }
  ];

  return (
    <div className="mb-12 md:mb-16">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12 px-4 max-w-5xl mx-auto">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
          Notre{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Processus
          </span>{' '}
          de Transformation
        </h3>
        <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Une méthodologie éprouvée en 4 phases pour digitaliser et optimiser vos processus métier
        </p>
      </div>

      {/* Timeline Navigation - Scroll horizontal optimisé */}
      <div className="mb-8 md:mb-12 relative max-w-5xl mx-auto">
        {/* Fade gradient gauche */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
        
        {/* Fade gradient droite */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />
        
        {/* Scroll container */}
        <div className="overflow-x-auto scrollbar-hide pb-2 px-4">
          <div className="flex gap-2 md:gap-3 min-w-min justify-start md:justify-center">
            {transformationPhases.map((phase, index) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(index)}
                className={`
                  relative flex-shrink-0 px-4 py-2.5 md:px-6 md:py-3 rounded-full 
                  transition-all duration-300 min-w-[44px]
                  ${activePhase === index
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white active:scale-95'
                  }
                `}
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <span className="font-bold text-sm md:text-base">{phase.id}</span>
                  <span className="hidden sm:inline text-sm md:text-base font-medium">
                    {phase.title}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Phase Details */}
      <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-2xl md:rounded-3xl p-4 md:p-8 lg:p-12 mx-4 max-w-5xl lg:mx-auto">
        {transformationPhases.map((phase, index) => (
          <div
            key={phase.id}
            className={`transition-all duration-500 ${
              activePhase === index ? 'block' : 'hidden'
            }`}
          >
            {/* Phase Header - Stack sur mobile, row sur desktop */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Icône */}
              <div className={`
                w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 
                bg-gradient-to-r ${phase.color} 
                rounded-xl md:rounded-2xl 
                flex items-center justify-center 
                flex-shrink-0 shadow-lg
                mx-auto sm:mx-0
              `}>
                <phase.icon className="text-white w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              </div>

              {/* Contenu */}
              <div className="flex-1 text-center sm:text-left">
                {/* Titre + Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 md:mb-3">
                  <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                    {phase.title}
                  </h4>
                  <span className="
                    inline-block px-2.5 py-1 md:px-3 
                    bg-cyan-500/20 border border-cyan-500/30 
                    rounded-full text-xs md:text-sm text-cyan-400 font-medium
                    mx-auto sm:mx-0
                  ">
                    {phase.duration}
                  </span>
                </div>

                {/* Sous-titre */}
                <p className="text-base md:text-lg lg:text-xl text-gray-400 mb-3 md:mb-4">
                  {phase.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>

            {/* Benefits Grid - Mobile-first */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {phase.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="
                    flex items-start gap-2.5 md:gap-3 
                    bg-white/5 rounded-lg md:rounded-xl 
                    p-3 md:p-4 
                    hover:bg-white/10 
                    transition-colors duration-300
                    active:scale-[0.98]
                  "
                >
                  <CheckCircle className="text-cyan-400 flex-shrink-0 mt-0.5 w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base text-gray-300 leading-snug">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="mt-6 md:mt-8 flex items-center gap-1.5 md:gap-2">
              {transformationPhases.map((_, idx) => (
                <div
                  key={idx}
                  className={`
                    h-1 md:h-1.5 flex-1 rounded-full 
                    transition-all duration-500
                    ${idx === activePhase
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
                      : idx < activePhase
                      ? 'bg-cyan-500/50'
                      : 'bg-gray-700'
                    }
                  `}
                />
              ))}
            </div>
          </div>
        ))}
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
  );
};

export default TransformationSection;
