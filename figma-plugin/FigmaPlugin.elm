port module FigmaPlugin exposing (main)

import Codec exposing (Codec)
import Element
import Elm.CodeGen
import Elm.Pretty
import Json.Decode
import Json.Encode
import List.Extra as List
import Pixels exposing (Pixels)
import Pretty
import Quantity exposing (Quantity)



-- HARDCODED PLUGIN SETTINGS --


defaultFontSize =
    16


defaultFontColor =
    Element.rgb 0 0 0


{-| Originally these colors were part of another app's design system so that the colors used there would automatically be matched here.
-}
allColors : List ( String, Element.Color )
allColors =
    [ ( "white", Element.rgb 1 1 1 )
    , ( "red0", Element.rgb255 148 12 0 )
    , ( "red1", Element.rgb255 219 68 55 )
    , ( "red2", Element.rgb255 255 219 219 )
    , ( "transparent", Element.rgba 0 0 0 0 )
    , ( "black", Element.rgb255 0 0 0 )
    , ( "dark1", Element.rgb255 56 56 56 )
    , ( "dark2", Element.rgb255 110 110 110 )
    , ( "dark3", Element.rgb255 178 189 189 )
    , ( "dark4", Element.rgb255 217 221 227 )
    ]



-------


type Node
    = TextNode_ TextNode
    | RectangleNode_ RectangleNode
    | FrameNode_ FrameNode
    | GroupNode_ GroupNode
    | EllipseNode_ EllipseNode
    | VectorNode_ VectorNode
    | InstanceNode_ InstanceNode


type alias Size =
    { width : Quantity Int Pixels, height : Quantity Int Pixels }


type alias InstanceNode =
    { size : Size
    , name : String
    , bottomLeftRadius : Int
    , bottomRightRadius : Int
    , topLeftRadius : Int
    , topRightRadius : Int
    , strokeWeight : Int
    , strokes : List Stroke
    , fills : List Fill
    , effects : List Effect
    , x : Int
    , y : Int
    , paddingLeft : Int
    , paddingRight : Int
    , paddingTop : Int
    , paddingBottom : Int
    , children : List Node
    , visible : Bool
    , itemSpacing : Int
    , layoutMode : LayoutMode
    }


type alias TextNode =
    { strokeWeight : Int
    , strokes : List Stroke
    , effects : List Effect
    , fills : Maybe (List SolidFill)
    , text : String
    , fontName : Maybe FontName
    , fontSize : Maybe Int
    , textDecoration : String
    , horizontalAlignment : ItemAlign
    , x : Int
    , y : Int
    , width : Int
    , height : Int
    , visible : Bool
    , lineHeight : LineHeight
    }


type alias FontName =
    { family : String, style : FontStyle }


type FontStyle
    = Hairline
    | Regular
    | Medium
    | SemiBold
    | Bold
    | ExtraBold
    | Heavy


type alias FrameNode =
    { size : Size
    , bottomLeftRadius : Int
    , bottomRightRadius : Int
    , topLeftRadius : Int
    , topRightRadius : Int
    , strokeWeight : Int
    , strokes : List Stroke
    , fills : List Fill
    , effects : List Effect
    , x : Int
    , y : Int
    , paddingLeft : Int
    , paddingRight : Int
    , paddingTop : Int
    , paddingBottom : Int
    , children : List Node
    , visible : Bool
    , itemSpacing : Int
    , layoutMode : LayoutMode
    , primaryAxisSizingMode : AxisSizingMode
    , counterAxisSizingMode : AxisSizingMode
    , layoutAlign : LayoutAlign
    , layoutPositioning : Maybe LayoutAlign
    , name : String
    , primaryAxisAlignItems : ItemAlign
    , counterAxisAlignItems : ItemAlign
    }


type LineHeight
    = AutoLineHeight
    | PixelLineHeight Int


type ItemAlign
    = Left
    | Center
    | Right
    | SpaceBetween


type AxisSizingMode
    = Auto
    | Fixed


type LayoutAlign
    = Inherit
    | Stretch


type LayoutMode
    = Horizontal
    | Vertical
    | NoLayoutMode


type alias EllipseNode =
    { size : Size
    , x : Int
    , y : Int
    , visible : Bool
    , strokeWeight : Int
    , strokes : List Stroke
    , fills : List Fill
    , effects : List Effect
    }


type alias VectorNode =
    { visible : Bool }


type alias RectangleNode =
    { size : Size
    , bottomLeftRadius : Int
    , bottomRightRadius : Int
    , topLeftRadius : Int
    , topRightRadius : Int
    , strokeWeight : Int
    , strokes : List Stroke
    , fills : List Fill
    , effects : List Effect
    , x : Int
    , y : Int
    , visible : Bool
    }


type alias GroupNode =
    { size : Size
    , effects : List Effect
    , x : Int
    , y : Int
    , children : List Node
    , visible : Bool
    }


type alias Stroke =
    { color : FigmaColor
    , opacity : Float
    }


type Fill
    = SolidFill_ SolidFill
    | ImageFill_ ImageFill


type alias SolidFill =
    { color : FigmaColor
    , opacity : Float
    , visible : Bool
    }


type alias ImageFill =
    { visible : Bool }


type alias FigmaColor =
    { red : Int, green : Int, blue : Int }


type alias FigmaColorWithAlpha =
    { red : Int, green : Int, blue : Int, alpha : Float }


type alias Effect =
    { color : Maybe FigmaColorWithAlpha
    , offset : { x : Float, y : Float }
    , radius : Float
    , spread : Float
    , effectType : String
    , visible : Bool
    }


type alias ParentData =
    { size : Size
    , paddingLeft : Int
    , paddingRight : Int
    , paddingTop : Int
    , paddingBottom : Int
    , x : Int
    , y : Int
    }


port figmaOutput : String -> Cmd msg


