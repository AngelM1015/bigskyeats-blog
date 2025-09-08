// Preview functionality temporarily disabled in next-sanity v10
// TODO: Implement with @sanity/visual-editing when stable

export default function PreviewProvider({
  children,
}: {
  children: React.ReactNode
  token?: string
}) {
  // Simplified provider that just passes through children
  return <>{children}</>
}
