import { AsyncLocalStorage } from 'node:async_hooks';
import * as React from 'react';
import { u as unstable_RouterContextProvider, i as ActionFunction, C as ClientActionFunction, j as ClientLoaderFunction, k as HeadersFunction, l as LinksFunction, m as LoaderFunction, M as MetaFunction, S as ShouldRevalidateFunction, c as Location, h as Params } from './route-data-DjzmHYNR.mjs';

type ServerContext = {
    redirect?: Response;
};
declare global {
    var ___reactRouterServerStorage___: AsyncLocalStorage<ServerContext> | undefined;
}
type RSCRouteConfigEntryBase = {
    action?: ActionFunction;
    clientAction?: ClientActionFunction;
    clientLoader?: ClientLoaderFunction;
    ErrorBoundary?: React.ComponentType<any>;
    handle?: any;
    headers?: HeadersFunction;
    HydrateFallback?: React.ComponentType<any>;
    Layout?: React.ComponentType<any>;
    links?: LinksFunction;
    loader?: LoaderFunction;
    meta?: MetaFunction;
    shouldRevalidate?: ShouldRevalidateFunction;
};
type RSCRouteConfigEntry = RSCRouteConfigEntryBase & {
    id: string;
    path?: string;
    Component?: React.ComponentType<any>;
    lazy?: () => Promise<RSCRouteConfigEntryBase & ({
        default?: React.ComponentType<any>;
        Component?: never;
    } | {
        default?: never;
        Component?: React.ComponentType<any>;
    })>;
} & ({
    index: true;
} | {
    children?: RSCRouteConfigEntry[];
});
type RSCRouteConfig = Array<RSCRouteConfigEntry>;
type RSCRouteManifest = {
    clientAction?: ClientActionFunction;
    clientLoader?: ClientLoaderFunction;
    element?: React.ReactElement | false;
    errorElement?: React.ReactElement;
    handle?: any;
    hasAction: boolean;
    hasComponent: boolean;
    hasErrorBoundary: boolean;
    hasLoader: boolean;
    hydrateFallbackElement?: React.ReactElement;
    id: string;
    index?: boolean;
    links?: LinksFunction;
    meta?: MetaFunction;
    parentId?: string;
    path?: string;
    shouldRevalidate?: ShouldRevalidateFunction;
};
type RSCRouteMatch = RSCRouteManifest & {
    params: Params;
    pathname: string;
    pathnameBase: string;
};
type RSCRenderPayload = {
    type: "render";
    actionData: Record<string, any> | null;
    basename: string | undefined;
    errors: Record<string, any> | null;
    loaderData: Record<string, any>;
    location: Location;
    matches: RSCRouteMatch[];
    patches?: RSCRouteManifest[];
    nonce?: string;
    formState?: unknown;
};
type RSCManifestPayload = {
    type: "manifest";
    patches: RSCRouteManifest[];
};
type RSCActionPayload = {
    type: "action";
    actionResult: Promise<unknown>;
    rerender?: Promise<RSCRenderPayload | RSCRedirectPayload>;
};
type RSCRedirectPayload = {
    type: "redirect";
    status: number;
    location: string;
    replace: boolean;
    reload: boolean;
    actionResult?: Promise<unknown>;
};
type RSCPayload = RSCRenderPayload | RSCManifestPayload | RSCActionPayload | RSCRedirectPayload;
type RSCMatch = {
    statusCode: number;
    headers: Headers;
    payload: RSCPayload;
};
type DecodeActionFunction = (formData: FormData) => Promise<() => Promise<unknown>>;
type DecodeFormStateFunction = (result: unknown, formData: FormData) => unknown;
type DecodeReplyFunction = (reply: FormData | string, { temporaryReferences }: {
    temporaryReferences: unknown;
}) => Promise<unknown[]>;
type LoadServerActionFunction = (id: string) => Promise<Function>;
declare function matchRSCServerRequest({ createTemporaryReferenceSet, basename, decodeReply, requestContext, loadServerAction, decodeAction, decodeFormState, onError, request, routes, generateResponse, }: {
    createTemporaryReferenceSet: () => unknown;
    basename?: string;
    decodeReply?: DecodeReplyFunction;
    decodeAction?: DecodeActionFunction;
    decodeFormState?: DecodeFormStateFunction;
    requestContext?: unstable_RouterContextProvider;
    loadServerAction?: LoadServerActionFunction;
    onError?: (error: unknown) => void;
    request: Request;
    routes: RSCRouteConfigEntry[];
    generateResponse: (match: RSCMatch, { temporaryReferences, }: {
        temporaryReferences: unknown;
    }) => Response;
}): Promise<Response>;

declare global {
    interface Window {
        __FLIGHT_DATA: any[];
    }
}
declare function getRSCStream(): ReadableStream<any>;

export { type DecodeActionFunction as D, type LoadServerActionFunction as L, type RSCPayload as R, type DecodeFormStateFunction as a, type DecodeReplyFunction as b, type RSCManifestPayload as c, type RSCMatch as d, type RSCRenderPayload as e, type RSCRouteManifest as f, getRSCStream as g, type RSCRouteMatch as h, type RSCRouteConfigEntry as i, type RSCRouteConfig as j, matchRSCServerRequest as m };
