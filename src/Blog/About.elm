module Blog.About exposing (decodeModel, main, meta, view)

import Html
import Html.Styled exposing (text, fromUnstyled, toUnstyled)
import Json.Decode as Decode exposing (Decoder, Value)
import Markdown
import Route exposing (Route(..), Slug(..))
import Styled
import Tagging exposing (Tag(..))
import Time.Date as Date exposing (Date, date)


decodeModel : Decoder Model
decodeModel =
    Decode.map Model
        (Decode.field "who" Decode.string)


meta =
    { abstract = Nothing
    , date = date 2017 1 18
    , route = About
    , tags = []
    , title = "About This Blog"
    }


main : Program Never Model ()
main =
    Html.beginnerProgram
        { model =
            { who = "No-One"
            }
        , update = \_ model -> model
        , view = view
        }


type alias Model =
    { who : String
    }


view : Model -> Html.Html ()
view model =
    Styled.layout []
        [ Styled.layoutMain []
            [ Styled.mainHeader []
                [ Styled.defaultIntro
                , Styled.frontmatter
                , Styled.articleHeader "What is this?"
                    """
                    This is my personal blog.
                    """
                ]
            , Styled.mainContent
                [ Markdown.toHtml []
                    """

### My professional self

I'm a software developer by trait...

* with an abundance of experience in building frontends in <abbr title="Hypertext Markup Language">HTML</abbr>, <abbr title="Cascaded Style Sheets">CSS</abbr> and JavaScript as well as a great number of libraries and frameworks that build on top of this foundation.
* having experience building backends with <abbr title="The C Sharp programming language">C#</abbr> for most of my professional web projects.

Currently obsessed with...

* the <abbr title="Block Element Modifier">BEM</abbr> methodology of writing <abbr title="Cascaded Style Sheets">CSS</abbr> with a little help of <a href="https://www.lesscss.org" target="_blank">LESS</a>.
* using <a href="http://elm-lang.org" target="_blank">Elm</a> instead of JavaScript wherever it makes sense.

                    """
                    |> fromUnstyled
                , Markdown.toHtml []
                    """

### Contact

If you're human, you can surely make sense of the following gibberish where you need to reverse the letters of every word __anenac (ατ) liamy • moc__.

                    """
                    |> fromUnstyled
                , Markdown.toHtml []
                    """

### Impressum

The views expressed in this blog are my own thoughts and don't necessarily match that of my professional acquaintances like my employer or co-workers, it is a fully private endeavor. I'm not responsible for linked content that lives outside of <em>canena.de</em> and it's subdomains, the respective owner's opinions are not my own and I distance myself from them and any affiliation that is not explicitly stated on my part.

                    """
                    |> fromUnstyled
                ]
            , Styled.outro
            ]
        ]
        |> toUnstyled
