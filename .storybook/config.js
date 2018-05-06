import { configure } from '@storybook/react'

const req = require.context('../', true, /__stories__\/(.*)\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
  require('../stories/index.js');
}

configure(loadStories, module)
