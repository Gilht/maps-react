export interface PlacesResponse {
    type:        string;
    features:    Feature[];
    query:       string[];
    attribution: string;
}

export interface Feature {
    type:                 string;
    properties:           Properties;
    geometry:             Geometry;
    bbox:                 number[];
    center:               number[];
    place_name:           string;
    place_type:           string[];
    relevance:            number;
    id:                   string;
    text:                 string;
    place_type_name:      string[];
    matching_text?:       string;
    matching_place_name?: string;
    context:              Context[];
    language:             Language;
    text_es:              string;
    language_es:          Language;
    place_name_es:        string;
    text_en:              string;
    language_en?:         LanguageEn;
    place_name_en:        string;
}

export interface Context {
    ref:           string;
    id:            string;
    text:          string;
    wikidata?:     string;
    categories?:   string[];
    language?:     Language;
    "osm:tags"?:   OsmTags;
    text_es:       string;
    language_es?:  Language;
    text_en:       string;
    language_en?:  LanguageEn;
    country_code?: Language;
    kind?:         Kind;
}

export enum Language {
    Bj = "bj",
    Br = "br",
    Es = "es",
    Pt = "pt",
}

export enum Kind {
    AdminArea = "admin_area",
}

export enum LanguageEn {
    En = "en",
}

export interface OsmTags {
    population?:         string;
    place?:              string;
    wikipedia?:          string;
    sqkm?:               string;
    "addr:postcode"?:    string;
    "addr:city"?:        string;
    "addr:suburb"?:      string;
    "addr:housenumber"?: string;
    phone?:              string;
    landuse?:            string;
    military?:           string;
    "addr:street"?:      string;
    email?:              string;
    start_date?:         string;
    image?:              string;
    "addr:country"?:     string;
    opening_hours?:      string;
    waterway?:           string;
    intermittent?:       string;
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    ref:               string;
    country_code:      Language;
    wikidata:          string;
    kind:              string;
    place_type_name:   string[];
    "osm:place_type"?: string;
}