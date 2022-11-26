import { describe, it, expect, beforeEach, vi } from 'vitest'
import { cleanup, render, RenderResult } from '@testing-library/react'

import { CharacterContainer } from '.'

const makeSut = (lazyLoad: boolean): RenderResult => {
  const props = {
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    aliveStatus: 'Alive',
    specie: 'Human',
    origin: 'Earth (C-137)',
    episode: 'Pilot',
    lazyLoad
  }

  return render(<CharacterContainer {...props} />)
}

describe('CharacterContainer', () => {
  beforeEach(() => {
    cleanup()
  })

  vi.mock('next/image', () => {
    return {
      __esModule: true,
      default: () => <div>Mocked Image</div>
    }
  })

  it('should render the component', () => {
    const { container } = makeSut(false)

    expect(container).toBeInTheDocument()
  })

  it('should render the component with correct values', () => {
    const { getByText } = makeSut(false)

    expect(getByText('Rick Sanchez')).toBeInTheDocument()
    expect(getByText('Alive - Human')).toBeInTheDocument()
    expect(getByText('Earth (C-137)')).toBeInTheDocument()
    expect(getByText('Pilot')).toBeInTheDocument()
  })

  it('should render the component with loading state', () => {
    const { queryByText, container } = makeSut(true)

    expect(queryByText('Rick Sanchez')).toBeNull()
    expect(queryByText('Alive - Human')).toBeNull()
    expect(queryByText('Earth (C-137)')).toBeNull()
    expect(queryByText('Pilot')).toBeNull()
    expect(container.getElementsByClassName('lazy').length).toBe(5)
  })
})
