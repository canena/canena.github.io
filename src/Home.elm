module Home exposing (decodeModel, main, view)

import Blog.About as About
import Html
import Html.Styled exposing (Html, text, toUnstyled)
import Json.Decode as Decode exposing (Decoder, Value)
import Route exposing (Route(..), Slug(..))
import Styled
import Tagging exposing (Tag(..))
import Time.Date as Date exposing (Date)


decodeModel : Decoder Model
decodeModel =
    Decode.map Model
        (Decode.field "who" Decode.string)


type alias Model =
    { who : String
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


generateListItem meta =
    Styled.articleListItem
        meta.title
        meta.route
        meta.date
        meta.tags
        (Maybe.withDefault "" meta.abstract)


view : Model -> Html.Html ()
view model =
    Styled.layout []
        [ Styled.layoutMain []
            [ Styled.mainHeader []
                [ Styled.defaultIntro
                , Styled.frontmatter
                ]
            , Styled.posts "Recent Posts"
                [ Styled.articleListItem "Epic Links"
                    (Article Blog_2017_03_20_epic_links)
                    (Date.date 2017 03 20)
                    [ Styled.passiveTag Learning
                    , Styled.passiveTag Music
                    , Styled.passiveTag SelfImprovement
                    , Styled.passiveTag Tech
                    ]
                    """
                    A collection of links that I found useful, inspired me and may
                    bring you enjoyment and/or enlightenment as well.
                    """
                , generateListItem About.meta
                ]
            , Styled.outro
            ]
        ]
        |> toUnstyled
