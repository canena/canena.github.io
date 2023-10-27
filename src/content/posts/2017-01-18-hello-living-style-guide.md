---
title: Hello Living Style Guide
subtitle: This is the living documentation for my own little set of responsive Block Element Modifier (BEM) based CSS layout blocks
description: This is the living documentation for my own little set of responsive Block Element Modifier (BEM) based CSS layout blocks
publishedAt: 2017-01-18
githubIssue: 22
readingTime: 2min
tags: [bem, html]
---

<!-- Originally conceived on top of <link href="/cdn/normalize-8.0.1.css" rel="stylesheet" type="text/css"> -->
<!-- See /cdn/less/living-styleguide.less for source files -->
<style>/*@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');*/.ui-abstract__title{font-size:16px}.ui-article-list ul{list-style:none;margin:0;padding:0}.ui-article-preview a{display:block}.ui-article-preview__tags{font-size:0;list-style:none;margin:0 0 10px 0;padding:0}.ui-article-preview__tags li{display:inline-block;font-size:16px;margin-right:4px}.ui-article-preview .ui-button{float:right;margin-top:4px}.ui-button{background:#fff;border:none;border-color:transparent;box-shadow:none;cursor:pointer;display:inline-block;font-size:0;line-height:16px;outline:none;outline-style:none;position:relative;text-decoration:none}.ui-button--disabled{cursor:not-allowed;opacity:.6}.ui-button:active,.ui-button:focus{box-shadow:#000 0 0 3px}.ui-button__label{color:#333;display:block;font-size:16px}.ui-content a[href^="ftp://"]:after,.ui-content a[href^="ftps://"]:after,.ui-content a[href^="http://"]:after,.ui-content a[href^="https://"]:after{content:" (⇑)";font-size:14px;line-height:16px}.ui-content__last-update{display:inline-block;margin-right:5px}.ui-form__group{display:block;position:relative}.ui-form__group .ui-button{vertical-align:top}.ui-form__group-label{display:block;font-size:14px;font-weight:bold}.ui-form__text{display:inline-block}.ui-form__textarea{display:block;width:100%;resize:vertical}.ui-form__checkbox{margin-top:1px;position:absolute;width:20px}.ui-form__checkbox--disabled{cursor:not-allowed}.ui-form__checkbox--disabled+.ui-form__group-label{cursor:not-allowed}.ui-form__checkbox+.ui-form__group-label{display:inline-block;font-weight:normal;margin-left:24px;vertical-align:top}.ui-form__radio{margin-top:1px;position:absolute;width:20px}.ui-form__radio--disabled{cursor:not-allowed}.ui-form__radio--disabled+.ui-form__group-label{cursor:not-allowed}.ui-form__radio+.ui-form__group-label{display:inline-block;font-weight:normal;margin-left:24px;vertical-align:top}.ui-grid__col-1{font-size:16px;padding-left:20px;padding-right:20px}.ui-grid__col-2{font-size:16px;padding-left:20px;padding-right:20px}.ui-grid__col-3{font-size:16px;padding-left:20px;padding-right:20px}.ui-grid__col-4{font-size:16px;padding-left:20px;padding-right:20px}.ui-grid__col-5{font-size:16px;padding-left:20px;padding-right:20px}.ui-grid__col-6{font-size:16px;padding-left:20px;padding-right:20px}.ui-grid__col-7{font-size:16px;padding-left:20px;padding-right:20px}.ui-grid__col-8{font-size:16px;padding-left:20px;padding-right:20px}.ui-grid__col-9{font-size:16px;padding-left:20px;padding-right:20px}.ui-grid__col-10{font-size:16px;padding-left:20px;padding-right:20px}.ui-grid__col-11{font-size:16px;padding-left:20px;padding-right:20px}.ui-grid__col-12{font-size:16px;padding-left:20px;padding-right:20px}.ui-grid__row{display:block;font-size:0;justify-content:space-between;position:relative;margin-left:-20px;margin-right:-20px}.ui-grid__row--static{display:flex}@media (min-width:768px){.ui-grid__col-1{width:8.33333333%}.ui-grid__col-2{width:16.66666667%}.ui-grid__col-3{width:25%}.ui-grid__col-4{width:33.33333333%}.ui-grid__col-5{width:41.66666667%}.ui-grid__col-6{width:50%}.ui-grid__col-7{width:58.33333333%}.ui-grid__col-8{width:66.66666667%}.ui-grid__col-9{width:75%}.ui-grid__col-10{width:83.33333333%}.ui-grid__col-11{width:91.66666667%}.ui-grid__col-12{width:100%}.ui-grid__row{display:flex}}.ui-header{font-size:0;font-weight:bold;list-style:none;margin:0;padding:0}.ui-header__logo{display:inline-block;font-size:20px;position:relative;vertical-align:top}.ui-header__menu-item{display:inline-block;font-size:20px;position:relative;vertical-align:top}.ui-header__menu-category{color:#ddd;display:block;font-size:12px;left:16px;line-height:17px;position:absolute;top:8px;white-space:nowrap;z-index:-1}.ui-intro{min-height:100%;margin-top:-50px;position:relative}.ui-intro__label{display:block;padding-top:300px;text-align:center}.ui-intro__sub-label{display:block;font-size:.8em;font-style:italic;font-weight:normal;padding-bottom:250px;text-align:center}.ui-intro__sub-label:before{content:"«"}.ui-intro__sub-label:after{content:"»"}html.ui-layout{height:100%}html.ui-layout>body{height:100%;margin:0;min-height:100%;overflow-y:scroll;padding:0;position:relative}.ui-layout__content{margin:0 auto;max-width:970px;position:relative}.ui-layout__header{position:fixed;width:100%;z-index:100}.ui-layout__main{min-height:100%;overflow:auto;padding-bottom:0;padding-top:50px;position:relative;z-index:50}.ui-layout__footer{bottom:0;position:fixed;width:100%;z-index:90}.ui-tag{display:inline-block}.ui-tag__label{display:block;font-size:16px}.ui-tag-cloud ul{font-size:0;list-style:none;margin:0 0 20px 0;padding:0}.ui-tag-cloud li{display:inline-block;font-size:16px;margin-right:4px}body.ui-theme{margin:0;padding:0}.ui-theme{color:#333;font-size:16px}.ui-theme h1{font-size:32px;margin:0}.ui-theme h2{font-size:28px;margin:0}.ui-theme h3{font-size:24px;margin:0}.ui-theme h4{font-size:20px;margin:0}.ui-theme h5{font-size:16px;margin:0}.ui-theme h6{font-size:12px;margin:0}.ui-theme *,.ui-theme *:after,.ui-theme *:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.ui-theme p{margin:16px 0}.ui-theme abbr{cursor:help;position:relative;text-decoration:none}.ui-theme abbr:before{border-bottom:#333 1px dotted;bottom:0;content:" ";display:block;left:0;position:absolute;right:0;width:100%}.ui-user__avatar{border-radius:60px}.ui-theme--canena{font-family:'Roboto Condensed',Verdana,Geneva,Tahoma,sans-serif}.ui-theme--canena h1{margin-bottom:10px}.ui-theme--canena h2{margin-bottom:8px}.ui-theme--canena h3{margin-bottom:6px}.ui-theme--canena h4{margin-bottom:4px}.ui-theme--canena .ui-frontmatter{margin-top:-38px;min-height:48px}.ui-theme--canena .ui-frontmatter__properties{color:#d9d9d9;font-style:italic;line-height:34px;margin-right:130px;text-shadow:#333 0 0 3px;white-space:nowrap}.ui-theme--canena .ui-frontmatter__properties em{font-weight:bold}.ui-theme--canena .ui-frontmatter__tags{line-height:44px;margin-right:130px;margin-top:4px;white-space:nowrap}.ui-theme--canena .ui-frontmatter .ui-tag{margin-right:6px}.ui-theme--canena .ui-frontmatter .ui-user{position:absolute;right:16px;top:-36px}.ui-theme--canena .ui-tag{background:#d84b97;border:none;border-radius:5px;border-top-left-radius:0;cursor:pointer;padding:0}.ui-theme--canena .ui-tag:not(.ui-tag--plain):hover{background:#e175af}.ui-theme--canena .ui-tag--plain{cursor:default;opacity:.8}.ui-theme--canena .ui-tag__label{color:#fff;font-size:16px;line-height:16px;padding:4px 8px;text-decoration:none}.ui-theme--canena .ui-tag__label:before{content:"●";display:inline-block;margin-right:5px;margin-top:-1px}.ui-theme--canena .ui-button{background:linear-gradient(142deg, #d84b97, #f40);border-bottom:#e32636 4px solid;font-family:'Roboto Condensed',Verdana,Geneva,Tahoma,sans-serif;line-height:30px;padding:3px 14px 0 14px}.ui-theme--canena .ui-button:active,.ui-theme--canena .ui-button:focus{box-shadow:#888 0 0 3px}.ui-theme--canena .ui-button:not(.ui-button--disabled):hover{background:#f90;border-color:#f60}.ui-theme--canena .ui-button__label{color:#fff;text-transform:uppercase}.ui-theme--canena .ui-layout__header{background:linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.4));border-top:#f60 4px solid}.ui-theme--canena .ui-layout__main{padding-bottom:0}.ui-theme--canena .ui-layout__main .ui-layout__content>.ui-grid__row{margin-bottom:20px;margin-top:20px}.ui-theme--canena .ui-layout__main .ui-grid__col{padding:10px}.ui-theme--canena .ui-layout__content{padding-left:20px;padding-right:20px}.ui-theme--canena .ui-content a:link,.ui-theme--canena .ui-content a:visited{color:#f60;text-decoration:underline}.ui-theme--canena .ui-content a:hover{color:#e32636;text-decoration:none}.ui-theme--canena .ui-content ul{padding-left:30px}.ui-theme--canena .ui-content li{margin-bottom:2.5px}.ui-theme--canena .ui-header a{border-top:transparent 4px solid;color:#f60;display:block;margin-top:-24px;padding-top:20px;padding-left:16px;padding-right:16px;text-decoration:none}.ui-theme--canena .ui-header a:hover{border-color:#ffb380;color:#ffb380}.ui-theme--canena .ui-header__menu-item{padding-bottom:6px;padding-top:20px}.ui-theme--canena .ui-header__menu-item--active a{border-color:#ffb380;color:#ffb380;cursor:default}.ui-theme--canena .ui-header__menu-item:first-child{margin-left:-16px}.ui-theme--canena .ui-header__menu-item:last-child{margin-right:-16px}.ui-theme--canena .ui-header__logo{padding-top:20px}.ui-theme--canena .ui-intro{background:url('../img/intro3.jpg') bottom right;border-bottom:#f60 4px solid}.ui-theme--canena .ui-intro__label{color:#fff;text-shadow:#333 0 0 3px}.ui-theme--canena .ui-intro__sub-label{color:#fff;text-shadow:#333 0 0 3px}.ui-theme--canena .ui-article-list__item{border-bottom:#ccc 1px solid}.ui-theme--canena .ui-article-list__item:last-of-type{border-bottom:none}.ui-theme--canena .ui-article-preview{overflow:hidden;padding-bottom:20px;padding-top:20px;position:relative}.ui-theme--canena .ui-article-preview__title a{color:#f60;text-decoration:underline}.ui-theme--canena .ui-article-preview__title a:hover{color:#e32636;text-decoration:none}.ui-theme--canena .ui-article-preview__date{color:#b3b3b3;display:block;float:left;font-size:16px;font-weight:normal;margin-top:24px;position:absolute}.ui-theme--canena .ui-article-preview--size-compact .ui-article-preview__title{margin-right:140px}.ui-theme--canena .ui-article-preview--size-compact .ui-article-preview__tags{margin-right:140px;margin-top:10px}.ui-theme--canena .ui-article-preview--size-compact .ui-article-preview__abstract{display:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ui-theme--canena .ui-article-preview--size-compact .ui-article-preview__date{display:none;float:none;margin-top:10px;position:relative}.ui-theme--canena .ui-article-preview--size-compact:hover .ui-article-preview__abstract{display:block}.ui-theme--canena .ui-article-preview--size-compact:hover .ui-article-preview__date{display:block}.ui-theme--canena .ui-article-preview--size-compact .ui-button{bottom:20px;position:absolute;right:0}.ui-theme--canena .ui-outro{background:linear-gradient(#444, #555 15px, #888);border-top:#888 2px solid;color:#fff;margin-top:10px;padding-bottom:1px;padding-top:20px;text-shadow:#333 0 0 3px}.ui-theme--canena .ui-outro ul{list-style:none;margin:16px 0;padding:0}.ui-theme--canena .ui-outro li{margin-bottom:5px}.ui-theme--canena .ui-outro a{color:#fff;display:inline-block;text-decoration:underline}.ui-theme--canena .ui-outro a:hover{color:#f60;text-decoration:none}.ui-theme--canena .ui-outro .ui-grid__row:last-of-type{margin-bottom:0}.ui-theme--canena .ui-outro__section{border-top:#888 1px solid;margin-top:10px;position:relative}.ui-theme--canena .ui-outro__section:before{border-top:#777 1px solid;content:" ";display:block;position:absolute;top:0;width:100%}.ui-theme--canena .ui-outro__copyright{text-align:right}.ui-theme--canena .ui-form__text{border:#ccc 1px solid;border-radius:3px;border-width:1px;padding:10px;margin-bottom:10px}.ui-theme--canena .ui-form__textarea{border:#ccc 1px solid;border-radius:3px;border-width:1px;padding:10px;margin-bottom:10px}.ui-theme--canena .ui-form__group{padding-bottom:2px;padding-top:2px}.ui-theme--canena .ui-form__group-label{margin-bottom:4px}.ui-theme--canena .ui-form__select{border:#ccc 1px solid;border-radius:3px;border-width:1px;padding:10px;margin-bottom:10px}@media (max-width:768px){.ui-theme--canena .ui-outro__copyright{text-align:left}}</style>

> <b>Update 2023-02-23</b>
> <p>Note that this styleguide has been moved <i>again</i> over from an older version of the blog so this approach has been proven to work over tech generations.</p>
> <p>We don't include the original font "Roboto" in this legacy article because we don't want Google to track more of your movements.</p>


> <b>Update 2019-06-05</b>
> <p>Note that this styleguide has been moved over from an older version of the blog so this approach does not necessarily represent the way the markup is structured anymore. It shows, however, that embedding alternative styles into an existing page is a breeze when employing BEM blocks. The old styles literally live side-by-side with the new ones and the mild namespacing via <code>ui-theme</code> allows for selective theming on a per-subtree-basis.</p>

This is the living documentation for my own little set of responsive Block Element Modifier (BEM) based CSS layout blocks being used throughout my blog. Don't expect any content here :-).

<div (manual-responsive-layout) class="ui-theme ui-theme--canena">
    <div class="ui-grid__row">
        <section class="ui-grid__col-8 ui-article-list">
            <h2>Recent posts</h2>
            <ul>
                <li class="ui-article-list__item">
                    <article class="ui-article-preview">
                        <h3 class="ui-article-preview__title"><a href="#">Second post</a></h3>
                        <p class="ui-article-preview__abstract">The first lines of this post that gives the reader an
                            idea what to expect from this post. </p>
                        <ul class="ui-article-preview__tags">
                            <li>
                                <div class="ui-tag"><a class="ui-tag__label" href="#">Some tag</a></div>
                            </li>
                            <li>
                                <div class="ui-tag"><a class="ui-tag__label" href="#">Another tag</a></div>
                            </li>
                        </ul>
                        <div class="ui-article-preview__date">Wednesday 2017-02-01</div><a class="ui-button"
                            href="#"><span class="ui-button__label">Read More... </span></a>
                    </article>
                </li>
                <li class="ui-article-list__item">
                    <article class="ui-article-preview">
                        <h3 class="ui-article-preview__title"><a href="#">First post</a></h3>
                        <p class="ui-article-preview__abstract">The first lines of this post that gives the reader an
                            idea what to expect from this post. </p>
                        <ul class="ui-article-preview__tags">
                            <li>
                                <div class="ui-tag"><a class="ui-tag__label" href="#">Some tag</a></div>
                            </li>
                            <li>
                                <div class="ui-tag"><a class="ui-tag__label" href="#">Another tag</a></div>
                            </li>
                        </ul>
                        <div class="ui-article-preview__date">Wednesday 2017-02-01</div><a class="ui-button"
                            href="#"><span class="ui-button__label">Read More... </span></a>
                    </article>
                </li>
                <li class="ui-article-list__item">
                    <article class="ui-article-preview x-ui-article-preview--size-compact">
                        <h3 class="ui-article-preview__title"><a href="#">An older post with a really long title that
                                just might wrap around</a></h3>
                        <p class="ui-article-preview__abstract">The first lines of this post that gives the reader an
                            idea what to expect from this post. </p>
                        <ul class="ui-article-preview__tags">
                            <li>
                                <div class="ui-tag"><a class="ui-tag__label" href="#">Some tag</a></div>
                            </li>
                            <li>
                                <div class="ui-tag"><a class="ui-tag__label" href="#">Another tag</a></div>
                            </li>
                        </ul>
                        <div class="ui-article-preview__date">Wednesday 2017-02-01</div><a class="ui-button"
                            href="#"><span class="ui-button__label">Read More... </span></a>
                    </article>
                </li>
                <li class="ui-article-list__item">
                    <article class="ui-article-preview x-ui-article-preview--size-compact">
                        <h3 class="ui-article-preview__title"><a href="#">An even older post</a></h3>
                        <p class="ui-article-preview__abstract">The first lines of this post that gives the reader an
                            idea what to expect from this post. </p>
                        <ul class="ui-article-preview__tags">
                            <li>
                                <div class="ui-tag"><a class="ui-tag__label" href="#">Some tag</a></div>
                            </li>
                            <li>
                                <div class="ui-tag"><a class="ui-tag__label" href="#">Another tag</a></div>
                            </li>
                        </ul>
                        <div class="ui-article-preview__date">Wednesday 2017-02-01</div><a class="ui-button"
                            href="#"><span class="ui-button__label">Read More... </span></a>
                    </article>
                </li>
                <li class="ui-article-list__item">
                    <article class="ui-article-preview x-ui-article-preview--size-compact">
                        <h3 class="ui-article-preview__title"><a href="#">The oldest post</a></h3>
                        <ul class="ui-article-preview__tags">
                            <li>
                                <div class="ui-tag"><a class="ui-tag__label" href="#">Some tag</a></div>
                            </li>
                            <li>
                                <div class="ui-tag"><a class="ui-tag__label" href="#">Another tag</a></div>
                            </li>
                        </ul><a class="ui-button" href="#"><span class="ui-button__label">Read More... </span></a>
                    </article>
                </li>
            </ul>
        </section>
        <div class="ui-grid__col-4">
            <section class="ui-tag-cloud">
                <h3>Sidebar with Tags</h3>
                <p>Some info. </p>
                <ul>
                    <li>
                        <div class="ui-tag"><a class="ui-tag__label" href="#">Some tag</a></div>
                    </li>
                    <li>
                        <div class="ui-tag"><a class="ui-tag__label" href="#">Another tag</a></div>
                    </li>
                </ul>
            </section>
        </div>
    </div>
    <section>
        <div class="ui-grid__row">
            <div class="ui-grid__col-12">
                <h3>Grid</h3>
                <p>The default grid is using up to 12 flexbox columns. </p>
            </div>
        </div>
        <div class="ui-grid__row">
            <div class="ui-grid__col-1">Col-1 </div>
            <div class="ui-grid__col-11">Col-11 </div>
        </div>
        <div class="ui-grid__row">
            <div class="ui-grid__col-2">Col-2 </div>
            <div class="ui-grid__col-10">Col-10 </div>
        </div>
        <div class="ui-grid__row">
            <div class="ui-grid__col-3">Col-3 </div>
            <div class="ui-grid__col-9">Col-9 </div>
        </div>
        <div class="ui-grid__row">
            <div class="ui-grid__col-4">Col-4 </div>
            <div class="ui-grid__col-8">Col-8 </div>
        </div>
        <div class="ui-grid__row">
            <div class="ui-grid__col-5">Col-5 </div>
            <div class="ui-grid__col-7">Col-7 </div>
        </div>
        <div class="ui-grid__row">
            <div class="ui-grid__col-6">Col-6 </div>
            <div class="ui-grid__col-6">Col-6 </div>
        </div>
        <div class="ui-grid__row">
            <div class="ui-grid__col-7">Col-7 </div>
            <div class="ui-grid__col-5">Col-5 </div>
        </div>
        <div class="ui-grid__row">
            <div class="ui-grid__col-8">Col-8 </div>
            <div class="ui-grid__col-4">Col-4 </div>
        </div>
        <div class="ui-grid__row">
            <div class="ui-grid__col-9">Col-9 </div>
            <div class="ui-grid__col-3">Col-3 </div>
        </div>
        <div class="ui-grid__row">
            <div class="ui-grid__col-10">Col-10 </div>
            <div class="ui-grid__col-2">Col-2 </div>
        </div>
        <div class="ui-grid__row">
            <div class="ui-grid__col-11">Col-11 </div>
            <div class="ui-grid__col-1">Col-1 </div>
        </div>
        <div class="ui-grid__row">
            <div class="ui-grid__col-12">Fullsize (col-12) </div>
        </div>
    </section>
    <div class="ui-grid__row">
        <section class="ui-grid__col-6">
            <h3>Buttons</h3>
            <p>Inline tex with <button class="ui-button"><span class="ui-button__label">Real Button
                        Button</span></button><button class="ui-button ui-button--primary"><span
                        class="ui-button__label">Primary Button</span></button><button
                    class="ui-button ui-button--secondary"><span class="ui-button__label">Secondary
                        Button</span></button><a class="ui-button" href="#"><span class="ui-button__label">Link
                        Button</span></a><button class="ui-button ui-button--disabled" disabled="disabled"><span
                        class="ui-button__label">Inactive Button</span></button></p>
        </section>
        <section class="ui-grid__col-6">
            <form class="ui-form">
                <h3>Forms</h3><label class="ui-form__group"><span class="ui-form__group-label">Simple
                        Textinput</span><input class="ui-form__text" name="simple-text" placeholder="Simple text..."
                        type="text"><button class="ui-button" type="submit"><span
                            class="ui-button__label">OK</span></button></label><label class="ui-form__group"><input
                        class="ui-form__checkbox" name="check1" type="checkbox"><span
                        class="ui-form__group-label">Simple Checkbox</span></label><label class="ui-form__group"><input
                        class="ui-form__checkbox ui-form__checkbox--disabled" disabled="disabled" name="check2"
                        type="checkbox"><span class="ui-form__group-label">Simple Checkbox</span></label><label
                    class="ui-form__group"><input class="ui-form__radio" name="radio1" type="radio" value="value1"><span
                        class="ui-form__group-label">Option 1</span></label><label class="ui-form__group"><input
                        class="ui-form__radio" name="radio1" type="radio" value="value2"><span
                        class="ui-form__group-label">Option 2</span></label><label class="ui-form__group"><input
                        class="ui-form__radio ui-form__radio--disabled" disabled="disabled" name="radio1" type="radio"
                        value="value3"><span class="ui-form__group-label">Option 2</span></label><label
                    class="ui-form__group"><span class="ui-form__group-label">Some text</span><textarea
                        class="ui-form__textarea" name="textarea"></textarea></label><label class="ui-form__group"><span
                        class="ui-form__group-label">Some text</span><select class="ui-form__select" name="select1">
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
                    </select></label><button class="ui-button" type="submit"><span
                        class="ui-button__label">Submit</span></button>
            </form>
        </section>
    </div>
</div>
