import React, { useState } from 'react';
import { Shield, TrendingUp, Zap, Award, Lock, Users, Globe, CheckCircle2, ArrowRight, Sparkles, Building2, CreditCard, Coins, Banknote } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const [activeSector, setActiveSector] = useState<number>(0);

  // Secteurs cibles avec leurs spécificités
  const targetSectors = [
    {
      icon: Building2,
      name: 'Microfinance',
      shortName: 'MF',
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      challenges: [
        'Gestion décentralisée multi-agences',
        'Digitalisation du crédit agricole',
        'Scoring automatisé des emprunteurs',
        'Mobile Money & collecte terrain'
      ],
      solutions: [
        'Core Microfinance System léger',
        'Application mobile agent de terrain',
        'Workflow crédit intelligent',
        'Analytics prédictif de défaut'
      ]
    },
    {
      icon: Banknote,
      name: 'Banques & Services Financiers',
      shortName: 'Banque',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      challenges: [
        'Conformité réglementaire BCEAO',
        'Intégration systèmes existants',
        'Expérience client digitale',
        'Sécurisation des transactions'
      ],
      solutions: [
        'Portails bancaires sécurisés',
        'Applications mobile banking',
        'Outils de reporting conformité',
        'Systèmes anti-fraude adaptés'
      ]
    },
    {
      icon: Shield,
      name: 'Assurance',
      shortName: 'Assurance',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      challenges: [
        'Gestion manuelle des dossiers',
        'Calcul tarifs complexes',
        'Suivi client inefficace',
        'Distribution limitée'
      ],
      solutions: [
        'Plateforme de souscription en ligne',
        'Workflow sinistre digitalisé',
        'Calculateur de primes automatisé',
        'Portail client self-service'
      ]
    },
    {
      icon: CreditCard,
      name: 'Fintech & Paiements',
      shortName: 'Fintech',
      color: 'from-pink-500 to-orange-600',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      challenges: [
        'Infrastructure technique complexe',
        'Intégration opérateurs mobile',
        'Conformité PCI-DSS',
        'Expérience utilisateur fluide'
      ],
      solutions: [
        'API de paiement moderne',
        'Intégration Orange/MTN/Wave',
        'Tableaux de bord temps réel',
        'Interface utilisateur intuitive'
      ]
    }
  ];

  // Raisons de nous choisir (adaptées pour débuts)
  const reasons = [
    {
      number: '01',
      icon: Shield,
      title: 'Expertise Bancaire Terrain',
      description: 'Plus de 6 années d\'expérience au sein d\'institutions bancaires en Côte d\'Ivoire, nous comprenons vos défis quotidiens de l\'intérieur. Cette connaissance pratique du secteur financier ivoirien nous permet de concevoir des solutions qui répondent réellement à vos besoins opérationnels et réglementaires.',
      highlights: ['+6 ans dans le secteur bancaire', 'Terrain CI', 'BCEAO', 'Besoins réels'],
      color: 'from-cyan-500 to-blue-500',
      stat: '+6 ans',
      statLabel: 'Expérience bancaire'
    },
    {
      number: '02',
      icon: Lock,
      title: 'Solutions Sécurisées & Conformes',
      description: 'Toutes nos solutions respectent les normes de sécurité bancaires : chiffrement des données sensibles, authentification renforcée, traçabilité complète des opérations. Conformité garantie avec les exigences BCEAO et les standards internationaux adaptés au contexte ivoirien.',
      highlights: ['Chiffrement SSL', 'Auth sécurisée', 'Conformité BCEAO', 'Traçabilité'],
      color: 'from-blue-500 to-purple-500',
      stat: '100%',
      statLabel: 'Sécurité garantie'
    },
    {
      number: '03',
      icon: Zap,
      title: 'Agilité & Réactivité Locale',
      description: 'Basé à Abidjan, nous sommes disponible pour des échanges en présentiel ou en ligne avec une collaboration étroite. Notre approche agile nous permet de vous livrer rapidement des solutions fonctionnelles, avec des ajustements continus selon vos retours.',
      highlights: ['Basé Abidjan', 'Disponible', 'Livraison rapide', 'Ajustements'],
      color: 'from-purple-500 to-pink-500',
      stat: '4-6 sem',
      statLabel: 'Livrable'
    },
    {
      number: '04',
      icon: Users,
      title: 'Accompagnement Personnalisé',
      description: 'Nous vous offrons un accompagnement sur mesure, assuré par un interlocuteur unique qui comprend à la fois vos enjeux métier et vos contraintes techniques. Nous formons vos équipes, fournissons une documentation claire et complète, et garantissons un support réactif pour vous permettre de devenir progressivement autonome tout en gardant un haut niveau de performance.',
      highlights: ['Contact direct', 'Formation équipes', 'Documentation', 'Support réactif'],
      color: 'from-pink-500 to-orange-500',
      stat: '1',
      statLabel: 'Interlocuteur unique'
    }
  ];

  // Différenciateurs clés
  const differentiators = [
    {
      icon: Globe,
      title: 'Présence Locale',
      description: 'Basé à Abidjan, rencontres en présentiel possibles',
      color: 'bg-cyan-500/10 border-cyan-500/30'
    },
    {
      icon: TrendingUp,
      title: 'Investissement Long Terme',
      description: 'Partenariat durable, nous grandissons avec votre projet',
      color: 'bg-blue-500/10 border-blue-500/30'
    },
    {
      icon: Award,
      title: 'Qualité Professionnelle',
      description: 'Technologies modernes, code propre, documentation',
      color: 'bg-purple-500/10 border-purple-500/30'
    }
  ];

  return (
    <section id="why-choose-us" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4 sm:mb-6">
            <Sparkles size={14} className="text-cyan-400 sm:w-4 sm:h-4" />
            <span className="text-cyan-400 text-xs sm:text-sm font-medium">Votre partenaire digital en Côte d'Ivoire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            <span className="text-white">Pourquoi </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Leonce Ouattara Studio
            </span>
            <br />
            <span className="text-white">Pour vos défits ?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Solutions digitales sur-mesure pour institutions financières en Côte d'Ivoire
          </p>
        </div>

        {/* Target Sectors Selector */}
        <div className="mb-12 sm:mb-14 md:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">Nos Domaines d'Intervention</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
            {targetSectors.map((sector, index) => (
              <button
                key={index}
                onClick={() => setActiveSector(index)}
                className={`relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                  activeSector === index
                    ? `${sector.bgColor} ${sector.borderColor} scale-105 shadow-lg`
                    : 'bg-white/5 border-gray-700/50 hover:bg-white/10'
                }`}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${sector.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto`}>
                  <sector.icon size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-white font-semibold mb-1 sm:mb-2 text-center text-sm sm:text-base">{sector.shortName}</h4>
                <p className="text-gray-400 text-xs text-center hidden sm:block">{sector.name}</p>
                
                {activeSector === index && (
                  <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className={`w-2 h-2 bg-gradient-to-r ${sector.color} rounded-full`}></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Active Sector Details */}
          <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              {/* Challenges */}
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <div className={`w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r ${targetSectors[activeSector].color} rounded-full`}></div>
                  Vos Défis
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  {targetSectors[activeSector].challenges.map((challenge, idx) => (
                    <div key={idx} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-xs">✕</span>
                      </div>
                      <p className="text-gray-300 text-sm sm:text-base">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <div className={`w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r ${targetSectors[activeSector].color} rounded-full`}></div>
                  Nos Solutions
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  {targetSectors[activeSector].solutions.map((solution, idx) => (
                    <div key={idx} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 size={18} className="text-green-400 flex-shrink-0 mt-0.5 sm:w-5 sm:h-5" />
                      <p className="text-gray-300 text-sm sm:text-base">{solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Reasons Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-14 md:mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105"
            >
              {/* Number badge */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50 font-bold text-white text-sm sm:text-base">
                {reason.number}
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${reason.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}>
                <reason.icon size={24} className="text-white sm:w-8 sm:h-8" />
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-cyan-400 transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                {reason.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {reason.highlights.map((highlight, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 sm:px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* Stat */}
              <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-700/50">
                <div>
                  <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${reason.color} bg-clip-text text-transparent`}>
                    {reason.stat}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">{reason.statLabel}</div>
                </div>
                <ArrowRight className="text-cyan-400 ml-auto group-hover:translate-x-2 transition-transform" size={18} />
              </div>
            </div>
          ))}
        </div>

        {/* Differentiators */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {differentiators.map((diff, index) => (
            <div
              key={index}
              className={`${diff.color} border backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <diff.icon size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{diff.title}</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">{diff.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-14 md:mt-16 text-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 font-semibold text-base sm:text-lg hover:scale-105"
          >
            <span>Discutons de Votre Projet</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
