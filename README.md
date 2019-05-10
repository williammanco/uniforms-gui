# uniforms-gui

Small utility to transform all uniforms to a GUI controls.
GUI from [uil.js](https://github.com/lo-th/uil)

[**Codesandbox DEMO**](https://codesandbox.io/s/4xn7po9l90)

[Github repo](https://github.com/williammanco/uniforms-gui)

## Install

```sh
yarn add uniforms-gui
```
## Minimal example

```js
import GUI from "uniforms-gui"

export default () => {
    const gui = new GUI();
    //...
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0.0 },
        },
      });

    material.uniformsNeedUpdate = true

    gui.add(material);
    gui.draw();
    //...
}

```

## Advanced example

```js
import GUI from "uniforms-gui"

export default () => {
    const gui = new GUI();
    //...
    const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uBool: { value: false }, // Automatic type "bool"
          uFloat: { value: 0.0 }, // Automatic type "slide"
          uVector: { value: [0, 100, 0] }, // Automatic type "vector"
          uSlideWithControls: {
            value: 0.0,
            controls: {
              min: 0.01,
              max: 5.5,
              step: 0.05,
              precision: 2
            }, // add controls options
          },
          uColorGraph: {
            value: [0.0, 0.0, 0.0],
            controls: {
              type: "graph",
              name: "uColor", // to control another uniforms
            },
          },
          uColor: {
            value: [0.0, 0.0, 0.0],
            controls: {
              type: "color",
            },
          },
          uNumericBool: {
            value: 1.0,
            controls: {
              type: "bool",
            },
          },
          uKnob: {
            value: 0.0,
            controls: {
              type: "knob",
              min: 0,
              max: 1
            }
          },
        },
      });

    material.uniformsNeedUpdate = true

    const material2 = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uBool: { value: false },
        },
      });

    material2.uniformsNeedUpdate = true

    gui.add(material, 'My GUI');
    gui.add(material2, 'My GUI 2');
    // gui.clear(); // to destroy all
    gui.draw();
    //...
}
```

## Controls options

```javascript
  {
    // same from uil.js
    w: 120,
    h: 100,
    min: 0,
    max: 100,
    step: 1,
    precision: 2,
    fontColor: '#D4B87B',
    multiplicator: 1,
    mode: 1,

    // options
    name: 'uName', // to controls another uniforms
    type: 'bool|slide|color|knob|circular|joystick',
  }
```

## Build

```sh
yarn build
```

# License

MIT © [William Manco](mailto:wmanco88@gmail.com)