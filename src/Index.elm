module Index exposing (decodeModel, view)

import Html
import Html.Styled exposing (Html, text, toUnstyled)
import Json.Decode as Decode exposing (Decoder, Value)
import Styled
import Tagging exposing (Tag(..), allTags)


decodeModel : Decoder Model
decodeModel =
    Decode.map Model
        (Decode.field "who" Decode.string)


type alias Model =
    { who : String
    }


type Msg
    = Bootstrap


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , subscriptions = \_ -> Sub.none
        , update = update
        , view = view
        }


init : ( Model, Cmd Msg )
init =
    ( { who = "No-One" }, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )


view : Model -> Html.Html Msg
view model =
    Styled.toplevelLayout []
        [ Styled.layoutMain []
            [ Styled.mainHeader []
                [ Styled.intro
                    "Life/Music/Art/Code/Stuff"
                    "A blog about life"
                , Styled.frontmatter
                ]
            , Styled.posts "Recent Posts"
                [ Styled.articleListItem "Epic Links"
                    "blog/2017-03-20-epic-links"
                    [ Styled.passiveTag Learning
                    , Styled.passiveTag Music
                    , Styled.passiveTag SelfImprovement
                    , Styled.passiveTag Tech
                    ]
                    """
                    A collection of links that I found useful, inspired me and may
                    bring you enjoyment and/or enlightenment as well.
                    """
                ]
            , Styled.outro
            ]
        ]
        |> toUnstyled
