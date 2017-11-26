module Blog.MakingAHabitOfMakingAHabit exposing (decodeModel, main, meta, view)

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
    { abstract = Just
        """
        This post about my struggle of forming habbits. This is my very first blog post I'm republishing here on my blog.
        """
    , abstractTagline = Nothing
    , date = Date.date 2015 8 4
    , route = Article Blog_2015_08_04_making_a_habit_of_making_a_habit
    , tags =
        [ Life
        , SelfImprovement
        , Writing
        ]
    , title = "Making a habit of making a habit"
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
                [ Styled.intro
                      "Habbits are a tricky thing"
                      "Intentionally left blank"
                , Styled.frontmatter meta.tags
                , Styled.articleHeader meta.abstractTagline meta.abstract
                ]
            , Styled.mainContent
                [ Markdown.toHtml [] legacyContent |> fromUnstyled
                ]
            ]
        , Styled.outro
        ]
        |> toUnstyled


legacyContent : String
legacyContent =
    """

<h3>Making a habit of making a habit</h3>

<p>
Lately I’ve been thinking a lot about writing and whether I could do it myself. “Yes, I could do it if I really wanted” is what I’d tell the spectre in the mirror. I just always had the nagging feeling that I didn’t care enough so the outcome surely wouldn’t be worth the digital ink. I’d be jealous of the interesting stuff people have to say and the sense of style that would let me almost inhale their stories at times. Why is it that I couldn’t start something? After reading tons and tons of “How I started …” I realized that to start something you — well, actually have to start. That’s a scary thing. For me and everyone else, it seems. The problem with learning new things is that the stuff you do first is likely to be not up to par with your own expectations. Can’t I skip the “early works” part and get to The Good Stuff already? I’m sure everyone has the feeling that what they do isn’t good enough once in a while. Time to get started, but where?
</p>

<p>
There’s talk about making a habit of your interests — doing things consistently every day/week/month for X days. I actually have quite a few interests and I’m not sure how to balance all of them. Sometimes I’m so scared of not getting things right that I don’t get them started at all. There are a couple of instruments waiting to be played, some stories to be told, a workout that’s to be done, a painting or two that only exist in my mind, so many movies to be enjoyed, a cornucopia of books that need to be read, a million places to travel to. And they’re staring at me all the time and I can almost hear their thoughts — certainly, they’re disappointed in me for not caring enough. No use in even trying when you are sure that it’d never amount to something special, right? Now a thought comes to my mind, blurry and ominous: I am finally writing on a topic that bugs me. That’s a start.
</p>


<p>
You need to know something about me: In my personal life I’m not fond of making plans. At. All. Something inside me is disgusted at the idea that I’d need a plan to live. Even stranger is the fact that in my dayjob it’s quite the opposite. And the reason is that when I’m working I want to get things done and over time developed a mindset of accepting that perfection can’t be achieved — ninety percent of something is far better than a hundred percent of nothing. A friend of mine once brought this dichotomy to my mind and I was utterly stunned. Why is it that eight hours a day, five days a week this totally makes sense and the rest of the time the idea is an abomination? To break the cycle I guess I’ll need a schedule of sorts, at least that’s what every source on the topic suggests. And I need to get used to the notion that having a list of todos and working on habits for your private life doesn’t mean you’re a failure. Besides, I did make a habit of reading about improving my life, now that I think about it.
</p>


<p>
I’m puzzled that this article almost wrote itself — feels like I’m just a bystander witnessing a miraculous celestial event, my own personal blood moon if you will, it’s not a solar eclipse yet. Maybe getting things done isn’t that hard, maybe it’s just overthinking. Maybe I’ll start with small steps.
It won’t be perfect. It will get better. It will get easier.
</p>


<p>
With time.
</p>

    """
