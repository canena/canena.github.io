module Tagging exposing (Tag(..), allTags, makeReadable)

type Tag
    = Learning
    | Music
    | SelfImprovement
    | Tech


allTags : List Tag
allTags =
    [ Learning
    , Music
    , SelfImprovement
    , Tech
    ]

makeReadable : Tag -> String
makeReadable tag =
    toString tag
