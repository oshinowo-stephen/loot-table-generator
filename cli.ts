import { 
    generateTable, 
} from './lib'

generateTable(["very-rare", "legendary"])
    .then((tables) => console.log(tables))