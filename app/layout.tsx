import './globals.scss'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  )
}
