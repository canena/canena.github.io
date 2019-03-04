module Blog.TypeScriptVsTheRealWorld exposing (decodeModel, main, meta, view)

import Data.Meta exposing (Meta)
import Html
import Html.Styled exposing (text, toUnstyled)
import Json.Decode as Decode exposing (Decoder, Value)
import Markup
import Route exposing (Route(..), Slug(..))
import Styled
import Tagging exposing (Tag(..))
import Time.Date as Date exposing (Date)


tagline : String
tagline =
    "On making informed decisions in frontend development"


meta : Meta
meta =
    { abstract = Just tagline
    , abstractTagline = Nothing
    , date = Date.date 2019 3 4
    , route = Article Blog_2019_03_04_typescript_vs_the_real_world
    , tags =
        [ Elm
        , Tech
        , Web
        ]
    , title = "TypeScript vs the Real World"
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
                [ Styled.intro "TypeScript vs The Real World" tagline
                , Styled.frontmatter Nothing meta.tags
                , Styled.articleHeader meta.abstractTagline Nothing
                ]
            , Styled.mainContent
                [ Styled.articleContent
                    (List.concat
                        [ Markup.toHtml intro
                        , Markup.toHtml content
                        ]
                    )
                ]
            ]
        , Styled.outro
        ]
        |> toUnstyled


intro : String
intro =
    """

This started out as a YouTube comment on a talk about [TypeScript](https://www.typescriptlang.org) that got out of control in scope so I created a blog post instead.

    """


