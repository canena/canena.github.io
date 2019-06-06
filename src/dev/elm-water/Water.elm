module Water exposing (main)

import Array exposing (Array)
import Browser
import Browser.Events as Events
import Html
import Html.Attributes as Attr
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import WebGL exposing (Mesh, Shader)


type alias Model =
    { back: Array Float
    , delta : Float
    , front: Array Float
    , selected : Int
    }


type Msg
    = AnimationFrameElapsed Float


dim =
    { height = 100
    , width = 100
    }


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , subscriptions = \_ -> Events.onAnimationFrameDelta AnimationFrameElapsed
        , update = update
        , view = view
        }


init _ =
    let
        emptyBuffer =
            List.range 1 (dim.width * dim.height)
                |> List.map (always 0)
                |> Array.fromList
    in
    ( { back = emptyBuffer
      , delta = 0
      , front = emptyBuffer
      , selected = 0
      }
    , Cmd.none
    )


ix : Int -> Int -> Int
ix x y =
    y * dim.width + x


at : Int -> Array Float -> Float
at k buffer =
    Maybe.withDefault 0.0 (Array.get k buffer)


smooth : Array Float -> Array Float -> Int -> Float -> Float
smooth from to k _ =
    let
        ( x, y ) =
            ( modBy dim.width k, k // dim.width )
    in
    if x == 0 || x == dim.width - 1 || y == 0 || y == dim.height - 1 then
        at k from
    else
        (at (ix (x-1) y) from +
            at (ix (x+1) y) from +
                at (ix x (y+1)) from +
                    at (ix x (y-1)) from
        ) / 2 - 0.95 * (at (ix x y) to)


update msg model =
    case msg of
        AnimationFrameElapsed _ ->
            let
                next =
                    -(model.selected - 1)

                ( to, from ) =
                    if model.selected == 0 then
                        ( model.back, model.front )
                    else
                        ( model.front, model.back )

                buffer =
                    Array.indexedMap (smooth from to) from
            in
            if model.selected == 0 then
                ( { model | front = buffer }, Cmd.none)
            else
                ( { model | back = buffer }, Cmd.none )


view { delta } =
    WebGL.toHtml
        [ Attr.width dim.width
        , Attr.height dim.height
        , Attr.style "display" "block"
        ]
        [ WebGL.entity
            vertexShader
            fragmentShader
            mesh
            {}
        ]


type alias Vertex =
    { position : Vec3
    , color : Vec3
    }


mesh : Mesh Vertex
mesh =
    WebGL.triangles
        [ ( Vertex (vec3 0 1 0) (vec3 1 0 0)
          , Vertex (vec3 1 1 0) (vec3 0 1 0)
          , Vertex (vec3 0 0 0) (vec3 0 0 1)
          )
        , ( Vertex (vec3 0 0 0) (vec3 1 0 0)
          , Vertex (vec3 1 0 0) (vec3 0 1 0)
          , Vertex (vec3 1 1 0) (vec3 0 0 1)
          )
        ]


type alias Uniforms =
    {}


vertexShader : Shader Vertex Uniforms { vcolor : Vec3 }
vertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 color;

        varying vec3 vcolor;

        void main () {
            gl_Position = vec4(position, 1.0);
            vcolor = color;
        }
    |]


fragmentShader : Shader {} Uniforms { vcolor : Vec3 }
fragmentShader =
    [glsl|
        precision mediump float;

        varying vec3 vcolor;

        void main () {
            gl_FragColor = vec4(vcolor, 1.0);
        }
    |]
