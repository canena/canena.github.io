module Blog.EpicLinks exposing (decodeModel, main, meta, view)

import Data.Meta exposing (Meta)
import Html
import Html.Styled exposing (fromUnstyled, text, toUnstyled)
import Json.Decode as Decode exposing (Decoder, Value)
import Markdown
import Route exposing (Route(..), Slug(..))
import Styled
import Tagging exposing (Tag(..))
import Time.Date as Date exposing (Date)


meta : Meta
meta =
    { abstract =
        Just
            """
        A collection of links that I found useful, inspired me and may bring
        you enjoyment and/or enlightenment as well.
        """
    , abstractTagline = Just "Changing my view on anything"
    , date = Date.date 2017 3 20
    , route = Article Blog_2017_03_20_epic_links
    , tags =
        [ Learning
        , Music
        , Selfimprovement
        , Tech
        ]
    , title = "Epic Links"
    }


decodeModel : Decoder Model
decodeModel =
    Decode.map Model
        (Decode.field "who" Decode.string)


main : Program Never Model ()
main =
    Html.beginnerProgram
        { model =
            { who = "No-One"
            }
        , update = \_ model -> model
        , view = view
        }


type alias Model =
    { who : String
    }


view : Model -> Html.Html ()
view model =
    Styled.layout []
        [ Styled.layoutMain []
            [ Styled.mainHeader []
                [ Styled.intro "Epic Links" "My inspirations on the web"
                , Styled.frontmatter Nothing meta.tags
                , Styled.articleHeader meta.abstractTagline meta.abstract
                ]
            , Styled.mainContent
                [ Markdown.toHtml [] sectionDisclaimer |> fromUnstyled
                , Markdown.toHtml [] sectionGroupArticles |> fromUnstyled
                , Markdown.toHtml [] sectionGroupTalks |> fromUnstyled
                ]
            , Styled.outro
            ]
        ]
        |> toUnstyled


sectionDisclaimer : String
sectionDisclaimer =
    """

<h3>Disclaimer</h3>

I'm not in any way affiliated with the following links, I just find them useful, delightful, funny...


    """


sectionGroupArticles : String
sectionGroupArticles =
    """

<h3>Articles</h3>

<h4>Learning</h4>

<ul>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://aeon.co/essays/the-terror-and-the-bliss-of-sleep-paralysis" target="_blank">The Terror and the Bliss of Sleep Paralysis</a></li>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://aeon.co/essays/why-broken-sleep-is-a-golden-time-for-creativity" target="_blank">Why broken sleep is a golden time for creativity</a></li>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://aeon.co/essays/why-pregnancy-is-a-biological-war-between-mother-and-baby" target="_blank">Why Pregnancy is a Biological War Between Mother and Baby</a></li>
</ul>


<h4>Music</h4>

<ul>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://pudding.cool/2017/03/music-history/index.html" target="_blank">How Music Evolved: Billboard's Hot 100, 1958 - 2016</a></li>
</ul>


<h4>Reading</h4>

<ul>
    <li><span class="ui-content__last-update">[2017-03-20]</span>
        <a href="http://www.asimovonline.com/oldsite/asimov_titles.html" target="_blank">A List of Isaac Asimov's Books</a>
    </li>
    <li><span class="ui-content__last-update">[2017-03-20]</span>
        <a href="http://www.depauw.edu/sfs/backissues/5/lem5art.htm" target="_blank">Stanislaw Lem: Philip K. Dick: A Visionary Among the Charlatans</a>
    </li>
</ul>


<h4>Tech</h4>

<ul>
    <li><span class="ui-content__last-update">[2017-03-20]</span>
        <a href="http://fabiensanglard.net/anotherWorld_code_review/index.php" target="_blank">Another World Code Review</a>
    </li>
    <li><span class="ui-content__last-update">[2017-03-20]</span>
        <a href="http://lea.verou.me/css3patterns/" target="_blank">CSS3 Patterns Gallery</a>
    </li>
    <li><span class="ui-content__last-update">[2017-03-20]</span>
        <a href="https://css-tricks.com/dont-overthink-it-grids/" target="_blank">Don't overthink it grids</a>
    </li>
    <li><span class="ui-content__last-update">[2017-03-20]</span>
        <a href="https://www.lightningdesignsystem.com/getting-started/" target="_blank">Lightning Design System</a>
        <em>
            I'm not a fan of salesforce but their BEM design system is inspired.
        </em>
    </li>
    <li><span class="ui-content__last-update">[2017-03-20]</span>
        <a href="http://dev.stephendiehl.com/hask/" target="_blank">What I wish I knew when learning Haskell</a>
    </li>
</ul>

    """


sectionGroupTalks : String
sectionGroupTalks =
    """

<h3>Talks</h3>

<h4>Learning</h4>

<ul>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://www.youtube.com/watch?v=5MgBikgcWnY" target="_blank">The first 20 hours -- how to learn anything | Josh Kaufman</a></li>
</ul>

<h4>Tech</h4>

<ul>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://www.youtube.com/watch?v=TMuno5RZNeE" target="_blank">Bob Martin SOLID Principles of Object Oriented and Agile Design</a></li>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://www.youtube.com/watch?v=ecIWPzGEbFc" target="_blank">"Uncle" Bob Martin - "The Future of Programming"</a></li>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://www.youtube.com/watch?v=ZhuHCtR3xq8" target="_blank">Brian Beckman: Don't fear the Monad</a></li>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://www.youtube.com/watch?v=lE6Hxz4yomA" target="_blank">Eric Evans: What I've learned about DDD since the book</a></li>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://www.youtube.com/watch?v=oYk8CKH7OhE" target="_blank">Evan Czaplicki - Let's be mainstream! User focused design in Elm - Curry On</a></li>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://www.youtube.com/watch?v=KSuCYUqY058" target="_blank">Evan Czaplicki - elm-autocomplete with Greg Ziegan (API Design Session)</a></li>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://www.youtube.com/watch?v=looJcaeboBY" target="_blank">Expert to Expert: Brian Beckman and Erik Meijer - Inside the .NET Reactive Framework (Rx)</a></li>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://www.youtube.com/watch?v=LDW0QWie21s" target="_blank">Greg Young — A Decade of DDD, CQRS, Event Sourcing</a></li>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://www.youtube.com/watch?v=JHGkaShoyNs" target="_blank">Greg Young - CQRS and Event Sourcing - Code on the Beach 2014</a></li>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://www.youtube.com/watch?v=KaLROwp-VDY" target="_blank">Greg Young - "How to get productive in a project in 24h"</a></li>
    <li><span class="ui-content__last-update">[2017-03-20]</span><a href="https://www.youtube.com/watch?v=IcgmSRJHu_8" target="_blank">Richard Feldman - "Making Impossible States Impossible" </a></li>
</ul>

    """
