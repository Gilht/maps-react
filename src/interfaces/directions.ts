export interface DirectionsResponse {
    data:       Data;
    status:     number;
    statusText: string;
    headers:    DirectionsResponseHeaders;
    config:     Config;
    request:    Request;
}

export interface Config {
    transitional:      Transitional;
    adapter:           string[];
    transformRequest:  null[];
    transformResponse: null[];
    timeout:           number;
    xsrfCookieName:    string;
    xsrfHeaderName:    string;
    maxContentLength:  number;
    maxBodyLength:     number;
    env:               Request;
    headers:           ConfigHeaders;
    baseURL:           string;
    params:            Params;
    method:            string;
    url:               string;
    allowAbsoluteUrls: boolean;
}

export interface Request {
}

export interface ConfigHeaders {
    Accept: string;
}

export interface Params {
    overview:   string;
    geometries: string;
}

export interface Transitional {
    silentJSONParsing:   boolean;
    forcedJSONParsing:   boolean;
    clarifyTimeoutError: boolean;
}

export interface Data {
    code:      string;
    routes:    Route[];
    waypoints: Waypoint[];
}

export interface Route {
    legs:        Leg[];
    weight_name: string;
    geometry:    Geometry;
    weight:      number;
    duration:    number;
    distance:    number;
}

export interface Geometry {
    coordinates: Array<number[]>;
    type:        string;
}

export interface Leg {
    steps:    any[];
    weight:   number;
    summary:  string;
    duration: number;
    distance: number;
}

export interface Waypoint {
    hint:     string;
    location: number[];
    name:     string;
    distance: number;
}

export interface DirectionsResponseHeaders {
    "content-length": string;
    "content-type":   string;
}