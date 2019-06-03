module Styles exposing (styles)

import Css exposing (..)
import Css.Global exposing (..)
import Css.Media as Media exposing (only, screen, withMedia)
import Html exposing (Html)
import Html.Styled


styles : Html msg
styles =
    let
        wideScreen =
            withMedia [ only screen [ Media.minWidth <| Css.px 600 ] ]

        codeStyle =
            [ fontFamilies [ "Inconsolata", .value monospace ]
            ]
    in
    global
        [ body
            [ padding <| px 0
            , margin <| px 0
            , Css.color <| hex "363636"
            , fontFamilies [ "Roboto Condensed", "Arial", .value sansSerif ]

            --, fontFace
            --, fontDisplay swap
            , Css.property "font-display" "swap"
            , fontSize <| px 18
            , lineHeight <| Css.em 1.4
            ]
        , a
            [ Css.color <| hex "348aa7"
            , textDecoration none
            ]
        , code codeStyle
        , Css.Global.pre
            [ descendants
                [ code [ important <| overflowX Css.scroll ] ]
            ]
        , each [ h1, h2, h3, h4, h5, h6 ]
            [ fontFamilies [ "Roboto Condensed", "Helvetica", "Arial", .value sansSerif ]
            ]
        , Css.Global.small [ fontSize <| pct 65 ]
        , class "header"
            [ backgroundColor <| hex "f2fae8"
            , borderBottom3 (px 2) solid (hex "3c8765")
            , paddingTop <| px 6
            , overflow hidden
            ]
        , class "header__content"
            [ margin2 zero auto
            , maxWidth (px 600)
            , minWidth (px 280)
            , paddingLeft (px 10)
            , paddingRight (px 10)
            ]
        , class "header__logo"
            [ display inlineBlock
            , textAlign center
            , wideScreen [ textAlign left ]
            ]
        , class "header__navigation"
            [ descendants
                [ ul [ listStyle none, margin zero, padding zero ]
                , li [ display inlineBlock, paddingLeft (Css.em 1) ]
                ]
            , float right
            , lineHeight (px 70)
            , paddingRight (px 10)
            , textAlign center
            , wideScreen [ textAlign left ]
            ]
        , class "main" [ Css.maxWidth <| vw 100 ]
        , class "main__content"
            [ margin4 (px 50) auto zero auto
            , maxWidth (px 600)
            , minWidth (px 280)
            , paddingLeft (px 10)
            , paddingRight (px 10)
            ]
        , class "footer"
            [ descendants
                [ svg [ paddingRight <| px 5, verticalAlign baseline ]
                ]
            ]
        , class "footer__content"
            [ borderColor (hex "e0e0e0")
            , borderStyle solid
            , borderWidth4 (px 1) zero zero zero
            , margin2 zero auto
            , maxWidth (px 600)
            , minWidth (px 280)
            , paddingLeft (px 10)
            , paddingRight (px 10)
            ]
        , class "footer__copyright"
            [ display block
            , paddingBottom (Css.em 1)
            , paddingTop (Css.em 1)
            , textAlign center
            , wideScreen
                [ display inlineBlock
                , textAlign left
                ]
            ]
        , class "footer__acknowledgements"
            [ display block
            , paddingBottom (Css.em 1)
            , paddingTop (Css.em 1)
            , textAlign center
            , wideScreen
                [ float right
                , overflow hidden
                , textAlign right
                ]
            ]
        , class "footer__navigation"
            [ descendants
                [ ul [ listStyle none, margin zero, padding zero ]
                , li [ display inlineBlock, paddingRight (Css.em 1) ]
                ]
            , paddingBottom (Css.em 1)
            , paddingTop (Css.em 1)
            ]
        , class "post-metadata"
            [ marginTop <| Css.em -0.5
            , marginBottom <| Css.em 2.0
            , descendants
                [ each [ a, span ]
                    [ display inlineBlock
                    , marginRight <| px 5
                    ]
                , a
                    [ border3 (px 1) solid (hex "e0e0e0")
                    , borderRadius <| px 3
                    , backgroundColor <| hex "f2fae8"
                    , paddingLeft <| px 5
                    , paddingRight <| px 5
                    ]
                ]
            ]
        ]
        |> Html.Styled.toUnstyled
