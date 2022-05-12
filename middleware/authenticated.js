export default function ({ $auth, route, redirect }) {
  if (!$auth.loggedIn && !route.path.match(/\/auth\//)) {
    return redirect('/auth/login')
  }

  if ($auth.loggedIn && route.path.match(/\/auth\//)) {
    return redirect('/')
  }
}
