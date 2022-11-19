import { Meta, StoryObj } from '@storybook/react'

import { CharacterContainer } from '.'

export default {
  title: 'Components/CharacterContainer',
  component: CharacterContainer
} as Meta

export const Alive: StoryObj = {
  args: {
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    aliveStatus: 'Alive',
    specie: 'Human',
    origin: 'Earth (C-137)',
    episode: 'Pilot',
    lazyLoad: false
  }
}

export const Dead: StoryObj = {
  args: {
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    aliveStatus: 'Dead',
    specie: 'Human',
    origin: 'Earth (C-137)',
    episode: 'Pilot',
    lazyLoad: false
  }
}

export const Unknown: StoryObj = {
  args: {
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    aliveStatus: 'Unknown',
    specie: 'Human',
    origin: 'Earth (C-137)',
    episode: 'Pilot',
    lazyLoad: false
  }
}

export const Loading: StoryObj = {
  args: {
    lazyLoad: true
  }
}
