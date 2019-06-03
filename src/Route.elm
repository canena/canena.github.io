module Route exposing (Route(..), Slug(..), href)

import Html.Styled exposing (Attribute)
import Html.Styled.Attributes as Attr
import Regex exposing (HowMany(..), Match, Regex)


type Slug
    = Blog_About
    | Blog_2019_03_04_typescript_vs_the_real_world
    | Blog_2018_02_24_an_elm_to_the_past
    | Blog_2017_03_20_epic_links
    | Blog_2017_01_18_hello_living_style_guide
    | Blog_2015_08_04_making_a_habit_of_making_a_habit


type Route
    = Article Slug
    | Contact
    | DataUsage
    | External String
    | Home
    | Impressum
    | Links
    | Posts


href : Route -> Attribute msg
href route =
    Attr.href (routeToString route)


routeToString : Route -> String
routeToString route =
    case route of
        Article Blog_About ->
            "/blog/about"

        Article slug ->
            toString slug
                |> String.toLower
                |> Regex.replace All slugPrefixRegex (\{ match } -> "/blog/")
                |> Regex.replace All slugSeparatorRegex (\{ match } -> "-")

        Contact ->
            "/blog/about#contact"

        DataUsage ->
            "/#data-usage"

        External url ->
            url

        Home ->
            "/"

        Impressum ->
            "/blog/about#impressum"

        Links ->
            "/#links"

        Posts ->
            "/#posts"


slugPrefixRegex : Regex
slugPrefixRegex =
    Regex.regex "^blog_"


slugSeparatorRegex : Regex
slugSeparatorRegex =
    Regex.regex "_"