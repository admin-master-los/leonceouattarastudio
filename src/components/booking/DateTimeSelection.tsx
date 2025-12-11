/**
 * Component: DateTimeSelection
 * Étape 2 - Choix de la date et de l'heure
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';
import { checkSlotAvailability } from '../../admin/services/meetingsService';
import { generateTimeSlots } from '../../admin/utils/meetingHelpers';
import { useAllAvailabilities, useAllBlockedDates } from '../../admin/hooks/useAvailability';
import { useSettings } from '../../admin/hooks/useMeetingSettings';

const DateTimeSelection: React.FC = () => {
  const { bookingData, setDateTime, nextStep, previousStep } = useBooking();
  const { data: availabilities } = useAllAvailabilities();
  const { data: blockedDates } = useAllBlockedDates();
  const { data: settings } = useSettings();

  const [selectedDate, setSelectedDate] = useState<string | null>(bookingData.date);
  const [selectedTime, setSelectedTime] = useState<string | null>(bookingData.time);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Générer les jours du mois
  const getDaysInMonth = () => {
    const date = new Date(currentYear, currentMonth, 1);
    const days: Date[] = [];

    while (date.getMonth() === currentMonth) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  const days = getDaysInMonth();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Vérifier si une date est disponible
  const isDateAvailable = (date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Passé
    if (date < today) return false;

    // Trop loin dans le futur
    const maxDays = settings?.max_advance_days || 90;
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + maxDays);
    if (date > maxDate) return false;

    // Date bloquée
    if (blockedDates?.some((bd) => bd.blocked_date === dateStr)) return false;

    // Vérifier disponibilité jour de la semaine
    const dayOfWeek = date.getDay();
    const hasAvailability = availabilities?.some(
      (av) => av.day_of_week === dayOfWeek && av.is_available
    );

    return hasAvailability || false;
  };

  // Charger les créneaux disponibles pour une date
  useEffect(() => {
    const loadSlots = async () => {
      if (!selectedDate || !bookingData.service) return;

      setLoadingSlots(true);
      try {
        const dayOfWeek = new Date(selectedDate).getDay();
        const dayAvailability = availabilities?.find(
          (av) => av.day_of_week === dayOfWeek && av.is_available
        );

        if (!dayAvailability) {
          setAvailableSlots([]);
          return;
        }

        // Générer tous les créneaux possibles
        const bufferTime = settings?.buffer_time || 0;
        const allSlots = generateTimeSlots(
          dayAvailability.start_time,
          dayAvailability.end_time,
          bookingData.service.duration,
          bufferTime
        );

        // Vérifier disponibilité de chaque créneau
        const slotsAvailability = await Promise.all(
          allSlots.map(async (slot) => {
            const available = await checkSlotAvailability(
              selectedDate,
              slot,
              bookingData.service!.duration
            );
            return { slot, available };
          })
        );

        // Filtrer les créneaux disponibles
        const available = slotsAvailability
          .filter((s) => s.available)
          .map((s) => s.slot);

        // Filtrer les créneaux dans le futur (si aujourd'hui)
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        const minHours = settings?.min_advance_hours || 24;

        const filteredSlots = available.filter((slot) => {
          if (selectedDate !== today) return true;

          const slotTime = new Date(`${selectedDate}T${slot}`);
          const minTime = new Date(now.getTime() + minHours * 60 * 60 * 1000);

          return slotTime >= minTime;
        });

        setAvailableSlots(filteredSlots);
      } catch (error) {
        console.error('Erreur chargement créneaux:', error);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    loadSlots();
  }, [selectedDate, bookingData.service, availabilities, settings, blockedDates]);

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    setSelectedDate(dateStr);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setDateTime(selectedDate, selectedTime);
      nextStep();
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ];

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">
      {/* Header - Responsive */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-2 sm:mb-3 px-4">
          Choisissez votre créneau
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
          Service : <span className="text-white font-semibold">{bookingData.service?.name}</span> 
          <span className="hidden xs:inline"> ({bookingData.service?.duration} min)</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Calendrier - Responsive */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              <span className="hidden xs:inline">Sélectionnez une date</span>
              <span className="xs:hidden">Date</span>
            </h3>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={prevMonth}
                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Mois précédent"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
              <span className="text-white font-semibold text-sm sm:text-base min-w-[140px] sm:min-w-[180px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button
                onClick={nextMonth}
                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Mois suivant"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Jours de la semaine - Responsive */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
            {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day, idx) => (
              <div key={day} className="text-center text-gray-400 text-xs sm:text-sm font-medium py-1 sm:py-2">
                <span className="hidden xs:inline">{day}</span>
                <span className="xs:hidden">{['D', 'L', 'M', 'M', 'J', 'V', 'S'][idx]}</span>
              </div>
            ))}
          </div>

          {/* Jours du mois - Responsive */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Espaces vides avant le premier jour */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Jours */}
            {days.map((day) => {
              const dateStr = day.toISOString().split('T')[0];
              const isAvailable = isDateAvailable(day);
              const isSelected = selectedDate === dateStr;
              const isToday = day.toDateString() === new Date().toDateString();

              return (
                <button
                  key={dateStr}
                  onClick={() => isAvailable && handleDateSelect(day)}
                  disabled={!isAvailable}
                  className={`
                    aspect-square rounded-md sm:rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium transition-all
                    ${isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white scale-105 sm:scale-110 shadow-lg'
                      : isAvailable
                      ? 'bg-white/5 text-white hover:bg-white/10 hover:scale-105'
                      : 'bg-transparent text-gray-600 cursor-not-allowed'
                    }
                    ${isToday && !isSelected ? 'ring-1 sm:ring-2 ring-cyan-500' : ''}
                  `}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          {/* Légende - Responsive */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-gradient-to-r from-cyan-500 to-purple-600" />
              <span className="text-gray-400">Sélectionné</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded ring-1 sm:ring-2 ring-cyan-500 bg-white/5" />
              <span className="text-gray-400">Aujourd'hui</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-gray-600" />
              <span className="text-gray-400">Indisponible</span>
            </div>
          </div>
        </div>

        {/* Créneaux horaires - Responsive */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 mb-4 sm:mb-6">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            <span className="hidden xs:inline">Choisissez une heure</span>
            <span className="xs:hidden">Heure</span>
          </h3>

          {!selectedDate ? (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
              <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-400 px-4">Sélectionnez d'abord une date</p>
            </div>
          ) : loadingSlots ? (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500" />
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
              <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-400 px-4">Aucun créneau disponible pour cette date</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 max-h-[300px] sm:max-h-[400px] overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => handleTimeSelect(slot)}
                  className={`
                    px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all
                    ${selectedTime === slot
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white scale-105 shadow-lg'
                      : 'bg-white/5 text-white hover:bg-white/10 hover:scale-105 border border-white/10'
                    }
                  `}
                >
                  {slot.substring(0, 5)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation buttons - Responsive */}
      <div className="flex items-center justify-between pt-4 sm:pt-6 gap-3">
        <button
          onClick={previousStep}
          className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base transition-all"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">Retour</span>
        </button>

        {selectedDate && selectedTime && (
          <button
            onClick={handleContinue}
            className="group flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
          >
            <span>Continuer</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      <style>{`
        @media (min-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
          .xs\\:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default DateTimeSelection;
