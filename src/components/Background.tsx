import React from 'react'

export default function Background () {
  return (
    <span className="pointer-events-none fixed inset-0 h-full w-full opacity-100">
      <svg
        className="pointer-events-none h-full w-full touch-none select-none bg-transparent"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="transparent"
      >
        <defs>
          <pattern
            id="grid-0"
            width="640"
            height="640"
            patternUnits="userSpaceOnUse"
            fill="transparent"
            className="bg-transparent"
          >
            <circle
              cx="640"
              cy="640"
              r="2"
              opacity="1"
              className="bg-transparent fill-stone-300 dark:fill-stone-700"
            ></circle>
          </pattern>
          <pattern
            id="grid-1"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
            fill="transparent"
            className="bg-transparent"
          >
            <circle
              cx="160"
              cy="160"
              r="2"
              opacity="1"
              className="bg-transparent fill-stone-300 dark:fill-stone-700"
            ></circle>
          </pattern>
          <pattern
            id="grid-2"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            fill="transparent"
            className="bg-transparent"
          >
            <circle
              cx="40"
              cy="40"
              r="2"
              opacity="1"
              className="bg-transparent fill-stone-300 dark:fill-stone-700"
            ></circle>
          </pattern>
          <pattern
            id="grid-3"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            fill="transparent"
            className="bg-transparent"
          >
            <circle
              cx="10"
              cy="10"
              r="2"
              opacity="0.16666666666666669"
              className="bg-transparent fill-stone-300 dark:fill-stone-700"
            ></circle>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-0)"></rect>
        <rect width="100%" height="100%" fill="url(#grid-1)"></rect>
        <rect width="100%" height="100%" fill="url(#grid-2)"></rect>
        <rect width="100%" height="100%" fill="url(#grid-3)"></rect>
      </svg>
    </span>
  )
}
