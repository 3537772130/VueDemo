
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/auth/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          success: true,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        success: true,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/auth/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        success: true,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/auth/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        success: true,
        data: 'success'
      }
    }
  },

  // user menu
  {
    url: '/auth/menu',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        success: true,
        data: [
          {
            path: '/permission',
            component: 'layout/Layout',
            redirect: '/permission/index',
            alwaysShow: true,
            name: 'Permission',
            meta: {
              title: 'Permission',
              icon: 'lock',
              roles: ['admin', 'editor']
            },
            children: [
              {
                path: 'page',
                component: 'views/permission/page',
                name: 'PagePermission',
                meta: {
                  title: 'Page Permission',
                  roles: ['admin']
                }
              },
              {
                path: 'directive',
                component: 'views/permission/directive',
                name: 'DirectivePermission',
                meta: {
                  title: 'Directive Permission'
                }
              },
              {
                path: 'role',
                component: 'views/permission/role',
                name: 'RolePermission',
                meta: {
                  title: 'Role Permission',
                  roles: ['admin']
                }
              }
            ]
          },
          {
            path: '/icon',
            component: 'layout/Layout',
            name: 'Icons',
            icon: 'icon'
          }
        ]

      }
    }
  }
]
