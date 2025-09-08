import PostPage, { PostPageProps } from 'components/PostPage'
import {
  type Post,
  postAndMoreStoriesQuery,
  Settings,
  settingsQuery,
} from 'lib/sanity.queries'
// Preview functionality temporarily disabled in next-sanity v10

export default function PreviewPostPage(props: PostPageProps) {
  // Simplified preview that just uses static data
  return (
    <PostPage
      preview
      loading={false}
      post={props.post}
      morePosts={props.morePosts}
      settings={props.settings}
    />
  )
}
