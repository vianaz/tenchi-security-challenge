import { Meta, StoryObj } from '@storybook/react'

import { CharacterInfoContainer } from '.'

export default {
  title: 'Components/CharacterInfoContainer',
  component: CharacterInfoContainer
} as Meta

export const Default: StoryObj = {
  args: {
    name: 'Rick Sanchez',
    origin: 'Earth (C-137)',
    location: 'Citadel of Ricks',
    lazyLoad: false
  }
}

export const Loading: StoryObj = {
  args: {
    lazyLoad: true
  }
}
