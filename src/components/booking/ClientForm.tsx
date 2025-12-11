/**
 * Component: ClientForm
 * Étape 3 - Formulaire informations client
 */

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, MessageSquare, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';
import ChannelSelection from './ChannelSelection';
import { MeetingChannel } from '../../types/booking.types';
import { COUNTRIES, detectUserCountry, CountryOption } from '../../utils/countryHelpers';

const ClientForm: React.FC = () => {
  const { bookingData, setClient, setChannel, setAcceptTerms, nextStep, previousStep } = useBooking();

  const [formData, setFormData] = useState({
    name: bookingData.client?.name || '',
    email: bookingData.client?.email || '',
    phone: bookingData.client?.phone || '',
    countryCode: bookingData.client?.countryCode || '+33',
    company: bookingData.client?.company || '',
    notes: bookingData.client?.notes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptTerms, setAcceptTermsState] = useState(bookingData.acceptTerms);
  const [selectedChannel, setSelectedChannel] = useState<MeetingChannel | null>(
    bookingData.channel
  );
  const [detectedCountry, setDetectedCountry] = useState<CountryOption | null>(null);

  // Détecter le pays au chargement
  useEffect(() => {
    const detectCountry = async () => {
      const country = await detectUserCountry();
      setDetectedCountry(country);
      
      // Si pas de countryCode déjà défini, utiliser celui détecté
      if (!bookingData.client?.countryCode) {
        setFormData((prev) => ({ ...prev, countryCode: country.dialCode }));
      }
    };
    
    detectCountry();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (formData.phone.trim().length < 6) {
      newErrors.phone = 'Numéro invalide';
    }

    if (!selectedChannel) {
      newErrors.channel = 'Veuillez sélectionner un canal de communication';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setClient(formData);
      setChannel(selectedChannel);
      setAcceptTerms(acceptTerms);
      nextStep();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Header - Responsive */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-2 sm:mb-3">
          Vos informations
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
          Remplissez ce formulaire pour finaliser votre réservation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        {/* Nom complet */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 px-1">
            Nom complet *
          </label>
          <div className="relative">
            <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border ${
                errors.name ? 'border-red-500' : 'border-white/10'
              } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
              placeholder="Votre nom"
            />
          </div>
          {errors.name && <p className="mt-1 text-xs sm:text-sm text-red-400 px-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 px-1">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border ${
                errors.email ? 'border-red-500' : 'border-white/10'
              } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
              placeholder="votre@email.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-400 px-1">{errors.email}</p>}
        </div>

        {/* Téléphone - Responsive grid */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 px-1">
            Téléphone *
            {detectedCountry && (
              <span className="ml-2 text-xs text-cyan-400 block sm:inline mt-1 sm:mt-0">
                (Pays détecté: {detectedCountry.flag} {detectedCountry.name})
              </span>
            )}
          </label>
          <div className="flex gap-2 sm:gap-3">
            <select
              value={formData.countryCode}
              onChange={(e) => handleChange('countryCode', e.target.value)}
              className="w-20 sm:w-32 px-1.5 sm:px-2 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
            >
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.dialCode}>
                  {country.flag} {country.dialCode}
                </option>
              ))}
            </select>
            <div className="relative flex-1">
              <Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border ${
                  errors.phone ? 'border-red-500' : 'border-white/10'
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors`}
                placeholder="6 12 34 56 78"
              />
            </div>
          </div>
          {errors.phone && <p className="mt-1 text-xs sm:text-sm text-red-400 px-1">{errors.phone}</p>}
        </div>

        {/* Entreprise (optionnel) */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 px-1">
            Entreprise (optionnel)
          </label>
          <div className="relative">
            <Building className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Nom de votre entreprise"
            />
          </div>
        </div>

        {/* Notes (optionnel) */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 px-1">
            Message / Notes (optionnel)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={4}
              maxLength={500}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              placeholder="Précisez votre demande ou toute information utile..."
            />
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 text-right px-1">
            {formData.notes.length} / 500
          </p>
        </div>

        {/* Canal de communication */}
        <div>
          <ChannelSelection
            selectedChannel={selectedChannel}
            onSelect={(channel) => {
              setSelectedChannel(channel);
              if (errors.channel) {
                setErrors((prev) => ({ ...prev, channel: '' }));
              }
            }}
          />
          {errors.channel && <p className="mt-2 text-xs sm:text-sm text-red-400 px-1">{errors.channel}</p>}
        </div>

        {/* Conditions - Responsive */}
        <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
          <label className="flex items-start gap-2.5 sm:gap-3 cursor-pointer group">
            <div className="relative flex-shrink-0 mt-0.5 sm:mt-1">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTermsState(e.target.checked);
                  if (errors.terms) {
                    setErrors((prev) => ({ ...prev, terms: '' }));
                  }
                }}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                  acceptTerms
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 border-transparent'
                    : errors.terms
                    ? 'border-red-500'
                    : 'border-white/30 group-hover:border-cyan-500'
                }`}
              >
                {acceptTerms && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                J'accepte les{' '}
                <a href="#" className="text-cyan-400 hover:underline">
                  conditions générales
                </a>{' '}
                et la{' '}
                <a href="#" className="text-cyan-400 hover:underline">
                  politique de confidentialité
                </a>
                . Je consens à être contacté par email ou téléphone concernant mon rendez-vous.
              </p>
            </div>
          </label>
          {errors.terms && <p className="mt-2 text-xs sm:text-sm text-red-400 px-1">{errors.terms}</p>}
        </div>

        {/* Navigation - Responsive */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
          <button
            type="button"
            onClick={previousStep}
            className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm sm:text-base transition-all order-2 sm:order-1"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Retour
          </button>

          <button
            type="submit"
            disabled={!acceptTerms || !selectedChannel}
            className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 order-1 sm:order-2"
          >
            <span>Continuer</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
