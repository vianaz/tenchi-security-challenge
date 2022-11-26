import { describe, it, expect, beforeEach, vi } from 'vitest'
import { cleanup, render, RenderResult } from '@testing-library/react'

import { GridContainer, GridContainerProps } from '.'

const makeSut = (props: GridContainerProps): RenderResult => {
  return render(<GridContainer {...props} />)
}

describe('GridContainer', () => {
  beforeEach(() => {
    cleanup()
  })

  vi.mock('next/image', () => {
    return {
      __esModule: true,
      default: () => <div>Mocked Image</div>
    }
  })
  vi.mock('next/link', () => {
    return {
      __esModule: true,
      default: ({
        children,
        href
      }: {
        children: JSX.Element
        href: string
      }) => <a href={href}>{children}</a>
    }
  })
  vi.mock('./styles.module.scss', () => {
    return {
      __esModule: true,
      default: {
        container: 'container'
      }
    }
  })

  it('should render the component', () => {
    const { container } = makeSut({
      id: '1',
      name: 'Rick Sanchez',
      lazyLoad: false,
      type: 'locations'
    })

    expect(container).toBeInTheDocument()
  })

  it('should render the component with correct values', () => {
    const { getByText, container } = makeSut({
      id: '1',
      name: 'Rick Sanchez',
      lazyLoad: false,
      type: 'locations'
    })

    expect(getByText('Rick Sanchez')).toBeInTheDocument()
    expect(getByText('Mocked Image')).toBeInTheDocument()
    expect(container.getElementsByTagName('a')[0]).toHaveAttribute(
      'href',
      '/locations/1'
    )
  })
})
