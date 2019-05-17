import { Gui } from '../vendors/uil.module';

class UniformsGui {
  constructor(options, debug) {
    this.options = options;
    this.debug = debug;
    this.controls = [];
    this.programs = [];
    this.uis = [];
  }

  init(options) {
    if (!this.options) this.options = {};
    const { w, css } = this.options;

    if (!css) {
      this.options.css = `left: ${((w || 240) + 10) * this.uis.length}px`;
    }

    this.uis.push(
      new Gui(Object.assign({
        bg: 'rgba(0,0,0,0.9)',
      }, options || this.options)),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  setTitle(text, control) {
    control.unshift({
      type: 'title',
      name: text || 'Uniforms GUI',
      h: 30,
      titleColor: '#D4B87B',
    });
  }

  add(program, title, options) {
    this.init(options);

    const control = [];
    Object.keys(program.uniforms).forEach((uniform) => {
      const { value, controls } = program.uniforms[uniform];
      const { name } = value.constructor;
      const isVector = name === 'Vector2'
      || name === 'Vector3'
      || name === 'Vector4';

      if (Array.isArray(value) || isVector) {
        const normalizedValue = isVector ? value.toArray() : value;
        control.push({
          type: 'number',
          name: uniform,
          ...controls,
          value: normalizedValue,
        });
      } else if (name === 'Number') {
        control.push({
          type: 'slide',
          name: uniform,
          min: 0,
          max: 1,
          precision: 2,
          step: 0.01,
          ...controls,
          value,
        });
      } else if (name === 'Boolean') {
        control.push({
          type: 'bool',
          name: uniform,
          ...controls,
          value,
        });
      }
    });

    this.setTitle(title, control);
    this.controls.push(control);
    this.programs.push(program);

    return this.uis[this.controls.length - 1];
  }

  initFrom(program) {
    this.programs = [];
    this.uis = [];
    this.add(program);
  }

  draw() {
    this.uis.forEach((ui, key) => {
      Object.keys(this.controls[key]).forEach((item) => {
        const {
          type, name, value, ...options
        } = this.controls[key][item];

        ui.add(type, {
          name,
          ...options,
          callback: this.update.bind(this, name, this.programs[key]),
          value,
        });
      });
    });
  }

  clear() {
    this.uis.forEach((ui) => {
      ui.clear();
    });
  }

  destroy() {
    this.uis.forEach((ui) => {
      ui.dispose();
    });
  }

  update(name, program, e) {
    // eslint-disable-next-line no-param-reassign
    program.uniforms[name].value = e;
    if (this.debug) window.console.log(name, e);
  }
}

export default UniformsGui;
