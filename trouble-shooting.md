## Version conflicts in npm
`PS D:\Develop\React\Tic-Tac-Toe> npm start` 

error related `OpenSSL`

- Try to fix
1) Since my node.js is the latest LTS, I installed https://slproweb.com/products/Win32OpenSSL.html `Win64 OpenSSL v3.2.2 Light`(only this version works, download msi, using Chrome, Edge doesn't work) 
2) Set the environment path variable: add `D:\Software Installed\OpenSSL-Win64\bin` to the system't path

Still error:

```
PS D:\Develop\React\Tic-Tac-Toe> npm start

> react.dev@0.0.0 start
> react-scripts start
Starting the development server...

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:79:19)
    at Object.createHash (node:crypto:139:10)
    at module.exports (D:\Develop\React\Tic-Tac-Toe\node_modules\webpack\lib\util\createHash.js:90:53)
    at NormalModule._initBuildHash (D:\Develop\React\Tic-Tac-Toe\node_modules\webpack\lib\NormalModule.js:401:16)
    at handleParseError (D:\Develop\React\Tic-Tac-Toe\node_modules\webpack\lib\NormalModule.js:449:10)
    at D:\Develop\React\Tic-Tac-Toe\node_modules\webpack\lib\NormalModule.js:481:5
    at D:\Develop\React\Tic-Tac-Toe\node_modules\webpack\lib\NormalModule.js:342:12
    at D:\Develop\React\Tic-Tac-Toe\node_modules\loader-runner\lib\LoaderRunner.js:373:3
    at iterateNormalLoaders (D:\Develop\React\Tic-Tac-Toe\node_modules\loader-runner\lib\LoaderRunner.js:214:10)
    at iterateNormalLoaders (D:\Develop\React\Tic-Tac-Toe\node_modules\loader-runner\lib\LoaderRunner.js:221:10)
    at D:\Develop\React\Tic-Tac-Toe\node_modules\loader-runner\lib\LoaderRunner.js:236:3
    at runSyncOrAsync (D:\Develop\React\Tic-Tac-Toe\node_modules\loader-runner\lib\LoaderRunner.js:130:11)
    at iterateNormalLoaders (D:\Develop\React\Tic-Tac-Toe\node_modules\loader-runner\lib\LoaderRunner.js:232:2)
    at Array.<anonymous> (D:\Develop\React\Tic-Tac-Toe\node_modules\loader-runner\lib\LoaderRunner.js:205:4)
    at Storage.finished (D:\Develop\React\Tic-Tac-Toe\node_modules\enhanced-resolve\lib\CachedInputFileSystem.js:55:16)
    at D:\Develop\React\Tic-Tac-Toe\node_modules\enhanced-resolve\lib\CachedInputFileSystem.js:91:9
D:\Develop\React\Tic-Tac-Toe\node_modules\react-scripts\scripts\start.js:19
  throw err;
  ^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:79:19)
    at Object.createHash (node:crypto:139:10)
    at module.exports (D:\Develop\React\Tic-Tac-Toe\node_modules\webpack\lib\util\createHash.js:90:53)
    at NormalModule._initBuildHash (D:\Develop\React\Tic-Tac-Toe\node_modules\webpack\lib\NormalModule.js:401:16)
    at D:\Develop\React\Tic-Tac-Toe\node_modules\webpack\lib\NormalModule.js:433:10
    at D:\Develop\React\Tic-Tac-Toe\node_modules\webpack\lib\NormalModule.js:308:13
    at D:\Develop\React\Tic-Tac-Toe\node_modules\loader-runner\lib\LoaderRunner.js:367:11
    at D:\Develop\React\Tic-Tac-Toe\node_modules\loader-runner\lib\LoaderRunner.js:233:18
    at context.callback (D:\Develop\React\Tic-Tac-Toe\node_modules\loader-runner\lib\LoaderRunner.js:111:13)
    at D:\Develop\React\Tic-Tac-Toe\node_modules\babel-loader\lib\index.js:51:103 {
  opensslErrorStack: [
    'error:03000086:digital envelope routines::initialization error',
    'error:0308010C:digital envelope routines::unsupported'
  ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}
```
- Solution
1) In `package.json`, change `"react-scripts": "^3.0.1"`to `"^5.0.1"`
2) `npm install`, then `npm start`

#### Tip: Set Chrome as the default browser for VScode:
Windows:
Go to `Settings > Apps > Default apps`.
Scroll down to Web browser and choose `Google Chrome`.
### Tip: .gitignore
Without it, git add . will be flashing warning messages on and on...