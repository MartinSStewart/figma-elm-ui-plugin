# elm-ui figma export plugin

This plugin attempts to assist with converting figma drawings into code for elm-ui. There's a lot of work left to be done before this plugin is useful. Right now it's perhaps better used as a point of reference if you want to make your own Figma plugins in Elm.

## Usage

1. Install the plugin by opening the Figma tool and going to the home page.
2. Click on your user icon and select Plugins from the dropdown
3. Click the plus icon and then "Import plugin from manifest..." and then select the manifest.json file in this folder.
4. Now you can run the plugin by right clicking in a Figma page and in the context menu going to Plugins -> Development -> Export elm-ui (you can press ctrl+alt+p to re-run it)
5. Running the plugin will generate Elm code and copy it to your clipboard for you to use in your app.

## Development

`FigmaPlugin.js` and `FigmaPlugin.elm` contain the plugin source code.

To compile any changes, run `yarn run build-figma-win` or `yarn run build-figma-mac`. If you've installed the plugin (see Usage) then Figma will detect the new version and you can use it immediately.

## Credits

Thanks to [Realia](https://realia.se/) for letting me create this during work hours and then open source it!
