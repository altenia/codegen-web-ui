# Using libraries #

## react-data-grid
Based on this article https://github.com/adazzle/react-data-grid/issues/269
    ```
    typings i react-data-grid --save --source dt --global
    or
    typings install dt~react-data-grid --global --save
    ```

The typings include should be added in tsconfig.js
    ```
    "include": [
        "typings/**/*.ts"
    ]
    ```
In (this example)[https://rjzaworski.com/2016/08/typescript-redux-and-react] suggests to use
    ```
    "files": [
    "typings/index.d.ts"
  ]
  ```

https://github.com/typings/typings