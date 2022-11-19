import { describe, it, expect, beforeEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'

import { Header } from '.'

describe.todo('fix this tests', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render component', () => {
    const { container } = render(<Header />)
    expect(container).toBeInTheDocument()
  })

  it('should render component with 3 links', () => {
    const { container } = render(<Header />)
    const links = container.querySelectorAll('a')

    expect(links).toHaveLength(3)
    expect(links[0].textContent).toBe('Characters')
    expect(links[1].textContent).toBe('Locations')
    expect(links[2].textContent).toBe('Episodes')
  })
})
