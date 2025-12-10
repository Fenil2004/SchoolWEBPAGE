export function createPageUrl(path) {
  if (!path) return '/'
  if (path === 'Home') return '/'
  return `/${path.toLowerCase()}`
}
