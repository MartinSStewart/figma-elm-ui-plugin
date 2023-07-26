if (figma.editorType === 'figma')
{
    const item = figma.currentPage.selection[0];
    if (item)
    {
        let attributes = [];
        console.log(item);

        const app = Elm.FigmaPlugin.init({ flags : item });

        app.ports.figmaOutput.subscribe((text) => {
            figma.showUI(__html__.replace("copy-content", text));
            figma.ui.onmessage = msg => {
                //figma.closePlugin();
            };
        });
    }
    else
    {
        figma.closePlugin();
    }
}
