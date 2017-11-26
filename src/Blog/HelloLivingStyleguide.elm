module Blog.HelloLivingStyleguide exposing (decodeModel, main, meta, view)

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
        This is the living documentation for my own little set of responsive Block Element Modifier (BEM) based CSS layout blocks being used throughout my blog. Don't expect any content here :-).
        """
    , abstractTagline = Just "A Living Styleguide"
    , date = Date.date 2017 1 18
    , route = Article Blog_2017_01_18_hello_living_styleguide
    , tags =
        [ Misc "BEM"
        , Misc "HTML"
        ]
    , title = "A Living Styleguide"
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
                [ Styled.intro "Some Grand Intro" "And Subscript"
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

<div class="ui-grid__row">
    <section class="ui-grid__col-8 ui-article-list">
        <h3>Recent posts</h3>
        <ul>
            <li class="ui-article-list__item">
                <article class="ui-article-preview">
                    <h4 class="ui-article-preview__title">
                        <a href="#">Second post</a>
                        </h4>
                    <p class="ui-article-preview__abstract">
                        The first lines of this post that gives the reader an idea what to expect from this post.
                    </p>
                    <ul class="ui-article-preview__tags">
                        <li>
                            <div class="ui-tag">
                                <a href="#" class="ui-tag__label">Some tag</a>
                            </div>
                        </li>
                        <li>
                            <div class="ui-tag">
                                <a href="#" class="ui-tag__label">Another tag</a>
                            </div>
                        </li>
                    </ul>
                    <div class="ui-article-preview__date">Wednesday 2017-02-01</div>
                    <a href="#" class="ui-button">
                        <span class="ui-button__label">
                            Read More...
                        </span>
                    </a>
                </article>
            </li>
            <li class="ui-article-list__item">
                <article class="ui-article-preview">
                    <h4 class="ui-article-preview__title"><a href="#">First post</a></h4>
                    <p class="ui-article-preview__abstract">
                        The first lines of this post that gives the reader an idea what to expect from this post.
                    </p>
                    <ul class="ui-article-preview__tags">
                        <li>
                            <div class="ui-tag">
                                <a href="#" class="ui-tag__label">Some tag</a>
                            </div>
                        </li>
                        <li>
                            <div class="ui-tag">
                                <a href="#" class="ui-tag__label">Another tag</a>
                            </div>
                        </li>
                    </ul>
                    <div class="ui-article-preview__date">Wednesday 2017-02-01</div>
                    <a href="#" class="ui-button">
                        <span class="ui-button__label">
                            Read More...
                        </span>
                    </a>
                </article>
            </li>
            <li class="ui-article-list__item">
                <article class="ui-article-preview x-ui-article-preview--size-compact">
                    <h4 class="ui-article-preview__title">
                        <a href="#">An older post with a really long title that just might wrap around</a>
                    </h4>
                    <p class="ui-article-preview__abstract">
                        The first lines of this post that gives the reader an idea what to expect from this post.
                    </p>
                    <ul class="ui-article-preview__tags">
                        <li>
                            <div class="ui-tag">
                                <a href="#" class="ui-tag__label">Some tag</a>
                            </div>
                        </li>
                        <li>
                            <div class="ui-tag">
                                <a href="#" class="ui-tag__label">Another tag</a>
                            </div>
                        </li>
                    </ul>
                    <div class="ui-article-preview__date">Wednesday 2017-02-01</div>
                    <a href="#" class="ui-button">
                        <span class="ui-button__label">
                            Read More...
                        </span>
                    </a>
                </article>
            </li>
            <li class="ui-article-list__item">
                <article class="ui-article-preview x-ui-article-preview--size-compact">
                    <h4 class="ui-article-preview__title">
                        <a href="#">An even older post</a>
                    </h4>
                    <p class="ui-article-preview__abstract">
                        The first lines of this post that gives the reader an idea what to expect from this post.
                    </p>
                    <ul class="ui-article-preview__tags">
                        <li>
                            <div class="ui-tag">
                                <a href="#" class="ui-tag__label">Some tag</a>
                            </div>
                        </li>
                        <li>
                            <div class="ui-tag">
                                <a href="#" class="ui-tag__label">Another tag</a>
                            </div>
                        </li>
                    </ul>
                    <div class="ui-article-preview__date">Wednesday 2017-02-01</div>
                    <a href="#" class="ui-button">
                        <span class="ui-button__label">
                            Read More...
                        </span>
                    </a>
                </article>
            </li>
            <li class="ui-article-list__item">
                <article class="ui-article-preview x-ui-article-preview--size-compact">
                    <h4 class="ui-article-preview__title">
                        <a href="#">The oldest post</a>
                    </h4>
                    <!--
                    <p class="ui-article-preview__abstract">
                        The first lines of this post that gives the reader an idea what to expect from this post.
                    </p>
                    -->
                    <ul class="ui-article-preview__tags">
                        <li>
                            <div class="ui-tag">
                                <a href="#" class="ui-tag__label">Some tag</a>
                            </div>
                        </li>
                        <li>
                            <div class="ui-tag">
                                <a href="#" class="ui-tag__label">Another tag</a>
                            </div>
                        </li>
                    </ul>
                    <!--
                    <div class="ui-article-preview__date">Wednesday 2017-02-01</div>
                    -->
                    <a href="#" class="ui-button">
                        <span class="ui-button__label">
                            Read More...
                        </span>
                    </a>
                </article>
            </li>
        </ul>
    </section>
    <div class="ui-grid__col-4">
        <section class="ui-tag-cloud">
            <h3>Sidebar with Tags</h3>
            <p>
                Some info.
            </p>
            <ul>
                <li>
                    <div class="ui-tag">
                        <a href="#" class="ui-tag__label">Some tag</a>
                    </div>
                </li>
                <li>
                    <div class="ui-tag">
                        <a href="#" class="ui-tag__label">Another tag</a>
                    </div>
                </li>
            </ul>
        </section>

    </div>
</div>

<section>
    <div class="ui-grid__row">
        <div class="ui-grid__col-12">
            <h3>Grid</h3>
            <p>
                The default grid is using up to 12 flexbox columns.
            </p>
        </div>
    </div>

    <div class="ui-grid__row">
        <div class="ui-grid__col-1">
            Col-1
        </div>
        <div class="ui-grid__col-11">
            Col-11
        </div>
    </div>

    <div class="ui-grid__row">
        <div class="ui-grid__col-2">
            Col-2
        </div>
        <div class="ui-grid__col-10">
            Col-10
        </div>
    </div>

    <div class="ui-grid__row">
        <div class="ui-grid__col-3">
            Col-3
        </div>
        <div class="ui-grid__col-9">
            Col-9
        </div>
    </div>

    <div class="ui-grid__row">
        <div class="ui-grid__col-4">
            Col-4
        </div>
        <div class="ui-grid__col-8">
            Col-8
        </div>
    </div>

    <div class="ui-grid__row">
        <div class="ui-grid__col-5">
            Col-5
        </div>
        <div class="ui-grid__col-7">
            Col-7
        </div>
    </div>

    <div class="ui-grid__row">
        <div class="ui-grid__col-6">
            Col-6
        </div>
        <div class="ui-grid__col-6">
            Col-6
        </div>
    </div>

    <div class="ui-grid__row">
        <div class="ui-grid__col-7">
            Col-7
        </div>
        <div class="ui-grid__col-5">
            Col-5
        </div>
    </div>

    <div class="ui-grid__row">
        <div class="ui-grid__col-8">
            Col-8
        </div>
        <div class="ui-grid__col-4">
            Col-4
        </div>
    </div>

    <div class="ui-grid__row">
        <div class="ui-grid__col-9">
            Col-9
        </div>
        <div class="ui-grid__col-3">
            Col-3
        </div>
    </div>

    <div class="ui-grid__row">
        <div class="ui-grid__col-10">
            Col-10
        </div>
        <div class="ui-grid__col-2">
            Col-2
        </div>
    </div>

    <div class="ui-grid__row">
        <div class="ui-grid__col-11">
            Col-11
        </div>
        <div class="ui-grid__col-1">
            Col-1
        </div>
    </div>

    <div class="ui-grid__row">
        <div class="ui-grid__col-12">
            Fullsize (col-12)
        </div>
    </div>
</section>

<div class="ui-grid__row">
    <section class="ui-grid__col-6">
        <h3>Buttons</h3>
        <p>
            Inline tex with

            <button class="ui-button">
                <span class="ui-button__label">Real Button Button</span>
            </button>

            <button class="ui-button ui-button--primary">
                <span class="ui-button__label">Primary Button</span>
            </button>

            <button class="ui-button ui-button--secondary">
                <span class="ui-button__label">Secondary Button</span>
            </button>

            <a href="#" class="ui-button">
                <span class="ui-button__label">Link Button</span>
            </a>

            <button class="ui-button ui-button--disabled" disabled="disabled">
                <span class="ui-button__label">Inactive Button</span>
            </button>
        </p>
    </section>
    <section class="ui-grid__col-6">

        <form class="ui-form">
            <h3>Forms</h3>

            <label class="ui-form__group">
                <span class="ui-form__group-label">Simple Textinput</span>
                <input class="ui-form__text" type="text" name="simple-text" placeholder="Simple text..." value="">

                <button type="submit" class="ui-button">
                    <span class="ui-button__label">OK</span>
                </button>
            </label>

            <label class="ui-form__group">
                <input class="ui-form__checkbox" type="checkbox"
                name="check1"
                >
                <span class="ui-form__group-label">Simple Checkbox</span>
            </label>

            <label class="ui-form__group">
                <input class="ui-form__checkbox ui-form__checkbox--disabled" type="checkbox"
                name="check2" disabled="disabled">
                <span class="ui-form__group-label">Simple Checkbox</span>
            </label>

            <label class="ui-form__group">
                <input class="ui-form__radio" type="radio"
                name="radio1"
                value="value1"
                >
                <span class="ui-form__group-label">Option 1</span>
            </label>

            <label class="ui-form__group">
                <input class="ui-form__radio" type="radio"
                name="radio1"
                value="value2"
                >
                <span class="ui-form__group-label">Option 2</span>
            </label>

            <label class="ui-form__group">
                <input class="ui-form__radio ui-form__radio--disabled" disabled="disabled" type="radio"
                name="radio1"
                value="value3"
                >
                <span class="ui-form__group-label">Option 2</span>
            </label>

            <label class="ui-form__group">
                <span class="ui-form__group-label">Some text</span>
                <textarea class="ui-form__textarea" 
                name="textarea"
                value="value2"
                ></textarea>
            </label>

            <label class="ui-form__group">
                <span class="ui-form__group-label">Some text</span>
                <select name="select1" class="ui-form__select">
                    <option value="1">1</option>
                    <optgroup label="Section 2">
                        <option value="2.1">2.1</option>
                        <option value="2.2">2.2</option>
                    </optgroup>
                    <optgroup label="Section 3">
                        <option value="3.1">3.1</option>
                        <option value="3.2">3.2</option>
                        <option value="3.3">3.3</option>
                    </optgroup>
                </select>
            </label>

            <button type="submit" class="ui-button">
                <span class="ui-button__label">Submit</span>
            </button>
        </form>

    </section>
</div>

    """
