# uniforms-gui

Small utility to transform all uniforms of selected program to GUI controls.

GUI controls from uil.js

[uniforms-gui](https://github.com/williammanco/uniforms-gui)


## Install

```sh
yarn add uil
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
          uTime: { value: 0.0 },
        },
      });

    //...

    gui.initFrom(material);

    gui.draw();

    // gui.clear(); // for destroy all
}
```

## Build

```sh
yarn build
```

# License

MIT © [William Manco](mailto:wmanco88@gmail.com)