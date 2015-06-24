# sugarcane
Micro library to turn any element into a sticky nav.

## Demo
[Sugarcane Demo](http://develop.arcane.ws/sugarcane/)

## Examples
    Sugarcane.ready({
        'target': '=aside',
        'floor': '=footer'
    });

## Documentation
`Sugarcane.ready(options)`

### Options
- `target` the element you wish to make sticky
- `floor` the element you want the target to stop at

### Dependencies
Sugarcane uses [$.js](https://gist.github.com/ofca/5577178), check the documentation to see how to use the selector.
