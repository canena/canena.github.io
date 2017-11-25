module Styled
    exposing
        ( articleListItem
        , frontmatter
        , intro
        , layout
        , layoutMain
        , mainHeader
        , outro
        , posts
        , tag
        , toplevelLayout
        )

import Css exposing (..)
import Html.Styled as Html
    exposing
        ( Attribute
        , Html
        , a
        , article
        , div
        , footer
        , h1
        , h2
        , h3
        , h4
        , header
        , img
        , li
        , main_
        , nav
        , p
        , section
        , span
        , text
        , ul
        )
import Html.Styled.Attributes as Attrs exposing (class, styled)


type alias InteractiveSingleRootFragment msg =
    List (Html.Attribute msg) -> List (Html msg) -> Html msg


type alias SingleRootFragment msg =
    List (Html.Attribute msg) -> List (Html msg) -> Html msg



--type alias SingleRootFragment msg =
--    List (Html.Attribute Never) -> List (Html msg) -> Html msg


type alias Fragment msg =
    List (Html.Attribute msg) -> List (Html msg) -> List (Html msg)


articleListItem : String -> String -> List (Html msg) -> String -> Html msg
articleListItem label href tags description =
    styled li
        []
        [ class "ui-article-list__item" ]
        [ article [ class "ui-article-preview" ]
            [ h4 [ class "ui-article-preview__title" ]
                [ internalLink href label
                ]
            , p [ class "ui-article-preview__abstract ui-content" ]
                [ text description
                ]
            , ul [ class "ui-article-preview__tags" ]
                (List.map (\x -> li [] [ x ]) tags)
            , div [ class "ui-article-preview__date" ]
                [ text "2017-03-20, Monday" ]
            , buttonLink href "Read more..."
            ]
        ]


bullet : Html msg
bullet =
    text "•"


buttonLink : String -> String -> Html msg
buttonLink href label =
    a [ Attrs.href href, class "ui-button" ]
        [ span [ class "ui-button__label" ]
            [ text label
            ]
        ]


externalLink : String -> String -> Html msg
externalLink href linkText =
    a
        [ Attrs.href href
        , Attrs.target "_blank"
        ]
        [ text linkText
        ]


intro : String -> String -> Html msg
intro title subTitle =
    styled div
        []
        [ class "ui-intro" ]
        [ div [ class "ui-layout__content" ]
            [ h1 [ class "ui-intro__label" ]
                [ text title
                , span [ class "ui-intro__sub-label" ]
                    [ text subTitle
                    ]
                ]
            ]
        ]


frontmatter : Html msg
frontmatter =
    styled div
        []
        [ class "ui-layout__content" ]
        [ div [ class "ui-frontmatter" ]
            [ div [ class "ui-user" ]
                [ img
                    [ Attrs.alt "Closeup image of the author"
                    , class "ui-user__avatar"
                    , Attrs.src "img/ich3.jpg"
                    ]
                    []
                ]
            , div [ class "ui-frontmatter__properties" ]
                [ text " "
                ]
            ]
        ]


layout : SingleRootFragment msg
layout =
    styled div []


layoutHeader : SingleRootFragment msg
layoutHeader attrs children =
    let
        staticChildren =
            [ nav []
                [ ul [ class "ui-layout__content ui-header" ]
                    [ li [ class "ui-header__menu-item ui-header__menu-item--active" ]
                        [ div [ class "ui-header__menu-category" ]
                            [ text "Music/Life"
                            ]
                        , a [ class "ui-header__logo", Attrs.href "./" ]
                            [ text "CANENA"
                            ]
                        ]
                    ]
                ]
            ]
    in
    styled header
        []
        (class "ui-layout__header" :: attrs)
        (staticChildren ++ children)


layoutMain : SingleRootFragment msg
layoutMain attrs children =
    styled main_
        []
        (class "ui-layout__main" :: attrs)
        [ article [] children
        ]


internalLink : String -> String -> Html msg
internalLink href title =
    styled a
        []
        [ Attrs.href href ]
        [ text title ]


mainHeader : SingleRootFragment msg
mainHeader =
    styled header []


