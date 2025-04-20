import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function BookingChart({ bookingStats, lastReservations, loading }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (loading || !bookingStats || !lastReservations) return;

    // Vérifiez que les données nécessaires sont présentes
    if (!bookingStats.total && bookingStats.total !== 0) {
      console.error("Données de réservation incomplètes", bookingStats);
      return;
    }

    try {
      // Créer des données mensuelles factices si nécessaire
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
      const currentMonth = new Date().getMonth();
      const labels = months.slice(Math.max(0, currentMonth - 5), currentMonth + 1);
      
      // Données factices basées sur les stats (à adapter avec vos vraies données)
      const completedData = labels.map((_, i) => 
        Math.round(bookingStats.completed * (i + 1) / labels.length)
      );
      
      const inProgressData = labels.map((_, i) => 
        Math.round(bookingStats.inProgress * (i + 1) / labels.length)
      );
      
      const cancelledData = labels.map((_, i) => 
        Math.round((bookingStats.cancelled || 0) * (i + 1) / labels.length)
      );

      if (chartRef.current) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Complétés',
                data: completedData,
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1,
                borderRadius: 4,
              },
              {
                label: 'En cours',
                data: inProgressData,
                backgroundColor: 'rgba(245, 158, 11, 0.7)',
                borderColor: 'rgba(245, 158, 11, 1)',
                borderWidth: 1,
                borderRadius: 4,
              },
              {
                label: 'Annulés',
                data: cancelledData,
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 1,
                borderRadius: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  drawBorder: false,
                },
                ticks: {
                  stepSize: Math.max(1, Math.round(bookingStats.total / 5)),
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  boxWidth: 12,
                  padding: 16,
                  usePointStyle: true,
                  pointStyle: 'circle',
                },
              },
              tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#1F2937',
                bodyColor: '#1F2937',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 12,
                usePointStyle: true,
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: ${context.raw}`;
                  },
                },
              },
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },
          },
        });
      }
    } catch (error) {
      console.error("Erreur lors de la création du graphique:", error);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [bookingStats, lastReservations, loading]);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!bookingStats || bookingStats.total === undefined) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Aucune donnée de réservation disponible
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <canvas ref={chartRef} />
    </div>
  );
}

export default BookingChart;