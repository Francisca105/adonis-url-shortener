'use strict'

const Env = use('Env')
const fs = require('fs')
const Database = use('Database')

class MainController {
    async home ({view}) {
        return view.render('home')
    }
    async post ({request}) {
        let url = request.input('url')
        //console.log(url)

        let data = await Database
        .table('Urls')
        .insert({url})

        //console.log(data)

        return `${Env.get('APP_URL')}/${data[0]}`
    }
    async redirect ({request, response, params}) {
        let id = params.id
        let find = await Database
        .table('Urls')
        .where('id', id)
        
        if(find.length == 0) return response.redirect('back')
        console.log(find)
        return response.redirect(find[0].url)
    }
}

module.exports = MainController
