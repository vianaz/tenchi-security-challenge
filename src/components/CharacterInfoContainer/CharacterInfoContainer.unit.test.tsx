import { beforeEach, describe, expect, it } from 'vitest'

import { cleanup, render, RenderResult } from '@testing-library/react'
import { CharacterInfoContainer, CharacterInfoContainerProps } from '.'

const makeSut = (props: CharacterInfoContainerProps): RenderResult => {
  return render(<CharacterInfoContainer {...props} />)
}

describe('CharacterInfoContainer', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render the component', () => {
    const { container } = makeSut({
      name: '',
      origin: '',
      location: '',
      lazyLoad: false
    })

    expect(container).toBeInTheDocument()
  })

  it('should render the component with correct values', () => {
    const { getByText } = makeSut({
      name: 'Rick Sanchez',
      origin: 'Earth (C-137)',
      location: 'Citadel of Ricks',
      lazyLoad: false
    })

    expect(getByText('Rick Sanchez')).toBeInTheDocument()
    expect(getByText('Earth (C-137)')).toBeInTheDocument()
    expect(getByText('Citadel of Ricks')).toBeInTheDocument()
  })

  it('should render in lazy load mode', () => {
    const { queryByText, container } = makeSut({
      name: 'Rick Sanchez',
      origin: 'Earth (C-137)',
      location: 'Citadel of Ricks',
      lazyLoad: true
    })

    expect(queryByText('Rick Sanchez')).toBeNull()
    expect(queryByText('Earth (C-137)')).toBeNull()
    expect(queryByText('Citadel of Ricks')).toBeNull()
    expect(container.getElementsByClassName('lazy').length).toBe(3)
  })
})
