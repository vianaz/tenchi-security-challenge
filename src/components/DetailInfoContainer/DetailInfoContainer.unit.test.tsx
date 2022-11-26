import { beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, RenderResult } from '@testing-library/react'
import { DetailInfoContainer, DetailInfoContainerProps } from '.'

const makeSut = (props: DetailInfoContainerProps): RenderResult => {
  return render(<DetailInfoContainer {...props} />)
}

describe('CharacterInfoContainer', () => {
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
    const { container } = makeSut({
      name: '',
      text1: '',
      image1: '',
      text2: '',
      image2: '',
      lazyLoad: false
    })

    expect(container).toBeInTheDocument()
  })

  it('should render the component with correct values', () => {
    const { getByText } = makeSut({
      name: 'Rick Sanchez',
      text1: 'Earth (C-137)',
      text2: 'Citadel of Ricks',
      image1: '',
      image2: '',
      lazyLoad: false
    })

    expect(getByText('Rick Sanchez')).toBeInTheDocument()
    expect(getByText('Earth (C-137)')).toBeInTheDocument()
    expect(getByText('Citadel of Ricks')).toBeInTheDocument()
  })

  it('should render in lazy load mode', () => {
    const { queryByText, container } = makeSut({
      name: 'Rick Sanchez',
      text1: 'Earth (C-137)',
      text2: 'Citadel of Ricks',
      image1: '',
      image2: '',
      lazyLoad: true
    })

    expect(queryByText('Rick Sanchez')).toBeNull()
    expect(queryByText('Earth (C-137)')).toBeNull()
    expect(queryByText('Citadel of Ricks')).toBeNull()
    expect(container.getElementsByClassName('lazy').length).toBe(3)
  })
})
