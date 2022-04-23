import React from "react"

export default function AbilityScoreMod({ modArray }) {
  return (
    <div className="ability-mod">
      {modArray.map((item) => {
        return (
          <span>
            {item.text}: {item.value}
          </span>
        )
      })}
    </div>
  )
}
