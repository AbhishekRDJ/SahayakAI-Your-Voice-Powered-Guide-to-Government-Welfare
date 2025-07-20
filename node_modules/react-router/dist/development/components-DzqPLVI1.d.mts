import { R as Router$1, I as InitialEntry, T as To, a as RelativeRoutingType, N as NonIndexRouteObject, L as LazyRouteFunction, b as IndexRouteObject, c as Location, A as Action, d as Navigator, e as RouterInit, F as FutureConfig, H as HydrationState, D as DataStrategyFunction, P as PatchRoutesOnNavigationFunction, f as RouteObject, g as RouteMatch, h as Params, U as UIMatch } from './route-data-DjzmHYNR.mjs';
import * as React from 'react';

/**
 * @private
 */
declare function mapRouteProperties(route: RouteObject): Partial<RouteObject> & {
    hasErrorBoundary: boolean;
};
declare const hydrationRouteProperties: (keyof RouteObject)[];
interface MemoryRouterOpts {
    /**
     * Basename path for the application.
     */
    basename?: string;
    /**
     * Function to provide the initial context values for all client side navigations/fetches
     */
    unstable_getContext?: RouterInit["unstable_getContext"];
    /**
     * Future flags to enable for the router.
     */
    future?: Partial<FutureConfig>;
    /**
     * Hydration data to initialize the router with if you have already performed
     * data loading on the server.
     */
    hydrationData?: HydrationState;
    /**
     * Initial entires in the in-memory history stack
     */
    initialEntries?: InitialEntry[];
    /**
     * Index of `initialEntries` the application should initialize to
     */
    initialIndex?: number;
    /**
     * Override the default data strategy of loading in parallel.
     * Only intended for advanced usage.
     */
    dataStrategy?: DataStrategyFunction;
    /**
     * Lazily define portions of the route tree on navigations.
     */
    patchRoutesOnNavigation?: PatchRoutesOnNavigationFunction;
}
/**
 * Create a new data router that manages the application path using an in-memory
 * history stack.  Useful for non-browser environments without a DOM API.
 *
 * @category Data Routers
 */
declare function createMemoryRouter(
/**
 * Application routes
 */
routes: RouteObject[], 
/**
 * Router options
 */
opts?: MemoryRouterOpts): Router$1;
interface RouterProviderProps {
    router: Router$1;
    flushSync?: (fn: () => unknown) => undefined;
}
/**
 * Given a Remix Router instance, render the appropriate UI
 */
declare function RouterProvider({ router, flushSync: reactDomFlushSyncImpl, }: RouterProviderProps): React.ReactElement;
/**
 * @category Types
 */
interface MemoryRouterProps {
    basename?: string;
    children?: React.ReactNode;
    initialEntries?: InitialEntry[];
    initialIndex?: number;
}
/**
 * A `<Router>` that stores all entries in memory.
 *
 * @category Component Routers
 */
declare function MemoryRouter({ basename, children, initialEntries, initialIndex, }: MemoryRouterProps): React.ReactElement;
/**
 * @category Types
 */
interface NavigateProps {
    to: To;
    replace?: boolean;
    state?: any;
    relative?: RelativeRoutingType;
}
/**
 * A component-based version of {@link useNavigate} to use in a [`React.Component
 * Class`](https://reactjs.org/docs/react-component.html) where hooks are not
 * able to be used.
 *
 * It's recommended to avoid using this component in favor of {@link useNavigate}
 *
 * @category Components
 */
declare function Navigate({ to, replace, state, relative, }: NavigateProps): null;
/**
 * @category Types
 */
interface OutletProps {
    /**
      Provides a context value to the element tree below the outlet. Use when the parent route needs to provide values to child routes.
  
      ```tsx
      <Outlet context={myContextValue} />
      ```
  
      Access the context with {@link useOutletContext}.
     */
    context?: unknown;
}
/**
  Renders the matching child route of a parent route or nothing if no child route matches.

  ```tsx
  import { Outlet } from "react-router"

  export default function SomeParent() {
    return (
      <div>
        <h1>Parent Content</h1>
        <Outlet />
      </div>
    );
  }
  ```

  @category Components
 */
declare function Outlet(props: OutletProps): React.ReactElement | null;
/**
 * @category Types
 */
interface PathRouteProps {
    caseSensitive?: NonIndexRouteObject["caseSensitive"];
    path?: NonIndexRouteObject["path"];
    id?: NonIndexRouteObject["id"];
    lazy?: LazyRouteFunction<NonIndexRouteObject>;
    loader?: NonIndexRouteObject["loader"];
    action?: NonIndexRouteObject["action"];
    hasErrorBoundary?: NonIndexRouteObject["hasErrorBoundary"];
    shouldRevalidate?: NonIndexRouteObject["shouldRevalidate"];
    handle?: NonIndexRouteObject["handle"];
    index?: false;
    children?: React.ReactNode;
    element?: React.ReactNode | null;
    hydrateFallbackElement?: React.ReactNode | null;
    errorElement?: React.ReactNode | null;
    Component?: React.ComponentType | null;
    HydrateFallback?: React.ComponentType | null;
    ErrorBoundary?: React.ComponentType | null;
}
/**
 * @category Types
 */
