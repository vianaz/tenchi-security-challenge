import { describe, it, expect, beforeEach } from 'vitest'
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
    const { queryByText } = makeSut(true)

    expect(queryByText('Rick Sanchez')).not.toBeInTheDocument()
    expect(queryByText('Alive - Human')).not.toBeInTheDocument()
    expect(queryByText('Earth (C-137)')).not.toBeInTheDocument()
    expect(queryByText('Pilot')).not.toBeInTheDocument()
  })
})
