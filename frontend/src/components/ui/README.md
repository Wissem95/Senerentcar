# UI Components Documentation

This directory contains reusable UI components for the Senerentcar admin interface.

## Components Overview

### Base Components
- `Badge` - Status indicators and labels
- `Button` - Interactive buttons with variants
- `Card` - Container component for content sections
- `Dialog` - Modal dialogs and overlays
- `DropdownMenu` - Dropdown menus and context menus
- `Input` - Form input fields
- `Label` - Form labels
- `DataTable` - Advanced data table with sorting and filtering
- `Table` - Basic table components
- `Loading` - Loading spinners and indicators

### Reusable Admin Components

#### StatsCard
Displays statistics with icons, values, and optional change indicators.

```tsx
import { StatsCard } from "@/components/ui"
import { Car } from "lucide-react"

<StatsCard
  title="Total véhicules"
  value={42}
  icon={Car}
  change="+12%"
  changeType="positive"
  color="blue"
/>
```

#### StatusBadge
Standardized status badges with predefined configurations.

```tsx
import { StatusBadge, vehicleStatusConfig } from "@/components/ui"

<StatusBadge 
  status="available" 
  config={vehicleStatusConfig} 
/>
```

Available configurations:
- `vehicleStatusConfig` - Vehicle status badges
- `bookingStatusConfig` - Booking status badges  
- `paymentStatusConfig` - Payment status badges
- `customerStatusConfig` - Customer status badges

#### PageHeader
Consistent page header with title, description, and actions.

```tsx
import { PageHeader } from "@/components/ui"

<PageHeader 
  title="Gestion des véhicules"
  description="Gérez votre flotte de véhicules"
>
  <Button>Ajouter véhicule</Button>
</PageHeader>
```

#### ActionDropdown
Standardized dropdown menus for table actions.

```tsx
import { ActionDropdown } from "@/components/ui"
import { Edit, Trash, Eye } from "lucide-react"

const actionGroups = [
  {
    actions: [
      {
        label: "Modifier",
        icon: Edit,
        onClick: () => handleEdit(),
      },
      {
        label: "Voir détails", 
        icon: Eye,
        onClick: () => handleView(),
      }
    ],
    separator: true
  },
  {
    actions: [
      {
        label: "Supprimer",
        icon: Trash,
        onClick: () => handleDelete(),
        className: "text-red-600"
      }
    ]
  }
]

<ActionDropdown groups={actionGroups} />
```

#### FilterBar
Filter and search components for data tables.

```tsx
import { FilterBar, FilterSelect } from "@/components/ui"

<FilterBar
  searchProps={{
    placeholder: "Rechercher...",
    onChange: setSearchTerm
  }}
>
  <FilterSelect
    value={statusFilter}
    onChange={setStatusFilter}
    options={[
      { label: "Disponible", value: "available" },
      { label: "Loué", value: "rented" }
    ]}
  />
</FilterBar>
```

#### EmptyState
Empty state component for when no data is available.

```tsx
import { EmptyState } from "@/components/ui"
import { Car } from "lucide-react"

<EmptyState
  icon={Car}
  title="Aucun véhicule"
  description="Aucun véhicule n'a été trouvé"
  action={{
    label: "Ajouter véhicule",
    onClick: () => openModal()
  }}
/>
```

#### Currency
Currency formatting component and utility.

```tsx
import { Currency, formatCurrency } from "@/components/ui"

// Component usage
<Currency amount={45000} />

// Utility function
const price = formatCurrency(45000, "XOF", "compact")
```

## Design Principles

1. **Consistency** - All components follow the same design patterns
2. **Reusability** - Components are designed to be used across different contexts
3. **Accessibility** - Components include proper ARIA labels and keyboard navigation
4. **Dark Mode** - All components support dark mode theming
5. **TypeScript** - Full type safety with proper interfaces
6. **Animation** - Smooth animations using Framer Motion where appropriate

## Color System

Components use a consistent color system:
- `blue` - Primary actions and information
- `green` - Success states and positive actions
- `yellow` - Warning states and pending actions  
- `red` - Error states and destructive actions
- `purple` - Special highlights and premium features
- `gray` - Neutral states and inactive elements

## Usage Guidelines

1. **Import from index** - Always import from `@/components/ui` to use the barrel export
2. **Use predefined configs** - Leverage predefined status configurations for consistency
3. **Follow naming conventions** - Use descriptive names that match the component's purpose
4. **Maintain accessibility** - Include proper labels and keyboard support
5. **Test dark mode** - Ensure components work in both light and dark themes