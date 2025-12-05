import React, { useState } from 'react';
import { CheckCircle, Award, Code2, Lightbulb, Shield, Zap, Target, Rocket, TrendingUp, Users, Lock, Cpu } from 'lucide-react';

const About: React.FC = () => {
  const [activePhase, setActivePhase] = useState(0);

  const values = [
    {
      icon: Code2,
      title: 'Excellence Technique',
      description: 'Code de qualité, bonnes pratiques et technologies modernes',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Solutions créatives adaptées à vos enjeux métier',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Shield,
      title: 'Accompagnement',
      description: 'Support continu et formation de vos équipes',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: Award,
      title: 'Qualité',
      description: 'Livraison dans les délais avec les plus hauts standards',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const stats = [
    { number: '8+', label: "Années d'expérience" },
    { number: '50+', label: 'Projets réalisés' },
    { number: '100%', label: 'Satisfactions' },
    { number: '24/7', label: 'Support technique' },
  ];

  // Processus de transformation digitale (remplace Skills)
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

  // Garanties et différenciateurs
  const guarantees = [
    {
      icon: Lock,
      title: 'Sécurité & Conformité',
      description: 'RGPD, ISO 27001, chiffrement bout-en-bout',
      color: 'bg-cyan-500/10 border-cyan-500/30'
    },
    {
      icon: Zap,
      title: 'Performance Garantie',
      description: 'Temps de chargement < 2s, 99.9% uptime SLA',
      color: 'bg-purple-500/10 border-purple-500/30'
    },
    {
      icon: Users,
      title: 'Formation Incluse',
      description: 'Workshops et documentation pour vos équipes',
      color: 'bg-green-500/10 border-green-500/30'
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Votre{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Partenaire Digital
            </span>{' '}
            de Confiance
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Spécialisé dans la création de solutions digitales performantes qui
            transforment votre business
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left Column - Photo */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-gray-700/50 group-hover:border-cyan-500/50 transition-all duration-500">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Leonce Ouattara at work"
                className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Floating stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-2 gap-4">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div
                      key={index}
                      className="bg-black/70 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-cyan-400 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-xs text-gray-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Approach */}
            <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:bg-white/10 hover:border-cyan-500/40 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle className="text-cyan-400" size={28} />
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Analyse & Conseil
                    </h4>
                    <p className="text-gray-400">
                      Audit de vos besoins et recommandations techniques
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Développement
                    </h4>
                    <p className="text-gray-400">
                      Création de solutions robustes et évolutives
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Support & Évolution
                    </h4>
                    <p className="text-gray-400">
                      Maintenance et amélioration continue
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(2).map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center hover:bg-white/10 hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 group hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <value.icon size={24} className="text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                {value.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Transformation Process - REMPLACE SKILLS SECTION */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Notre{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Processus
              </span>{' '}
              de Transformation
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Une méthodologie éprouvée en 4 phases pour digitaliser et optimiser vos processus métier
            </p>
          </div>

          {/* Timeline Navigation */}
          <div className="flex justify-center mb-12 overflow-x-auto pb-4">
            <div className="inline-flex gap-4">
              {transformationPhases.map((phase, index) => (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(index)}
                  className={`relative px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap ${
                    activePhase === index
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/50'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-bold">{phase.id}</span>
                    <span className="hidden sm:inline">{phase.title}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Phase Details */}
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 md:p-12">
            {transformationPhases.map((phase, index) => (
              <div
                key={phase.id}
                className={`transition-all duration-500 ${
                  activePhase === index ? 'block' : 'hidden'
                }`}
              >
                {/* Phase Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div className={`w-20 h-20 bg-gradient-to-r ${phase.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <phase.icon size={40} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-3xl font-bold text-white">
                        {phase.title}
                      </h4>
                      <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-medium">
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-xl text-gray-400 mb-4">{phase.subtitle}</p>
                    <p className="text-gray-300 leading-relaxed">{phase.description}</p>
                  </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {phase.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors duration-300"
                    >
                      <CheckCircle size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Indicator */}
                <div className="mt-8 flex items-center gap-2">
                  {transformationPhases.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        idx === activePhase
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
                          : idx < activePhase
                          ? 'bg-cyan-500/50'
                          : 'bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className={`${guarantee.color} border backdrop-blur-sm rounded-2xl p-6 hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <guarantee.icon size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">{guarantee.title}</h4>
                  <p className="text-gray-400 text-sm">{guarantee.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