lineHeightCodec : Codec LineHeight
lineHeightCodec =
    Codec.build
        (\lineHeight ->
            case lineHeight of
                AutoLineHeight ->
                    Json.Encode.object [ ( "unit", Json.Encode.string "AUTO" ) ]

                PixelLineHeight px ->
                    Json.Encode.object
                        [ ( "unit", Json.Encode.string "PIXELS" )
                        , ( "value", Json.Encode.int px )
                        ]
        )
        (Json.Decode.field "unit" Json.Decode.string
            |> Json.Decode.andThen
                (\unit ->
                    case unit of
                        "AUTO" ->
                            Json.Decode.succeed AutoLineHeight

                        "PIXELS" ->
                            Json.Decode.field "value" (Codec.decoder lenientIntCodec)
                                |> Json.Decode.map PixelLineHeight

                        _ ->
                            Json.Decode.fail ("Invalid unit \"" ++ unit ++ "\"")
                )
        )


allLayoutAligns : List LayoutAlign
allLayoutAligns =
    [ Inherit, Stretch ]


allAxisSizingModes : List AxisSizingMode
allAxisSizingModes =
    [ Auto, Fixed ]


layoutAlignToString : LayoutAlign -> String
layoutAlignToString a =
    case a of
        Inherit ->
            "INHERIT"

        Stretch ->
            "STRETCH"


axisSizingModesToString : AxisSizingMode -> String
axisSizingModesToString a =
    case a of
        Auto ->
            "AUTO"

        Fixed ->
            "FIXED"


layoutAlignCodec : Codec LayoutAlign
layoutAlignCodec =
    Codec.andThen
        (\text ->
            case List.find (layoutAlignToString >> (==) text) allLayoutAligns of
                Just mode ->
                    Codec.succeed mode

                Nothing ->
                    Codec.fail (text ++ " is an invalid layout align")
        )
        layoutAlignToString
        Codec.string


axisSizingModesCodec : Codec AxisSizingMode
axisSizingModesCodec =
    Codec.andThen
        (\text ->
            case List.find (axisSizingModesToString >> (==) text) allAxisSizingModes of
                Just mode ->
                    Codec.succeed mode

                Nothing ->
                    Codec.fail (text ++ " is an invalid layout align")
        )
        axisSizingModesToString
        Codec.string


nodeCodec : Codec Node
nodeCodec =
    Codec.lazy
        (\() ->
            Codec.build
                (\node ->
                    case node of
                        FrameNode_ item ->
                            Codec.encoder frameNodeCodec item

                        TextNode_ item ->
                            Codec.encoder textNodeCodec item

                        RectangleNode_ item ->
                            Codec.encoder rectangleNodeCodec item

                        GroupNode_ item ->
                            Codec.encoder groupNodeCodec item

                        EllipseNode_ item ->
                            Codec.encoder ellipseNodeCodec item

                        VectorNode_ item ->
                            Codec.encoder vectorNodeCodec item

                        InstanceNode_ item ->
                            Codec.encoder instanceNodeCodec item
                )
                (Json.Decode.at [ "__proto__", "type" ] Json.Decode.string
                    |> Json.Decode.andThen
                        (\nodeType ->
                            case nodeType of
                                "FRAME" ->
                                    Json.Decode.map FrameNode_ (Codec.decoder frameNodeCodec)

                                "TEXT" ->
                                    Json.Decode.map TextNode_ (Codec.decoder textNodeCodec)

                                "GROUP" ->
                                    Json.Decode.map GroupNode_ (Codec.decoder groupNodeCodec)

                                "RECTANGLE" ->
                                    Json.Decode.map RectangleNode_ (Codec.decoder rectangleNodeCodec)

                                "ELLIPSE" ->
                                    Json.Decode.map EllipseNode_ (Codec.decoder ellipseNodeCodec)

                                "VECTOR" ->
                                    Json.Decode.map VectorNode_ (Codec.decoder vectorNodeCodec)

                                "INSTANCE" ->
                                    Json.Decode.map InstanceNode_ (Codec.decoder instanceNodeCodec)

                                _ ->
                                    Json.Decode.fail (nodeType ++ " prototype not handled")
                        )
                )
        )


instanceNodeCodec : Codec InstanceNode
instanceNodeCodec =
    Codec.object (\a b -> InstanceNode { width = a, height = b })
        |> Codec.field "width" (\a -> a.size.width) lenientIntQuantityCodec
        |> Codec.field "height" (\a -> a.size.height) lenientIntQuantityCodec
        |> Codec.field "name" .name Codec.string
        |> Codec.field "bottomLeftRadius" .bottomLeftRadius lenientIntCodec
        |> Codec.field "bottomRightRadius" .bottomRightRadius lenientIntCodec
        |> Codec.field "topLeftRadius" .topLeftRadius lenientIntCodec
        |> Codec.field "topRightRadius" .topRightRadius lenientIntCodec
        |> Codec.field "strokeWeight" .strokeWeight lenientIntCodec
        |> Codec.field "strokes" .strokes (Codec.list strokeCodec)
        |> Codec.field "fills" .fills (Codec.list fillCodec)
        |> Codec.field "effects" .effects (Codec.list effectCodec)
        |> Codec.field "x" .x lenientIntCodec
        |> Codec.field "y" .y lenientIntCodec
        |> Codec.field "paddingLeft" .paddingLeft lenientIntCodec
        |> Codec.field "paddingRight" .paddingRight lenientIntCodec
        |> Codec.field "paddingTop" .paddingTop lenientIntCodec
        |> Codec.field "paddingBottom" .paddingBottom lenientIntCodec
        |> Codec.field "children" .children (Codec.list nodeCodec)
        |> Codec.field "visible" .visible Codec.bool
        |> Codec.field "itemSpacing" .itemSpacing lenientIntCodec
        |> Codec.field "layoutMode" .layoutMode layoutModeCodec
        |> Codec.buildObject


