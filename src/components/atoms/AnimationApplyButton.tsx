import React from 'react'

interface AnimationApplyButtonProps {
  label: string
  onClick: () => void
}

export const AnimationApplyButton = ({
  label,
  onClick,
}: AnimationApplyButtonProps) => {
  return (
    <button
      className="w-16 h-16 border rounded overflow-hidden"
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}
