module Styled
    exposing
        ( articleHeader
        , articleListItemFromMeta
        , defaultIntro
        , frontmatter
        , intro
        , layout
        , layoutMain
        , mainContent
        , mainHeader
        , outro
        , passiveTag
        , posts
        )

import Css exposing (..)
import Data.Meta exposing (Meta)
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
import Html.Styled.Attributes as Attr exposing (class, classList, styled)
import Route exposing (Route(..))
import Tagging exposing (Tag)
import Time.Date as Date exposing (Date, Weekday(..))


type alias InteractiveSingleRootFragment msg =
    List (Html.Attribute msg) -> List (Html msg) -> Html msg


type alias SingleRootFragment msg =
    List (Html.Attribute msg) -> List (Html msg) -> Html msg



--type alias SingleRootFragment msg =
--    List (Html.Attribute Never) -> List (Html msg) -> Html msg


type alias Fragment msg =
    List (Html.Attribute msg) -> List (Html msg) -> List (Html msg)



-- Utilities


formatDate : Date -> String
formatDate date =
    let
        dayName =
            case Date.weekday date of
                Mon ->
                    "Monday"

                Tue ->
                    "Tuesday"

                Wed ->
                    "Wednesday"

                Thu ->
                    "Thursday"

                Fri ->
                    "Friday"

                Sat ->
                    "Saturday"

                Sun ->
                    "Sunday"
    in
    List.foldr (::)
        []
        [ toString (Date.year date)
        , "-"
        , String.padLeft 2 '0' (toString (Date.month date))
        , "-"
        , String.padLeft 2 '0' (toString (Date.day date))
        , ", "
        , dayName
        ]
        |> String.join ""



-- Building blocks


articleHeader : Maybe String -> Maybe String -> Html msg
articleHeader title abstract =
    case title of
        Nothing ->
            text ""

        Just title ->
            styled div
                []
                [ class "ui-grid__row"
                ]
                [ div [ class "ui-abstract" ]
                    [ h2 [] [ text title ]
                    , div [ class "ui-abstract__content" ]
                        [ text (Maybe.withDefault "" abstract)
                        ]
                    ]
                ]


articleListItem : String -> Route -> Date -> List Tag -> String -> Html msg
articleListItem label route date tags description =
    styled li
        []
        [ class "ui-article-list__item" ]
        [ article [ class "ui-article-preview" ]
            [ h4 [ class "ui-article-preview__title" ]
                [ routeLink route label
                ]
            , p [ class "ui-article-preview__abstract ui-content" ]
                [ text description
                ]
            , ul [ class "ui-article-preview__tags" ]
                (List.map (\tag -> li [] [ passiveTag tag ]) tags)
            , div [ class "ui-article-preview__date" ]
                [ text (formatDate date) ]
            , buttonLink route "Read more..."
            ]
        ]


articleListItemFromMeta : Meta -> Html msg
articleListItemFromMeta meta =
    articleListItem
        meta.title
        meta.route
        meta.date
        meta.tags
        (Maybe.withDefault "" meta.abstract)


bullet : Html msg
bullet =
    text " • "


buttonLink : Route -> String -> Html msg
buttonLink route label =
    case route of
        External _ ->
            a [ Route.href route, class "ui-button", Attr.target "_blank" ]
                [ span [ class "ui-button__label" ]
                    [ text label
                    ]
                ]

        _ ->
            a [ Route.href route, class "ui-button" ]
                [ span [ class "ui-button__label" ]
                    [ text label
                    ]
                ]


defaultIntro : Html msg
defaultIntro =
    intro
        "Life/Music/Art/Code/Stuff"
        "A blog about life"


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


frontmatter : List Tag -> Html msg
frontmatter tags =
    styled div
        []
        [ class "ui-layout__content" ]
        [ div [ class "ui-frontmatter" ]
            [ div [ class "ui-user" ]
                [ img
                    [ Attr.alt "Closeup image of the author"
                    , class "ui-user__avatar"
                    , Attr.src "img/ich3.jpg"
                    ]
                    []
                ]
            , div [ class "ui-frontmatter__tags" ]
                (List.map passiveTag tags)
            , div [ class "ui-frontmatter__properties" ]
                [ text " "
                ]
            , div [ class "ui-frontmatter__abstract" ]
                [ text " "
                ]
            ]
        ]