interface LayoutRouteProps extends PathRouteProps {
}
/**
 * @category Types
 */
interface IndexRouteProps {
    caseSensitive?: IndexRouteObject["caseSensitive"];
    path?: IndexRouteObject["path"];
    id?: IndexRouteObject["id"];
    lazy?: LazyRouteFunction<IndexRouteObject>;
    loader?: IndexRouteObject["loader"];
    action?: IndexRouteObject["action"];
    hasErrorBoundary?: IndexRouteObject["hasErrorBoundary"];
    shouldRevalidate?: IndexRouteObject["shouldRevalidate"];
    handle?: IndexRouteObject["handle"];
    index: true;
    children?: undefined;
    element?: React.ReactNode | null;
    hydrateFallbackElement?: React.ReactNode | null;
    errorElement?: React.ReactNode | null;
    Component?: React.ComponentType | null;
    HydrateFallback?: React.ComponentType | null;
    ErrorBoundary?: React.ComponentType | null;
}
type RouteProps = PathRouteProps | LayoutRouteProps | IndexRouteProps;
/**
 * Configures an element to render when a pattern matches the current location.
 * It must be rendered within a {@link Routes} element. Note that these routes
 * do not participate in data loading, actions, code splitting, or any other
 * route module features.
 *
 * @category Components
 */
declare function Route(_props: RouteProps): React.ReactElement | null;
/**
 * @category Types
 */
interface RouterProps {
    basename?: string;
    children?: React.ReactNode;
    location: Partial<Location> | string;
    navigationType?: Action;
    navigator: Navigator;
    static?: boolean;
}
/**
 * Provides location context for the rest of the app.
 *
 * Note: You usually won't render a `<Router>` directly. Instead, you'll render a
 * router that is more specific to your environment such as a `<BrowserRouter>`
 * in web browsers or a `<StaticRouter>` for server rendering.
 *
 * @category Components
 */
declare function Router({ basename: basenameProp, children, location: locationProp, navigationType, navigator, static: staticProp, }: RouterProps): React.ReactElement | null;
/**
 * @category Types
 */
interface RoutesProps {
    /**
     * Nested {@link Route} elements
     */
    children?: React.ReactNode;
    /**
     * The location to match against. Defaults to the current location.
     */
    location?: Partial<Location> | string;
}
/**
 Renders a branch of {@link Route | `<Routes>`} that best matches the current
 location. Note that these routes do not participate in data loading, actions,
 code splitting, or any other route module features.

 ```tsx
 import { Routes, Route } from "react-router"

<Routes>
  <Route index element={<StepOne />} />
  <Route path="step-2" element={<StepTwo />} />
  <Route path="step-3" element={<StepThree />}>
</Routes>
 ```

 @category Components
 */
declare function Routes({ children, location, }: RoutesProps): React.ReactElement | null;
interface AwaitResolveRenderFunction<Resolve = any> {
    (data: Awaited<Resolve>): React.ReactNode;
}
/**
 * @category Types
 */
interface AwaitProps<Resolve> {
    /**
    When using a function, the resolved value is provided as the parameter.
  
    ```tsx [2]
    <Await resolve={reviewsPromise}>
      {(resolvedReviews) => <Reviews items={resolvedReviews} />}
    </Await>
    ```
  
    When using React elements, {@link useAsyncValue} will provide the
    resolved value:
  
    ```tsx [2]
    <Await resolve={reviewsPromise}>
      <Reviews />
    </Await>
  
    function Reviews() {
      const resolvedReviews = useAsyncValue()
      return <div>...</div>
    }
    ```
    */
    children: React.ReactNode | AwaitResolveRenderFunction<Resolve>;
    /**
    The error element renders instead of the children when the promise rejects.
  
    ```tsx
    <Await
      errorElement={<div>Oops</div>}
      resolve={reviewsPromise}
    >
      <Reviews />
    </Await>
    ```
  
    To provide a more contextual error, you can use the {@link useAsyncError} in a
    child component
  
    ```tsx
    <Await
      errorElement={<ReviewsError />}
      resolve={reviewsPromise}
    >
      <Reviews />
    </Await>
  
    function ReviewsError() {
      const error = useAsyncError()
      return <div>Error loading reviews: {error.message}</div>
    }
    ```
  
    If you do not provide an errorElement, the rejected value will bubble up to
    the nearest route-level {@link NonIndexRouteObject#ErrorBoundary | ErrorBoundary} and be accessible
    via {@link useRouteError} hook.
    */
    errorElement?: React.ReactNode;
    /**
    Takes a promise returned from a {@link LoaderFunction | loader} value to be resolved and rendered.
  
    ```jsx
    import { useLoaderData, Await } from "react-router"
  
    export async function loader() {
      let reviews = getReviews() // not awaited
      let book = await getBook()
      return {
        book,
        reviews, // this is a promise
      }
    }
  
    export default function Book() {
      const {
        book,
        reviews, // this is the same promise
      } = useLoaderData()
  
      return (
        <div>
          <h1>{book.title}</h1>
          <p>{book.description}</p>
          <React.Suspense fallback={<ReviewsSkeleton />}>
            <Await
              // and is the promise we pass to Await
              resolve={reviews}
            >
              <Reviews />
            </Await>
          </React.Suspense>
        </div>
      );
    }
    ```
     */
    resolve: Resolve;
}
/**
Used to render promise values with automatic error handling.

```tsx
import { Await, useLoaderData } from "react-router";

export function loader() {
  // not awaited
  const reviews = getReviews()
  // awaited (blocks the transition)
  const book = await fetch("/api/book").then((res) => res.json())
  return { book, reviews }
}

function Book() {
  const { book, reviews } = useLoaderData();
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <React.Suspense fallback={<ReviewsSkeleton />}>
        <Await
          resolve={reviews}
          errorElement={
            <div>Could not load reviews 😬</div>
          }
          children={(resolvedReviews) => (
            <Reviews items={resolvedReviews} />
          )}
        />
      </React.Suspense>
    </div>
  );
}
```

**Note:** `<Await>` expects to be rendered inside of a `<React.Suspense>`

@category Components

*/
declare function Await<Resolve>({ children, errorElement, resolve, }: AwaitProps<Resolve>): React.JSX.Element;
/**
 * Creates a route config from a React "children" object, which is usually
 * either a `<Route>` element or an array of them. Used internally by
 * `<Routes>` to create a route config from its children.
 *
 * @category Utils
 */
