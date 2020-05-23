
const routes = [
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Map.vue') },
      { path: 'leaderboard', component: () => import('pages/Leaderboard.vue') },
      { path: 'redeem', component: () => import('pages/Redeem.vue') },
      { path: 'info', component: () => import('pages/Info.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
