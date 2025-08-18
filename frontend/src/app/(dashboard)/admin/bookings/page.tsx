"use client"

import { useState, useEffect, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Calendar, momentLocalizer, View } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import {
  Calendar as CalendarIcon,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"

import { AdminLayout } from "@/components/layouts/admin-layout"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useBookings, useUpdateBookingStatus } from "@/hooks/useBookings"

moment.locale("fr")
const localizer = momentLocalizer(moment)

interface Booking {
  id: string
  bookingNumber: string
  customerName: string
  customerEmail: string
  vehicleName: string
  startDate: Date
  endDate: Date
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  totalAmount: number
  pickupLocation: string
  dropoffLocation: string
  paymentStatus: "pending" | "partial" | "paid" | "failed"
}


const getStatusBadge = (status: Booking["status"]) => {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          <Clock className="mr-1 h-3 w-3" />
          En attente
        </Badge>
      )
    case "confirmed":
      return (
        <Badge className="bg-blue-100 text-blue-800">
          <CheckCircle className="mr-1 h-3 w-3" />
          Confirmée
        </Badge>
      )
    case "in_progress":
      return (
        <Badge className="bg-green-100 text-green-800">
          <CalendarIcon className="mr-1 h-3 w-3" />
          En cours
        </Badge>
      )
    case "completed":
      return (
        <Badge className="bg-gray-100 text-gray-800">
          <CheckCircle className="mr-1 h-3 w-3" />
          Terminée
        </Badge>
      )
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-800">
          <XCircle className="mr-1 h-3 w-3" />
          Annulée
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getPaymentStatusBadge = (status: Booking["paymentStatus"]) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline">En attente</Badge>
    case "partial":
      return <Badge className="bg-orange-100 text-orange-800">Partiel</Badge>
    case "paid":
      return <Badge className="bg-green-100 text-green-800">Payé</Badge>
    case "failed":
      return <Badge className="bg-red-100 text-red-800">Échec</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function BookingsPage() {
  const [viewMode, setViewMode] = useState<"calendar" | "table">("table")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [calendarView, setCalendarView] = useState<View>("month")
  
  const { bookings, loading, error, refetch } = useBookings({
    status: selectedStatus === 'all' ? undefined : selectedStatus
  })
  
  const { updateStatus, loading: updateLoading } = useUpdateBookingStatus()

  // Transform bookings for calendar
  const calendarEvents = useMemo(
    () =>
      bookings
        .filter((booking) => 
          selectedStatus === "all" || booking.status === selectedStatus
        )
        .map((booking) => ({
          id: booking.id,
          title: `${booking.vehicleName} - ${booking.customerName}`,
          start: booking.startDate,
          end: booking.endDate,
          resource: booking,
        })),
    [bookings, selectedStatus]
  )

  const handleStatusUpdate = async (bookingId: string, status: Booking['status']) => {
    try {
      await updateStatus(bookingId, status)
      refetch()
    } catch (error) {
      console.error('Error updating booking status:', error)
    }
  }

  const confirmBooking = (bookingId: string) => {
    handleStatusUpdate(bookingId, 'confirmed')
  }

  const cancelBooking = (bookingId: string) => {
    handleStatusUpdate(bookingId, 'cancelled')
  }

  const startBooking = (bookingId: string) => {
    handleStatusUpdate(bookingId, 'in_progress')
  }

  const columns: ColumnDef<Booking>[] = useMemo(
    () => [
      {
        accessorKey: "bookingNumber",
        header: "N° Réservation",
        cell: ({ row }) => (
          <div className="font-medium text-blue-600">
            {row.getValue("bookingNumber")}
          </div>
        ),
      },
      {
        accessorKey: "customerName",
        header: "Client",
        cell: ({ row }) => {
          const booking = row.original
          return (
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {booking.customerName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {booking.customerEmail}
              </p>
            </div>
          )
        },
      },
      {
        accessorKey: "vehicleName",
        header: "Véhicule",
        cell: ({ row }) => (
          <span className="font-medium">{row.getValue("vehicleName")}</span>
        ),
      },
      {
        accessorKey: "startDate",
        header: "Début",
        cell: ({ row }) => {
          const date = row.getValue("startDate") as Date
          return (
            <div>
              <p className="font-medium">
                {date.toLocaleDateString("fr-FR")}
              </p>
              <p className="text-sm text-gray-500">
                {date.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )
        },
      },
      {
        accessorKey: "endDate",
        header: "Fin",
        cell: ({ row }) => {
          const date = row.getValue("endDate") as Date
          return (
            <div>
              <p className="font-medium">
                {date.toLocaleDateString("fr-FR")}
              </p>
              <p className="text-sm text-gray-500">
                {date.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )
        },
      },
      {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => getStatusBadge(row.getValue("status")),
      },
      {
        accessorKey: "paymentStatus",
        header: "Paiement",
        cell: ({ row }) => getPaymentStatusBadge(row.getValue("paymentStatus")),
      },
      {
        accessorKey: "totalAmount",
        header: "Montant",
        cell: ({ row }) => (
          <span className="font-medium">
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "XOF",
            }).format(row.getValue("totalAmount"))}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const booking = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Ouvrir le menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  Voir détails
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {booking.status === "pending" && (
                  <>
                    <DropdownMenuItem
                      onClick={() => confirmBooking(booking.id)}
                      className="text-green-600"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirmer
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => cancelBooking(booking.id)}
                      className="text-red-600"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Annuler
                    </DropdownMenuItem>
                  </>
                )}
                {booking.status === "confirmed" && (
                  <DropdownMenuItem
                    onClick={() => startBooking(booking.id)}
                    className="text-blue-600"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Démarrer
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    []
  )

  const eventStyleGetter = (event: any) => {
    const booking = event.resource as Booking
    let backgroundColor = "#3174ad"

    switch (booking.status) {
      case "pending":
        backgroundColor = "#f59e0b"
        break
      case "confirmed":
        backgroundColor = "#3b82f6"
        break
      case "in_progress":
        backgroundColor = "#10b981"
        break
      case "completed":
        backgroundColor = "#6b7280"
        break
      case "cancelled":
        backgroundColor = "#ef4444"
        break
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    }
  }

  const stats = [
    {
      title: "Total réservations",
      value: bookings.length.toString(),
      color: "blue",
    },
    {
      title: "En attente",
      value: bookings.filter((b) => b.status === "pending").length.toString(),
      color: "yellow",
    },
    {
      title: "Confirmées",
      value: bookings.filter((b) => b.status === "confirmed").length.toString(),
      color: "blue",
    },
    {
      title: "En cours",
      value: bookings.filter((b) => b.status === "in_progress").length.toString(),
      color: "green",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestion des réservations
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Suivez et gérez toutes les réservations
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              onClick={() => setViewMode("table")}
            >
              Table
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              onClick={() => setViewMode("calendar")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Calendrier
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                  <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmées</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminées</option>
                <option value="cancelled">Annulées</option>
              </select>
            </div>

            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Rechercher par client, véhicule, numéro..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Content */}
        {viewMode === "table" ? (
          <Card className="p-6">
            <DataTable
              columns={columns}
              data={bookings.filter(
                (booking) =>
                  selectedStatus === "all" || booking.status === selectedStatus
              )}
              searchKey="customerName"
              searchPlaceholder="Rechercher une réservation..."
            />
          </Card>
        ) : (
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Planning des réservations</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant={calendarView === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCalendarView("month")}
                >
                  Mois
                </Button>
                <Button
                  variant={calendarView === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCalendarView("week")}
                >
                  Semaine
                </Button>
                <Button
                  variant={calendarView === "day" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCalendarView("day")}
                >
                  Jour
                </Button>
              </div>
            </div>

            <div style={{ height: "600px" }}>
              <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                view={calendarView}
                onView={setCalendarView}
                eventPropGetter={eventStyleGetter}
                popup
                messages={{
                  month: "Mois",
                  week: "Semaine",
                  day: "Jour",
                  today: "Aujourd'hui",
                  previous: "Précédent",
                  next: "Suivant",
                  agenda: "Agenda",
                }}
                formats={{
                  monthHeaderFormat: "MMMM YYYY",
                  dayHeaderFormat: "dddd DD MMMM",
                  dayRangeHeaderFormat: ({ start, end }: any) =>
                    `${moment(start).format("DD MMM")} - ${moment(end).format(
                      "DD MMM YYYY"
                    )}`,
                }}
              />
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}