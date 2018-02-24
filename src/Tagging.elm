module Tagging exposing (Tag(..), allTags, makeReadable)


type Tag
    = Design
    | Elm
    | Learning
    | LegacyCode
    | Life
    | Misc String
    | Music
    | Selfimprovement
    | Tech
    | Web
    | Writing



-- Misc intentionally omitted


allTags : List Tag
allTags =
    [ Elm
    , Design
    , Learning
    , LegacyCode
    , Life
    , Music
    , Selfimprovement
    , Tech
    , Web
    , Writing
    ]


makeReadable : Tag -> String
makeReadable tag =
    case tag of
        Misc topic ->
            topic

        _ ->
            toString tag
