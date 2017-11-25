module Styled
    exposing
        ( pageFrame
        , pageHeader
        , toplevelPageFrame
        )

import Css exposing (..)
import Html.Styled as Html
    exposing
        ( Attribute
        , Html
        , a
        , div
        , header
        , li
        , nav
        , ul
        , text
        )
import Html.Styled.Attributes as Attrs exposing (styled)


type alias InteractiveSingleRootFragment msg =
    List (Html.Attribute msg) -> List (Html msg) -> Html msg


type alias SingleRootFragment msg =
    List (Html.Attribute msg) -> List (Html msg) -> Html msg



--type alias SingleRootFragment msg =
--    List (Html.Attribute Never) -> List (Html msg) -> Html msg


type alias Fragment msg =
    List (Html.Attribute msg) -> List (Html msg) -> List (Html msg)


pageFrame : SingleRootFragment msg
pageFrame =
    styled div
        [ 
        ]


pageHeader : SingleRootFragment msg
pageHeader attrs children =
    let
        staticChildren =
            [ nav []
                [ ul [ Attrs.class "ui-layout__content ui-header" ]
                    [ li [ Attrs.class "ui-header__menu-item ui-header__menu-item--active" ]
                        [ div [ Attrs.class "ui-header__menu-category" ]
                            [ text "Music/Life"
                            ]
                        , a [ Attrs.class "ui-header__log", Attrs.href "./" ] []
                        ]
                    ]
                ]
            ]
    in
    styled header
        [ 
        ]
        (Attrs.classList [ ("ui-layout__header", True) ] :: attrs)
        (staticChildren ++ children)


toplevelPageFrame : SingleRootFragment msg
toplevelPageFrame attrs children =
    pageFrame attrs
        (pageHeader [] [] :: children)
