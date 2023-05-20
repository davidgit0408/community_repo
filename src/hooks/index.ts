import { useEffect, useState } from 'react'
export const useDarkMode = () => {
  const [isDark, setDark] = useState(false)
  useEffect(() => {
    setDark(localStorage.getItem('themeMode') === 'dark')
  }, [])
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('themeMode', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('themeMode', 'light')
    }
  }, [isDark])

  return {
    isDark,
    toggle: () => {
      setDark(!isDark)
    },
  }
}
