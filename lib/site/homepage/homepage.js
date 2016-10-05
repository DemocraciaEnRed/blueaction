import bus from 'bus'
import page from 'page'
import dom from 'component-dom'
import user from '../../user/user'
import visibility from '../../visibility/visibility'
import forumRouter from '../../forum-router/forum-router'
import {loadCurrentForum} from '../../forum/forum'
import {
  findTopics,
  clearTopicStore
} from '../../middlewares/topic-middlewares/topic-middlewares'
import topicFilter from '../topic-filter/topic-filter'
import HomeView from './view'

page(forumRouter('/'),
  init,
  clearTopicStore,
  user.optional,
  visibility,
  loadCurrentForum,
  findTopics,
  render
)

page.exit(forumRouter('/'), exit)

function init (ctx, next) {
  document.body.classList.add('newsfeed')
  ctx.content = document.querySelector('#content')
  dom(ctx.content).empty()
  next()
}

function render (ctx) {
  ctx.view = new HomeView({
    container: ctx.content,
    locals: {
      forum: ctx.forum,
      topics: topicFilter.filter(ctx.topics)
    }
  })
}

function exit (ctx, next) {
  dom(ctx.content).empty()
  document.body.classList.remove('newsfeed')
  next()
}