rectangleNodeCodec : Codec RectangleNode
rectangleNodeCodec =
    Codec.object (\a b -> RectangleNode { width = a, height = b })
        |> Codec.field "width" (\a -> a.size.width) lenientIntQuantityCodec
        |> Codec.field "height" (\a -> a.size.height) lenientIntQuantityCodec
        |> Codec.field "bottomLeftRadius" .bottomLeftRadius lenientIntCodec
        |> Codec.field "bottomRightRadius" .bottomRightRadius lenientIntCodec
        |> Codec.field "topLeftRadius" .topLeftRadius lenientIntCodec
        |> Codec.field "topRightRadius" .topRightRadius lenientIntCodec
        |> Codec.field "strokeWeight" .strokeWeight lenientIntCodec
        |> Codec.field "strokes" .strokes (Codec.list strokeCodec)
        |> Codec.field "fills" .fills (Codec.list fillCodec)
        |> Codec.field "effects" .effects (Codec.list effectCodec)
        |> Codec.field "x" .x lenientIntCodec
        |> Codec.field "y" .y lenientIntCodec
        |> Codec.field "visible" .visible Codec.bool
        |> Codec.buildObject


ellipseNodeCodec : Codec EllipseNode
ellipseNodeCodec =
    Codec.object (\a b -> EllipseNode { width = a, height = b })
        |> Codec.field "width" (\a -> a.size.width) lenientIntQuantityCodec
        |> Codec.field "height" (\a -> a.size.height) lenientIntQuantityCodec
        |> Codec.field "x" .x lenientIntCodec
        |> Codec.field "y" .y lenientIntCodec
        |> Codec.field "visible" .visible Codec.bool
        |> Codec.field "strokeWeight" .strokeWeight lenientIntCodec
        |> Codec.field "strokes" .strokes (Codec.list strokeCodec)
        |> Codec.field "fills" .fills (Codec.list fillCodec)
        |> Codec.field "effects" .effects (Codec.list effectCodec)
        |> Codec.buildObject


vectorNodeCodec =
    Codec.object VectorNode
        |> Codec.field "visible" .visible Codec.bool
        |> Codec.buildObject


groupNodeCodec : Codec GroupNode
groupNodeCodec =
    Codec.object (\a b -> GroupNode { width = a, height = b })
        |> Codec.field "width" (\a -> a.size.width) lenientIntQuantityCodec
        |> Codec.field "height" (\a -> a.size.height) lenientIntQuantityCodec
        |> Codec.field "effects" .effects (Codec.list effectCodec)
        |> Codec.field "x" .x lenientIntCodec
        |> Codec.field "y" .y lenientIntCodec
        |> Codec.field "children" .children (Codec.list nodeCodec)
        |> Codec.field "visible" .visible Codec.bool
        |> Codec.buildObject


frameNodeCodec : Codec FrameNode
frameNodeCodec =
    Codec.object
        (\a b -> FrameNode { width = a, height = b })
        |> Codec.field "width" (\a -> a.size.width) lenientIntQuantityCodec
        |> Codec.field "height" (\a -> a.size.height) lenientIntQuantityCodec
        |> Codec.field "bottomLeftRadius" .bottomLeftRadius lenientIntCodec
        |> Codec.field "bottomRightRadius" .bottomRightRadius lenientIntCodec
        |> Codec.field "topLeftRadius" .topLeftRadius lenientIntCodec
        |> Codec.field "topRightRadius" .topRightRadius lenientIntCodec
        |> Codec.field "strokeWeight" .strokeWeight lenientIntCodec
        |> Codec.field "strokes" .strokes (Codec.list strokeCodec)
        |> Codec.field "fills" .fills (Codec.list fillCodec)
        |> Codec.field "effects" .effects (Codec.list effectCodec)
        |> Codec.field "x" .x lenientIntCodec
        |> Codec.field "y" .y lenientIntCodec
        |> Codec.field "paddingLeft" .paddingLeft lenientIntCodec
        |> Codec.field "paddingRight" .paddingRight lenientIntCodec
        |> Codec.field "paddingTop" .paddingTop lenientIntCodec
        |> Codec.field "paddingBottom" .paddingBottom lenientIntCodec
        |> Codec.field "children" .children (Codec.list nodeCodec)
        |> Codec.field "visible" .visible Codec.bool
        |> Codec.field "itemSpacing" .itemSpacing lenientIntCodec
        |> Codec.field "layoutMode" .layoutMode layoutModeCodec
        |> Codec.field "primaryAxisSizingMode" .primaryAxisSizingMode axisSizingModesCodec
        |> Codec.field "counterAxisSizingMode" .counterAxisSizingMode axisSizingModesCodec
        |> Codec.field "layoutAlign" .layoutAlign layoutAlignCodec
        |> Codec.maybeField "layoutPositioning" .layoutPositioning layoutAlignCodec
        |> Codec.field "name" .name Codec.string
        |> Codec.field "primaryAxisAlignItems" .primaryAxisAlignItems itemAlignCodec
        |> Codec.field "counterAxisAlignItems" .counterAxisAlignItems itemAlignCodec
        |> Codec.buildObject


allItemAligns : List ItemAlign
allItemAligns =
    [ Left, Center, Right, SpaceBetween ]


itemAlignToString : ItemAlign -> String
itemAlignToString a =
    case a of
        Left ->
            "LEFT"

        Center ->
            "CENTER"

        Right ->
            "RIGHT"

        SpaceBetween ->
            "SPACE_BETWEEN"


itemAlignCodec : Codec ItemAlign
itemAlignCodec =
    Codec.andThen
        (\text ->
            if text == "MIN" then
                Codec.succeed Left

            else if text == "MAX" then
                Codec.succeed Right

            else
                case List.find (itemAlignToString >> (==) text) allItemAligns of
                    Just mode ->
                        Codec.succeed mode

                    Nothing ->
                        Codec.fail (text ++ " is an invalid layout mode")
        )
        itemAlignToString
        Codec.string


allLayoutModes : List LayoutMode
allLayoutModes =
    [ Horizontal, Vertical, NoLayoutMode ]


layoutModeToString : LayoutMode -> String
layoutModeToString mode =
    case mode of
        Horizontal ->
            "HORIZONTAL"

        Vertical ->
            "VERTICAL"

        NoLayoutMode ->
            "NONE"


