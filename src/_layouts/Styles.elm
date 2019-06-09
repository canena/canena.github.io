module Styles exposing (styles)

import Css exposing (..)
import Css.Global exposing (..)
import Css.Media as Media exposing (only, screen, withMedia)
import Html exposing (Html)
import Html.Styled


gutterSize =
    px 20


linkColor =
    hex "ff6600"


linkColorHover =
    hex "e32636"


styles : Html msg
styles =
    let
        wideScreen =
            withMedia [ only screen [ Media.minWidth <| Css.px 600 ] ]

        codeStyle =
            [ fontFamilies [ "Inconsolata", .value monospace ]
            , important <| backgroundColor (hex "fdfdfd")
            , border3 (px 1) solid (hex "d6d6d6")
            ]
    in
    global
        [ body
            [ Css.color <| hex "333333"
            , Css.property "font-display" "swap"
            , fontFamilies [ "Roboto Condensed", "Arial", .value sansSerif ]
            , fontSize <| px 18
            , lineHeight <| Css.em 1.4
            , margin <| px 0
            , padding <| px 0
            ]
        , a
            [ Css.color linkColor
            , textDecoration underline
            , hover
                [ Css.color linkColorHover
                , textDecoration none
                ]
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
            --[ backgroundColor <| hex "f2fae8"
            --[ background <| linearGradient3 (deg 142) (hex "d84b97") (hex "ff4400")
            [ backgroundImage <|
                linearGradient2 (deg 142) (stop <| hex "d84b97") (stop <| hex "ff4400") []
            , borderBottom3 (px 4) solid linkColorHover
            , paddingTop <| px 4
            , overflow hidden
            ]
        , class "header__content"
            [ margin2 zero auto
            , maxWidth (px 900)
            , minWidth (px 280)
            , paddingLeft gutterSize
            , paddingRight gutterSize
            ]
        , class "header__logo"
            [ descendants
                [ a
                    [ color <| hex "ffffff"
                    , fontWeight bold
                    , textTransform uppercase
                    ]
                ]
            , display inlineBlock
            , lineHeight (px 70)
            , textAlign center
            , wideScreen [ textAlign left ]
            ]
        , class "header__navigation"
            [ descendants
                [ ul [ listStyle none, margin zero, padding zero ]
                , li [ display inlineBlock, paddingLeft (Css.em 1) ]
                , a
                    [ color <| hex "ffffff"
                    , fontWeight bold
                    , textTransform uppercase
                    ]
                ]
            , float right
            , lineHeight (px 70)
            , textAlign center
            , wideScreen [ textAlign left ]
            ]
        , class "main" [ Css.maxWidth <| vw 100 ]
        , class "main__content"
            [ margin4 (px 50) auto zero auto
            , maxWidth (px 900)
            , minWidth (px 280)
            , paddingLeft gutterSize
            , paddingRight gutterSize
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
            , maxWidth (px 900)
            , minWidth (px 280)
            , paddingLeft gutterSize
            , paddingRight gutterSize
            ]
        , class "footer__content--highlighted"
            [ borderColor linkColor
            , borderStyle dotted
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
                , li
                    [ display inlineBlock
                    , lineHeight (px 70)
                    , paddingRight (Css.em 1)
                    ]
                ]
            , textAlign center
            , wideScreen
                [ textAlign left
                ]
            ]
        , class "footer__avatar"
            [ borderRadius (px 60)
            , float right
            , marginBottom (px 10)
            , marginLeft (px 10)
            ]
        , class "post-list"
            [ listStyle none
            , marginTop (px 45)
            , paddingLeft zero
            ]
        , class "post-list__item"
            [ display block
            , paddingLeft zero
            , marginBottom (px 45)
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
                    , borderRadius <| px 5
                    , borderTopLeftRadius zero
                    , backgroundColor <| hex "d84b97"
                    , color <| hex "ffffff"
                    , paddingLeft <| px 5
                    , paddingRight <| px 5
                    ]
                ]
            ]
        , class "btn"
            [ backgroundImage <|
                linearGradient2 (deg 142) (stop <| hex "d84b97") (stop <| hex "ff4400") []
            , border (px 0)
            , borderBottom3 (px 4) solid (hex "e32636")
            , color (hex "fff")
            , cursor pointer
            , lineHeight (px 30)
            , padding4 (px 3) (px 14) zero (px 14)
            , textTransform uppercase
            , hover
                [ backgroundColor (hex "f90")
                , backgroundImage none
                , borderColor (hex "f60")
                ]
            , withAttribute "disabled"
                [ cursor notAllowed
                , opacity (num 0.6)
                ]
            ]
        ]
        |> Html.Styled.toUnstyled
