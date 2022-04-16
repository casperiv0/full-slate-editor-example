import classNames from "classnames";
import { RenderElementProps, useFocused, useSelected } from "slate-react";

export function HorizontalLineElement({ children, attributes }: RenderElementProps) {
  const selected = useSelected();
  const focused = useFocused();

  const isFocused = selected && focused;

  return (
    <div {...attributes}>
      {children}

      <div contentEditable={false}>
        <hr
          className={classNames(
            "w-full select-none border-t-2 rounded-md dark:border-[#3f3f3f]",
            isFocused && "ring-2 ring-offset-2 ring-blue-500",
          )}
        />
      </div>
    </div>
  );
}