layoutModeCodec : Codec LayoutMode
layoutModeCodec =
    Codec.andThen
        (\text ->
            case List.find (layoutModeToString >> (==) text) allLayoutModes of
                Just mode ->
                    Codec.succeed mode

                Nothing ->
                    Codec.fail (text ++ " is an invalid layout mode")
        )
        layoutModeToString
        Codec.string


textNodeCodec : Codec TextNode
textNodeCodec =
    Codec.object TextNode
        |> Codec.field "strokeWeight" .strokeWeight lenientIntCodec
        |> Codec.field "strokes" .strokes (Codec.list strokeCodec)
        |> Codec.field "effects" .effects (Codec.list effectCodec)
        |> Codec.field "fills" .fills (mixedTextCodec (Codec.list solidFillCodec))
        |> Codec.field "characters" .text Codec.string
        |> Codec.field "fontName" .fontName (mixedTextCodec fontNameCodec)
        |> Codec.field "fontSize" .fontSize (mixedTextCodec lenientIntCodec)
        |> Codec.field "textDecoration" .textDecoration Codec.string
        |> Codec.field "textAlignHorizontal" .horizontalAlignment itemAlignCodec
        |> Codec.field "x" .x lenientIntCodec
        |> Codec.field "y" .y lenientIntCodec
        |> Codec.field "width" .width lenientIntCodec
        |> Codec.field "height" .height lenientIntCodec
        |> Codec.field "visible" .visible Codec.bool
        |> Codec.field "lineHeight" .lineHeight lineHeightCodec
        |> Codec.buildObject


mixedTextCodec : Codec a -> Codec (Maybe a)
mixedTextCodec codec =
    Codec.build
        (\maybe ->
            case maybe of
                Just a ->
                    Codec.encoder codec a

                Nothing ->
                    Json.Encode.null
        )
        (Json.Decode.maybe (Codec.decoder codec))


fontNameCodec : Codec FontName
fontNameCodec =
    Codec.object FontName
        |> Codec.field "family" .family Codec.string
        |> Codec.field "style" .style fontStyleCodec
        |> Codec.buildObject


fontStyleCodec : Codec FontStyle
fontStyleCodec =
    Codec.string
        |> Codec.andThen
            (\text ->
                case List.find (Tuple.first >> (==) text) weights of
                    Just ( _, weight ) ->
                        Codec.succeed weight

                    _ ->
                        Codec.fail (text ++ " is not a recognized font style")
            )
            (\weight ->
                List.find (Tuple.second >> (==) weight) weights
                    |> Maybe.map Tuple.first
                    |> Maybe.withDefault "Regular"
            )


weights : List ( String, FontStyle )
weights =
    [ ( "Hairline", Hairline )
    , ( "Regular", Regular )
    , ( "Medium", Medium )
    , ( "Semi Bold", SemiBold )
    , ( "Bold", Bold )
    , ( "Extra Bold", ExtraBold )
    , ( "Heavy", Heavy )
    ]


strokeCodec : Codec Stroke
strokeCodec =
    Codec.object Stroke
        |> Codec.field "color" .color figmaColorCodec
        |> Codec.field "opacity" .opacity Codec.float
        |> Codec.buildObject


solidFillCodec : Codec SolidFill
solidFillCodec =
    Codec.object SolidFill
        |> Codec.field "color" .color figmaColorCodec
        |> Codec.field "opacity" .opacity Codec.float
        |> Codec.field "visible" .visible Codec.bool
        |> Codec.buildObject


imageFillCodec : Codec ImageFill
imageFillCodec =
    Codec.object ImageFill
        |> Codec.field "visible" .visible Codec.bool
        |> Codec.buildObject


fillCodec : Codec Fill
fillCodec =
    Codec.build
        (\_ -> Json.Encode.int 0)
        (Json.Decode.field "type" Json.Decode.string
            |> Json.Decode.andThen
                (\fillType ->
                    case fillType of
                        "IMAGE" ->
                            Json.Decode.map ImageFill_ (Codec.decoder imageFillCodec)

                        "SOLID" ->
                            Json.Decode.map SolidFill_ (Codec.decoder solidFillCodec)

                        _ ->
                            Json.Decode.fail (fillType ++ " is not a valid fill type")
                )
        )


effectCodec : Codec Effect
effectCodec =
    Codec.object Effect
        |> Codec.maybeField "color" .color figmaColorWithAlphaCodec
        |> Codec.field "offset" .offset offsetCodec
        |> Codec.field "radius" .radius Codec.float
        |> Codec.field "spread" .spread Codec.float
        |> Codec.field "type" .effectType Codec.string
        |> Codec.field "visible" .visible Codec.bool
        |> Codec.buildObject


offsetCodec : Codec { x : Float, y : Float }
offsetCodec =
    Codec.object (\x y -> { x = x, y = y })
        |> Codec.field "x" .x Codec.float
        |> Codec.field "y" .y Codec.float
        |> Codec.buildObject


figmaColorCodec : Codec FigmaColor
figmaColorCodec =
    Codec.object FigmaColor
        |> Codec.field "r" .red colorCodec
        |> Codec.field "g" .green colorCodec
        |> Codec.field "b" .blue colorCodec
        |> Codec.buildObject


figmaColorWithAlphaCodec : Codec FigmaColorWithAlpha
figmaColorWithAlphaCodec =
    Codec.object FigmaColorWithAlpha
        |> Codec.field "r" .red colorCodec
        |> Codec.field "g" .green colorCodec
        |> Codec.field "b" .blue colorCodec
        |> Codec.field "a" .alpha Codec.float
        |> Codec.buildObject


lenientIntCodec : Codec Int
lenientIntCodec =
    Codec.map round toFloat Codec.float


lenientIntQuantityCodec : Codec (Quantity Int a)
lenientIntQuantityCodec =
    Codec.map (round >> Quantity.unsafe) (Quantity.unwrap >> toFloat) Codec.float


colorCodec : Codec Int
colorCodec =
    Codec.map ((*) 255 >> round) (toFloat >> (*) (1 / 255)) Codec.float


