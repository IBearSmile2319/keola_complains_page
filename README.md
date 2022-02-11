## Install the modules.

```sh
$ npm install
```

## Run the application

```sh
$ npm run dev
```
## Build mode and production
First we build the app with the following command.
```sh
$ npm run build
```
After running the build command, a folder called "***dist***" was created, in that folder the whole project is located.

To be able to see our project we execute the following.
### preview
```sh
$ npm run preview
```
### production files
inside a new repository[folder] we execute the following console commands.

```sh
$ npm init --y
```
```sh
$ npm i express
```

We create a file called index.js and it will contain the following lines of code.
```JS
const express = require('express')
const path = require('path')

const app= express()

app.use(express.static('public'))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public','index.html'))
})
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Pagina no encontrada"
    })
})
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})


```
Having already done the above, rename the folder "***dist***" to the following name "public".
1. We paste in the folder we created.
2. We execute the following command and that's it.
```sh
$ node index.js
```