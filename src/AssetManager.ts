/*
* Asset Manager
*
* Preload any assets (images, sounds, etc.) for maximized performance
*/


export let assets: { [path: string]: HTMLImageElement } = { }

const LOADED_ASSETS = ['floor.png', 'wall.png', 'warrior.gif', 'npc.png']

/*
* Wait for all assets to load
*/

function loadAssets() {
    return new Promise(async (resolve) => {
        for (const asset of LOADED_ASSETS) {
            const img = new Image()
        
            const load = () => new Promise((resolve) => {
                img.src = '../assets/' + asset
        
                img.onload = () => {
                    return resolve(true)
                }
            })
        
            await load()
        
            assets[asset] = img
        }

        resolve(true)
    })
}


export default loadAssets