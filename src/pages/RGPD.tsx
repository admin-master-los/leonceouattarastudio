import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, Shield, CheckCircle, AlertTriangle, FileCheck, Users, Lock } from 'lucide-react';

const RGPD: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LOS</span>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
              <Shield className="text-green-400" size={20} />
              <span className="text-green-400 font-semibold text-sm">Conformité RGPD</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Notre Engagement RGPD
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Règlement Général sur la Protection des Données (UE) 2016/679
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileCheck className="text-green-400" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-white">Notre Conformité RGPD</h2>
                  <div className="space-y-3 text-gray-300 leading-relaxed">
                    <p>
                      Leonce Ouattara Studio (LOS) s'engage pleinement à respecter le Règlement Général sur la 
                      Protection des Données (RGPD) dans toutes ses activités de traitement de données personnelles.
                    </p>
                    <p>
                      En tant que prestataire de services IT pour le secteur financier, nous appliquons les standards 
                      les plus stricts en matière de protection des données, combinant conformité réglementaire et 
                      sécurité renforcée.
                    </p>
                    <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-xl p-4 mt-4">
                      <p className="text-green-400 font-semibold flex items-center gap-2">
                        <CheckCircle size={18} />
                        Certification ISO 27001 en cours d'obtention
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Responsable du Traitement */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="text-cyan-400" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 text-white">Responsable du Traitement</h2>
                  
                  <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-6">
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <span className="text-cyan-400 font-semibold min-w-[120px]">Raison sociale :</span>
                        <span>Leonce Ouattara Studio (LOS)</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-cyan-400 font-semibold min-w-[120px]">Activité :</span>
                        <span>Développement de solutions digitales pour le secteur financier</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-cyan-400 font-semibold min-w-[120px]">Siège social :</span>
                        <span>Abidjan, Côte d'Ivoire</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-cyan-400 font-semibold min-w-[120px]">Contact DPO :</span>
                        <a href="mailto:contact@leonceouattarastudiogroup.site" className="text-cyan-400 hover:underline">
                          contact@leonceouattarastudiogroup.site
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-cyan-400 font-semibold min-w-[120px]">Téléphone :</span>
                        <span>+225 05 45 13 07 39</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mt-4">
                    * En tant que responsable du traitement, LOS détermine les finalités et les moyens du traitement 
                    de vos données personnelles.
                  </p>
                </div>
              </div>
            </section>

            {/* Principes RGPD */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Principes Fondamentaux Appliqués</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Licéité, loyauté, transparence</h3>
                      <p className="text-sm text-gray-300">
                        Traitement de données de manière licite, loyale et transparente. Information claire 
                        sur l'utilisation de vos données.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-purple-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Limitation des finalités</h3>
                      <p className="text-sm text-gray-300">
                        Collecte uniquement pour des finalités déterminées, explicites et légitimes 
                        (développement, livraison, support).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Minimisation des données</h3>
                      <p className="text-sm text-gray-300">
                        Collecte strictement nécessaire et pertinente pour la réalisation de nos prestations. 
                        Pas de données excessives.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-purple-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Exactitude</h3>
                      <p className="text-sm text-gray-300">
                        Données exactes et mises à jour. Possibilité pour vous de rectifier ou supprimer 
                        les données inexactes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Limitation de conservation</h3>
                      <p className="text-sm text-gray-300">
                        Conservation limitée : 3 ans (prospects), 10 ans (clients), 12 mois (logs). 
                        Suppression automatique après expiration.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-purple-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-white mb-2">Intégrité et confidentialité</h3>
                      <p className="text-sm text-gray-300">
                        Sécurité maximale : chiffrement, accès restreints, audits réguliers, 
                        conformité ISO 27001 (en cours).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Droits des Personnes */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Vos Droits RGPD Garantis</h2>
              
              <div className="space-y-4">
                <div className="bg-black/30 border border-green-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-bold">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-400 mb-2">Droit d'accès (Art. 15 RGPD)</h3>
                      <p className="text-sm text-gray-300">
                        Vous pouvez demander une copie complète de vos données personnelles que nous détenons, 
                        ainsi que des informations sur leur traitement (finalités, destinataires, durée de conservation).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-400 font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-cyan-400 mb-2">Droit de rectification (Art. 16 RGPD)</h3>
                      <p className="text-sm text-gray-300">
                        Vous pouvez demander la correction immédiate de données inexactes ou incomplètes vous concernant 
                        (nom, email, adresse, fonction, etc.).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 border border-purple-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 font-bold">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-purple-400 mb-2">Droit à l'effacement "Droit à l'oubli" (Art. 17 RGPD)</h3>
                      <p className="text-sm text-gray-300 mb-2">
                        Vous pouvez demander la suppression de vos données personnelles dans les cas suivants :
                      </p>
                      <ul className="text-sm text-gray-400 space-y-1 pl-4">
                        <li>• Données plus nécessaires aux finalités initiales</li>
                        <li>• Retrait de votre consentement</li>
                        <li>• Opposition légitime au traitement</li>
                        <li>• Traitement illicite</li>
                      </ul>
                      <p className="text-xs text-gray-500 mt-2">
                        * Exception : obligations légales de conservation (comptabilité, fiscalité = 10 ans)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 border border-green-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-bold">4</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-400 mb-2">Droit à la limitation du traitement (Art. 18 RGPD)</h3>
                      <p className="text-sm text-gray-300">
                        Vous pouvez demander le gel temporaire du traitement de vos données (conservation uniquement) 
                        en cas de contestation de l'exactitude ou du caractère licite du traitement.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-400 font-bold">5</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-cyan-400 mb-2">Droit à la portabilité (Art. 20 RGPD)</h3>
                      <p className="text-sm text-gray-300">
                        Vous pouvez récupérer vos données dans un format structuré, couramment utilisé et lisible 
                        par machine (JSON, CSV, XML) pour les transmettre à un autre prestataire.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 border border-purple-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 font-bold">6</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-purple-400 mb-2">Droit d'opposition (Art. 21 RGPD)</h3>
                      <p className="text-sm text-gray-300">
                        Vous pouvez vous opposer au traitement de vos données pour des raisons tenant à votre 
                        situation particulière. Opposition absolue pour le marketing direct (désinscription).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 border border-green-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-bold">7</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-400 mb-2">Droit de retirer le consentement (Art. 7 RGPD)</h3>
                      <p className="text-sm text-gray-300">
                        Vous pouvez retirer votre consentement à tout moment (ex : newsletter, cookies analytics) 
                        sans affecter la licéité du traitement fondé sur le consentement effectué avant le retrait.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 border border-orange-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="text-orange-400" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-orange-400 mb-2">Droit d'introduire une réclamation (Art. 77 RGPD)</h3>
                      <p className="text-sm text-gray-300 mb-2">
                        Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation 
                        auprès de l'autorité de contrôle compétente :
                      </p>
                      <div className="text-sm text-gray-400 bg-black/50 rounded-lg p-3 mt-2">
                        <p className="font-semibold text-orange-400 mb-1">ARTCI (Côte d'Ivoire)</p>
                        <p>Autorité de Régulation des Télécommunications de Côte d'Ivoire</p>
                        <p className="text-xs mt-1">www.artci.ci</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mesures de Sécurité */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="text-cyan-400" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 text-white">Mesures de Sécurité Techniques</h2>
                  
                  <div className="space-y-3 text-gray-300 mb-6">
                    <p>
                      Conformément à l'article 32 du RGPD, nous mettons en œuvre des mesures techniques et 
                      organisationnelles appropriées pour garantir un niveau de sécurité adapté aux risques :
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-4">
                      <h4 className="font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                        <CheckCircle size={16} />
                        Chiffrement End-to-End
                      </h4>
                      <p className="text-sm text-gray-400">
                        SSL/TLS 1.3, chiffrement AES-256 pour les données au repos, HTTPS systématique.
                      </p>
                    </div>

                    <div className="bg-black/30 border border-purple-500/20 rounded-xl p-4">
                      <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                        <CheckCircle size={16} />
                        Authentification Renforcée
                      </h4>
                      <p className="text-sm text-gray-400">
                        2FA obligatoire pour accès admin, gestion des accès basée sur les rôles (RBAC).
                      </p>
                    </div>

                    <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-4">
                      <h4 className="font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                        <CheckCircle size={16} />
                        Sauvegardes Quotidiennes
                      </h4>
                      <p className="text-sm text-gray-400">
                        Backup automatique chiffré, rétention 30 jours, tests de restauration mensuels.
                      </p>
                    </div>

                    <div className="bg-black/30 border border-purple-500/20 rounded-xl p-4">
                      <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                        <CheckCircle size={16} />
                        Monitoring 24/7
                      </h4>
                      <p className="text-sm text-gray-400">
                        Détection d'intrusion, logs sécurisés, alertes en temps réel, incident response.
                      </p>
                    </div>

                    <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-4">
                      <h4 className="font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                        <CheckCircle size={16} />
                        Audits de Sécurité
                      </h4>
                      <p className="text-sm text-gray-400">
                        Pentests trimestriels, analyse de vulnérabilités, mises à jour de sécurité hebdomadaires.
                      </p>
                    </div>

                    <div className="bg-black/30 border border-purple-500/20 rounded-xl p-4">
                      <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                        <CheckCircle size={16} />
                        Privacy by Design
                      </h4>
                      <p className="text-sm text-gray-400">
                        Pseudonymisation, minimisation données, privacy impact assessment (PIA).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sous-traitants */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Sous-traitants RGPD</h2>
              
              <div className="space-y-3 text-gray-300 mb-6">
                <p>
                  Nous faisons appel à des sous-traitants certifiés pour certaines opérations techniques. 
                  Tous nos sous-traitants sont soumis à des obligations contractuelles strictes conformément 
                  à l'article 28 du RGPD :
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-cyan-400 mb-1">Hébergement</h4>
                      <p className="text-sm text-gray-300">Supabase (Certification ISO 27001, SOC 2 Type II)</p>
                      <p className="text-xs text-gray-500 mt-1">Localisation : UE (conformité RGPD)</p>
                    </div>
                    <CheckCircle className="text-green-400" size={20} />
                  </div>
                </div>

                <div className="bg-black/30 border border-purple-500/20 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-purple-400 mb-1">Emailing</h4>
                      <p className="text-sm text-gray-300">Brevo (Certification ISO 27001, conformité RGPD)</p>
                      <p className="text-xs text-gray-500 mt-1">Localisation : UE (serveurs en France)</p>
                    </div>
                    <CheckCircle className="text-green-400" size={20} />
                  </div>
                </div>

                <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-cyan-400 mb-1">Analytics</h4>
                      <p className="text-sm text-gray-300">Solution auto-hébergée (respect privacy, pas de cookies tiers)</p>
                      <p className="text-xs text-gray-500 mt-1">Données anonymisées, conformité ePrivacy</p>
                    </div>
                    <CheckCircle className="text-green-400" size={20} />
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-4">
                * Tous nos sous-traitants ont signé un DPA (Data Processing Agreement) conforme à l'article 28 RGPD.
              </p>
            </section>

            {/* Transferts Internationaux */}
            <section className="bg-white/5 border border-gray-800/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Transferts de Données Hors UE</h2>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  Vos données personnelles sont principalement stockées et traitées au sein de l'Union Européenne.
                </p>
                
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-orange-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-orange-400 mb-2">Aucun transfert hors UE</h3>
                      <p className="text-sm text-gray-300">
                        Nous ne transférons actuellement aucune donnée personnelle vers des pays situés en dehors 
                        de l'Union Européenne ou de l'Espace Économique Européen (EEE).
                      </p>
                      <p className="text-sm text-gray-300 mt-2">
                        En cas de transfert futur, nous nous engageons à mettre en place les garanties appropriées 
                        conformément à l'article 46 du RGPD (clauses contractuelles types de la Commission européenne, 
                        Privacy Shield successeur, ou décision d'adéquation).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Exercer vos Droits */}
            <section className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-white text-center">Comment Exercer Vos Droits RGPD ?</h2>
              
              <div className="space-y-4 text-gray-300">
                <p className="text-center max-w-2xl mx-auto">
                  Pour toute demande relative à vos droits RGPD, contactez notre Délégué à la Protection des Données (DPO) :
                </p>

                <div className="bg-black/30 border border-cyan-500/20 rounded-xl p-6 max-w-xl mx-auto">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 font-semibold min-w-[100px]">Email DPO :</span>
                      <a href="mailto:contact@leonceouattarastudiogroup.site" className="text-cyan-400 hover:underline">
                        contact@leonceouattarastudiogroup.site
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 font-semibold min-w-[100px]">Objet :</span>
                      <span className="text-gray-300">"Demande RGPD - [Type de droit]"</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 font-semibold min-w-[100px]">Pièces :</span>
                      <span className="text-gray-300">Justificatif d'identité (sécurité)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 font-semibold min-w-[100px]">Délai :</span>
                      <span className="text-green-400 font-semibold">Maximum 30 jours (Art. 12 RGPD)</span>
                    </div>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-400 max-w-2xl mx-auto mt-6">
                  Nous nous engageons à traiter votre demande dans les meilleurs délais. 
                  En cas de complexité, nous vous informerons d'une prolongation éventuelle de 60 jours supplémentaires.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Questions sur le RGPD ?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Notre équipe est à votre disposition pour répondre à toutes vos questions concernant 
                la protection de vos données personnelles et vos droits RGPD.
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

export default RGPD;
