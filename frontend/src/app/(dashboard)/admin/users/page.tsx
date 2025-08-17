"use client"

import { useState, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import {
  Users,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  MoreHorizontal,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  Star,
  TrendingUp,
} from "lucide-react"

import { AdminLayout } from "@/components/layouts/admin-layout"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { CustomerDetailsModal } from "@/components/admin/customer-details-modal"

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  dateOfBirth?: Date
  isVerified: boolean
  status: "active" | "inactive" | "suspended"
  totalBookings: number
  totalSpent: number
  avgRating: number
  lastBookingDate?: Date
  joinDate: Date
  driverLicenseNumber?: string
  driverLicenseExpiry?: Date
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    firstName: "Amadou",
    lastName: "Diallo",
    email: "amadou@example.com",
    phone: "+221770000001",
    city: "Dakar",
    dateOfBirth: new Date("1985-05-15"),
    isVerified: true,
    status: "active",
    totalBookings: 12,
    totalSpent: 1250000,
    avgRating: 4.8,
    lastBookingDate: new Date("2025-08-10"),
    joinDate: new Date("2023-03-15"),
    driverLicenseNumber: "SN12345678",
    driverLicenseExpiry: new Date("2028-05-15"),
  },
  {
    id: "2",
    firstName: "Fatou",
    lastName: "Sow",
    email: "fatou@example.com",
    phone: "+221770000002",
    city: "Thiès",
    dateOfBirth: new Date("1990-08-22"),
    isVerified: true,
    status: "active",
    totalBookings: 8,
    totalSpent: 680000,
    avgRating: 4.5,
    lastBookingDate: new Date("2025-07-28"),
    joinDate: new Date("2023-06-10"),
    driverLicenseNumber: "SN87654321",
    driverLicenseExpiry: new Date("2027-08-22"),
  },
  {
    id: "3",
    firstName: "Ousmane",
    lastName: "Ba",
    email: "ousmane@example.com",
    phone: "+221770000003",
    city: "Saint-Louis",
    isVerified: false,
    status: "active",
    totalBookings: 3,
    totalSpent: 285000,
    avgRating: 4.2,
    lastBookingDate: new Date("2025-08-05"),
    joinDate: new Date("2024-01-20"),
  },
  {
    id: "4",
    firstName: "Awa",
    lastName: "Ndiaye",
    email: "awa@example.com",
    phone: "+221770000004",
    city: "Dakar",
    dateOfBirth: new Date("1988-12-10"),
    isVerified: true,
    status: "active",
    totalBookings: 15,
    totalSpent: 1800000,
    avgRating: 4.9,
    lastBookingDate: new Date("2025-08-12"),
    joinDate: new Date("2022-11-05"),
    driverLicenseNumber: "SN11223344",
    driverLicenseExpiry: new Date("2029-12-10"),
  },
]

