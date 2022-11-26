import { Meta, StoryObj } from '@storybook/react'

import { GridContainer } from '.'

export default {
  title: 'Components/GridContainer',
  component: GridContainer
} as Meta

export const Default: StoryObj = {
  args: {
    id: 1,
    name: 'Earth (C-137)',
    lazyLoad: false,
    type: 'locations'
  }
}

export const Loading: StoryObj = {
  args: {
    id: 1,
    name: 'Earth (C-137)',
    lazyLoad: true,
    type: 'locations'
  }
}
