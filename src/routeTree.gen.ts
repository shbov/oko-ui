/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DiffImport } from './routes/diff'
import { Route as IndexImport } from './routes/index'
import { Route as ResourcesAuthenticatedImport } from './routes/resources/_authenticated'
import { Route as AuthAuthImport } from './routes/auth/_auth'
import { Route as ResourcesAuthenticatedCreateImport } from './routes/resources/_authenticated.create'
import { Route as ResourcesResourceIdAuthenticatedImport } from './routes/resources/$resourceId/_authenticated'
import { Route as AuthAuthRestoreImport } from './routes/auth/_auth.restore'
import { Route as AuthAuthLoginImport } from './routes/auth/_auth.login'
import { Route as ResourcesResourceIdAuthenticatedEditImport } from './routes/resources/$resourceId/_authenticated.edit'

// Create Virtual Routes

const ResourcesImport = createFileRoute('/resources')()
const AuthImport = createFileRoute('/auth')()
const ResourcesResourceIdImport = createFileRoute('/resources/$resourceId')()

// Create/Update Routes

const ResourcesRoute = ResourcesImport.update({
  id: '/resources',
  path: '/resources',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const DiffRoute = DiffImport.update({
  id: '/diff',
  path: '/diff',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ResourcesResourceIdRoute = ResourcesResourceIdImport.update({
  id: '/$resourceId',
  path: '/$resourceId',
  getParentRoute: () => ResourcesRoute,
} as any)

const ResourcesAuthenticatedRoute = ResourcesAuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => ResourcesRoute,
} as any)

const AuthAuthRoute = AuthAuthImport.update({
  id: '/_auth',
  getParentRoute: () => AuthRoute,
} as any)

const ResourcesAuthenticatedCreateRoute =
  ResourcesAuthenticatedCreateImport.update({
    id: '/create',
    path: '/create',
    getParentRoute: () => ResourcesAuthenticatedRoute,
  } as any)

const ResourcesResourceIdAuthenticatedRoute =
  ResourcesResourceIdAuthenticatedImport.update({
    id: '/_authenticated',
    getParentRoute: () => ResourcesResourceIdRoute,
  } as any)

const AuthAuthRestoreRoute = AuthAuthRestoreImport.update({
  id: '/restore',
  path: '/restore',
  getParentRoute: () => AuthAuthRoute,
} as any)

const AuthAuthLoginRoute = AuthAuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthAuthRoute,
} as any)

