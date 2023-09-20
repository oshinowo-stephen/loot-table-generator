import { readFile } from 'fs/promises'

export const generateTable = async (rarties: string[], items: number = 5): Promise<any[]> => {
    const generatedItems: any[] = []
    const generator = await getGeneratorFile()
    let itemsFilled = true

    let rarityTotalWeight = 0
        
    for (const _ of rarties) {
        rarityTotalWeight += generator[_].weight
    }

    while (itemsFilled) {
        const rarityRng = Math.random() * rarityTotalWeight
        for (const rarity of rarties) {

            if (rarityRng < generator[rarity].weight) {
                const itemRng = Math.random() * 1

                for (const item of generator[rarity].items) {

                    if (itemRng < item.weight) {
                        generatedItems.push({
                            name: item.name,
                            quantity: typeof item.quantities === 'string' 
                            ? Math.floor(
                                Math.random() * 
                                (parseInt(item.quantities.split('-')[1]) - parseInt(item.quantities.split('-')[0])) +
                                parseInt(item.quantities.split('-')[0]))
                            : item.quantities,
                            rarity
                        })

                        if (generatedItems.length === items) {
                            itemsFilled = false
                            break
                        }
                    }
                }
            }
            
        }
    }

    return generatedItems
}

export const getGeneratorFile = async (path?: string): Promise<any> => {
    if (!path) {
        process.env.GENERATOR_FILE = "./generator.json"
    } else {
        process.env.GENERATOR_FILE = path
    }

    const generatorString = await readFile(process.env.GENERATOR_FILE, 'utf-8')

    return JSON.parse(generatorString)
}