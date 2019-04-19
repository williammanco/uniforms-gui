# uniforms-gui

Small utility to transform all uniforms of selected program to GUI controls.

**DEMO** https://codesandbox.io/s/4xn7po9l90

GUI controls from uil.js

[uniforms-gui](https://github.com/williammanco/uniforms-gui)


## Install

```sh
yarn add uniforms-gui
```

## Usage - Example

```js
import GUI from "uniforms-gui"


export default () => {
    const gui = new GUI();
    
    //...
    
    const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uLightPosition: { value: [0, 100, 0] },
          uDistance: {
            value: 0.0,
            controls: {
              max: 5,
            }, // add controls options
          },
          uColor: {
            value: [0.0, 0.0, 0.0],
            controls: {
              type: "color",
            },
          },
          uTime: { value: 0.0 },
        },
      });

    //...

    gui.initFrom(material);

    gui.draw();

    // gui.clear(); // for destroy all
}
```

## Controls options

```javascript
...soon
```

## Build

```sh
yarn build
```

# License

MIT © [William Manco](mailto:wmanco88@gmail.com)