const ResourcesResourceIdAuthenticatedEditRoute =
  ResourcesResourceIdAuthenticatedEditImport.update({
    id: '/edit',
    path: '/edit',
    getParentRoute: () => ResourcesResourceIdAuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/diff': {
      id: '/diff'
      path: '/diff'
      fullPath: '/diff'
      preLoaderRoute: typeof DiffImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/auth/_auth': {
      id: '/auth/_auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthAuthImport
      parentRoute: typeof AuthRoute
    }
    '/resources': {
      id: '/resources'
      path: '/resources'
      fullPath: '/resources'
      preLoaderRoute: typeof ResourcesImport
      parentRoute: typeof rootRoute
    }
    '/resources/_authenticated': {
      id: '/resources/_authenticated'
      path: '/resources'
      fullPath: '/resources'
      preLoaderRoute: typeof ResourcesAuthenticatedImport
      parentRoute: typeof ResourcesRoute
    }
    '/auth/_auth/login': {
      id: '/auth/_auth/login'
      path: '/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthAuthLoginImport
      parentRoute: typeof AuthAuthImport
    }
    '/auth/_auth/restore': {
      id: '/auth/_auth/restore'
      path: '/restore'
      fullPath: '/auth/restore'
      preLoaderRoute: typeof AuthAuthRestoreImport
      parentRoute: typeof AuthAuthImport
    }
    '/resources/$resourceId': {
      id: '/resources/$resourceId'
      path: '/$resourceId'
      fullPath: '/resources/$resourceId'
      preLoaderRoute: typeof ResourcesResourceIdImport
      parentRoute: typeof ResourcesImport
    }
    '/resources/$resourceId/_authenticated': {
      id: '/resources/$resourceId/_authenticated'
      path: '/$resourceId'
      fullPath: '/resources/$resourceId'
      preLoaderRoute: typeof ResourcesResourceIdAuthenticatedImport
      parentRoute: typeof ResourcesResourceIdRoute
    }
    '/resources/_authenticated/create': {
      id: '/resources/_authenticated/create'
      path: '/create'
      fullPath: '/resources/create'
      preLoaderRoute: typeof ResourcesAuthenticatedCreateImport
      parentRoute: typeof ResourcesAuthenticatedImport
    }
    '/resources/$resourceId/_authenticated/edit': {
      id: '/resources/$resourceId/_authenticated/edit'
      path: '/edit'
      fullPath: '/resources/$resourceId/edit'
      preLoaderRoute: typeof ResourcesResourceIdAuthenticatedEditImport
      parentRoute: typeof ResourcesResourceIdAuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthAuthRouteChildren {
  AuthAuthLoginRoute: typeof AuthAuthLoginRoute
  AuthAuthRestoreRoute: typeof AuthAuthRestoreRoute
}

const AuthAuthRouteChildren: AuthAuthRouteChildren = {
  AuthAuthLoginRoute: AuthAuthLoginRoute,
  AuthAuthRestoreRoute: AuthAuthRestoreRoute,
}

const AuthAuthRouteWithChildren = AuthAuthRoute._addFileChildren(
  AuthAuthRouteChildren,
)

interface AuthRouteChildren {
  AuthAuthRoute: typeof AuthAuthRouteWithChildren
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthAuthRoute: AuthAuthRouteWithChildren,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface ResourcesAuthenticatedRouteChildren {
  ResourcesAuthenticatedCreateRoute: typeof ResourcesAuthenticatedCreateRoute
}

const ResourcesAuthenticatedRouteChildren: ResourcesAuthenticatedRouteChildren =
  {
    ResourcesAuthenticatedCreateRoute: ResourcesAuthenticatedCreateRoute,
  }

const ResourcesAuthenticatedRouteWithChildren =
  ResourcesAuthenticatedRoute._addFileChildren(
    ResourcesAuthenticatedRouteChildren,
  )

interface ResourcesResourceIdAuthenticatedRouteChildren {
  ResourcesResourceIdAuthenticatedEditRoute: typeof ResourcesResourceIdAuthenticatedEditRoute
}

const ResourcesResourceIdAuthenticatedRouteChildren: ResourcesResourceIdAuthenticatedRouteChildren =
  {
    ResourcesResourceIdAuthenticatedEditRoute:
      ResourcesResourceIdAuthenticatedEditRoute,
  }

const ResourcesResourceIdAuthenticatedRouteWithChildren =
  ResourcesResourceIdAuthenticatedRoute._addFileChildren(
    ResourcesResourceIdAuthenticatedRouteChildren,
  )

interface ResourcesResourceIdRouteChildren {
  ResourcesResourceIdAuthenticatedRoute: typeof ResourcesResourceIdAuthenticatedRouteWithChildren
}

const ResourcesResourceIdRouteChildren: ResourcesResourceIdRouteChildren = {
  ResourcesResourceIdAuthenticatedRoute:
    ResourcesResourceIdAuthenticatedRouteWithChildren,
}

const ResourcesResourceIdRouteWithChildren =
  ResourcesResourceIdRoute._addFileChildren(ResourcesResourceIdRouteChildren)

interface ResourcesRouteChildren {
  ResourcesAuthenticatedRoute: typeof ResourcesAuthenticatedRouteWithChildren
  ResourcesResourceIdRoute: typeof ResourcesResourceIdRouteWithChildren
}

const ResourcesRouteChildren: ResourcesRouteChildren = {
  ResourcesAuthenticatedRoute: ResourcesAuthenticatedRouteWithChildren,
  ResourcesResourceIdRoute: ResourcesResourceIdRouteWithChildren,
}

const ResourcesRouteWithChildren = ResourcesRoute._addFileChildren(
  ResourcesRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/diff': typeof DiffRoute
  '/auth': typeof AuthAuthRouteWithChildren
  '/resources': typeof ResourcesAuthenticatedRouteWithChildren
  '/auth/login': typeof AuthAuthLoginRoute
  '/auth/restore': typeof AuthAuthRestoreRoute
  '/resources/$resourceId': typeof ResourcesResourceIdAuthenticatedRouteWithChildren
  '/resources/create': typeof ResourcesAuthenticatedCreateRoute
  '/resources/$resourceId/edit': typeof ResourcesResourceIdAuthenticatedEditRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/diff': typeof DiffRoute
  '/auth': typeof AuthAuthRouteWithChildren
  '/resources': typeof ResourcesAuthenticatedRouteWithChildren
  '/auth/login': typeof AuthAuthLoginRoute
  '/auth/restore': typeof AuthAuthRestoreRoute
  '/resources/$resourceId': typeof ResourcesResourceIdAuthenticatedRouteWithChildren
  '/resources/create': typeof ResourcesAuthenticatedCreateRoute
  '/resources/$resourceId/edit': typeof ResourcesResourceIdAuthenticatedEditRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/diff': typeof DiffRoute
  '/auth': typeof AuthRouteWithChildren
  '/auth/_auth': typeof AuthAuthRouteWithChildren
  '/resources': typeof ResourcesRouteWithChildren
  '/resources/_authenticated': typeof ResourcesAuthenticatedRouteWithChildren
  '/auth/_auth/login': typeof AuthAuthLoginRoute
  '/auth/_auth/restore': typeof AuthAuthRestoreRoute
  '/resources/$resourceId': typeof ResourcesResourceIdRouteWithChildren
  '/resources/$resourceId/_authenticated': typeof ResourcesResourceIdAuthenticatedRouteWithChildren
  '/resources/_authenticated/create': typeof ResourcesAuthenticatedCreateRoute
  '/resources/$resourceId/_authenticated/edit': typeof ResourcesResourceIdAuthenticatedEditRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/diff'
    | '/auth'
    | '/resources'
    | '/auth/login'
    | '/auth/restore'
    | '/resources/$resourceId'
    | '/resources/create'
    | '/resources/$resourceId/edit'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/diff'
    | '/auth'
    | '/resources'
    | '/auth/login'
    | '/auth/restore'
    | '/resources/$resourceId'
    | '/resources/create'
    | '/resources/$resourceId/edit'
  id:
    | '__root__'
    | '/'
    | '/diff'
    | '/auth'
    | '/auth/_auth'
    | '/resources'
    | '/resources/_authenticated'
    | '/auth/_auth/login'
    | '/auth/_auth/restore'
    | '/resources/$resourceId'
    | '/resources/$resourceId/_authenticated'
    | '/resources/_authenticated/create'
    | '/resources/$resourceId/_authenticated/edit'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DiffRoute: typeof DiffRoute
  AuthRoute: typeof AuthRouteWithChildren
  ResourcesRoute: typeof ResourcesRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DiffRoute: DiffRoute,
  AuthRoute: AuthRouteWithChildren,
  ResourcesRoute: ResourcesRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/diff",
        "/auth",
        "/resources"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/diff": {
      "filePath": "diff.tsx"
    },
    "/auth": {
      "filePath": "auth",
      "children": [
        "/auth/_auth"
      ]
    },
    "/auth/_auth": {
      "filePath": "auth/_auth.tsx",
      "parent": "/auth",
      "children": [
        "/auth/_auth/login",
        "/auth/_auth/restore"
      ]
    },
    "/resources": {
      "filePath": "resources",
      "children": [
        "/resources/_authenticated",
        "/resources/$resourceId"
      ]
    },
    "/resources/_authenticated": {
      "filePath": "resources/_authenticated.tsx",
      "parent": "/resources",
      "children": [
        "/resources/_authenticated/create"
      ]
    },
    "/auth/_auth/login": {
      "filePath": "auth/_auth.login.tsx",
      "parent": "/auth/_auth"
    },
    "/auth/_auth/restore": {
      "filePath": "auth/_auth.restore.tsx",
      "parent": "/auth/_auth"
    },
    "/resources/$resourceId": {
      "filePath": "resources/$resourceId",
      "parent": "/resources",
      "children": [
        "/resources/$resourceId/_authenticated"
      ]
    },
    "/resources/$resourceId/_authenticated": {
      "filePath": "resources/$resourceId/_authenticated.tsx",
      "parent": "/resources/$resourceId",
      "children": [
        "/resources/$resourceId/_authenticated/edit"
      ]
    },
    "/resources/_authenticated/create": {
      "filePath": "resources/_authenticated.create.tsx",
      "parent": "/resources/_authenticated"
    },
    "/resources/$resourceId/_authenticated/edit": {
      "filePath": "resources/$resourceId/_authenticated.edit.tsx",
      "parent": "/resources/$resourceId/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
