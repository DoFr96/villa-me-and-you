import './styles.css'
import {
  Inter,
  Manrope,
  Work_Sans,
  Montserrat,
  Playfair_Display,
  Cormorant_Garamond,
} from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' })
const workSans = Work_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-worksans' })
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cormorant',
})

export const metadata = {
  description: 'Villa Me and You - Luksuzni odmor u Hrvatskoj',
  title: 'Villa Me and You',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html
      lang="hr"
      className={`${inter.variable} ${manrope.variable} ${workSans.variable} ${montserrat.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
