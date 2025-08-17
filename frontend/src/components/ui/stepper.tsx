"use client"

import { ReactNode, useState } from "react"
import { motion } from "framer-motion"
import { Check, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  description?: string
  icon?: LucideIcon
  optional?: boolean
}

interface StepperProps {
  steps: Step[]
  currentStep: string
  completedSteps?: string[]
  className?: string
  orientation?: "horizontal" | "vertical"
  variant?: "default" | "minimal" | "numbered"
}

interface StepperStepProps {
  step: Step
  index: number
  isActive: boolean
  isCompleted: boolean
  isLast: boolean
  orientation: "horizontal" | "vertical"
  variant: "default" | "minimal" | "numbered"
  onClick?: (stepId: string) => void
}

function StepperStep({
  step,
  index,
  isActive,
  isCompleted,
  isLast,
  orientation,
  variant,
  onClick
}: StepperStepProps) {
  const Icon = step.icon

  const handleClick = () => {
    if (onClick && (isCompleted || isActive)) {
      onClick(step.id)
    }
  }

  const getStepIndicatorContent = () => {
    if (isCompleted) {
      return <Check className="w-4 h-4" />
    }
    
    if (variant === "numbered") {
      return <span className="text-sm font-semibold">{index + 1}</span>
    }
    
    if (Icon) {
      return <Icon className="w-4 h-4" />
    }
    
    return <span className="text-sm font-semibold">{index + 1}</span>
  }

  const getStepIndicatorClassName = () => {
    return cn(
      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200",
      isCompleted && "bg-senegal-green border-senegal-green text-white",
      isActive && !isCompleted && "bg-senegal-green border-senegal-green text-white",
      !isActive && !isCompleted && "bg-white border-gray-300 text-gray-400",
      (onClick && (isCompleted || isActive)) && "cursor-pointer hover:scale-105"
    )
  }

  const getConnectorClassName = () => {
    return cn(
      "transition-colors duration-200",
      orientation === "horizontal" && "flex-1 h-0.5 mx-4",
      orientation === "vertical" && "w-0.5 h-8 ml-4",
      (isCompleted || isActive) && "bg-senegal-green",
      !isCompleted && !isActive && "bg-gray-300"
    )
  }

  return (
    <div className={cn(
      "flex items-center",
      orientation === "vertical" && "flex-col items-start",
      orientation === "horizontal" && "flex-1"
    )}>
      <div className={cn(
        "flex items-center",
        orientation === "vertical" && "mb-2"
      )}>
        {/* Step Indicator */}
        <motion.button
          onClick={handleClick}
          className={getStepIndicatorClassName()}
          whileHover={(onClick && (isCompleted || isActive)) ? { scale: 1.05 } : {}}
          whileTap={(onClick && (isCompleted || isActive)) ? { scale: 0.95 } : {}}
          disabled={!onClick || (!isCompleted && !isActive)}
        >
          {getStepIndicatorContent()}
        </motion.button>

        {/* Step Text */}
        {orientation === "vertical" && (
          <div className="ml-4">
            <h3 className={cn(
              "font-medium text-sm transition-colors",
              isActive && "text-senegal-green",
              isCompleted && "text-gray-900",
              !isActive && !isCompleted && "text-gray-400"
            )}>
              {step.title}
              {step.optional && (
                <span className="ml-1 text-xs text-gray-400 font-normal">
                  (optionnel)
                </span>
              )}
            </h3>
            {step.description && (
              <p className={cn(
                "text-xs mt-1 transition-colors",
                isActive && "text-gray-600",
                !isActive && "text-gray-400"
              )}>
                {step.description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Connector Line */}
      {!isLast && (
        <div className={getConnectorClassName()} />
      )}

      {/* Step Text for Horizontal */}
      {orientation === "horizontal" && (
        <div className="mt-3 text-center">
          <h3 className={cn(
            "font-medium text-sm transition-colors",
            isActive && "text-senegal-green",
            isCompleted && "text-gray-900", 
            !isActive && !isCompleted && "text-gray-400"
          )}>
            {step.title}
            {step.optional && (
              <span className="ml-1 text-xs text-gray-400 font-normal block">
                (optionnel)
              </span>
            )}
          </h3>
          {step.description && variant !== "minimal" && (
            <p className={cn(
              "text-xs mt-1 transition-colors",
              isActive && "text-gray-600",
              !isActive && "text-gray-400"
            )}>
              {step.description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export function Stepper({
  steps,
  currentStep,
  completedSteps = [],
  className,
  orientation = "horizontal",
  variant = "default",
  onClick
}: StepperProps & { onClick?: (stepId: string) => void }) {
  return (
    <div className={cn(
      "stepper",
      orientation === "horizontal" && "flex items-start",
      orientation === "vertical" && "space-y-6",
      className
    )}>
      {steps.map((step, index) => (
        <StepperStep
          key={step.id}
          step={step}
          index={index}
          isActive={step.id === currentStep}
          isCompleted={completedSteps.includes(step.id)}
          isLast={index === steps.length - 1}
          orientation={orientation}
          variant={variant}
          onClick={onClick}
        />
      ))}
    </div>
  )
}

// Hook utilitaire pour gérer l'état du stepper
export function useStepper(initialSteps: Step[], initialStep?: string) {
  const [currentStep, setCurrentStep] = useState(initialStep || initialSteps[0]?.id)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const goToStep = (stepId: string) => {
    setCurrentStep(stepId)
  }

  const nextStep = () => {
    const currentIndex = initialSteps.findIndex(step => step.id === currentStep)
    if (currentIndex < initialSteps.length - 1) {
      const nextStepId = initialSteps[currentIndex + 1].id
      setCurrentStep(nextStepId)
    }
  }

  const prevStep = () => {
    const currentIndex = initialSteps.findIndex(step => step.id === currentStep)
    if (currentIndex > 0) {
      const prevStepId = initialSteps[currentIndex - 1].id
      setCurrentStep(prevStepId)
    }
  }

  const completeStep = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) ? prev : [...prev, stepId]
    )
  }

  const uncompleteStep = (stepId: string) => {
    setCompletedSteps(prev => prev.filter(id => id !== stepId))
  }

  const completeCurrentStep = () => {
    completeStep(currentStep)
  }

  const isStepCompleted = (stepId: string) => {
    return completedSteps.includes(stepId)
  }

  const getCurrentStepIndex = () => {
    return initialSteps.findIndex(step => step.id === currentStep)
  }

  const canGoNext = () => {
    const currentIndex = getCurrentStepIndex()
    return currentIndex < initialSteps.length - 1
  }

  const canGoPrev = () => {
    const currentIndex = getCurrentStepIndex()
    return currentIndex > 0
  }

  const getCurrentStep = () => {
    return initialSteps.find(step => step.id === currentStep)
  }

  const reset = () => {
    setCurrentStep(initialSteps[0]?.id)
    setCompletedSteps([])
  }

  return {
    currentStep,
    completedSteps,
    goToStep,
    nextStep,
    prevStep,
    completeStep,
    uncompleteStep,
    completeCurrentStep,
    isStepCompleted,
    getCurrentStepIndex,
    canGoNext,
    canGoPrev,
    getCurrentStep,
    reset
  }
}

export type { Step, StepperProps }