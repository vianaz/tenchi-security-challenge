import { describe, it, expect, beforeEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'

import { Header } from '.'

describe('Test Header Component', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render component', () => {
    const headerInfos = [
      {
        text: 'Characters',
        url: '/'
      },
      {
        text: 'Locations',
        url: '/locations'
      }
    ]

    const { container } = render(
      <Header
        headerInfos={headerInfos}
        router='/'
      />
    )
    expect(container).toBeInTheDocument()
  })

  it('should render component with 3 links', () => {
    const headerInfos = [
      {
        text: 'Characters',
        url: '/'
      },
      {
        text: 'Locations',
        url: '/locations'
      },
      {
        text: 'Episodes',
        url: '/episodes'
      }
    ]

    const { container } = render(
      <Header
        headerInfos={headerInfos}
        router='/'
      />
    )
    const links = container.querySelectorAll('a')

    expect(links).toHaveLength(3)
    expect(links[0].textContent).toBe('Characters')
    expect(links[1].textContent).toBe('Locations')
    expect(links[2].textContent).toBe('Episodes')
  })
})
