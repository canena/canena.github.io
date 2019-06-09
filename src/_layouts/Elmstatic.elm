module Elmstatic exposing
    ( Content
    , Layout
    , Page
    , Post
    , PostList
    , decodePage
    , decodePost
    , decodePostList
    , htmlTemplate
    , inlineScript
    , layout
    , script
    , stylesheet
    )

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode
import Styles


type alias Post =
    { date : String
    , imports : List String
    , link : String
    , markdown : String
    , section : String
    , siteTitle : String
    , tags : List String
    , title : String
    }


type alias Page =
    { imports : List String
    , markdown : String
    , siteTitle : String
    , title : String
    }


type alias PostList =
    { imports : List String
    , posts : List Post
    , section : String
    , siteTitle : String
    , title : String
    }


type alias Content a =
    { a | imports : List String, siteTitle : String, title : String }


type alias Layout =
    Program Json.Decode.Value Json.Decode.Value Never


decodePage : Json.Decode.Decoder Page
decodePage =
    Json.Decode.map4 Page
        decodeImports
        (Json.Decode.field "markdown" Json.Decode.string)
        (Json.Decode.field "siteTitle" Json.Decode.string)
        (Json.Decode.field "title" Json.Decode.string)


decodePost : Json.Decode.Decoder Post
decodePost =
    Json.Decode.map8 Post
        (Json.Decode.field "date" Json.Decode.string)
        decodeImports
        (Json.Decode.field "link" Json.Decode.string)
        (Json.Decode.field "markdown" Json.Decode.string)
        (Json.Decode.field "section" Json.Decode.string)
        (Json.Decode.field "siteTitle" Json.Decode.string)
        (Json.Decode.field "tags" <| Json.Decode.list Json.Decode.string)
        (Json.Decode.field "title" Json.Decode.string)


decodePostList : Json.Decode.Decoder PostList
decodePostList =
    Json.Decode.map5 PostList
        decodeImports
        (Json.Decode.field "posts" <| Json.Decode.list decodePost)
        (Json.Decode.field "section" Json.Decode.string)
        (Json.Decode.field "siteTitle" Json.Decode.string)
        (Json.Decode.field "title" Json.Decode.string)


decodeImports : Json.Decode.Decoder (List String)
decodeImports =
    Json.Decode.maybe (Json.Decode.field "imports" Json.Decode.string)
        |> Json.Decode.andThen
           (\maybeEntry ->
                case maybeEntry of
                    Nothing ->
                        Json.Decode.succeed []

                    Just "" ->
                        Json.Decode.succeed []

                    Just value ->
                        String.split " " value
                            |> List.map String.trim
                            |> Json.Decode.succeed
           )

decodeBoolMeta : String -> Json.Decode.Decoder Bool
decodeBoolMeta prop =
    Json.Decode.maybe (Json.Decode.field prop Json.Decode.string)
        |> Json.Decode.andThen
            (\value ->
                case value of
                    Nothing ->
                        Json.Decode.succeed False

                    Just "true" ->
                        Json.Decode.succeed True

                    Just _ ->
                        Json.Decode.succeed False
            )


script : String -> Html Never
script src =
    node "citatsmle-script" [ attribute "src" src ] []


cdnScript : String -> String -> String -> Html Never
cdnScript src integrity crossorigin =
    node "citatsmle-script"
        [ attribute "src" src
        , attribute "integrity" integrity
        , attribute "crossorigin" crossorigin
        ]
        []


inlineScript : String -> Html Never
inlineScript js =
    node "citatsmle-script" [] [ text js ]


stylesheet : String -> Html Never
stylesheet href =
    node "link" [ attribute "href" href, attribute "rel" "stylesheet", attribute "type" "text/css" ] []


cdnStylesheet : String -> String -> String -> Html Never
cdnStylesheet href integrity crossorigin =
    node "link"
        [ attribute "href" href
        , attribute "rel" "stylesheet"
        , attribute "type" "text/css"
        , attribute "integrity" integrity
        , attribute "crossorigin" crossorigin
        ]
        []


