import { CSSProperties } from "react";
import { Path, Svg } from "svg";

export function createIcomoonIconSet(glyphMap: any) {
  const Icon = (props: {
    size?: number;
    name?: string;
    color?: string | string[];
    style?: CSSProperties;
    testID?: string;
  }) => {
    const glyph = props.name
      ? glyphMap.icons.find(
          ({ properties }: any) => properties.name === props.name,
        )
      : null;

    return (
      <Svg
        // xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${glyphMap.height} ${glyphMap.height}`}
        fill="none"
        width={props.size || 30}
        height={props.size || 30}
        data-testid={props.testID ? `${props.testID}` : undefined}
      >
        {(glyph.icon.paths as string[]).map((d, index) => {
          return (
            <Path
              key={index}
              d={d}
              {...glyph.attrs[index]}
              fill={
                Array.isArray(props.color) ? props.color[index] : props.color
              }
              data-testid={
                props.testID ? `${props.testID}-${index}` : undefined
              }
            ></Path>
          );
        })}
      </Svg>
    );
  };

  return Icon;
}
