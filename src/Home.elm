module Home exposing (decodeModel, main, view)

import Blog.About
import Blog.EpicLinks
import Blog.HelloLivingStyleguide
import Blog.MakingAHabitOfMakingAHabit
import Data.Meta exposing (Meta)
import Html
import Html.Styled exposing (Html, text, toUnstyled)
import Json.Decode as Decode exposing (Decoder, Value)
import Styled


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



-- Keeping these collections even for pages that aren't
-- published for the compiler to cover all code changes
-- when using `elm-reactor`


drafts : List Meta
drafts =
    []


staticPages : List Meta
staticPages =
    [ Blog.About.meta
    ]


published : List Meta
published =
    [ Blog.EpicLinks.meta
    , Blog.HelloLivingStyleguide.meta
    , Blog.MakingAHabitOfMakingAHabit.meta
    ]


view : Model -> Html.Html ()
view model =
    Styled.layout []
        [ Styled.layoutMain []
            [ Styled.mainHeader []
                [ Styled.defaultIntro
                , Styled.frontmatter (Just "./img/ich3.jpg") []
                ]
            , Styled.posts "Recent Posts"
                (List.map Styled.articleListItemFromMeta published)
            ]
        , Styled.outro
        ]
        |> toUnstyled