outro : Html msg
outro =
    styled footer
        []
        [ class "ui-outro" ]
        [ div [ class "ui-layout__content" ]
            [ section [ class "ui-grid__row" ]
                [ div [ class "ui-grid__col-8" ]
                    [ h4 [] [ text "About the author" ]
                    , p []
                        [ text
                            """
                            I love listening to and making music myself, enjoy reading,
                            get excited when watching a decent movie, flourish in creating
                            artwork, marvel in coding and grocking other people's code and
                            delight in learning anything new in general while living
                            The Dream in the beautiful city of Leipzig, Germany.
                            """
                        , internalLink "blog/about" "Do you want to know more?"
                        ]
                    ]
                , nav [ class "ui-grid__col-4" ]
                    [ h4 [] [ text "Sitemap" ]
                    , ul []
                        [ li []
                            [ internalLink "./" "Home"
                            , bullet
                            , internalLink "./#posts" "Posts"
                            , bullet
                            , internalLink "./#links" "Links"
                            ]
                        , li []
                            [ internalLink "blog/about" "About"
                            , bullet
                            , internalLink "blog/about#contact" "Contact Me"
                            ]
                        , li []
                            [ internalLink "blog/about#impressum" "Impressum"
                            ]
                        ]
                    ]
                ]
            , section [ class "ui-outro__section" ]
                [ div [ class "ui-grid__row" ]
                    [ div [ class "ui-grid__col-8" ]
                        [ p [ class "ui-outro__punchline" ]
                            [ text
                                "Proudly powered by Elm-generated static web pages"
                            ]
                        ]
                    , div [ class "ui-grid__col-4" ]
                        [ p [ class "ui-outro__punchline" ]
                            [ text
                                "© 2017 CANENA - All rights reserved"
                            ]
                        ]
                    ]
                ]
            ]
        ]


posts : String -> List (Html msg) -> Html msg
posts title articleList =
    styled div
        []
        [ class "ui-layout__content" ]
        [ div [ Attrs.id "posts", class "ui-grid__row" ]
            [ section [ class "ui-grid__col-8 ui-article-list" ]
                [ h3 [] [ text title ]
                , ul [] articleList
                ]
            , sidebar
            ]
        ]


sidebar : Html msg
sidebar =
    styled section
        []
        [ class "ui-grid__col-4" ]
        [ div [ class "ui-grid__row" ]
            [ div [ class "ui-grid__col-12 ui-content" ]
                [ h3 [] [ text "Hello there" ]
                , div [ class "ui-abstract" ]
                    [ p [ class "ui-abstract__content" ]
                        [ text
                            """
                            This is my personal blog covering various topics from music
                            to design, programming, life itself and more.
                            """
                        , text "Shiny!"
                        ]
                    ]
                ]
            ]
        , div [ Attrs.id "links", class "ui-grid__row" ]
            [ div [ class "ui-grid__col-12 ui-content" ]
                [ h3 [] [ text "External Links" ]
                , p []
                    [ text
                        """
                        I'm not in any way affiliated with the following links, I just find them
                        useful, delightful, funny...
                        """
                    ]
                , h4 [] [ text "Useful Tools" ]
                , ul []
                    [ li []
                        [ externalLink
                            "http://caniuse.com"
                            "caniuse.com"
                        ]
                    , li []
                        [ externalLink
                            "http://css-tricks.com"
                            "css-tricks.com"
                        ]
                    ]
                , h4 [] [ text "Favorite Developer Blogs" ]
                , ul []
                    [ li []
                        [ externalLink
                            "https://ayende.com"
                            "ayende.com"
                        ]
                    , li []
                        [ externalLink
                            "http://blog.ploeh.dk/"
                            "blog.ploeh.dk"
                        ]
                    , li []
                        [ externalLink
                            "https://cuttingedge.it/blogs/steven/"
                            "cuttingedge.it/blogs/steven"
                        ]
                    , li []
                        [ externalLink
                            "https://ericlippert.com"
                            "ericlippert.com"
                        ]
                    ]
                , h4 [] [ text "Daily Dose" ]
                , ul []
                    [ li []
                        [ externalLink
                            "https://aeon.co"
                            "Aeon | ideas and culture"
                        ]
                    , li []
                        [ externalLink
                            "https://groups.google.com/forum/#!forum/elm-dev"
                            "elm-dev"
                        ]
                    , li []
                        [ externalLink
                            "https://groups.google.com/forum/#!forum/elm-discuss"
                            "elm-discuss"
                        ]
                    , li []
                        [ externalLink
                            "https://news.ycombinator.com/newest"
                            "news.ycombinator.com/newest"
                        ]
                    , li []
                        [ externalLink
                            "https://www.reddit.com/r/elm/new"
                            "reddit.com/r/elm/new"
                        ]
                    , li []
                        [ externalLink
                            "https://www.reddit.com/r/java/new"
                            "reddit.com/r/java/new"
                        ]
                    , li []
                        [ externalLink
                            "https://www.reddit.com/r/javascript/new"
                            "reddit.com/r/javascript/new"
                        ]
                    ]
                ]
            ]
        ]


tag : String -> Html msg
tag title =
    div [ class "ui-tag ui-tag--plain" ]
        [ span [ class "ui-tag__label" ]
            [ text title ]
        ]


toplevelLayout : SingleRootFragment msg
toplevelLayout attrs children =
    layout attrs
        (layoutHeader [] [] :: children)
