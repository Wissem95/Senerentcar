"use client"

import { useEffect, useRef } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js"
import { Line, Bar, Doughnut } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
)

interface DashboardChartProps {
  type: "revenue" | "vehicles" | "bookings"
}

export function DashboardChart({ type }: DashboardChartProps) {
  const chartRef = useRef(null)

  const revenueData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
    datasets: [
      {
        label: "Revenus (FCFA)",
        data: [450000, 520000, 380000, 620000, 580000, 720000],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
      {
        label: "Objectif",
        data: [500000, 550000, 600000, 650000, 700000, 750000],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  }

  const vehiclesData = {
    labels: ["Toyota Camry", "Hyundai Tucson", "Mercedes E-Class", "Renault Clio", "Land Cruiser"],
    datasets: [
      {
        label: "Réservations",
        data: [28, 24, 18, 22, 16],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(245, 158, 11)",
          "rgb(239, 68, 68)",
          "rgb(139, 92, 246)",
        ],
        borderWidth: 2,
      },
    ],
  }

  const bookingsData = {
    labels: ["Confirmées", "En cours", "Terminées", "Annulées"],
    datasets: [
      {
        data: [45, 12, 28, 8],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgb(16, 185, 129)",
          "rgb(59, 130, 246)",
          "rgb(245, 158, 11)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
        cornerRadius: 8,
      },
    },
    scales: type !== "bookings" ? {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: function(value: any) {
            if (type === "revenue") {
              return new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "XOF",
                notation: "compact",
              }).format(value)
            }
            return value
          },
        },
      },
    } : undefined,
  }

  const renderChart = () => {
    switch (type) {
      case "revenue":
        return (
          <div className="h-64">
            <Line ref={chartRef} data={revenueData} options={chartOptions} />
          </div>
        )
      case "vehicles":
        return (
          <div className="h-64">
            <Bar ref={chartRef} data={vehiclesData} options={chartOptions} />
          </div>
        )
      case "bookings":
        return (
          <div className="h-64">
            <Doughnut ref={chartRef} data={bookingsData} options={chartOptions} />
          </div>
        )
      default:
        return <div>Type de graphique non supporté</div>
    }
  }

  return (
    <div className="w-full">
      {renderChart()}
    </div>
  )
}