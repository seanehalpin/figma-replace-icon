var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    });
}
main().then(() => {
    let entirePage = figma.currentPage.children;
    const nodes = figma.currentPage.selection;
    let selectedLayers = nodes;
    let arrayNewIcons = [];
    let arrayReplaceIcon = [];
    function allIcons(children) {
        children.forEach(child => {
            if (child.type === 'COMPONENT') {
                var temp = new Object();
                temp["identify"] = child.id;
                temp["desc"] = child.name;
                arrayNewIcons.push(temp);
            }
            if ("children" in child)
                allIcons(child.children);
        });
    }
    function allInstances(children) {
        children.forEach(child => {
            if (child.type === 'INSTANCE') {
                let newName = '2020 Icon/ ' + child.name;
                arrayReplaceIcon.push(newName);
                const match = arrayNewIcons.find(item => {
                    if (item.desc === newName) {
                        return item.identify;
                    }
                });
                if (match) {
                    // console.log(match.desc + ":hidden + : " + child.masterComponent.id)
                    if (child.width <= 24 && child.height <= 24) {
                        child.masterComponent = { id: match.identify };
                    }
                }
            }
            if ("children" in child)
                allInstances(child.children);
        });
    }
    allIcons(selectedLayers);
    allInstances(entirePage);
    figma.closePlugin();
});
