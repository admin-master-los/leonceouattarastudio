/**
 * Component: Confirmation
 * Étape 4 - Confirmation et création du rendez-vous
 */

import React, { useState } from 'react';
import { CheckCircle, Calendar, Clock, User, Mail, Phone, Building, ChevronLeft, Loader, Video, Download } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';
import { useCreateMeeting } from '../../admin/hooks/useMeetings';
import { useNavigate } from 'react-router-dom';
import { sendMeetingEmails } from '../../services/emailService';
import { generateMeetingICS } from '../../utils/icsGenerator';

// Helper pour afficher le nom du canal
const getChannelLabel = (channel: string | null): string => {
  const labels: Record<string, string> = {
    zoom: 'Zoom',
    google_meet: 'Google Meet',
    microsoft_teams: 'Microsoft Teams',
    whatsapp_video: 'WhatsApp Video',
    skype: 'Skype',
    phone: 'Téléphone',
    in_person: 'En personne',
  };
  return channel ? labels[channel] || channel : 'Non spécifié';
};

const Confirmation: React.FC = () => {
  const { bookingData, previousStep, resetBooking } = useBooking();
  const createMeeting = useCreateMeeting();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConfirm = async () => {
    if (!bookingData.service || !bookingData.date || !bookingData.time || !bookingData.client) {
      return;
    }

    setIsSubmitting(true);

    try {
      const meeting = await createMeeting.mutateAsync({
        service_id: bookingData.service.id,
        meeting_date: bookingData.date,
        meeting_time: bookingData.time,
        duration: bookingData.service.duration,
        client_name: bookingData.client.name,
        client_email: bookingData.client.email,
        client_phone: bookingData.client.phone,
        client_country_code: bookingData.client.countryCode,
        client_company: bookingData.client.company || undefined,
        client_notes: bookingData.client.notes || undefined,
        meeting_channel: bookingData.channel || 'zoom',
      });

      // Envoyer emails de confirmation
      try {
        await sendMeetingEmails({
          clientName: bookingData.client.name,
          clientEmail: bookingData.client.email,
          serviceName: bookingData.service.name,
          meetingDate: bookingData.date,
          meetingTime: bookingData.time,
          duration: bookingData.service.duration,
          channel: bookingData.channel || 'zoom',
        });
        console.log('✅ Emails envoyés');
      } catch (emailError) {
        console.warn('⚠️ Erreur envoi emails:', emailError);
        // Ne pas bloquer la confirmation même si l'email échoue
      }

      setSuccess(true);
    } catch (error: any) {
      console.error('Erreur création RDV:', error);
      alert(error.message || 'Erreur lors de la réservation');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 sm:space-y-8 px-4 sm:px-6">
        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 sm:mb-6 animate-bounce">
          <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-3 sm:mb-4">
            Rendez-vous confirmé !
          </h2>
          <p className="text-gray-300 text-base sm:text-lg px-4">
            Votre demande de rendez-vous a bien été enregistrée.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-5 sm:p-8">
          <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 break-words">
            Un email de confirmation vous a été envoyé à{' '}
            <span className="text-white font-semibold block sm:inline mt-1 sm:mt-0">{bookingData.client?.email}</span>
          </p>

          <div className="space-y-3 sm:space-y-4 text-left">
            <div className="flex items-start gap-3 sm:gap-4">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0 mt-0.5 sm:mt-1" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-400">Date & Heure</p>
                <p className="text-white font-semibold text-sm sm:text-base break-words">
                  {new Date(bookingData.date!).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  à {bookingData.time?.substring(0, 5)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 mt-0.5 sm:mt-1" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-400">Service</p>
                <p className="text-white font-semibold text-sm sm:text-base break-words">
                  {bookingData.service?.name} ({bookingData.service?.duration} min)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <Video className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5 sm:mt-1" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-400">Canal</p>
                <p className="text-white font-semibold text-sm sm:text-base">
                  {getChannelLabel(bookingData.channel)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => {
              if (bookingData.service && bookingData.date && bookingData.time && bookingData.client) {
                generateMeetingICS({
                  serviceName: bookingData.service.name,
                  clientName: bookingData.client.name,
                  clientEmail: bookingData.client.email,
                  meetingDate: bookingData.date,
                  meetingTime: bookingData.time,
                  duration: bookingData.service.duration,
                  channel: bookingData.channel || 'zoom',
                });
              }
            }}
            className="flex-1 px-5 sm:px-6 py-3 sm:py-4 bg-white/10 hover:bg-white/20 border-2 border-cyan-500 rounded-xl text-white text-sm sm:text-base font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="truncate">Ajouter au calendrier</span>
          </button>

          <button
            onClick={() => {
              resetBooking();
              navigate('/');
            }}
            className="flex-1 px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Header - Responsive */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-2 sm:mb-3">
          Confirmez votre rendez-vous
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
          Vérifiez les informations avant de valider
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        {/* Service - Responsive */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: bookingData.service?.color }}
            />
            <span>Service</span>
          </h3>
          <div className="space-y-1.5 sm:space-y-2">
            <p className="text-white font-semibold text-lg sm:text-xl break-words">{bookingData.service?.name}</p>
            {bookingData.service?.description && (
              <p className="text-gray-400 text-sm sm:text-base break-words">{bookingData.service.description}</p>
            )}
            <p className="text-gray-300 text-sm sm:text-base flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Durée : {bookingData.service?.duration} minutes</span>
            </p>
          </div>
        </div>

        {/* Date & Heure - Responsive */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
            <span>Date & Heure</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-gray-400 text-xs sm:text-sm mb-1">Date</p>
              <p className="text-white font-semibold text-sm sm:text-base break-words">
                {new Date(bookingData.date!).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs sm:text-sm mb-1">Heure</p>
              <p className="text-white font-semibold text-sm sm:text-base">{bookingData.time?.substring(0, 5)}</p>
            </div>
          </div>
        </div>

        {/* Canal de communication - Responsive */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <Video className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
            <span>Canal de communication</span>
          </h3>
          <p className="text-white font-semibold text-base sm:text-lg">
            {getChannelLabel(bookingData.channel)}
          </p>
        </div>

        {/* Informations client - Responsive */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
            <span>Vos informations</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5 sm:mt-1" />
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs sm:text-sm">Nom</p>
                <p className="text-white font-medium text-sm sm:text-base break-words">{bookingData.client?.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 sm:gap-3">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5 sm:mt-1" />
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs sm:text-sm">Email</p>
                <p className="text-white font-medium text-sm sm:text-base break-words">{bookingData.client?.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 sm:gap-3">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5 sm:mt-1" />
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs sm:text-sm">Téléphone</p>
                <p className="text-white font-medium text-sm sm:text-base break-words">
                  {bookingData.client?.countryCode} {bookingData.client?.phone}
                </p>
              </div>
            </div>

            {bookingData.client?.company && (
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Building className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                <div className="min-w-0 flex-1">
                  <p className="text-gray-400 text-xs sm:text-sm">Entreprise</p>
                  <p className="text-white font-medium text-sm sm:text-base break-words">{bookingData.client.company}</p>
                </div>
              </div>
            )}
          </div>

          {bookingData.client?.notes && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
              <p className="text-gray-400 text-xs sm:text-sm mb-1">Notes</p>
              <p className="text-white text-sm sm:text-base break-words">{bookingData.client.notes}</p>
            </div>
          )}
        </div>

        {/* Actions - Responsive */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 pt-4 sm:pt-6">
          <button
            onClick={previousStep}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Modifier
          </button>

          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="group flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 order-1 sm:order-2"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span>Confirmation...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Confirmer le rendez-vous</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
