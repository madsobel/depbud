#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const opn = require('opn')
const david = require('david')
const depcheck = require('depcheck')
const _ = require('lodash')
const semver = require('semver')
const express = require('express')
const app = express()

let manifest = {}
let dependencyData = {
    david: {
        deps: {},
        devDeps: {}
    },
    depcheck: {}
}

const depcheckOptions = {
    ignoreDirs: ['node_modules']
}

function parseVersions(deps) {
    for (let prop in deps) {
        deps[prop].required = deps[prop].required.replace(/\^|\~/g, '')
        deps[prop].outdated = semver.gt(deps[prop].stable, deps[prop].required)
    }
    return deps
}

app.get('/', (req, res) => {
  console.log(JSON.stringify(dependencyData))
  fs.readFile(path.resolve(__dirname, 'index.html'), 'utf8', (err, template) => {
    const compiled = _.template(template)
    res.send(compiled(dependencyData))
  })
})

fs.readFile('package.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Could not open package.json, make sure you\'re in the right directory')
        return
    }

    manifest = JSON.parse(data)

    david.getDependencies(manifest, (err, deps) => {
        dependencyData.david.deps = parseVersions(deps)

        david.getDependencies(manifest, { dev: true }, (err, devDeps) => {
            dependencyData.david.devDeps = parseVersions(devDeps)
            
            depcheck(path.resolve('./'), depcheckOptions, (unused) => {
                dependencyData.depcheck = unused
              
                for (let dep in dependencyData.depcheck.using) {
                    if (dependencyData.david.deps.hasOwnProperty(dep)) {
                        dependencyData.david.deps[dep].using = dependencyData.depcheck.using[dep]
                    }
                }

                app.listen(3000, () => {
                    // console.log('Example app listening on port 3000!')
                    console.log(JSON.stringify(dependencyData))
                    opn('http://localhost:3000')
                })
            })
        })
    })


})

