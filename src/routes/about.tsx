import { AboutPage } from '@/components/about-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
  <>
    <div className="p-2">Hello from About!</div>
    <AboutPage>
    </AboutPage>
  </>
  )
}