var uniformsgui = (function (uil) {
  'use strict';

  class UniformsGui {
    constructor(options, titleOptions) {
      this.ui = new uil.Gui(Object.assign({
        bg: 'rgba(0,0,0,0.9)',
      }, options));

      this.titleOptions = titleOptions;
      this.controls = [];
    }

    initFrom(program) {
      Object.keys(program.uniforms).forEach((uniform) => {
        const { value, controls } = program.uniforms[uniform];

        if (Array.isArray(value)) {
          this.controls.push({
            type: 'number',
            name: uniform,
            ...controls,
            value,
          });
        } else if (typeof value === 'number') {
          this.controls.push({
            type: 'slide',
            name: uniform,
            min: 0,
            max: 1,
            precision: 2,
            step: 0.01,
            ...controls,
            value,
          });
        }
      });
      this.program = program;
    }

    draw() {
      this.ui.add('title', Object.assign({
        name: 'Uniforms GUI',
        titleColor: '#D4B87B',
        h: 30,
      }, this.titleOptions));

      Object.keys(this.controls).forEach((item) => {
        const {
          type, name, value, ...options
        } = this.controls[item];

        this.ui.add(type, {
          name,
          ...options,
          callback: this.update.bind(this, name),
          value,
        });
      });
    }

    clear() {
      this.ui.clear();
    }

    update(name, e) {
      this.program.uniforms[name].value = e;
    }
  }

  return UniformsGui;

}(UIL));
