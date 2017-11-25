module Data.Meta exposing (Meta)


import Route exposing (Route)
import Tagging exposing (Tag)
import Time.Date as Date exposing (Date)


type alias Meta =
    { abstract : Maybe String
    , abstractTagline : Maybe String
    , date : Date
    , route : Route
    , tags : List Tag
    , title : String
    }
