module Intro exposing (banner)

import Html exposing (Html, div, text)
import Html.Attributes as Attr exposing (class)


banner : Html Never
banner =
    text ""
    --div [ class "intro" ]
    --    [ text "Hello, Intro!"
    --    , inlineScript "require([\"intro\"]);"
    --    ]



-- UTILITIES


inlineScript : String -> Html Never
inlineScript js =
    Html.node "citatsmle-script" [] [ Html.text js ]