layout : SingleRootFragment msg
layout attrs children =
    styled div
        []
        attrs
        (layoutHeader [] [] :: children)


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
                        , a [ class "ui-header__logo", Route.href Home ]
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


routeLink : Route -> String -> Html msg
routeLink route label =
    case route of
        External _ ->
            styled a
                []
                [ Attr.target "_blank"
                , Route.href route
                ]
                [ text label
                ]

        _ ->
            styled a
                []
                [ Route.href route ]
                [ text label
                ]


mainContent : List (Html msg) -> Html msg
mainContent children =
    styled div
        []
        [ class "ui-layout__content" ]
        (List.map mainContentSection children)


mainContentSection : Html msg -> Html msg
mainContentSection children =
    div [ class "ui-grid__row" ]
        [ section [ class "ui-grid__col-12 ui-content" ]
            [ children
            ]
        ]


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
                        , routeLink Route.About "Do you want to know more?"
                        ]
                    ]
                , nav [ class "ui-grid__col-4" ]
                    [ h4 [] [ text "Sitemap" ]
                    , ul []
                        [ li []
                            [ routeLink Route.Home "Home"
                            , bullet
                            , routeLink Route.Posts "Posts"
                            , bullet
                            , routeLink Route.Links "Links"
                            ]
                        , li []
                            [ routeLink Route.About "About"
                            , bullet
                            , routeLink Route.Contact "Contact Me"
                            ]
                        , li []
                            [ routeLink Route.Impressum "Impressum"
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


passiveTag : Tag -> Html msg
passiveTag thisTag =
    div [ class "ui-tag ui-tag--plain" ]
        [ span [ class "ui-tag__label" ]
            [ text (Tagging.makeReadable thisTag) ]
        ]


posts : String -> List (Html msg) -> Html msg
posts title articleList =
    styled div
        []
        [ class "ui-layout__content" ]
        [ div [ Attr.id "posts", class "ui-grid__row" ]
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
        , div [ Attr.id "links", class "ui-grid__row" ]
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
                        [ routeLink
                            (External "http://caniuse.com")
                            "caniuse.com"
                        ]
                    , li []
                        [ routeLink
                            (External "http://css-tricks.com")
                            "css-tricks.com"
                        ]
                    ]
                , h4 [] [ text "Favorite Developer Blogs" ]
                , ul []
                    [ li []
                        [ routeLink
                            (External "https://ayende.com")
                            "ayende.com"
                        ]
                    , li []
                        [ routeLink
                            (External "http://blog.ploeh.dk/")
                            "blog.ploeh.dk"
                        ]
                    , li []
                        [ routeLink
                            (External "https://cuttingedge.it/blogs/steven/")
                            "cuttingedge.it/blogs/steven"
                        ]
                    , li []
                        [ routeLink
                            (External "https://ericlippert.com")
                            "ericlippert.com"
                        ]
                    ]
                , h4 [] [ text "Daily Dose" ]
                , ul []
                    [ li []
                        [ routeLink
                            (External "https://aeon.co")
                            "Aeon | ideas and culture"
                        ]
                    , li []
                        [ routeLink
                            (External "https://groups.google.com/forum/#!forum/elm-dev")
                            "elm-dev"
                        ]
                    , li []
                        [ routeLink
                            (External "https://groups.google.com/forum/#!forum/elm-discuss")
                            "elm-discuss"
                        ]
                    , li []
                        [ routeLink
                            (External "https://news.ycombinator.com/newest")
                            "news.ycombinator.com/newest"
                        ]
                    , li []
                        [ routeLink
                            (External "https://www.reddit.com/r/elm/new")
                            "reddit.com/r/elm/new"
                        ]
                    , li []
                        [ routeLink
                            (External "https://www.reddit.com/r/java/new")
                            "reddit.com/r/java/new"
                        ]
                    , li []
                        [ routeLink
                            (External "https://www.reddit.com/r/javascript/new")
                            "reddit.com/r/javascript/new"
                        ]
                    ]
                ]
            ]
        ]
