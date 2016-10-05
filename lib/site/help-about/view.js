import marked from 'marked'
import md from './content.md'
import template from './template.jade'
import View from '../../view/view'

export default class HelpView extends View {
  constructor () {
    super(template, { md: marked(md) })
  }
}
