module Blog.EpicLinks exposing (decodeModel, main, meta, view)

import Data.Meta exposing (Meta)
import Html
import Html.Styled exposing (fromUnstyled, text, toUnstyled)
import Json.Decode as Decode exposing (Decoder, Value)
import Markdown
import Route exposing (Route(..), Slug(..))
import Styled
import Tagging exposing (Tag(..))
import Time.Date as Date exposing (Date)


decodeModel : Decoder Model
decodeModel =
    Decode.map Model
        (Decode.field "who" Decode.string)


meta : Meta
meta =
    { abstract = Just
        """
        A collection of links that I found useful, inspired me and may bring
        you enjoyment and/or enlightenment as well.
        """
    , abstractTagline = Just "Changing my view on anything"
    , date = Date.date 2017 3 20
    , route = Article Blog_2017_03_20_epic_links
    , tags =
        [ Learning
        , Music
        , SelfImprovement
        , Tech
        ]
    , title = "Epic Links"
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


sectionDisclaimer : String
sectionDisclaimer =
    """

### Disclaimer

I'm not in any way affiliated with the following links, I just find them useful, delightful, funny...

    """


view : Model -> Html.Html ()
view model =
    Styled.layout []
        [ Styled.layoutMain []
            [ Styled.mainHeader []
                [ Styled.intro "Epic Links" "My inspirations on the web"
                , Styled.frontmatter meta.tags
                , Styled.articleHeader meta.abstractTagline meta.abstract
                ]
            , Styled.mainContent
                [ Markdown.toHtml [] sectionDisclaimer |> fromUnstyled
                ]
            , Styled.outro
            ]
        ]
        |> toUnstyled
