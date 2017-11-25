module Index exposing (decodeModel, view)

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
    Styled.toplevelPageFrame []
        [ text ("Hello " ++ model.who ++ "!")
        ]
        |> toUnstyled
