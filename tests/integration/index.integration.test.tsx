import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('unit', () => {
  it('works', () => {
    render(<div>integration</div>)

    expect(screen.getByText('integration')).toBeInTheDocument()
  })
})