isNodeVisible : Node -> Bool
isNodeVisible node =
    case node of
        TextNode_ item ->
            item.visible

        RectangleNode_ item ->
            item.visible

        FrameNode_ item ->
            item.visible

        GroupNode_ item ->
            item.visible

        EllipseNode_ item ->
            item.visible

        VectorNode_ item ->
            item.visible

        InstanceNode_ item ->
            item.visible


main : Program Json.Decode.Value {} {}
main =
    Platform.worker
        { init =
            \json ->
                ( {}
                , (case Codec.decodeValue nodeCodec json of
                    Ok item ->
                        nodeToExpr Nothing item
                            |> Maybe.withDefault (Elm.CodeGen.string "Nothing to generate")
                            |> Elm.Pretty.prettyExpression
                            |> Pretty.pretty 100

                    Err error ->
                        Json.Decode.errorToString error
                  )
                    |> escapeText
                    |> figmaOutput
                )
        , update = \_ _ -> ( {}, Cmd.none )
        , subscriptions = \_ -> Sub.none
        }


escapeText =
    String.replace "\n" "\\n" >> String.replace "\"" "\\\""


borderRadius :
    { a | bottomLeftRadius : Int, bottomRightRadius : Int, topLeftRadius : Int, topRightRadius : Int }
    -> List Elm.CodeGen.Expression
borderRadius item =
    if
        (item.bottomLeftRadius > 0)
            && (item.bottomLeftRadius == item.bottomRightRadius)
            && (item.bottomLeftRadius == item.topLeftRadius)
            && (item.bottomLeftRadius == item.topRightRadius)
    then
        [ borderRoundedExpr item.bottomLeftRadius ]

    else if item.bottomLeftRadius > 0 || item.bottomRightRadius > 0 || item.topLeftRadius > 0 || item.topRightRadius > 0 then
        [ borderRoundedEachExpr
            { topLeft = item.topLeftRadius
            , topRight = item.topRightRadius
            , bottomLeft = item.bottomLeftRadius
            , bottomRight = item.bottomRightRadius
            }
        ]

    else
        []


frameNodeAttributes maybeParent item =
    borderWidthAndColor item
        ++ borderRadius item
        ++ padding item
        ++ background item
        ++ effects item
        ++ widthHeightAndAlignment True maybeParent item


ellipseNodeAttributes parent item =
    if item.size.width == item.size.height then
        borderWidthAndColor item
            ++ background item
            ++ effects item
            ++ widthHeightAndAlignment False parent item
            ++ [ widthPxExpr item.size.width
               , heightPxExpr item.size.height
               , borderRoundedExpr (Pixels.inPixels item.size.width)
               ]

    else
        []


instanceNodeAttributes : { a | strokeWeight : Int, strokes : List { b | color : FigmaColor }, bottomLeftRadius : Int, bottomRightRadius : Int, topLeftRadius : Int, topRightRadius : Int, paddingLeft : Int, paddingRight : Int, paddingBottom : Int, paddingTop : Int, fills : List Fill, effects : List Effect } -> List Elm.CodeGen.Expression
instanceNodeAttributes item =
    borderWidthAndColor item
        ++ borderRadius item
        ++ padding item
        ++ background item
        ++ effects item


widthHeightAndAlignment :
    Bool
    -> Maybe ParentData
    -> { a | x : Int, y : Int, size : Size }
    -> List Elm.CodeGen.Expression
widthHeightAndAlignment allowFill maybeParent frameNode =
    case maybeParent of
        Just parent ->
            let
                innerWidth =
                    Pixels.inPixels parent.size.width - parent.paddingLeft - parent.paddingRight

                innerHeight =
                    Pixels.inPixels parent.size.height - parent.paddingTop - parent.paddingBottom

                childX0 =
                    frameNode.x

                childX1 =
                    frameNode.x + Pixels.inPixels frameNode.size.width

                childCenterX =
                    (toFloat childX0 + toFloat childX1) / 2

                innerX0 =
                    parent.paddingLeft

                innerX1 =
                    Pixels.inPixels parent.size.width - parent.paddingRight

                innerCenterX =
                    (toFloat innerX0 + toFloat innerX1) / 2

                childY0 =
                    frameNode.y

                childY1 =
                    frameNode.y + Pixels.inPixels frameNode.size.height

                childCenterY =
                    (toFloat childY0 + toFloat childY1) / 2

                innerY0 =
                    parent.paddingTop

                innerY1 =
                    Pixels.inPixels parent.size.height - parent.paddingBottom

                innerCenterY =
                    (toFloat innerY0 + toFloat innerY1) / 2

                approximatelyEqual a b =
                    abs (a - b) < 1
            in
            (if approximatelyEqual innerWidth (Pixels.inPixels frameNode.size.width) then
                if allowFill then
                    [ widthFillExpr ]

                else
                    []

             else if approximatelyEqual innerCenterX childCenterX then
                [ centerXExpr ]

             else if approximatelyEqual childX1 innerX1 then
                [ alignRightExpr ]

             else
                []
            )
                ++ (if approximatelyEqual innerHeight (Pixels.inPixels frameNode.size.height) then
                        if allowFill then
                            [ heightFillExpr ]

                        else
                            []

                    else if approximatelyEqual innerCenterY childCenterY then
                        [ centerYExpr ]

                    else if approximatelyEqual childY1 innerY1 then
                        [ alignBottomExpr ]

                    else
                        []
                   )

        Nothing ->
            []


padding :
    { a | paddingLeft : Int, paddingRight : Int, paddingBottom : Int, paddingTop : Int }
    -> List Elm.CodeGen.Expression
padding item =
    if
        (item.paddingLeft > 0)
            && (item.paddingLeft == item.paddingRight)
            && (item.paddingLeft == item.paddingBottom)
            && (item.paddingLeft == item.paddingTop)
    then
        [ paddingExpr item.paddingLeft ]

    else if
        (item.paddingLeft > 0 || item.paddingTop > 0)
            && (item.paddingLeft == item.paddingRight)
            && (item.paddingTop == item.paddingBottom)
    then
        [ paddingXyExpr item.paddingLeft item.paddingTop ]

    else if item.paddingLeft > 0 || item.paddingRight > 0 || item.paddingBottom > 0 || item.paddingTop > 0 then
        [ paddingEachExpr
            { left = item.paddingLeft
            , right = item.paddingRight
            , top = item.paddingTop
            , bottom = item.paddingBottom
            }
        ]

    else
        []


