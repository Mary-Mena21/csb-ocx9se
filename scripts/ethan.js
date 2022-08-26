import { menuCopy, tablesCopy, serversCopy } from "./database.js"

// There has to be a better way to do this
const dinnerFunction = () => {
    const orders = []
    const menus = menuCopy().filter(menu => {if(menu.type === 'dinner'){return orders.push(" " + menu.menuItem)}})
    return orders
}

const breakfastFunction = () => {
    const ordersArray = []
    const menus = menuCopy().filter(menu => {if(menu.id === 3){return ordersArray.push(" " + menu.menuItem)}})
    return ordersArray
}

const lunchFunction = () => {
    const orders = []
    const menus = menuCopy().filter(menu => {if(menu.type === 'lunch'){return orders.push(" " + menu.menuItem)}})
    orders.pop()
    return orders
}

const totalDinnerFunction = () => {
    const totalsArray = []
    let total = 0
    const menus = menuCopy().filter(menu => {if(menu.type === 'dinner'){return totalsArray.push(menu.price)}})
    total += totalsArray.reduce((total, order) => total + order, 0)
    return total
}

const totalBreakfastFunction = () => {
    const totalsArray = []
    let total = 0
    const menus = menuCopy().filter(menu => {if(menu.id === 1){return totalsArray.push(menu.price)}})
    total += totalsArray.reduce((total, order) => total + order, 0)
    return total
}

const totalLunchFunction = () => {
    const totalsArray = []
    let total = 0
    const menus = menuCopy().filter(menu => {if(menu.type === 'lunch'){return totalsArray.push(menu.price)}})
    totalsArray.pop()
    total += totalsArray.reduce((total, order) =>  total + order, 0)
    return total
}

const tablesFunction = () => {
    const tables = tablesCopy().filter(table => {if(table.serverId === 3){return table}})
    return tables
}

const serversFunction = () => {
    const servers = serversCopy().filter(server => {if(server.id === 3){return server}})
    return servers
}

//This made me mad but also need a better way instead of 3 separate functions its 6 am and im exhausted
const lunchTip = (percent, total) => {
   const tip = (percent / 100) * total
    return totalLunchFunction() + tip
}

const breakfastTip = (percent, total) => {
    const tip = (percent / 100) * total
     return totalBreakfastFunction() + tip
 }

 const dinnerTip = (percent, total) => {
    const tip = (percent / 100) * total
     return totalDinnerFunction() + tip
 }

// This feels like alot for a function
const render = () => {
    let reservation = ""
    const appElement = document.querySelector('#ethan')
    let renderToHTML = `<section class="ethan-section">`
    for (const server of serversFunction()) {
        for (const table of tablesFunction()) {
            if(server.id === table.serverId) {
                if(table.reservation === true) {
                    table.reservation = "yes"
                    reservation = new Date(Date.now()).toLocaleDateString('en-US')
                } else {
                    table.reservation = "No"
                    reservation = "N/A"
                }
                if(table.menuType === 'breakfast') {
                    renderToHTML += `<ul class="ethan-list">`
                    renderToHTML += `<h3 class="ethan-table">Table: ${table.id}</h3>`
                    renderToHTML += `<li>Party Of: ${table.guestsNumber}</li>`
                    renderToHTML += `<li>Table Reservation Date: ${reservation}</li>`
                    renderToHTML += `<li>Table Reservation?: ${table.reservation}</li>`
                    renderToHTML += `<li>Order Entree(s):${breakfastFunction()}</li>`
                    renderToHTML += `<li>Server: ${server.serverName}</li>`
                    renderToHTML += `<li>Tip: ${table.tipPercent.toFixed(2) * 100}%`
                    renderToHTML += `<li>Subtotal: $${totalBreakfastFunction()}</li>`
                    renderToHTML += `<li>Total: $${breakfastTip(table.tipPercent.toFixed(2) * 100, parseInt(totalBreakfastFunction())).toFixed(2)}</li>`
                    renderToHTML += `</ul>`
                } if(table.menuType === "dinner") {
                    renderToHTML += `<ul class="ethan-list">`
                    renderToHTML += `<h3 class="ethan-table">Table: ${table.id}</h3>`
                    renderToHTML += `<li>Party Of: ${table.guestsNumber}</li>`
                    renderToHTML += `<li>Table Reservation Date: ${reservation}</li>`
                    renderToHTML += `<li>Table Reservation?: ${table.reservation}</li>`
                    renderToHTML += `<li>Order Entree(s):${dinnerFunction()}</li>`
                    renderToHTML += `<li>Server: ${server.serverName}</li>`
                    renderToHTML += `<li>Tip: ${table.tipPercent.toFixed(2) * 100}%`
                    renderToHTML += `<li>Subtotal: $${totalDinnerFunction()}</li>`
                    renderToHTML += `<li>Total: $${dinnerTip(table.tipPercent.toFixed(2) * 100, parseInt(totalDinnerFunction())).toFixed(2)}</li>`
                    renderToHTML += `</ul>`
                } if (table.menuType === 'lunch') {
                    renderToHTML += `<ul class="ethan-list">`
                    renderToHTML += `<h3 class="ethan-table">Table: ${table.id}</h3>`
                    renderToHTML += `<li>Party Of: ${table.guestsNumber}</li>`
                    renderToHTML += `<li>Table Reservation Date: ${reservation}</li>`
                    renderToHTML += `<li>Table Reservation?: ${table.reservation}</li>`
                    renderToHTML += `<li>Order Entree(s):${lunchFunction()}</li>`
                    renderToHTML += `<li>Server: ${server.serverName}</li>`
                    renderToHTML += `<li>Tip: ${table.tipPercent.toFixed(2) * 100}%`
                    renderToHTML += `<li>Subtotal: $${totalLunchFunction()}</li>`
                    renderToHTML += `<li>Total: $${lunchTip(table.tipPercent.toFixed(2) * 100, parseInt(totalLunchFunction())).toFixed(2)}</li>`
                    renderToHTML += `</ul>`
                }
            }        
        }
    }
    renderToHTML += `</section>`
    return appElement.innerHTML = renderToHTML
}

render()

// Need to see if theres a better way to do this
