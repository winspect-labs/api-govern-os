import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import themeConfig from '../theme.config'
import { ThemeHead } from './ThemeHead'
import './globals.css'

export const metadata = {
  title: themeConfig.branding?.productName ?? 'Product OS',
  description:
    'An opinionated framework for product management of modern tech products. Agent-friendly structure, single source of truth.',
}

const navbar = (
  <Navbar
    logo={themeConfig.logo}
    projectLink={themeConfig.project?.link}
  />
)

const footer = (
  <Footer>
    <div className="flex flex-col gap-1">
      <span>{themeConfig.footer?.text || `${themeConfig.branding?.productName ?? 'Product OS'} © ${new Date().getFullYear()}`}</span>
      {themeConfig.footer?.subscript && (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {themeConfig.footer.subscript}
        </span>
      )}
    </div>
  </Footer>
)

const search = themeConfig.search?.placeholder ? (
  <Search placeholder={themeConfig.search.placeholder} />
) : (
  <Search />
)

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <ThemeHead />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase={themeConfig.docsRepositoryBase}
          footer={footer}
          search={search}
          editLink={themeConfig.editLink?.text ? themeConfig.editLink.text : 'Edit this page on GitHub →'}
          sidebar={themeConfig.sidebar}
          toc={themeConfig.toc}
          navigation={themeConfig.navigation}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
