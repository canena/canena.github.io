module Posts exposing (main)

import Elmstatic
import Html exposing (a, h2, li, p, text, ul)
import Html.Attributes as Attr exposing (class, href)
import Page
import Post


main : Elmstatic.Layout
main =
    let
        postItem post =
            li [ class "post-list__item" ]
                [ a [ href ("/" ++ post.link) ] [ h2 [] [ text post.title ] ]
                , Post.metadataHtml post
                ]

        postListContent posts =
            if List.isEmpty posts then
                [ text "No posts yet!" ]

            else
                List.map postItem posts

        sortPosts posts =
            List.sortBy .date posts
                |> List.reverse
    in
    Elmstatic.layout Elmstatic.decodePostList <|
        \content ->
            Page.layout content.title
                [ p []
                    [ text
                        """
Hello, There! This is my personal blog covering various topics from music to design, programming, life itself and more.
                        """
                    ]
                , ul [ class "post-list" ]
                    (sortPosts content.posts |> postListContent)
                ]
