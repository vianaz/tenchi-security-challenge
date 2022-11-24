import { Meta, StoryObj } from '@storybook/react'

import { DetailInfoContainer } from '.'

export default {
  title: 'Components/DetailInfoContainer',
  component: DetailInfoContainer
} as Meta

export const Default: StoryObj = {
  args: {
    name: 'Rick Sanchez',
    text1: 'Earth (C-137)',
    image1: '/origin.svg',
    text2: 'Citadel of Ricks',
    iamge2: '/lastLocation.svg',
    lazyLoad: false
  }
}

export const Loading: StoryObj = {
  args: {
    lazyLoad: true
  }
}
