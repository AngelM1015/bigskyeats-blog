import { Iframe } from 'sanity-plugin-iframe-pane'
import type { DefaultDocumentNodeResolver } from 'sanity/desk'

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  if (schemaType === 'post') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: async (doc) =>
            `${
              process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'
            }/api/preview?slug=${doc?.slug?.current ?? ''}`,

          defaultSize: 'desktop',
          reload: {
            button: true,
          },
          attributes: {
            allow: 'fullscreen',
          },
        })
        .title('Preview'),
    ])
  }

  return S.document().views([S.view.form()])
}
