module Tagging exposing (Tag(..), allTags, makeReadable)


type Tag
    = Design
    | Learning
    | Life
    | Misc String
    | Music
    | Selfimprovement
    | Tech
    | Writing



-- Misc intentionally omitted


allTags : List Tag
allTags =
    [ Design
    , Learning
    , Life
    , Music
    , Selfimprovement
    , Tech
    , Writing
    ]


makeReadable : Tag -> String
makeReadable tag =
    case tag of
        Misc topic ->
            topic

        _ ->
            toString tag