declare function createRoutesFromChildren(children: React.ReactNode, parentPath?: number[]): RouteObject[];
/**
 * Create route objects from JSX elements instead of arrays of objects
 */
declare let createRoutesFromElements: typeof createRoutesFromChildren;
/**
 * Renders the result of `matchRoutes()` into a React element.
 *
 * @category Utils
 */
declare function renderMatches(matches: RouteMatch[] | null): React.ReactElement | null;
declare function useRouteComponentProps(): {
    params: Readonly<Params<string>>;
    loaderData: any;
    actionData: any;
    matches: UIMatch<unknown, unknown>[];
};
type RouteComponentProps = ReturnType<typeof useRouteComponentProps>;
type RouteComponentType = React.ComponentType<RouteComponentProps>;
declare function WithComponentProps({ children, }: {
    children: React.ReactElement;
}): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
declare function withComponentProps(Component: RouteComponentType): () => React.ReactElement<{
    params: Readonly<Params<string>>;
    loaderData: any;
    actionData: any;
    matches: UIMatch<unknown, unknown>[];
}, string | React.JSXElementConstructor<any>>;
declare function useHydrateFallbackProps(): {
    params: Readonly<Params<string>>;
    loaderData: any;
    actionData: any;
};
type HydrateFallbackProps = ReturnType<typeof useHydrateFallbackProps>;
type HydrateFallbackType = React.ComponentType<HydrateFallbackProps>;
declare function WithHydrateFallbackProps({ children, }: {
    children: React.ReactElement;
}): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
declare function withHydrateFallbackProps(HydrateFallback: HydrateFallbackType): () => React.ReactElement<{
    params: Readonly<Params<string>>;
    loaderData: any;
    actionData: any;
}, string | React.JSXElementConstructor<any>>;
declare function useErrorBoundaryProps(): {
    params: Readonly<Params<string>>;
    loaderData: any;
    actionData: any;
    error: unknown;
};
type ErrorBoundaryProps = ReturnType<typeof useErrorBoundaryProps>;
type ErrorBoundaryType = React.ComponentType<ErrorBoundaryProps>;
declare function WithErrorBoundaryProps({ children, }: {
    children: React.ReactElement;
}): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
declare function withErrorBoundaryProps(ErrorBoundary: ErrorBoundaryType): () => React.ReactElement<{
    params: Readonly<Params<string>>;
    loaderData: any;
    actionData: any;
    error: unknown;
}, string | React.JSXElementConstructor<any>>;

export { type AwaitProps as A, type ErrorBoundaryType as E, type HydrateFallbackType as H, type IndexRouteProps as I, type LayoutRouteProps as L, type MemoryRouterOpts as M, type NavigateProps as N, type OutletProps as O, type PathRouteProps as P, type RouterProviderProps as R, WithComponentProps as W, type RouteComponentType as a, type MemoryRouterProps as b, type RouteProps as c, type RouterProps as d, type RoutesProps as e, Await as f, MemoryRouter as g, Navigate as h, Outlet as i, Route as j, Router as k, RouterProvider as l, Routes as m, createMemoryRouter as n, createRoutesFromChildren as o, createRoutesFromElements as p, hydrationRouteProperties as q, renderMatches as r, mapRouteProperties as s, WithHydrateFallbackProps as t, withHydrateFallbackProps as u, WithErrorBoundaryProps as v, withComponentProps as w, withErrorBoundaryProps as x };
