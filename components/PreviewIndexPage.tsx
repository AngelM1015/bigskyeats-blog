import IndexPage, { type IndexPageProps } from 'components/IndexPage'

// Preview functionality temporarily disabled in next-sanity v10
// TODO: Implement with @sanity/visual-editing when stable

export default function PreviewIndexPage(props: IndexPageProps) {
  // Simplified preview that just uses static data
  return (
    <IndexPage
      preview
      loading={false}
      posts={props.posts || []}
      settings={props.settings || {}}
    />
  )
}
