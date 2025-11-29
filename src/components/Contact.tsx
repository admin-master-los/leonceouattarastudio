import React, { useState, useEffect } from 'react';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageCircle,
  CheckCircle,
  Shield,
  ExternalLink,
  Loader,
  ArrowRight,
  ArrowLeft,
  Building2,
  Target,
  DollarSign,
  Sparkles,
  Check,
  Users,
  Globe,
  Code,
  TrendingUp,
  Clock,
  FileText,
  Rocket,
} from 'lucide-react';
import { ContactForm } from '../types';
import ChatBot from './ChatBot';
import { submitContactForm, type ContactFormData } from '../lib/useSupabaseData';

interface ExtendedContactForm extends ContactForm {
  rgpdConsent: boolean;
  phone?: string;
  sector?: string;
  employeeCount?: string;
  projectType?: string;
  timeline?: string;
  features?: string[];
  urgency?: string;
}

// Types de projets - ALIGNÉS SUR LES SERVICES (prix et durées discutés lors du contact)
const PROJECT_TYPES = [
  { id: 'portail-web', label: 'Développement de Portails Web', icon: Globe },
  { id: 'solutions-metiers', label: 'Solutions Métiers Financières', icon: Code },
  { id: 'digitalisation-bpm', label: 'Digitalisation & Workflows (BPM)', icon: TrendingUp },
  { id: 'systemes-paiement', label: 'Systèmes de Paiement', icon: DollarSign },
  { id: 'systemes-information', label: 'Optimisation Systèmes Info (SI)', icon: Building2 },
  { id: 'data-analytics', label: 'Tableaux de bord / KPI & Analytics', icon: TrendingUp },
];

// Fonctionnalités optionnelles (prix discutés lors du contact)
const FEATURES = [
  { id: 'auth', label: 'Authentification Avancée' },
  { id: 'payment', label: 'Paiement en Ligne' },
  { id: 'analytics', label: 'Analytics & Reporting' },
  { id: 'api', label: 'Intégrations API' },
  { id: 'mobile-app', label: 'Version Mobile' },
  { id: 'admin', label: 'Dashboard Admin' },
  { id: 'seo', label: 'Optimisation SEO' },
  { id: 'multilang', label: 'Multilingue' },
];

// Secteurs
const SECTORS = [
  'Microfinance',
  'Banque',
  'Assurance',
  'Fintech',
  'E-commerce',
  'Santé',
  'Éducation',
  'Autre',
];

