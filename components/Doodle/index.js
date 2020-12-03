import React from 'react';
import PropTypes from 'prop-types';
import 'css-doodle';

class Doodle extends React.Component {
  constructor(props) {
    super(props);

    this.doodleRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    this.redraw();
  }

  getColorsString(colors) {
    let colorStyleVariables = '';

    colors.forEach((color, idx) => {
      colorStyleVariables += `--color${idx}: ${color};\n`;
    });

    return colorStyleVariables;
  }

  redraw() {
    this.doodleRef.current.update();
  }

  render() {
    const {
      seed,
      name,
      colors,
      grid,
      width,
      widthHeightRatio,
      styleCode,
      doodleCode,
    } = this.props;

    const colorsString = this.getColorsString(colors);
    const height = parseInt(width * widthHeightRatio);

    console.log(`Doodle colors=${colors}`);
    console.log(colorsString);

    return (
      <div>
        <style>
          {`
          css-doodle#${name} {
            ${colorsString}

            width: ${width}px;
            height: ${height}px; 

            ${styleCode}
          }
        `}
        </style>

        <css-doodle
          id={name}
          seed={seed}
          use="var(--rule)"
          ref={this.doodleRef}
          // grid={grid}
        >
          {`
            @grid: ${grid};
            ${doodleCode}
          `}
        </css-doodle>
      </div>
    );
  }
}

Doodle.defaultProps = {
  colors: ['#ffffff', '#dddddd', '#cccccc', '#aaaaaa', '#999999', '#777777'],
  grid: '6x4',
  width: 320,
  height: 480,
  widthHeightRatio: 1.5,
};

Doodle.propTypes = {
  seed: PropTypes.string,
  colors: PropTypes.array,
  grid: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  widthHeightRatio: PropTypes.number,
  styleCode: PropTypes.string,
  doodleCode: PropTypes.string,
};

export default Doodle;
