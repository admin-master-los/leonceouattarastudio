import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, Shield, Lock, Database, Eye, UserCheck, FileText } from 'lucide-react';

const Confidentialite: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">lOS</span>
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Leonce Ouattara Studio
              </span>
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                <Home size={18} />
                <span className="hidden sm:inline">Accueil</span>
              </Link>
              <Link
                to="/reserver"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <Calendar size={18} />
                <span className="font-semibold">Réserver</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
              <Shield className="text-cyan-400" size={20} />
              <span className="text-cyan-400 font-semibold text-sm">Politique de Confidentialité</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Politique de Confidentialité
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="text-cyan-400" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-white">Introduction</h2>
                  <div className="space-y-3 text-gray-300 leading-relaxed">
                    <p>
                      Leonce Ouattara Studio (ci-après "lOS", "nous", "notre") s'engage à protéger la confidentialité 
                      et la sécurité des données personnelles de ses clients, prospects, et utilisateurs de son site web 
                      (ci-après "vous", "utilisateur").
                    </p>
                    <p>
                      Cette politique de confidentialité décrit comment nous collectons, utilisons, stockons et protégeons 
                      vos informations personnelles dans le cadre de nos services de développement de solutions digitales 
                      pour le secteur financier.
                    </p>
                    <p className="text-cyan-400 font-semibold">
                      En utilisant nos services, vous acceptez les pratiques décrites dans cette politique.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Données Collectées */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Database className="text-purple-400" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 text-white">Données Collectées</h2>
                  
                  <h3 className="text-lg font-semibold mb-3 text-cyan-400">1.1 Données d'identification (Collecte sur notre site)</h3>
                  <ul className="space-y-2 text-gray-300 mb-6 pl-4">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Nom et prénom</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Adresse email professionnelle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Numéro de téléphone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Fonction et entreprise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Pays et ville de résidence</span>
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-3 text-cyan-400">1.2 Données de connexion (Collecte Analytique Google)</h3>
                  <ul className="space-y-2 text-gray-300 mb-6 pl-4">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Adresse IP et localisation géographique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Type de navigateur et système d'exploitation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Pages consultées et durée de visite</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Source de référence (moteur de recherche, lien direct)</span>
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-3 text-cyan-400">1.3 Données de projet (Collecte sur notre site)</h3>
                  <ul className="space-y-2 text-gray-300 pl-4">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Description du projet ou besoin métier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Budget estimatif et délais souhaités</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Documents techniques partagés (cahiers des charges, spécifications)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Finalités */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="text-cyan-400" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 text-white">Finalités du Traitement</h2>
                  
                  <div className="space-y-4 text-gray-300">
                    <p>Vos données personnelles sont collectées et traitées pour les finalités suivantes :</p>
                    
                    <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-4">
                      <h4 className="font-semibold text-cyan-400 mb-2">Gestion des demandes de contact</h4>
                      <p className="text-sm">Traiter vos demandes d'information, devis, ou consultation via le formulaire de contact.</p>
                    </div>

                    <div className="bg-black/30 border border-purple-500/20 rounded-xl p-4">
                      <h4 className="font-semibold text-purple-400 mb-2">Exécution des services</h4>
                      <p className="text-sm">
                        Développer, livrer et maintenir les solutions digitales commandées (portails web, 
                        solutions métiers financières, systèmes de paiement, tableaux de bord, etc.).
                      </p>
                    </div>

                    <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-4">
                      <h4 className="font-semibold text-cyan-400 mb-2">Communication commerciale</h4>
                      <p className="text-sm">
                        Vous informer de nos nouveaux services, études de cas, et actualités du secteur 
                        (uniquement avec votre consentement préalable).
                      </p>
                    </div>

                    <div className="bg-black/30 border border-purple-500/20 rounded-xl p-4">
                      <h4 className="font-semibold text-purple-400 mb-2">Amélioration continue</h4>
                      <p className="text-sm">
                        Analyser l'utilisation de notre site web pour améliorer l'expérience utilisateur 
                        et nos services.
                      </p>
                    </div>

                    <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-4">
                      <h4 className="font-semibold text-cyan-400 mb-2">Conformité légale</h4>
                      <p className="text-sm">
                        Respecter nos obligations légales et réglementaires (comptabilité, fiscalité, 
                        lutte anti-blanchiment pour les projets financiers).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Base Légale */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <UserCheck className="text-purple-400" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 text-white">Base Légale du Traitement</h2>
                  
                  <div className="space-y-4 text-gray-300">
                    <p>Le traitement de vos données repose sur les bases légales suivantes :</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-4">
                        <h4 className="font-semibold text-cyan-400 mb-2">Exécution du contrat</h4>
                        <p className="text-sm">Pour la réalisation des prestations de services commandées.</p>
                      </div>

                      <div className="bg-black/30 border border-purple-500/20 rounded-xl p-4">
                        <h4 className="font-semibold text-purple-400 mb-2">Consentement</h4>
                        <p className="text-sm">Pour l'envoi de communications marketing (opt-in).</p>
                      </div>

                      <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-4">
                        <h4 className="font-semibold text-cyan-400 mb-2">Intérêt légitime</h4>
                        <p className="text-sm">Pour l'amélioration de nos services et la sécurité de notre système.</p>
                      </div>

                      <div className="bg-black/30 border border-purple-500/20 rounded-xl p-4">
                        <h4 className="font-semibold text-purple-400 mb-2">Obligation légale</h4>
                        <p className="text-sm">Pour respecter la réglementation comptable et fiscale.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sécurité */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="text-cyan-400" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 text-white">Sécurité des Données</h2>
                  
                  <div className="space-y-3 text-gray-300">
                    <p>
                      Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
                      protéger vos données contre tout accès non autorisé, perte, ou divulgation :
                    </p>
                    
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">✓</span>
                        <span><strong>Chiffrement SSL/TLS</strong> : Toutes les communications sont chiffrées (HTTPS).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">✓</span>
                        <span><strong>Accès restreint</strong> : Seules les personnes autorisées ont accès aux données.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">✓</span>
                        <span><strong>Sauvegardes régulières</strong> : Vos données sont sauvegardées quotidiennement.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">✓</span>
                        <span><strong>Hébergement sécurisé</strong> : Infrastructure cloud certifiée ISO 27001.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">✓</span>
                        <span><strong>Audits de sécurité</strong> : Tests réguliers de vulnérabilité et mises à jour.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Durée de Conservation */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Durée de Conservation</h2>
              
              <div className="space-y-3 text-gray-300">
                <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-cyan-400 mb-1">Prospects (sans contrat)</h4>
                      <p className="text-sm">Données conservées pendant 3 ans maximum après le dernier contact.</p>
                    </div>
                    <span className="text-cyan-400 font-bold text-lg">3 ans</span>
                  </div>
                </div>

                <div className="bg-black/30 border border-purple-500/20 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-purple-400 mb-1">Clients (avec contrat)</h4>
                      <p className="text-sm">Données conservées pendant la durée du contrat + 10 ans (obligations comptables).</p>
                    </div>
                    <span className="text-purple-400 font-bold text-lg">10 ans</span>
                  </div>
                </div>

                <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-cyan-400 mb-1">Données de connexion</h4>
                      <p className="text-sm">Logs conservés pendant 12 mois (obligation légale).</p>
                    </div>
                    <span className="text-cyan-400 font-bold text-lg">12 mois</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Vos Droits */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Vos Droits</h2>
              
              <div className="space-y-3 text-gray-300 mb-6">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-3">
                    <h4 className="font-semibold text-cyan-400 mb-1">Droit d'accès</h4>
                    <p className="text-sm">Obtenir une copie de vos données personnelles.</p>
                  </div>

                  <div className="bg-black/30 border border-purple-500/20 rounded-lg p-3">
                    <h4 className="font-semibold text-purple-400 mb-1">Droit de rectification</h4>
                    <p className="text-sm">Corriger des données inexactes ou incomplètes.</p>
                  </div>

                  <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-3">
                    <h4 className="font-semibold text-cyan-400 mb-1">Droit à l'effacement</h4>
                    <p className="text-sm">Supprimer vos données (sous conditions).</p>
                  </div>

                  <div className="bg-black/30 border border-purple-500/20 rounded-lg p-3">
                    <h4 className="font-semibold text-purple-400 mb-1">Droit d'opposition</h4>
                    <p className="text-sm">Refuser le traitement de vos données.</p>
                  </div>

                  <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-3">
                    <h4 className="font-semibold text-cyan-400 mb-1">Droit à la portabilité</h4>
                    <p className="text-sm">Récupérer vos données dans un format structuré.</p>
                  </div>

                  <div className="bg-black/30 border border-purple-500/20 rounded-lg p-3">
                    <h4 className="font-semibold text-purple-400 mb-1">Droit de limitation</h4>
                    <p className="text-sm">Limiter le traitement de vos données.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Comment exercer vos droits ?</h3>
                <p className="text-gray-300 mb-4">
                  Pour toute demande concernant vos données personnelles, contactez-nous :
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-cyan-400">📧</span>
                    <strong>Email :</strong>
                    <a href="mailto:contact@leonceouattarastudiogroup.site" className="text-cyan-400 hover:underline">
                      contact@leonceouattarastudiogroup.site
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-cyan-400">📍</span>
                    <strong>Adresse :</strong>
                    <span>Abidjan, Côte d'Ivoire</span>
                  </p>
                  <p className="text-gray-400 text-xs mt-3">
                    * Nous nous engageons à répondre dans un délai maximum de 30 jours.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Des Questions ?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Pour toute question concernant cette politique de confidentialité ou le traitement 
                de vos données personnelles, n'hésitez pas à nous contacter.
              </p>
              <Link
                to="/reserver"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <Calendar size={20} />
                Prendre Rendez-vous
              </Link>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Confidentialite;
