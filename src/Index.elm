module Index exposing (decodeModel, view)

import Html exposing (Html)
import Json.Decode as Decode exposing (Decoder, Value)


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


view : Model -> Html Msg
view model =
    Html.text ("Hello " ++ model.who ++ "!")
