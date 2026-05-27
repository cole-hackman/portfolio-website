export function getInitialDarkMode() {
  if (typeof window === "undefined") return false
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  return savedTheme === "dark" || (!savedTheme && prefersDark)
}

export function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark)
}
