import { describe, it, expect, beforeEach } from 'vitest'
import { cleanup, render, RenderResult } from '@testing-library/react'

import { CharacterContainer } from '.'

const makeSut = (): RenderResult => {
  const props = {
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    aliveStatus: 'Alive',
    specie: 'Human',
    origin: 'Earth (C-137)',
    episode: 'Pilot'
  }

  return render(<CharacterContainer {...props} />)
}

describe('CharacterContainer', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render the component', () => {
    const { container } = makeSut()

    expect(container).toBeInTheDocument()
  })

  it('should render the component with correct values', () => {
    const { getByText } = makeSut()

    expect(getByText('Rick Sanchez')).toBeInTheDocument()
    expect(getByText('Alive - Human')).toBeInTheDocument()
    expect(getByText('Earth (C-137)')).toBeInTheDocument()
    expect(getByText('Pilot')).toBeInTheDocument()
  })
})
