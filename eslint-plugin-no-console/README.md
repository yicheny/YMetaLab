# eslint-plugin-no-console

clear console

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-no-console`:

```sh
npm install eslint-plugin-no-console --save-dev
```

## Usage

Add `no-console` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "no-console"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "no-console/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


