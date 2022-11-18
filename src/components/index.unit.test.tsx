import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('unit', () => {
  it('works', () => {
    render(<div>unit</div>)

    expect(screen.getByText('unit')).toBeInTheDocument()
  })
})