background : { a | fills : List Fill } -> List Elm.CodeGen.Expression
background item =
    case
        List.filterMap
            (\fill ->
                case fill of
                    SolidFill_ normalFill ->
                        if normalFill.visible then
                            backgroundColorExpr normalFill.color |> Just

                        else
                            Nothing

                    ImageFill_ imageFill ->
                        if imageFill.visible then
                            backgroundImageExpr |> Just

                        else
                            Nothing
            )
            item.fills
    of
        head :: _ ->
            [ head ]

        [] ->
            []


effects : { a | effects : List Effect } -> List Elm.CodeGen.Expression
effects item =
    List.concatMap
        (\effect ->
            if effect.visible then
                case ( effect.effectType, effect.color ) of
                    ( "DROP_SHADOW", Just color ) ->
                        if (effect.spread > 0) || (color.red > 0) || (color.green > 0) || (color.blue > 0) then
                            [ borderShadowExpr effect.offset effect.radius effect.spread color ]

                        else
                            [ uiShadowExpr effect.offset effect.radius color.alpha ]

                    ( "INNER_SHADOW", Just color ) ->
                        [ borderInnerShadowExpr effect.offset effect.radius effect.spread color ]

                    ( "BACKGROUND_BLUR", _ ) ->
                        [ textExpr "TODO: handle blur background" ]

                    _ ->
                        []

            else
                []
        )
        item.effects


getParentData :
    { a
        | size : Size
        , paddingLeft : Int
        , paddingRight : Int
        , paddingTop : Int
        , paddingBottom : Int
        , x : Int
        , y : Int
    }
    -> ParentData
getParentData a =
    { size = a.size
    , paddingLeft = a.paddingLeft
    , paddingRight = a.paddingRight
    , paddingTop = a.paddingTop
    , paddingBottom = a.paddingBottom
    , x = a.x
    , y = a.y
    }


getParentData_ : { a | size : Size, x : Int, y : Int } -> ParentData
getParentData_ a =
    { size = a.size
    , paddingLeft = 0
    , paddingRight = 0
    , paddingTop = 0
    , paddingBottom = 0
    , x = a.x
    , y = a.y
    }


textNodeAttributes : Bool -> TextNode -> List Elm.CodeGen.Expression
textNodeAttributes isMultiline item =
    borderWidthAndColor item
        ++ effects item
        ++ (case item.fills of
                Just fills ->
                    case List.filter .visible fills of
                        head :: _ ->
                            let
                                { red, green, blue } =
                                    Element.toRgb defaultFontColor
                            in
                            if
                                (head.color.red == round (255 * red))
                                    && (head.color.green == round (255 * green))
                                    && (head.color.blue == round (255 * blue))
                            then
                                []

                            else
                                [ fontColorExpr head.color
                                ]

                        [] ->
                            []

                Nothing ->
                    []
           )
        ++ (case item.fontSize of
                Just fontSize ->
                    if fontSize == defaultFontSize then
                        []

                    else
                        [ fontSizeExpr fontSize ]

                Nothing ->
                    []
           )
        ++ (case item.fontName of
                Just fontName ->
                    case fontName.style of
                        Hairline ->
                            [ Elm.CodeGen.fqFun [ "Element", "Font" ] "hairline" ]

                        Regular ->
                            []

                        Medium ->
                            [ Elm.CodeGen.fqFun [ "Element", "Font" ] "medium" ]

                        SemiBold ->
                            [ Elm.CodeGen.fqFun [ "Element", "Font" ] "semiBold" ]

                        Bold ->
                            [ Elm.CodeGen.fqFun [ "Element", "Font" ] "bold" ]

                        ExtraBold ->
                            [ Elm.CodeGen.fqFun [ "Element", "Font" ] "extraBold" ]

                        Heavy ->
                            [ Elm.CodeGen.fqFun [ "Element", "Font" ] "heavy" ]

                Nothing ->
                    []
           )
        ++ (case item.horizontalAlignment of
                Left ->
                    []

                Center ->
                    if isMultiline then
                        [ Elm.CodeGen.fqFun [ "Element", "Font" ] "center" ]

                    else
                        [ centerXExpr ]

                Right ->
                    if isMultiline then
                        [ Elm.CodeGen.fqFun [ "Element", "Font" ] "alignRight" ]

                    else
                        [ alignRightExpr ]

                SpaceBetween ->
                    []
           )
        ++ (case item.lineHeight of
                AutoLineHeight ->
                    []

                PixelLineHeight px ->
                    case ( item.fontSize, isMultiline ) of
                        ( Just fontSize, True ) ->
                            [ spacingExpr (px - fontSize) ]

                        _ ->
                            []
           )


groupNodeAttributes : Maybe ParentData -> GroupNode -> List Elm.CodeGen.Expression
groupNodeAttributes maybeParent item =
    effects item ++ widthHeightAndAlignment True maybeParent item


