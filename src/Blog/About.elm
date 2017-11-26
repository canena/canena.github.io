module Blog.About exposing (decodeModel, main, meta, view)

import Data.Meta exposing (Meta)
import Html
import Html.Styled exposing (fromUnstyled, text, toUnstyled)
import Json.Decode as Decode exposing (Decoder, Value)
import Markdown
import Route exposing (Route(..), Slug(..))
import Styled
import Time.Date as Date exposing (Date)


meta : Meta
meta =
    { abstract = Just
        """
        This is my personal blog.
        """
    , abstractTagline = Just "What is this?"
    , date = Date.date 2017 1 18
    , route = About
    , tags = []
    , title = "About This Blog"
    }


decodeModel : Decoder Model
decodeModel =
    Decode.map Model
        (Decode.field "who" Decode.string)


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
                , Styled.frontmatter meta.tags
                , Styled.articleHeader meta.abstractTagline meta.abstract
                ]
            , Styled.mainContent
                [ Markdown.toHtml [] sectionProfession |> fromUnstyled
                , Markdown.toHtml [] sectionContent |> fromUnstyled
                , Markdown.toHtml [] sectionImpressum |> fromUnstyled
                ]
            ]
        , Styled.outro
        ]
        |> toUnstyled


sectionProfession : String
sectionProfession =
    """

<h3>My professional self</h3>

I'm a software developer by trait...

* with an abundance of experience in building frontends in <abbr title="Hypertext Markup Language">HTML</abbr>, <abbr title="Cascaded Style Sheets">CSS</abbr> and JavaScript as well as a great number of libraries and frameworks that build on top of this foundation.
* having experience building backends with <abbr title="The C Sharp programming language">C#</abbr> for most of my professional web projects.

Currently obsessed with...

* the <abbr title="Block Element Modifier">BEM</abbr> methodology of writing <abbr title="Cascaded Style Sheets">CSS</abbr> with a little help of <a href="https://www.lesscss.org" target="_blank">LESS</a>.
* using <a href="http://elm-lang.org" target="_blank">Elm</a> instead of JavaScript wherever it makes sense.

    """


sectionContent : String
sectionContent =
    """

<h3 id="contact">Contact</h3>

If you're human, you can surely make sense of the following gibberish where you need to reverse the letters of every word *anenac (ατ) liamy • moc*.

    """


sectionImpressum : String
sectionImpressum =
    """

<h3 id="impressum">Impressum</h3>

The views expressed in this blog are my own thoughts and don't necessarily match that of my professional acquaintances like my employer or co-workers, it is a fully private endeavor. I'm not responsible for linked content that lives outside of <em>canena.de</em> and it's subdomains, the respective owner's opinions are not my own and I distance myself from them and any affiliation that is not explicitly stated on my part.

    """


