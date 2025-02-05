const fs = require('node:fs/promises')
const path = require('node:path')

const dbPath = path.join(process.cwd(), 'db.json')
console.log(dbPath)

const reader = async () => {
    const json = await fs.readFile(dbPath, {encoding: 'utf-8'})
    return JSON.parse(json)

}

const writer = async (books) => {
    await fs.writeFile(dbPath, JSON.stringify(books))
}

module.exports = {
    reader,
    writer
}