const getStatusBadge = (status: Customer["status"]) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="mr-1 h-3 w-3" />
          Actif
        </Badge>
      )
    case "inactive":
      return (
        <Badge className="bg-gray-100 text-gray-800">
          Inactif
        </Badge>
      )
    case "suspended":
      return (
        <Badge className="bg-red-100 text-red-800">
          <Ban className="mr-1 h-3 w-3" />
          Suspendu
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getCustomerTier = (totalSpent: number) => {
  if (totalSpent >= 1500000) return { label: "Premium", color: "bg-purple-100 text-purple-800" }
  if (totalSpent >= 800000) return { label: "Gold", color: "bg-yellow-100 text-yellow-800" }
  if (totalSpent >= 300000) return { label: "Silver", color: "bg-gray-100 text-gray-800" }
  return { label: "Bronze", color: "bg-orange-100 text-orange-800" }
}

export default function UsersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleCustomerStatus = (customerId: string) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === customerId
          ? {
              ...customer,
              status: customer.status === "active" ? "suspended" : "active"
            }
          : customer
      )
    )
  }

  const viewCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsModalOpen(true)
  }

  const columns: ColumnDef<Customer>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Client",
        cell: ({ row }) => {
          const customer = row.original
          const tier = getCustomerTier(customer.totalSpent)
          return (
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                {customer.firstName[0]}{customer.lastName[0]}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {customer.firstName} {customer.lastName}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {customer.email}
                  </p>
                  <Badge className={tier.color}>{tier.label}</Badge>
                  {customer.isVerified && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "phone",
        header: "Téléphone",
        cell: ({ row }) => (
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{row.getValue("phone")}</span>
          </div>
        ),
      },
      {
        accessorKey: "city",
        header: "Ville",
        cell: ({ row }) => (
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{row.getValue("city")}</span>
          </div>
        ),
      },
      {
        accessorKey: "totalBookings",
        header: "Réservations",
        cell: ({ row }) => (
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{row.getValue("totalBookings")}</span>
          </div>
        ),
      },
      {
        accessorKey: "totalSpent",
        header: "Total dépensé",
        cell: ({ row }) => (
          <span className="font-medium">
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "XOF",
            }).format(row.getValue("totalSpent"))}
          </span>
        ),
      },
      {
        accessorKey: "avgRating",
        header: "Note moyenne",
        cell: ({ row }) => {
          const rating = row.getValue("avgRating") as number
          return (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating?.toFixed(1) || "N/A"}</span>
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
        accessorKey: "joinDate",
        header: "Inscription",
        cell: ({ row }) => {
          const date = row.getValue("joinDate") as Date
          return (
            <span className="text-sm text-gray-500">
              {date.toLocaleDateString("fr-FR")}
            </span>
          )
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const customer = row.original

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
                <DropdownMenuItem onClick={() => viewCustomerDetails(customer)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Voir profil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => toggleCustomerStatus(customer.id)}
                  className={
                    customer.status === "active" ? "text-red-600" : "text-green-600"
                  }
                >
                  {customer.status === "active" ? (
                    <>
                      <Ban className="mr-2 h-4 w-4" />
                      Suspendre
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Activer
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    []
  )

  const stats = [
    {
      title: "Total clients",
      value: customers.length.toString(),
      icon: Users,
      color: "blue",
    },
    {
      title: "Clients actifs",
      value: customers.filter(c => c.status === "active").length.toString(),
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Clients vérifiés",
      value: customers.filter(c => c.isVerified).length.toString(),
      icon: CheckCircle,
      color: "blue",
    },
    {
      title: "Revenus clients",
      value: new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
        notation: "compact",
      }).format(customers.reduce((sum, c) => sum + c.totalSpent, 0)),
      icon: TrendingUp,
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
              Gestion des clients
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gérez vos clients et leurs informations
            </p>
          </div>
          <Button>
            <User className="mr-2 h-4 w-4" />
            Nouveau client
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                  <stat.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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

        {/* Customer segments */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <Card className="p-4 bg-purple-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">
                  Clients Premium
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  {customers.filter(c => getCustomerTier(c.totalSpent).label === "Premium").length}
                </p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </Card>

          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">
                  Clients Gold
                </p>
                <p className="text-2xl font-bold text-yellow-900">
                  {customers.filter(c => getCustomerTier(c.totalSpent).label === "Gold").length}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </Card>

          <Card className="p-4 bg-gray-50 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Clients Silver
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter(c => getCustomerTier(c.totalSpent).label === "Silver").length}
                </p>
              </div>
              <Star className="h-8 w-8 text-gray-600" />
            </div>
          </Card>

          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">
                  Clients Bronze
                </p>
                <p className="text-2xl font-bold text-orange-900">
                  {customers.filter(c => getCustomerTier(c.totalSpent).label === "Bronze").length}
                </p>
              </div>
              <Star className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Customers table */}
        <Card className="p-6">
          <DataTable
            columns={columns}
            data={customers}
            searchKey="firstName"
            searchPlaceholder="Rechercher un client..."
          />
        </Card>

        {/* Customer details modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          {selectedCustomer && (
            <CustomerDetailsModal
              customer={selectedCustomer}
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false)
                setSelectedCustomer(null)
              }}
            />
          )}
        </Dialog>
      </div>
    </AdminLayout>
  )
}