const Contact: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ExtendedContactForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    sector: '',
    employeeCount: '',
    projectType: '',
    timeline: '',
    features: [],
    budget: '',
    urgency: '',
    project: '',
    rgpdConsent: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ExtendedContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ExtendedContactForm]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleFeature = (featureId: string) => {
    const current = formData.features || [];
    if (current.includes(featureId)) {
      handleInputChange(
        'features',
        current.filter((f) => f !== featureId)
      );
    } else {
      handleInputChange('features', [...current, featureId]);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<ExtendedContactForm> = {};

    if (step === 1) {
      if (!formData.name.trim() || formData.name.length < 2) {
        newErrors.name = 'Nom requis (min. 2 caractères)';
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
      if (!formData.company.trim()) {
        newErrors.company = 'Entreprise requise';
      }
      if (!formData.sector) {
        newErrors.sector = 'Secteur requis';
      }
    }

    if (step === 2) {
      if (!formData.projectType) {
        newErrors.projectType = 'Type de projet requis';
      }
      if (!formData.timeline) {
        newErrors.timeline = 'Timeline requis';
      }
    }

    if (step === 3) {
      if (!formData.project.trim() || formData.project.length < 20) {
        newErrors.project = 'Description requise (min. 20 caractères)';
      }
      if (!formData.urgency) {
        newErrors.urgency = 'Urgence requise';
      }
    }

    if (step === 4) {
      if (!formData.rgpdConsent) {
        newErrors.rgpdConsent = 'Consentement RGPD requis';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      // Scroll vers la section contact (pas en haut de page)
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const offset = 100; // Offset pour navbar sticky
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    // Scroll vers la section contact (pas en haut de page)
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 100;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let ipAddress: string | undefined;
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        ipAddress = data.ip;
      } catch (ipError) {
        ipAddress = undefined;
      }

      const userAgent = navigator.userAgent;

      // Budget formaté avec infos sélection
      const budgetText = `Timeline: ${formData.timeline} | Urgence: ${formData.urgency}`;

      const contactData: ContactFormData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        company: formData.company.trim(),
        budget: budgetText,
        project: `
SECTEUR: ${formData.sector}
TYPE PROJET: ${PROJECT_TYPES.find((p) => p.id === formData.projectType)?.label}
FONCTIONNALITÉS: ${formData.features?.map((f) => FEATURES.find((feat) => feat.id === f)?.label).join(', ')}
TIMELINE: ${formData.timeline}
URGENCE: ${formData.urgency}
TÉLÉPHONE: ${formData.phone || 'Non fourni'}
EFFECTIFS: ${formData.employeeCount || 'Non fourni'}

DESCRIPTION:
${formData.project.trim()}
        `.trim(),
        rgpd_consent: formData.rgpdConsent,
        ip_address: ipAddress,
        user_agent: userAgent,
      };

      await submitContactForm(contactData);

      // ✨ Envoyer emails via Brevo (même système que rendez-vous)
      try {
        const { sendContactEmails } = await import('../services/emailService');
        
        const emailData = {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: budgetText,
          project: contactData.project,
        };
        
        const { clientSent, adminSent } = await sendContactEmails(emailData);
        
        console.log('📧 Emails envoyés:', { clientSent, adminSent });
        
        if (!clientSent || !adminSent) {
          console.warn('⚠️ Certains emails n\'ont pas pu être envoyés');
        }
      } catch (emailError) {
        console.error('⚠️ Erreur envoi emails:', emailError);
        // Ne pas bloquer si emails échouent
      }

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setCurrentStep(1);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          sector: '',
          employeeCount: '',
          projectType: '',
          timeline: '',
          features: [],
          budget: '',
          urgency: '',
          project: '',
          rgpdConsent: false,
        });
      }, 8000);
    } catch (error: any) {
      console.error('Submit error:', error);
      setSubmitError(
        'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseChatBot = () => {
    setIsChatBotOpen(false);
  };

  const progress = (currentStep / 4) * 100;

  return (
    <section id="contact" className="relative overflow-hidden bg-black">
      {/* Gradient de transition HAUT */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10"></div>

      {/* Background radial gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
            <Sparkles size={16} className="text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">
              Estimation gratuite en 2 minutes
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-white">Démarrons Votre </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Projet Digital
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Réponse sous 24h • Consultation gratuite • Devis personnalisé
          </p>
        </div>

        {!isSubmitted ? (
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                        currentStep >= step
                          ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white scale-110 shadow-lg shadow-purple-500/50'
                          : 'bg-gray-800 text-gray-500'
                      }`}
                    >
                      {currentStep > step ? (
                        <Check size={24} />
                      ) : (
                        <span>{step}</span>
                      )}
                    </div>
                    {step < 4 && (
                      <div className="flex-1 h-1 mx-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500"
                          style={{
                            width: currentStep > step ? '100%' : '0%',
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Profil</span>
                <span>Projet</span>
                <span>Budget</span>
                <span>Confirmation</span>
              </div>
            </div>

            {/* Form Steps */}
            <div className="bg-transparent backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 md:p-12">
              {/* ÉTAPE 1: Profil */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Parlez-nous de vous
                    </h3>
                    <p className="text-gray-400">
                      Informations de contact et entreprise
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Nom complet <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Jean Dupont"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Email professionnel <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="jean@entreprise.ci"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="+225 XX XX XX XX XX"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Entreprise <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                        placeholder="Nom de l'entreprise"
                      />
                      {errors.company && (
                        <p className="text-red-400 text-sm mt-1">{errors.company}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Secteur d'activité <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.sector}
                        onChange={(e) => handleInputChange('sector', e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all [&>option]:bg-black [&>option]:text-white"
                      >
                        <option value="" className="bg-black text-white">Sélectionner</option>
                        {SECTORS.map((sector) => (
                          <option key={sector} value={sector} className="bg-black text-white">
                            {sector}
                          </option>
                        ))}
                      </select>
                      {errors.sector && (
                        <p className="text-red-400 text-sm mt-1">{errors.sector}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Nombre d'employés
                      </label>
                      <select
                        value={formData.employeeCount}
                        onChange={(e) =>
                          handleInputChange('employeeCount', e.target.value)
                        }
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all [&>option]:bg-black [&>option]:text-white"
                      >
                        <option value="" className="bg-black text-white">Sélectionner</option>
                        <option value="1-10" className="bg-black text-white">1-10</option>
                        <option value="11-50" className="bg-black text-white">11-50</option>
                        <option value="51-200" className="bg-black text-white">51-200</option>
                        <option value="200+" className="bg-black text-white">200+</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ÉTAPE 2: Type de Projet */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Rocket size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Type de projet
                    </h3>
                    <p className="text-gray-400">
                      Choisissez le type de solution dont vous avez besoin
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PROJECT_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isSelected = formData.projectType === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => handleInputChange('projectType', type.id)}
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                            isSelected
                              ? 'border-purple-500 bg-purple-500/20 scale-105 shadow-xl shadow-purple-500/20'
                              : 'border-gray-700 bg-white/5 hover:border-gray-600 hover:bg-white/10'
                          }`}
                        >
                          <Icon
                            size={32}
                            className={`mb-3 ${
                              isSelected ? 'text-purple-400' : 'text-gray-400'
                            }`}
                          />
                          <h4
                            className={`font-bold text-sm ${
                              isSelected ? 'text-white' : 'text-gray-300'
                            }`}
                          >
                            {type.label}
                          </h4>
                        </button>
                      );
                    })}
                  </div>
                  {errors.projectType && (
                    <p className="text-red-400 text-sm">{errors.projectType}</p>
                  )}

                  <div className="mt-8">
                    <label className="block text-white font-medium mb-3">
                      Fonctionnalités souhaitées (optionnel)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {FEATURES.map((feature) => (
                        <button
                          key={feature.id}
                          onClick={() => toggleFeature(feature.id)}
                          className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                            formData.features?.includes(feature.id)
                              ? 'border-cyan-500 bg-cyan-500/20'
                              : 'border-gray-700 bg-white/5 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium">
                              {feature.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Timeline souhaitée <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all [&>option]:bg-black [&>option]:text-white"
                      >
                        <option value="" className="bg-black text-white">Sélectionner</option>
                        <option value="1-month" className="bg-black text-white">Moins d'1 mois</option>
                        <option value="1-3-months" className="bg-black text-white">1-3 mois</option>
                        <option value="3-6-months" className="bg-black text-white">3-6 mois</option>
                        <option value="6-months+" className="bg-black text-white">Plus de 6 mois</option>
                      </select>
                      {errors.timeline && (
                        <p className="text-red-400 text-sm mt-1">{errors.timeline}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ÉTAPE 3: Budget & Description */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Détails du projet
                    </h3>
                    <p className="text-gray-400">
                      Décrivez votre projet et vos besoins
                    </p>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Description du projet <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={formData.project}
                      onChange={(e) => handleInputChange('project', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                      placeholder="Décrivez votre projet, vos objectifs, et vos besoins spécifiques..."
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Minimum 20 caractères • {formData.project.length}/1000
                    </p>
                    {errors.project && (
                      <p className="text-red-400 text-sm mt-1">{errors.project}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Niveau d'urgence <span className="text-red-400">*</span>
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { id: 'normal', label: 'Normal', desc: 'Planning flexible' },
                        {
                          id: 'important',
                          label: 'Important',
                          desc: 'Dans les prochains mois',
                        },
                        {
                          id: 'urgent',
                          label: 'Urgent',
                          desc: 'Démarrage immédiat',
                        },
                      ].map((urgency) => (
                        <button
                          key={urgency.id}
                          onClick={() => handleInputChange('urgency', urgency.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.urgency === urgency.id
                              ? 'border-purple-500 bg-purple-500/20'
                              : 'border-gray-700 bg-white/5 hover:border-gray-600'
                          }`}
                        >
                          <p
                            className={`font-bold mb-1 ${
                              formData.urgency === urgency.id
                                ? 'text-white'
                                : 'text-gray-300'
                            }`}
                          >
                            {urgency.label}
                          </p>
                          <p className="text-xs text-gray-400">{urgency.desc}</p>
                        </button>
                      ))}
                    </div>
                    {errors.urgency && (
                      <p className="text-red-400 text-sm mt-1">{errors.urgency}</p>
                    )}
                  </div>
                </div>
              )}

              {/* ÉTAPE 4: Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Récapitulatif
                    </h3>
                    <p className="text-gray-400">Vérifiez vos informations</p>
                  </div>

                  {/* Récapitulatif */}
                  <div className="bg-white/5 border border-gray-700 rounded-2xl p-6 space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Contact</p>
                      <p className="text-white font-medium">
                        {formData.name} • {formData.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Entreprise</p>
                      <p className="text-white font-medium">
                        {formData.company} • {formData.sector}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Type de projet</p>
                      <p className="text-white font-medium">
                        {PROJECT_TYPES.find((p) => p.id === formData.projectType)
                          ?.label || 'N/A'}
                      </p>
                    </div>
                    {formData.features && formData.features.length > 0 && (
                      <div>
                        <p className="text-gray-400 text-sm">Fonctionnalités</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.features.map((featureId) => (
                            <span
                              key={featureId}
                              className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs text-cyan-400"
                            >
                              {FEATURES.find((f) => f.id === featureId)?.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* RGPD */}
                  <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <input
                        id="rgpdConsent"
                        type="checkbox"
                        checked={formData.rgpdConsent}
                        onChange={(e) =>
                          handleInputChange('rgpdConsent', e.target.checked)
                        }
                        className={`w-5 h-5 rounded mt-0.5 ${
                          errors.rgpdConsent
                            ? 'border-red-500'
                            : 'border-purple-500/50'
                        } bg-white/5 text-purple-500 focus:ring-2 focus:ring-purple-500/50 cursor-pointer`}
                        disabled={isSubmitting}
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="rgpdConsent"
                          className="text-white text-sm leading-relaxed cursor-pointer"
                        >
                          J'accepte que mes données personnelles soient collectées
                          conformément à la{' '}
                          <a
                            href="/politique-confidentialite"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 underline inline-flex items-center gap-1"
                          >
                            politique de confidentialité
                            <ExternalLink size={12} />
                          </a>{' '}
                          et au RGPD. <span className="text-red-400">*</span>
                        </label>
                        {errors.rgpdConsent && (
                          <p className="text-red-400 text-sm mt-2">
                            {errors.rgpdConsent}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                      <p className="text-red-400 text-sm">{submitError}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-gray-700 rounded-xl text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
                  >
                    <ArrowLeft size={20} />
                    Précédent
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className="ml-auto flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 font-bold hover:scale-105"
                  >
                    Suivant
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.rgpdConsent}
                    className={`ml-auto flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                      isSubmitting || !formData.rgpdConsent
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader size={20} className="animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Envoyer ma demande
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Success Message
          <div className="max-w-2xl mx-auto text-center py-12 animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
              <CheckCircle size={48} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Demande envoyée avec succès ! 🎉
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
              Merci pour votre intérêt. Vous recevrez une réponse détaillée sous
              24h avec un devis personnalisé.
            </p>
            <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-2xl p-8">
              <p className="text-green-400 font-bold text-xl mb-4">
                ✅ Demande enregistrée
              </p>
              <p className="text-gray-300 mb-2">
                Email : <span className="text-cyan-400 font-semibold">{formData.email}</span>
              </p>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            {
              icon: CheckCircle,
              title: 'Réponse Rapide',
              desc: 'Sous 24h ouvrées',
            },
            { icon: Shield, title: 'Données Sécurisées', desc: 'RGPD compliant' },
            { icon: Rocket, title: 'Sans Engagement', desc: 'Devis gratuit' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <Icon size={32} className="text-purple-400 mx-auto mb-3" />
                <h4 className="text-white font-bold mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {isChatBotOpen && (
        <div className="chatbot-wrapper">
          <ChatBot defaultOpen={true} onClose={handleCloseChatBot} />
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        input[type="checkbox"]:checked {
          background-color: rgb(168, 85, 247);
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
        }
      `}</style>
    </section>
  );
};

export default Contact;
