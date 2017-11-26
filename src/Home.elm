module Home exposing (decodeModel, main, view)

import Blog.EpicLinks
import Blog.HelloLivingStyleguide
import Blog.MakingAHabitOfMakingAHabit
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


view : Model -> Html.Html ()
view model =
    Styled.layout []
        [ Styled.layoutMain []
            [ Styled.mainHeader []
                [ Styled.defaultIntro
                , Styled.frontmatter []
                ]
            , Styled.posts "Recent Posts"
                (List.map Styled.articleListItemFromMeta
                    [ Blog.EpicLinks.meta
                    , Blog.HelloLivingStyleguide.meta
                    , Blog.MakingAHabitOfMakingAHabit.meta
                    ]
                )
            ]
        , Styled.outro
        ]
        |> toUnstyled