nodeToExpr : Maybe ParentData -> Node -> Maybe Elm.CodeGen.Expression
nodeToExpr parent node =
    case node of
        TextNode_ item ->
            case List.length (String.words (String.replace "\n" " " item.text)) of
                0 ->
                    Nothing

                1 ->
                    case textNodeAttributes False item of
                        [] ->
                            textExpr (escapeText item.text) |> Just

                        attributes ->
                            Elm.CodeGen.apply
                                [ Elm.CodeGen.fqFun [ "Element" ] "el"
                                , Elm.CodeGen.list attributes
                                , textExpr (escapeText item.text)
                                ]
                                |> Just

                _ ->
                    Elm.CodeGen.apply
                        [ Elm.CodeGen.fqFun [ "Ui" ] "paragraph"
                        , textNodeAttributes True item |> Elm.CodeGen.list
                        , Elm.CodeGen.string (escapeText item.text)
                        ]
                        |> Just

        RectangleNode_ item ->
            Elm.CodeGen.apply
                [ Elm.CodeGen.fqFun [ "Element" ] "el"
                , widthFillExpr
                    :: borderRadius item
                    ++ borderWidthAndColor item
                    ++ background item
                    ++ effects item
                    |> Elm.CodeGen.list
                , Elm.CodeGen.fqFun [ "Element" ] "none"
                ]
                |> Just

        FrameNode_ item ->
            frameNodeExpr (frameNodeAttributes parent) item

        GroupNode_ item ->
            case ( groupNodeAttributes parent item, item.children ) of
                ( [], [ head ] ) ->
                    nodeToExpr (getParentData_ item |> Just) head

                ( [], [] ) ->
                    Nothing

                _ ->
                    columnExpr
                        (groupNodeAttributes parent item)
                        (List.filter isNodeVisible item.children
                            |> List.filterMap (nodeToExpr (getParentData_ item |> Just))
                        )
                        |> Just

        EllipseNode_ item ->
            Elm.CodeGen.apply
                [ Elm.CodeGen.fqFun [ "Element" ] "el"
                , Elm.CodeGen.list (ellipseNodeAttributes parent item)
                , Elm.CodeGen.fqFun [ "Element" ] "none"
                ]
                |> Just

        VectorNode_ _ ->
            textExpr "TODO: handle vectors" |> Just

        InstanceNode_ item ->
            frameNodeExpr instanceNodeAttributes item


frameNodeExpr getAttributes item =
    let
        parentData =
            getParentData item |> Just
    in
    case
        ( getAttributes item
        , List.filter isNodeVisible item.children
            |> List.filterMap (nodeToExpr parentData)
        )
    of
        ( [], [ head ] ) ->
            Just head

        ( [], [] ) ->
            Nothing

        ( attributes, first :: second :: rest ) ->
            (case item.layoutMode of
                Horizontal ->
                    rowExpr

                Vertical ->
                    columnExpr

                NoLayoutMode ->
                    columnExpr
            )
                ((if item.itemSpacing == 0 then
                    []

                  else
                    [ spacingExpr item.itemSpacing ]
                 )
                    ++ attributes
                )
                (first :: second :: rest)
                |> Just

        ( attributes, [ head ] ) ->
            elExpr attributes head |> Just

        ( attributes, [] ) ->
            elExpr attributes (Elm.CodeGen.fqFun [ "Element" ] "none") |> Just


spacingExpr : Int -> Elm.CodeGen.Expression
spacingExpr spacing =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element" ] "spacing"
        , Elm.CodeGen.int spacing
        ]


textExpr : String -> Elm.CodeGen.Expression
textExpr text =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element" ] "text"
        , Elm.CodeGen.string text
        ]


widthFillExpr : Elm.CodeGen.Expression
widthFillExpr =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element" ] "width"
        , Elm.CodeGen.fqFun [ "Element" ] "fill"
        ]


heightFillExpr : Elm.CodeGen.Expression
heightFillExpr =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element" ] "height"
        , Elm.CodeGen.fqFun [ "Element" ] "fill"
        ]


centerXExpr : Elm.CodeGen.Expression
centerXExpr =
    Elm.CodeGen.fqFun [ "Element" ] "centerX"


centerYExpr : Elm.CodeGen.Expression
centerYExpr =
    Elm.CodeGen.fqFun [ "Element" ] "centerY"


alignRightExpr : Elm.CodeGen.Expression
alignRightExpr =
    Elm.CodeGen.fqFun [ "Element" ] "alignRight"


alignBottomExpr : Elm.CodeGen.Expression
alignBottomExpr =
    Elm.CodeGen.fqFun [ "Element" ] "alignBottom"


widthPxExpr : Quantity Int Pixels -> Elm.CodeGen.Expression
widthPxExpr px =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element" ] "width"
        , Elm.CodeGen.apply [ Elm.CodeGen.fqFun [ "Element" ] "px", Elm.CodeGen.int (Pixels.inPixels px) ]
        ]


heightPxExpr : Quantity Int Pixels -> Elm.CodeGen.Expression
heightPxExpr px =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element" ] "height"
        , Elm.CodeGen.apply [ Elm.CodeGen.fqFun [ "Element" ] "px", Elm.CodeGen.int (Pixels.inPixels px) ]
        ]


rowExpr : List Elm.CodeGen.Expression -> List Elm.CodeGen.Expression -> Elm.CodeGen.Expression
rowExpr attributes children =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element" ] "row"
        , Elm.CodeGen.list attributes
        , Elm.CodeGen.list children
        ]


columnExpr : List Elm.CodeGen.Expression -> List Elm.CodeGen.Expression -> Elm.CodeGen.Expression
columnExpr attributes children =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element" ] "column"
        , Elm.CodeGen.list attributes
        , Elm.CodeGen.list children
        ]


elExpr : List Elm.CodeGen.Expression -> Elm.CodeGen.Expression -> Elm.CodeGen.Expression
elExpr attributes children =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element" ] "el"
        , Elm.CodeGen.list attributes
        , children
        ]


borderWidthAndColor : { a | strokeWeight : Int, strokes : List { b | color : FigmaColor } } -> List Elm.CodeGen.Expression
borderWidthAndColor item =
    case ( item.strokeWeight > 0, item.strokes ) of
        ( True, head :: _ ) ->
            [ borderWidthExpr item.strokeWeight
            , borderColorExpr head.color
            ]

        _ ->
            []


fontSizeExpr : Int -> Elm.CodeGen.Expression
fontSizeExpr value =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element", "Font" ] "size"
        , Elm.CodeGen.int value
        ]


borderShadowExpr : { x : Float, y : Float } -> Float -> Float -> FigmaColorWithAlpha -> Elm.CodeGen.Expression
borderShadowExpr { x, y } blur size color =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element", "Border" ] "shadow"
        , Elm.CodeGen.record
            [ ( "offset", Elm.CodeGen.tuple [ Elm.CodeGen.float x, Elm.CodeGen.float y ] )
            , ( "blur", Elm.CodeGen.float blur )
            , ( "size", Elm.CodeGen.float size )
            , ( "color", figmaColorWithAlphaToExpr color )
            ]
        ]