content : String
content =
    """

Go watch [Why I Was Wrong About TypeScript](https://youtu.be/AQOEZVG2WY0).

### Questions You Should Be Asking Yourself

The speaker largely highlights positive aspects of TypeScript. How many technologies do you know that have no flaws? TS obviously has a lot of benefits but here are some questions I would put up for discussion that nobody seems to talk about:

1) How accurate do you think bolted on type descriptions are, especially for obscure libraries/APIs? For your own codebase written in TS that is probably not a big deal because it actually has a chance to know the types. At least until you hit the edges of your system or your ability to correctly configure the compiler. This is why many libraries move to TS right now (webpack, jest, ...)
2) As a former/acting JavaScript developer: how reliant are you on these types that might not be accurate? I have a feeling many people trust their autocomplete without thinking twice about it, do you have automated machinery in place to verify that? You need to for the possibility that the typings might be lying.
3) As a non-JS initiate finally using a "real" language for frontend: the things in (2) also apply here but with a huge caveat on top. Your intuition is colored by what tech you're used to. Coming from JS you might know that say i.e. "class" works differently under the hood than it does in other languages. Your average non-JS developer will see "class" and assume to know how it works rather than learn what it actually does. The same is true for all the module systems out there, they see "import ... from" and the template they're using will abstract that away with webpack/rollup/whatever. They probably won't understand what UMD/CommonJS/AMD/pick-your-poison is and you need to account for that. Especially when the tooling induces high confidence in questionable assumptions. Note that this also applies to devs who only have green field experience without ever having touched "old" JavaScript.
4) Speaking of old JavaScript: how many of your business apps still support IE/the-current-black-sheep-of-the-browser-family? TS does understand compile targets but it has no notion of browser compatibility as of writing this. You need to know about this, do you verify that other team members also do? Do you know what that funny "use strict"; does? Do you think your backend colleague knows? Or the green field developer? This is not specific to TS but applies to all compile-to-js flavors. "Just add a polyfill" you might say. Do you actually comprehend what they're doing and what implications there are in these huge dependencies that need to be maintained? Do you pull x KB for Set/Map when you might not be using them? Do you know the difference between "babel-polyfill" and "babel-runtime" and the pros and cons? Do you verify that this knowledge is not arcane incantation to your team? Do people know that async/await abstracts over promises and generators? All of these need to be polyfilled to some extent even in more modern browsers, how fun is it to debug a generated regenerator state machine? How many of the same polyfills linger inside your app through transitive dependencies? Again this isn't TS specific but the nice tooling tricks you into a false sense of "If it compiles it works" security and you need to account for that.
5) TS is a superset of JS, which is prominently pointed out as the dominating factor in its adoption success story. Personally I'm quite horrified by this. True, you can use the shiniest new language features and it seems they learned from the decorator fiasco and only implement TC39 finished features. What TC39 will never do is remove features from the language for realistic use cases. You will need to support browsers that don't support "type=module" scripts for the foreseeable future and even if you don't to keep up with the hype train you will still need polyfills for ES.Next features. What it also means is that TS is committed to implement all, let me repeat that, all new JS features. JS as it is now is a hot mess of good and really ugly parts and all TC39 will do is add to that. Do you feel confident to keep up with that? I myself am not so sure. How about we add all the TS language/setup/configuration on top? Doesn't sound easier to me.
6) Which brings me to the "just rename js to ts" fallacy. For an experienced developer that might be the case. Regardless of it being a superset of JS it is its own language that evolves on its own. I don't usually see projects moving to TS just to stay inside the JS subset, I mean you totally can but that's not what seems to be the normal thing to do. So mastering the language is inevitably tied to JS so in order to master TS you also need to master JS. For many people coming from a non-JS background the main selling point is to get away from JS. I don't see how this makes sense to anybody. If your answer is tooling: fair point but then why not use JS with good tooling i.e. VS Code, eslint, ...? If your answer is "TS is better": it won't be "just rename js to ts" for long, I guess?
7) Not restricted to TS the amount of dependencies, setup and configuration handling a real world project in "normal" JS based SPA frontends is rather complex. There are two popular ways to tackle this where you get a working setup - that is so complex that hardly anyone understands them. Angular goes the cli route, maintaining huge compatibility maps for dependencies and auto generating code. In the React world templates like "create-react-app" dominate. This can work well enough up to some point. Both approaches leave you with thousands of at best development dependencies and at worst ones that run as part of your production code. These all have to be maintained, are you in for constant dependency upgrades of modules you don't have a choice to use? How confident are you that nobody slipped in some malicious code via [NPM](https://npmjs.com)?
8) Regarding build pipelines: while I think that JSX/TSX is neat from a tech perspective I don't think the benefits outweigh the cons. Sure you couple your view code with HTML templates with a custom dsl the same as you do in JSX and the angle brackets help the view code to stand out visually. How do you make sure you don't conflate business logic with view logic when everything has to be and will be a hammer, ehm, component? Did you know that it's perfectly possible to use React/Inferno/whatever without JSX removing the need for a compile step? I wouldn't be surprised and wouldn't blaim you if you didn't. For some reason that eludes me I have never seen a React project using plain functions. I get that people like JSX since it can be used with many libraries/frameworks with Babel or the like. So did you actually make the informed choice to use a build pipeline weighing the pros and cons or did your library make that choice for you?

### Alternatives
Alternatives to consider if you can't answer the posed questions confidently:

#### The Ancient Route
Single Page Applications are all the rage and have become the de-facto standard for any webpage. I suggest that once in a while you stop and think about whether a simple server side solution might be the better option for some use cases.

#### The Boring Route
Move the build pipeline in your mental list from "necessary" to "do I really need this?". Pick a handful of small, boring libraries where you can actually evaluate and judge the dependency and security implications. Supposedly "dead" JS projects might just be feature complete and don't need constant dependency upgrades if they don't have any. Default to using syntax/features your baseline environment supports natively. No sourcemaps necessary, no elaborate dev server setup that needs to be maintained. There are eslint plugins that help you to stay in your language subset. You could even skip the build step for production by using CommonJS with [require.js](https://requirejs.org), with http2 on the horizon this will probably perform better than your average bundled Frankenstein's Monster Script app, but you'll need to be the judge of that for your case.

There is also a middle ground solution: use a well known subset of TS/whatever that you compile to CommonJS. For me this isn't necessary since Visual Studio Code with the right settings will gladly check your JS with its TS language server with astonishing results. You should try that, too.

Boring example setups:

* [Mithril.js](https://mithril.js.org) + require.js/browserify/rollup
* React (-JSX -class) + require.js/browserify/rollup

#### Fancier
Use a compile-to-js language that has fewer of these problems, personally I'd give [Elm](https://elm-lang.org) a try. Since version 0.19 Elm packages can only contain constants and pure functions actually written in Elm. The usual test setup and much of the tooling outside of the compiler still relies on JS via NPM for now but the code that Elm produces for production is the small runtime it brings and the rest is JS that the compiler has build from constants an pure functions. If you need to interact with JS - and you most likely will - it's via typed ports to and from Elm. This is probably as close to "if it compiles it works" as you can get inside a browser environment. Bonus: Elm's unique design choices accomplish way higher confidence levels with a simpler type system than TS. Note that as a comparatively young language it is still in flux to some extent, again you have to be the judge of what tools to use. I definitely recommend to give it a try.

### Conclusion
For me the key is to make active choices in technology - just because Facebook or Google does something doesn't necessarily mean it's the right thing for your project. Don't forget to re-evaluate your baseline assumptions and make new decisions based on that regularly, the web moves kind of fast.

    """
