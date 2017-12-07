module Markup exposing (toHtml)

import Html.Styled exposing (Html, fromUnstyled)
import Markdown
import Markdown.Config exposing (HtmlOption(..), Options, defaultOptions)


markdownOptions : Maybe Options
markdownOptions =
    Just { defaultOptions | rawHtml = ParseUnsafe }


toHtml : String -> List (Html msg)
toHtml markup =
    List.map fromUnstyled (Markdown.toHtml markdownOptions markup)