uiShadowExpr : { x : Float, y : Float } -> Float -> Float -> Elm.CodeGen.Expression
uiShadowExpr { x, y } blur opacity =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Ui" ] "shadow"
        , Elm.CodeGen.record
            [ ( "offset", Elm.CodeGen.tuple [ Elm.CodeGen.float x, Elm.CodeGen.float y ] )
            , ( "blur", Elm.CodeGen.float blur )
            , ( "opacity", Elm.CodeGen.float opacity )
            ]
        ]


borderInnerShadowExpr : { x : Float, y : Float } -> Float -> Float -> FigmaColorWithAlpha -> Elm.CodeGen.Expression
borderInnerShadowExpr { x, y } blur size color =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element", "Border" ] "innerShadow"
        , Elm.CodeGen.record
            [ ( "offset", Elm.CodeGen.tuple [ Elm.CodeGen.float x, Elm.CodeGen.float y ] )
            , ( "blur", Elm.CodeGen.float blur )
            , ( "size", Elm.CodeGen.float size )
            , ( "color", figmaColorWithAlphaToExpr color )
            ]
        ]


fontColorExpr : FigmaColor -> Elm.CodeGen.Expression
fontColorExpr value =
    Elm.CodeGen.apply [ Elm.CodeGen.fqFun [ "Element", "Font" ] "color", figmaColorToExpr value ]


paddingExpr : Int -> Elm.CodeGen.Expression
paddingExpr value =
    Elm.CodeGen.apply [ Elm.CodeGen.fqFun [ "Element" ] "padding", Elm.CodeGen.int value ]


paddingXyExpr : Int -> Int -> Elm.CodeGen.Expression
paddingXyExpr x y =
    Elm.CodeGen.apply [ Elm.CodeGen.fqFun [ "Element" ] "paddingXY", Elm.CodeGen.int x, Elm.CodeGen.int y ]


paddingEachExpr : { left : Int, right : Int, top : Int, bottom : Int } -> Elm.CodeGen.Expression
paddingEachExpr { left, right, top, bottom } =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element" ] "paddingEach"
        , Elm.CodeGen.record
            [ ( "left", Elm.CodeGen.int left )
            , ( "right", Elm.CodeGen.int right )
            , ( "top", Elm.CodeGen.int top )
            , ( "bottom", Elm.CodeGen.int bottom )
            ]
        ]


borderRoundedExpr : Int -> Elm.CodeGen.Expression
borderRoundedExpr value =
    Elm.CodeGen.apply [ Elm.CodeGen.fqFun [ "Element", "Border" ] "rounded", Elm.CodeGen.int value ]


borderRoundedEachExpr : { topLeft : Int, topRight : Int, bottomLeft : Int, bottomRight : Int } -> Elm.CodeGen.Expression
borderRoundedEachExpr { topLeft, topRight, bottomLeft, bottomRight } =
    Elm.CodeGen.apply
        [ Elm.CodeGen.fqFun [ "Element", "Border" ] "roundEach"
        , Elm.CodeGen.record
            [ ( "topLeft", Elm.CodeGen.int topLeft )
            , ( "topRight", Elm.CodeGen.int topRight )
            , ( "bottomLeft", Elm.CodeGen.int bottomLeft )
            , ( "bottomRight", Elm.CodeGen.int bottomRight )
            ]
        ]


borderWidthExpr : Int -> Elm.CodeGen.Expression
borderWidthExpr value =
    Elm.CodeGen.apply [ Elm.CodeGen.fqFun [ "Element", "Border" ] "width", Elm.CodeGen.int value ]


borderColorExpr : FigmaColor -> Elm.CodeGen.Expression
borderColorExpr value =
    Elm.CodeGen.apply [ Elm.CodeGen.fqFun [ "Element", "Border" ] "color", figmaColorToExpr value ]


backgroundColorExpr : FigmaColor -> Elm.CodeGen.Expression
backgroundColorExpr value =
    Elm.CodeGen.apply [ Elm.CodeGen.fqFun [ "Element", "Background" ] "color", figmaColorToExpr value ]


backgroundImageExpr : Elm.CodeGen.Expression
backgroundImageExpr =
    Elm.CodeGen.apply [ Elm.CodeGen.fqFun [ "Element", "Background" ] "image", Elm.CodeGen.string "add image url" ]


figmaColorToExpr : FigmaColor -> Elm.CodeGen.Expression
figmaColorToExpr figmaColor =
    case
        List.find
            (\( _, color ) -> Element.rgb255 figmaColor.red figmaColor.green figmaColor.blue == color)
            allColors
    of
        Just ( name, _ ) ->
            Elm.CodeGen.fqFun [ "Colors" ] name

        Nothing ->
            Elm.CodeGen.apply
                [ Elm.CodeGen.fqFun [ "Element" ] "rgb255"
                , Elm.CodeGen.int figmaColor.red
                , Elm.CodeGen.int figmaColor.green
                , Elm.CodeGen.int figmaColor.blue
                ]


figmaColorWithAlphaToExpr : FigmaColorWithAlpha -> Elm.CodeGen.Expression
figmaColorWithAlphaToExpr figmaColor =
    case
        List.find
            (\( _, color ) ->
                Element.rgba255 figmaColor.red figmaColor.green figmaColor.blue figmaColor.alpha
                    == color
            )
            allColors
    of
        Just ( name, _ ) ->
            Elm.CodeGen.fqFun [ "Colors" ] name

        Nothing ->
            Elm.CodeGen.apply
                [ Elm.CodeGen.fqFun [ "Element" ] "rgba255"
                , Elm.CodeGen.int figmaColor.red
                , Elm.CodeGen.int figmaColor.green
                , Elm.CodeGen.int figmaColor.blue
                , Elm.CodeGen.float figmaColor.alpha
                ]
