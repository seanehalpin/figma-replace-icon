async function main() {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
}

main().then(() => {

  let entirePage = figma.currentPage.children
  const nodes = figma.currentPage.selection
  let selectedLayers = nodes

  let arrayNewIcons = []
  let arrayReplaceIcon = []

  function allIcons(children) {
    children.forEach(child => {
      if (child.type === 'COMPONENT') {

        var temp = new Object()

        temp["identify"] = child.id
        temp["desc"] = child.name

        arrayNewIcons.push(temp)
      }
      if ("children" in child) allIcons(child.children)
    })
  }

  function allInstances(children) {
    children.forEach(child => {
      if (child.type === 'INSTANCE') {

        let newName = '2020 Icon/ ' + child.masterComponent.name
        arrayReplaceIcon.push(newName)
       
        const match = arrayNewIcons.find(item => {

          if (item.desc === newName) {
            return item.identify
          }

        })

        if (match) {
          console.log(match.desc + " : " + child.masterComponent.name)
          
          if (child.width <=24 && child.height <=24) {
            child.masterComponent = {id: match.identify }
          }
        }
      }

      if ("children" in child) allInstances(child.children)
    })
  }

  allIcons(selectedLayers)
  allInstances(entirePage)

  figma.closePlugin();

})