htmlTemplate : String -> List (Html Never) -> Html Never
htmlTemplate title contentNodes =
    node "html"
        [ attribute "lang" "en"
        , class "ui-layout no-js"
        ]
        [ node "head"
            []
            [ node "meta" [ attribute "charset" "utf-8" ] []
            , node "meta"
                [ attribute "http-equiv" "X-UA-Compatible"
                , attribute "content" "IE=edge"
                ]
                []
            , node "meta"
                [ attribute "name" "author"
                , attribute "content" "Martin Feineis"
                ]
                []
            , node "meta"
                [ attribute "name" "creator"
                , attribute "content" "Canena"
                ]
                []
            , node "meta"
                [ attribute "name" "description"
                , attribute "content" "A blog about life"
                ]
                []
            , node "meta"
                [ attribute "name" "viewport"
                , attribute "content" "width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0"
                ]
                []
            , node "title" [] [ text title ]
            , stylesheet "/style/normalize-8.0.1.css"
            , stylesheet "/style/styles.css?v1"
            --, cdnStylesheet "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/default.min.css" "sha256-zcunqSn1llgADaIPFyzrQ8USIjX2VpuxHzUwYisOwo8=" "anonymous"
            , cdnStylesheet "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/xcode.min.css" "sha256-fjO4CUN/XJTfsDmlIBojCwY4EV94jfOJpPzqd19TSko=" "anonymous"
            --, cdnStylesheet "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/github-gist.min.css" "sha256-3bRfCcmMiQbIzvnxDzgFY9bl7dc07xbdX3+Mr4QYTY8=" "anonymous"
            , Styles.styles
            , cdnScript "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js" "sha256-js+I1fdbke/DJrW2qXQlrw7VUEqmdeFeOW37UC0bEiU=" "anonymous"
            , cdnScript "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/languages/bash.min.js" "sha256-zXrlim8wsIvcEFjsD3THiAfTvtPZifqx8q0rxegiWQc=" "anonymous"
            , cdnScript "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/languages/elm.min.js" "sha256-5ZDjmDRr7i9DNIGlJKzPImNcoVZ2KGsPch+qoZuYq5M=" "anonymous"
            , cdnScript "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/languages/javascript.min.js" "sha256-x3ducqWgfzH2JLxwkA7vfwbJC7nZgvdypVl0Gy0L/z0=" "anonymous"
            , inlineScript "hljs.initHighlightingOnLoad();"
            , inlineScript "var requirejs = { baseUrl: \"/js\", paths: { greeshka: \"libs/greeshka-0.3.0\" } };"
            , cdnScript "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js" "sha256-1fEPhSsRKlFKGfK3eO710tEweHh1fwokU5wFGDHO+vg=" "anonymous"
            , stylesheet "https://fonts.googleapis.com/css?family=Roboto+Condensed|Inconsolata"
            , inlineScript "document.querySelector('html').classList.remove('no-js');"
            ]
        , node "body" [] contentNodes
        ]


layout : Json.Decode.Decoder (Content content) -> (Content content -> List (Html Never)) -> Layout
layout decoder view =
    Browser.document
        { init = \contentJson -> ( contentJson, Cmd.none )
        , view =
            \contentJson ->
                case Json.Decode.decodeValue decoder contentJson of
                    Err error ->
                        { title = ""
                        , body = [ htmlTemplate "Error" [ Html.text <| Json.Decode.errorToString error ] ]
                        }

                    Ok content ->
                        let
                            amdImports =
                                content.imports
                                    |> List.map (\it -> "\"" ++ it ++ "\"")
                                    |> String.join ", "
                        in
                        { title = ""
                        , body =
                            [ htmlTemplate content.siteTitle <|
                                List.concat
                                    [ view content
                                    , if List.isEmpty content.imports then
                                        [ text "" ]
                                      else
                                        [ inlineScript <|
                                            "require([" ++ amdImports ++ "]);"
                                        ]
                                    ]
                            ]
                        }
        , update = \msg contentJson -> ( contentJson, Cmd.none )
        , subscriptions = \_ -> Sub.none
        }
